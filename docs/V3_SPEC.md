# ABAI BOL V3 — Digital Engineering Experience Spec

## Goal
Build the strongest evidence-led, award-oriented version of the ABAI BOL robotics portfolio while preserving the ANTARES history as the same team story.

## Non-negotiables
- Public identity: **ABAI BOL**.
- Historical identity: **formerly ANTARES**.
- FTC history includes the user-supplied 24924/24935-era material; do not erase the transition.
- Replace the Spline iframe hero with the user-supplied `nexbot_robot_character_concept.glb` rendered directly in React Three Fiber.
- The Nexbot GLB is a presentation character, not the FTC competition robot.
- Use the real team/robot/CAD/event photographs supplied by the user.
- Mission Orbit must be significantly brighter and readable.
- Mission Orbit must be a pinned scroll chapter: the next section is not reached until all four season states have been traversed.
- Preserve native scrolling; do not trap wheel/touch with `preventDefault()` scroll-jacking.
- Honor `prefers-reduced-motion`.
- Mobile is art-directed separately and must not require hover.
- Keep DOM text semantic/readable; WebGL is visual enhancement, not the only content layer.

## Final factual award set supplied by team
- Daryn Qualifier — 2026 — Sustain Award — Winner.
- Tamos FIRST Championship (Off-season) — 2025 — Innovate Award — Winner.
- Zhylandy Regional FIRST Championship — 2025 — Design Award — Winner.
- Bishkek Regional FIRST Championship — 2025 — Reach Award — Winner.
- FIRST Global Challenge Kazakhstan — 2025 — Innovator Award — 3rd place.
- Nusantara Regional FIRST Championship (Indonesia) — 2024 — Finalist Alliance Captain.
- Nusantara Regional FIRST Championship (Indonesia) — 2024 — Think Award — Winner.
- Nusantara Regional FIRST Championship (Indonesia) — 2024 — Control Award — 3rd place.
- Central Asia FIRST Championship — 2024 — Think Award — 3rd place.
- Central Asia FIRST Championship — 2024 — Promote Award — 3rd place.
- Central Asia FIRST Championship — 2024 — Design Award — Winner.
- Almaty Regional FIRST Championship — 2024 — Think Award — 2nd place.
- Almaty TechCup — 2023 — Control Award — 2nd place.
- Tamos FIRST Championship (Regional Qualifier) — 2023 — Control Award — Winner.
- Lepsi Fest — Connect Award — 2nd place.
- FIRST Global Challenge — Winning Alliance Award — Winner.
- FIRST Global Challenge — International Unity Award — 2nd place.
- FIRST Global Challenge — Skills Challenge — 3rd place.

## Evidence source
Certificate archive supplied by the user:
https://drive.google.com/drive/folders/1F8peRnkwYX_1QZd7oxoTGL5CsWw1Fm9V

## 3D asset
`public/assets/nexbot_robot_character_concept.glb`

Observed source asset facts from local inspection:
- GLB/glTF 2.0
- ~2.56 MB
- 123 nodes
- 43 meshes
- ~71k vertices
- ~52k faces
- no animation clips
- no embedded image textures

## Creative direction
`ABAI BOL — ENGINEERING UNDER PRESSURE`

Visual language:
- near-black graphite rather than unreadable black-on-black;
- incandescent orange/red inherited from ANTARES history;
- ABAI BOL magenta used as identity-change signal, not as a generic neon theme;
- real media as primary content;
- CAD/engineering overlays, telemetry, mission codes, event locations;
- large editorial typography and generous negative space.

## Runtime architecture
- React + Vite.
- GSAP + ScrollTrigger as the primary scroll director.
- React Three Fiber + Drei for the Nexbot hero and Mission Orbit.
- `maath` damping patterns for camera/object interpolation where useful.
- `@use-gesture/react` only for pointer/touch gestures that add real utility.
- `@react-three/postprocessing` only for restrained bloom/noise/vignette in the Orbit/hero.
- Lenis only after the iframe is gone; GSAP synchronization must be explicit.
- Theatre.js remains an authoring/reference tool unless a sequence genuinely benefits from runtime Theatre state.

## Uploaded source/skill material to apply
New final batch:
- react-spline-main.zip — API/reference only; GLB direct R3F replaces paid Spline export/runtime dependency.
- r3f-scroll-rig-master.zip — DOM/WebGL synchronization patterns.
- lenis-main.zip — smooth-scroll + scroll lifecycle patterns.
- react-postprocessing-master.zip — restrained post-processing.
- theatre-main.zip — cinematic authoring patterns.
- math-main.zip — damping/easing/math patterns.
- use-gesture-main.zip — touch/pointer gesture patterns.
- hamo-main.zip — performant React scroll/resize/intersection hooks patterns.
- skills-main-1.zip — curated frontend/engineering guidance references.
- gsap-skills-main.zip — official GSAP core/React/ScrollTrigger patterns.
- web-animation-skills-main.zip — pinned storytelling and 60fps motion guidance.
- skills-main-2.zip — supplemental skill references.
- ultimate-animation-skill-pack-main.zip — composition recipes/presets reference.
- modern-web-guidance-main.zip — modern frontend/performance/accessibility guidance.
- SKILL(3).md — GLB/glTF shipping pipeline.
- SKILL(4).md — screenshot/browser/WebGL QA.
- SKILL(5).md — performance audit workflow.

Previously supplied ZIP pack remains part of the reference system and is documented in `SOURCE-INTEGRATION.md`.

## Required QA
- `npm run build` passes.
- Browser smoke tests pass.
- Fullscreen Nexbot GLB renders without iframe.
- Mission Orbit shows four states and scroll progress.
- Orbit active card text is readable at desktop and mobile sizes.
- User cannot reach the following chapter until the pinned Orbit timeline completes naturally.
- No page-level horizontal overflow at 390px width.
- Reduced-motion mode removes long pinned/scrub journeys and continuous autonomous rotation.
- No browser `pageerror` / uncaught errors.
- Desktop and mobile screenshots captured in CI.
