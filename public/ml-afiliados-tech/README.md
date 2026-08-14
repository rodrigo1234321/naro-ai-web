# TechAfiliados Argentina - Web de Afiliados de Mercado Libre

Este proyecto es un sitio web de afiliados enfocado en tecnología, hardware y gaming para Argentina. Está diseñado desde cero con un enfoque de alto rendimiento, optimización SEO exhaustiva y una estética premium en modo oscuro.

## 🚀 Tecnologías y Arquitectura

- **Tecnologías:** HTML5 semántico, CSS3 puro y JavaScript moderno (ES6+).
- **Sin Backend:** El sitio es 100% estático, lo que garantiza tiempos de carga casi instantáneos (Core Web Vitals óptimos) y una seguridad absoluta.
- **Buscador en el Cliente:** Motor de búsqueda integrado en JavaScript que indexa títulos, descripciones, categorías y etiquetas dinámicamente en el navegador.
- **Compatibilidad:** Diseñado específicamente para funcionar de forma gratuita en plataformas de hosting estático de alto rendimiento como **Cloudflare Pages** y **GitHub Pages**.

---

## 📂 Estructura del Proyecto

```text
/ml-afiliados-tech/
│
├── index.html                      # Inicio (Hero, Buscador, Destacados, Artículos)
├── contacto.html                   # Formulario de contacto optimizado
├── sobre-nosotros.html             # Transparencia editorial (Google E-E-A-T)
├── politica-privacidad.html        # Uso de cookies y tracking (Legal)
├── descargo-responsabilidad.html   # Declaración obligatoria de afiliados
├── robots.txt                      # Control de rastreo para buscadores (SEO)
├── sitemap.xml                     # Mapa de enlaces para Google Search Console
│
├── css/
│   └── styles.css                  # Hoja de estilos global (Dark Theme & Responsive)
│
├── js/
│   ├── affiliate-config.js         # Configuración centralizada de enlaces de afiliados
│   └── main.js                     # Buscador JS, Menú móvil y controladores
│
├── categorias/                     # Listados por categoría
│   ├── notebooks.html
│   ├── pcs-gamer.html
│   ├── procesadores.html
│   ├── placas-de-video.html
│   ├── monitores.html
│   ├── teclados.html
│   ├── mouse-gamer.html
│   └── auriculares.html
│
└── articulos/                      # Artículos en profundidad (Compradores con intención)
    ├── mejores-notebooks-calidad-precio-argentina.html
    ├── que-pc-gamer-armar-con-1-millon-pesos.html
    ├── mejores-auriculares-gamer-economicos.html
    └── mejores-monitores-para-cs2.html
```

---

## 🔗 Cómo Configurar tus Enlaces de Afiliado

Para monetizar este sitio, debés registrarte en el **Programa de Afiliados de Mercado Libre Argentina**. Una vez que tengas tu cuenta activa y generes tus enlaces de seguimiento, la administración de los links es sumamente sencilla gracias a la centralización en JavaScript:

1. Abrí el archivo `js/affiliate-config.js`.
2. Buscá el listado de productos en la sección `products`.
3. Reemplazá los enlaces de ejemplo por tus enlaces de afiliación generados en el panel de Mercado Libre:

```javascript
products: {
    // Reemplaza esta URL por tu link de afiliado correspondiente
    "notebook-asus-tuf": "https://www.mercadolibre.com.ar/notebook-gamer-asus-tuf-gaming-f15/p/MLA22839931", 
    "notebook-hp-15": "https://tu-link-de-afiliado-personalizado.mercadolibre.ar/..."
}
```

### ¿Cómo funciona en el HTML?
En el código HTML de cualquier página o artículo, los botones de compra se definen utilizando el atributo `data-affiliate`:

```html
<a href="#" data-affiliate="notebook-asus-tuf" class="cta-button">Ver en Mercado Libre ↗</a>
```

Al cargar la página, `js/main.js` leerá automáticamente este atributo, buscará la URL correspondiente en `js/affiliate-config.js`, inyectará el enlace en el atributo `href` y le asignará los parámetros de seguridad recomendados para SEO:
- `target="_blank"` (abre en pestaña nueva).
- `rel="noopener noreferrer nofollow"` (informa a Google que es un enlace patrocinado para evitar penalizaciones y protege al usuario).

---

## 🔍 Cómo añadir nuevos artículos al buscador

Para que un artículo nuevo o una categoría sea indexado por el buscador interactivo del sitio, simplemente debés añadir un objeto representativo en el array `SEARCH_INDEX` ubicado en la parte superior de `js/main.js`:

```javascript
{
    title: "Título del Nuevo Artículo o Comparativa",
    url: "/articulos/nombre-del-archivo-nuevo.html",
    category: "Nombre de la Categoría",
    description: "Una descripción breve que aparecerá abajo del resultado en la búsqueda.",
    tags: ["palabra clave", "otra etiqueta", "marca"]
}
```

---

## ☁️ Guía de Publicación Gratis

### Opción A: Cloudflare Pages (Altamente Recomendado)
Cloudflare ofrece una red de distribución (CDN) mundial ultrarrápida, compresión automática de imágenes y SSL gratuito.

1. **Subí tu código a GitHub:**
   - Creá un repositorio público o privado en tu cuenta de GitHub (ej. `ml-afiliados-tech`).
   - Sube la estructura completa de carpetas al repositorio.
2. **Conectá con Cloudflare Pages:**
   - Creá una cuenta gratuita en [Cloudflare](https://dash.cloudflare.com/).
   - En el menú lateral izquierdo, andá a **Workers y Pages** > **Crear aplicación** > **Pages** > **Conectar a Git**.
   - Autorizá a Cloudflare a leer tu cuenta de GitHub y seleccioná el repositorio de tu proyecto.
3. **Configuración de compilación:**
   - **Directorio de salida:** Dejalo vacío o escribí `/` (ya que es HTML plano sin compilación).
   - **Comando de compilación:** Dejalo vacío.
   - Hacé clic en **Guardar y desplegar**.
4. ¡Listo! Cloudflare compilará y publicará tu sitio en un subdominio gratuito `*.pages.dev`. Podés ir a la pestaña **Dominios personalizados** para enlazar tu dominio propio (ej. `techafiliados.ar`).

### Opción B: GitHub Pages
Es la opción nativa de GitHub, ideal si querés administrar todo desde tu repositorio de código directamente.

1. En tu repositorio de GitHub, andá a la pestaña **Settings** (Configuración).
2. Buscá la sección **Pages** en el menú lateral izquierdo.
3. Bajo **Build and deployment** > **Source**, seleccioná **Deploy from a branch**.
4. En **Branch**, elegí tu rama principal (usualmente `main` o `master`) y la carpeta `/` (raíz).
5. Hacé clic en **Save** (Guardar).
6. En un par de minutos, GitHub Pages te indicará la URL de publicación (ej. `https://usuario.github.io/nombre-repositorio/`).
