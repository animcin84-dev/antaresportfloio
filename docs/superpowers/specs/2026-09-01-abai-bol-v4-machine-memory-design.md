# ABAI BOL V4 — MACHINE MEMORY

Date: 2026-09-01
Status: Design specification for review
Branch: `v4-machine-memory-design`

## 1. Product intent

ABAI BOL V4 is not a collection of WebGL effects and not a generic futuristic robotics portfolio. It is a digital identity experience for a real FTC team from Almaty whose history spans ANTARES → ABAI BOL, multiple robot generations, international competition, awards, engineering iteration and real people.

The core idea is:

> **THE MACHINE REMEMBERS.**

The website treats every robot, match, failure, award, trip and rebrand as memory carried into the next machine.

Primary goals:
1. Present ABAI BOL as the current identity.
2. Preserve ANTARES as a visible historical chapter, not the current visual system.
3. Make real team photography, robots, CAD and certificates the main design material.
4. Create one memorable signature interaction instead of many disconnected effects.
5. Preserve excellent usability, mobile experience, accessibility and Core Web Vitals despite immersive 3D.
6. Prepare a credible Awwwards SOTD + Developer Award submission, without claiming or guaranteeing a win.

## 2. Awwwards-oriented quality model

Internal score targets before submission:
- Design: 8.3+
- Usability: 8.0+
- Creativity: 8.3+
- Content: 8.0+
- Developer quality: 8.0+

Public-site priorities follow the Awwwards voting model:
- Design: highest priority
- Usability: second priority
- Creativity: third priority
- Content: must be credible and useful, not filler

Developer quality is treated separately across performance/WPO, responsive behavior, semantics/SEO, markup/meta-data, animations/transitions and accessibility.

## 3. Brand system

### 3.1 Current identity
ABAI BOL must visually dominate the current experience.

Current palette:
- Graphite / near black background
- Warm ivory text and editorial surfaces
- ABAI BOL magenta as the primary live signal color
- Neutral metal/silver for engineering UI

The final magenta value must be sampled from a vector/original logo, not guessed from a compressed JPG.

### 3.2 Historical identity
ANTARES red/orange is retained only in archive/history moments.

Color narrative:
`ANTARES RED → transitional heat → ABAI BOL MAGENTA`

Color therefore communicates time and identity, not decoration.

### 3.3 Logo motion language
The ABAI BOL feline/tail form becomes a recurring motion system:
- route line
- section progress
- SVG mask
- page transition
- underline
- certificate timeline
- cursor trail in selected areas

Do not paste the full logo into every section.

## 4. Typography

Current generic Inter + IBM Plex Mono treatment will be reduced.

Final typography uses:
- distinctive display grotesk/variable face for editorial headlines
- calm readable sans for body copy
- mono only for genuine technical information: coordinates, robot IDs, dates, telemetry, award indices

Rules:
- no site-wide tiny uppercase mono
- no generic “cyber HUD” everywhere
- body copy stays readable and calm
- headline motion must not destroy text selection/semantics

## 5. Narrative architecture

### Chapter 00 — Signal / Entry
Goal: immediate identity, fast LCP.

Visible immediately:
- ABAI BOL mark
- FTC · ALMATY · KAZAKHSTAN
- one line: `THE MACHINE REMEMBERS.`

The 3D character loads behind HTML. No long loader.

### Chapter 01 — Digital Guide
Nexbot is explicitly labeled as a digital guide/character, not the competition robot.

Use the uploaded GLB directly in R3F in the final production build if it matches the intended character. Remove Spline runtime from production when direct GLB control is stable.

Scroll choreography:
- establish character
- camera approaches core/chest
- character becomes gateway into team memory

### Chapter 02 — Memory Core [signature interaction]
This is the one interaction visitors should remember.

Scroll enters the character/core and reveals a chronological memory sequence:
- 2023 — ANTARES, early robots, TechCup/Tamos
- 2024 — Indonesia/Nusantara, major results, Central Asia
- 2025 — Almaty/Bishkek/FGC/robot evolution
- 2026 — Daryn/Lepsi and transition into ABAI BOL

Real photography and robot imagery are composited into the memory sequence.

The final memory state resolves from ANTARES red into ABAI BOL magenta.

### Chapter 03 — Identity Shift
Large but restrained transition:
`ANTARES → ABAI BOL`

Explain the relationship in one concise factual paragraph. Avoid vague rebrand language.

### Chapter 04 — Robot Lineage
Headline:
`NOT ONE ROBOT. A LINEAGE.`

This chapter uses real team robot photos, CAD/render images and prototype shots.

Each iteration uses a three-part explanation:
- Problem
- Decision
- Change

No invented mechanical details. Only publish details supplied by team evidence.

