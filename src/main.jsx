import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { awards, layers, seasons } from './data'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const SPLINE_URL = 'https://my.spline.design/nexbotrobotcharacterconcept-ENZaaWT2g7BsjXiqBZyGUnKB/'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(media.matches)
    sync(); media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])
  return reduced
}

function StarCanvas({ reduced }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d', { alpha: true })
    let raf = 0
    let time = 0
    let width = 0
    let height = 0
    const dots = Array.from({ length: reduced ? 45 : 110 }, (_, i) => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + .25, p: Math.random() * Math.PI * 2, s: .2 + Math.random() * .8,
    }))
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      width = canvas.clientWidth; height = canvas.clientHeight
      canvas.width = Math.max(1, Math.floor(width * dpr)); canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr,0,0,dpr,0,0)
    }
    const draw = () => {
      time += reduced ? 0 : .005
      ctx.clearRect(0,0,width,height)
      const gx = width * .76, gy = height * .44
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(width,height) * .45)
      grad.addColorStop(0,'rgba(255,92,35,.22)'); grad.addColorStop(.22,'rgba(164,35,16,.13)'); grad.addColorStop(.68,'rgba(28,10,8,.035)'); grad.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle = grad; ctx.fillRect(0,0,width,height)
      dots.forEach((d) => {
        const twinkle = .25 + .55 * (Math.sin(time * (1.4+d.s) + d.p) * .5 + .5)
        ctx.fillStyle = `rgba(238,232,222,${twinkle})`
        ctx.beginPath(); ctx.arc(d.x*width,d.y*height,d.r,0,Math.PI*2); ctx.fill()
      })
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    resize(); draw(); window.addEventListener('resize',resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize',resize) }
  }, [reduced])
  return <canvas ref={ref} className="star-canvas" aria-hidden="true" />
}

function Cursor({ reduced }) {
  const dot = useRef(null); const ring = useRef(null)
  useEffect(() => {
    if (reduced || matchMedia('(pointer: coarse)').matches) return
    let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y,raf
    const move=e=>{x=e.clientX;y=e.clientY;dot.current?.style.setProperty('transform',`translate(${x}px,${y}px)`)}
    const loop=()=>{rx+=(x-rx)*.13;ry+=(y-ry)*.13;ring.current?.style.setProperty('transform',`translate(${rx}px,${ry}px)`);raf=requestAnimationFrame(loop)}
    addEventListener('pointermove',move);loop()
    return()=>{removeEventListener('pointermove',move);cancelAnimationFrame(raf)}
  },[reduced])
  if (reduced) return null
  return <><span className="cursor-dot" ref={dot}/><span className="cursor-ring" ref={ring}/></>
}

function SectionKicker({ left, right, light=false }) {
  return <div className={`section-kicker ${light?'light':''}`}><span>{left}</span><span>{right}</span></div>
}

function Hero({ reduced }) {
  const [loaded,setLoaded]=useState(false)
  return <section className="hero" id="top">
    <StarCanvas reduced={reduced}/><div className="hero-grid"/><div className="hero-noise"/>
    <div className="hero-meta meta"><span>FTC ROBOTICS TEAM</span><span>ALMATY · KAZAKHSTAN</span><span>EST. 2023</span></div>
    <div className="hero-copy">
      <p className="eyebrow reveal">SAME TEAM · NEW NAME</p>
      <h1 className="hero-title" aria-label="ABAI BOL"><span className="word reveal">ABAI</span><span className="word outline reveal">BOL</span></h1>
      <div className="hero-foot reveal"><p>FORMERLY <strong>ANTARES</strong></p><p>ENGINEERING<br/>UNDER PRESSURE.</p></div>
    </div>
    <div className={`robot-stage ${loaded?'loaded':''}`}>
      <div className="robot-fallback"><span>ABAI BOL / ROBOT INTERFACE</span><b>NEXBOT</b><small>Loading interactive Spline scene…</small></div>
      <iframe title="Nexbot interactive Spline robot" src={SPLINE_URL} onLoad={()=>setLoaded(true)} allow="autoplay; fullscreen" loading="eager" />
      <div className="robot-caption"><span>INTERACTIVE / SPLINE</span><span>MOVE POINTER</span></div>
    </div>
    <div className="hero-stat stat-a"><span>01</span><strong>INTERNATIONAL FINALIST</strong><small>NUSANTARA REGIONAL · 2024</small></div>
    <div className="hero-stat stat-b"><span>11</span><strong>RECORDED DISTINCTIONS</strong><small>ANTARES-ERA COMPETITION HISTORY</small></div>
    <a className="scroll-cue" href="#manifesto"><span>SCROLL TO ENTER</span><i/></a>
  </section>
}

