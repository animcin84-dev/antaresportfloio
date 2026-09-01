import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { layers } from '../data'
import { ScrambleText } from './Primitives'

// Source DNA:
// - bravebot-website-main.zip: robotics capability/spec storytelling
// - robot-web-viewer-main.zip: selectable subsystem / viewport-HUD interaction
// - gltfjsx-master.zip: future GLB -> React node workflow (`npm run robot:prepare`)
// - cult-ui-main.zip: cutout/dither industrial panel treatment
// - motion-primitives-main.zip: animated tab/panel transitions

const nodes = {
  mechanical: [
    { id: 'M-01', label: 'CHASSIS', x: 50, y: 72 },
    { id: 'M-02', label: 'MOTION', x: 24, y: 42 },
    { id: 'M-03', label: 'TRANSFER', x: 76, y: 42 },
  ],
  control: [
    { id: 'C-01', label: 'INPUT', x: 20, y: 64 },
    { id: 'C-02', label: 'FEEDBACK', x: 50, y: 34 },
    { id: 'C-03', label: 'ACTUATION', x: 80, y: 64 },
  ],
  software: [
    { id: 'S-01', label: 'VISION', x: 26, y: 35 },
    { id: 'S-02', label: 'STATE', x: 50, y: 62 },
    { id: 'S-03', label: 'AUTO', x: 76, y: 35 },
  ],
  iteration: [
    { id: 'I-01', label: 'TEST', x: 22, y: 58 },
    { id: 'I-02', label: 'MEASURE', x: 50, y: 32 },
    { id: 'I-03', label: 'REBUILD', x: 78, y: 58 },
  ],
}

export default function EngineeringConsole() {
  const [active, setActive] = useState('mechanical')
  const current = layers[active]

  return (
    <div className="eng-console">
      <aside className="eng-tabs" role="tablist" aria-label="Engineering layers">
        {Object.entries(layers).map(([key, layer]) => (
          <button key={key} role="tab" aria-selected={active === key} onClick={() => setActive(key)}>
            <span>{layer.index}</span>
            <strong>{layer.title}</strong>
            <small>{layer.tags.join(' / ')}</small>
          </button>
        ))}
        <div className="eng-cad-status">
          <span>CAD PIPELINE</span>
          <b>GLTFJSX READY</b>
          <code>npm run robot:prepare</code>
        </div>
      </aside>

      <section className="eng-viewport">
        <div className="eng-view-meta"><span>VIEW / SYSTEM</span><span>MODE / {current.title}</span><span>ORBIT / LOCKED</span></div>
        <div className="eng-grid" aria-hidden="true" />
        <div className="eng-schematic" aria-hidden="true">
          <i className="eng-ring ring-a" /><i className="eng-ring ring-b" /><i className="eng-axis axis-x" /><i className="eng-axis axis-y" />
          <div className="eng-core"><span>AB</span><b>01</b></div>
          {nodes[active].map(node => (
            <div className="eng-node" key={node.id} style={{ left: `${node.x}%`, top: `${node.y}%` }}>
              <i /><span>{node.id}</span><b>{node.label}</b>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="eng-copy"
            initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            transition={{ duration: .42, ease: [.16, 1, .3, 1] }}
          >
            <span>LAYER / {current.index}</span>
            <h3><ScrambleText trigger="always" duration={380}>{current.title}</ScrambleText></h3>
            <p>{current.copy}</p>
            <ul>{current.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  )
}
