# DESIGN TOKENS — KAFFA CAFÉ DE ESPECIALIDAD

```css
:root {
  /* Fondos Orgánicos */
  --kaffa-parchment: #F5F0E8;        /* Pergamino principal */
  --kaffa-parchment-soft: #EDE5D8;   /* Superficie suave */
  --kaffa-espresso: #1A1110;         /* Grano oscuro / Hero bg */
  --kaffa-espresso-soft: #2B1D1A;    /* Superficie oscura elevación */
  --kaffa-cream: #FFF9F0;            /* Crema / Texto claro */

  /* Textos & Jerarquía */
  --kaffa-text-dark: #241A16;        /* Texto principal en fondo claro */
  --kaffa-text-muted: #6B5A50;       /* Texto secundario */
  --kaffa-text-light: #F5F0E8;       /* Texto principal en fondo oscuro */
  --kaffa-text-light-muted: rgba(245, 240, 232, 0.72);

  /* Acentos de Marca */
  --kaffa-terracotta: #C1440E;      /* Fuego de tostado / Acento */
  --kaffa-caramel: #D4A574;         /* Caramelo / Miel */
  --kaffa-line: rgba(26, 17, 16, 0.14);
  --kaffa-line-light: rgba(245, 240, 232, 0.18);

  /* Tipografía */
  --font-display: 'Fraunces', serif;
  --font-sans: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Escala Tipográfica Fluida */
  --text-xs: clamp(0.72rem, 0.68rem + 0.2vw, 0.82rem);
  --text-sm: clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem);
  --text-base: clamp(1rem, 0.94rem + 0.3vw, 1.1rem);
  --text-lg: clamp(1.18rem, 1.1rem + 0.4vw, 1.35rem);
  --text-xl: clamp(1.4rem, 1.25rem + 0.75vw, 1.85rem);
  --text-2xl: clamp(1.85rem, 1.55rem + 1.3vw, 2.6rem);
  --text-3xl: clamp(2.4rem, 1.95rem + 2.2vw, 3.8rem);
  --text-4xl: clamp(3.2rem, 2.5rem + 3.8vw, 5.8rem);

  /* Spacing Grid (8px Base) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  /* Radios Estructurados (Sin Pills 999px Indiscriminados) */
  --radius-sm: 4px;
  --radius-md: 10px;
  --radius-lg: 20px;
  --radius-stamp: 6px;

  /* Elevación & Sombras */
  --shadow-sm: 0 4px 12px rgba(26, 17, 16, 0.08);
  --shadow-md: 0 12px 32px rgba(26, 17, 16, 0.18);
  --shadow-lg: 0 24px 60px -30px rgba(26, 17, 16, 0.45);
  --shadow-terracotta: 0 12px 28px -10px rgba(193, 68, 14, 0.45);

  /* Easings */
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
}
```
