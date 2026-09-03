import React, { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ResponsiveImage from './ResponsiveImage'

gsap.registerPlugin(ScrollTrigger)

const beats = [
  ['NUSANTARA / 2024', 'THINK AWARD', 'WINNER'],
  ['FIELD RESULT', 'FINALIST', 'ALLIANCE CAPTAIN'],
  ['CONTROL', 'AWARD', '3RD PLACE'],
]

export default function MissionChapter({ reduced = false }) {
  const root = useRef(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    if (reduced) return
    let previous = 0
    const trigger = ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: self => {
        const next = Math.min(beats.length - 1, Math.floor(self.progress * beats.length))
        if (next !== previous) { previous = next; setActive(next) }
        root.current?.style.setProperty('--mission-progress', self.progress)
      },
    })
    return () => trigger.kill()
  }, [reduced])

  return (
    <section className={`mission-chapter ${reduced ? 'is-reduced' : ''}`} id="mission" data-spine-mode="mission" ref={root}>
      <div className="mission-v7-pin">
        <ResponsiveImage className="mission-v7-photo" src="/assets/v7/team-indonesia-field.avif" alt="Team at the Nusantara Regional field in Depok, Indonesia" sizes="100vw" />
        <div className="mission-v7-wash" />
        <div className="chapter-meta mission-v7-meta"><span>04 / MISSION</span><span>ALMATY → DEPOK</span></div>
        <div className="mission-route-v7" aria-label="Route from Almaty, Kazakhstan to Depok, Indonesia">
          <span>43.2380°N<br/>ALMATY / KZ</span><i><b /></i><span>DEPOK / ID<br/>2024</span>
        </div>
        <div className="mission-v7-copy" aria-live="polite">
          <small>{beats[active][0]}</small><h2>{beats[active][1]}</h2><strong>{beats[active][2]}</strong>
        </div>
      </div>
    </section>
  )
}
