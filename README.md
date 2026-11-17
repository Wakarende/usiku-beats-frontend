# Usiku Beats: Web Application (Frontend)

**Play it:** https://usikubeats.com/

Usiku Beats is a browser-based rhythm game built by Usiku Games. Players tap along to songs, unlock new tracks and earn rewards. It runs in mobile browsers and was distributed through MTN Ayoba, Boomplay and Google GameSnacks.

This repository is the Next.js and React application around the game: the hub, song library, onboarding, monetisation and every screen a player sees before and after a song. The Phaser game runs inside it.

> Published with Usiku Games' permission. The full commit history is kept. A deployment script containing infrastructure credentials was removed from the history before publishing.

## Stack

Next.js (App Router, static export), React, TypeScript, Tailwind CSS, Zustand, Redux, Phaser.js, framer-motion, Jest, React Testing Library, Xsolla, Google AdSense, AWS S3. The API is a separate Django REST Framework project: [usiku-beats-backend](https://github.com/Wakarende/usiku-beats-backend).

## What I built

My work in this repository is the React application around the game, the shell that mounts it, feeds it data and builds the screens around it, plus targeted fixes inside Phaser scene files.

**Song unlock and library system.** The longest-running feature in the codebase. It has a carousel with live countdown timers, 10-second song previews with background-music ducking, and a "flying card" unlock animation written as a custom React state machine rather than with an animation library. I also ran a stabilisation pass that fixed a sort-order bug and three animation race conditions: untracked timers, a stale-closure double-fire and a leftover transform.

**Onboarding.** A six-step first-time-user tutorial overlay. I rebuilt it once from scratch, then moved its state from raw `localStorage` polling into a persisted Zustand store, which removed a recurring class of boolean-logic bugs.

**State management.** I introduced Zustand alongside the existing Redux layer. Redux kept authentication; Zustand took onboarding, unlock and session state. I also fixed a hydration race between Zustand's asynchronous rehydration and the Phaser boot scene's synchronous state read.

**Payments (client side).** I built the client-side Xsolla purchase flow: the payment hook, checkout popup, callback page, `postMessage` completion handshake and a mobile fallback for browsers that don't expose `window.opener`. I also wired Google OAuth sign-in into checkout, built guest checkout and localised price display, and moved the integration from sandbox to live card payments. Reward crediting now syncs with the balance the server produces instead of trusting a client-side guess.

**Monetisation UI.** Rewarded video ads with Google AdSense, using mutation-observer ad-load detection and timed reward crediting. Also a gem-spend confirmation flow and an insufficient-currency gate.

**Desktop viewport.** The game is designed for phones, so desktop players see it in a simulated mobile viewport. My first version embedded the app in its own iframe, and it caused four months of bugs: duplicate background audio, onboarding resets and 404s on the static export. I deleted it and replaced it with a pure-CSS scaled container of about 20 lines, which removed that whole family of bugs in one change.

**Hub restructure.** I migrated the hub from legacy class components to a folder-per-feature functional structure, and built page transitions with framer-motion.

**Level-testing tools.** I added fast-forward, rewind and timestamp navigation to the internal level-testing environment, so level designers could check one section of a song without replaying the whole track.

**Fixes inside Phaser scenes.** A rhythm-cue line that could freeze on screen permanently after a song ended, a duplicate-key bug that silently dropped a required URL parameter, and wiring the economy-settings API into two scenes so unlock costs and rewards stopped being hardcoded.

**Testing and performance.** I wrote unit and component tests with Jest and React Testing Library, and tested across devices with BrowserStack and physical iOS and Android phones. On physical devices, I cut initial page load from about five seconds to about three using lazy loading, image optimisation and leaner state management.

## Two bugs worth reading about

**The payment popup that only broke in production.** After we went live with real card payments, the popup stopped reliably reporting back, and it was worse on mobile. My first fix, a mobile focus-detection fallback, helped but didn't solve it. The cause was the static Next.js export: the callback route worked in development but returned 404 in production, because the export serves `callback.html` rather than an extensionless route. I fixed it by branching the callback path on the environment.

**Background music playing twice.** On desktop, the iframe viewport meant the React tree mounted twice, and each copy started its own audio instance. I made playback idempotent by checking play state before calling play, and bridged playback-resume across the iframe boundary with `postMessage`. The later switch to the CSS container removed the iframe entirely.

## Running locally

```bash
npm install
npm run dev
```

The app expects the Usiku Beats API and Usiku's own Xsolla, AdSense and OneSignal configuration, so payments, ads and notifications will not work locally without your own credentials.
