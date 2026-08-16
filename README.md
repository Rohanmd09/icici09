# iMobile Banking — UI/UX Case Study

A UI/UX case-study prototype inspired by ICICI Bank's **iMobile** app listing. Built as an installable Progressive Web App (PWA) to demonstrate mobile banking interaction design: account overview, payments, cards, bill pay, statements, and a QR scanner flow.

This is a **design prototype, not a real banking product.** There are no live banking APIs, no OTP/PIN collection, no payment processing, and no real transactions. All account data is local, mock, and used only to demonstrate the interface.

## Visual system

- **Brand color:** `#F47B20` — saffron orange, carried across the app shell.
- **Palette:** warm orange-to-maroon campaign gradients, off-white utility surfaces (`#fffaf4` / `#f7f1eb`), deep navy for secondary panels, with green/blue accents reserved for status cues.
- **Typography:** Plus Jakarta Sans for UI text, with a heavier display weight for headings.
- **Layout:** a mobile app canvas with a persistent top bar, horizontally scrollable account summary, service tiles, and a fixed bottom nav on mobile; a wider desktop presentation frame with a supporting sidebar panel.
- **Motion:** quick 160–240ms ease-out transitions and staggered first-load content.

## Tech stack

- React 19 + TypeScript, bundled with Vite
- Tailwind CSS v4, shadcn/ui (Radix primitives)
- wouter for routing
- jsPDF for the mock statement PDF export
- A small Express server (`server/index.ts`) for serving the built static files outside of Vercel (e.g. self-hosting on a Node server)

## Local development

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`.

## Production build

```bash
npm run build   # builds the frontend to dist/public and bundles server/index.ts to dist/index.js
npm start        # serves dist/public via the bundled Express server
```

## Deploying to Vercel

This repo includes a `vercel.json` that builds only the static frontend (`vite build`) and serves `dist/public` directly — Vercel's platform doesn't run the bundled Express server, and this app doesn't need it, since everything runs client-side.

1. Push this repo to GitHub.
2. Import it in Vercel — no extra configuration needed, `vercel.json` handles the build and output directory.
3. Deploy.

## Building an Android APK with PWABuilder

1. Deploy the app (e.g. to Vercel) so it's reachable over HTTPS.
2. Go to [pwabuilder.com](https://www.pwabuilder.com) and enter your deployed URL.
3. PWABuilder will read `manifest.json` and generate an Android package.
4. When PWABuilder generates your Android package, it will give you a signing certificate fingerprint and a matching `assetlinks.json` file. Host that file at `/.well-known/assetlinks.json` on your deployed domain if you want the app to open without a browser address bar (Trusted Web Activity verification). This repo intentionally ships without a placeholder `assetlinks.json`, since that file has to match your own APK's signing key.

## Project structure

```
client/           frontend (Vite root)
  src/            React app source
  public/         static assets (icons, images, manifest, service worker)
server/           minimal Express static file server (optional, non-Vercel hosting)
```
