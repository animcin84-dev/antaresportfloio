import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const chapters = [
  ['01', 'MANIFESTO', '#manifesto'],
  ['02', 'IDENTITY', '#identity'],
  ['04', 'MISSION', '#mission'],
  ['05', 'ENGINEERING', '#engineering'],
  ['06', 'ARCHIVE', '#archive'],
  ['07', 'RECORD', '#record'],
  ['08', 'TEAM', '#team'],
]

export default function MissionNav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('MANIFESTO')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => setVisible(scrollY > innerHeight * .55)
    update()
    addEventListener('scroll', update, { passive: true })
    return () => removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const nodes = chapters.map(([, name, selector]) => [name, document.querySelector(selector)]).filter(([, node]) => node)
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const found = nodes.find(([, node]) => node === entry.target)
          if (found) setActive(found[0])
        }
      })
    }, { rootMargin: '-38% 0px -52% 0px', threshold: 0 })
    nodes.forEach(([, node]) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = event => {
      if (event.key === 'Escape') setOpen(false)
    }
    addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = selector => {
    setOpen(false)
    requestAnimationFrame(() => document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <>
      <motion.button
        className={`mission-index-button ${visible || open ? 'is-visible' : ''}`}
        type="button"
        aria-expanded={open}
        aria-controls="mission-index"
        onClick={() => setOpen(value => !value)}
        whileTap={{ scale: .94 }}
      >
        <span>{open ? 'CLOSE' : 'INDEX'}</span>
        <i><b /></i>
        <small>{active}</small>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mission-index"
            className="mission-index"
            role="dialog"
            aria-modal="true"
            aria-label="ABAI BOL mission index"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: .7, ease: [.16, 1, .3, 1] }}
          >
            <div className="mission-index-top"><span>ABAI BOL / INDEX</span><span>FORMERLY ANTARES · ALMATY</span></div>
            <nav aria-label="Mission chapters">
              {chapters.map(([number, name, selector], i) => (
                <motion.button
                  type="button"
                  key={name}
                  className={active === name ? 'active' : ''}
                  onClick={() => go(selector)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: .08 + i * .045, duration: .55, ease: [.16, 1, .3, 1] }}
                >
                  <span>{number}</span><strong>{name}</strong><i>↘</i>
                </motion.button>
              ))}
            </nav>
            <div className="mission-index-foot"><span>BUILD / ITERATE / COMPETE</span><span>ESC TO CLOSE</span></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
