# DESIGN.md — Sistema de Diseño Canónico: Bar de Especialidad, Coctelería de Autor & Speakeasy

## 1. Visual Theme & Atmosphere
- **Concepto**: Bar Oculto de Especialidad, Terciopelo Violeta, Luces Tenues de Velas & Mixología Botánica.
- **Atmósfera**: Sofisticación nocturna íntima, copas de cristal tallado con hielo cristalino, maceraciones botánicas en frascos de botica, jazz suave y cócteles de autor ahumados.
- **Hero Archetype (Atmospheric Violet Speakeasy Hero)**:
  - Portada a pantalla completa con fondo cinematográfico de la barra iluminada con neón violeta y luz tenue.
  - Tipografía refinada `Playfair Display` combinada con `Plus Jakarta Sans`.
  - Badge de neón ultravioleta con la sesión de música / DJ de la noche y selector de reserva directa.

## 2. Color Palette & Roles (Midnight Velvet, Ultraviolet Neon & Warm Candle Gold)
- **Fondo Base (Medianoche Velvet Violet)**: `#0b0914` / `#130f24`
- **Fondo Secundario (Índigo Profundo)**: `#1c1536` / `#281e4d`
- **Superficie de Tarjeta**: `rgba(28, 21, 54, 0.85)` con bordes de cristal ultravioleta
- **Acento Primario (Neón Violeta & Lavanda)**: `#7c3aed` / `#a855f7` / `#c084fc` (Elegancia nocturna, misterio)
- **Acento Secundario (Oro Vela & Hielo Ámbar)**: `#f59e0b` / `#fbbf24` (Calidez de barra, destilados)
- **Bordes & Separadores**: `rgba(168, 85, 247, 0.22)`
- **Texto Principal (Blanco Seda)**: `#f8fafc`
- **Texto Secundario**: `#cbd5e1`
- **Texto Muted**: `#94a3b8`

## 3. Typography Rules
- **Display / Títulos**: `Playfair Display`, serif elegante y editorial (Weights: 600, 700, Italic)
- **Cuerpo, Perfiles de Sabor & Precios**: `Plus Jakarta Sans` e `Inter` (Weights: 500, 600, 700)

## 4. Micro-Interacciones & Componentes Exclusivos de Bar de Especialidad
- **Canvas de Bokeh Violeta & Dorado**: Luces desenfocadas de barra y velas que flotan suavemente en el fondo oscuro.
- **Carta de Coctelería de Autor con Perfiles de Sabor**:
  - Filtros: *Cócteles de Autor, Clásicos Reversionados, Vinos Seleccionados, Mocktails (Sin Alcohol)*.
  - Cada trago incluye barras animadas de **Amargor, Dulzura, Complejidad y Graduación Alcohólica**.
- **Reserva de Espacios Exclusivos**:
  - *La Barra de Mixología* (En primera fila con el Bartender).
  - *Living Chesterfield Privado* (Para parejas o charlas íntimas).
  - *Terraza Calefaccionada con Música Ambient*.
- **Tapas de Maridaje & Charcutería Fina**: Tablas de quesos madurados, frutos secos tostados, bruschettas artesanales y tartar de salmón.

## 5. Scroll & Layout Architecture
- Scroll ultra suave con Lenis de 60fps sincronizado con GSAP ScrollTrigger.
