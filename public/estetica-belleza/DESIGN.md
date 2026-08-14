# DESIGN.md — Sistema de Diseño Canónico: Estética, Dermatología & Belleza

## 1. Visual Theme & Atmosphere
- **Concepto**: Seda Nude, Cuarzo Rosé & Luminosidad Champagne.
- **Atmósfera**: Lujo contemporáneo, spa médico sereno, relajación sensorial y rejuvenecimiento natural. Transmite bienestar, sutileza estética, tecnología médica no invasiva (ANMAT) y elegancia atemporal.
- **Micro-Metáfora Visual**: Destellos de luz cálida aperlada y partículas doradas fluidas en canvas diurno sobre fondo marfil/nude satinado.

## 2. Color Palette & Roles (Silk Nude & Champagne Gold)
- **Fondo Base (Seda Marfil)**: `#fffaf7` / `#ffffff`
- **Fondo Secundario (Nude Satinado)**: `#fdf4ee` / `#fef6f0`
- **Superficie de Cristal (Silk Card)**: `rgba(255, 255, 255, 0.92)` con `backdrop-filter: blur(18px)`
- **Acento Primario (Terracota Rosé / Velvet Rose)**: `#be185d` / `#9f1239` (Elegancia cosmopolita)
- **Acento Secundario (Oro Champagne / Warm Gold)**: `#d97706` / `#b45309`
- **Acento de Piel Radiante (Glow Peach)**: `#fde68a`
- **Bordes & Separadores**: `#f3e8e2` y bordes activos en `#fbcfe8`
- **Texto Principal (Deep Espresso Charcoal)**: `#1c1917` (Contraste AAA)
- **Texto Secundario**: `#44403c`
- **Texto Muted**: `#78716c`

## 3. Typography Rules
- **Display / Títulos (H1, H2, H3)**: `Playfair Display`, serif editorial (Weights: 600, 700) combinado con `Plus Jakarta Sans` para subtítulos.
- **Cuerpo, Tratamientos & Precios**: `Inter`, sans-serif (Weights: 400, 500, 600)
- **Regla Estricta**: Máximo 2 familias tipográficas en todo el proyecto.
- **Escala Anti-Gigantismo H1**: `font-size: clamp(2.1rem, 3.8vw, 3.2rem); line-height: 1.15; letter-spacing: -0.02em;`

## 4. Component Stylings
- **Navbar Flotante**: Barra blanca satinada con badge `✨ Diagnóstico Facial Sin Cargo` y botón de turno express.
- **Simulador Interactivo de Depilación Láser & Packs Corporales**: Selector de zonas anatómicas (Rostro, Axilas, Cavado completo, Piernas, Abdomen) con cálculo en vivo de descuento por pack de 6 sesiones y botón directo a WhatsApp.
- **Slider Interactivo Glow Facial (Antes / Después)**: Comparador táctil y con cursor para visualizar la hidratación y textura de la piel post-tratamiento de Hidrafacial & Peeling.
- **Bento Grid de Tratamientos Médicos No Invasivos**:
  - Depilación Definitiva Trionda (Soprano / Diodo indolora).
  - HIFU 7D Lifting Facial sin cirugía.
  - Criolipólisis Plana & VelaShape Corporal.
  - Toxina Botulínica & Ácido Hialurónico (rejuvenecimiento natural).
  - Drenaje Linfático Manual & Masajes Spa.
- **Staff de Médicas Dermatólogas & Cosmiatras**: Cartilla profesional con matrículas y turnos online.

## 5. Layout Principles
- Contenedor máximo: `1280px` centrado con padding fluido `clamp(1rem, 4vw, 2.5rem)`.
- Espaciado vertical armónico: Secciones separadas por `clamp(4rem, 8vw, 7rem)`.
- Estética editorial de revista Vogue / Architectural Digest con amplios espacios en blanco y tipografía refinada.

## 6. Depth & Elevation
- Elevación tonal: Fondo marfil `#fffaf7` → Paneles nude `#fdf4ee` → Tarjetas elevadas con sombra difusa `0 12px 35px -4px rgba(190, 24, 93, 0.07)`.

## 7. Do's and Don'ts (Anti-AI Slop)
- ✅ **DO**: Usar paletas cálidas nude, champagne y rosé que evoquen relajación y belleza natural.
- ✅ **DO**: Mantener los botones de WhatsApp con el texto exacto `WhatsApp` (cero abreviaturas "WA").
- ✅ **DO**: Lector dinámico de parámetros URL (`?n=Nombre&t=Telefono&d=Direccion`) para que sirva como demo universal.
- ❌ **DON'T**: Cero fondos oscuros/gamer o colores estridentes no estéticos.
- ❌ **DON'T**: Cero imágenes con retoques exagerados o irreales.

## 8. Responsive Behavior
- Breakpoints fluidos: Mobile (`< 768px`), Tablet (`768px - 1024px`), Desktop (`> 1024px`).
- En mobile: El cotizador de zonas corporales se adapta en tabs horizontales deslizables y el botón de WhatsApp queda fijo para agendar en 1 tap.

## 9. Conversion & WhatsApp Outreach Strategy
- **Lead / Comercio**: Demo universal adaptable (`AURA · Centro de Estética & Medicina Spa`).
- **Objetivo**: Máxima conversión para dueñas de centros de estética y dermatólogas al mostrarles un cotizador de packs de depilación y tratamientos faciales con reserva inmediata a su WhatsApp.
