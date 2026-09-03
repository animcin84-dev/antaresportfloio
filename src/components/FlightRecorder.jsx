import React, { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { awards, awardsByYear, EVIDENCE_DRIVE_URL, recordYears, seasons } from '../data'
import { scrollToPosition } from '../lib/smoothScroll'
import ResponsiveImage from './ResponsiveImage'
import EvidenceViewer from './EvidenceViewer'

gsap.registerPlugin(ScrollTrigger)

export default function FlightRecorder({ reduced = false }) {
  const root = useRef(null)
  const triggerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState(null)
  const evidenceTrigger = useRef(null)
  const year = recordYears[activeIndex]
  const season = seasons.find(item => item.year === year) || seasons[activeIndex]
  const yearAwards = awardsByYear[year] || []

  useLayoutEffect(() => {
    if (reduced) return
    let previous = 0
    const trigger = ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.68,
      snap: { snapTo: 1 / (recordYears.length - 1), duration: { min: .12, max: .3 }, delay: .04 },
      onUpdate: self => {
        const next = Math.min(recordYears.length - 1, Math.round(self.progress * (recordYears.length - 1)))
        if (next !== previous) { previous = next; setActiveIndex(next) }
        root.current?.style.setProperty('--record-progress', self.progress)
      },
    })
    triggerRef.current = trigger
    return () => { triggerRef.current = null; trigger.kill() }
  }, [reduced])

  const goTo = index => {
    const next = Math.max(0, Math.min(recordYears.length - 1, index))
    setActiveIndex(next)
    if (reduced || !triggerRef.current) return
    const trigger = triggerRef.current
    const ratio = next / (recordYears.length - 1)
    scrollToPosition(trigger.start + (trigger.end - trigger.start) * ratio, { duration: .7 })
  }

  return (
    <section className={`flight-recorder ${reduced ? 'is-reduced' : ''}`} id="record" data-spine-mode="record" ref={root}>
      <div className="flight-recorder-pin">
        <div className="chapter-meta flight-meta"><span>05 / FLIGHT RECORDER</span><span>18 TEAM-PROVIDED DISTINCTIONS</span></div>

        <div className="record-orbit" aria-hidden="true">
          <i className="record-ring record-ring--a"/><i className="record-ring record-ring--b"/>
          <b className="record-sweep" />
          {recordYears.map((item, index) => <span key={item} className={index === activeIndex ? 'active' : ''} style={{ '--record-angle': `${index * 90}deg` }}>{item}</span>)}
        </div>

        <div className="record-photo" data-cursor="VIEW">
          <ResponsiveImage src={season.image} alt="" sizes="(max-width: 850px) 78vw, 31vw" />
          <span>{year}</span>
        </div>

        <div className="record-copy" aria-live="polite">
          <span>{String(activeIndex + 1).padStart(2,'0')} / 04</span>
          <h2>{year}</h2>
          <p>{season.note}</p>
          <div className="record-year-awards">
            {yearAwards.map(([awardYear, event, result], index) => (
              <article key={`${awardYear}-${event}-${index}`}><small>{event}</small><strong>{result}</strong></article>
            ))}
          </div>
          {yearAwards[0] && (
            <button
              ref={evidenceTrigger}
              className="record-evidence"
              type="button"
              onClick={() => setSelected({ year, event: yearAwards[0][1], result: yearAwards[0][2], sub: 'TEAM-PROVIDED RECORD' })}
              data-cursor="EVIDENCE"
            >
              VIEW EVIDENCE ↗
            </button>
          )}
        </div>

        <div className="record-controls" aria-label="Flight Recorder controls">
          <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0}>← PREV</button>
          <button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === recordYears.length - 1}>NEXT →</button>
        </div>
      </div>

      <div className="record-complete-shell">
        <button className="record-expand" type="button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>
          <span>{expanded ? 'COLLAPSE COMPLETE RECORD' : 'EXPAND COMPLETE RECORD'}</span><strong>18 ↘</strong>
        </button>
        {expanded && (
          <div className="record-complete-list">
            {awards.map(([awardYear, event, result], index) => (
              <article key={`${awardYear}-${event}-${index}`}><span>{String(index + 1).padStart(2,'0')}</span><b>{awardYear}</b><strong>{event}</strong><em>{result}</em></article>
            ))}
            <a href={EVIDENCE_DRIVE_URL} target="_blank" rel="noreferrer" data-cursor="OPEN">OPEN CERTIFICATE ARCHIVE ↗</a>
          </div>
        )}
      </div>

      <EvidenceViewer
        item={selected}
        onClose={() => setSelected(null)}
        returnFocusRef={evidenceTrigger}
      />
    </section>
  )
}

