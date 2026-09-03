# ABAI BOL V7 — Engineering Memory

Submission-cut source for **ABAI BOL**, an FTC robotics team from Almaty, Kazakhstan, formerly **ANTARES**.

## Core idea

**THE MACHINE REMEMBERS.**

V7 is no longer structured like a robotics portfolio or a photo archive. It is an authored digital engineering-memory experience built around one line: **Every machine carries the decisions of the one before it.**

The homepage is deliberately reduced to eight chapters:

1. `00 SIGNAL` — Spline machine / Almaty signal.
2. `01 CONTINUITY` — ANTARES → ABAI BOL.
3. `02 MEMORY` — asymmetric 2023 → 2026 archive.
4. `03 MACHINE` — robot lineage and engineering evidence merged into one inspection surface.
5. `04 MISSION` — Almaty → Depok / Nusantara 2024.
6. `05 FLIGHT RECORDER` — year navigation and awards merged into the only long scroll lock.
7. `06 PEOPLE` — one group image plus discipline roster.
8. `07 TRANSMISSION` — restrained magenta finale.

## Signature interactions

- **Memory Spine** — one fixed SVG line tracks document progress and changes visual mode by chapter.
- **Machine inspection** — one sticky media viewport changes through supplied prototype, competition and CAD revisions; no invented measurements/specs.
- **Mission route** — one real Indonesia photo is used as the emotional full-screen reward instead of a gallery sequence.
- **Flight Recorder** — four-year navigation controls the active photo and year-specific supplied awards; `EXPAND COMPLETE RECORD` reveals all 18 distinctions.
- **Archive Drawer** — the larger visual archive stays accessible without living in the homepage flow.

## Production architecture

- React 19 + Vite 8
- delayed/lazy React Spline hero using the approved remote `scene.splinecode`
- GSAP + ScrollTrigger for authored scroll motion
- Lenis when reduced motion is not requested
- Motion for the chapter-index transition
- semantic DOM media with responsive WebP variants
- Playwright browser regression tests + dependency-free structural contract

Approved Spline scene:

`https://prod.spline.design/bpyixqvv4QLqc5Hj/scene.splinecode`

The supplied Nexbot GLB stays under `source-assets/robot-reference/` as reference material and is not the production hero runtime.

## Run locally

```bash
npm ci
npm run audit:static
npm run build
npx playwright install chromium
npm run test:smoke
```

`predev` and `prebuild` restore `public/assets/` from `source-assets/public-assets.tar.gz` when the repository is checked out without unpacked media. The downloadable V7 package also contains the unpacked assets directly.

Preview:

```bash
npm run preview
```

## Current verification state

Locally completed:

- V7 structural contract: **PASS / 0 FAIL**
- JS/JSX parser check: **PASS**
- packed-media restore check: **PASS** and byte-identical sentinel comparison

A local Vite build is blocked in this execution environment because `npm ci` repeatedly times out during package transport and leaves an incomplete `node_modules`. The repository quality workflow is included so the source can be independently built/tested in GitHub Actions with a normal npm network path.

## Content integrity

V7 preserves the supplied 18-distinction record and does not invent member names, robot measurements, subsystem specifications, team-number chronology, certificate imagery or FGC photography attribution that the supplied sources do not establish.

## Most valuable future source upgrades

Not blockers for V7 code, but they raise the content ceiling:

1. Engineering Portfolio / Engineering Notebook PDF.
2. Official ABAI BOL SVG/Figma/AI.
3. Spline object names / IDs / scene states.
4. Current competition robot CAD source.
5. Original-resolution hero/mission/team photography.
6. Individual certificate files.
7. Verified roster (name → role).
8. Raw robot footage / short Spline mobile fallback video.
