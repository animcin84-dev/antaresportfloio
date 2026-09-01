import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { awards } from '../data'
import { NumberTicker, Reveal } from './Primitives'

gsap.registerPlugin(ScrollTrigger)

// Source DNA:
// - codrops-sticky-grid-scroll-main.zip: sticky grid + staggered scroll choreography
// - magicui-main.zip: animated number/stat treatment
// - motion-primitives-website-main.zip: layered grain/spotlight surface treatment
export default function LegacyGrid({ reduced }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.legacy-card')
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: .18, y: 70 + (i % 3) * 18, scale: .96 },
          {
            opacity: 1, y: 0, scale: 1,
            scrollTrigger: { trigger: card, start: 'top 92%', end: 'top 58%', scrub: .7 },
          }
        )
      })
      gsap.to('.legacy-sticky-line b', {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="legacy-grid-section" ref={root} id="record">
      <div className="legacy-sticky">
        <div className="legacy-kicker"><span>05 / FLIGHT RECORDER</span><span>ANTARES → ABAI BOL</span></div>
        <Reveal><h2>THE RECORD<br/><em>DOESN'T RESET.</em></h2></Reveal>
        <div className="legacy-count"><NumberTicker value={awards.length} /><span>RECORDED<br/>DISTINCTIONS</span></div>
        <p>The public identity changed. The engineering record stays attached to the same team story.</p>
        <div className="legacy-sticky-line"><b /></div>
      </div>
      <div className="legacy-grid">
        {awards.map((award, i) => (
          <article className="legacy-card" key={`${award.date}-${award.event}-${i}`}>
            <span>{String(i + 1).padStart(2, '0')} / {String(awards.length).padStart(2, '0')}</span>
            <small>{award.date} · {award.location}</small>
            <h3>{award.event}</h3>
            <b>{award.result}</b>
            <i aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  )
}
