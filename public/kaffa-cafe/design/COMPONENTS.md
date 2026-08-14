# COMPONENT ARCHITECTURE — KAFFA CAFÉ DE ESPECIALIDAD

## 1. Navbar (`<nav class="nav">`)
- **Estado HERO / TOP**:
  - Fondo transparente.
  - Logo `Kaffa.` en `--kaffa-cream` con acento `em` en `--kaffa-terracotta`.
  - Enlaces de navegación en `--kaffa-cream` (`opacity: 0.9`, `:hover` `opacity: 1`).
  - Botón CTA "Pedir por WhatsApp" en variante sólida o bordes claros con contraste AA.
- **Estado SCROLLED**:
  - Fondo `rgba(245, 240, 238, 0.92)` con `backdrop-filter: blur(14px)`.
  - Transición elegante de color hacia `--kaffa-text-dark`.
  - Borde inferior sutil `1px solid var(--kaffa-line)`.

## 2. Hero Section (`<header class="hero">`)
- **Composición 60/40 Asimétrica**:
  - **Columna Izquierda (Narrativa & Datos)**:
    - Sello impreso **LIVE ROAST BATCH STAMP** (`JetBrains Mono`).
    - Titular principal en `Fraunces` con variaciones ópticas (`clamp()`).
    - Subtítulo narrativo con legibilidad optimizada (`DM Sans`).
    - Botones de acción principal en radio estructurado (no pill 999px).
  - **Columna Derecha (Visual Dominante & Capas de Tostado)**:
    - Composición fotográfica enmarcada con acabado artesanal.
    - Sello físico flotante con información de origen y tueste semanal (Martes & Viernes).
