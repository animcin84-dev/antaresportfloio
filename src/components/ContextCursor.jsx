import React, { useEffect, useRef, useState } from 'react'

export default function ContextCursor({ reduced }) {
  const point = useRef(null)
  const label = useRef(null)
  const firstPoint = useRef(null)
  const [ready, setReady] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    if (reduced || matchMedia('(pointer: coarse)').matches) return

    const move = event => {
      if (!firstPoint.current) {
        firstPoint.current = { x: event.clientX, y: event.clientY }
        setReady(true)
      }

      point.current?.style.setProperty('transform', `translate3d(${event.clientX}px,${event.clientY}px,0)`)
      label.current?.style.setProperty('transform', `translate3d(${event.clientX}px,${event.clientY}px,0)`)

      const target = event.target.closest?.('[data-cursor]')
      setText(target?.dataset.cursor || '')
    }

    addEventListener('pointermove', move, { passive: true })
    return () => removeEventListener('pointermove', move)
  }, [reduced])

  if (reduced || !ready || !firstPoint.current) return null

  const initialTransform = `translate3d(${firstPoint.current.x}px,${firstPoint.current.y}px,0)`

  return (
    <>
      <span
        ref={point}
        className="context-cursor-point"
        style={{ transform: initialTransform }}
        aria-hidden="true"
      />
      <span
        ref={label}
        className={`context-cursor-label ${text ? 'is-visible' : ''}`}
        style={{ transform: initialTransform }}
        aria-hidden="true"
      >
        {text}
      </span>
    </>
  )
}
