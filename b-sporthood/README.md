# B-Sporthood Frontend

The redesigned B-Sporthood experience is a self-contained React, TypeScript, and Vite demonstration. Court availability, accounts, sessions, booking drafts, and confirmed bookings are stored locally in the browser; the legacy backend is not required.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

Demo credentials:

- Email: `player@bsporthood.demo`
- Password: `Play123!`

This is a portfolio demonstration. Checkout never requests or stores real payment details.

## Verify

```bash
npm run lint
npm test
npm run build
npm run test:e2e
```

Playwright requires a local Chromium installation. Install it once with:

```bash
npx playwright install chromium
```
