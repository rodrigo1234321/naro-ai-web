/**
 * MOTOR DE PALETA DE COMANDOS (COMMAND-PALETTE.JS)
 * 
 * Atajo Ctrl + K para abrir un buscador flotante Spotlight interactivo.
 * Soporta navegación completa por teclado.
 */

(function () {
    let activeIndex = -1;
    let matchingElements = [];
    
    // Índice extendido con productos individuales para la paleta de comandos
    const PRODUCT_INDEX = [
        { title: "ASUS TUF Gaming F15 (Notebook)", url: "/categorias/notebooks.html", category: "Producto", description: "Notebook Gamer con CPU Core i5 y GPU RTX 3050.", tags: ["laptop", "asus", "tuf", "gamer"] },
        { title: "AMD Radeon RX 6600 8GB (GPU)", url: "/categorias/placas-de-video.html", category: "Producto", description: "Placa de video con excelente rendimiento 1080p y bajo consumo.", tags: ["placa de video", "gpu", "amd", "radeon", "rx6600"] },
        { title: "Redragon Kumara K552 (Teclado)", url: "/categorias/teclados.html", category: "Producto", description: "Teclado mecánico TKL super robusto e iluminado.", tags: ["teclado", "mecanico", "redragon", "kumara"] },
        { title: "LG UltraGear 24\" 144Hz (Monitor)", url: "/categorias/monitores.html", category: "Producto", description: "Pantalla gamer IPS de 1ms de tiempo de respuesta.", opacity: 1, tags: ["monitor", "pantalla", "lg", "144hz"] },
        { title: "Logitech G203 Lightsync (Mouse)", url: "/categorias/mouse-gamer.html", category: "Producto", description: "Mouse óptico de alta precisión con luces RGB.", tags: ["mouse", "raton", "logitech", "g203"] }
    ];

    document.addEventListener("DOMContentLoaded", () => {
        createCommandPaletteMarkup();
        registerPaletteEvents();
    });

    /**
     * Inyecta la estructura HTML del modal en el final del body
     */
    function createCommandPaletteMarkup() {
        if (document.getElementById("command-palette")) return;

        const backdrop = document.createElement("div");
        backdrop.id = "command-palette";
        backdrop.className = "command-palette-backdrop";
        backdrop.style.display = "none";
        
        backdrop.innerHTML = `
            <div class="command-palette-box">
                <div class="palette-search-wrapper">
                    <span class="palette-search-icon">🔍</span>
                    <input type="text" id="palette-search-input" class="palette-search-field" autocomplete="off" placeholder="Buscar guías, componentes o categorías..." aria-label="Buscar en el sitio">
                    <span class="palette-instructions">Esc para cerrar</span>
                </div>
                <div id="palette-results" class="palette-results-container" style="display: none;"></div>
            </div>
        `;

        document.body.appendChild(backdrop);
    }

    /**
     * Registra los manejadores de eventos
     */
    function registerPaletteEvents() {
        const backdrop = document.getElementById("command-palette");
        const searchInput = document.getElementById("palette-search-input");
        const navSearch = document.getElementById("search-input");

        if (!backdrop || !searchInput) return;

        // 1. Escuchar atajo global Ctrl + K / Cmd + K y Esc
        document.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                toggleCommandPalette();
            }
            if (e.key === "Escape" && backdrop.style.display === "flex") {
                closeCommandPalette();
            }
        });

        // 2. Al hacer click en el buscador de la cabecera, redirigir abriendo la paleta
        if (navSearch) {
            navSearch.addEventListener("focus", (e) => {
                e.preventDefault();
                navSearch.blur();
                toggleCommandPalette();
            });
        }

        // 3. Cerrar al hacer click fuera del cuadro
        backdrop.addEventListener("click", (e) => {
            if (e.target === backdrop) {
                closeCommandPalette();
            }
        });

        // 4. Lógica de búsqueda interactiva
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            handleSearchQuery(query);
        });

        // 5. Navegación por teclado (Flechas y Enter)
        searchInput.addEventListener("keydown", (e) => {
            if (matchingElements.length === 0) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                changeActiveIndex(1);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                changeActiveIndex(-1);
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (activeIndex >= 0 && activeIndex < matchingElements.length) {
                    const activeLink = matchingElements[activeIndex].querySelector("a");
                    if (activeLink) activeLink.click();
                }
            }
        });
    }

    /**
     * Alterna la visibilidad de la paleta
     */
    function toggleCommandPalette() {
        const backdrop = document.getElementById("command-palette");
        const searchInput = document.getElementById("palette-search-input");
        const results = document.getElementById("palette-results");

        if (!backdrop) return;

        if (backdrop.style.display === "none") {
            backdrop.style.display = "flex";
            document.body.style.overflow = "hidden"; // Detener scroll de fondo
            setTimeout(() => {
                searchInput.value = "";
                results.innerHTML = "";
                results.style.display = "none";
                searchInput.focus();
            }, 50);
        } else {
            closeCommandPalette();
        }
    }

    function closeCommandPalette() {
        const backdrop = document.getElementById("command-palette");
        if (backdrop) {
            backdrop.style.display = "none";
            document.body.style.overflow = "";
            activeIndex = -1;
            matchingElements = [];
        }
    }

    /**
     * Procesa la consulta de búsqueda y actualiza los resultados
     */
    function handleSearchQuery(query) {
        const resultsBox = document.getElementById("palette-results");
        if (!resultsBox) return;

        if (query.length < 2) {
            resultsBox.style.display = "none";
            resultsBox.innerHTML = "";
            matchingElements = [];
            activeIndex = -1;
            return;
        }

        // Combinar índice general de main.js con el índice de productos locales
        let fullIndex = [];
        if (typeof SEARCH_INDEX !== "undefined") {
            fullIndex = [...SEARCH_INDEX, ...PRODUCT_INDEX];
        } else {
            fullIndex = [...PRODUCT_INDEX];
        }

        // Filtrar coincidencias
        const filtered = fullIndex.filter(item => {
            return item.title.toLowerCase().includes(query) ||
                   item.category.toLowerCase().includes(query) ||
                   item.description.toLowerCase().includes(query) ||
                   (item.tags && item.tags.some(t => t.toLowerCase().includes(query)));
        });

        renderPaletteResults(filtered, query);
    }

    /**
     * Renderiza los resultados clasificados por tipo
     */
    function renderPaletteResults(results, query) {
        const resultsBox = document.getElementById("palette-results");
        resultsBox.innerHTML = "";
        activeIndex = -1;
        matchingElements = [];

        if (results.length === 0) {
            resultsBox.innerHTML = `<div class="search-no-results">No se encontraron resultados para "<strong>${escapeHtml(query)}</strong>"</div>`;
            resultsBox.style.display = "block";
            return;
        }

        // Separar resultados por grupos
        const groups = {
            "Artículos y Comparativas": [],
            "Categorías del Sitio": [],
            "Hardware Recomendado": []
        };

        results.forEach(item => {
            if (item.category === "Categoría") {
                groups["Categorías del Sitio"].push(item);
            } else if (item.category === "Producto") {
                groups["Hardware Recomendado"].push(item);
            } else {
                groups["Artículos y Comparativas"].push(item);
            }
        });

        // Renderizar los grupos
        for (const [title, list] of Object.entries(groups)) {
            if (list.length === 0) continue;

            const section = document.createElement("div");
            section.className = "palette-group-section";
            section.innerHTML = `<div class="palette-group-title">${title}</div>`;
            
            const ul = document.createElement("ul");
            
            list.forEach(item => {
                const li = document.createElement("li");
                li.className = "palette-result-item";
                
                // Iconos vectoriales
                let icon = "📄";
                if (item.category === "Categoría") icon = "📂";
                else if (item.category === "Producto") icon = "⚙️";

                // Formatear enlaces relativos
                const pathPrefix = window.location.pathname.includes("/articulos/") || window.location.pathname.includes("/categorias/") ? ".." : "";
                const finalUrl = pathPrefix ? `${pathPrefix}${item.url}` : item.url;

                li.innerHTML = `
                    <a href="${finalUrl}">
                        <span class="palette-result-icon">${icon}</span>
                        <div class="palette-result-info">
                            <div class="result-title">${highlightMatch(item.title, query)}</div>
                            <div class="palette-result-description">${escapeHtml(item.description)}</div>
                        </div>
                    </a>
                `;
                
                ul.appendChild(li);
                matchingElements.push(li); // Registrar en lista de navegación por teclado
            });

            section.appendChild(ul);
            resultsBox.appendChild(section);
        }

        resultsBox.style.display = "block";
    }

    /**
     * Navegación visual mediante flechas
     */
    function changeActiveIndex(direction) {
        if (matchingElements.length === 0) return;

        // Remover activa anterior
        if (activeIndex >= 0 && activeIndex < matchingElements.length) {
            matchingElements[activeIndex].classList.remove("active");
        }

        activeIndex += direction;

        // Rotación de índices
        if (activeIndex >= matchingElements.length) activeIndex = 0;
        if (activeIndex < 0) activeIndex = matchingElements.length - 1;

        // Agregar activa
        matchingElements[activeIndex].classList.add("active");
        
        // Hacer scroll automático al elemento si sale de pantalla
        matchingElements[activeIndex].scrollIntoView({ block: "nearest" });
    }

    // Funciones utilitarias copiadas para independencia
    function highlightMatch(text, query) {
        const idx = text.toLowerCase().indexOf(query);
        if (idx >= 0) {
            return text.substring(0, idx) + 
                   `<mark class="search-highlight">${text.substring(idx, idx + query.length)}</mark>` + 
                   text.substring(idx + query.length);
        }
        return escapeHtml(text);
    }

    function escapeHtml(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
})();
