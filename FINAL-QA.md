# ABAI BOL V7 — Final QA

## Current status

Completed locally in the V7 working source:

- V7 static structural contract: **0 failures**
- JS/JSX syntax parser: **PASS**
- packed public-asset extraction: **PASS**
- all 18 source-supplied distinctions preserved by contract
- homepage no longer renders the V6 standalone gallery/robot/engineering/awards/orbit sections
- only Flight Recorder remains the long scroll lock

## Environment limitation

The current execution container cannot complete `npm ci`: package transport repeatedly times out and leaves package directories without their actual files or `.bin` links. Therefore a fresh local Vite/Playwright run cannot be honestly claimed from this container yet. The V7 branch includes GitHub Actions verification to run `npm ci`, static contract, production build and Chromium tests in an independent environment.

## Accessibility / resilience contract

- one semantic `<main>`
- one public H1
- visible `:focus-visible`
- skip cinematic intro
- reduced-motion route keeps all four Memory revisions and Machine revisions accessible
- low/reduced quality does not require live Spline
- Mission Index focus trap / Escape / restore
- Archive Drawer focus trap / Escape / restore
- Evidence Viewer focus trap / Escape / source link
- manual Flight Recorder Previous/Next controls
- no autoplay sound

## Content integrity

V7 intentionally does not claim unsupported:

- current roster names
- mentor/coach names
- exact robot dimensions or weight
- unverified subsystem specifications
- exact 24924 ↔ 24935 chronology
- unprovided certificate scans
- unverified FIRST Global Challenge photography attribution

## Pre-submission gate still required

1. Green GitHub/Vercel production build.
2. Chromium browser suite green.
3. Safari/iOS Safari manual pass.
4. Mid-range Android performance/scroll pass.
5. Lighthouse mobile + desktop on final CDN/domain.
6. Set final canonical URL + `og:url` + absolute sitemap URLs.
7. Capture final social card at 1200×630.
8. Run 5-second no-context hero test and 30-second memory test.
9. Removal pass after real-device use.

## High-value non-blocking content upgrades

- Engineering Portfolio / Notebook PDF
- official ABAI BOL SVG/Figma/AI
- Spline object IDs/states
- competition CAD source
- separate certificates
- verified public roster
- original-resolution selected photos
- raw robot footage + 6–10 second Spline mobile fallback
