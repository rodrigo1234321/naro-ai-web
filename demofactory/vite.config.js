import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const pagesDir = resolve(__dirname, 'pages')
const input = Object.fromEntries(
  readdirSync(pagesDir)
    .filter((f) => f.endsWith('.html'))
    .map((f) => [f.replace('.html', ''), resolve(pagesDir, f)])
)
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../public/demos',
    emptyOutDir: true,
    rollupOptions: {
      input,
      output: {
        manualChunks: {
          react: ['react', 'react-dom']
        }
      }
    }
  }
})
