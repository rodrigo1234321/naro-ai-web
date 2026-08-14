# DESIGN.md — Sistema de Diseño Canónico: Imprenta Industrial, Gráfica Digital & Cartelería Corporativa

## 1. Visual Theme & Atmosphere
- **Concepto**: Precisión Gráfica Industrial, Fidelidad de Color & Soluciones Corporativas B2B.
- **Atmósfera**: Taller gráfico de alta tecnología, maquinaria offset y digital de gran formato, calibración de color Pantone, papel ilustración de alto gramaje, terminaciones premium (laca UV, soft touch, hot stamping) y sobriedad ejecutiva.
- **Hero Archetype (Precision Industrial Machinery & Live Technical Quotation Bar)**:
  - Portada con maquinaria industrial alemana de última generación.
  - Tipografía técnica estructurada `Space Grotesk` y `Plus Jakarta Sans`.
  - Badge de control de calidad *"CALIBRACIÓN COLOR CMYK · CONTROL 300 DPI"*.
  - Cotizador técnico rápido integrado para empresas y comercios.

## 2. Color Palette & Roles (Industrial Navy, Blueprint Cobalt & Platinum Monochrome)
- **Fondo Base (Blanco Platino Técnico)**: `#f8fafc` / `#ffffff`
- **Fondo Secundario (Grafito Slate Suave)**: `#f1f5f9` / `#e2e8f0`
- **Superficie de Tarjeta**: `#ffffff` con borde milimétrico y sombra nítida
- **Acento Primario (Azul Blueprint Técnico)**: `#2563eb` / `#1d4ed8` (Confianza industrial, ingeniería gráfica)
- **Acento Secundario (Azul Marino Profundo)**: `#0f172a` / `#1e293b` (Solidez y seriedad corporativa)
- **Acento de Estado (Cyan Técnico)**: `#0284c7`
- **Bordes & Grillas**: `#e2e8f0` / `#cbd5e1`
- **Texto Principal (Negro Técnico Carbón)**: `#0f172a` (Contraste AAA)
- **Texto Secundario**: `#334155`
- **Texto Muted**: `#64748b`

## 3. Typography Rules
- **Display / Títulos**: `Space Grotesk`, display técnico estructurado (Weights: 600, 700, 800)
- **Cuerpo, Fichas Técnicas & Cotizaciones**: `Plus Jakarta Sans` e `Inter` (Weights: 500, 600, 700)
- **Escala Anti-Gigantismo H1**: `font-size: clamp(2.2rem, 4.4vw, 3.8rem); line-height: 1.12; letter-spacing: -0.02em;`

## 4. Component Stylings & Interaction Model (Industrial Print Engine)
- **Cotizador Instantáneo de Impresión por Escala**:
  - Selector de línea de producto: *Stickers & Etiquetas en Rollo*, *Packaging & Cajas Microcorrugadas*, *Papelería Corporativa & Carpetas*, *Cartelería & Lonas Frontlight*.
  - Selector de tirada con descuento por volumen (*100u, 500u, 1.000u, 5.000u*).
  - Selector de terminación (*Laminado Mate Soft Touch, Laca UV Sectorizada, Vinilo Holográfico, Kraft 100% Reciclado*).
  - Desglose de costo unitario y total con botón de envío de archivos técnicos a WhatsApp.
- **Checklist Técnico Pre-Flight de Archivos**:
  - Requisitos estandarizados de pre-impresión: Formato PDF/X-1a, espacio de color CMYK, 300 DPI y 3mm de demasía/sangría.
- **Galería de Servicios Industriales con Fichas de Especificación**:
  - Tarjetas detalladas con gramajes de papel (150g, 300g, 350g ilustración), micrones de vinilo y tipos de corte láser/guillotina.

## 5. Scroll & Motion Architecture
- Scroll ultra fluido de 60fps con **Lenis + GSAP ScrollTrigger**.
- Entrada escalonada de fichas técnicas con microinteracciones sutiles.
