import React, { useEffect, useRef, useState } from 'react'

const P = {
  stethoscope: <><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3M8 15v1a6 6 0 0 0 6 6a6 6 0 0 0 6-6v-4" /><circle cx="20" cy="10" r="2" /></>,
  heart: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></>,
  activity: <><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
  tooth: <><path d="M12 5.5c-1.5-1.5-3-2-5-2-2.5 0-4.5 1.5-5 4-.5 2.5.5 5 1 6.5.5 1.5 1 3 2 3 1.5 0 1.5-2 2-3.5.5-1.5 1-2.5 2-2.5s1.5 1 2 2.5c.5 1.5.5 3.5 2 3.5 1 0 1.5-1.5 2-3 .5-1.5 1.5-4 1-6.5-.5-2.5-2.5-4-5-4-2 0-3.5.5-5 2z" /></>,
  sparkle: <><path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z" /></>,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  droplet: <><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></>,
  leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>,
  bone: <><path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" /></>,
  dumbbell: <><path d="M5 8v8M3 10v4M19 8v8M21 10v4M5 12h14" /><path d="M8 8l1.5-3h5L16 8M8 16l1.5 3h5L16 16" /></>,
  flame: <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></>,
  wine: <><path d="M8.5 3h7l.9 7.5a4.6 4.6 0 0 1-8.8 0z" /><path d="M12 14v6M7.5 20h9" /></>,
  coffee: <><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" /><path d="M6 2v2M10 2v2M14 2v2" /></>,
  beer: <><path d="M17 9h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" /><path d="M5 9h10v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" /><path d="M8 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" /></>,
  scissors: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" /></>,
  shirt: <><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" /></>,
  shoe: <><path d="M4 18c0 2 1.5 3 4 3h7c2 0 3-1.5 3-3.5L18 9c0-2-1-3.5-3-4-1.5-.4-3-1.5-4-2.5-1-1-2.5-1.2-3.8-.4C6 2.7 5.2 4 4.8 5.4 4.4 6.8 4 17 4 18z" /><path d="M7 15h7" /></>,
  bed: <><path d="M2 6v12M2 12h20v6" /><path d="M6 12v-2h5v2M18 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" /></>,
  home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></>,
  key: <><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></>,
  wrench: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></>,
  truck: <><path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>,
  lightbulb: <><path d="M9 18h6M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" /></>,
  gift: <><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" /></>,
  printer: <><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></>,
  tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.83z" /><circle cx="7" cy="7" r="1" /></>,
  paw: <><path d="M11 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6.5 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17.5 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /><path d="M12 14c3.5 0 6-2.5 6-5.5C18 6 17 5 15.5 5c-1 0-1.8.6-2.2 1.5C12.9 5.6 12.1 5 11 5 9.5 5 8.5 6 8.5 7.5c0 3 2.5 5.5 6 5.5z" /><path d="M7.5 16.5c1.5 1 3 1.5 4.5 1.5s3-.5 4.5-1.5" /></>,
  flower: <><path d="M12 7.5c-3 0-4.5-1-4.5-3s1.5-3 4.5-3 4.5 1 4.5 3-1.5 3-4.5 3z" /><path d="M12 7.5v9M9.5 10l-4.5 9M14.5 10l4.5 9" /></>,
  calculator: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8" /><path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01" /></>,
  camera: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>,
  mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></>,
  whatsapp: <><path fill="currentColor" stroke="none" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></>,
  star: <><path fill="currentColor" stroke="none" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></>,
  arrow: <><path d="M5 12h14M12 5l7 7-7 7" /></>,
  chevron: <><path d="M6 9l6 6 6-6" /></>,
  close: <><path d="M18 6L6 18M6 6l12 12" /></>,
  check: <><path d="M20 6L9 17l-5-5" /></>,
  menu: <><path d="M3 12h18M3 6h18M3 18h18" /></>,
  zoom: <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>
}

const SIZES = { sm: 16, md: 18, lg: 22, xl: 26 }

export function Icon({ name, size = 'md', style }) {
  const s = typeof size === 'number' ? size : SIZES[size] || 18
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      {P[name] || P.sparkle}
    </svg>
  )
}

export function Reveal({ children, d = 0, as: Tag = 'div', style, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${d ? `d${d}` : ''} ${className}`} style={style}>
      {children}
    </Tag>
  )
}

export function CountUp({ value, dur = 1200 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState('0')
  const m = String(value).match(/^([\d.,]+)(.*)$/)
  const target = m ? parseFloat(m[1].replace(',', '.')) : 0
  const sfx = m ? m[2] : ''
  const decimals = String(m ? m[1] : '0').includes('.') ? 1 : 0
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay((target * eased).toFixed(decimals))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <b ref={ref}>
      {display}
      {sfx && <span className="sfx">{sfx}</span>}
    </b>
  )
}
