# DESIGN.md — Sistema de Diseño Canónico: Odontología & Estética Dental

## 1. Visual Theme & Atmosphere
- **Concepto**: Esmalte Puro, Menta Fresca & Estética Dental Digital.
- **Atmósfera**: Blancos brillantes inmaculados, frescura mentolada, luminosidad de alta gama y calidez humana. Transmite alivio del dolor, perfección estética, tecnología digital sin molestias (escaneo 3D) y confianza inquebrantable.
- **Micro-Metáfora Visual**: Destellos de brillo de esmalte y partículas sutiles de frescura en canvas diurno sobre blanco perlado.

## 2. Color Palette & Roles (Pristine Enamel & Mint)
- **Fondo Base (Blanco Puro)**: `#ffffff`
- **Fondo Secundario (Ice Mint / Slate Suave)**: `#f0fdfa` / `#f8fafc`
- **Superficie de Cristal (Enamel Card)**: `rgba(255, 255, 255, 0.94)` con `backdrop-filter: blur(16px)`
- **Acento Primario (Menta Dental Profesional)**: `#0d9488` / `#14b8a6` (Teal / Mint)
- **Acento Secundario (Azul Zafiro Clínico)**: `#2563eb` / `#0284c7`
- **Acento de Sonrisa Brillante (Gold Glow)**: `#f59e0b` (para valoraciones y estrellas)
- **Bordes & Separadores**: `#e2e8f0` y bordes activos en `#99f6e4`
- **Texto Principal (Deep Charcoal Slate)**: `#0f172a` (Contraste AAA)
- **Texto Secundario**: `#334155`
- **Texto Muted**: `#64748b`

## 3. Typography Rules
- **Display / Títulos (H1, H2, H3)**: `Plus Jakarta Sans`, sans-serif (Weights: 600, 700, 800)
- **Cuerpo, Fichas de Tratamiento & Precios**: `Inter`, sans-serif (Weights: 400, 500, 600)
- **Regla Estricta**: Máximo 2 familias tipográficas en todo el proyecto.
- **Escala Anti-Gigantismo H1**: `font-size: clamp(2.1rem, 3.8vw, 3.2rem); line-height: 1.15; letter-spacing: -0.025em;`

## 4. Component Stylings
- **Navbar Flotante**: Barra blanca de cristal esmerilado con selector de urgencias odontológicas `🟢 Urgencias Dentales Activas` y botón de turno express.
- **Slider Interactivo Antes / Después (Smile Transformer)**: Componente interactivo arrastrable con cursor o touch para comparar casos reales de blanqueamiento, carillas de porcelana y alineación invisible.
- **Calculador / Cotizador de Presupuesto Dental en Vivo**: Selector interactivo de tratamientos (Implantes de titanio, Ortodoncia invisible, Carillas E-Max, Blanqueamiento láser, Limpieza ultrasónica) y opciones de financiación en cuotas o reintegro por prepaga, con generación inmediata de mensaje estructurado a WhatsApp.
- **Bento Grid de Tecnología Odontológica**: Escáner 3D intraoral (sin moldes de pasta), Diseño Digital de Sonrisa (DSD), Anestesia computarizada indolora y Laboratorio CAD/CAM.
- **Cartelera de Odontólogos Especialistas**: Staff con matrícula nacional/provincial, especialidad clínica y reserva directa.

## 5. Layout Principles
- Contenedor máximo: `1280px` centrado con padding fluido `clamp(1rem, 4vw, 2.5rem)`.
- Espaciado vertical armónico: Secciones separadas por `clamp(4rem, 8vw, 7rem)`.
- Enfoque centrado en la empatía: derribar el miedo al dentista con mensajes de confort, tecnología sin dolor y transparencia de aranceles.

## 6. Depth & Elevation
- Elevación tonal: Fondo blanco `#ffffff` → Paneles mint suave `#f0fdfa` → Tarjetas elevadas con sombra difusa `0 12px 35px -4px rgba(13, 148, 136, 0.08)`.

## 7. Do's and Don'ts (Anti-AI Slop)
- ✅ **DO**: Usar fondos blancos puros y menta fresca que representen la higiene y frescura de una clínica dental real.
- ✅ **DO**: Mantener los botones de WhatsApp con el texto exacto `WhatsApp` (cero abreviaturas "WA").
- ✅ **DO**: Lector dinámico de parámetros URL (`?n=Nombre&t=Telefono&d=Direccion`) para que sirva como demo universal.
- ❌ **DON'T**: Cero temas oscuros o estética tétrica de consultorio antiguo.
- ❌ **DON'T**: Cero imágenes de archivo genéricas con marcas de agua o dientes irreales.

## 8. Responsive Behavior
- Breakpoints fluidos: Mobile (`< 768px`), Tablet (`768px - 1024px`), Desktop (`> 1024px`).
- En mobile: El slider antes/después responde perfectamente al tacto (`touchmove`), y el CTA de urgencias odontológicas queda fijo para respuesta inmediata.

## 9. Conversion & WhatsApp Outreach Strategy
- **Lead / Comercio**: Demo universal adaptable (`DENTAL STUDIO · Clínica Odontológica Integral`).
- **Objetivo**: Máxima tasa de respuesta al mostrar a odontólogos cómo su clínica puede captar pacientes de alto valor (implantes, ortodoncia invisible y estética) con una web ultra-profesional y cotizador automatizado.
