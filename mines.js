'use strict';
// The board logic is independent of the desktop so its rules can be checked directly.
class Minefield {
  constructor(random = Math.random) {
    this.random = random;
    this.cells = Array.from({ length: 64 }, () => ({
      mine: false,
      open: false,
      flag: false,
      count: 0,
    }));
    this.started = false;
    this.state = 'ready';
  }
  neighbors(index) {
    const result = [],
      row = Math.floor(index / 8),
      col = index % 8;
    for (let y = -1; y <= 1; y++)
      for (let x = -1; x <= 1; x++) {
        if ((x || y) && row + y >= 0 && row + y < 8 && col + x >= 0 && col + x < 8)
          result.push((row + y) * 8 + col + x);
      }
    return result;
  }
  plant(first) {
    const safe = new Set([first, ...this.neighbors(first)]);
    const candidates = this.cells.map((_, i) => i).filter((i) => !safe.has(i));
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
    candidates.slice(0, 10).forEach((i) => {
      this.cells[i].mine = true;
    });
    this.cells.forEach((cell, i) => {
      cell.count = this.neighbors(i).filter((n) => this.cells[n].mine).length;
    });
    this.started = true;
    this.state = 'playing';
  }
  flag(index) {
    const cell = this.cells[index];
    if (cell.open || ['won', 'lost'].includes(this.state)) return;
    if (!cell.flag && this.cells.filter((c) => c.flag).length >= 10) return;
    cell.flag = !cell.flag;
  }
  reveal(index) {
    if (['won', 'lost'].includes(this.state) || this.cells[index].flag || this.cells[index].open) return;
    if (!this.started) this.plant(index);
    if (this.cells[index].mine) {
      this.cells[index].open = true;
      this.state = 'lost';
      return;
    }
    const queue = [index];
    while (queue.length) {
      const next = queue.pop(),
        cell = this.cells[next];
      if (cell.open || cell.flag || cell.mine) continue;
      cell.open = true;
      if (!cell.count) queue.push(...this.neighbors(next));
    }
    if (this.cells.filter((c) => c.open).length === 54) {
      this.state = 'won';
      this.cells.forEach((c) => {
        if (c.mine) c.flag = true;
      });
    }
  }
}
if (typeof module !== 'undefined') module.exports = Minefield;
if (typeof document !== 'undefined')
  (() => {
    const board = document.querySelector('#mine-board');
    let game,
      startedAt = 0,
      timer,
      flagMode = false,
      best = null;
    try {
      const saved = localStorage.getItem('ibragim-mines-best');
      const value = Number(saved);
      if (saved !== null && Number.isInteger(value) && value >= 0 && value <= 999) best = value;
    } catch {}
    const seconds = () => Math.min(999, Math.floor((Date.now() - startedAt) / 1000));
    const buttons = Array.from({ length: 64 }, (_, i) => {
      const button = document.createElement('button');
      button.className = 'mine-cell';
      button.type = 'button';
      button.addEventListener('click', () => act(i, flagMode));
      button.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        act(i, true);
      });
      button.addEventListener('keydown', (event) => {
        if (event.key.toLowerCase() === 'f') {
          event.preventDefault();
          act(i, true);
          return;
        }
        const delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -8, ArrowDown: 8 }[event.key];
        if (!delta) return;
        event.preventDefault();
        if ((event.key === 'ArrowLeft' && i % 8 === 0) || (event.key === 'ArrowRight' && i % 8 === 7)) return;
        buttons[Math.max(0, Math.min(63, i + delta))].focus();
      });
      board.append(button);
      return button;
    });
    function paint() {
      game.cells.forEach((cell, i) => {
        const exposed = cell.open || (game.state === 'lost' && cell.mine);
        buttons[i].className =
          'mine-cell' + (exposed ? ' revealed' : '') + (cell.open && cell.mine ? ' exploded' : '');
        buttons[i].textContent = exposed ? (cell.mine ? '✹' : cell.count || '') : cell.flag ? '⚑' : '';
        buttons[i].dataset.count = cell.count;
        buttons[i].setAttribute(
          'aria-label',
          `Row ${Math.floor(i / 8) + 1}, column ${(i % 8) + 1}: ${exposed ? (cell.mine ? 'mine' : cell.count + ' neighboring mines') : cell.flag ? 'flagged' : 'covered'}`,
        );
        buttons[i].setAttribute('aria-disabled', String(cell.open || ['won', 'lost'].includes(game.state)));
      });
      document.querySelector('#mine-count').textContent = String(
        10 - game.cells.filter((c) => c.flag).length,
      ).padStart(3, '0');
      document.querySelector('#new-game').textContent =
        game.state === 'lost' ? '☹' : game.state === 'won' ? '★' : '☺';
      document.querySelector('#mine-best').textContent = best === null ? 'Best: —' : `Best: ${best}s`;
      document.querySelector('#mine-message').textContent =
        game.state === 'lost'
          ? 'Boom! Click the face to try again.'
          : game.state === 'won'
            ? 'You cleared the field. Nicely done!'
            : game.started
              ? 'Clear every safe square to win.'
              : 'Find the 10 mines. Your first move is safe.';
    }
    function act(index, flag) {
      if (['won', 'lost'].includes(game.state)) return;
      const wasStarted = game.started;
      if (flag) game.flag(index);
      else game.reveal(index);
      if (!wasStarted && game.started) {
        startedAt = Date.now();
        timer = setInterval(() => {
          document.querySelector('#mine-time').textContent = String(seconds()).padStart(3, '0');
        }, 250);
      }
      if (['won', 'lost'].includes(game.state)) {
        clearInterval(timer);
        if (game.state === 'won' && (best === null || seconds() < best)) {
          best = seconds();
          try {
            localStorage.setItem('ibragim-mines-best', String(best));
          } catch {}
        }
      }
      paint();
    }
    function newGame() {
      clearInterval(timer);
      game = new Minefield();
      document.querySelector('#mine-time').textContent = '000';
      flagMode = false;
      document.querySelector('#flag-mode').setAttribute('aria-pressed', 'false');
      document.querySelector('#flag-mode').textContent = '⚑ Flag mode: off';
      paint();
    }
    document.querySelector('#new-game').addEventListener('click', newGame);
    document.querySelector('#flag-mode').addEventListener('click', (event) => {
      flagMode = !flagMode;
      event.currentTarget.setAttribute('aria-pressed', String(flagMode));
      event.currentTarget.textContent = `⚑ Flag mode: ${flagMode ? 'on' : 'off'}`;
    });
    newGame();
  })();
