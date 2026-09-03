import React, { useEffect, useRef, useState } from 'react'

const modes = ['signal', 'continuity', 'memory', 'machine', 'mission', 'record', 'people', 'transmission']

export default function MemorySpine({ reduced = false }) {
  const rootRef = useRef(null)
  const pathRef = useRef(null)
  const [mode, setMode] = useState('signal')

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const length = path.getTotalLength?.() || 1000
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = reduced ? '0' : `${length}`
    if (reduced) return
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, window.scrollY / max))
      path.style.strokeDashoffset = `${length * (1 - progress)}`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [reduced])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const chapters = [...document.querySelectorAll('[data-spine-mode]')]
    const observer = new IntersectionObserver(entries => {
      const active = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0]
      const next = active?.target?.dataset?.spineMode
      if (next && modes.includes(next)) setMode(next)
    }, { rootMargin: '-38% 0px -45% 0px', threshold: [0, .12, .35, .6] })
    chapters.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="memory-spine" data-mode={mode} aria-hidden="true">
      <svg viewBox="0 0 40 1000" preserveAspectRatio="none">
        <path className="memory-spine-ghost" d="M20 0 C4 95 35 165 20 250 C7 330 32 410 20 500 C8 590 35 665 20 750 C6 842 34 920 20 1000" />
        <path ref={pathRef} className="memory-spine-path" d="M20 0 C4 95 35 165 20 250 C7 330 32 410 20 500 C8 590 35 665 20 750 C6 842 34 920 20 1000" />
        <circle className="memory-spine-node" cx="20" cy="500" r="3" />
      </svg>
    </div>
  )
}
