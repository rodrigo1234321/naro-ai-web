import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SLUGS } from '../src/config/slugs.js'
import { getRubro, FONT_STACKS } from '../src/config/rubros.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

let n = 0
for (const slug of SLUGS) {
  const r = getRubro(slug)
  if (!r) {
    console.error('Rubro no encontrado:', slug)
    continue
  }
  const fh = FONT_STACKS[r.fuentes.h]
  const fb = FONT_STACKS[r.fuentes.b]
  const fonts = `https://fonts.googleapis.com/css2?family=${fh.css}&family=${fb.css}&display=swap`
  const title = `${r.nombre} — ${r.rubro} | ${r.zona}`
  const desc = esc(r.hero.sub)

  const pageDir = resolve(root, 'pages')
  mkdirSync(pageDir, { recursive: true })
  writeFileSync(
    resolve(pageDir, `${slug}.html`),
    `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='%23111'/><text x='50' y='68' font-size='52' text-anchor='middle'>${r.nombre.charAt(0)}</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${fonts}" rel="stylesheet">
</head>
<body>
<div id="root"></div>
<script type="module" src="/src/entries/${slug}.jsx"></script>
</body>
</html>
`
  )

  const entriesDir = resolve(root, 'src/entries')
  mkdirSync(entriesDir, { recursive: true })
  writeFileSync(
    resolve(entriesDir, `${slug}.jsx`),
    `import { renderDemo } from '../App.jsx'
renderDemo(${JSON.stringify(slug)})
`
  )
  n++
}
console.log(`Generadas ${n} entradas (pages + entries)`)
