# DESIGN.md — Sistema de Diseño Canónico: Viandas Saludables, Meal Prep & Nutrición Activa

## 1. Visual Theme & Atmosphere
- **Concepto**: Nutrición Vital, Frescura Orgánica & Movimiento Saludable.
- **Atmósfera**: Energía matutina, platos coloridos de alto valor nutricional, ingredientes 100% naturales libres de conservantes y practicidad total para personas ocupadas y deportistas.
- **Motion Architecture**: Scroll cinematográfico de 60fps con **Lenis + GSAP ScrollTrigger**, paralaje en capas de ingredientes frescos, revelado secuencial de viandas y micro-interacciones elásticas en tarjetas de macros.

## 2. Color Palette & Roles (Lime Avocado, Citrus Amber & Pure Crisp White)
- **Fondo Base (Blanco Puro Saludable)**: `#ffffff` / `#f8fafc`
- **Fondo Secundario (Verde Matcha Suave / Crisp Herb)**: `#f0fdf4` / `#dcfce7`
- **Superficie de Tarjeta**: `#ffffff` con sutil borde verde botánico y sombra de elevación
- **Acento Primario (Verde Lima Nutricional)**: `#16a34a` / `#15803d` (Salud, frescura, vida)
- **Acento Secundario (Naranja Cítrico & Zanahoria)**: `#ea580c` / `#f97316` (Energía, apetito, macros)
- **Acento Proteico (Azul Vital)**: `#0284c7` (Para badges de High Protein)
- **Bordes & Separadores**: `#e2e8f0` y acentos activos en `#bbf7d0`
- **Texto Principal (Deep Slate Charcoal)**: `#0f172a` (Contraste AAA)
- **Texto Secundario**: `#334155`
- **Texto Muted**: `#64748b`

## 3. Typography Rules
- **Display / Títulos**: `Plus Jakarta Sans`, sans-serif (Weights: 700, 800)
- **Cuerpo, Macros & Valores Nutricionales**: `Inter`, sans-serif (Weights: 400, 500, 600, 700)
- **Regla Estricta**: Máximo 2 familias tipográficas en todo el proyecto.
- **Escala Anti-Gigantismo H1**: `font-size: clamp(2.1rem, 3.8vw, 3.2rem); line-height: 1.15; letter-spacing: -0.025em;`

## 4. Component Stylings & Interaction Model (Real-World Meal Prep)
- **Lenis Smooth Scroll + GSAP ScrollTrigger Integration**: Desplazamiento ultra suave y revelado progresivo de platos y macros al hacer scroll.
- **Planificador Semanal de Packs (5, 10 o 14 Viandas)**:
  - Selector de tamaño de pack con descuento automático en ARS.
  - Selección de viandas en 1 tap con actualización en vivo de **Calorías Totales** y **Gramos de Proteína Promedio**.
- **Filtros Nutricionales Inteligentes**:
  - *Déficit Calórico / Fit (350-450 kcal)*
  - *High Protein (45g+ proteína)*
  - *Keto / Low Carb*
  - *100% Vegano / Plant Based*
  - *Sin TACC / Celíacos*
- **Tarjetas de Viandas con Macros Desglosados**: Fotografía apetecible cenital + Kcal, Proteínas, Carbohidratos y Grasas.
- **Logística & Delivery Programado**: Días de entrega refrigerada (Domingos y Miércoles), método de regeneración (microondas 3 min o freezer 90 días).

## 5. Layout Principles
- Layout dinámico y limpio con tarjetas de alto impacto visual.
- Cero elementos repetidos de clínicas o cafeterías.

## 6. Depth & Elevation
- Fondo blanco y verde menta `#f0fdf4` → Tarjetas elevadas con sombra verde translúcida `0 12px 30px rgba(22, 163, 74, 0.08)`.

## 7. Do's and Don'ts
- ✅ **DO**: Hablar de macros reales (kcal, g de proteína, cocción al vapor, envasado al vacío).
- ✅ **DO**: Lenis + GSAP ScrollTrigger sincronizados en un solo loop sin tirones.
- ✅ **DO**: Lector de parámetros URL (`?n=Nombre&t=Telefono&d=Direccion`).
- ❌ **DON'T**: Cero botones absurdos de café o delivery suelto de 1 empanada.

## 8. Responsive Behavior
- Mobile First: El planificador de pack se desliza suavemente y permite elegir los 5 a 14 platos con el pulgar.
