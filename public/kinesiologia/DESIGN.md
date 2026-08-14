# DESIGN.md — Sistema de Diseño Canónico: Kinesiología, Fisioterapia & Rehabilitación Deportiva

## 1. Visual Theme & Atmosphere
- **Concepto**: Biomecánica Kinética, Movimiento Activo & Recuperación Funcional.
- **Atmósfera**: Dinamismo atlético de alta energía, rigor fisioterapéutico, luminosidad de gimnasio de rehabilitación y optimismo funcional. Enfoque en volver a entrenar y vivir sin dolor (cero sensación de clínica estática o pasiva).
- **Micro-Metáfora Visual**: Vectores de fuerza, rangos articulares y grilla biomecánica limpia sobre fondo blanco y gris técnico.

## 2. Color Palette & Roles (Kinetic Athletic & Clean Slate)
- **Fondo Base (Blanco Puro)**: `#ffffff`
- **Fondo Secundario (Gris Técnico / Ice Slate)**: `#f8fafc` / `#f1f5f9`
- **Superficie de Tarjeta (Kinetic Card)**: `#ffffff` con bordes nítidos y sombras de elevación dinámica
- **Acento Primario (Naranja Kinético / Energy Ember)**: `#ea580c` / `#c2410c` (Fuerza, vitalidad, activación)
- **Acento Secundario (Azul Performance / Athlete Blue)**: `#0284c7` / `#0369a1` (Rigor médico, precisión biomecánica)
- **Acento de Recuperación (Verde Funcional)**: `#16a34a` (Para altas médicas y fases superadas)
- **Bordes & Separadores**: `#e2e8f0` y bordes activos en `#fed7aa`
- **Texto Principal (Deep Charcoal Slate)**: `#0f172a` (Contraste AAA)
- **Texto Secundario**: `#334155`
- **Texto Muted**: `#64748b`

## 3. Typography Rules
- **Display / Títulos & Datos Técnicos**: `Space Grotesk` o `Plus Jakarta Sans`, sans-serif (Weights: 600, 700, 800)
- **Cuerpo, Protocolos & Fichas**: `Inter`, sans-serif (Weights: 400, 500, 600)
- **Regla Estricta**: Máximo 2 familias tipográficas en todo el proyecto.
- **Escala Anti-Gigantismo H1**: `font-size: clamp(2.1rem, 3.8vw, 3.2rem); line-height: 1.15; letter-spacing: -0.025em;`

## 4. Component Stylings (Totalmente adaptados al nicho)
- **Navbar Flotante Kinética**: Barra blanca técnica con badge `🟢 Consultorios y Gimnasio de Rehabilitación Abiertos` y botón de turno express.
- **Mapa Anatómico / Selector Interactivo de Lesiones (Interactive Joint & Injury Navigator)**: Componente donde el paciente hace click en la zona de su molestia (Columna Lumbar, Cervicalgias, Hombro / Manguito Rotador, Rodilla / Ligamentos, Tobillo / Esguince, RPG Postural) y el sistema despliega el protocolo clínico, aparatología recomendada y tiempo promedio de recuperación.
- **Timeline de Recuperación Funcional (Rehabilitation Stepper)**: 3 fases interactivas (Fase 1: Alivio del Dolor Agudo → Fase 2: Terapia Manual & RPG → Fase 3: Readaptación Deportiva y Fuerza en Gimnasio).
- **Showcase de Aparatología Fisioterapéutica**: Ondas de Choque Radiales, Magnetoterapia de Alta Intensidad (SIS), Tecarterapia y Presoterapia Deportiva.
- **Formulario Kinético con WhatsApp Directo**: Paciente especifica si cuenta con derivación de traumatólogo, zona de dolor y turno de preferencia.

## 5. Layout Principles
- Contenedor máximo: `1280px` centrado con padding fluido `clamp(1rem, 4vw, 2.5rem)`.
- Disposición atlética y angular con micro-espaciado dinámico.
- Enfoque directo: orientar rápidamente al paciente con dolor a la solución biomecánica concreta.

## 6. Depth & Elevation
- Elevación tonal: Fondo blanco `#ffffff` → Paneles técnicos `#f8fafc` → Tarjetas elevadas con sombra `0 10px 30px -4px rgba(234, 88, 12, 0.08)`.

## 7. Do's and Don'ts (Anti-AI Slop)
- ✅ **DO**: Hablar en términos kinefisiátricos reales (Terapia Manual, Rango Articular, Ejercicio Excéntrico, Readaptación Deportiva, R.P.G., Facturación para Obras Sociales y Reintegros).
- ✅ **DO**: Mantener los botones de WhatsApp con el texto exacto `WhatsApp` (cero abreviaturas "WA").
- ✅ **DO**: Lector dinámico de parámetros URL (`?n=Nombre&t=Telefono&d=Direccion`) para que sirva como demo universal.
- ❌ **DON'T**: Cero temas oscuros/gamer o conceptos pasivos de clínica de reposo.
- ❌ **DON'T**: Cero repetición de visores antes/después o sliders que no aplican a kinesiología.

## 8. Responsive Behavior
- Breakpoints fluidos: Mobile (`< 768px`), Tablet (`768px - 1024px`), Desktop (`> 1024px`).
- En mobile: El selector de articulaciones se presenta en pestañas interactivas de fácil toque con pulgar (`min-height: 48px`).

## 9. Conversion & WhatsApp Outreach Strategy
- **Lead / Comercio**: Demo universal adaptable (`KINEXIS · Centro de Kinesiología & Rehabilitación Deportiva`).
- **Objetivo**: Convencer a kinesiólogos y traumatólogos mostrándoles una plataforma que califica automáticamente las lesiones de los pacientes entrantes por WhatsApp.
