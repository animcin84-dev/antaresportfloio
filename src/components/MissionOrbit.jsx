import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, RoundedBox, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { seasons } from '../data'

// Source DNA / runtime:
// - react-three-fiber-master.zip -> actual renderer
// - drei-master.zip -> Html / Float / RoundedBox / Sparkles helpers
// - helmet-main.zip -> cylindrical/tube-style scroll gallery composition
// - Showcase-Images-main.zip -> curved gallery + scanline/post visual language

function OrbitCards() {
  const group = useRef(null)
  const pointerTarget = useRef(0)
  const cards = useMemo(() => seasons.map((season, i) => ({ ...season, angle: (i / seasons.length) * Math.PI * 2 })), [])

  useFrame((state, delta) => {
    if (!group.current) return
    pointerTarget.current = THREE.MathUtils.lerp(pointerTarget.current, state.pointer.x * .28, .035)
    group.current.rotation.y += delta * .09
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * .05, .04)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointerTarget.current * .08, .04)
  })

  return (
    <group ref={group}>
      {cards.map((card, i) => {
        const radius = 4.15
        const x = Math.sin(card.angle) * radius
        const z = Math.cos(card.angle) * radius
        return (
          <group key={card.year} position={[x, (i % 2 ? -.28 : .3), z]} rotation={[0, card.angle, 0]}>
            <Float speed={1.2 + i * .08} rotationIntensity={.08} floatIntensity={.22}>
              <RoundedBox args={[2.25, 2.85, .09]} radius={.08} smoothness={4}>
                <meshStandardMaterial color={card.next ? '#3e100b' : '#121216'} metalness={.72} roughness={.34} emissive={card.next ? '#441008' : '#09090b'} emissiveIntensity={.32} />
              </RoundedBox>
              <mesh position={[0, 1.18, .07]}>
                <planeGeometry args={[1.85, .02]} />
                <meshBasicMaterial color="#ff4d24" />
              </mesh>
              <Html transform position={[-.92, .86, .075]} distanceFactor={1.15} occlude={false}>
                <div className="orbit-card-ui">
                  <span>{card.year}</span>
                  <strong>{card.game.replace('\n', ' ')}</strong>
                  <p>{card.note}</p>
                  <b>{card.result}</b>
                </div>
              </Html>
            </Float>
          </group>
        )
      })}
      <Sparkles count={55} scale={[9, 4, 9]} size={1.2} speed={.18} color="#ff6a31" opacity={.35} />
    </group>
  )
}

export default function MissionOrbit() {
  return (
    <div className="mission-orbit-wrap">
      <div className="mission-orbit-hud"><span>R3F / MISSION ORBIT</span><span>MOVE POINTER</span></div>
      <div className="mission-orbit-scan" aria-hidden="true" />
      <Canvas camera={{ position: [0, .1, 7.1], fov: 44 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <color attach="background" args={['#070708']} />
        <ambientLight intensity={.7} />
        <directionalLight position={[4, 7, 6]} intensity={2.8} color="#ff8b58" />
        <pointLight position={[-5, -2, 2]} intensity={10} color="#60180e" distance={14} />
        <Suspense fallback={null}><OrbitCards /></Suspense>
      </Canvas>
    </div>
  )
}
