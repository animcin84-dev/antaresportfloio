# ABAI BOL V3 — uploaded source integration ledger

This ledger records the uploaded ZIP/source packs and the concrete responsibility each contributes to V3. **Using every source does not mean installing every repository as a production dependency.** That would duplicate renderers, animation loops and React versions and would directly damage performance/usability. V3 uses three modes:

- **RUNTIME** — the package/library is intentionally shipped in production.
- **ADAPTED SOURCE** — implementation patterns from the uploaded source were rewritten into ABAI BOL-owned components.
- **AUTHORING / QA** — the uploaded source or skill is used as an engineering constraint, review checklist or authoring reference and is not added to the client bundle.

## Wave 1 — creative-development and robotics sources

| # | Uploaded source | Mode | Concrete V3 use |
|---|---|---|---|
| 1 | `codrops-cinematic-scroll-animations-main-1.zip` | ADAPTED SOURCE | long pinned hero choreography and scroll-state pacing in `FullscreenSpline.jsx` |
| 2 | `codrops-sticky-grid-scroll-main.zip` | ADAPTED SOURCE | staggered scroll-reactive Flight Recorder in `LegacyGrid.jsx` |
| 3 | `helmet-main.zip` | ADAPTED SOURCE | cylindrical mission composition and depth hierarchy in `MissionOrbit.jsx` |
| 4 | `gsap-threejs-codrops-master.zip` | ADAPTED SOURCE | GSAP ↔ WebGL sequencing discipline across hero/orbit transitions |
| 5 | `shaders-main.zip` | RUNTIME | Paper shader fields via `@paper-design/shaders-react` in `VisualFields.jsx` |
| 6 | `motion-primitives-main.zip` | ADAPTED SOURCE | reveal/value transition patterns in `Primitives.jsx` and engineering UI |
| 7 | `magicui-main.zip` | ADAPTED SOURCE | animated statistic/ticker language in the Flight Recorder |
| 8 | `cult-ui-main.zip` | ADAPTED SOURCE | industrial cutout/dither surface treatment in engineering panels |
| 9 | `react-three-fiber-master.zip` | RUNTIME | primary React renderer for Three.js Mission Orbit |
| 10 | `gltfjsx-master.zip` | AUTHORING / QA | `npm run robot:prepare` GLB-to-component pipeline for the supplied Nexbot/competition assets |
| 11 | `gsap-ui-main.zip` | ADAPTED SOURCE | magnetic pointer and compact GSAP micro-interactions |
| 12 | `ogl-master.zip` | RUNTIME | lightweight heat/noise field in `OglHeatField` |
| 13 | `curtainsjs-master.zip` | RUNTIME | DOM/canvas-to-WebGL signal surface in `SignalPlane.jsx` |
| 14 | `AnimBits-main.zip` | ADAPTED SOURCE | spring/magnetic interaction behavior in local primitives |
| 15 | `motion-primitives-website-main.zip` | ADAPTED SOURCE | grain, spotlight and premium surface language |
| 16 | `Showcase-Images-main.zip` | ADAPTED SOURCE | 3D gallery depth, scanline and image-stage language used by Mission Orbit |
| 17 | `robot-web-viewer-main.zip` | ADAPTED SOURCE | technical viewport/HUD and subsystem-selection patterns |
| 18 | `bravebot-website-main.zip` | ADAPTED SOURCE | robot-first information hierarchy and engineering storytelling |
| 19 | `shadergradient-main.zip` | RUNTIME | animated gradient matter in `GradientMatter` |
| 20 | `aetheris-ui-main.zip` | ADAPTED SOURCE | step-based scroll narrative model used in hero chapters |
| 21 | `drei-master.zip` | RUNTIME | RoundedBox, Sparkles, Text and other R3F scene helpers |
| 22 | `react-bits-main.zip` | ADAPTED SOURCE | scramble/kinetic text treatment in local typography primitives |

## Wave 2 — V3 scroll, 3D, interaction and QA sources

