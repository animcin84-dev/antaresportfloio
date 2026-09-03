import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContinuitySection({ reduced = false }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.to('.continuity-legacy', {
        xPercent: -18,
        opacity: 0.2,
        scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 35%', scrub: 0.7 },
      })
      gsap.fromTo('.continuity-current', { yPercent: 12, opacity: 0.12 }, {
        yPercent: 0,
        opacity: 1,
        scrollTrigger: { trigger: root.current, start: 'top 65%', end: '65% 40%', scrub: 0.7 },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="continuity-section" id="continuity" data-spine-mode="continuity" ref={root}>
      <div className="chapter-meta"><span>01 / CONTINUITY</span><span>2023 → NOW</span></div>
      <div className="continuity-stage" aria-label="ANTARES becomes ABAI BOL while team memory remains intact">
        <div className="continuity-legacy">ANTARES</div>
        <div className="continuity-crossing" aria-hidden="true"><i /><span>MEMORY INTACT</span></div>
        <div className="continuity-current">ABAI BOL</div>
      </div>
      <div className="continuity-copy">
        <p>SAME TEAM.<br/>NEW IDENTITY.<br/><strong>MEMORY INTACT.</strong></p>
        <span>The name changes without erasing the machines, matches and decisions that came before it.</span>
      </div>
    </section>
  )
}
