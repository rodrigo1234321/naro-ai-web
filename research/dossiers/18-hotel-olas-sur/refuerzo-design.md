# Refuerzo de Diseño, Tokens & Estructura: Hotel Olas Sur

## 🎨 Sistema de Colores OKLCH & Tokens Visuales
- **Atmósfera Temática**: Boutique Real & Dorado Mármol (Confort hotelero de primera línea en la costa)
- **Fondo Principal**: `oklch(0.12 0.03 250) - Azul Noche Hotelero (#0F172A)`
- **Color Acento**: `oklch(0.78 0.14 75) - Dorado Sol (#D97706)`
- **Superficies**: `oklch(0.98 0.01 240) - Mármol Blanco (#F8FAFC)`
- **Texto Principal**: `oklch(0.99 0.01 250) - Blanco Pura Seda (#FFFFFF)`

---

## 🔤 Reglas Tipográficas Anti-AI Slop
- **Familias Permitidas**: Cormorant Garamond (Títulos Hotel) + Plus Jakarta Sans (Cuerpo) (Máximo 2 familias tipográficas en todo el proyecto).
- **Tipografía H1 Contenida (Anti-Gigantismo)**: `clamp(2.2rem, 3.8vw, 3.2rem)`

---

## 🗺️ Sitemap Sugerido (6 Secciones Canónicas)
- **1. HERO CONFORT BOUTIQUE: Suite Matrimonial Vista al Mar + Reservar Habitación.**
- **2. HABITACIONES & SUITES: Matrimoniales, Triples y Aparts con Kitchenette.**
- **3. SERVICIOS DESTACADOS: Desayuno Buffet, Spa, Cochera Cubierta y Wi-Fi.**
- **4. GALERÍA DE INSTALACIONES: Solarium, Piscina y Restó Bar.**
- **5. UBICACIÓN PRIVILEGIADA: A pasos de la playa y el paseo de compras.**
- **6. RESERVAS DIRECTAS: Botón WhatsApp sin comisiones de terceros.**

---

## 🛠️ Prompt Directo para Open Design MCP (`start_run`)
```markdown
Usá la skill landing-web-opendesign para construir la landing page de Hotel Olas Sur.
Respetá los datos verificados del dossier research/dossiers/18-hotel-olas-sur/dossier.md.
Aplica la atmósfera Boutique Real & Dorado Mármol (Confort hotelero de primera línea en la costa), paleta OKLCH oklch(0.78 0.14 75) - Dorado Sol (#D97706), tipografía Cormorant Garamond (Títulos Hotel) + Plus Jakarta Sans (Cuerpo) y botón flotante de WhatsApp.
```
