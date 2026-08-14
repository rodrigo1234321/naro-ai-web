# Documento de Diseño: Mejoras de Interactividad y UI para TechAfiliados Argentina

**Fecha:** 2026-07-11  
**Autor:** Antigravity (AI Lead Developer)  
**Estado:** Propuesto (Para revisión del usuario)

---

## 1. Objetivos del Proyecto

El objetivo es mejorar de manera masiva la experiencia de usuario (UX), el atractivo visual y la capacidad de conversión del sitio web estático **TechAfiliados** mediante tres subsistemas interactivos de alto rendimiento, programados en **JavaScript puro (Vanilla JS)** y estilizados con **CSS3**:

1.  **Modo Claro/Oscuro dinámico:** Con persistencia en el navegador.
2.  **Calculadora de Presupuestos (PC Gamer Builder):** Slider dinámico de rangos de precios en pesos argentinos para calcular setups gamer óptimos con links directos a componentes.
3.  **Command Palette (`Ctrl + K`) y Comparador de Hardware:** Buscador Spotlight centrado y un panel emergente de comparación de productos por categorías.

---

## 2. Arquitectura de Archivos de las Mejoras

Para mantener el código ordenado, desacoplado y veloz, utilizaremos el **Enfoque 1 (Modular)**. Crearemos/modificaremos los siguientes archivos:

```text
/ml-afiliados-tech/
│
├── docs/superpowers/specs/
│   └── 2026-07-11-mejoras-web-design.md    # Este documento de especificación
│
├── js/
│   ├── theme-toggle.js                     # Controlador de tema claro/oscuro
│   ├── budget-calculator.js                # Lógica del recomendador de PC Gamer
│   ├── command-palette.js                  # Control de atajo Ctrl+K y buscador flotante
│   └── product-comparator.js               # Comparador dinámico por categorías
│
└── css/
    └── styles.css                          # (Modificado) Variables CSS y estilos de los nuevos componentes
```

---

## 3. Especificación Técnica de los Subsistemas

### 3.1. Modo Claro/Oscuro (CSS Variables & `js/theme-toggle.js`)

*   **Variables CSS:** Modificaremos `css/styles.css` para añadir la clase `body.light-theme`.
*   **Lógica de JS:**
    *   Verifica si el localStorage contiene la clave `theme`.
    *   Si no, verifica `window.matchMedia('(prefers-color-scheme: light)').matches` del sistema.
    *   Crea un botón flotante (`id="theme-switcher"`) en la esquina inferior derecha con transición fluida de rotación del icono de sol/luna.

### 3.2. Calculadora de Presupuestos (`js/budget-calculator.js`)

*   **Estructura del Slider HTML:** Se insertará en `categorias/pcs-gamer.html` y en la home:
    ```html
    <div class="budget-calculator-box">
        <label for="budget-range">¿Cuál es tu presupuesto en ARS?</label>
        <input type="range" id="budget-range" min="600000" max="2500000" step="100000" value="1000000">
        <span id="budget-value">$1.000.000 ARS</span>
        <!-- Lista de componentes dinámicos -->
        <div id="calculator-results"></div>
    </div>
    ```
*   **Algoritmo de Tiers:**
    *   Lee el valor del slider.
    *   Determina si corresponde al Tier Básico ($600k-$850k), Tier Equilibrado ($900k-$1.4M) o Tier Premium ($1.5M-$2.5M).
    *   Renderiza tarjetas para cada pieza con enlaces parametrizados por `data-affiliate` y calcula un porcentaje de uso del presupuesto.

### 3.3. Command Palette (`Ctrl + K` / `js/command-palette.js`)

*   **Overlay Modal:** Estructura en la raíz de cada página:
    ```html
    <div id="command-palette-modal" class="palette-modal" style="display:none;">
        <div class="palette-content">
            <input type="text" id="palette-search-input" placeholder="Buscar guías, productos o componentes...">
            <div id="palette-results"></div>
        </div>
    </div>
    ```
*   **Acciones de Teclado:**
    *   `Ctrl + K` / `Cmd + K` -> Abre/cierra modal.
    *   `Escape` -> Cierra modal.
    *   `ArrowDown` / `ArrowUp` -> Cambia el elemento activo.
    *   `Enter` -> Navega al elemento activo seleccionado.

### 3.4. Comparador de Hardware (`js/product-comparator.js`)

*   **Checkboxes en las Tarjetas:**
    ```html
    <label class="compare-checkbox-label">
        <input type="checkbox" data-compare-id="notebook-asus-tuf" class="compare-checkbox">
        Comparar
    </label>
    ```
*   **Base de datos de comparación:** `js/product-comparator.js` contendrá una lista de especificaciones detalladas para cada clave de producto.
*   **Flujo de Trabajo:**
    *   Almacena las IDs seleccionadas en una lista temporal en memoria.
    *   Valida que todos los elementos de la lista compartan la misma categoría (ej. "Notebooks" o "GPUs"). Si no, lanza un aviso.
    *   Abre una tabla flotante (`id="comparison-modal"`) con columnas comparativas completas.

---

## 4. Plan de Verificación

1.  **Compatibilidad Responsive:** Los nuevos paneles flotantes, el slider y la tabla comparativa deben colapsar elegantemente en teléfonos móviles con un ancho de hasta 320px.
2.  **Rendimiento:** Garantizar que el peso total de los nuevos archivos JavaScript comprimidos sea menor a 15 KB combinados, para no comprometer el SEO en Core Web Vitals.
3.  **Accesibilidad:** Soporte para navegación por teclado completo en el Command Palette.
