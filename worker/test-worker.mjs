/*
 * Local tests for contact-worker.js — no Cloudflare, no real Telegram.
 * Telegram is replaced by a fake fetch, so nothing is ever sent.
 *
 * Run:  node worker/test-worker.mjs
 */

import worker from './contact-worker.js';

const ORIGIN = 'https://shinahov.github.io';
const ENV = { BOT_TOKEN: 'test-token', CHAT_ID: '42', ALLOWED_ORIGIN: ORIGIN };
const URL_CONTACT = 'https://portfolio-contact.example.workers.dev/contact';

// ---- fake Telegram ------------------------------------------------------
let telegramCalls = [];
let telegramMode = 'ok'; // ok | http-error | ok-false | timeout | not-json
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  telegramCalls.push({ url: String(url), body: JSON.parse(options.body) });
  if (telegramMode === 'timeout') {
    // Wait until the Worker's own timeout aborts the request.
    return new Promise((_, reject) => {
      options.signal.addEventListener('abort', () => reject(options.signal.reason));
    });
  }
  if (telegramMode === 'http-error')
    return Response.json({ ok: false, description: 'Unauthorized' }, { status: 401 });
  if (telegramMode === 'ok-false')
    return Response.json({ ok: false, description: 'chat not found' }, { status: 200 });
  if (telegramMode === 'not-json') return new Response('<html>oops</html>', { status: 200 });
  return Response.json({ ok: true, result: { message_id: 1 } });
};

// AbortSignal.timeout() does not keep Node running; this does (only needed for the timeout test).
const keepAlive = setInterval(() => {}, 1000);

// ---- helpers -------------------------------------------------------------
const valid = { name: 'Anna', reply_to: 'anna@example.com', message: 'Hello Ibragim!', website: '' };

function post(
  body,
  { origin = ORIGIN, contentType = 'application/json', url = URL_CONTACT, raw = false } = {},
) {
  const headers = {};
  if (origin !== 'none') headers.Origin = origin;
  if (contentType) headers['Content-Type'] = contentType;
  return new Request(url, { method: 'POST', headers, body: raw ? body : JSON.stringify(body) });
}

