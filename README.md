# Homepage components

A Next.js homepage with a local file-backed contact form.

## Requirements

Install Node.js 20 LTS or newer from https://nodejs.org/, then reopen PowerShell so `node` and `npm` are on `PATH`.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Admin dashboard

Copy `.env.example` to `.env.local`, replace `ADMIN_KEY` with a private value, and restart the dev server. Then open http://localhost:3000/admin and enter the same key. The dashboard shows contact submissions from the SQLite database and keeps the key in the current browser session only.

The first successful contact form submission creates `data/inquiries.json` and stores inquiries locally. The data file is ignored by Git. This avoids native database bindings so the project runs cleanly on Windows and newer Node.js versions.

## Production check

```powershell
npm run build
npm start
```
