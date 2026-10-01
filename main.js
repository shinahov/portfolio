'use strict';

/*
 * Ibragim's retro desktop — main script.
 *
 * Sections:
 *   1. Helpers
 *   2. Page content (home, about, experience)
 *   3. Project folder and project viewer
 *   4. CV viewer
 *   5. Browser navigation (render, back/forward)
 *   6. Window manager (show, hide, taskbar, drag)
 *   7. Event listeners
 *   8. Notepad, theme and clock
 *   9. Contact form (sends to the Cloudflare Worker → Telegram)
 *  10. Start-up
 *
 * Data comes from projects.js (projectData) and content.js (personalContent).
 */

/* ------------------------------------------------------------------ */
/* 1. Helpers                                                          */
/* ------------------------------------------------------------------ */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

const MOBILE_BREAKPOINT = 850; // px — below this, windows are fixed and cannot be dragged
const STORAGE_THEME = 'ibragim-retro-theme';
const STORAGE_NOTE = 'ibragim-retro-note';

/* ------------------------------------------------------------------ */
/* 2. Page content                                                     */
/* ------------------------------------------------------------------ */

// Pages that are shown inside the "Personal Explorer" browser window.
const PAGE_TITLES = {
  home: 'Ibragim Shinakhov',
  about: 'About me',
  experience: 'Experience & education',
};

const HOME_HTML = `
  <div class="eyebrow">A personal homepage</div>
  <img class="home-photo" src="images/me.jpeg" alt="Ibragim Shinakhov">
  <h1>I'm Ibragim<br>Shinakhov.</h1>
  <p class="subtitle">JAVA · SQL · DATA / M.SC. AT HHU DÜSSELDORF</p>
  <p class="availability">
    <span class="online-dot" aria-hidden="true">●</span> Open to working student roles in Java, SQL or data — up to 20 hours a week.
  </p>
  <button class="contact-cta retro-button" data-open="contact">✉ Send me a message</button>
  <hr>

  <div class="home-launchers">
    <button data-open="projects">
      <span class="pixel-icon folder" aria-hidden="true"></span>
      <span><strong>My projects</strong><small>11 files to explore</small></span>
      <span aria-hidden="true">↗</span>
    </button>
    <button data-page="experience">
      <span class="pixel-icon file" aria-hidden="true">Aa</span>
      <span><strong>Experience</strong><small>Work &amp; university</small></span>
      <span aria-hidden="true">↗</span>
    </button>
  </div>

  <dl class="home-links">
    <div><dt><a href="#about" data-page="about">About me →</a></dt><dd>Studies, background and skills.</dd></div>
    <div><dt><a href="#experience" data-page="experience">Experience →</a></dt><dd>Java development, databases, BI and university.</dd></div>
    <div><dt><a href="#cv" data-open="cv">My CV →</a></dt><dd>Read or download my CV as a PDF.</dd></div>
    <div><dt><a href="#contact" data-open="contact">Contact →</a></dt><dd>Send me a message, or find me on GitHub and LinkedIn.</dd></div>
  </dl>`;

function aboutHtml() {
  return `
    <div class="eyebrow">Background</div>
    <h1>About me</h1>
    ${personalContent.about}
    <h2>Next</h2>
    <p>I want to go deeper into embedded systems and machine learning.</p>
    ${pageFooter()}`;
}

function experienceHtml() {
  return `
    <div class="eyebrow">Work & university</div>
    <h1>Experience</h1>
    ${personalContent.experience}
    ${pageFooter()}`;
}

function pageFooter() {
  return `
    <hr>
    <p class="document-footer">
      <span>© ${new Date().getFullYear()} Ibragim Shinakhov</span>
      <a href="#home" data-page="home">Back to homepage ↑</a>
    </p>`;
}

/* ------------------------------------------------------------------ */
/* 3. Project folder and project viewer                                */
/* ------------------------------------------------------------------ */

// Projects with a real screenshot: [image, alt text].
const PROJECT_IMAGES = {
  DriveBy: ['images/map-preview.webp', 'Route matching on a map'],
  Clustering_B: ['images/K-means_B.png', 'Clustering visualisation in VisB'],
  Tafel: ['images/besuch_reg.png', 'Family visit registration in the Tafel application'],
};