let passed = 0;
let failed = 0;
async function test(name, request, expectedStatus, check = () => true, env = ENV) {
  telegramCalls = [];
  const response = await worker.fetch(request, env);
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;
  let ok = response.status === expectedStatus;
  let note = '';
  try {
    ok = ok && check({ response, body });
  } catch (error) {
    ok = false;
    note = error.message;
  }
  if (ok) passed++;
  else failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  → ${response.status} ${text} ${note}`);
}

const cors = ({ response }) => response.headers.get('Access-Control-Allow-Origin') === ORIGIN;
const noCors = ({ response }) => response.headers.get('Access-Control-Allow-Origin') === null;
const commonHeaders = ({ response }) =>
  response.headers.get('Vary') === 'Origin' && response.headers.get('Cache-Control') === 'no-store';
const sentOnce = () => telegramCalls.length === 1;
const sentNothing = () => telegramCalls.length === 0;

// ---- tests ---------------------------------------------------------------
// Valid message
await test(
  'valid message',
  post(valid),
  200,
  (r) => sentOnce() && cors(r) && commonHeaders(r) && r.body.ok === true,
);
await test('message text is plain, no parse_mode, previews off', post(valid), 200, () => {
  const sent = telegramCalls[0].body;
  return (
    sent.chat_id === '42' &&
    sent.parse_mode === undefined &&
    sent.link_preview_options.is_disabled === true &&
    sent.text.includes('Name: Anna') &&
    sent.text.includes('Reply to: anna@example.com') &&
    sent.text.endsWith('Hello Ibragim!')
  );
});
await test('optional fields empty', post({ ...valid, name: '', reply_to: '' }), 200, () =>
  telegramCalls[0].body.text.includes('Name: —'),
);

// Validation
await test('empty message', post({ ...valid, message: '' }), 400, sentNothing);
await test('whitespace-only message', post({ ...valid, message: '   \n ' }), 400, sentNothing);
await test('message 2000 chars', post({ ...valid, message: 'a'.repeat(2000) }), 200, sentOnce);
await test('message 2001 chars', post({ ...valid, message: 'a'.repeat(2001) }), 400, sentNothing);
await test('name 80 chars', post({ ...valid, name: 'n'.repeat(80) }), 200, sentOnce);
await test('name 81 chars', post({ ...valid, name: 'n'.repeat(81) }), 400, sentNothing);
await test('reply_to 121 chars', post({ ...valid, reply_to: 'r'.repeat(121) }), 400, sentNothing);
await test(
  'emoji at limit (1999 + 😀 = 2001 units)',
  post({ ...valid, message: 'a'.repeat(1999) + '😀' }),
  400,
);
await test(
  'emoji within limit (1998 + 😀 = 2000 units)',
  post({ ...valid, message: 'a'.repeat(1998) + '😀' }),
  200,
);
await test('missing field', post({ name: '', reply_to: '', message: 'hi' }), 400, sentNothing);
await test('extra field', post({ ...valid, extra: 'x' }), 400, sentNothing);
await test('number instead of string', post({ ...valid, message: 123 }), 400, sentNothing);
await test('array body', post([valid]), 400, sentNothing);
await test('null body', post(null), 400, sentNothing);
await test('malformed JSON', post('{"name":', { raw: true }), 400, sentNothing);
await test(
  'wrong content type',
  post(valid, { contentType: 'text/plain' }),
  415,
  (r) => sentNothing() && cors(r),
);

// Body size limit (chunked, no Content-Length)
{
  const big = JSON.stringify({ ...valid, message: 'x'.repeat(20000) });
  const stream = new ReadableStream({
    start(controller) {
      const bytes = new TextEncoder().encode(big);
      for (let i = 0; i < bytes.length; i += 1000) controller.enqueue(bytes.slice(i, i + 1000));
      controller.close();
    },
  });
  const request = new Request(URL_CONTACT, {
    method: 'POST',
    headers: { Origin: ORIGIN, 'Content-Type': 'application/json' },
    body: stream,
    duplex: 'half',
  });
  await test('body > 16 KB, chunked', request, 413, sentNothing);
}

// Honeypot
await test(
  'honeypot filled → fake success',
  post({ ...valid, website: 'http://spam' }),
  200,
  (r) => sentNothing() && r.body.ok === true,
);

// Origin and HTTP
await test('missing origin', post(valid, { origin: 'none' }), 403, (r) => sentNothing() && noCors(r));
await test('null origin', post(valid, { origin: 'null' }), 403, sentNothing);
await test(
  'wrong origin',
  post(valid, { origin: 'https://evil.example' }),
  403,
  (r) => sentNothing() && noCors(r),
);
await test('origin with trailing slash', post(valid, { origin: ORIGIN + '/' }), 403, sentNothing);
await test(
  'GET',
  new Request(URL_CONTACT, { headers: { Origin: ORIGIN } }),
  405,
  (r) => r.response.headers.get('Allow') === 'POST, OPTIONS',
);
await test('unknown path', post(valid, { url: 'https://x.workers.dev/other' }), 404, sentNothing);
await test(
  'OPTIONS valid preflight',
  new Request(URL_CONTACT, {
    method: 'OPTIONS',
    headers: {
      Origin: ORIGIN,
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'content-type',
    },
  }),
  204,
  (r) => cors(r) && r.response.headers.get('Access-Control-Allow-Headers') === 'Content-Type',
);
await test(
  'OPTIONS wrong origin',
  new Request(URL_CONTACT, {
    method: 'OPTIONS',
    headers: { Origin: 'https://evil.example', 'Access-Control-Request-Method': 'POST' },
  }),
  403,
  noCors,
);
await test(
  'OPTIONS wrong method',
  new Request(URL_CONTACT, {
    method: 'OPTIONS',
    headers: { Origin: ORIGIN, 'Access-Control-Request-Method': 'DELETE' },
  }),
  403,
);

// Telegram failures
telegramMode = 'http-error';
await test(
  'Telegram HTTP error (wrong token)',
  post(valid),
  502,
  (r) => cors(r) && r.body.error === 'telegram',
);
telegramMode = 'ok-false';
await test('Telegram 200 but ok:false', post(valid), 502);
telegramMode = 'not-json';
await test('Telegram answers non-JSON', post(valid), 502);
telegramMode = 'timeout';
await test('Telegram timeout (7 s, no retry)', post(valid), 502, sentOnce);
telegramMode = 'ok';

// Configuration
await test('missing BOT_TOKEN', post(valid), 500, sentNothing, { ...ENV, BOT_TOKEN: '' });
await test('missing ALLOWED_ORIGIN → everything 403', post(valid), 403, sentNothing, {
  ...ENV,
  ALLOWED_ORIGIN: undefined,
});

globalThis.fetch = realFetch;
clearInterval(keepAlive);
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
