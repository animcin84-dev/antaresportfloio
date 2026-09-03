import React, { useEffect, useRef, useState } from 'react'
import { memoryChapters } from '../data'
import ResponsiveImage from './ResponsiveImage'

export default function MemoryTimeline({ reduced = false }) {
  const [active, setActive] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(entries => {
      const hit = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (hit) setActive(Number(hit.target.dataset.memoryIndex))
    }, { rootMargin: '-28% 0px -48% 0px', threshold: [0.15, 0.45] })
    refs.current.filter(Boolean).forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [reduced])

  return (
    <section className="memory-timeline" id="memory" data-spine-mode="memory">
      <header className="memory-v7-heading">
        <div className="chapter-meta"><span>02 / MEMORY</span><span>2023 → 2026</span></div>
        <h2>NOT A TIMELINE.<br/><em>A TRANSFER OF DECISIONS.</em></h2>
      </header>

      <nav className="memory-v7-index" aria-label="Memory years">
        {memoryChapters.map((item, index) => (
          <button key={item.year} type="button" className={index === active ? 'active' : ''} aria-pressed={index === active} onClick={() => refs.current[index]?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' })}>
            {item.year}<i />
          </button>
        ))}
      </nav>

      <div className="memory-v7-flow">
        {memoryChapters.map((item, index) => (
          <article ref={node => { refs.current[index] = node }} data-memory-index={index} key={item.year} className={`memory-v7-year memory-v7-year--${item.year} ${index === active ? 'active' : ''}`}>
            <div className="memory-v7-copy">
              <span>{item.year}</span><small>{item.label}</small><h3>{item.title}</h3><p>{item.copy}</p>
            </div>
            {item.year === '2023' && <ResponsiveImage className="memory-v7-small-media" src={item.image} alt="Early robot prototype from the team archive" sizes="(max-width: 800px) 80vw, 28vw" />}
            {item.year === '2024' && <ResponsiveImage className="memory-v7-wide-media" src={item.image} alt="Team at Nusantara Regional in Indonesia" sizes="100vw" />}
            {item.year === '2026' && <ResponsiveImage className="memory-v7-mark" src={item.image} alt="ABAI BOL current identity" sizes="(max-width: 800px) 70vw, 32vw" objectFit="contain" />}
          </article>
        ))}
      </div>
    </section>
  )
}
