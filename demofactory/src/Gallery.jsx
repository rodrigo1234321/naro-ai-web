import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { FAMILIAS, getRubro, RUBROS } from './config/rubros.js'
import './gallery.css'

const FAMILIA_LABELS = {
  salud: 'Salud y estética',
  gastro: 'Gastronomía',
  moda: 'Moda e indumentaria',
  inmobiliaria: 'Inmobiliarias',
  turismo: 'Turismo y alojamiento',
  automotriz: 'Automotriz',
  comercio: 'Comercio',
  servicios: 'Servicios profesionales'
}

const FAMILIA_COLORS = {
  salud: '#22d3ee',
  gastro: '#f97316',
  moda: '#e879f9',
  inmobiliaria: '#a78bfa',
  turismo: '#34d399',
  automotriz: '#fbbf24',
  comercio: '#60a5fa',
  servicios: '#f472b6'
}

function buildPersonalUrl(slug) {
  const params = new URLSearchParams(location.search)
  const qs = new URLSearchParams()
  for (const k of ['n', 't', 'd']) {
    const v = params.get(k)
    if (v) qs.set(k, v)
  }
  const q = qs.toString()
  return `https://mis-clientes-html.pages.dev/demos/${slug}.html${q ? '?' + q : ''}`
}

function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
  return new Promise((resolve, reject) => {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    try { document.execCommand('copy') ? resolve() : reject(new Error('copy fail')) } catch (e) { reject(e) }
    document.body.removeChild(ta)
  })
}

function DemoCard({ slug }) {
  const r = getRubro(slug)
  const [copied, setCopied] = useState(false)
  if (!r) return null
  const color = FAMILIA_COLORS[r.familia] || '#888'

  const onCopy = () => {
    copyText(buildPersonalUrl(slug))
      .then(() => setCopied(true))
      .catch(() => setCopied(false))
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="g-card" style={{ '--acc': color }}>
      <a className="g-thumb" href={`./${slug}.html`}>
        <img src={`./assets/${slug}/hero.jpg`} alt={r.nombre} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} />
        <span className="g-tag" style={{ background: color }}>{FAMILIA_LABELS[r.familia] || r.familia}</span>
      </a>
      <div className="g-body">
        <h3>{r.nombre}</h3>
        <p>{r.rubro}</p>
        <div className="g-actions">
          <a className="g-open" href={`./${slug}.html`}>Abrir demo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M9 7h8v8" /></svg></a>
          <button className={`g-copy${copied ? ' copied' : ''}`} onClick={onCopy}>
            {copied ? '¡Copiado!' : 'Copiar enlace'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function renderGallery() {
  const root = document.getElementById('root')
  const params = new URLSearchParams(location.search)
  const filtro = params.get('f') || ''

  function Gallery() {
    const [q, setQ] = useState(filtro)
    const [fam, setFam] = useState('')
    const [count, setCount] = useState(RUBROS.length)

    useEffect(() => {
      document.title = 'Demo Factory — 28 demos para negocios de Mar del Plata'
    }, [])

    const visible = RUBROS.filter((r) => {
      if (fam && r.familia !== fam) return false
      if (!q) return true
      const t = `${r.nombre} ${r.rubro} ${r.zona}`.toLowerCase()
      return t.includes(q.toLowerCase())
    })

    useEffect(() => setCount(visible.length), [q, fam, visible.length])

    return (
      <div className="g-wrap">
        <header className="g-hero">
          <span className="g-kicker">Naro AI · Demo Factory</span>
          <h1>28 demos en vivo para negocios de Mar del Plata</h1>
          <p>Elegí un rubro, personalizá la demo con <code>?n=nombre&t=tel&d=dirección</code> y mostrársela a tu cliente.</p>
          <div className="g-controls">
            <input
              className="g-search"
              placeholder="Buscar demo (ej: clínica, cervecería, cabañas...)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="g-fams">
            <button className={!fam ? 'g-fam on' : 'g-fam'} onClick={() => setFam('')}>Todas</button>
            {FAMILIAS.map((f) => (
              <button
                key={f}
                className={fam === f ? 'g-fam on' : 'g-fam'}
                style={fam === f ? { borderColor: FAMILIA_COLORS[f], color: FAMILIA_COLORS[f] } : {}}
                onClick={() => setFam(f)}
              >
                {FAMILIA_LABELS[f]}
              </button>
            ))}
          </div>
        </header>
        <div className="g-count">{count} demo{count === 1 ? '' : 's'}</div>
        <main className="g-grid">
          {visible.map((r) => <DemoCard key={r.slug} slug={r.slug} />)}
        </main>
        <footer className="g-foot">
          Demo Factory · 28 demos React · mis-clientes-html.pages.dev/demos
        </footer>
      </div>
    )
  }

  root.style.background = '#0a0a0f'
  createRoot(root).render(<Gallery />)
}