| # | Uploaded source | Mode | Concrete V3 use |
|---|---|---|---|
| 23 | `react-spline-main.zip` | RUNTIME | replaces the V2 iframe with direct `@splinetool/react-spline`; parent scrolling no longer dies over an iframe |
| 24 | `r3f-scroll-rig-master.zip` | AUTHORING / QA | DOM/WebGL lockstep reference: V3 keeps one scroll source-of-truth and does not create independent scroll universes |
| 25 | `lenis-main.zip` | RUNTIME | smooth parent-page scrolling synchronized with GSAP ScrollTrigger in `App.jsx` |
| 26 | `react-postprocessing-master.zip` | RUNTIME | restrained Bloom + Noise + Vignette on Mission Orbit only |
| 27 | `theatre-main.zip` | AUTHORING / QA | camera/light timeline authoring reference; production stays GSAP-first to avoid a second shipped sequencing engine |
| 28 | `math-main.zip` / maath source | ADAPTED SOURCE | frame-rate-independent exponential damping pattern used for Orbit card scale/material/rotation interpolation |
| 29 | `use-gesture-main.zip` | AUTHORING / QA | gesture-state reference for pointer/touch interaction; R3F pointer state is used where an extra dependency is unnecessary |
| 30 | `hamo-main.zip` | AUTHORING / QA | performance rule: passive/centralized scroll listeners and no per-frame React state for scene animation |
| 31 | `skills-main-1.zip` | AUTHORING / QA | frontend/art-direction constraints used during V3 composition review |
| 32 | `gsap-skills-main.zip` | AUTHORING / QA | official GSAP React/ScrollTrigger lifecycle rules; timelines are context-scoped and cleaned up |
| 33 | `web-animation-skills-main.zip` | AUTHORING / QA | pinned storytelling and scroll-scrub choreography reference |
| 34 | `skills-main-2.zip` | AUTHORING / QA | interaction/accessibility review layer for animated UI |
| 35 | `ultimate-animation-skill-pack-main.zip` | AUTHORING / QA | cross-check for R3F/GSAP/GLSL motion architecture; used to avoid competing animation ownership |
| 36 | `modern-web-guidance-main.zip` | AUTHORING / QA | browser-safe responsive/performance constraints and progressive enhancement rules |
| 37 | `SKILL(3).md` — Web 3D Asset Pipeline | AUTHORING / QA | GLB/glTF shipping rules: stable transforms, compression, material reuse, KTX2/Meshopt path |
| 38 | `SKILL(4).md` — Game Playtest | AUTHORING / QA | mandates screenshot-based WebGL QA, mobile/reduced-motion checks and render-vs-UI review |
| 39 | `SKILL(5).md` — Web Performance Optimization | AUTHORING / QA | bundle/network/CWV audit checklist; Playwright + build verification are used where Chrome DevTools MCP is unavailable |

## V3 decisions that came directly from the source pack

### 1. Fullscreen robot without iframe
The original Spline iframe was replaced with direct React Spline runtime:

`https://prod.spline.design/bpyixqvv4QLqc5Hj/scene.splinecode`

This preserves the fullscreen Nexbot experience while allowing Lenis/GSAP to own page scroll.

### 2. Mission Orbit is no longer an autonomous carousel
The V2 orbit rotated by itself and used near-black cards. V3 is a **500vh pinned narrative**. Scroll progress determines the active mission, the sequence snaps between four states, and the page only releases after the final mission has passed through the camera.

### 3. Brightness and legibility are engineered, not patched
V3 uses brighter graphite materials, warm key lights, hemisphere fill, orange/purple point lights, emissive active-state materials and restrained Bloom. Card copy moved out of angled `<Html transform>` elements into camera-readable telemetry + Drei text.

### 4. Real evidence stays separate from spectacle
The final 18-item award list is explicitly labeled **team-provided**. The evidence chapter links the certificate archive rather than pretending every Drive certificate belongs to ABAI BOL.

Evidence archive:
`https://drive.google.com/drive/folders/1F8peRnkwYX_1QZd7oxoTGL5CsWw1Fm9V`

## Binary team assets

The team supplied:
- `nexbot_robot_character_concept.glb`
- ABAI BOL logo
- ANTARES logo
- real team photographs from Indonesia, Almaty, Bishkek, Daryn and Lepsi Fest
- robot photographs, prototypes and CAD renders

They are part of the V3 source-of-truth and art-direction plan. The direct Spline runtime is currently used for the hero so the V3 code can be verified independently of GitHub binary upload. The GLB pipeline is retained for a future/local competition-robot scene; real-media sections must use these supplied assets rather than stock or generated substitutes.

## Core principle

The uploaded sources are a **toolbox, not a collage**. Every pack contributes either runtime capability, rewritten implementation DNA, or a concrete QA constraint, while one coherent ABAI BOL art direction remains in control of the final experience.
