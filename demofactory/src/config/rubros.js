import { salud } from './salud.js'
import { gastro } from './gastro.js'
import { moda } from './moda.js'
import { inmobiliaria } from './inmobiliaria.js'
import { turismo } from './turismo.js'
import { automotriz } from './automotriz.js'
import { comercio } from './comercio.js'
import { servicios } from './servicios.js'

export const FAMILIAS = ['salud', 'gastro', 'moda', 'inmobiliaria', 'turismo', 'automotriz', 'comercio', 'servicios']

export const RUBROS = [...salud, ...gastro, ...moda, ...inmobiliaria, ...turismo, ...automotriz, ...comercio, ...servicios]

export function getRubro(slug) {
  return RUBROS.find((r) => r.slug === slug)
}

export function rubroSlug(nombre) {
  return nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export const FONT_STACKS = {
  'Space Grotesk': { css: 'Space+Grotesk:wght@400;500;600;700', stack: "'Space Grotesk',sans-serif" },
  Sora: { css: 'Sora:wght@400;600;700;800', stack: "'Sora',sans-serif" },
  Fraunces: { css: 'Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700', stack: "'Fraunces',serif" },
  Manrope: { css: 'Manrope:wght@400;500;600;700;800', stack: "'Manrope',sans-serif" },
  'Bricolage Grotesque': { css: 'Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800', stack: "'Bricolage Grotesque',sans-serif" },
  Inter: { css: 'Inter:wght@300;400;500;600;700', stack: "'Inter',sans-serif" },
  Outfit: { css: 'Outfit:wght@300;400;500;600;700;800', stack: "'Outfit',sans-serif" }
}
