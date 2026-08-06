# Auditoría de Frontend — Naro AI

Revisé línea por línea `index.html`, `styles.css` y `app.js`, verifiqué cálculos y referencias con scripts, y confirmé cada hallazgo antes de anotarlo (nada de "me parece que"). Está ordenado por impacto. Los puntos 🔴 son los que yo arreglaría primero porque tocan plata o la primera impresión; el resto es pulido.

---

## 🔴 1. El número de WhatsApp es un placeholder falso

Los **6 puntos de contacto del sitio** (botón flotante, CTA del hero, cada modal de servicio, el footer y el `telephone` del Schema.org) usan el mismo número: `+5492230000000`. Son puros ceros — es un número de relleno, no uno real. Como todo el negocio pasa por WhatsApp, si esto queda así en producción, **cada clic de un cliente potencial se va a un número que no existe**. Es lo primero que yo revisaría antes de publicar.

## 🔴 2. Los links del portfolio usan 3 convenciones de ruta distintas — probablemente rotos

En `proyectosMDP` (app.js), los 8 casos de éxito enlazan así:

| Proyecto | Ruta usada |
|---|---|
| MS Refrigeración, Stella Maris, Estar Peralta Ramos | `../nombre-proyecto/index.html` |
| Brüder, CDE, Kytos, Alfa Gym | `webs/nombre-proyecto/index.html` |
| Restaurante La Marina | `sites/restaurante-la-marina/index.html` |

Tres estructuras de carpetas diferentes (`../`, `webs/`, `sites/`) para el mismo tipo de link. Salvo que tu hosting real tenga literalmente esas tres carpetas conviviendo, al menos dos de los tres grupos van a tirar 404 al hacer clic en "Explorar Proyecto". Vale la pena confirmar dónde vive cada proyecto real y unificar la ruta.

## 🔴 3. El modal de servicio se puede cortar sin dejar scroll

`.modal-content` no tiene `max-height` ni `overflow-y`, y hereda `overflow: hidden` de `.glass-card`. Calculé el alto real de contenido de un modal completo (título + tagline + panel de precios + 5 bullets + botón de WhatsApp): **~600-650px**. En una pantalla baja (celular en horizontal, notebooks chicas, o simplemente una ventana de navegador no maximizada) el modal se corta y el contenido de más abajo — **incluido el botón "Solicitar por WhatsApp", que es la conversión** — queda invisible y sin forma de hacer scroll para verlo.

**Sugerencia:** agregar `max-height: 90vh; overflow-y: auto;` a `.modal-content`.

## 🔴 4. El formulario de "Auditoría Gratuita" (tu formulario de mayor valor) está sin estilo de label

`.form-group` no existe en el CSS, y tampoco hay ninguna regla para `label` en general. Comparalo con la calculadora, un poco más arriba en la misma página, que sí tiene `.calc-label` prolijo (bold, tamaño, separación). El resultado: los `<label>` del formulario de contacto (que por defecto en HTML son `display: inline`) no tienen ni negrita, ni tamaño definido, ni separación con el input de abajo — se ve visiblemente más pobre que el resto del sitio, justo en el formulario que genera los leads.

## 🔴 5. El "badge" del bot en el Hero no tiene ningún estilo (`.visual-badge`)

`<div class="visual-badge">🤖 Agente Activo MDP</div>`, dentro de la vista previa de chat del Hero — la primera cosa que ve cualquier visitante — **no tiene ninguna regla CSS asociada**. Todos los demás "badges" del sitio (nav, servicios, portfolio, footer) son píldoras prolijas con fondo de color y borde; este queda como texto suelto sin padding ni forma, en el elemento más visible de toda la home.

## 🔴 6. Los tags "¡SIN ABONO MENSUAL!" / "¡SIN COSTO DE SETUP!" / "Combo Preferido" salen del color equivocado y sin forma de píldora

Esto es un bug de cascada CSS bastante concreto, lo verifiqué con los números de línea:

- `.badge-status` (línea 310) define color verde `#34d399`; `.badge-amber` (línea 311) define ámbar `#fbbf24`.
- `.service-tag` (línea 532, **más abajo en el archivo**) define `color: var(--primary-cyan)` — mismo nivel de especificidad, pero al estar después en la hoja de estilos, **gana y pisa el verde/ámbar**.
- Además, el HTML combina `class="service-tag badge-status"` **sin incluir la clase base `.badge`**, que es la que da el padding, el `border-radius` y el `display: inline-flex` de píldora. Sin ella, el fondo y borde de color quedan pegados directo al texto, sin la forma de chip que tienen todos los demás badges del sitio.

