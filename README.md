# Sistema de HTMLs de Clientes — Cloudflare Pages

Repositorio único que procesa y publica automáticamente más de 1.000 HTMLs estáticos individuales en **Cloudflare Pages**. Cada vez que hagas `git push` con un HTML nuevo en `raw_html/`, GitHub Actions lo procesa y lo publica en segundos, sin tocar la consola.

## Flujo

```
raw_html/clinica-luro.html   ─┐
raw_html/terca.html          ─┤  (git push)
raw_html/terca/img/...       ─┘        │
                                       ▼
                        .github/workflows/deploy.yml
                                       │
                    node scripts/process-html.js
                                       │
                              public/clinica-luro/index.html   →  mis-clientes-html.pages.dev/clinica-luro
                              public/terca/index.html          →  mis-clientes-html.pages.dev/terca
                                       │
                        cloudflare/pages-action (deploy automático)
```

El script `process-html.js`:
1. Convierte `raw_html/nombre-cliente.html` en `public/nombre-cliente/index.html` (URL limpia: `midominio.com/nombre-cliente`).
2. Inyecta `<meta name="robots" content="noindex, nofollow">` si el HTML no la tiene (evita que Google indexe páginas de clientes).
3. Copia una carpeta de assets hermana si existe (`raw_html/nombre-cliente/` → `public/nombre-cliente/`).
4. Genera `public/index.json` con el registro de todas las URLs publicadas.

## Configuración inicial (una sola vez)

### 1. Crear el proyecto en Cloudflare Pages

1. Entrá a [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Upload assets** (direct upload).
2. Nombre del proyecto: **`mis-clientes-html`** (tiene que coincidir exactamente).
3. No hace falta subir nada todavía: el primer deploy lo hace GitHub Actions.

### 2. Obtener el API Token de Cloudflare

1. [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token** → plantilla **"Edit Cloudflare Workers"**.
2. Permisos: *Account* → *Cloudflare Pages* → *Edit* (y *Workers Scripts* → *Edit* si lo pide).
3. Copiá el token generado (solo se muestra una vez).

### 3. Obtener el Account ID

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → abajo a la derecha en **Account ID** (o en la URL del panel).

### 4. Guardar los Secrets en GitHub

1. Repositorio → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:
   - `CLOUDFLARE_API_TOKEN` = el token del paso 2
   - `CLOUDFLARE_ACCOUNT_ID` = el Account ID del paso 3

## Flujo de trabajo diario

```bash
# 1. Agregar un HTML nuevo (o dejarlo en raw_html/ con su carpeta de assets)
#    raw_html/mi-cliente.html

# 2. Committear y pushear
git add raw_html/mi-cliente.html
git commit -m "feat: landing nuevo cliente"
git push

# 3. En ~1 minuto el pipeline lo publica solo.
#    Copiás la URL limpia y se la mandás al cliente:
#    https://mis-clientes-html.pages.dev/mi-cliente
```

> Si le asignás un dominio propio (Settings → Custom domains en Cloudflare Pages), la URL pasa a ser `midominio.com/mi-cliente`.

## Pruebas locales

```bash
npm run seed          # (opcional, una vez) copia las webs ya construidas del repo a raw_html/
npm run process       # genera public/ desde raw_html/
npx wrangler pages dev public   # preview local (requiere wrangler)
npm run deploy:pages  # build + deploy directo desde tu PC (alternativa a GitHub Actions)
```

## Estructura

```text
.
├── .github/workflows/deploy.yml   # Pipeline de despliegue automático
├── raw_html/                      # Depositá los .html originales acá
├── public/                        # Generada por el pipeline (no editar, no commitear)
├── scripts/
│   ├── process-html.js            # Procesador de HTMLs (URLs limpias + noindex)
│   └── seed-raw-html.js           # Helper: copia las webs del repo a raw_html/
├── wrangler.toml                  # Config de Cloudflare Pages
└── package.json                   # Scripts npm (process / seed / deploy:pages)
```
