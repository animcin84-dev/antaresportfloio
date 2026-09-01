import React, { Suspense, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Sparkles, Text } from '@react-three/drei'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { seasons } from '../data'

gsap.registerPlugin(ScrollTrigger)

function SeasonCard({ card, angle, active, index }) {
  const group = useRef(null)
  const material = useRef(null)

  useFrame((_, delta) => {
    if (!group.current || !material.current) return
    const k = 1 - Math.exp(-delta * 7)
    const targetScale = active ? 1.16 : .9
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), k)
    material.current.emissiveIntensity = THREE.MathUtils.lerp(material.current.emissiveIntensity, active ? 1.4 : .16, k)
    material.current.roughness = THREE.MathUtils.lerp(material.current.roughness, active ? .24 : .42, k)
  })

  const radius = 4.55
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius

  return (
    <group ref={group} position={[x, 0, z]} rotation={[0, angle, 0]}>
      <RoundedBox args={[2.35, 3.05, .16]} radius={.09} smoothness={5}>
        <meshStandardMaterial
          ref={material}
          color={active ? '#3a211d' : '#24242a'}
          metalness={.76}
          roughness={active ? .24 : .42}
          emissive={active ? '#ff4d24' : '#1a0907'}
          emissiveIntensity={active ? 1.4 : .16}
        />
      </RoundedBox>
      <mesh position={[0, 1.26, .1]}>
        <planeGeometry args={[1.94, .035]} />
        <meshBasicMaterial color={active ? '#ff7a38' : '#5e2a20'} toneMapped={false} />
      </mesh>
      <Text
        position={[0, .15, .105]}
        fontSize={.86}
        color={active ? '#fff7ef' : '#9a9692'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={-.04}
      >
        {String(index + 1).padStart(2, '0')}
      </Text>
      <Text
        position={[0, -.78, .105]}
        fontSize={.16}
        color={active ? '#ff9a70' : '#69666a'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={.1}
      >
        {card.year}
      </Text>
    </group>
  )
}

function OrbitScene({ progress, activeIndex }) {
  const group = useRef(null)
  const cardCount = seasons.length

  useFrame((state, delta) => {
    if (!group.current) return
    const step = (Math.PI * 2) / cardCount
    const target = -activeIndex * step
    const k = 1 - Math.exp(-delta * 6)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, target, k)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * .025, k * .35)
  })

  return (
    <>
      <color attach="background" args={['#0b0b0e']} />
      <fog attach="fog" args={['#0b0b0e', 7.5, 16]} />
      <ambientLight intensity={1.65} />
      <hemisphereLight args={['#ffd7c4', '#181018', 2.6]} />
      <directionalLight position={[4, 7, 6]} intensity={4.8} color="#fff1e7" />
      <pointLight position={[0, 1.2, 2.8]} intensity={28} color="#ff5b2b" distance={12} decay={2} />
      <pointLight position={[-5, -1, -2]} intensity={18} color="#7d2bff" distance={12} decay={2} />

      <group ref={group} position={[0, .05, 0]}>
        {seasons.map((card, i) => (
          <SeasonCard
            key={card.year}
            card={card}
            index={i}
            angle={(i / cardCount) * Math.PI * 2}
            active={i === activeIndex}
          />
        ))}
        <Sparkles count={90} scale={[11, 5.2, 11]} size={1.45} speed={.14} color="#ff7840" opacity={.7} />
      </group>

      <EffectComposer multisampling={4}>
        <Bloom luminanceThreshold={.88} luminanceSmoothing={.32} intensity={.72} mipmapBlur />
        <Noise opacity={.018} />
        <Vignette eskil={false} offset={.16} darkness={.62} />
      </EffectComposer>
    </>
  )
}

export default function MissionOrbit({ reduced = false }) {
  const root = useRef(null)
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const active = seasons[activeIndex]

  useLayoutEffect(() => {
    if (reduced) return
    const trigger = ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: .7,
      snap: {
        snapTo: 1 / (seasons.length - 1),
        duration: { min: .16, max: .34 },
        delay: .06,
        ease: 'power2.out',
      },
      onUpdate: (self) => {
        setProgress(self.progress)
        setActiveIndex(Math.min(seasons.length - 1, Math.round(self.progress * (seasons.length - 1))))
      },
    })
    return () => trigger.kill()
  }, [reduced])

  return (
    <section className={`mission-orbit-v3 ${reduced ? 'is-reduced' : ''}`} ref={root} id="orbit">
      <div className="mission-orbit-pin">
        <div className="mission-orbit-topline">
          <span>06 / MISSION ORBIT</span>
          <span>SCROLL THROUGH ALL {String(seasons.length).padStart(2, '0')} CHAPTERS</span>
        </div>

        <div className="mission-orbit-canvas">
          <Canvas camera={{ position: [0, .18, 7.45], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
            <Suspense fallback={null}><OrbitScene progress={progress} activeIndex={activeIndex} /></Suspense>
          </Canvas>
        </div>

        <div className="orbit-side-index" aria-hidden="true">
          {seasons.map((season, i) => <i key={season.year} className={i === activeIndex ? 'is-active' : ''} />)}
        </div>

        <div className="mission-orbit-telemetry" aria-live="polite">
          <div className="orbit-number">{String(activeIndex + 1).padStart(2, '0')}<small>/{String(seasons.length).padStart(2, '0')}</small></div>
          <div className="orbit-copy-v3">
            <span>{active.year} / MISSION ARCHIVE</span>
            <h2>{active.game.split('\n').map((line) => <React.Fragment key={line}>{line}<br/></React.Fragment>)}</h2>
            <p>{active.note}</p>
            <b>{active.result}</b>
          </div>
        </div>

        <div className="orbit-progress-v3"><i style={{ transform: `scaleX(${Math.max(.02, progress)})` }} /></div>
        <div className="orbit-exit-hint">{activeIndex === seasons.length - 1 ? 'NEXT CHAPTER UNLOCKED ↓' : 'KEEP SCROLLING ↓'}</div>
      </div>
    </section>
  )
}
