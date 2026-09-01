import React, { useEffect, useRef } from 'react'
import { Curtains, Plane } from 'curtainsjs'

// Runtime integration from curtainsjs-master.zip.
// The DOM canvas remains a semantic/fallback visual; Curtains upgrades it to a shader plane.
export default function SignalPlane() {
  const host = useRef(null)
  const planeEl = useRef(null)
  const source = useRef(null)

  useEffect(() => {
    const canvas = source.current
    const container = host.current
    if (!canvas || !container || !planeEl.current) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(devicePixelRatio || 1, 2)
    const paint = () => {
      const w = Math.max(640, planeEl.current.clientWidth)
      const h = Math.max(360, planeEl.current.clientHeight)
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#0a0a0d'; ctx.fillRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(255,77,36,.18)'; ctx.lineWidth = 1
      for (let x = 0; x < w; x += 36) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
      for (let y = 0; y < h; y += 36) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }
      const g = ctx.createRadialGradient(w * .72, h * .46, 0, w * .72, h * .46, w * .45)
      g.addColorStop(0, 'rgba(255,86,35,.85)'); g.addColorStop(.28, 'rgba(116,25,14,.42)'); g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = '#f4eee5'; ctx.font = `800 ${Math.max(48, w * .085)}px Arial`; ctx.fillText('ABAI BOL', w * .055, h * .58)
      ctx.fillStyle = '#ff4d24'; ctx.font = `500 ${Math.max(12, w * .015)}px monospace`; ctx.fillText('SIGNAL / ALMATY / FTC', w * .06, h * .68)
      ctx.strokeStyle = 'rgba(244,238,229,.4)'; ctx.beginPath(); ctx.arc(w * .78, h * .37, Math.min(w,h)*.16, 0, Math.PI*2); ctx.stroke()
    }
    paint()

    let curtains
    let plane
    try {
      curtains = new Curtains({ container, pixelRatio: Math.min(devicePixelRatio || 1, 1.5), watchScroll: true, production: true })
      const vertex = `
        precision mediump float;
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;
        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;
        varying vec2 vTextureCoord;
        void main(){ gl_Position=uPMatrix*uMVMatrix*vec4(aVertexPosition,1.0); vTextureCoord=aTextureCoord; }
      `
      const fragment = `
        precision mediump float;
        varying vec2 vTextureCoord;
        uniform sampler2D planeTexture;
        uniform float uTime;
        uniform vec2 uMouse;
        void main(){
          vec2 uv=vTextureCoord;
          float d=distance(uv,uMouse);
          float wave=sin((uv.y+uTime*.035)*28.0)*.008*(1.0-smoothstep(.0,.58,d));
          uv.x+=wave;
          vec4 col=texture2D(planeTexture,uv);
          float scan=.035*sin((uv.y+uTime*.05)*520.0);
          col.rgb+=vec3(scan*.45,scan*.08,0.0);
          gl_FragColor=col;
        }
      `
      plane = new Plane(curtains, planeEl.current, {
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          time: { name: 'uTime', type: '1f', value: 0 },
          mouse: { name: 'uMouse', type: '2f', value: [0.5, 0.5] },
        },
      })
      plane.onRender(() => { plane.uniforms.time.value += .6 })
      const onMove = (e) => {
        const r = planeEl.current.getBoundingClientRect()
        plane.uniforms.mouse.value = [(e.clientX-r.left)/r.width, 1-(e.clientY-r.top)/r.height]
      }
      planeEl.current.addEventListener('pointermove', onMove)
      return () => {
        planeEl.current?.removeEventListener('pointermove', onMove)
        curtains?.dispose()
      }
    } catch (error) {
      console.warn('Curtains enhancement unavailable; keeping canvas fallback.', error)
    }
  }, [])

  return (
    <div className="curtains-host" ref={host}>
      <div className="curtains-plane" ref={planeEl}>
        <canvas ref={source} data-sampler="planeTexture" />
      </div>
      <div className="curtains-caption"><span>DOM → WEBGL PLANE</span><span>MOVE POINTER / DISTORT SIGNAL</span></div>
    </div>
  )
}