// Projects without a screenshot get a small text illustration:
// [style class, heading, content, caption].
const PROJECT_ILLUSTRATIONS = {
  MockLang: ['code', 'MOCKLANG', 'fn main():\n  print("Hi");\nend', 'SOURCE → VM → EXECUTABLE'],
  'ufc-fight-prediction': ['bars', 'FIGHT DATA', '▂ ▅ ▃ █ ▆', 'DATA → MODEL → PREDICTION'],
  bioinformatics: ['dna', 'ROSALIND', 'A T G C\nT A C G', 'DNA SEQUENCE ALGORITHMS'],
  WaveVisualizer: ['wave', 'WAVE VISUALIZER', '∿ ∿ ∿', 'ARDUINO / LCD'],
  'bbbc039-cell-segmentation': ['cells', 'CELL SEGMENTATION', '◉ ◌ ◉\n ◌ ◉ ◌', 'MICROSCOPY / OPENCV'],
  'Ai-tune-and-refine': [
    'chat',
    'AI TUNE & REFINE',
    '[ prompt ... ]\n  [ response ... ]',
    'REACT / TYPESCRIPT',
  ],
  'exam-dm-semantic-search': [
    'document-art',
    'EXAM PROTOCOLS',
    'CASE 01 ─────\nQ → A ───────',
    'DOCUMENTS → STRUCTURED DATA',
  ],
  'Algorithms-for-Sequence-Analysis-Assignments': [
    'dna',
    'SEQUENCE ANALYSIS',
    'A C G T A\nA – G T A',
    'MATCH / ALIGN / INDEX',
  ],
};

// The GitHub repository name is used as the project id, e.g. ".../shinahov/MockLang" -> "MockLang".
const projectId = (project) => new URL(project.code).pathname.split('/')[2];

function projectPreviewHtml(project) {
  const id = projectId(project);
  const picture = PROJECT_IMAGES[id];

  if (picture) {
    const [src, alt] = picture;
    return `
      <span class="file-preview photo-preview">
        <img src="${src}" alt="${escapeHtml(alt)}" loading="lazy">
      </span>`;
  }

  const [style, heading, content, caption] = PROJECT_ILLUSTRATIONS[id] || [
    'code',
    project.title,
    '{ … }',
    project.tech.join(' / '),
  ];
  return `
    <span class="file-preview illustration ${style}" role="img" aria-label="${escapeHtml(heading + ' — ' + caption)}">
      <span class="art-heading">${escapeHtml(heading)}</span>
      <span class="art-content">${escapeHtml(content)}</span>
      <span class="art-caption">${escapeHtml(caption)}</span>
    </span>`;
}

function projectFileHtml(project) {
  return `
    <button class="project-file" data-project="${escapeHtml(projectId(project))}" aria-label="Open ${escapeHtml(project.title)}">
      ${projectPreviewHtml(project)}
      <span class="file-name">${escapeHtml(project.title)}</span>
      <span class="file-type">${escapeHtml(project.tech.slice(0, 2).join(' · '))}</span>
      <span class="file-description">${escapeHtml(project.summary)}</span>
      <span class="file-open">Open project ↗</span>
    </button>`;
}

function renderProjects(filter = 'all') {
  const matches = projectData
    .filter((project) => filter === 'all' || project.tags.some((tag) => tag.toLowerCase() === filter))
    .sort((a, b) => a.order - b.order);

  $('#project-files').innerHTML = matches.map(projectFileHtml).join('');
  $('#folder-count').textContent = `${matches.length} project ${matches.length === 1 ? 'file' : 'files'}`;
}

