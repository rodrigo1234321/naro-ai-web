export const VARIANTS = {
  split: {
    hero: 'split', stats: 'hero2', gallery: 'mosaic', card: 'grid', price: 'cards',
    order: ['cards', 'galeria', 'pasos', 'precios', 'testimonios', 'faq', 'cta'],
    marquee: false, shapes: 'dots'
  },
  editorial: {
    hero: 'editorial', stats: 'hero2', gallery: 'scroll', card: 'soft', price: 'cards',
    order: ['cards', 'galeria', 'pasos', 'precios', 'testimonios', 'faq', 'cta'],
    marquee: true, shapes: 'arch'
  },
  neon: {
    hero: 'neon', stats: 'band3', gallery: 'grid', card: 'tech', price: 'cards',
    order: ['cards', 'galeria', 'pasos', 'precios', 'testimonios', 'faq', 'cta'],
    marquee: true, shapes: 'scan'
  },
  warm: {
    hero: 'warm', stats: 'hero2', gallery: 'mosaic', card: 'menu', price: 'cards',
    order: ['cards', 'galeria', 'pasos', 'precios', 'testimonios', 'faq', 'cta'],
    marquee: true, shapes: 'blob'
  },
  travel: {
    hero: 'travel', stats: 'band3', gallery: 'mosaic', card: 'soft', price: 'cards',
    order: ['cards', 'galeria', 'pasos', 'precios', 'testimonios', 'faq', 'cta'],
    marquee: false, shapes: 'soft'
  },
  industrial: {
    hero: 'industrial', stats: 'band4', gallery: 'grid', card: 'tech', price: 'cards',
    order: ['cards', 'pasos', 'galeria', 'precios', 'testimonios', 'faq', 'cta'],
    marquee: false, shapes: 'angles'
  },
  playful: {
    hero: 'playful', stats: 'chips', gallery: 'mosaic', card: 'soft', price: 'cards',
    order: ['cards', 'galeria', 'pasos', 'testimonios', 'precios', 'faq', 'cta'],
    marquee: false, shapes: 'blob'
  },
  b2b: {
    hero: 'b2b', stats: 'panel', gallery: 'grid', card: 'list', price: 'table',
    order: ['pasos', 'cards', 'precios', 'galeria', 'testimonios', 'faq', 'cta'],
    marquee: false, shapes: 'dots'
  },
  sport: {
    hero: 'sport', stats: 'hero3', gallery: 'scroll', card: 'grid', price: 'cards',
    order: ['cards', 'galeria', 'pasos', 'precios', 'testimonios', 'faq', 'cta'],
    marquee: true, shapes: 'angles'
  },
  realty: {
    hero: 'realty', stats: 'hero2', gallery: 'duo', card: 'soft', price: 'cards',
    order: ['galeria', 'cards', 'pasos', 'precios', 'testimonios', 'faq', 'cta'],
    marquee: false, shapes: 'soft'
  }
}

export const LAYOUTS = {
  'clinica-aura': 'split',
  'dental-sonrisa': 'split',
  'estetica-lumiere': 'editorial',
  'peluqueria-ambar': 'editorial',
  'kinesio-movere': 'sport',
  'restaurante-rias': 'warm',
  'cafe-verde-alba': 'warm',
  'viandas-sabores': 'warm',
  'rotiseria-don-gino': 'warm',
  'cerveceria-punto-cebada': 'neon',
  'vinoteca-cava-puerto': 'neon',
  'showroom-nube': 'editorial',
  'sport-base9': 'sport',
  'calzado-paso-norte': 'sport',
  'inmobiliaria-costa-real': 'realty',
  'temporarios-dunas': 'realty',
  'cabanas-aires-faro': 'travel',
  'hotel-olas-sur': 'travel',
  'lavadero-aquashine': 'industrial',
  'gomeria-rodado-sur': 'industrial',
  'taller-motorbox': 'industrial',
  'regaleria-dulce-detalle': 'playful',
  'imprenta-estampa': 'b2b',
  'distribuidora-mdp': 'b2b',
  'ferreteria-ferretodo': 'industrial',
  'petshop-patitas': 'playful',
  'contable-conta-co': 'b2b',
  'flores-jardin-puerto': 'editorial'
}

export const VARIANT_LABEL = {
  split: 'Clínico',
  editorial: 'Editorial',
  neon: 'Nocturno',
  warm: 'Gastronómico',
  travel: 'Vacaciones',
  industrial: 'Industrial',
  playful: 'Lúdico',
  b2b: 'B2B',
  sport: 'Sport',
  realty: 'Inmobiliario'
}

export function getLayout(slug) {
  const key = LAYOUTS[slug] || 'split'
  return { key, ...VARIANTS[key] }
}
