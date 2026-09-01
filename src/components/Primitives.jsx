import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import gsap from 'gsap'

// Source DNA:
// - react-bits-main.zip: scramble/text micro-interaction philosophy
// - motion-primitives-main.zip: in-view + animated value primitives
// - motion-primitives-website-main.zip: grain/spotlight presentation layer
// - magicui-main.zip: number ticker / marquee utility patterns
// - AnimBits-main.zip + gsap-ui-main.zip: magnetic pointer interaction

export function FilmGrain({ opacity = 0.055 }) {
  return <div className="film-grain" style={{ '--grain-opacity': opacity }} aria-hidden="true" />
}

export function ScrambleText({ children, className = '', duration = 700, trigger = 'view' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [value, setValue] = useState(String(children))
  const source = String(children)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/.-_+'

  useEffect(() => {
    if (trigger === 'view' && !inView) return
    let frame = 0
    let raf = 0
    const started = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - started) / duration)
      const locked = Math.floor(p * source.length)
      frame++
      setValue(source.split('').map((char, i) => {
        if (char === ' ') return ' '
        if (i < locked) return char
        return chars[(i * 13 + frame * 7) % chars.length]
      }).join(''))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setValue(source)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [source, duration, inView, trigger])

  return <span ref={ref} className={className}>{value}</span>
}

export function Reveal({ children, className = '', delay = 0, y = 28 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: .82, delay, ease: [.16, 1, .3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function NumberTicker({ value, prefix = '', suffix = '', duration = 1.35 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const state = { n: 0 }
    const tween = gsap.to(state, {
      n: Number(value),
      duration,
      ease: 'power3.out',
      onUpdate: () => setDisplay(Math.round(state.n)),
    })
    return () => tween.kill()
  }, [value, duration, inView])
  return <span ref={ref}>{prefix}{display}{suffix}</span>
}

export function Magnetic({ children, strength = 0.22, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(pointer: coarse)').matches) return
    const onMove = (event) => {
      const r = el.getBoundingClientRect()
      const x = event.clientX - (r.left + r.width / 2)
      const y = event.clientY - (r.top + r.height / 2)
      gsap.to(el, { x: x * strength, y: y * strength, duration: .35, ease: 'power3.out', overwrite: true })
    }
    const reset = () => gsap.to(el, { x: 0, y: 0, duration: .55, ease: 'elastic.out(1,.45)' })
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', reset)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', reset)
    }
  }, [strength])
  return <div ref={ref} className={className}>{children}</div>
}

export function CursorFollower({ reduced }) {
  const dot = useRef(null)
  const label = useRef(null)
  useEffect(() => {
    if (reduced || matchMedia('(pointer: coarse)').matches) return
    let x = innerWidth / 2, y = innerHeight / 2, lx = x, ly = y, raf = 0
    const move = (e) => {
      x = e.clientX; y = e.clientY
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`
    }
    const loop = () => {
      lx += (x - lx) * .14; ly += (y - ly) * .14
      if (label.current) label.current.style.transform = `translate3d(${lx}px,${ly}px,0)`
      raf = requestAnimationFrame(loop)
    }
    addEventListener('pointermove', move)
    loop()
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [reduced])
  if (reduced) return null
  return <><i className="cursor-point" ref={dot} /><span className="cursor-label" ref={label}>EXPLORE</span></>
}
