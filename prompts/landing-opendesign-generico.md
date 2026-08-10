# Prompt genérico — Landing via Open Design (Antigravity)

Pegar este texto en Antigravity (IDE o CLI) para crear la landing de un negocio.
Completar solo las partes en `[corchetes]`. No hace falta adjuntar nada: todo se investiga en internet.

---

> Usá el skill **landing-web-opendesign** para crear la landing de **[nombre del negocio]**.
>
> **Fuente de datos**:
> - Buscá el negocio en el índice de leads:
>   `C:\Users\rodri\Desktop\AI\Projects\mdp-negocios-web\data\leads_catalog.json`
>   (o el CSV `data\prospectos_agencia_ia_mdp.csv`). Si está, tomá sus datos:
>   sector, dirección, teléfono, WhatsApp, web, `url_google_maps`.
> - Si no está en el índice, decime qué datos tenés.
>
> **Investigación (todo en internet, sin HTML local)**:
> 1. Buscá el comercio en la web: sitio propio, Google Maps (horarios, reviews,
>    fotos, dirección), Instagram, Facebook, directorios locales, e-commerce si
>    vende online.
> 2. Resumí: qué vende, a quién, qué precios maneja, cómo vende (local, online,
>    WhatsApp), su presencia digital y su tono de marca.
> 3. Marcá cada dato como `[VERIFICADO: fuente]` o `[NO VERIFICADO]` — no
>    inventes datos de contacto ni productos.
> 4. Buscá 2–3 referencias reales del rubro/mercado local para la dirección
>    estética.
>
> **Paquete de contexto**: armalo con negocio + propuesta de valor, datos
> verificados (WhatsApp, dirección, horarios, productos), público, tono,
> referencias y copy. Separalo en "fijo" (datos reales, productos, voz) y
> "variable" (lo que puede decidir Open Design).
>
> **Generación**: delegá la generación a Open Design vía el server MCP
> `open-design`: `collect_brief` / `confirm_brief`, `create_project`,
> `start_run` y polling hasta terminar (5–30 min, no canceles). **NO fijes
> design system ni layout: que Open Design decida.**
>
> **Guardado**: cuando el run termine (`get_run` = succeeded), traé el
> artefacto con `get_artifact` y guardalo en:
> `C:\Users\rodri\Desktop\AI\Projects\mdp-negocios-web\webs\<nombre-slug>\`
> con `index.html` (+ css/js si los trae), como la convención de
> `webs\kiva-cafe\`.
>
> **Restricciones**: [idioma, una sola página, secciones que sí o sí, botón de
> WhatsApp directo].
>
> Cuando termine, avisame con la ruta final, el `previewUrl` y qué design
> system eligió Open Design.
