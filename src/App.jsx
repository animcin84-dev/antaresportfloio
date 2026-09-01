import React, { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FullscreenSpline from './components/FullscreenSpline'
import EngineeringConsole from './components/EngineeringConsole'
import LegacyGrid from './components/LegacyGrid'
import { CursorFollower, FilmGrain, Magnetic, Reveal } from './components/Primitives'
import { EVIDENCE_DRIVE_URL } from './data'

gsap.registerPlugin(ScrollTrigger)

const MissionOrbit = lazy(() => import('./components/MissionOrbit'))
const SignalPlane = lazy(() => import('./components/SignalPlane'))
const PaperHeatField = lazy(() => import('./components/VisualFields').then(m => ({ default: m.PaperHeatField })))
const GradientMatter = lazy(() => import('./components/VisualFields').then(m => ({ default: m.GradientMatter })))
const OglHeatField = lazy(() => import('./components/VisualFields').then(m => ({ default: m.OglHeatField })))

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])
  return reduced
}

function Boot({ reduced }) {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setDone(true), reduced ? 120 : 1250)
    return () => clearTimeout(id)
  }, [reduced])
  return (
    <div className={`boot ${done ? 'is-done' : ''}`} aria-hidden="true">
      <div className="boot-brand">ABAI BOL</div>
      <div className="boot-stack"><span>SYSTEM / INIT</span><b>ENGINEERING SIGNAL</b><div className="boot-track"><i /></div><small>ALMATY · 43.2380°N / 76.9455°E</small></div>
    </div>
  )
}

function SectionHead({ left, right, light = false }) {
  return <div className={`section-head ${light ? 'light' : ''}`}><span>{left}</span><span>{right}</span></div>
}

function Manifesto() {
  return (
    <section className="manifesto paper" id="manifesto">
      <SectionHead left="01 / MANIFESTO" right="ABAI BOL / ALMATY" light />
      <Reveal><p className="manifesto-pre">FORMERLY ANTARES · SAME TEAM / NEW SIGNAL</p></Reveal>
      <h2 className="manifesto-title"><span>ENGINEERING</span><span><em>IS HOW</em> WE</span><span>MAKE PRESSURE</span><span>USEFUL.</span></h2>
      <div className="manifesto-foot"><p>ABAI BOL is a competition robotics team from Almaty. We prototype, code, test, fail, rebuild and document the delta — because a machine only becomes reliable after the idea survives pressure.</p><div><strong>43.2380° N</strong><strong>76.9455° E</strong><span>HOME BASE / ALMATY</span></div></div>
    </section>
  )
}

function IdentityShift() {
  return (
    <section className="identity-v2 dark" id="identity">
      <Suspense fallback={<div className="visual-fallback" />}><GradientMatter /></Suspense>
      <div className="identity-v2-shade" />
      <div className="identity-v2-inner">
        <SectionHead left="02 / IDENTITY" right="CONTINUITY / 2023 → NOW" />
        <div className="identity-label"><span>LEGACY NAME</span><span>CURRENT SIGNAL</span></div>
        <div className="identity-words"><div className="identity-old">ANTARES</div><div className="identity-arrow">→</div><div className="identity-new">ABAI BOL</div></div>
        <div className="identity-statement"><h2>THE NAME<br/>CHANGED.<br/><em>THE TEAM DIDN'T.</em></h2><p>The ANTARES competition history stays visible because it belongs to the same team journey. ABAI BOL is not a reset — it is the next build.</p></div>
      </div>
    </section>
  )
}

function SignalSection() {
  return (
    <section className="signal-section paper">
      <SectionHead left="03 / SIGNAL SURFACE" right="DOM → WEBGL" light />
      <div className="signal-intro"><h2>A WEBSITE<br/>SHOULD <em>MOVE</em><br/>LIKE A MACHINE.</h2><p>Layout remains readable DOM. Selected surfaces are upgraded into shader planes instead of trapping the whole experience inside one canvas.</p></div>
      <Suspense fallback={<div className="signal-placeholder">SIGNAL BUFFERING</div>}><SignalPlane /></Suspense>
    </section>
  )
}

function Mission() {
  return (
    <section className="mission-v2 dark" id="mission">
      <Suspense fallback={null}><PaperHeatField /></Suspense><div className="mission-v2-shade" />
      <div className="mission-v2-inner">
        <SectionHead left="04 / FLAGSHIP MISSION" right="DEPOK · INDONESIA / 2024" />
        <div className="mission-v2-title"><span>ALMATY</span><i>→</i><span>DEPOK</span></div>
        <div className="mission-map"><svg viewBox="0 0 1200 420" aria-label="Stylized route from Almaty to Depok" role="img"><path className="terrain a" d="M40 120 C180 52 290 68 402 145 S616 226 720 155 S930 52 1160 132" /><path className="terrain b" d="M62 306 C218 194 337 248 450 304 S665 334 778 257 S986 205 1140 314" /><path className="route" d="M308 116 C514 26 738 58 902 282" /><circle cx="308" cy="116" r="7" /><circle cx="902" cy="282" r="7" /><text x="260" y="92">ALMATY</text><text x="922" y="300">DEPOK</text></svg></div>
        <div className="mission-facts"><article><span>02 / 15</span><b>QUALIFICATION RANK</b></article><article><span>WINNER</span><b>THINK AWARD</b></article><article><span>FINALIST</span><b>ALLIANCE CAPTAIN</b></article><article><span>III</span><b>CONTROL AWARD</b></article></div>
      </div>
    </section>
  )
}

