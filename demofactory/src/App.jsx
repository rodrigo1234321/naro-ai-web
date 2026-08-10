import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { getRubro, FONT_STACKS } from './config/rubros.js'
import { Icon, Reveal, CountUp } from './ui.jsx'
import './styles.css'

const NAV_LABELS = { cards: 'Servicios', galeria: 'Galería', pasos: 'Cómo funciona', precios: 'Planes', testimonios: 'Clientes', faq: 'Preguntas', cta: 'Contacto' }

function waDigits(tel) {
  let d = String(tel || '').replace(/\D/g, '')
  if (!d) return ''
  if (d.startsWith('011')) d = '54911' + d.slice(3)
  if (!d.startsWith('549') && d.length === 10 && d.startsWith('0')) d = '549' + d.slice(1)
  return d
}

function useData(rubro) {
  return useMemo(() => {
    const p = new URLSearchParams(location.search)
    const nombre = p.get('n') || rubro.nombre
    const tel = p.get('t') || rubro.tel
    const dir = p.get('d') || rubro.dir
    const msg = (p.get('w') || rubro.wa_texto).replace(/\{nombre\}/g, nombre)
    return { nombre, tel, dir, msg, wa: waDigits(tel) }
  }, [rubro])
}

function waLink(data, extra = '') {
  return `https://wa.me/${data.wa}?text=${encodeURIComponent(extra ? `${extra} ` : '') + encodeURIComponent(data.msg)}`
}

function Lightbox({ items, idx, setIdx }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') setIdx(-1)
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % items.length)
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [items.length, setIdx])
  if (idx < 0) return null
  return (
    <div className="lightbox" onClick={() => setIdx(-1)}>
      <button className="lb-btn lb-close" aria-label="Cerrar" onClick={() => setIdx(-1)}><Icon name="close" size="lg" /></button>
      {items.length > 1 && (
        <>
          <button className="lb-btn lb-prev" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + items.length) % items.length) }}><Icon name="chevron" size="lg" style={{ transform: 'rotate(90deg)' }} /></button>
          <button className="lb-btn lb-next" aria-label="Siguiente" onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % items.length) }}><Icon name="chevron" size="lg" style={{ transform: 'rotate(-90deg)' }} /></button>
        </>
      )}
      <img src={items[idx].img} alt={items[idx].label || ''} onClick={(e) => e.stopPropagation()} />
    </div>
  )
}

