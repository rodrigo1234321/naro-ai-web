import { readdirSync, readFileSync, writeFileSync, renameSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const demos = resolve(resolve(dirname(fileURLToPath(import.meta.url)), '..'), '..', 'public', 'demos')
const pagesDir = resolve(demos, 'pages')

let moved = 0
try {
  for (const f of readdirSync(pagesDir)) {
    if (f.endsWith('.html')) {
      const src = readFileSync(resolve(pagesDir, f), 'utf8')
      writeFileSync(resolve(demos, f), src.replaceAll('../assets/', './assets/'), 'utf8')
      moved++
    }
  }
  rmSync(pagesDir, { recursive: true, force: true })
} catch (e) {
  console.error('flatten:', e.message)
}
console.log(`Flatten: ${moved} html movidos a /demos/`)
