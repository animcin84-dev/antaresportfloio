import React, { useEffect, useRef } from 'react'
import { EVIDENCE_DRIVE_URL } from '../data'

export default function EvidenceViewer({ item, onClose, returnFocusRef }) {
  const dialogRef = useRef()

  useEffect(() => {
    if (!item) return
    const node = dialogRef.current
    const focusable = [...node.querySelectorAll('button,a[href]')]
    focusable[0]?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = event => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && focusable.length) {
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    addEventListener('keydown', onKey)
    return () => {
      removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      requestAnimationFrame(() => returnFocusRef?.current?.focus())
    }
  }, [item, onClose, returnFocusRef])

  if (!item) return null

  return (
    <div className="evidence-backdrop" role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section ref={dialogRef} className="evidence-dialog" role="dialog" aria-modal="true" aria-labelledby="evidence-title">
        <button className="evidence-close" type="button" onClick={onClose}>CLOSE ×</button>
        <div className="evidence-label">TEAM-PROVIDED RECORD / SOURCE ARCHIVE</div>
        <span>{item.year}</span>
        <h2 id="evidence-title">{item.event}</h2>
        <h3>{item.result}</h3>
        <p>{item.sub}</p>
        <p className="evidence-note">Certificate images are not reproduced here unless individually supplied and verified. The original team archive remains the evidence source.</p>
        <a href={EVIDENCE_DRIVE_URL} target="_blank" rel="noreferrer" data-cursor="OPEN">OPEN CERTIFICATE ARCHIVE ↗</a>
      </section>
    </div>
  )
}
