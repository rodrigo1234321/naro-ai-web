# Brief y Protocolo Operativo: Demo Factory Naro AI

Este documento establece la arquitectura del flujo de trabajo en paralelo entre **Antigravity** (Investigación, Datos Reales, Dirección Artística) y **Open Design** (Construcción y Maquetación de código de las 28 Demos).

---

## 🎯 Objetivo General
Construir **28 landing pages profesionales** correspondientes a 28 subrubros comerciales clave en Mar del Plata. Cada demo servirá como activo de venta directa en frío, alojado en Cloudflare Pages (`https://<slug>.pages.dev`).

---

## 🔄 División Fija de Roles

| Agente | Responsabilidad Principal | Entregables |
|---|---|---|
| **Antigravity** | Investigación de mercado local, extracción de leads reales de MDP, búsqueda de referencias de animación/UI, definición de paletas y copy. | `research/dossiers/<NN-slug>/` (`dossier.md`, `inspiracion.md`, `refuerzo-design.md`, `assets/`) |
| **Open Design** | Lectura del dossier de investigación, maquetación HTML/CSS/JS responsive de alta densidad (>25 KB), integración de librerías y componentes interactivos. | `webs/<NN-slug>/index.html` + despliegue |

---

## 📁 Estructura del Workspace `research/`

```
research/
├── README.md                 ← Matriz de seguimiento con estado de las 28 demos
├── brief-demo-factory.md     ← Este documento de especificaciones
└── dossiers/
    ├── 01-clinica-aura/
    │   ├── dossier.md        ← Leads reales MDP, precios locales y link de WhatsApp
    │   ├── inspiracion.md    ← 3-5 Webs de referencia internacional/nacional con animación
    │   ├── refuerzo-design.md← Paleta OKLCH, fuentes, sitemap sugerido
    │   └── assets/           ← Recursos gráficos e iconos descargados
    ├── ... (28 subrubros)
```

---

## 📋 Reglas de Calidad Inviolables
1. **Sin Datos Inventados**: Todo negocio listado en `dossier.md` proviene de los leads verificados de Mar del Plata. Cualquier dato estimado se marca `[NO VERIFICADO]`.
2. **Copywriting Rioplatense**: Textos pensados para el consumidor de Mar del Plata (voz cercana, clara, persuasiva).
3. **Botón WhatsApp Explícito**: Texto exacto "WhatsApp" (nunca "WA") con enlace `wa.me` pre-formateado.
4. **Respeto al Motor Open Design**: La carpeta `refuerzo-design.md` entrega pautas de inspiración, pero Open Design decide el maquetado final.
