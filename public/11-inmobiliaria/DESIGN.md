# DESIGN.md — Sistema de Diseño Canónico: Inmobiliaria, Bienes Raíces & Desarrollos de Categoría

## 1. Visual Theme & Atmosphere
- **Concepto**: Arquitectura Contemporánea, Bienes Raíces de Alta Gama & Confianza Martillera.
- **Atmósfera**: Espacios luminosos con ventanales de piso a techo, vistas al mar, diseño de interiores minimalista, materiales nobles (mármol, madera y hormigón visto) y seriedad profesional.
- **Hero Archetype (Buscador Inmobiliario Panorámico Integrado)**:
  - Portada a pantalla completa con fotografía arquitectónica de categoría.
  - Dock de búsqueda rápida de inmuebles integrado: `[Operación: Venta / Alquiler / Pozo] [Tipo: Departamento / Casa / Semipiso] [Zona: Playa Grande / Güemes / Varese / Rumencó] [Buscar]`.

## 2. Color Palette & Roles (Obsidian Slate, Champagne Gold & Architectural White)
- **Fondo Base (Blanco Arquitectónico)**: `#ffffff` / `#f8fafc`
- **Fondo Secundario (Piedra Caliza Suave)**: `#f1f5f9` / `#e2e8f0`
- **Superficie de Tarjeta**: `#ffffff` con borde fino y sombra de elevación
- **Acento Primario (Champagne Gold / Ámbar Noble)**: `#d97706` / `#b45309` (Distinción, valor inmobiliario)
- **Acento Secundario (Azul Marino Costero)**: `#0284c7` (Para propiedades con vista al mar)
- **Texto Principal (Obsidiana Slate)**: `#0f172a` (Contraste AAA)
- **Texto Secundario**: `#334155`
- **Texto Muted**: `#64748b`

## 3. Typography Rules
- **Display / Títulos**: `Cinzel`, serif clásica arquitectónica (Weights: 600, 700, 800)
- **Cuerpo, Fichas Técnicas & Valores**: `Plus Jakarta Sans` e `Inter` (Weights: 500, 600, 700)
- **Escala Anti-Gigantismo H1**: `font-size: clamp(2.2rem, 4.2vw, 3.6rem); line-height: 1.12; letter-spacing: 0.02em;`

## 4. Component Stylings & Interaction Model (Real Estate Engine)
- **Buscador & Filtros en Vivo**:
  - Filtros por Operación (*Todas, En Venta, Alquiler 36 Meses, Emprendimientos en Pozo*).
  - Filtros por Zona (*Playa Grande, Varese, Stella Maris, Barrios Privados*).
- **Tarjetas de Propiedades con Ficha Técnica Completa**:
  - Metros cuadrados totales y cubiertos ($m^2$).
  - Dormitorios en suite, baños, cocheras cubiertas y bauleras.
  - Badges de amenities (*Piscina Climatizada, Seguridad 24hs, SUM, Vista Panorámica al Mar*).
  - Valores transparentes en USD / ARS.
- **Agendador de Visita Presencial a la Propiedad**:
  - Selector de fecha, horario y propiedad de interés para coordinar recorrido con el martillero por WhatsApp.
- **Herramienta de Solicitud de Tasación Online**:
  - Formulario ágil para ingresar dirección, metros aproximados y recibir un informe de tasación de mercado.

## 5. Scroll & Motion Architecture
- Scroll ultra suave de 60fps con **Lenis + GSAP ScrollTrigger**.
- Revelado progresivo de las propiedades al navegar.