Afecta a 3 de las 5 tarjetas de servicio (Web, POS y Combo) — justo las que llevan el mensaje comercial más fuerte ("sin abono", "sin costo de setup", "combo preferido").

**Sugerencia:** en el HTML, usar `class="service-tag badge badge-status"` (agregando la clase base), y en el CSS mover o reforzar la regla de color de `.service-tag` para que no gane por orden de aparición (por ejemplo, no declarar color en `.service-tag` y dejar que lo den `.badge-status`/`.badge-amber`).

---

## 🟡 Consistencia de información

## 7. La calculadora de ROI muestra un valor inicial que no coincide con su propia fórmula

Hice la cuenta con los valores por defecto (25 consultas/día, ticket $25.000, rubro "indumentaria"):

```
consultasPerdidasMes = 25 × 30 × 0.25 = 187.5
ventasRecuperadasMes = round(187.5 × 0.15) = 28
montoRecuperado = 28 × 25.000 = $700.000   ← esto es lo que la fórmula realmente da
díasROI = 9 días
```

Pero el HTML trae hardcodeado **"$187.500 ARS" y "18 días"** como valores iniciales. Es sospechoso: 187.500 es casi exactamente el número intermedio (187.5, "consultas perdidas al mes") mal formateado como si fueran pesos, no el resultado final. El JS lo pisa apenas carga la página (por eso en la práctica casi no se nota), pero si el script tarda en ejecutar o falla, el usuario ve un número que no tiene nada que ver con la fórmula real. Conviene poner como valores iniciales los que realmente da el cálculo ($700.000 / 9 días), para que sean coherentes en cualquier escenario.

## 8. Grids de 3 columnas se rompen justo en el rango tablet (641px–992px)

`.grid-3-cols` pasa a 2 columnas entre 641 y 992px, y recién a 1 columna por debajo de 640px. El problema es que se usa para **grupos de exactamente 3 elementos**: las 3 estadísticas del Hero (+300%, 24/7, <5s) y las 3 tarjetas del Manifiesto. En ese rango de tablet, quedan 2 arriba y **1 sola, descolgada, ocupando solo la mitad del ancho, con un hueco vacío al lado**. También pasa en el portfolio cuando se filtra por "Gastronomía" o "Salud" (3 proyectos cada una).

**Sugerencia:** para grupos de 3, usar 3 columnas fijas hasta un breakpoint más chico, o pasarlos directamente a 1 columna en tablet en vez de 2.

## 9. Falta la clase `.text-muted` que se usa en la demo del bot

`<small class="block text-muted">🟢 En línea • Respuesta instantánea</small>` — esa clase no existe en ningún lado del CSS (solo existe la variable `--text-muted`, nunca como clase). Sin ella, ese texto hereda el color principal casi blanco del body en vez de un gris apagado, así que el estado "En línea" se ve tan fuerte visualmente como el nombre del bot al lado, cuando debería ser un dato secundario y discreto.

## 10. La respuesta "quiero una demo" del bot promete un botón que no aparece

Cuando se elige esa opción, el bot responde: *"Hacé clic en el botón de abajo..."* — pero no se genera ningún botón ni link nuevo; abajo solo siguen los mismos 4 botones de preguntas rápidas de siempre. Es la única opción del simulador que no lleva a ninguna acción concreta (las demás al menos informan; ninguna abre WhatsApp tampoco, dicho sea de paso — podría ser una buena oportunidad para que "demo" sí dispare el `wa.me` real).

## 11. Pequeño detalle de formato: "24 / 7" vs "24/7"

La estadística del Hero muestra "24 / 7" con espacios; en el resto del copy (títulos, texto de servicios) siempre se escribe "24/7" sin espacios. No es un error, pero rompe la consistencia visual si alguien se fija.

---

## 🟢 Animaciones

## 12. La animación de entrada del Hero no hace lo que el código sugiere que debería hacer

`heroTl.from(".gsap-hero-reveal", { ..., stagger: 0.15 })` — el `stagger` reparte el efecto entre varios elementos, pero **solo hay un elemento con esa clase** (`hero-content`, el bloque entero de texto). Confirmé que aparece una sola vez en el HTML. Resultado: el badge, el título, el párrafo y los botones del Hero no entran en cascada uno después del otro (que es claramente la intención, viendo el resto del motion engine) — entran todos juntos, como un solo bloque. Si el efecto en cascada era el objetivo, habría que poner la clase `gsap-hero-reveal` en cada hijo (badge, h1, p, grupo de botones) por separado.