function Engineering() {
  return (
    <section className="engineering-v2 dark" id="engineering">
      <Suspense fallback={null}><OglHeatField /></Suspense><div className="engineering-v2-shade" />
      <div className="engineering-v2-inner">
        <SectionHead left="05 / ENGINEERING" right="MECHANICAL / CONTROL / SOFTWARE / ITERATION" />
        <div className="engineering-v2-intro"><h2>ANATOMY OF<br/><em>AN ITERATION.</em></h2><p>The supplied Nexbot GLB is the presentation character; the engineering console remains organized around the team’s real competition build process rather than invented specifications.</p></div>
        <EngineeringConsole />
      </div>
    </section>
  )
}

function OrbitSection({ reduced }) {
  return (
    <>
      <section className="orbit-intro-v3 dark">
        <SectionHead left="06 / MISSION ORBIT" right="PINNED / SCROLL-DRIVEN / R3F" />
        <div className="orbit-copy"><h2>FOUR SEASONS.<br/><em>ONE CONTINUOUS BUILD.</em></h2><p>The archive is no longer an auto-spinning dark carousel. Every mission must pass through the camera before the page releases the next chapter.</p></div>
      </section>
      <Suspense fallback={<div className="orbit-fallback">INITIALIZING MISSION ORBIT…</div>}><MissionOrbit reduced={reduced} /></Suspense>
    </>
  )
}

function Evidence() {
  return (
    <section className="evidence-section paper" id="evidence">
      <SectionHead left="08 / EVIDENCE" right="CERTIFICATES / SOURCE MATERIAL" light />
      <div className="evidence-grid">
        <h2>AWARDS NEED<br/><em>RECEIPTS.</em></h2>
        <div><p>The final V3 record follows the team-supplied achievement list. The linked Drive folder is kept as the evidence archive so certificates can be checked without turning the site into a document dump.</p><a href={EVIDENCE_DRIVE_URL} target="_blank" rel="noreferrer">OPEN GOOGLE DRIVE ARCHIVE ↗</a></div>
      </div>
    </section>
  )
}

function TeamSystem() {
  const items = [['01','MECHANICAL','CAD, mechanisms, prototyping, fabrication and serviceability.'],['02','SOFTWARE','Autonomous routines, controls, vision, telemetry and state logic.'],['03','DESIGN','Identity, documentation, media and engineering communication.'],['04','IMPACT','Outreach, workshops, partnerships and community visibility.']]
  return (
    <section className="team-v2 paper" id="team"><SectionHead left="09 / TEAM SYSTEM" right="ONE MACHINE / MANY DISCIPLINES" light /><h2>BUILDING IS<br/><em>A TEAM SPORT.</em></h2><div className="team-system-grid">{items.map(([n,title,copy]) => <motion.article key={n} whileHover={{ y:-8 }} transition={{duration:.28}}><span>{n}</span><h3>{title}</h3><p>{copy}</p><i /></motion.article>)}</div></section>
  )
}

function Finale() {
  return (
    <section className="finale-v2 dark"><Suspense fallback={null}><PaperHeatField className="finale-paper-field" /></Suspense><div className="finale-shade" /><div className="finale-v2-copy"><span>NEXT BUILD / ONLINE</span><h2>ABAI<br/><em>BOL.</em></h2><p>FORMERLY ANTARES · FTC ROBOTICS · ALMATY, KAZAKHSTAN</p><div className="finale-actions"><Magnetic><a href="https://www.instagram.com/antares_ftc/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a></Magnetic><Magnetic><a href="https://ftc-events.firstinspires.org/" target="_blank" rel="noreferrer">FIRST ↗</a></Magnetic><Magnetic><a href="#top">REPLAY ↑</a></Magnetic></div></div><div className="finale-data"><span>ABAI BOL / 2026</span><span>BUILD / ITERATE / COMPETE</span></div></section>
  )
}

export default function App() {
  const reduced = useReducedMotion()
  const progress = useRef(null)

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, wheelMultiplier: .9 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis.destroy() }
  }, [reduced])

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.manifesto-title span').forEach((line, i) => gsap.from(line, { yPercent:110, opacity:0, duration:1.05, delay:i*.02, ease:'power4.out', scrollTrigger:{trigger:line,start:'top 88%'} }))
      gsap.from('.identity-old', { xPercent:-22, opacity:.1, scrollTrigger:{trigger:'.identity-v2',start:'top bottom',end:'bottom top',scrub:1} })
      gsap.from('.identity-new', { xPercent:18, opacity:.2, scrollTrigger:{trigger:'.identity-v2',start:'top bottom',end:'bottom top',scrub:1} })
      gsap.from('.mission-v2 .route', { strokeDashoffset:720, scrollTrigger:{trigger:'.mission-map',start:'top 80%',end:'bottom 45%',scrub:1} })
      gsap.from('.mission-facts article', { y:60, opacity:0, stagger:.08, duration:.8, ease:'power3.out', scrollTrigger:{trigger:'.mission-facts',start:'top 82%'} })
    })
    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    const update = () => { const max=document.documentElement.scrollHeight-innerHeight; progress.current?.style.setProperty('transform',`scaleX(${max>0?scrollY/max:0})`) }
    update(); addEventListener('scroll',update,{passive:true}); return()=>removeEventListener('scroll',update)
  }, [])

  return <><Boot reduced={reduced}/><FilmGrain/><CursorFollower reduced={reduced}/><a className="skip-link" href="#main">SKIP TO CONTENT</a><div className="global-progress"><i ref={progress}/></div><main id="main"><FullscreenSpline reduced={reduced}/><Manifesto/><IdentityShift/><SignalSection/><Mission/><Engineering/><OrbitSection reduced={reduced}/><LegacyGrid reduced={reduced}/><Evidence/><TeamSystem/><Finale/></main></>
}