function SectionCards({ r, items }) {
  return (
    <div className="cards">
      {items.map((it, i) => (
        <Reveal key={i} d={i % 3} className="card">
          {it.icon && <div className="card-ic"><Icon name={it.icon} size="lg" /></div>}
          <h3>{it.titulo}</h3>
          <p>{it.desc}</p>
          {it.precio && <div className="card-price">{it.precio}</div>}
          {it.chips && (
            <div className="chips">{it.chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>
          )}
          {r.familia === 'gastro' && (
            <a className="card-wa" href={waLink(r.data, `Quiero pedir: ${it.titulo}`)}>
              <Icon name="whatsapp" size="sm" /> Pedir por WhatsApp
            </a>
          )}
        </Reveal>
      ))}
    </div>
  )
}

function SectionGaleria({ items }) {
  const [idx, setIdx] = useState(-1)
  return (
    <>
      <div className="galeria">
        {items.map((it, i) => (
          <Reveal key={i} d={i % 3} className="g-item" onClick={() => setIdx(i)}>
            <img src={it.img} alt={it.label || ''} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            <span>{it.label}</span>
            <span className="g-icon"><Icon name="zoom" size="md" /></span>
          </Reveal>
        ))}
      </div>
      <Lightbox items={items} idx={idx} setIdx={setIdx} />
    </>
  )
}

function SectionPasos({ items }) {
  return (
    <div className="steps">
      {items.map((it, i) => (
        <Reveal key={i} d={i % 3} className="step">
          <div className="step-num">0{i + 1}</div>
          <h3>{it.titulo}</h3>
          <p>{it.desc}</p>
        </Reveal>
      ))}
    </div>
  )
}

function SectionPrecios({ items }) {
  return (
    <div className="precios">
      {items.map((it, i) => (
        <Reveal key={i} d={i % 3} className={`precio${i === 1 ? ' destacado' : ''}`}>
          {i === 1 && <span className="badge">Más elegido</span>}
          <h3>{it.nombre}</h3>
          <div className="precio-val">{it.precio}</div>
          <ul>{it.lista.map((l, j) => <li key={j}><Icon name="check" size="sm" />{l}</li>)}</ul>
          <a className="btn btn-wa" href={waLink(items._data, `Quiero el plan: ${it.nombre}`)} style={{ padding: '12px 20px', fontSize: '13.5px' }}>
            <Icon name="whatsapp" size="sm" /> Consultar
          </a>
        </Reveal>
      ))}
    </div>
  )
}

function SectionTestimonios({ items }) {
  const sc = useRef(null)
  const n = (dir) => {
    const el = sc.current
    if (!el) return
    el.scrollBy({ left: dir * (el.firstElementChild?.offsetWidth + 20 || 420), behavior: 'smooth' })
  }
  return (
    <div className="testi-wrap">
      <div className="testi-scroll" ref={sc}>
        {items.map((it, i) => (
          <Reveal key={i} className="testi">
            <div className="stars">{Array.from({ length: 5 }).map((_, s) => <Icon key={s} name="star" size="sm" />)}</div>
            <p>“{it.texto}”</p>
            <div className="quien">
              <div className="avatar">{it.nombre.charAt(0)}</div>
              <div><b>{it.nombre}</b><span>{it.rol}</span></div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="testi-nav">
        <button aria-label="Anterior" onClick={() => n(-1)}><Icon name="chevron" size="md" style={{ transform: 'rotate(90deg)' }} /></button>
        <button aria-label="Siguiente" onClick={() => n(1)}><Icon name="chevron" size="md" style={{ transform: 'rotate(-90deg)' }} /></button>
      </div>
    </div>
  )
}

function SectionFaq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq">
      {items.map((it, i) => (
        <Reveal key={i} className={`faq-item${open === i ? ' open' : ''}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            {it.q}
            <span className="chev"><Icon name="chevron" size="md" /></span>
          </button>
          <div className="faq-a" style={{ maxHeight: open === i ? 220 : 0 }}><p>{it.a}</p></div>
        </Reveal>
      ))}
    </div>
  )
}

function Section({ r, s, i }) {
  const head = (s.kicker || s.titulo) && (
    <div className="section-head">
      {s.kicker && <div className="kicker">{s.kicker}</div>}
      {s.titulo && <h2>{s.titulo}</h2>}
      {s.sub && <p>{s.sub}</p>}
    </div>
  )
  const alt = i % 2 === 1
  if (s.tipo === 'cta') {
    return (
      <section className="cta-band" id="contacto">
        <div className="hero-mesh" />
        <div className="cta-inner">
          <Reveal>
            <h2>{s.titulo}</h2>
            <p>{s.sub}</p>
            <a className="btn btn-wa" href={waLink(r.data)}><Icon name="whatsapp" size="md" /> Escribinos por WhatsApp</a>
          </Reveal>
        </div>
      </section>
    )
  }
  return (
    <section className={alt ? 'alt' : ''} id={s.tipo === 'cards' ? 'servicios' : s.tipo === 'galeria' ? 'galeria' : s.tipo === 'pasos' ? 'pasos' : s.tipo === 'precios' ? 'planes' : s.tipo === 'testimonios' ? 'clientes' : 'preguntas'}>
      {head}
      <Reveal>
        {s.tipo === 'cards' && <SectionCards r={r} items={s.items} />}
        {s.tipo === 'galeria' && <SectionGaleria items={s.items} />}
        {s.tipo === 'pasos' && <SectionPasos items={s.items} />}
        {s.tipo === 'precios' && <SectionPrecios items={s.items} />}
        {s.tipo === 'testimonios' && <SectionTestimonios items={s.items} />}
        {s.tipo === 'faq' && <SectionFaq items={s.items} />}
      </Reveal>
    </section>
  )
}

export function DemoApp({ rubro: slug }) {
  const rubro = getRubro(slug)
  const data = useData(rubro)
  const r = { ...rubro, data }
  const [menuOpen, setMenuOpen] = useState(false)
  const f = FONT_STACKS[r.fuentes.h] && FONT_STACKS[r.fuentes.b] ? FONT_STACKS : null
  const theme = {
    '--bg': r.paleta.bg,
    '--bg2': r.paleta.bg2,
    '--surface': r.paleta.surface,
    '--border': r.paleta.border,
    '--text': r.paleta.text,
    '--sub': r.paleta.sub,
    '--prim': r.paleta.prim,
    '--prim2': r.paleta.prim2,
    '--accent': r.paleta.accent,
    '--wa': r.paleta.wa,
    '--font-h': f ? f[r.fuentes.h].stack : "'Sora',sans-serif",
    '--font-b': f ? f[r.fuentes.b].stack : "'Inter',sans-serif"
  }
  const links = r.secciones.filter((s) => s.tipo !== 'cta').slice(0, 5)
  const isPersonalizada = !!new URLSearchParams(location.search).get('n')
  return (
    <div style={theme}>
      <div className="demo-bar">
        {isPersonalizada ? <><b>{data.nombre}</b> — demo en vivo con tus datos · web lista para activar</> : <>Demo interactiva de <b>{data.nombre}</b> · {r.rubro} · Mar del Plata</>}
        <a href="https://mis-clientes-html.pages.dev/nora-ai/" target="_blank" rel="noreferrer">Hecha por Naro AI</a>
      </div>
      <nav className={menuOpen ? 'nav-open' : ''}>
        <div className="brand">
          <span className="brand-mark">{data.nombre.charAt(0)}</span>
          <span>{data.nombre}</span>
        </div>
        <ul className="nav-links">
          {links.map((s) => (
            <li key={s.tipo}><a href={`#${s.tipo === 'cards' ? 'servicios' : s.tipo === 'galeria' ? 'galeria' : s.tipo === 'pasos' ? 'pasos' : s.tipo === 'precios' ? 'planes' : s.tipo === 'testimonios' ? 'clientes' : 'preguntas'}`} onClick={() => setMenuOpen(false)}>{NAV_LABELS[s.tipo]}</a></li>
          ))}
        </ul>
        <a className="nav-wa" href={waLink(data)}><Icon name="whatsapp" size="md" /> WhatsApp</a>
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          <Icon name={menuOpen ? 'close' : 'menu'} size="lg" />
        </button>
      </nav>

      <header className="hero">
        <div className="hero-mesh" />
        <div className="hero-inner">
          <div>
            <Reveal><span className="hero-tag"><span className="dot" />{r.hero.kicker}</span></Reveal>
            <Reveal d={1}><h1>{r.hero.titulo[0]} <span className="grad">{r.hero.titulo[1]}</span></h1></Reveal>
            <Reveal d={2}><p className="hero-sub">{r.hero.sub}</p></Reveal>
            <Reveal d={3}>
              <div className="hero-btns">
                <a className="btn btn-wa" href={waLink(data)}><Icon name="whatsapp" size="md" /> Escribinos por WhatsApp</a>
                <a className="btn btn-ghost" href="#servicios">Ver servicios <Icon name="arrow" size="sm" /></a>
              </div>
            </Reveal>
            <div className="hero-stats">
              {r.stats.map(([num, label], i) => (
                <Reveal key={label} d={i} className="stat"><CountUp value={num} /><span>{label}</span></Reveal>
              ))}
            </div>
          </div>
          <Reveal d={2} className="hero-visual">
            <div className="hero-photo">
              <img src={r.hero.img} alt={data.nombre} onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
            <div className="hero-card">
              <span className="ic"><Icon name="whatsapp" /></span>
              <div><b>Respuesta inmediata</b><span>Te contestamos en minutos</span></div>
            </div>
          </Reveal>
        </div>
      </header>

      {r.secciones.map((s, i) => <Section key={i} r={r} s={s} i={i} />)}

      <footer>
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="brand"><span className="brand-mark">{data.nombre.charAt(0)}</span><span>{data.nombre}</span></div>
            <p>{r.rubro} en {r.zona}. Demostración interactiva lista para convertir tu negocio en una web profesional.</p>
          </div>
          <div className="foot-col">
            <h4>Contacto</h4>
            <ul>
              <li><Icon name="mapPin" size="sm" />{data.dir}</li>
              <li><Icon name="clock" size="sm" />Lunes a sábados, 9 a 20 hs</li>
              <li><a href={waLink(data)}><Icon name="whatsapp" size="sm" />Escribinos por WhatsApp</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Explorá</h4>
            <ul>
              {links.map((s) => <li key={s.tipo}><a href={`#${s.tipo === 'cards' ? 'servicios' : s.tipo === 'galeria' ? 'galeria' : s.tipo === 'pasos' ? 'pasos' : s.tipo === 'precios' ? 'planes' : s.tipo === 'testimonios' ? 'clientes' : 'preguntas'}`}>{NAV_LABELS[s.tipo]}</a></li>)}
              <li><a href="https://mis-clientes-html.pages.dev/nora-ai/" target="_blank" rel="noreferrer">Naro AI — Agencia</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-credits">
          <span>© {new Date().getFullYear()} {data.nombre} · {r.zona}</span>
          <span>Web demo creada por <b>Naro AI</b> — activá la tuya hoy</span>
        </div>
      </footer>

      <a className="fab" href={waLink(data)} aria-label="WhatsApp"><Icon name="whatsapp" size="xl" /></a>
    </div>
  )
}

export function renderDemo(slug) {
  createRoot(document.getElementById('root')).render(<DemoApp rubro={slug} />)
}
