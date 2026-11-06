# Furalmiqbadi-Web

Portfolio statis (HTML, CSS, JS) tanpa build step.

## Deploy

Cloudflare Workers Static Assets, konfigurasi di `wrangler.jsonc`:

```
npx wrangler deploy
```

`assets.directory` diarahkan ke root repo, dan `.assetsignore` menyembunyikan `.git`, `admin`, `doc`, serta file konfigurasi agar tidak ikut ter-upload.

Preview lokal:

```
npx wrangler dev
```
