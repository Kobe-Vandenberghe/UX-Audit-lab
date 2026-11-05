# UX Audit Lab

Ten fictional, interactive websites for studying usability through exploration. The websites deliberately mix good, poor, and context-dependent design decisions. There are no observation forms, audit panels, hints, scores, or feedback reports. Share your observations in chat when you want to discuss them.

`AGENTS.md` guides the agent's tutoring: review your findings, correct reasoning, and offer gradual hints for undiscovered points without revealing the full correction paper unless you ask.

Start a local server from this folder:

```powershell
node server.cjs
```

Open http://127.0.0.1:8000 in a browser. Keep the terminal running; Ctrl+C stops the server. Alternatively, use VS Code Live Server or `python -m http.server 8000 --bind 127.0.0.1`. Choose a site and follow the neutral task on its launch card. Use **The collection** to return and **Restart site** to restore that site's initial state. Each site also has its own address under `scenarios/`.

All payments, transfers, bookings, playback, orders, and accounts are simulated. Use fictional form details. FileFlow reads only a selected file's name and size; it does not read or transmit its contents. Passwords are used for in-memory validation only. No backend, dependencies, build step, external fonts, assets, or API requests are required. Browser refresh resets the website state; there is no learning-progress tracking.

The music player simulates playback visually; it does not produce audio. Illustrations are embedded SVGs. File previews use sample content. Fixed sample dates and records keep the exercises repeatable.

The launch page, shared controls, dialogs, responsive styles, and site interactions support keyboard use. Individual sites intentionally include the interaction choices specified in the handoff; don't assume every unusual behavior is unfinished.

`shared.js` contains the site directory, small UI helpers, and the simulation shell. `styles.css` styles the collection and shared elements. `scenarios.css` contains the individual visual identities. Each scenario has its own HTML entry point and JavaScript file in `scenarios/`. To add another site, add a directory entry in `shared.js`, an HTML entry point, and a site script that calls `mountSite`.

References: [Laws of UX](https://lawsofux.com/) and [Nielsen's 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/).

**Spoilers:** [CORRECTION-GUIDE.md](CORRECTION-GUIDE.md) is the separate correction paper for all ten scenarios, with expected findings, reasoning, improvements, and discussion notes. Read it after exploring. The websites do not load or display it.

Verification: with the server running, `node tests/smoke.cjs` runs browser interaction checks when Playwright and Google Chrome are available. If needed, install only the test tool with `npm install --no-save playwright`; the websites themselves need no packages. The suite checks the ten pages, representative user flows, local-only behavior, and mobile overflow, and saves screenshots under `tests/screenshots/`. Firefox, Safari, screen-reader behavior, and physical mobile devices have not been tested. Test assertions contain implementation details; explore the sites before reading them if you want to avoid spoilers.
