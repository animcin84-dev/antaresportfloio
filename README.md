# ABAI BOL — FTC Robotics Portfolio V2

Award-oriented interactive portfolio for **ABAI BOL**, the Almaty robotics team formerly known as **ANTARES**.

This repository is intentionally separate from the earlier personal `Awwwardsportfolio` project.

## What V2 is

V2 is a robot-first interactive site rather than a template landing page:

- the supplied **Spline Nexbot fills the entire viewport** and remains interactive;
- GSAP scroll choreography turns the hero into a multi-screen 3D chapter;
- Paper Shaders, ShaderGradient and OGL create separate procedural visual fields;
- Curtains.js upgrades a DOM technical poster into a distorted WebGL plane;
- React Three Fiber + Drei power a real 3D season orbit below the fold;
- an interactive engineering console is ready for the team's future real competition-robot CAD;
- a sticky competition flight recorder presents 11 documented distinctions;
- a fullscreen Mission Index keeps the long-form experience navigable;
- mobile art direction and `prefers-reduced-motion` are first-class paths.

## Run locally

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Production verification

```bash
npm run build
npm run preview
```

The GitHub workflow additionally runs Chromium smoke tests and captures full-page desktop/mobile QA screenshots.

## Browser smoke tests

Install Chromium once:

```bash
npx playwright install chromium
```

Then:

```bash
npm run build
npm run preview -- --port 4173
# in another terminal
npm run test:smoke
```

The tests verify:

- Spline is genuinely fullscreen;
- engineering tabs work;
- the R3F canvas renders;
- the 11 award entries exist;
- mobile has no page-level horizontal overflow;
- reduced-motion removes the long pinned hero sequence;
- no top-level browser page errors occur during the tested journey.

## All uploaded ZIP sources

Every source archive supplied for the project has a concrete role. The exact **22 ZIP → feature → code file** map lives in:

[`SOURCE-INTEGRATION.md`](./SOURCE-INTEGRATION.md)

The site does **not** copy all 22 repositories wholesale. Runtime renderers are installed where useful; component/demo repositories are adapted into one coherent local design system. This avoids duplicate frameworks, incompatible animation loops and a giant initial bundle.

## Spline robot

The supplied scene is used as a fullscreen interactive hero:

`https://my.spline.design/nexbotrobotcharacterconcept-ENZaaWT2g7BsjXiqBZyGUnKB/`

## Real competition robot CAD

When the team provides its own GLB, read:

[`ROBOT-CAD.md`](./ROBOT-CAD.md)

Then place `robot.glb` in `public/` and run:

```bash
npm run robot:prepare
```

## Identity

**Current public name:** ABAI BOL  
**Legacy identity/history:** ANTARES — same team.

## Verification snapshot

The verified V2 dependency set is pinned in `package.json`. During CI, `npm audit --omit=dev` reports **0 production vulnerabilities**. Dev-only audit findings can come from build/test tooling and do not ship in the production Vite output.

Awwwards selection can never be guaranteed; the implementation is deliberately optimized for originality, usability, creative development, responsive behavior and real content rather than promising an award outcome.
