# ABAI BOL V2 — uploaded ZIP integration map

This file records **every user-uploaded source archive** and the concrete feature it contributes to V2. The goal is not to ship 22 full libraries into the production bundle; that would be wasteful and harmful to performance. Runtime libraries are installed where their renderer is valuable, while component/demo repositories are adapted into local ABAI BOL primitives.

| # | Uploaded ZIP | How V2 uses it | Implementation |
|---|---|---|---|
| 1 | `codrops-cinematic-scroll-animations-main-1.zip` | pinned cinematic scroll, camera-like scale/translation choreography | `src/components/FullscreenSpline.jsx` |
| 2 | `codrops-sticky-grid-scroll-main.zip` | sticky award recorder with staggered scroll-reactive cells | `src/components/LegacyGrid.jsx` |
| 3 | `helmet-main.zip` | cylindrical/tube-style 3D season composition | `src/components/MissionOrbit.jsx` |
| 4 | `gsap-threejs-codrops-master.zip` | scroll-driven scene timing and transition choreography | `FullscreenSpline.jsx`, `App.jsx` |
| 5 | `shaders-main.zip` | **runtime** Paper shader field | `@paper-design/shaders-react`, `VisualFields.jsx` |
| 6 | `motion-primitives-main.zip` | in-view reveal/value primitives and animated engineering panel transitions | `Primitives.jsx`, `EngineeringConsole.jsx` |
| 7 | `magicui-main.zip` | animated number ticker/stat pattern | `NumberTicker` in `Primitives.jsx` + `LegacyGrid.jsx` |
| 8 | `cult-ui-main.zip` | industrial cutout/dither panel language | engineering console + CSS surface treatment |
| 9 | `react-three-fiber-master.zip` | **runtime** React renderer for Three.js | `MissionOrbit.jsx` |
| 10 | `gltfjsx-master.zip` | **development pipeline** for future competition robot GLB | `npm run robot:prepare` + `ROBOT-CAD.md` |
| 11 | `gsap-ui-main.zip` | magnetic pointer interactions and GSAP micro-motion | `Magnetic` in `Primitives.jsx` |
| 12 | `ogl-master.zip` | **runtime** low-level WebGL heat/noise field | `OglHeatField` in `VisualFields.jsx` |
| 13 | `curtainsjs-master.zip` | **runtime** DOM-canvas → distorted WebGL plane | `SignalPlane.jsx` |
| 14 | `AnimBits-main.zip` | magnetic spring/tilt interaction behavior | `Magnetic` in `Primitives.jsx` |
| 15 | `motion-primitives-website-main.zip` | film grain / spotlight surface language | `FilmGrain`, legacy card surfaces |
| 16 | `Showcase-Images-main.zip` | curved 3D gallery, scan-line presentation language | `MissionOrbit.jsx` |
| 17 | `robot-web-viewer-main.zip` | robot viewport HUD, subsystem selection language | `EngineeringConsole.jsx` |
| 18 | `bravebot-website-main.zip` | robot-first technical storytelling and engineering hierarchy | `EngineeringConsole.jsx`, engineering section |
| 19 | `shadergradient-main.zip` | **runtime** animated 3D gradient matter field | `GradientMatter` in `VisualFields.jsx` |
| 20 | `aetheris-ui-main.zip` | sequence-scroll chapter progression | hero chapters in `FullscreenSpline.jsx` |
| 21 | `drei-master.zip` | **runtime** R3F helpers: Html, Float, RoundedBox, Sparkles | `MissionOrbit.jsx` |
| 22 | `react-bits-main.zip` | text scramble / high-energy text microinteraction | `ScrambleText` in `Primitives.jsx` |

## Why all archives are not copied wholesale

The final site must still be one coherent authored experience. Copying whole repositories would create conflicting animation loops, duplicate React/Three runtimes, licensing ambiguity, huge JavaScript transfer and an obvious template-collage result. V2 instead extracts a single useful idea or renderer from every archive and integrates it into one system.

## Spline robot

The supplied Spline scene is not placed in a card. `FullscreenSpline.jsx` pins it across the **entire viewport** for a multi-screen scroll sequence:

`https://my.spline.design/nexbotrobotcharacterconcept-ENZaaWT2g7BsjXiqBZyGUnKB/`

## Identity

Current public name: **ABAI BOL**  
Legacy name/history: **ANTARES** — same team.