function externalLink(url, label) {
  return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function openProject(id) {
  const project = projectData.find((p) => projectId(p) === id);
  if (!project) return;

  const links = [
    externalLink(project.code, 'View source on GitHub ↗'),
    project.demo ? externalLink(project.demo, 'Open live demo ↗') : '',
    project.video ? externalLink(project.video, 'Watch video ↗') : '',
  ].join('');

  const content = $('#project-content');
  $('#project-title').textContent = `${project.title} — Project viewer`;
  content.innerHTML = `
    <div class="project-cover">${projectPreviewHtml(project)}</div>
    <p class="eyebrow">${escapeHtml(project.category)}</p>
    <h1>${escapeHtml(project.title)}</h1>
    <p class="intro">${escapeHtml(project.summary)}</p>
    <p class="project-tech">${project.tech.map(escapeHtml).join(' · ')}</p>
    <div class="project-links">${links}</div>
    <div class="project-notes">${project.docsHtml || ''}</div>`;

  content.scrollTop = 0;
  showWindow('project');
  content.focus({ preventScroll: true });
}

/* ------------------------------------------------------------------ */
/* 4. CV viewer                                                        */
/* ------------------------------------------------------------------ */

const CV_FILE = 'cv/Ibragim_Shinakhov_CV.pdf';

// The PDF is only loaded the first time the CV window opens.
// Phones usually cannot show PDFs inline, so they keep the "Open my CV" link from index.html.
function loadCv() {
  const body = $('#cv-body');
  if (body.dataset.loaded) return;
  body.dataset.loaded = '1';

  const isPhone = matchMedia(`(max-width:${MOBILE_BREAKPOINT}px)`).matches;
  if (isPhone || !navigator.pdfViewerEnabled) return;

  const frame = document.createElement('iframe');
  frame.src = `${CV_FILE}#view=FitH`;
  frame.title = 'CV of Ibragim Shinakhov (PDF)';
  body.replaceChildren(frame);
}

/* ------------------------------------------------------------------ */
/* 5. Browser navigation                                               */
/* ------------------------------------------------------------------ */

const visitedPages = []; // pages visited in the Personal Explorer
let historyIndex = -1;

function render(page, record = true, focus = false) {
  if (page === 'projects') {
    showWindow('projects');
    return;
  }
  if (!PAGE_TITLES[page]) page = 'home';

  if (record && visitedPages[historyIndex] !== page) {
    visitedPages.splice(historyIndex + 1); // drop "forward" entries
    visitedPages.push(page);
    historyIndex = visitedPages.length - 1;
  }

  const documentArea = $('#document');
  $('#window-title').textContent = PAGE_TITLES[page];
  $('#address').textContent = `personal://ibragim/${page}`;

  if (page === 'home') documentArea.innerHTML = HOME_HTML;
  if (page === 'about') documentArea.innerHTML = aboutHtml();
  if (page === 'experience') documentArea.innerHTML = experienceHtml();

  $('#status').textContent = 'Done';
  documentArea.scrollTop = 0;
  $('#back').disabled = historyIndex <= 0;
  $('#forward').disabled = historyIndex >= visitedPages.length - 1;

  $$('.menubar [data-page]').forEach((button) => {
    button.setAttribute('aria-current', button.dataset.page === page ? 'page' : 'false');
  });

  showWindow('browser');
  if (focus) documentArea.focus({ preventScroll: true });
}

/* ------------------------------------------------------------------ */
/* 6. Window manager                                                   */
/* ------------------------------------------------------------------ */

// Every window has the id "<name>-window". Names listed here get a taskbar button.
const WINDOW_NAMES = {
  browser: 'Personal Explorer',
  projects: 'My projects',
  project: 'Project viewer',
  contact: 'Contact me',
  cv: 'My CV',
  notepad: 'Notepad',
  mines: 'Minesweeper',
  privacy: 'Datenschutz',
};

// Windows that cover the whole screen on phones (page scrolling is locked while they are open).
const OVERLAY_WINDOWS = ['projects', 'project', 'cv'];

const openWindows = new Set(['browser']); // windows shown in the taskbar
let topLayer = 30; // highest z-index handed out so far

const windowElement = (id) => $(`#${id}-window`);
const isOnTop = (win) => Number(win.style.zIndex) === topLayer;

function bringToFront(win) {
  win.style.zIndex = ++topLayer;
}

function updateTaskbar() {
  const anyOverlayOpen = OVERLAY_WINDOWS.some((id) => !windowElement(id).hidden);
  document.body.classList.toggle('overlay-open', anyOverlayOpen);

  const tasks = $('#tasks');
  tasks.replaceChildren();
  openWindows.forEach((id) => {
    const win = windowElement(id);
    const button = document.createElement('button');
    button.textContent = WINDOW_NAMES[id];
    button.dataset.task = id;
    button.classList.toggle('active', !win.hidden && isOnTop(win));
    button.setAttribute('aria-label', `Show or minimize ${WINDOW_NAMES[id]}`);
    tasks.append(button);
  });
}

function showWindow(id) {
  const win = windowElement(id);
  if (!win) return;
  if (id === 'cv') loadCv();

  win.hidden = false;
  bringToFront(win);
  if (WINDOW_NAMES[id]) openWindows.add(id);
  updateTaskbar();
}

// close = false minimizes (keeps the taskbar button), close = true removes it.
function hideWindow(id, close = false) {
  const win = windowElement(id);
  if (!win) return;

  win.hidden = true;
  if (close) openWindows.delete(id);
  updateTaskbar();

  if (id === 'project') {
    // Closing a project returns to the folder it was opened from.
    showWindow('projects');
    $('#project-files button')?.focus();
  } else {
    $('#start').focus();
  }
}

function toggleMaximize(button) {
  const win = windowElement(button.dataset.maximize);
  const maximized = win.classList.toggle('maximized');
  button.setAttribute('aria-label', maximized ? 'Restore window' : 'Maximize window');
}

function toggleFromTaskbar(id) {
  const win = windowElement(id);
  if (win.hidden || Number(win.style.zIndex) < topLayer) showWindow(id);
  else hideWindow(id);
}

function closeStartMenu() {
  $('#start-menu').hidden = true;
  $('#start').setAttribute('aria-expanded', 'false');
}

function resetDesktop() {
  $$('.window').forEach((win) => {
    win.style.left = '';
    win.style.top = '';
    win.style.zIndex = '';
    win.classList.remove('maximized');
  });
  $('#profile-window').hidden = false;
  $('#note-window').hidden = false;
  ['project', 'projects', 'cv', 'contact', 'privacy', 'notepad', 'mines'].forEach((id) =>
    hideWindow(id, true),
  );
  $$('[data-maximize]').forEach((button) => button.setAttribute('aria-label', 'Maximize window'));
  render('home');
  closeStartMenu();
}

// Windows can be dragged by their title bar (desktop only).
function makeDraggable(win) {
  const bar = win.querySelector('.titlebar');
  let offset = null; // pointer position inside the window while dragging

  win.addEventListener('pointerdown', () => {
    bringToFront(win);
    updateTaskbar();
  });

  bar.addEventListener('pointerdown', (event) => {
    const cannotDrag =
      event.target.closest('button') ||
      win.classList.contains('maximized') ||
      innerWidth <= MOBILE_BREAKPOINT ||
      event.button !== 0;
    if (cannotDrag) return;

    const rect = win.getBoundingClientRect();
    offset = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    bar.setPointerCapture(event.pointerId);
  });

  bar.addEventListener('pointermove', (event) => {
    if (!offset) return;
    const left = Math.min(innerWidth - win.offsetWidth, event.clientX - offset.x);
    const top = Math.min(innerHeight - 70, event.clientY - offset.y);
    win.style.left = `${Math.max(0, left)}px`;
    win.style.top = `${Math.max(0, top)}px`;
  });

  const stopDrag = () => {
    offset = null;
  };
  bar.addEventListener('pointerup', stopDrag);
  bar.addEventListener('pointercancel', stopDrag);
}

// Keep dragged windows on screen when the browser is resized.
function keepWindowsOnScreen() {
  $$('.window').forEach((win) => {
    if (!win.style.left) return;
    const left = Math.min(parseFloat(win.style.left), innerWidth - win.offsetWidth);
    const top = Math.min(parseFloat(win.style.top) || 0, innerHeight - 100);
    win.style.left = `${Math.max(0, left)}px`;
    win.style.top = `${Math.max(0, top)}px`;
  });
}

/* ------------------------------------------------------------------ */
/* 7. Event listeners                                                  */
/* ------------------------------------------------------------------ */

// Which element should get focus after a window is opened from a link or icon.
const FOCUS_ON_OPEN = {
  notepad: '#notepad',
  contact: '#contact-message',
  privacy: '#privacy-window .privacy-body',
  mines: '#new-game',
};

// One click handler for the whole page; elements declare what they do with data-* attributes:
//   data-page="about"      show a page in the Personal Explorer
//   data-open="cv"         open a window
//   data-project="MockLang" open a project in the project viewer
//   data-close / data-minimize / data-maximize   window buttons
//   data-task="cv"         taskbar button
document.addEventListener('click', (event) => {
  const target = event.target;

  const pageLink = target.closest('[data-page]');
  if (pageLink) {
    event.preventDefault();
    render(pageLink.dataset.page, true, true);
    closeStartMenu();
  }

  const opener = target.closest('[data-open]');
  if (opener) {
    event.preventDefault();
    const id = opener.dataset.open;
    showWindow(id);
    closeStartMenu();
    if (FOCUS_ON_OPEN[id]) $(FOCUS_ON_OPEN[id]).focus();
  }

  const projectFile = target.closest('[data-project]');
  if (projectFile) openProject(projectFile.dataset.project);

  const closeButton = target.closest('[data-close]');
  if (closeButton) hideWindow(closeButton.dataset.close, true);

  const minimizeButton = target.closest('[data-minimize]');
  if (minimizeButton) hideWindow(minimizeButton.dataset.minimize);

  const maximizeButton = target.closest('[data-maximize]');
  if (maximizeButton) toggleMaximize(maximizeButton);

  const taskButton = target.closest('[data-task]');
  if (taskButton) toggleFromTaskbar(taskButton.dataset.task);

  if (!target.closest('#start-menu') && !target.closest('#start')) closeStartMenu();
});

// Escape closes the start menu, otherwise the top-most window (never the browser).
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  if (!$('#start-menu').hidden) {
    closeStartMenu();
    return;
  }

  const topWindow = [...openWindows]
    .filter((id) => id !== 'browser' && !windowElement(id).hidden)
    .sort((a, b) => Number(windowElement(b).style.zIndex) - Number(windowElement(a).style.zIndex))[0];
  if (topWindow) hideWindow(topWindow, true);
});

