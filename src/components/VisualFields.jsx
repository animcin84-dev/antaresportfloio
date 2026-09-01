import React, { useEffect, useRef } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'

// Runtime integrations from uploaded sources:
// - shaders-main.zip -> @paper-design/shaders-react
// - shadergradient-main.zip -> @shadergradient/react
// - ogl-master.zip -> OGL fragment-shader field

export function PaperHeatField({ className = '' }) {
  return (
    <div className={`paper-field ${className}`} aria-hidden="true">
      <MeshGradient
        colors={['#050506', '#32100b', '#ff4d24', '#ff9a45']}
        distortion={1.35}
        swirl={.92}
        speed={.12}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

export function GradientMatter({ className = '' }) {
  return (
    <div className={`gradient-matter ${className}`} aria-hidden="true">
      <ShaderGradientCanvas
        style={{ position: 'absolute', inset: 0 }}
        pixelDensity={1}
        fov={42}
        lazyLoad
        threshold={.05}
      >
        <ShaderGradient
          type="sphere"
          animate="on"
          uSpeed={.16}
          uStrength={1.85}
          uDensity={1.2}
          uFrequency={4.5}
          color1="#ff4d24"
          color2="#72160e"
          color3="#08080a"
          cDistance={4.2}
          cPolarAngle={102}
          cAzimuthAngle={145}
          brightness={.9}
          grain="on"
          grainBlending={.18}
          reflection={.12}
        />
      </ShaderGradientCanvas>
    </div>
  )
}

export function OglHeatField({ className = '' }) {
  const mount = useRef(null)
  useEffect(() => {
    const container = mount.current
    if (!container) return
    const renderer = new Renderer({ alpha: true, dpr: Math.min(devicePixelRatio, 1.5) })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    container.appendChild(gl.canvas)
    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: `
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;
        void main(){ vUv=uv; gl_Position=vec4(position,0.0,1.0); }
      `,
      fragment: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uResolution;
        float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123); }
        float noise(vec2 p){
          vec2 i=floor(p), f=fract(p);
          f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);
        }
        float fbm(vec2 p){
          float v=0.; float a=.5;
          for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.03; a*=.5; }
          return v;
        }
        void main(){
          vec2 uv=vUv;
          vec2 p=(uv-.5)*vec2(uResolution.x/uResolution.y,1.);
          float n=fbm(p*3.2+vec2(uTime*.035,-uTime*.02));
          float ring=1.-smoothstep(.05,.62,length(p-vec2(.18,-.02)));
          float heat=smoothstep(.28,.92,n+.52*ring);
          vec3 dark=vec3(.018,.018,.024);
          vec3 red=vec3(.72,.07,.018);
          vec3 orange=vec3(1.,.26,.045);
          vec3 col=mix(dark,red,heat*.72);
          col=mix(col,orange,pow(max(0.,heat-.5)*2.,2.)*.65);
          float grid=(step(.985,fract(uv.x*28.))+step(.985,fract(uv.y*16.)))*.05;
          col+=grid*vec3(1.,.18,.06);
          gl_FragColor=vec4(col,.96);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })
    let raf = 0
    const resize = () => {
      const w = container.clientWidth || 1
      const h = container.clientHeight || 1
      renderer.setSize(w, h)
      program.uniforms.uResolution.value = [w, h]
    }
    const render = (t) => {
      program.uniforms.uTime.value = t * .001
      renderer.render({ scene: mesh })
      raf = requestAnimationFrame(render)
    }
    resize(); addEventListener('resize', resize); raf = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas)
    }
  }, [])
  return <div ref={mount} className={`ogl-heat ${className}`} aria-hidden="true" />
}
