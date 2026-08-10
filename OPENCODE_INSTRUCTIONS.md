# Guía de Uso: Generador Instantáneo de HTML por Lead (OpenCode + DeepSeek V4 Flash)

Este sistema te permite generar la Landing Page HTML personalizada para cualquier cliente lead de Mar del Plata cuando responde a tus mensajes de prospección, agrupándolos por **Rubro** y **Subrubro** según los estándares de diseño de la sesión `zkjY2irC`.

---

## 🚀 Flujo A: Generar 1 Sola Landing al Recibir Respuesta de un Lead

Cuando un cliente lead te responda el mensaje en WhatsApp o Instagram (por ejemplo, *Clínica Luro* o *LEAD-IA-1313*):

```bash
python tools/generate_lead_landing.py --lead "Clínica Luro" --html
```

---

## 🌙 Flujo B: Dejar Corriendo Toda la Noche (Generación Masiva por Lote / Batch)

Hemos creado el script **`batch_generate_landings.py`** optimizado para procesar en lote **todos los rubros o prospectos del Excel**:

### 1. Generar únicamente los 2,823 Leads Calientes (Prioridad ALTA 🔥):
```bash
python tools/batch_generate_landings.py --hot-only --all
```

### 2. Generar un Rubro Específico (ej. Todos los de Gastronomía o Salud):
```bash
python tools/batch_generate_landings.py --rubro "Gastronomía"
```
```bash
python tools/batch_generate_landings.py --rubro "Salud"
```

### 3. Generar la Totalidad Absoluta del Excel (6,579 Leads):
```bash
python tools/batch_generate_landings.py --all
```

Todas las páginas se organizarán en subcarpetas por Rubro en `previews/<Rubro>/preview_<nombre_lead>.html`.

> 💡 **Tip OpenCode**: Para tareas de automatización prolongadas o nocturnas en OpenCode, podés indicarle a tu asistente utilizando el comando `/goal` para que mantenga el objetivo activo hasta completar la totalidad de la prospección.

---

## 📁 Estructura de Directorios Generados

- `data/leads_catalog.json`: Base de datos de 6,579 leads agrupados por `sector` y `subrubro`.
- `templates/rubro_templates.json`: Especificaciones visuales, paletas de colores y componentes por Rubro.
- `tools/build_lead_catalog.py`: Parser automático del Excel de prospección.
- `tools/generate_lead_landing.py`: Generador individual / CLI y ensamblador de prompts.
- `tools/batch_generate_landings.py`: Generador por lote para procesar rubros enteros o la base completa.
- `previews/`: Carpeta organizada por rubros con las landings `.html` listas.