### Chapter 05 — Engineering
Four real systems:
- Mechanical
- Controls/Electronics
- Software/Autonomy
- Iteration/Testing

Each system uses real evidence:
- close-up photos
- CAD
- code screenshots/snippets
- telemetry/logs
- test video
- diagrams

The current abstract Engineering Console becomes a factual engineering explorer.

### Chapter 06 — Missions
Full-bleed documentary chapters, not small cards.

Flagship story:
`ALMATY → DEPOK / NUSANTARA 2024`

Scroll progression:
- location/date
- qualification rank
- Think Award Winner
- Finalist Alliance Captain
- Control Award result
- team photo / human moment

Additional mission chapters:
- Almaty
- Bishkek
- Daryn
- Lepsi
- FGC

### Chapter 07 — Mission Orbit / Memory Carousel
Mission Orbit remains one of only two long cinematic scroll locks.

Rules:
- 4 season states
- active memory dominates 55–65% viewport height
- each active state uses real image/media instead of abstract blank panels
- inactive states remain visible as context
- clear progress indicator
- native-scroll-based progress; no wheel-event prison
- next chapter becomes reachable after final state

Desktop can use 3D.
Mobile uses a shorter/lighter cut with reduced postprocessing.

### Chapter 08 — Achievements
Split into two tiers.

#### Hero achievements
5–7 most important wins/results with photography + certificate/evidence.

#### Complete record
Compact archive/table for all team-provided distinctions.

Do not show 18 identical visual cards.

### Chapter 09 — Evidence
Certificates open in an on-site lightbox/detail view.

Each evidence view includes:
- event
- date
- location
- result
- certificate image/PDF preview
- external source link where available

Google Drive remains source/archive, not the primary user experience.

### Chapter 10 — Team
Headline:
`PEOPLE BUILD THE MACHINE.`

Use:
- strong current group photo
- individual portraits
- name
- role
- specialty

No generic discipline cards as a replacement for actual people.

### Chapter 11 — Impact
Only verified outreach data.

Show:
- events
- schools/communities
- participant/reach counts when documented
- photos
- partner logos

No invented metrics.

### Chapter 12 — Next Mission / Footer
The ending becomes intentionally quiet after the immersive experience.

Include:
- ABAI BOL vector mark
- Almaty
- FTC/team number(s) with clear history
- Instagram
- FIRST profile
- contact
- sponsors
- credits

No heavy WebGL in footer.

## 6. Interaction system

### Allowed long scroll locks
Only:
1. Hero/Memory Core
2. Mission Orbit

All other sections flow editorially.

### Cursor states
Desktop only:
- VIEW
- DRAG
- OPEN
- NEXT
- CERTIFICATE

No custom cursor on touch.

### Motion language
Use transforms/opacity wherever possible.

Recurring motions:
- ABAI tail/path draw
- memory wipe
- mechanical alignment/snap
- controlled image crop expansion
- CAD/image match transition

Avoid random glitch, goo, liquid, blur and particle effects unless tied to a specific narrative action.

### Sound
Opt-in only.

Preferred audio is real team/robot audio:
- motor
- servo
- chain
- drivetrain
- intake
- competition ambience

No autoplay soundtrack.

## 7. 3D/WebGL architecture

### Final preferred stack
- React
- Three.js
- React Three Fiber
- Drei
- GSAP + ScrollTrigger
- Lenis
- React Three Postprocessing only for limited scenes

### Production simplification
Remove runtime engines that do not justify their cost.

Target final state:
- direct GLB R3F hero instead of Spline runtime where feasible
- one shared or carefully lifecycle-managed R3F canvas where appropriate
- no simultaneous permanent Spline + R3F + OGL + Curtains + ShaderGradient canvases

### Experience Manager
A lightweight controller owns scene lifecycle.

Only the current heavy scene remains active:
- Hero active → hero scene renders
- Hero leaves → reduce/pause/dispose nonessential work
- Orbit enters → orbit scene activates
- offscreen scenes stop animation loops

### Adaptive quality
High:
- richer postprocessing
- higher DPR within budget

Medium:
- reduced effects/particles

Low/mobile:
- DPR ~1–1.25
- reduced particles
- minimal/no bloom
- static or simplified fallback when necessary

## 8. Media art direction

Real team media is primary visual content.

Photo treatment:
- full-bleed editorial crops
- selective warm/cool grading, preserving skin tones
- avoid over-processing
- consistent grain only if needed, not always-on noise

Competition imagery should retain recognizable location/event context.

Robot imagery:
- isolate key robots
- use CAD-to-photo transitions
- use close-up detail crops

AI-generated imagery is not used to fake team history, robots, awards or people.

## 9. Mobile director's cut

