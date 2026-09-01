import React, { useLayoutEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Magnetic, ScrambleText } from './Primitives'

gsap.registerPlugin(ScrollTrigger)

const SPLINE_SCENE = 'https://prod.spline.design/bpyixqvv4QLqc5Hj/scene.splinecode'

// V3 source integration:
// - react-spline-main.zip -> direct React runtime instead of iframe
// - codrops-cinematic-scroll-animations-main-1.zip -> long pinned cinematic chapter rhythm
// - aetheris-ui-main.zip -> scroll-sequence chapter language
// - lenis-main.zip -> parent-page scroll stays active because there is no iframe boundary
export default function FullscreenSpline({ reduced }) {
  const section = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [chapter, setChapter] = useState(0)
  const splineApp = useRef(null)

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => setChapter(Math.min(3, Math.floor(self.progress * 4))),
        },
      })

      timeline
        .to('.spline-hero-title', { yPercent: -25, opacity: .18, scale: .93 }, 0)
        .to('.spline-runtime-shell', { scale: 1.065, xPercent: -2 }, 0)
        .to('.spline-vignette', { opacity: .52 }, 0)
        .fromTo('.hero-chapter-copy[data-step="1"]', { opacity: 0, y: 54 }, { opacity: 1, y: 0, duration: .17 }, .18)
        .to('.hero-chapter-copy[data-step="1"]', { opacity: 0, y: -36, duration: .12 }, .39)
        .fromTo('.hero-chapter-copy[data-step="2"]', { opacity: 0, y: 54 }, { opacity: 1, y: 0, duration: .17 }, .42)
        .to('.spline-runtime-shell', { scale: 1.12, xPercent: 3, yPercent: -1 }, .45)
        .to('.hero-chapter-copy[data-step="2"]', { opacity: 0, y: -36, duration: .12 }, .64)
        .fromTo('.hero-chapter-copy[data-step="3"]', { opacity: 0, y: 54 }, { opacity: 1, y: 0, duration: .17 }, .67)
        .to('.spline-runtime-shell', { scale: 1.17, xPercent: 0, yPercent: -2 }, .72)
    }, section)
    return () => ctx.revert()
  }, [reduced])

  const labels = ['IDENTITY', 'MACHINE', 'PRESSURE', 'NEXT MISSION']

  return (
    <section className="spline-scroll spline-scroll-v3" ref={section} id="top">
      <div className="spline-pin">
        <div className={`spline-stage spline-stage-runtime ${loaded ? 'is-loaded' : ''}`}>
          <div className="spline-loader" aria-hidden="true">
            <span>ABAI BOL / DIRECT RUNTIME</span>
            <b>{loaded ? 'ROBOT ONLINE' : 'INITIALIZING ROBOT'}</b>
          </div>
          <div className="spline-runtime-shell">
            <Spline
              scene={SPLINE_SCENE}
              onLoad={(app) => {
                splineApp.current = app
                setLoaded(true)
              }}
            />
          </div>
        </div>

        <div className="spline-vignette" aria-hidden="true" />
        <div className="spline-grid" aria-hidden="true" />
        <div className="hero-orbit-ring" aria-hidden="true" />

        <header className="hero-nav">
          <a className="hero-brand" href="#top"><i />ABAI BOL</a>
          <div className="hero-nav-center"><span>FTC / ALMATY</span><span>FORMERLY ANTARES</span></div>
          <Magnetic className="hero-nav-cta"><a href="#record">MISSION LOG ↘</a></Magnetic>
        </header>

        <div className="hero-corner hero-corner-left"><span>43.2380° N</span><span>76.9455° E</span></div>
        <div className="hero-corner hero-corner-right"><span>DIRECT SPLINE RUNTIME</span><span>DRAG / TOUCH ROBOT</span></div>

        <div className="spline-hero-title">
          <p><ScrambleText trigger="view">SAME TEAM / NEW SIGNAL</ScrambleText></p>
          <h1><span>ABAI</span><span className="stroke">BOL</span></h1>
          <div className="hero-subline"><b>FORMERLY ANTARES</b><span>ENGINEERING UNDER PRESSURE</span></div>
        </div>

        <div className="hero-chapter-copy" data-step="1">
          <span>01 / MACHINE</span>
          <h2>FULL VIEWPORT.<br/><em>NO IFRAME WALL.</em></h2>
          <p>The Spline scene now runs directly inside React, so the parent page keeps control of scroll, timing and accessibility.</p>
        </div>
        <div className="hero-chapter-copy" data-step="2">
          <span>02 / PRESSURE</span>
          <h2>BUILD.<br/>BREAK.<br/><em>REBUILD.</em></h2>
          <p>Every match becomes an engineering test; every failure becomes evidence for the next revision.</p>
        </div>
        <div className="hero-chapter-copy" data-step="3">
          <span>03 / CONTINUITY</span>
          <h2>ANTARES<br/><em>→ ABAI BOL</em></h2>
          <p>The identity evolves without erasing the team’s competition record, people or engineering culture.</p>
        </div>

        <div className="hero-progress">
          <span>{String(chapter + 1).padStart(2, '0')}</span>
          <i><b style={{ transform: `scaleX(${(chapter + 1) / 4})` }} /></i>
          <span>04</span><strong>{labels[chapter]}</strong>
        </div>
      </div>
    </section>
  )
}