$('#back').addEventListener('click', () => {
  if (historyIndex > 0) render(visitedPages[--historyIndex], false);
});

$('#forward').addEventListener('click', () => {
  if (historyIndex < visitedPages.length - 1) render(visitedPages[++historyIndex], false);
});

$('#project-filter').addEventListener('change', (event) => renderProjects(event.target.value));

$('#start').addEventListener('click', () => {
  const menu = $('#start-menu');
  menu.hidden = !menu.hidden;
  $('#start').setAttribute('aria-expanded', String(!menu.hidden));
});

$('#reset-desktop').addEventListener('click', resetDesktop);

$$('.window').forEach(makeDraggable);
window.addEventListener('resize', keepWindowsOnScreen);

/* ------------------------------------------------------------------ */
/* 8. Notepad, theme and clock                                         */
/* ------------------------------------------------------------------ */

// localStorage can throw (private mode, blocked storage), so every access is wrapped.
function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

// Theme: "teal" (default) or "mono".
document.body.classList.toggle('mono', readStorage(STORAGE_THEME) === 'mono');
$('#theme-toggle').addEventListener('click', () => {
  const mono = document.body.classList.toggle('mono');
  writeStorage(STORAGE_THEME, mono ? 'mono' : 'teal');
});

// Notepad: saved only in this visitor's browser, can be exported as .txt.
const notepad = $('#notepad');
notepad.value = readStorage(STORAGE_NOTE) || '';
notepad.addEventListener('input', () => {
  const saved = writeStorage(STORAGE_NOTE, notepad.value);
  $('#save-status').textContent = saved ? 'Saved in this browser' : 'Use Save as .txt to keep your note';
});