Mobile is a separate composition, not a shrunk desktop.

Changes:
- photography becomes more dominant
- fewer simultaneous WebGL layers
- shorter hero lock
- shorter Orbit lock
- reduced particle/postprocessing budgets
- no hover-dependent content
- large tap targets
- stable nav/index access

## 10. Accessibility

Required:
- skip link
- semantic headings/landmarks
- keyboard navigation
- visible focus
- Mission Index focus trap + focus restoration
- Escape closes overlays
- Orbit has keyboard/non-3D alternative controls
- meaningful alt text
- certificate dialogs accessible
- 200% zoom test
- reduced-motion path
- no autoplay audio
- no information communicated by color only

Reduced motion:
- removes long camera travel
- replaces 3D transitions with image/crossfade sequence
- preserves all content

## 11. SEO / metadata

Add/verify:
- canonical URL
- OG image 1200×630
- og:url
- social card metadata
- favicon/app icons
- Organization JSON-LD
- sameAs Instagram/FIRST
- sitemap.xml
- robots.txt
- EN/KZ hreflang if localization ships
- meaningful page titles/descriptions

Social preview uses real team/robot photography, not a generic shader.

## 12. Site architecture

Home remains the cinematic experience.

Deep content routes recommended:
- `/engineering`
- `/missions`
- `/team`
- `/archive`

Home sells the identity/story.
Deep pages provide complete information, SEO value and usability.

## 13. Copy rules

Remove public implementation language:
- R3F
- OGL
- shader
- direct runtime
- no iframe
- WebGL technology labels

Technology belongs in credits/case-study documentation, not the team's story.

Avoid generic AI/startup words unless evidence supports them:
- innovative
- cutting-edge
- revolutionary
- next-generation
- pushing boundaries

Preferred writing style:
- short
- factual
- memorable
- specific to the team's real experience

Example tonal lines:
- `THE MACHINE REMEMBERS.`
- `THE MACHINE CHANGES. THE METHOD STAYS.`
- `EVERY MATCH LEAVES DATA.`
- `BUILT IN ALMATY. TESTED EVERYWHERE ELSE.`

## 14. Performance budgets

External baseline goals:
- LCP ≤ 2.5 s
- INP ≤ 200 ms
- CLS ≤ 0.1

Internal stretch goals:
- LCP < 2.0 s desktop, < 2.5 s mobile
- INP < 150 ms
- CLS < 0.05
- initial JS target 120–150 KB gzip when realistic
- hero GLB ideally < 2 MB after optimization
- initial image transfer < ~700 KB where realistic
- mobile WebGL DPR ≤ 1.25
- desktop 55–60 FPS on representative hardware
- mobile ≥30 FPS, target 45+

## 15. Testing and review

### Browser/device matrix
- Chrome desktop
- Firefox desktop
- Safari/macOS where available
- iPhone Safari
- Android Chrome
- 1440×900
- 1920×1080
- 2560×1440
- 375×812
- 390×844
- 430×932
- 768×1024

### Accessibility
- keyboard-only
- screen-reader smoke pass
- reduced-motion
- 200% zoom
- large text
- no-WebGL fallback

### Performance
- Lighthouse CI
- CWV lab checks
- bundle analysis
- WebGL context/memory check
- FPS sampling
- long-task audit

### Visual jury simulation
For each major iteration:
1. blind screenshot review
2. art-direction review with design intent
3. usability review
4. accessibility review
5. performance review

Do not submit until critical issues from these passes are resolved.

## 16. Definition of ready for Awwwards submission

The site is ready only when:
- ABAI BOL current identity dominates visually
- ANTARES is clearly historical
- real team photography is integrated throughout
- robot lineage is factual and compelling
- current team members are represented
- top awards have evidence
- mobile is intentionally art-directed
- reduced-motion works
- no heavy offscreen render loops remain
- performance budgets are acceptable
- metadata/SEO are complete
- no placeholder copy/data exists
- no technical-demo language remains in public storytelling
- rights/consent for published team photos are confirmed
- credits are complete

## 17. Implementation order after spec approval

P0:
1. Vector brand system and color migration
2. Public copy rewrite
3. Direct GLB hero / Memory Core proof
4. Real media ingestion + image optimization
5. Robot Lineage
6. Mission documentary chapters
7. Orbit real-media redesign
8. Achievement hierarchy + evidence lightbox
9. Team section
10. Mobile director's cut
11. Experience Manager/performance lifecycle
12. Accessibility/SEO

P1:
13. EN/KZ localization
14. Opt-in real robot audio
15. Deep routes
16. Contextual cursor
17. credits/404/social cards

P2:
18. Final photography grading
19. multi-agent screenshot reviews
20. Awwwards submission capture and credits
