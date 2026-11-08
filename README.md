# UX Audit Lab

Eleven fictional, interactive websites: ten focused scenarios and **Roamly**, an extended European travel application. Pick a website and follow its neutral task. Discuss your observations in chat when you want a review.

## Start

```powershell
node server.cjs
```

Open **http://127.0.0.1:8000**. Keep the terminal running; Ctrl+C stops the server. The built app is included: no installation, internet, build or external service is needed to run the collection. Use the supplied Node server, which also excludes internal exercise files from the served website. For another port: `$env:PORT='8001'; node server.cjs`.

Roamly has the larger card at the end of the collection. Direct address: **http://127.0.0.1:8000/scenarios/roamly/index.html**.

Test account: `demo@roamly.example` / `Roamly2026!`. It includes sample reservations and favourites. You can also register a fictional account or book as a guest. Allow roughly 20 minutes for an initial exploration.

## Simulation boundaries

All payments, transfers, bookings, orders, support messages and accounts are fictional. Use fictional details. FileFlow reads only selected file names and sizes; music playback is visual and silent; file previews use sample content. No real email, authentication or payment service is connected.

The original ten sites keep state in memory and reset on refresh. Roamly stores local accounts, password digests, profile details, preferences, favourites and reservations in browser localStorage. Checkout drafts stay in memory; card details are never stored. Guest favourites and reservations attach to the account when you register or log in using the same browser. Password recovery uses a simulated local message. Roamly's Restart site asks before removing its browser data; smaller sites restart immediately. Travel dates and sample records are fixed for repeatable practice.

All runtime assets are local. Smaller sites use embedded SVG illustrations; Roamly includes local photography. There is no audit UI or learning-progress tracking. AGENTS.md guides chat-based tutoring. The correction guide is a separate study reference; explore before reading it.

## Editing Roamly

React, TypeScript, React Router, Tailwind CSS and Lucide source is in `roamly/src/`. From this folder:

```powershell
npm install
npm run build
```

Build output is `scenarios/roamly/`. Commit it with source changes to preserve zero-install startup. For hot reload: `npm run dev --workspace roamly`, then http://127.0.0.1:5173. The return-to-collection link requires the collection server. Hash routing supports direct links and refresh without rewrite rules.

The original scenarios use `shared.js`, `styles.css`, `scenarios.css` and individual HTML/scripts in `scenarios/`. The site directory in shared.js feeds dashboard.js.

## Verification

With dependencies installed and the collection server running:

```powershell
npm test
npm run test --workspace roamly
```

Browser checks use Playwright and installed Google Chrome, exercise both the original sites and Roamly, and save screenshots under `tests/screenshots/`. For another server port: `$env:BASE_URL='http://127.0.0.1:8001/'`. Checks use isolated contexts and fictional data. Tests contain implementation details, so explore before reading them. Firefox, Safari, screen readers and physical mobile devices have not been tested.
