import React, { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Magnetic, ScrambleText } from './Primitives'

gsap.registerPlugin(ScrollTrigger)

const SPLINE_URL = 'https://my.spline.design/nexbotrobotcharacterconcept-ENZaaWT2g7BsjXiqBZyGUnKB/'

// Source DNA:
// - codrops-cinematic-scroll-animations-main-1.zip: pinned camera-like scroll choreography
// - aetheris-ui-main.zip: sequence-scroll chapter progression
// - gsap-threejs-codrops-master.zip: transition/pinning timing discipline
// - robot-web-viewer-main.zip: viewport HUD / orbit-control language
export default function FullscreenSpline({ reduced }) {
  const section = useRef(null)
  const pin = useRef(null)
  const iframe = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [chapter, setChapter] = useState(0)

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => setChapter(Math.min(3, Math.floor(self.progress * 4))),
        },
      })
      timeline
        .to('.spline-hero-title', { yPercent: -22, opacity: .28, scale: .95, ease: 'none' }, 0)
        .to('.spline-stage iframe', { scale: 1.08, xPercent: -2, filter: 'saturate(.9) contrast(1.08)', ease: 'none' }, 0)
        .to('.spline-vignette', { opacity: .65, ease: 'none' }, 0)
        .fromTo('.hero-chapter-copy[data-step="1"]', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .18 }, .18)
        .to('.hero-chapter-copy[data-step="1"]', { opacity: 0, y: -30, duration: .14 }, .39)
        .fromTo('.hero-chapter-copy[data-step="2"]', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .18 }, .42)
        .to('.spline-stage iframe', { scale: 1.14, xPercent: 3, yPercent: -1, ease: 'none' }, .45)
        .to('.hero-chapter-copy[data-step="2"]', { opacity: 0, y: -30, duration: .14 }, .64)
        .fromTo('.hero-chapter-copy[data-step="3"]', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .18 }, .67)
        .to('.spline-stage iframe', { scale: 1.18, xPercent: 0, yPercent: -2, ease: 'none' }, .72)
    }, section)
    return () => ctx.revert()
  }, [reduced])

  const labels = ['IDENTITY', 'MACHINE', 'PRESSURE', 'NEXT MISSION']

  return (
    <section className="spline-scroll" ref={section} id="top">
      <div className="spline-pin" ref={pin}>
        <div className={`spline-stage ${loaded ? 'is-loaded' : ''}`}>
          <div className="spline-loader" aria-hidden="true">
            <span>ABAI BOL / LIVE 3D</span>
            <b>{loaded ? 'SCENE ONLINE' : 'INITIALIZING ROBOT'}</b>
          </div>
          <iframe
            ref={iframe}
            src={SPLINE_URL}
            title="ABAI BOL Nexbot interactive 3D robot"
            allow="autoplay; fullscreen"
            loading="eager"
            onLoad={() => setLoaded(true)}
          />
        </div>
        <div className="spline-vignette" aria-hidden="true" />
        <div className="spline-grid" aria-hidden="true" />

        <header className="hero-nav">
          <a className="hero-brand" href="#top"><i />ABAI BOL</a>
          <div className="hero-nav-center"><span>FTC / ALMATY</span><span>FORMERLY ANTARES</span></div>
          <Magnetic className="hero-nav-cta"><a href="#record">MISSION LOG ↘</a></Magnetic>
        </header>

        <div className="hero-corner hero-corner-left">
          <span>43.2380° N</span><span>76.9455° E</span>
        </div>
        <div className="hero-corner hero-corner-right">
          <span>INTERACTIVE 3D</span><span>DRAG / TOUCH ROBOT</span>
        </div>

        <div className="spline-hero-title">
          <p><ScrambleText trigger="view">SAME TEAM / NEW SIGNAL</ScrambleText></p>
          <h1><span>ABAI</span><span className="stroke">BOL</span></h1>
          <div className="hero-subline"><b>FORMERLY ANTARES</b><span>ENGINEERING UNDER PRESSURE</span></div>
        </div>

        <div className="hero-chapter-copy" data-step="1">
          <span>01 / MACHINE</span>
          <h2>NOT A MASCOT.<br/><em>A SIGNAL.</em></h2>
          <p>The robot owns the viewport. Interface, typography and data orbit around it instead of boxing it into a card.</p>
        </div>
        <div className="hero-chapter-copy" data-step="2">
          <span>02 / PRESSURE</span>
          <h2>BUILD.<br/>BREAK.<br/><em>REBUILD.</em></h2>
          <p>ABAI BOL treats every match as an engineering test and every failure as telemetry for the next revision.</p>
        </div>
        <div className="hero-chapter-copy" data-step="3">
          <span>03 / CONTINUITY</span>
          <h2>ANTARES<br/><em>→ ABAI BOL</em></h2>
          <p>The public name changed. The competition history, the people and the engineering culture continue.</p>
        </div>

        <div className="hero-progress">
          <span>{String(chapter + 1).padStart(2, '0')}</span>
          <i><b style={{ transform: `scaleX(${(chapter + 1) / 4})` }} /></i>
          <span>04</span>
          <strong>{labels[chapter]}</strong>
        </div>
      </div>
    </section>
  )
}
