/*
 * Contact form → Telegram (Cloudflare Worker)
 *
 * The portfolio site (GitHub Pages) sends a message here. This Worker checks it
 * and forwards it to Ibragim's Telegram chat. The bot token never leaves Cloudflare.
 *
 * Contract: see Desktop/site/old-style-template/TELEGRAM-PLAN.md, sections 3 and 4.
 *
 * Settings in Cloudflare (Worker → Settings → Variables and Secrets):
 *   BOT_TOKEN       Secret  Telegram bot token from @BotFather
 *   CHAT_ID         Secret  Ibragim's chat id
 *   ALLOWED_ORIGIN  Text    https://shinahov.github.io  (exact, no trailing slash)
 *
 * This file contains no secrets and may be public.
 */

const MAX_BODY_BYTES = 16384;
const TELEGRAM_TIMEOUT_MS = 7000; // shorter than the browser's 10 s timeout

// Limits in UTF-16 code units, the same as JS .length and HTML maxlength.
const LIMITS = {
  name: 80,
  reply_to: 120,
  message: 2000,
};
const FIELDS = ['name', 'reply_to', 'message', 'website']; // "website" is the honeypot

/* ------------------------------------------------------------------ */
/* Entry point                                                         */
/* ------------------------------------------------------------------ */

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowedOrigin = origin && origin === env.ALLOWED_ORIGIN ? origin : null;

    try {
      const url = new URL(request.url);
      if (url.pathname !== '/contact') {
        return json(404, { ok: false, error: 'not_found' }, allowedOrigin);
      }

      if (request.method === 'OPTIONS') {
        return handlePreflight(request, allowedOrigin);
      }
      if (request.method !== 'POST') {
        return json(405, { ok: false, error: 'method' }, allowedOrigin, { Allow: 'POST, OPTIONS' });
      }

      // Stops other websites from using this Worker through a visitor's browser.
      // Not authentication: tools like curl can fake this header.
      if (!allowedOrigin) {
        return json(403, { ok: false, error: 'origin' }, null);
      }

      const contentType = request.headers.get('Content-Type') || '';
      if (!contentType.toLowerCase().startsWith('application/json')) {
        return json(415, { ok: false, error: 'content_type' }, allowedOrigin);
      }

      let raw;
      try {
        raw = await readLimitedBody(request, MAX_BODY_BYTES);
      } catch (error) {
        if (error instanceof BodyTooLargeError) {
          return json(413, { ok: false, error: 'too_large' }, allowedOrigin);
        }
        throw error;
      }

      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        return json(400, { ok: false, error: 'invalid' }, allowedOrigin);
      }

      const message = validate(data);
      if (!message) {
        return json(400, { ok: false, error: 'invalid' }, allowedOrigin);
      }

      // Honeypot filled → pretend success, send nothing.
      if (message.website !== '') {
        return json(200, { ok: true }, allowedOrigin);
      }

      if (!env.BOT_TOKEN || !env.CHAT_ID) {
        console.error('contact-worker: BOT_TOKEN or CHAT_ID is not configured');
        return json(500, { ok: false, error: 'internal' }, allowedOrigin);
      }

      const delivered = await sendTelegram(env, formatText(message));
      if (!delivered) {
        return json(502, { ok: false, error: 'telegram' }, allowedOrigin);
      }
      return json(200, { ok: true }, allowedOrigin);
    } catch (error) {
      // Never log the request body; only the error type.
      console.error('contact-worker: unexpected error', error && error.name);
      return json(500, { ok: false, error: 'internal' }, allowedOrigin);
    }
  },
};

/* ------------------------------------------------------------------ */
/* HTTP helpers                                                        */
/* ------------------------------------------------------------------ */

function corsHeaders(allowedOrigin) {
  if (!allowedOrigin) return {};
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function json(status, body, allowedOrigin, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      Vary: 'Origin',
      ...corsHeaders(allowedOrigin),
      ...extraHeaders,
    },
  });
}

function handlePreflight(request, allowedOrigin) {
  const requestedMethod = request.headers.get('Access-Control-Request-Method');
  if (!allowedOrigin || requestedMethod !== 'POST') {
    return json(403, { ok: false, error: 'origin' }, null);
  }
  return new Response(null, {
    status: 204,
    headers: { 'Cache-Control': 'no-store', Vary: 'Origin', ...corsHeaders(allowedOrigin) },
  });
}

class BodyTooLargeError extends Error {
  constructor() {
    super('body too large');
    this.name = 'BodyTooLargeError';
  }
}

// Reads the body as text, but stops as soon as more than maxBytes arrive.
// Does not trust Content-Length (it can be missing or wrong).
async function readLimitedBody(request, maxBytes) {
  if (!request.body) return '';

  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new BodyTooLargeError();
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

/* ------------------------------------------------------------------ */
/* Validation and message text                                         */
/* ------------------------------------------------------------------ */

// Returns the cleaned message, or null if the data does not match the contract.
function validate(data) {
  const isPlainObject = data !== null && typeof data === 'object' && !Array.isArray(data);
  if (!isPlainObject) return null;

  // Exactly the four expected fields, all strings.
  const keys = Object.keys(data);
  if (keys.length !== FIELDS.length || !FIELDS.every((field) => keys.includes(field))) return null;
  if (!FIELDS.every((field) => typeof data[field] === 'string')) return null;

  const cleaned = {
    name: data.name.trim(),
    reply_to: data.reply_to.trim(),
    message: data.message.trim(),
    website: data.website.trim(),
  };

  if (cleaned.name.length > LIMITS.name) return null;
  if (cleaned.reply_to.length > LIMITS.reply_to) return null;
  if (cleaned.message.length < 1 || cleaned.message.length > LIMITS.message) return null;

  return cleaned;
}

// Plain text only (no parse_mode), so visitor input cannot inject formatting or links.
function formatText({ name, reply_to: replyTo, message }) {
  return [
    '📬 New message from your portfolio',
    '',
    `Name: ${name || '—'}`,
    `Reply to: ${replyTo || '—'}`,
    '',
    message,
  ].join('\n');
}

/* ------------------------------------------------------------------ */
/* Telegram                                                            */
/* ------------------------------------------------------------------ */

// Returns true only if Telegram confirmed the message (HTTP OK and ok === true).
// No retries: a timeout can happen after Telegram already delivered the message.
async function sendTelegram(env, text) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.CHAT_ID,
        text,
        link_preview_options: { is_disabled: true },
      }),
      signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    });

    let result = null;
    try {
      result = await response.json();
    } catch {
      // Not JSON → treated as failure below.
    }

    if (response.ok && result && result.ok === true) return true;

    // Log status and Telegram's description only (never the token or the message text).
    console.error(
      'contact-worker: Telegram rejected the message',
      response.status,
      result && result.description,
    );
    return false;
  } catch (error) {
    console.error('contact-worker: Telegram request failed', error && error.name);
    return false;
  }
}
