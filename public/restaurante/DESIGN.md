# DESIGN.md — Sistema de Diseño Canónico: Restaurante, Parrilla & Alta Gastronomía

## 1. Visual Theme & Atmosphere
- **Concepto**: Fuegos de Quebracho, Roble Oscuro & Cava Subterránea.
- **Atmósfera**: Intimidad a la luz de las velas, calidez de brasas encendidas, elegancia rústico-contemporánea y hospitalidad gourmet. Transmite sofisticación culinaria, respeto por el producto artesanal y una experiencia gastronómica memorable.
- **Micro-Metáfora Visual**: Brasas ardientes con partículas de fuego tenues y humo sutil en canvas diurno sobre fondo carbón y roble envejecido.

## 2. Color Palette & Roles (Ember Amber & Dark Oak)
- **Fondo Base (Carbón Ahumado)**: `#0c0a09` (Warm Charcoal)
- **Fondo Secundario (Roble Oscuro)**: `#1c1917` / `#292524`
- **Superficie de Tarjeta (Tasting Card)**: `rgba(28, 25, 23, 0.85)` con `backdrop-filter: blur(14px)`
- **Acento Primario (Ámbar de Brasas / Flame Gold)**: `#f59e0b` / `#d97706` (Fuego, calidez)
- **Acento Secundario (Vino Tinto Malbec)**: `#881337` / `#9f1239` (Cava y carnes)
- **Bordes & Separadores**: `rgba(245, 158, 11, 0.15)` y líneas doradas finas
- **Texto Principal (Manteca Cálido)**: `#fef3c7` / `#f5f5f4` (Alto contraste y calidez)
- **Texto Secundario (Arena Suave)**: `#a8a29e`
- **Texto Muted**: `#78716c`

## 3. Typography Rules
- **Display / Títulos de Autor**: `Cinzel`, serif clásico de alta gastronomía (Weights: 600, 700) combinado con `Cormorant Garamond` (Italic para descripciones culinarias).
- **Cuerpo, Precios & Carta**: `Plus Jakarta Sans`, sans-serif (Weights: 400, 500, 600)
- **Regla Estricta**: Máximo 2 familias tipográficas en todo el proyecto.
- **Escala Anti-Gigantismo H1**: `font-size: clamp(2.2rem, 4.2vw, 3.6rem); line-height: 1.1; letter-spacing: 0.04em;`

## 4. Component Stylings (Totalmente exclusivo de gastronomía)
- **Navbar Flotante Gastronómica**: Barra minimalista con links a la Carta, Reservas, La Cava, y botón rápido `🍷 Reservar Mesa`.
- **Barra de Reserva Inmediata en el Hero**: Widget horizontal integrado al hero (`[📅 Fecha] [⏰ 21:30 hs] [👥 2 Personas] [🍷 Salón] [Confirmar Mesa]`).
- **Carta Digital Interactiva con Comanda en Vivo**:
  - Filtros por categoría: *Entradas de Campo, Cortes a las Brasas, Pastas Caseras, Pesca del Atlántico, Postres de Autor, Cava de Vinos*.
  - Filtros dietarios: *🥩 Parrilla Premium, 🌱 Veggie, 🌾 100% Sin TACC*.
  - Sumador interactivo de platos con carrito flotante y envío de pedido para Take-Away o comanda de reserva a WhatsApp.
- **Selector de Ambientes para la Reserva**:
  - Salón Principal con vista a los fuegos abiertos.
  - Terraza & Patio de los Olivos Climatizado.
  - Cava Privada para eventos y cenas de maridaje.
- **Marquee Culinario Infinito**: Cinta continua de valores del restaurante (Leña de quebracho, pesca fresca del día, masa madre).

## 5. Layout Principles
- Hero cinemático Full-Bleed con tipografía de portada de revista gastronómica.
- Cero gráficos médicos, cero visores antes/después, cero estadísticas de SaaS.
- Fotografía de platos con encuadre cenital y diagonal sobre vajilla artesanal de cerámica.

## 6. Depth & Elevation
- Elevación tonal: Fondo carbón `#0c0a09` → Superficies de roble `#1c1917` → Tarjetas con borde ámbar sutil y sombras de fuego difusas `box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7)`.

## 7. Do's and Don'ts (Anti-AI Slop)
- ✅ **DO**: Copywriting gastronómico rioplatense auténtico (Ojo de bife, Mollejas crocantes, Provoleta a las brasas, Flan con dulce de leche casero).
- ✅ **DO**: Mantener los botones de WhatsApp con el texto exacto `WhatsApp` (cero abreviaturas "WA").
- ✅ **DO**: Lector dinámico de parámetros URL (`?n=Nombre&t=Telefono&d=Direccion`) para que sirva como demo universal para parrillas, bodegones y bistrós.
- ❌ **DON'T**: Cero plantillas médicas recicladas o cards idénticas a los sitios de salud.

## 8. Responsive Behavior
- Breakpoints fluidos: Mobile (`< 768px`), Tablet (`768px - 1024px`), Desktop (`> 1024px`).
- En mobile: La carta cuenta con navegación lateral suave y la barra de reservas se fija en la parte inferior para reservar en 1 tap.

## 9. Conversion & WhatsApp Outreach Strategy
- **Lead / Comercio**: Demo universal adaptable (`FUEGO & BRASA · Asador Criollo & Cocina de Autor`).
- **Objetivo**: Conquistar dueños de restaurantes y parrillas demostrando que pueden digitalizar su carta, eliminar los PDFs pesados y recibir reservas y pedidos de take-away directos a su WhatsApp de forma impecable.
