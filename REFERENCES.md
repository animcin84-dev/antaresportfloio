# Source reference pack

This project was designed after reviewing the user-supplied downloadable source packs. The final ABAI BOL implementation is original; the repositories below were used as implementation references rather than copied wholesale.

## Uploaded packs referenced

- `codrops-cinematic-scroll-animations-main-1.zip` — cinematic scroll choreography and GSAP scene pacing.
- `codrops-sticky-grid-scroll-main.zip` — sticky storytelling/grid pacing.
- `gsap-threejs-codrops-master.zip` — DOM/WebGL transition architecture.
- `shaders-main.zip` and `shadergradient-main.zip` — procedural gradient/shader language.
- `motion-primitives-main.zip` and `motion-primitives-website-main.zip` — restrained motion primitives and interaction patterns.
- `magicui-main.zip`, `cult-ui-main.zip`, `AnimBits-main.zip`, `gsap-ui-main.zip`, `aetheris-ui-main.zip`, `react-bits-main.zip` — reusable interaction and UI patterns.
- `react-three-fiber-master.zip`, `drei-master.zip`, `gltfjsx-master.zip` — future competition-robot 3D/CAD pipeline.
- `Showcase-Images-main.zip` — immersive gallery composition references.
- `curtainsjs-master.zip` and `ogl-master.zip` — lightweight DOM/WebGL techniques.
- `robot-web-viewer-main.zip` and `bravebot-website-main.zip` — robotics-specific presentation and technical information architecture.

## What is actually shipped

The site keeps its dependency surface intentionally small: React + Vite + GSAP. The Spline robot is embedded from the scene supplied by the user. Heavy reference libraries are not vendored into production merely to inflate the stack.

This keeps the first-load footprint, maintenance cost and licensing surface lower while preserving the strongest interaction ideas from the reference pack.
