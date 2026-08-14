# DESIGN.md — Sistema de Diseño Canónico: Rotisería Tradicional, Minutas & Delivery Rápido (Awwwards-Level Motion)

## 1. Visual Theme & Atmosphere
- **Concepto**: El Bodegón y Rotisería de Barrio, Horno al Rojo & Comida Casera Abundante.
- **Atmósfera**: Nostalgia cálida rioplatense, porciones generosas que desbordan el plato, spiedo dorado girando a fuego lento y masa crujiente. Sensación de comida rica de domingo al mediodía con delivery veloz.
- **Motion Architecture (World-Class Motion)**:
  - **Lenis 60fps Smooth Scroll**: Sincronizado en un único ticker con GSAP.
  - **Magnetic Cursor & Halo Interactivo**: Cursor dinámico con atracción elástica en botones y enlaces.
  - **Sección Horizontal Scrollytelling Pinned**: Pinned ScrollTrigger donde al bajar la rueda del mouse, la vitrina de "Los Clásicos Porteños" se desplaza horizontalmente con efecto parallax cinematográfico.
  - **3D Card Perspective Tilt**: Inclinación tridimensional suave de las tarjetas de comida siguiendo la posición del mouse.
  - **Animación Fly-to-Cart**: Microinteracción donde al agregar un plato, vuela una partícula elástica hacia el carrito flotante.

## 2. Color Palette & Roles (Spiedo Amber, Bodegón Red & Warm Crust)
- **Fondo Base (Blanco Cálido & Crema Manteca)**: `#fffdfa` / `#fef8ee`
- **Fondo Secundario (Trigo Tostado)**: `#fdf2d9` / `#fbf0d0`
- **Superficie de Tarjeta (Bodegón Card)**: `#ffffff` con sutil borde dorado
- **Acento Primario (Rojo Pimiento & Salsa Filetto)**: `#b91c1c` / `#dc2626` (Apetito voraz, tradición)
- **Acento Secundario (Dorado Spiedo & Yema Babé)**: `#f59e0b` / `#d97706` (Crocancia, calor de horno)
- **Acento Fresco (Verde Provenzal)**: `#15803d`
- **Bordes & Separadores**: `#eedcc3` y bordes activos en `#fde68a`
- **Texto Principal (Carbón Bodegón)**: `#1c1917` (Contraste AAA)
- **Texto Secundario**: `#44403c`
- **Texto Muted**: `#78716c`

## 3. Typography Rules
- **Display / Títulos**: `Plus Jakarta Sans` en peso ExtraBold (800) combinado con `Playfair Display` en itálicas para toques clásicos de bodegón.
- **Cuerpo, Precios & Tiempos de Cocción**: `Inter`, sans-serif (Weights: 500, 600, 700)
- **Regla Estricta**: Máximo 2 familias tipográficas en todo el proyecto.
- **Escala Anti-Gigantismo H1**: `font-size: clamp(2.1rem, 3.8vw, 3.3rem); line-height: 1.15; letter-spacing: -0.02em;`

## 4. Component Stylings & Interaction Model (Real Rotisería Delivery)
- **Menú del Día / Promos al Mediodía**: Combos con descuento especial (ej: 1 Pollo entero + Papas provenzal + 6 empanadas).
- **Catálogo de Minutas & Comidas Caseras**:
  - *🍗 Pollos al Spiedo Dorados con Papas*
  - *🥩 Milanesas Napolitanas Gigantes para Compartir*
  - *🥟 Empanadas Criollas de Carne Cortada a Cuchillo*
  - *🍳 Tortillas de Papas Babé con Cebolla y Chorizo Colorado*
  - *🥧 Tartas Caseras & Pasteles de Papa*
- **Carrito Drawer Interactivo con Fly-to-Cart**:
  - Selector de modalidad: *🛵 Envío a Domicilio* (con campo de calle y altura) o *🏪 Retiro por Mostrador en 20 min*.
  - Cálculo automático de total y derivación de comanda completa y formateada por WhatsApp.
- **Estado de Cocina en Vivo**: Badge animado `🔥 Horno y Spiedo al Rojo · Demora estimada: 25 a 35 min`.

## 5. Layout Principles
- Impacto visual y apetito en primer plano con micro-animaciones fluidas de 60fps.
- Cero plantillas médicas ni repetición de componentes ajenos al rubro.

## 6. Do's and Don'ts
- ✅ **DO**: Copywriting auténtico de rotisería argentina (Papas rústicas, Muzzarella fundida, Porción abundante).
- ✅ **DO**: GSAP ScrollTrigger + Lenis + Efecto 3D Tilt + Cursor Magnético.
- ✅ **DO**: Lector de parámetros URL (`?n=Nombre&t=Telefono&d=Direccion`).
- ❌ **DON'T**: Cero botones de café gourmet o delivery de ensalada zen.