function Manifesto() {
  return <section className="manifesto paper" id="manifesto">
    <SectionKicker left="01 / MANIFESTO" right="ABAI BOL" light/>
    <h2 className="manifesto-line split">WE BUILD MACHINES<br/><em>THAT MAKE</em> IDEAS<br/>IMPOSSIBLE TO IGNORE.</h2>
    <div className="manifesto-bottom"><p>ABAI BOL is a competition robotics team from Almaty. We design, prototype, code, break, rebuild and compete — turning every failure into the next iteration.</p><div className="coordinate"><strong>43.2380° N</strong><strong>76.9455° E</strong><span>ALMATY / HOME BASE</span></div></div>
  </section>
}

function Identity() {
  return <section className="identity dark" id="identity">
    <SectionKicker left="02 / IDENTITY SHIFT" right="2023 → NOW"/>
    <div className="identity-stage"><div className="old-name drift">ANTARES</div><div className="identity-arrow">→</div><div className="new-name drift">ABAI BOL</div></div>
    <div className="identity-copy"><p className="lede">THE NAME CHANGED.<br/><span>THE TEAM DIDN'T.</span></p><p>The competitive history built under ANTARES remains part of the same team story. ABAI BOL is the next chapter: a sharper identity, the same engineering culture, and a bigger surface for what comes next.</p></div>
  </section>
}

function Mission() {
  return <section className="mission paper" id="mission">
    <SectionKicker left="03 / FLAGSHIP MISSION" right="DEPOK · INDONESIA" light/>
    <div className="mission-header"><p className="mission-code">MISSION / 01<br/>JAN 05—07 / 2024</p><h2 className="mission-title">ALMATY<br/><span>→</span> DEPOK</h2></div>
    <div className="route-map"><svg viewBox="0 0 1000 330" role="img" aria-label="Stylized route from Almaty to Depok"><path className="map-contour" d="M48 114 C170 57 279 75 359 128 S509 201 588 160 S742 58 950 119"/><path className="map-contour thin" d="M82 230 C182 158 276 206 361 238 S519 273 605 213 S781 163 922 234"/><path className="route-line" d="M256 102 C435 22 588 45 746 214"/><circle cx="256" cy="102" r="7"/><circle cx="746" cy="214" r="7"/><text x="218" y="80">ALMATY</text><text x="760" y="225">DEPOK</text></svg></div>
    <div className="mission-results"><article><span>02 / 15</span><strong>QUALIFICATION RANK</strong></article><article><span>WINNER</span><strong>THINK AWARD</strong></article><article><span>FINALIST</span><strong>ALLIANCE CAPTAIN</strong></article><article><span>III</span><strong>CONTROL AWARD</strong></article></div>
  </section>
}

function Engineering() {
  const [active,setActive]=useState('mechanical'); const item=layers[active]
  return <section className="engineering dark" id="engineering">
    <SectionKicker left="04 / ENGINEERING" right="SYSTEMS, NOT DECORATION"/>
    <div className="engineering-intro"><h2>ANATOMY OF<br/><em>AN ITERATION.</em></h2><p>A robot is never one idea. It is a chain of decisions across mechanics, control, software and testing. Explore the four layers.</p></div>
    <div className="anatomy">
      <div className="anatomy-tabs" role="tablist">{Object.entries(layers).map(([key,l])=><button key={key} role="tab" aria-selected={active===key} onClick={()=>setActive(key)}><span>{l.index}</span><strong>{l.title}</strong><small>{l.tags.join(' / ')}</small></button>)}</div>
      <div className="anatomy-view"><div className="schematic" aria-hidden="true"><i className="ring r1"/><i className="ring r2"/><i className="cross h"/><i className="cross v"/><div className="body-shape"><i/><i/><i/><i/></div></div><div className="layer-copy" key={active}><span>LAYER / {item.index}</span><h3>{item.title}</h3><p>{item.copy}</p><ul>{item.tags.map(t=><li key={t}>{t}</li>)}</ul></div></div>
    </div>
    <p className="engineering-note">The Spline Nexbot is the current presentation character. Competition-robot CAD can be plugged into this interface later without changing the information architecture.</p>
  </section>
}

function Record() {
  return <section className="record paper" id="record">
    <SectionKicker left="05 / FLIGHT RECORDER" right="ANTARES-ERA HISTORY" light/>
    <div className="record-head"><h2>THE RECORD<br/>DOESN'T RESET.</h2><p>Historical competitive distinctions carried into the ABAI BOL story.</p></div>
    <div className="award-list"><div className="award-row header"><span>DATE</span><span>EVENT</span><span>LOCATION</span><span>RESULT</span></div>{awards.map((a,i)=><div className="award-row award" key={i}><span>{a.date}</span><strong>{a.event}</strong><span>{a.location}</span><b>{a.result}</b></div>)}</div>
  </section>
}

