import React, { useEffect, useRef, useState } from 'react'
import { archiveImages } from '../data'
import ResponsiveImage from './ResponsiveImage'

export default function ArchiveDrawer() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const focusable = [...dialog.querySelectorAll('button,a[href]')]
    focusable[0]?.focus()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = event => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'Tab' && focusable.length) {
        const first = focusable[0], last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    addEventListener('keydown', onKey)
    return () => {
      removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
      requestAnimationFrame(() => triggerRef.current?.focus())
    }
  }, [open])

  return (
    <section className="archive-drawer-cta" id="archive">
      <span>SUPPORTING MATERIAL / OUTSIDE THE DIRECTOR'S CUT</span>
      <button ref={triggerRef} type="button" onClick={() => setOpen(true)} data-cursor="OPEN">OPEN FULL ARCHIVE ↗</button>
      {open && (
        <div className="archive-drawer-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false) }}>
          <section ref={dialogRef} className="archive-drawer" role="dialog" aria-modal="true" aria-label="ABAI BOL full visual archive">
            <header><span>FULL ARCHIVE / {String(archiveImages.length).padStart(2,'0')} MEDIA MOMENTS</span><button type="button" onClick={() => setOpen(false)}>CLOSE ×</button></header>
            <div className="archive-drawer-grid">
              {archiveImages.map(([src, label], index) => (
                <figure key={src}><ResponsiveImage src={src} alt="" sizes="(max-width: 800px) 100vw, 44vw"/><figcaption><span>{String(index + 1).padStart(2,'0')}</span>{label}</figcaption></figure>
              ))}
            </div>
          </section>
        </div>
      )}
    </section>
  )
}
