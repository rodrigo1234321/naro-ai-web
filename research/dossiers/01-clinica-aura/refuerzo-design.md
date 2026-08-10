# Refuerzo de Diseño, Tokens & Estructura: Clínica Aura

## 🎨 Sistema de Colores OKLCH & Tokens Visuales
- **Atmósfera Temática**: Bioluminiscente Médico & Wellness Esmeralda (Confianza, higiene pulcra, serenidad médica)
- **Fondo Principal**: `oklch(0.15 0.03 240) - Slate Médico Profundo (#0F172A)`
- **Color Acento**: `oklch(0.75 0.14 195) - Cyan Bioluminiscente (#0EA5E9)`
- **Superficies**: `oklch(0.22 0.04 245) con backdrop-filter blur(16px)`
- **Texto Principal**: `oklch(0.98 0.01 240) - Blanco Nieve (#FAFAFA)`

---

## 🔤 Reglas Tipográficas Anti-AI Slop
- **Familias Permitidas**: Outfit (Títulos H1/H2) + Inter (Cuerpo y datos de contacto) (Máximo 2 familias tipográficas en todo el proyecto).
- **Tipografía H1 Contenida (Anti-Gigantismo)**: `clamp(2.2rem, 3.8vw, 3.2rem)`

---

## 🗺️ Sitemap Sugerido (6 Secciones Canónicas)
- **1. HERO INMERSIVO: H1 contenido `clamp(2.2rem, 3.8vw, 3.2rem)` con badge de ubicación en Mar del Plata y CTA a WhatsApp.**
- **2. ESPECIALIDADES MÉDICAS: Grid bento animado con Cardiología, Pediatría, Traumatología, Dermatología y Neurología.**
- **3. STAFF MÉDICO PROFESIONAL: Tarjetas glassmorphic con fotos del equipo y trayectoria profesional.**
- **4. OBRAS SOCIALES & PREPAGAS: Marquee dinámico con logos de coberturas médicas aceptadas en MDP.**
- **5. UBICACIÓN & GUARDIA: Mapa interactivo de llegada, colectivo cercano y horarios de atención.**
- **6. CTA FLOTANTE: Botón persistente con texto exacto "WhatsApp" (link directo `wa.me`).**

---

## 🛠️ Prompt Directo para Open Design MCP (`start_run`)
```markdown
Usá la skill landing-web-opendesign para construir la landing page de Clínica Aura.
Respetá los datos verificados del dossier research/dossiers/01-clinica-aura/dossier.md.
Aplica la atmósfera Bioluminiscente Médico & Wellness Esmeralda (Confianza, higiene pulcra, serenidad médica), paleta OKLCH oklch(0.75 0.14 195) - Cyan Bioluminiscente (#0EA5E9), tipografía Outfit (Títulos H1/H2) + Inter (Cuerpo y datos de contacto) y botón flotante de WhatsApp.
```