$('#download-note').addEventListener('click', () => {
  const file = new Blob([notepad.value], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'my-notes.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

function updateClock() {
  const now = new Date();
  const clock = $('#clock');
  clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  clock.dateTime = now.toISOString();
  clock.title = now.toLocaleDateString([], { dateStyle: 'full' });
}

/* ------------------------------------------------------------------ */
/* 9. Contact form                                                     */
/* ------------------------------------------------------------------ */

// The Worker checks the message and forwards it to Telegram. Code: worker/contact-worker.js
// Request/response contract: worker/README.md (section "Responses").
const CONTACT_WORKER_URL = 'https://portfolio-contact.zzibra07.workers.dev/contact';
// The Worker only accepts this origin. A local copy (file:// or localhost) cannot send.
const CONTACT_ALLOWED_ORIGIN = 'https://shinahov.github.io';
const CONTACT_TIMEOUT_MS = 10000; // the Worker gives Telegram 7 s, so 10 s is enough
const MESSAGE_MAX_LENGTH = 2000;

// What the visitor sees for each error code from the Worker.
const CONTACT_ERRORS = {
  invalid: 'Please check your message (1–2000 characters) and try again.',
  too_large: 'Your message is too long.',
  default: 'Sorry, that did not work. Please send me an email instead (address below).',
};
const CONTACT_UNCONFIRMED =
  'Could not reach the server, so I may not have received it. Please send me an email instead (address below).';
const CONTACT_LOCAL_COPY =
  'This is a local copy: sending only works on the published site (shinahov.github.io).';

const contactForm = $('#contact-form');
const contactFieldset = contactForm.querySelector('fieldset');
const contactMessage = $('#contact-message');
const contactStatus = $('#contact-status');

function setContactStatus(text, state = '') {
  contactStatus.textContent = text;
  contactStatus.dataset.state = state; // "", "ok" or "error" — used for colour only
}

function updateMessageCounter() {
  $('#contact-counter').textContent = `${contactMessage.value.length} / ${MESSAGE_MAX_LENGTH}`;
}

async function sendContactMessage(event) {
  event.preventDefault();

  const payload = {
    name: $('#contact-name').value,
    reply_to: $('#contact-reply').value,
    message: contactMessage.value,
    website: $('#contact-website').value, // honeypot, normally empty
  };

  if (!payload.message.trim()) {
    setContactStatus('Please write a message first.', 'error');
    contactMessage.focus();
    return;
  }

  if (location.origin !== CONTACT_ALLOWED_ORIGIN) {
    setContactStatus(CONTACT_LOCAL_COPY, 'error');
    return;
  }

  // Disabling the fieldset blocks double clicks, so a message is sent only once.
  contactFieldset.disabled = true;
  setContactStatus('Sending…');

  try {
    const response = await fetch(CONTACT_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(CONTACT_TIMEOUT_MS),
    });
    const result = await response.json().catch(() => null);

    if (response.ok && result && result.ok === true) {
      contactForm.reset();
      updateMessageCounter();
      setContactStatus('Sent ✓ Thank you!', 'ok');
    } else {
      // Inputs are kept, so the visitor can fix the message or copy it into an email.
      const code = result && result.error;
      setContactStatus(CONTACT_ERRORS[code] || CONTACT_ERRORS.default, 'error');
    }
  } catch {
    // Timeout or network error: Telegram may or may not have received it.
    setContactStatus(CONTACT_UNCONFIRMED, 'error');
  } finally {
    contactFieldset.disabled = false;
  }
}

// Drafts live only in the page: closing the window (or Escape) hides it but keeps the text.
contactForm.addEventListener('submit', sendContactMessage);
contactMessage.addEventListener('input', updateMessageCounter);

/* ------------------------------------------------------------------ */
/* 10. Start-up                                                        */
/* ------------------------------------------------------------------ */

updateClock();
setInterval(updateClock, 30000);
renderProjects();
render('home');

// Allow deep links like ".../#about" or ".../#projects".
const initialPage = location.hash.slice(1);
if (initialPage === 'projects' || PAGE_TITLES[initialPage]) render(initialPage);

// On large screens the contact window is already open at start (placed next to the homepage text,
// see explorer.css). It does not take the keyboard focus. Phones get the big button instead.
const OPEN_CONTACT_AT_START = '(min-width: 1200px)';
if (matchMedia(OPEN_CONTACT_AT_START).matches || initialPage === 'contact') showWindow('contact');
