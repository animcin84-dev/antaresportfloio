import React, { lazy, Suspense, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './lib/hooks'
import { registerSmoothScroll, unregisterSmoothScroll } from './lib/smoothScroll'
import { useI18n } from './i18n'
import SplineHero from './components/SplineHero'
import MemorySpine from './components/MemorySpine'
import ContinuitySection from './components/ContinuitySection'
import MemoryTimeline from './components/MemoryTimeline'
import MachineChapter from './components/MachineChapter'
import MissionChapter from './components/MissionChapter'
import ArchiveDrawer from './components/ArchiveDrawer'
import PeopleChapter from './components/PeopleChapter'
import MissionNav from './components/MissionNav'
import LanguageToggle from './components/LanguageToggle'
import ContextCursor from './components/ContextCursor'

const FlightRecorder = lazy(() => import('./components/FlightRecorder'))
gsap.registerPlugin(ScrollTrigger)

function SmoothScroll({ reduced }) {
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: false, wheelMultiplier: 0.95 })
    registerSmoothScroll(lenis)
    const raf = time => lenis.raf(time * 1000)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      unregisterSmoothScroll(lenis)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [reduced])
  return null
}

function UtilityControls() {
  return <div className="utility-controls"><LanguageToggle /></div>
}

function Finale() {
  const { t } = useI18n()
  return (
    <footer className="finale transmission-finale" id="transmission" data-spine-mode="transmission">
      <div className="transmission-mark" aria-hidden="true"><i/><i/><i/></div>
      <div>
        <span>07 / TRANSMISSION · ALMATY · KAZAKHSTAN</span>
        <h2>{t('finale').split('\n').map(line => <React.Fragment key={line}>{line}<br/></React.Fragment>)}</h2>
      </div>
      <nav aria-label="External links">
        <a href="https://www.instagram.com/antares_ftc/" target="_blank" rel="noreferrer" data-cursor="OPEN">INSTAGRAM ↗</a>
        <a href="https://ftc-events.firstinspires.org/" target="_blank" rel="noreferrer" data-cursor="OPEN">FIRST ↗</a>
        <a href="#top">BACK TO SIGNAL ↑</a>
      </nav>
      <small>FORMERLY ANTARES · THE MACHINE REMEMBERS.</small>
    </footer>
  )
}

export default function App() {
  const reduced = useReducedMotion()
  return (
    <>
      <a className="skip-link" href="#continuity">Skip cinematic intro</a>
      <SmoothScroll reduced={reduced} />
      <MemorySpine reduced={reduced} />
      <ContextCursor reduced={reduced} />
      <MissionNav />
      <UtilityControls />
      <SplineHero reduced={reduced} />
      <main id="main">
        <ContinuitySection reduced={reduced} />
        <MemoryTimeline reduced={reduced} />
        <MachineChapter reduced={reduced} />
        <MissionChapter reduced={reduced} />
        <Suspense fallback={<section className="orbit-loading" aria-live="polite">LOADING FLIGHT RECORDER…</section>}>
          <FlightRecorder reduced={reduced} />
        </Suspense>
        <ArchiveDrawer />
        <PeopleChapter />
      </main>
      <Finale />
    </>
  )
}
