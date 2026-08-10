# Demos de Prospección — Naro AI (Mar del Plata)

Hub de 8 plantillas de demo interactivas para los **primeros 100 leads** de
`PROSPECCION_MAR_DEL_PLATA_COMPLETA.xlsx`. Cada plantilla es un único HTML
autocontenido (>= 15kb) que se personaliza por URL params, **sin deploy**.

## Plantillas

| Plantilla | Rubro / Leads | Tamaño |
|---|---|---|
| `regaleria-souvenirs` | Regalerías, souvenirs, cotillón (~9 leads) | 22.1 kb |
| `showroom-indumentaria` | Showrooms e indumentaria (~15 + 25) | 23.1 kb |
| `salud-estetica` | Consultorios, estética (15 leads) | 22.8 kb |
| `delivery-gastronomia` | Comida a domicilio y delivery (15 leads) | 24.9 kb |
| `imprenta-sublimados` | Imprentas, sublimados (~5 leads) | 24.7 kb |
| `automotriz-servicios` | Talleres, lavaderos, gomerías (5 leads) | 22.7 kb |
| `vinoteca-bebidas` | Vinotecas y bebidas (1 lead) | 24.0 kb |
| `generica-premium` | Fallback multirubro (resto Comercio General) | 19.2 kb |

> `comercio-minorista/` es una demo vieja (POS interactivo, 9.5 kb) que NO se
> usa como plantilla.

## Personalización por URL

Cada plantilla lee estos params con `URLSearchParams`:

```
demos/<plantilla>/index.html?n=<nombre>&t=<telefono_intl>&d=<direccion>&w=<mensaje_wa>
```

- `n` — nombre del negocio (inyectado via `data-biz-nombre`)
- `t` — teléfono con código de país (ej: `5492235982676`) para `wa.me`
- `d` — dirección / zona (inyectado via `data-biz-dir`)
- `w` — mensaje pre-cargado del botón WhatsApp (botón usa `data-wa-href`)

Si no se pasan params, la demo usa valores de ejemplo.

## Mapeo de leads

`scripts/generate_demo_links.py` mapea los 100 leads a una plantilla por
keywords del nombre + sector, y genera **`data/demo_links_outreach.csv`** con
una URL personalizada por lead.

Ejecutar:

```
python scripts/generate_demo_links.py
```

## Estado

- ✅ 8 plantillas creadas, todas > 15kb, patrón world-class-landings
- ✅ Script de mapeo + CSV de links generado (100 leads)
- ✅ Hub `demos/index.html` con acceso a todas las plantillas
- ⏳ Pendiente: deploy (usuario decidió NO usar Firebase por ahora;
  los guiones de outreach piden URLs hosteadas → `file://` no sirve para
  enviar por WhatsApp)

## Retomar sesión

Si se cortan tokens, el estado de este README indica qué quedó pendiente.
