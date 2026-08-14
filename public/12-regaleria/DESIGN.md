# DESIGN.md — Sistema de Diseño Canónico: Regalería de Autor, Deco Hogar & Bazar Boutique

## 1. Visual Theme & Atmosphere
- **Concepto**: Hogar Calmo, Objetos con Alma, Cerámica Torneada a Mano & Aromas Botánicos.
- **Atmósfera**: Luz natural de tarde, textura de lino crudo, calidez de madera clara, cerámica artesanal con acabado mate y fragancias envolventes de higo, vainilla y azahar.
- **Hero Archetype (Atmospheric Warm Ceramic & Gift Showcase)**:
  - Portada a pantalla completa con composición estética de velas de soja encendidas, tazas de gres y flores secas.
  - Tipografía `Cormorant Garamond` en itálicas refinadas y `Outfit` sans-serif.
  - Badge artesanal *"OBJETOS CON HISTORIA"* y acceso directo al armador de Gift Boxes.

## 2. Color Palette & Roles (Warm Terracotta, Sage Green & Linen Cream)
- **Fondo Base (Crema Lino Nórdico)**: `#fdfbf7` / `#f7f3ed`
- **Fondo Secundario (Arena Suave)**: `#ede8df` / `#e2ded4`
- **Superficie de Tarjeta**: `#ffffff` con borde delicado y sombra cálida
- **Acento Primario (Terracota Artesanal)**: `#c2785c` / `#a0593e` (Tierra cocida, calidez, alfarería)
- **Acento Secundario (Verde Salvia Botánico)**: `#588157` / `#3a5a40` (Frescura natural, aromas)
- **Acento Dorado (Cera de Soja & Lino)**: `#d4a373`
- **Bordes & Separadores**: `#e8e2d8`
- **Texto Principal (Carbón Suave)**: `#2b2621` (Contraste AAA cálido)
- **Texto Secundario**: `#544e47`
- **Texto Muted**: `#877e74`

## 3. Typography Rules
- **Display / Títulos**: `Cormorant Garamond`, serif clásica de impronta editorial y artesanal (Weights: 600, 700, Italic)
- **Cuerpo, Filtros & Precios**: `Outfit` y `Inter` (Weights: 500, 600, 700)
- **Escala Anti-Gigantismo H1**: `font-size: clamp(2.2rem, 4.4vw, 3.6rem); line-height: 1.12; letter-spacing: -0.01em;`

## 4. Component Stylings & Interaction Model (Real Gift Shop & Deco)
- **Armador Interactivo de Gift Box ("Armá tu Regalo")**:
  - Selección de tipo de presentación (*Caja Kraft con Cinta de Lino & Lacre* o *Cajón de Madera Pino Artesanal*).
  - Selección de 2 a 4 objetos (Vela de soja, Difusor ambiental, Taza de gres, Manta waffle).
  - Campo para escribir la **dedicatoria de la tarjeta caligrafiada a mano**.
  - Cálculo en tiempo real del total con packaging de regalo incluido.
- **Filtros por Ocasión & Presupuesto**:
  - *Todos los Objetos*, *Regalos hasta $18.000*, *Aromas & Velas*, *Cerámica & Bazar*, *Boxes Listas para Regalar*.
- **Envíos Cuidados & Retiro**:
  - Embalaje acolchado especial con papel seda y viruta de madera para que las cerámicas y difusores lleguen 100% protegidos.

## 5. Scroll & Motion Architecture
- Scroll fluido de 60fps con **Lenis + GSAP ScrollTrigger**.