## 13. El acordeón de FAQs abre y cierra de golpe, sin transición

`.faq-answer { display: none }` / `.faq-item.active .faq-answer { display: block }` — es un cambio instantáneo. Contrasta con el resto del sitio, que está muy cuidado en animaciones (GSAP, ScrollTrigger, hover states). Agregar una transición de `max-height`/`opacity` lo haría sentir a la altura del resto.

## 14. El modal tampoco tiene animación de apertura/cierre

Mismo caso: `.modal-overlay { display:none }` → `.active { display:flex }`, sin transición. Un fade + scale-in de 200-300ms encajaría mejor con el resto del "motion engine" de la página.

## 15. No hay soporte para `prefers-reduced-motion`

Ninguna animación (ni las de GSAP ni el `pulse` infinito del punto verde de estado) respeta la preferencia de movimiento reducido del sistema operativo. Es una buena práctica de accesibilidad agregar un bloque `@media (prefers-reduced-motion: reduce)` que anule o acorte las animaciones para quien lo tenga activado.

---

## Accesibilidad (rápido)

- Las tarjetas de servicio y las preguntas del FAQ son `<div onclick="...">` — funcionan con mouse pero no son accesibles por teclado (sin `tabindex`, sin manejo de Enter/Espacio, sin `role="button"`).
- El botón de cerrar el modal (`&times;`) no tiene `aria-label` — un lector de pantalla lo anuncia como "×", no como "Cerrar".
- El contraste de `--text-dim` (#64748b) sobre el fondo oscuro da **≈4.16:1**, apenas por debajo del mínimo AA (4.5:1) para texto chico. Se usa en los horarios del chat preview y en el copyright del footer — bajo impacto, pero queda anotado.

## SEO / Metadata

- No hay `<link rel="icon">` — falta favicon.
- La imagen de Open Graph y del Schema.org (`ProfessionalService`) es la misma foto de stock de Unsplash (una playa genérica), no un logo o foto propia de la marca.
- La dirección del Schema.org (`"Peatonal San Martín / Güemes / Zona Comercial"`) es una descripción de zona, no una dirección postal real — para un negocio sin local físico puede convenir más usar `areaServed` en vez de `address`.
- Busqué el dominio `nora-ai.mdp.ar` y no aparece indexado en ningún lado todavía — antes de lanzar, confirmá que esté efectivamente registrado y apuntando al hosting real (canonical, sitemap y JSON-LD dependen de que ese dominio funcione).
- Lucide se carga como `@latest` (versión sin fijar) mientras que GSAP sí está fijado en `3.12.5` — conviene fijar también la versión de Lucide para que un cambio de la librería no rompa los íconos sin aviso.

## Rendimiento

- La fuente de Google se carga con `@import` dentro de `styles.css`, a pesar de que ya tenés los `<link rel="preconnect">` correctos en el `<head>`. El `@import` obliga al navegador a descargar y parsear todo `styles.css` primero, y recién ahí pedir la hoja de Google Fonts — es más lento que poner el `<link>` de la fuente directo en el HTML, y puede causar un salto visual cuando la fuente entra tarde.

---

## Lo que ya está bien (para que no parezca que todo es negativo)

- **Los precios son consistentes en todos lados**: revisé cada servicio (Web, Bot, POS, Combo, Menú QR) entre la tarjeta, el modal, el FAQ y las respuestas del bot demo — coinciden en los 5 casos.
- **Cero IDs duplicados** y **cero referencias rotas entre JS y HTML** (verifiqué cada `getElementById` contra el HTML real).
- Los filtros del portfolio (Gastronomía, Salud, Industrial, Turismo) coinciden exactamente con las categorías reales de los 8 proyectos — ninguno queda huérfano.
- El breakpoint de 640px para los grids de 2 columnas está bien resuelto.
- La tabla comparativa usa scroll horizontal en mobile en vez de romperse — un patrón válido para tablas angostas en pantallas chicas.

---

### Si tuviera que priorizar por dónde arrancar
1. Número de WhatsApp real (#1)
2. Links del portfolio (#2)
3. `max-height` del modal (#3)
4. El combo `service-tag + badge` (#6) — es rápido de arreglar y se nota en 3 de las 5 tarjetas de servicio
5. El resto, en el orden que prefieras — ninguno es urgente por sí solo.
