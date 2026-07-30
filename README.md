# B-Sporthood

This repository contains the B-Sporthood redesign, a polished frontend demonstration for browsing and booking badminton courts in Bengaluru.

## Start the redesigned app

```bash
cd b-sporthood
npm install
npm run dev
```

The Vite development server normally starts at `http://localhost:5173`. Use Node.js 18 or newer.

The app is frontend-only: availability, demo accounts, active sessions, and bookings persist in browser storage. No backend or MongoDB setup is needed.

Demo sign-in:

- Email: `player@bsporthood.demo`
- Password: `Play123!`

Checkout uses a preconfigured mock payment method—do not enter real payment information. The `backend-app/` directory remains as a legacy reference and is outside the redesigned app’s run path.

## Quality checks

```bash
cd b-sporthood
npm run lint
npm run build
npm test
npm run test:e2e
```
