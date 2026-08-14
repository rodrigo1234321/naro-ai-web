# DESIGN.md — Sistema de Diseño Canónico: Clínica & Consultorios Médicos

## 1. Visual Theme & Atmosphere
- **Concepto**: Pulcritud Quirúrgica, Luz Médica Pura & Wellness Clínico.
- **Atmósfera**: Blancos inmaculados, frescura higiénica, luminosidad hospitalaria de alta gama y calidez humana. Transmite serenidad, higiene absoluta y máxima confianza profesional (cero estética oscura/gamer).
- **Micro-Metáfora Visual**: Red celular bioluminiscente diurna en canvas suave sobre fondo blanco/hielo, luz médica ambiental y superficies de cristal blanco esmerilado.

## 2. Color Palette & Roles (Luminous Medical Clean)
- **Fondo Base (Blanco Puro)**: `#ffffff`
- **Fondo Secundario (Ice Blue / Slate Clínico Suave)**: `#f8fafc` / `#f1f5f9`
- **Superficie de Cristal (Bio-Card Frost White)**: `rgba(255, 255, 255, 0.88)` con `backdrop-filter: blur(16px)`
- **Acento Primario (Azul Médico Clínico)**: `#0284c7` (Sky Clinical Blue)
- **Acento Secundario (Cyan Sanitario)**: `#0ea5e9`
- **Acento de Salud (Verde Esmeralda Preventivo)**: `#059669`
- **Bordes & Separadores**: `rgba(226, 232, 240, 0.85)` y bordes activos en `#0ea5e9`
- **Texto Principal (Deep Navy Slate)**: `#0f172a` (Contraste AAA garantizado)
- **Texto Secundario**: `#475569`
- **Texto Muted**: `#64748b`

## 3. Typography Rules
- **Display / Títulos (H1, H2, H3)**: `Plus Jakarta Sans`, sans-serif (Weights: 600, 700, 800)
- **Cuerpo, Datos Médicos & Fichas**: `Inter`, sans-serif (Weights: 400, 500, 600)
- **Regla Estricta**: Máximo 2 familias tipográficas en todo el proyecto.
- **Escala Anti-Gigantismo H1**: `font-size: clamp(2.1rem, 3.6vw, 3.2rem); line-height: 1.15; letter-spacing: -0.025em;`

## 4. Component Stylings
- **Navbar Flotante**: Barra de cristal blanco esmerilado (`rgba(255, 255, 255, 0.85)`) con sombra suave y píldora de estado `🟢 Guardia y Consultorios Activos`.
- **Bento Grid Clínico**: Tarjetas blancas translúcidas para Especialidades Médicas (Cardiología, Pediatría, Traumatología, Ecografías 4D, Laboratorio y Telemedicina) con hover suave y elevación sutil.
- **Cotizador / Selector de Turnos Express**: Panel centralizado en blanco nieve con selectores claros, aranceles en pesos y generación directa de mensaje a WhatsApp.
- **Cartelera Médica (Staff)**: Tarjetas limpias con fotografía real de especialistas, número de matrícula profesional (MN / MP) y días de atención.

## 5. Layout Principles
- Contenedor máximo: `1280px` centrado con padding fluido `clamp(1rem, 4vw, 2.5rem)`.
- Espaciado vertical armónico: Secciones separadas por `clamp(4rem, 8vw, 7rem)`.
- Disposición en Z y F para lectura escaneable orientada al paciente que busca atención inmediata.

## 6. Depth & Elevation
- Elevación tonal: Fondo blanco `#ffffff` → Paneles ice `#f8fafc` con sombras suaves de difusión clínica `box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.06)` → Botones con brillo azul/verde sutil.

## 7. Do's and Don'ts (Anti-AI Slop)
- ✅ **DO**: Usar fondos luminosos y blancos puros que reflejen higiene médica real.
- ✅ **DO**: Mantener los botones de WhatsApp con el texto exacto `WhatsApp` (cero abreviaturas "WA").
- ❌ **DON'T**: Cero temas oscuros tipo gaming/cripto en rubros de salud y medicina.
- ❌ **DON'T**: Cero titulares desmedidos de 5rem que desbordan en móviles.
- ❌ **DON'T**: Cero tarjetas sin contraste o placeholders grises.

## 8. Responsive Behavior
- Breakpoints fluidos: Mobile (`< 768px`), Tablet (`768px - 1024px`), Desktop (`> 1024px`).
- En mobile: CTA inferior fijo de alta visibilidad para llamar a guardia o pedir turno por WhatsApp en 1 tap.

## 9. Conversion & WhatsApp Outreach Strategy
- **Lead / Comercio**: Clínica Luro (Av. Pedro Luro 4636, Mar del Plata).
- **Objetivo**: Máxima tasa de respuesta en frío al enviar la demo en vivo. El director médico ve su dirección exacta, su WhatsApp real funcionando, fotos profesionales y un sistema de cotización/reserva ya terminado en un entorno 100% médico y pulcro.
