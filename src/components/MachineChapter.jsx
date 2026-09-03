import React, { useEffect, useRef, useState } from 'react'
import { machineRevisions } from '../data'
import ResponsiveImage from './ResponsiveImage'

export default function MachineChapter({ reduced = false }) {
  const [active, setActive] = useState(0)
  const refs = useRef([])
  const revision = machineRevisions[active]

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(entries => {
      const hit = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (hit) setActive(Number(hit.target.dataset.revision))
    }, { rootMargin: '-30% 0px -45% 0px', threshold: [0.2, 0.55] })
    refs.current.filter(Boolean).forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [reduced])

  return (
    <section className="machine-chapter" id="machine" data-spine-mode="machine">
      <header className="machine-heading">
        <div className="chapter-meta"><span>03 / MACHINE</span><span>LINEAGE + ENGINEERING</span></div>
        <h2>ONE VIEWPORT.<br/><em>FOUR REVISIONS.</em></h2>
        <p>The physical robot and CAD occupy the same inspection surface. Labels describe only what the supplied archive proves.</p>
      </header>

      <div className="machine-layout">
        <div className="machine-media-stage" aria-live="polite">
          {machineRevisions.map((item, index) => (
            <ResponsiveImage key={item.index} className={index === active ? 'active' : ''} src={item.image} alt={index === active ? `${item.title} — team archive` : ''} sizes="(max-width: 900px) 100vw, 58vw" />
          ))}
          <div className="machine-blueprint" aria-hidden="true"><i/><i/><i/><i/></div>
          <div className="machine-inspection">
            <span>REVISION {revision.index}</span>
            <b>{revision.mode}</b>
            {revision.inspection.map(item => <small key={item}>{item}</small>)}
          </div>
        </div>

        <div className="machine-revisions">
          {machineRevisions.map((item, index) => (
            <article ref={node => { refs.current[index] = node }} data-revision={index} className={index === active ? 'active' : ''} key={item.index}>
              <button type="button" onClick={() => setActive(index)} aria-pressed={index === active}>
                <span>{item.index}</span><strong>{item.title}</strong><i>↘</i>
              </button>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
