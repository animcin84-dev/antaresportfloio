import React, { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SPLINE_SCENE_URL } from '../data'
import { useQualityTier } from '../lib/performance'
import ResponsiveImage from './ResponsiveImage'

gsap.registerPlugin(ScrollTrigger)
const Spline = lazy(() => import('@splinetool/react-spline'))

class SplineBoundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

function HeroPoster({ className = '' }) {
  return (
    <div className={`spline-poster ${className}`.trim()} aria-hidden="true">
      <ResponsiveImage src="/assets/v7/robot-centerstage.avif" alt="" priority sizes="100vw" />
      <div className="spline-poster-wash" />
      <div className="spline-poster-signal"><i /><span>MACHINE ARCHIVE / STANDBY</span></div>
    </div>
  )
}

function Scene({ onReady }) {
  return (
    <Spline scene={SPLINE_SCENE_URL} onLoad={app => {
      try { app?.setZoom?.(0.96) } catch { /* runtime fallback */ }
      onReady?.()
    }} renderOnDemand style={{ width: '100%', height: '100%', touchAction: 'pan-y' }} />
  )
}

export default function SplineHero({ reduced }) {
  const root = useRef(null)
  const quality = useQualityTier()
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)
  const [phase, setPhase] = useState(0)
  const useLiveScene = !reduced && quality !== 'low'

  useEffect(() => {
    if (!useLiveScene) return
    let cancelled = false
    const mount = () => !cancelled && setMounted(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(mount, { timeout: 800 })
      return () => { cancelled = true; window.cancelIdleCallback?.(id) }
    }
    const id = window.setTimeout(mount, 220)
    return () => { cancelled = true; window.clearTimeout(id) }
  }, [useLiveScene])

  useLayoutEffect(() => {
    if (reduced) return
    let previous = 0
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: .62,
        onUpdate: self => {
          root.current?.style.setProperty('--hero-progress', self.progress)
          const next = Math.min(2, Math.floor(self.progress * 3))
          if (next !== previous) { previous = next; setPhase(next) }
        },
      })
      gsap.to('.hero-signal-copy', { opacity: 0, yPercent: -22, scrollTrigger: { trigger: root.current, start: '8% top', end: '34% top', scrub: .6 } })
      gsap.fromTo('.hero-machine-copy', { opacity: 0, y: 48 }, { opacity: 1, y: 0, scrollTrigger: { trigger: root.current, start: '30% top', end: '54% top', scrub: .6 } })
      gsap.to('.hero-machine-copy', { opacity: 0, y: -28, scrollTrigger: { trigger: root.current, start: '58% top', end: '70% top', scrub: .5 } })
      gsap.fromTo('.hero-transmission-copy', { opacity: 0, y: 44 }, { opacity: 1, y: 0, scrollTrigger: { trigger: root.current, start: '68% top', end: '90% top', scrub: .65 } })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  const phases = ['SIGNAL', 'MACHINE', 'MEMORY']

  return (
    <section className={`spline-hero spline-hero--v7 ${reduced ? 'is-reduced' : ''}`} id="top" data-spine-mode="signal" ref={root}>
      <div className="spline-hero-pin">
        <HeroPoster className={ready ? 'is-hidden' : ''} />
        {mounted && (
          <div className={`spline-live ${ready ? 'is-ready' : ''}`} aria-hidden="true">
            <SplineBoundary fallback={null}><Suspense fallback={null}><Scene onReady={() => setReady(true)} /></Suspense></SplineBoundary>
          </div>
        )}
        <div className="hero-color-field" aria-hidden="true" />
        <div className="hero-scan" aria-hidden="true" />

        <header className="site-topbar">
          <a href="#top" className="topbar-brand" data-cursor="HOME"><span className="signal-dot" />ABAI BOL</a>
          <span>FTC · ALMATY · KAZAKHSTAN</span>
          <a href="#record" data-cursor="RECORD">RECORD ↘</a>
        </header>

        <div className="hero-signal-copy">
          <span className="eyebrow">00 / SIGNAL</span>
          <div className="hero-coordinates"><span>43.2380° N</span><span>76.9455° E</span></div>
          <p>ALMATY<br/><strong>SIGNAL DETECTED</strong></p>
        </div>

        <div className="hero-machine-copy">
          <span className="eyebrow">MACHINE 01</span>
          <h1>ABAI<br/><em>BOL</em></h1>
          <p>FTC ROBOTICS · FORMERLY ANTARES</p>
        </div>

        <div className="hero-transmission-copy">
          <span className="eyebrow">MEMORY / ONLINE</span>
          <h2>THE MACHINE REMEMBERS.</h2>
          <p>Every machine carries the decisions of the one before it.</p>
        </div>

        <div className="hero-progress" aria-hidden="true"><span>{String(phase + 1).padStart(2, '0')}</span><i><b /></i><strong>{phases[phase]}</strong><small>03</small></div>
      </div>
    </section>
  )
}