function Seasons() {
  return <section className="seasons dark"><SectionKicker left="06 / SEASONS" right="MISSION ARCHIVE"/><div className="season-grid">{seasons.map((s)=><article key={s.year} className={s.next?'next':''}><span>{s.year}</span><h3>{s.game.split('\n').map((v,i)=><React.Fragment key={v}>{i>0&&<br/>}{v}</React.Fragment>)}</h3><p>{s.note}</p><b>{s.result}</b></article>)}</div></section>
}

function Team() {
  const disciplines=[['01','ENGINEERING','Mechanical systems, CAD, prototyping, fabrication and iteration.'],['02','SOFTWARE','Autonomous routines, controls, vision, telemetry and match logic.'],['03','DESIGN','Identity, documentation, media, presentation and engineering communication.'],['04','IMPACT','Outreach, workshops, partnerships and making robotics visible beyond the field.']]
  return <section className="team paper"><SectionKicker left="07 / TEAM SYSTEM" right="ONE MACHINE / MANY DISCIPLINES" light/><h2>BUILDING IS<br/>A TEAM SPORT.</h2><div className="discipline-grid">{disciplines.map(d=><article key={d[0]}><span>{d[0]}</span><h3>{d[1]}</h3><p>{d[2]}</p></article>)}</div></section>
}

function Finale() {
  return <section className="finale dark"><div className="finale-star"/><div className="finale-orbit"/><div className="finale-copy"><span>THE NEXT NAME IS ALREADY HERE.</span><h2>ABAI<br/><em>BOL.</em></h2><p>FORMERLY ANTARES · FTC ROBOTICS · ALMATY</p><div className="finale-links"><a href="https://www.instagram.com/antares_ftc/" target="_blank">INSTAGRAM ↗</a><a href="https://ftc-events.firstinspires.org/" target="_blank">FIRST ↗</a><a href="#top">BACK TO TOP ↑</a></div></div></section>
}

function App() {
  const reduced=useReducedMotion(); const progressRef=useRef(null)
  useLayoutEffect(()=>{
    if (reduced) return
    const ctx=gsap.context(()=>{
      gsap.from('.hero .reveal',{yPercent:115,opacity:0,duration:1.15,stagger:.11,ease:'power4.out',delay:.18})
      gsap.utils.toArray('.split').forEach(el=>gsap.from(el,{y:100,opacity:0,scrollTrigger:{trigger:el,start:'top 78%'},duration:1.1,ease:'power4.out'}))
      gsap.to('.old-name',{xPercent:-16,scrollTrigger:{trigger:'.identity',start:'top bottom',end:'bottom top',scrub:1}})
      gsap.to('.new-name',{xPercent:8,scrollTrigger:{trigger:'.identity',start:'top bottom',end:'bottom top',scrub:1}})
      gsap.from('.route-line',{strokeDashoffset:520,scrollTrigger:{trigger:'.route-map',start:'top 75%',end:'bottom 45%',scrub:1}})
      gsap.from('.mission-results article',{y:55,opacity:0,stagger:.08,scrollTrigger:{trigger:'.mission-results',start:'top 80%'},duration:.8})
      gsap.from('.award',{x:-30,opacity:0,stagger:.035,scrollTrigger:{trigger:'.award-list',start:'top 82%'},duration:.6})
      gsap.from('.season-grid article',{y:80,opacity:0,stagger:.1,scrollTrigger:{trigger:'.season-grid',start:'top 80%'},duration:.8})
      gsap.to('.finale-star',{scale:1.35,rotation:30,scrollTrigger:{trigger:'.finale',start:'top bottom',end:'bottom bottom',scrub:1}})
    })
    return()=>ctx.revert()
  },[reduced])
  useEffect(()=>{
    const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;const p=max?scrollY/max:0;progressRef.current?.style.setProperty('transform',`scaleX(${p})`)}
    onScroll();addEventListener('scroll',onScroll,{passive:true});return()=>removeEventListener('scroll',onScroll)
  },[])
  return <><a className="skip-link" href="#main">Skip to content</a><div className="progress"><span ref={progressRef}/></div><Cursor reduced={reduced}/><header className="nav"><a className="brand" href="#top"><i>✦</i> ABAI BOL</a><nav><a href="#mission">MISSION</a><a href="#engineering">ENGINEERING</a><a href="#record">RECORD</a><a href="#identity">IDENTITY</a></nav><a className="signal" href="https://www.instagram.com/antares_ftc/" target="_blank"><i/>ALMATY / KZ</a></header><main id="main"><Hero reduced={reduced}/><Manifesto/><Identity/><Mission/><Engineering/><Record/><Seasons/><Team/><Finale/></main><footer><span>ABAI BOL / 2026</span><span>ALMATY · KAZAKHSTAN</span><span>BUILD / ITERATE / COMPETE</span></footer></>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
