# DESIGN.md — Sistema de Diseño Canónico: DYNASTY Showroom, Indumentaria Streetwear, Sneakers & Tech ('dynasty.ar')

## 1. Visual Theme & Atmosphere
- **Concepto**: DYNASTY // BUILT DIFFERENT — Criterio Retro-Táctico Urbano, Moda Heavyweight, Sneakers de Colección & Showroom Exclusivo.
- **Atmósfera**: Streetwear de alta gama, cortes boxy fit, algodones pesados de 480 GSM, estética brutalista suiza refinada con detalles neón táctico, monederos Cordura y sneakers vanguardistas.
- **Hero Archetype (Editorial Lookbook Streetwear Monumental)**:
  - Portada a pantalla completa con fotografía de modelo en pose editorial de alta costura urbana.
  - Tipografía `Syne` Heavy (900) y `Space Grotesk` con monograma `DYG`.
  - Badges tácticos con estado de stock en tiempo real, selector de lookbook de temporada y acceso a reserva de showroom privado.

## 2. Color Palette & Roles (Tactical Noir, Bone White & Acid Lime)
- **Fondo Base (Noir Táctico Profundo)**: `#09090b` / `#0f0f12`
- **Fondo Secundario (Asfalto Mate)**: `#18181b` / `#27272a`
- **Superficie de Tarjeta**: `rgba(24, 24, 27, 0.92)` con finos bordes de precisión técnica
- **Acento Primario (Acid Lime Táctico)**: `#bef264` / `#a3e635` (Energía, exclusividad, stock activo)
- **Acento Secundario (Cyber Ámbar & Naranja)**: `#f59e0b` / `#ea580c` (Edición limitada, drops)
- **Bordes & Separadores**: `rgba(190, 242, 100, 0.2)` y `rgba(255, 255, 255, 0.08)`
- **Texto Principal (Blanco Óptico)**: `#fafafa`
- **Texto Secundario**: `#a1a1aa`
- **Texto Muted**: `#71717a`

## 3. Typography Rules
- **Display / Títulos**: `Syne`, sans-serif display geométrica (Weights: 700, 800, 900)
- **Subtítulos Técnicos & Monogramas**: `Space Grotesk`, sans-serif mono-espaciada (Weights: 600, 700)
- **Cuerpo, Talles & Precios**: `Inter` / `Plus Jakarta Sans` (Weights: 500, 600, 700)
- **Escala Anti-Gigantismo H1**: `font-size: clamp(2.3rem, 5vw, 4.3rem); line-height: 1.05; letter-spacing: -0.02em;`

## 4. Component Stylings & Interaction Model (Full E-Commerce + Showroom)
- **Selectores de Talles & Colores en Tiempo Real**:
  - Talles de indumentaria: `S`, `M`, `L`, `XL`, `XXL`.
  - Talles de zapatillas: `38`, `39`, `40`, `41`, `42`, `43`, `44`, `45`.
  - Selector de colorway con swatches (*Washed Black, Acid Grey, Bone Sand, Military Olive*).
  - Indicador de stock dinámico ("⚡ Últimas 2 unidades disponibles").
- **Modal de Guía de Talles (Size Guide Modal)**:
  - Tabla de medidas exactas en centímetros (Ancho Pecho, Largo Total, Largo Manga) para un fit perfecto.
- **Carrito Drawer Lateral con Lógica Comercial Dynasty**:
  - Barra de progreso interactiva hacia **Envío Gratis** (Umbral $120.000 ARS).
  - Descuento automático del **15% OFF abonando por Transferencia Bancaria**.
  - 3 y 6 cuotas sin interés calculadas al instante.
  - Checkout formateado directo a WhatsApp con SKU, talle y colorway seleccionados.
- **Agendador de Cita en Showroom Privado (Mar del Plata)**:
  - Selector de fecha y horario para atención exclusiva, asesoramiento de fit y café de especialidad de cortesía.

## 5. Layout Principles & Motion
- Scroll cinematográfico con **Lenis 60fps**.
- Revelado de prendas con **GSAP ScrollTrigger**.
- Efecto 3D perspective tilt interactivo en las tarjetas de producto.
