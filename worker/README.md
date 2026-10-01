# Contact Worker (Cloudflare) — contact form → Telegram

Receives messages from the contact form on the portfolio site and forwards them to Ibragim's Telegram.
The request contract is in the "Responses" table below.

| File | What it is |
|---|---|
| `contact-worker.js` | The Worker. No secrets inside, safe to be public. |
| `test-worker.mjs` | 36 local tests with a fake Telegram (nothing is ever sent). |
| `wrangler.jsonc` | Settings, only needed for publishing from the command line later. |
| `package.json` | Only tells Node that the files are ES modules (for the tests). |

## Run the tests (local, free, nothing is sent)

```powershell
cd "$HOME\Desktop\site"
node worker\test-worker.mjs
```

Expected: `36 passed, 0 failed` (takes about 7 seconds because of the timeout test).

## Put the code into Cloudflare (dashboard, no command line)

1. dash.cloudflare.com → **Workers & Pages** → **portfolio-contact**.
2. Top right: **Edit code** (`</>`).
3. Select everything in the editor, delete it, paste the full content of `contact-worker.js`.
4. **Deploy**.

Settings already done (01.10.2026), under Settings → Variables and Secrets:
`BOT_TOKEN` (Secret), `CHAT_ID` (Secret), `ALLOWED_ORIGIN` = `https://shinahov.github.io` (Text).

## First live test (PowerShell)

Replace the URL if your Worker has another one. This sends **one real message** to your Telegram:

```powershell
$url = "https://portfolio-contact.zzibra07.workers.dev/contact"
$body = '{"name":"Test","reply_to":"","message":"Hello from PowerShell","website":""}'
Invoke-RestMethod -Uri $url -Method Post -ContentType "application/json" -Body $body -Headers @{ Origin = "https://shinahov.github.io" }
```

- `ok : True` and a Telegram message → everything works.
- `403` → `ALLOWED_ORIGIN` is wrong (must be exactly `https://shinahov.github.io`, no slash).
- `500` → `BOT_TOKEN` or `CHAT_ID` missing (check that they are under *Runtime* variables, not *Build*).
- `502` → Telegram said no: token or chat ID wrong. Logs: Worker → **Observability**.

Check that a foreign site is rejected (should print an error with 403):

```powershell
Invoke-RestMethod -Uri $url -Method Post -ContentType "application/json" -Body $body -Headers @{ Origin = "https://evil.example" }
```

## Responses

| Status | Body | When |
|---|---|---|
| 200 | `{ok:true}` | sent, or honeypot filled (fake success, nothing sent) |
| 204 | – | valid CORS preflight |
| 400 | `{ok:false,error:"invalid"}` | bad JSON, wrong fields or types, lengths |
| 403 | `{ok:false,error:"origin"}` | missing, `null` or wrong origin |
| 404 / 405 | `not_found` / `method` | other path / not POST |
| 413 | `too_large` | body > 16 KB |
| 415 | `content_type` | not JSON |
| 500 | `internal` | not configured or unexpected error |
| 502 | `telegram` | Telegram error, `ok:false` or 7 s timeout (no retry) |

The Worker logs only errors (status, Telegram's short description, error type) — never the message text or the token.
