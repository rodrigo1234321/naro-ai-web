# Refuerzo de Diseño, Tokens & Estructura: Cerveceria Punto Cebada

## 🎨 Sistema de Colores OKLCH & Tokens Visuales
- **Atmósfera Temática**: Craft Taproom & Neón Ámbar (Cerveza tirada helada, ambiente nocturno festivo)
- **Fondo Principal**: `oklch(0.11 0.01 0) - Negro Noche (#09090B)`
- **Color Acento**: `oklch(0.75 0.18 65) - Neón Ámbar Cebada (#F59E0B)`
- **Superficies**: `oklch(0.16 0.02 55) con paneles metálicos oscuros`
- **Texto Principal**: `oklch(0.98 0.01 0) - Blanco Espuma (#FAFAFA)`

---

## 🔤 Reglas Tipográficas Anti-AI Slop
- **Familias Permitidas**: Cabinet Grotesk (Títulos) + Inter (Cuerpo) (Máximo 2 familias tipográficas en todo el proyecto).
- **Tipografía H1 Contenida (Anti-Gigantismo)**: `clamp(2.2rem, 3.8vw, 3.2rem)`

---

## 🗺️ Sitemap Sugerido (6 Secciones Canónicas)
- **1. HERO TAPROOM: Canilla de cerveza tirando IPA helada + Reservar Mesa por WhatsApp.**
- **2. PIZARRA DE CANILLAS EN VIVO: IPA, APA, Honey, Stout con IBU y ABV.**
- **3. HAMBURGUESAS SMASHED & TAPEO: Menú artesanal con papas cheddar.**
- **4. HAPPY HOUR: 2x1 en pintas de 18:00 a 20:30 hs.**
- **5. EVENTOS & SHOWS: Música en vivo y DJs en el local.**
- **6. RESERVAS ONLINE: Formulario exprés vía WhatsApp.**

---

## 🛠️ Prompt Directo para Open Design MCP (`start_run`)
```markdown
Usá la skill landing-web-opendesign para construir la landing page de Cerveceria Punto Cebada.
Respetá los datos verificados del dossier research/dossiers/10-cerveceria-punto-cebada/dossier.md.
Aplica la atmósfera Craft Taproom & Neón Ámbar (Cerveza tirada helada, ambiente nocturno festivo), paleta OKLCH oklch(0.75 0.18 65) - Neón Ámbar Cebada (#F59E0B), tipografía Cabinet Grotesk (Títulos) + Inter (Cuerpo) y botón flotante de WhatsApp.
```
