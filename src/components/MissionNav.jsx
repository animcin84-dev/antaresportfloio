import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useI18n } from '../i18n'

const chapters = [
  ['00', 'SIGNAL', '#top'],
  ['01', 'CONTINUITY', '#continuity'],
  ['02', 'MEMORY', '#memory'],
  ['03', 'MACHINE', '#machine'],
  ['04', 'MISSION', '#mission'],
  ['05', 'FLIGHT RECORDER', '#record'],
  ['06', 'PEOPLE', '#team'],
  ['07', 'TRANSMISSION', '#transmission'],
]

export default function MissionNav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('SIGNAL')
  const buttonRef = useRef()
  const dialogRef = useRef()
  const { t } = useI18n()

  useEffect(() => {
    const nodes = chapters.map(([, name, selector]) => [name, document.querySelector(selector)]).filter(([, node]) => node)
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const match = nodes.find(([, node]) => node === entry.target)
        if (match) setActive(match[0])
      })
    }, { rootMargin: '-38% 0px -50% 0px' })
    nodes.forEach(([, node]) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const node = dialogRef.current
    const focusable = [...node.querySelectorAll('button,a[href]')]
    focusable[0]?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = event => {
      if (event.key === 'Escape') { setOpen(false); requestAnimationFrame(() => buttonRef.current?.focus()) }
      if (event.key === 'Tab' && focusable.length) {
        const first = focusable[0], last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    addEventListener('keydown', onKey)
    return () => { removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow }
  }, [open])

  const go = selector => {
    setOpen(false)
    requestAnimationFrame(() => {
      document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      buttonRef.current?.focus({ preventScroll: true })
    })
  }

  return (
    <>
      <button ref={buttonRef} className="index-button" type="button" aria-expanded={open} aria-controls="mission-index" onClick={() => setOpen(value => !value)} data-cursor={open ? 'CLOSE' : 'INDEX'}>
        <span>{open ? t('close') : t('index')}</span><i />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div ref={dialogRef} id="mission-index" className="mission-index mission-index--v7" role="dialog" aria-modal="true" aria-label="ABAI BOL chapter index" initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: .55, ease: [.16, 1, .3, 1] }}>
            <div className="mission-index-top"><span>ABAI BOL / ENGINEERING MEMORY</span><span>ALMATY · KAZAKHSTAN</span></div>
            <div className="mission-index-layout mission-index-layout--v7">
              <nav aria-label="Chapters">
                {chapters.map(([number, name, selector]) => (
                  <button type="button" key={name} className={active === name ? 'active' : ''} onClick={() => go(selector)}><span>{number}</span><strong>{name}</strong><i>↘</i></button>
                ))}
              </nav>
            </div>
            <div className="mission-index-foot"><span>EVERY MACHINE CARRIES THE DECISIONS OF THE ONE BEFORE IT.</span><span>ESC TO CLOSE</span></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
