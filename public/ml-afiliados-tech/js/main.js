/**
 * LÓGICA PRINCIPAL DEL SITIO (MAIN.JS)
 * 
 * Gestiona:
 * 1. Menú móvil (responsive menu)
 * 2. Inyección de enlaces de afiliados y divulgaciones legales
 * 3. Motor de búsqueda en el cliente (JS Buscador)
 * 4. Lazy loading y microinteracciones
 */

// Índice de búsqueda del sitio
const SEARCH_INDEX = [
    // Artículos
    {
        title: "Mejores Notebooks Calidad Precio Argentina",
        url: "/articulos/mejores-notebooks-calidad-precio-argentina.html",
        category: "Notebooks",
        description: "Análisis completo de las notebooks más convenientes en Argentina para estudio, oficina y gaming casual.",
        tags: ["notebook", "laptop", "asus", "lenovo", "hp", "calidad precio", "estudio", "oficina"]
    },
    {
        title: "Qué PC Gamer armar con $1.000.000 de pesos",
        url: "/articulos/que-pc-gamer-armar-con-1-millon-pesos.html",
        category: "PCs Gamer",
        description: "Guía de componentes paso a paso para armar una computadora gamer barata y potente en Argentina.",
        tags: ["pc gamer", "computadora", "presupuesto", "1 millon", "ryzen", "radeon", "armar pc", "hardware"]
    },
    {
        title: "Mejores Auriculares Gamer Económicos",
        url: "/articulos/mejores-auriculares-gamer-economicos.html",
        category: "Auriculares",
        description: "Comparativa y análisis de los auriculares para gaming con mejor sonido y micrófono sin gastar de más.",
        tags: ["auriculares", "headset", "gamer", "barato", "redragon", "hyperx", "jbl", "audio"]
    },
    {
        title: "Mejores Monitores para CS2 (Counter-Strike 2)",
        url: "/articulos/mejores-monitores-para-cs2.html",
        category: "Monitores",
        description: "Monitores gaming de alta frecuencia (144Hz y 240Hz) ideales para jugar competitivamente a CS2 en Argentina.",
        tags: ["monitores", "pantalla", "cs2", "counter strike", "144hz", "240hz", "competitivo", "fps"]
    },
    // Categorías
    {
        title: "Notebooks y Laptops",
        url: "/categorias/notebooks.html",
        category: "Categoría",
        description: "Reviews, guías de compra y ofertas en notebooks de alto rendimiento y portátiles de estudio.",
        tags: ["notebooks", "laptops", "computadoras portatiles"]
    },
    {
        title: "PCs Gamer Completas",
        url: "/categorias/pcs-gamer.html",
        category: "Categoría",
        description: "Comparativas y presupuestos para computadoras de escritorio gaming y setups de hardware.",
        tags: ["pcs gamer", "computadoras armadas", "setups"]
    },
    {
        title: "Procesadores (CPUs)",
        url: "/categorias/procesadores.html",
        category: "Categoría",
        description: "Encuentra el mejor procesador AMD Ryzen o Intel Core para potenciar tu computadora.",
        tags: ["procesadores", "cpu", "intel", "amd", "ryzen"]
    },
    {
        title: "Placas de Video (GPUs)",
        url: "/categorias/placas-de-video.html",
        category: "Categoría",
        description: "Análisis de placas de video Nvidia GeForce y AMD Radeon al mejor precio de Argentina.",
        tags: ["placas de video", "gpu", "tarjetas graficas", "nvidia", "amd", "rtx", "rx"]
    },
    {
        title: "Monitores Gaming",
        url: "/categorias/monitores.html",
        category: "Categoría",
        description: "Pantallas de alta tasa de refresco (Hz) y tiempos de respuesta mínimos para jugar.",
        tags: ["monitores", "pantallas", "gamer", "144hz", "240hz"]
    },
    {
        title: "Teclados Mecánicos",
        url: "/categorias/teclados.html",
        category: "Categoría",
        description: "Los teclados gamer mecánicos y de membrana recomendados por su durabilidad y respuesta.",
        tags: ["teclados", "mecanicos", "redragon", "kumara", "hyperx"]
    },
    {
        title: "Mouses Gamer",
        url: "/categorias/mouse-gamer.html",
        category: "Categoría",
        description: "Ratones con sensores ópticos de alta precisión y botones programables para gaming competitivo.",
        tags: ["mouse gamer", "mouses", "raton", "logitech", "razer"]
    },
    {
        title: "Auriculares Gamer",
        url: "/categorias/auriculares.html",
        category: "Categoría",
        description: "Audio inmersivo, sonido envolvente 7.1 y micrófonos con cancelación de ruido.",
        tags: ["auriculares", "headsets", "cascos gamer"]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicializar enlaces de afiliados
    initAffiliateLinks();
    
    // 2. Inicializar menú responsive
    initMobileMenu();
    
    // 3. Inicializar buscador JS
    initSearchEngine();

    // 4. Inyectar divulgación legal en el pie de página o donde corresponda
    initAffiliateDisclosure();
});

/**
 * Recorre todos los elementos con [data-affiliate] y les asigna su respectivo enlace de Mercado Libre
 */
function initAffiliateLinks() {
    const affiliateElements = document.querySelectorAll("[data-affiliate]");
    
    if (typeof AFFILIATE_CONFIG === "undefined") {
        console.warn("Configuración de afiliados (affiliate-config.js) no cargada.");
        return;
    }

    affiliateElements.forEach(el => {
        const productKey = el.getAttribute("data-affiliate");
        let targetUrl = AFFILIATE_CONFIG.products[productKey];

        if (!targetUrl) {
            console.warn(`Producto no encontrado en configuración de afiliados: ${productKey}`);
            targetUrl = AFFILIATE_CONFIG.settings.defaultFallbackUrl;
        }

        // Si es un elemento de enlace <a>, seteamos href y propiedades de seguridad/SEO
        if (el.tagName.toLowerCase() === "a") {
            el.setAttribute("href", targetUrl);
            
            if (AFFILIATE_CONFIG.settings.openInNewTab) {
                el.setAttribute("target", "_blank");
            }
            if (AFFILIATE_CONFIG.settings.addNoFollow) {
                el.setAttribute("rel", "noopener noreferrer nofollow");
            }
        }
    });
}

/**
 * Muestra el descargo de responsabilidad de afiliados en las áreas destinadas para ello
 */
function initAffiliateDisclosure() {
    const disclosureContainers = document.querySelectorAll(".affiliate-disclosure");
    if (disclosureContainers.length > 0 && typeof AFFILIATE_CONFIG !== "undefined") {
        disclosureContainers.forEach(container => {
            container.innerHTML = `<p class="disclosure-text">⚠️ <strong>Advertencia de Afiliado:</strong> ${AFFILIATE_CONFIG.settings.disclosureText}</p>`;
        });
    }
}

/**
 * Controla el menú hamburguesa móvil
 */
function initMobileMenu() {
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("open");
            
            // Animación de accesibilidad
            const expanded = menuToggle.getAttribute("aria-expanded") === "true" || false;
            menuToggle.setAttribute("aria-expanded", !expanded);
        });

        // Cerrar menú al hacer clic en un link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }
}

/**
 * Lógica del buscador dinámico client-side
 */
function initSearchEngine() {
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    
    if (!searchInput || !searchResults) return;

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.style.display = "none";
            searchResults.innerHTML = "";
            return;
        }

        // Buscar coincidencias
        const filtered = SEARCH_INDEX.filter(item => {
            return item.title.toLowerCase().includes(query) || 
                   item.category.toLowerCase().includes(query) ||
                   item.description.toLowerCase().includes(query) ||
                   item.tags.some(tag => tag.toLowerCase().includes(query));
        });

        renderSearchResults(filtered, query);
    });

    // Cerrar resultados al hacer clic fuera del buscador
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = "none";
        }
    });

    // Mostrar resultados si el input tiene foco y texto
    searchInput.addEventListener("focus", () => {
        if (searchInput.value.trim().length >= 2) {
            searchResults.style.display = "block";
        }
    });
}

/**
 * Renderiza los resultados de búsqueda en la interfaz
 */
function renderSearchResults(results, query) {
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";

    if (results.length === 0) {
        searchResults.innerHTML = `<div class="search-no-results">No se encontraron resultados para "<strong>${escapeHtml(query)}</strong>"</div>`;
        searchResults.style.display = "block";
        return;
    }

    const list = document.createElement("ul");
    list.className = "search-results-list";

    results.forEach(item => {
        const li = document.createElement("li");
        li.className = "search-result-item";
        
        // Determinar icono por categoría
        let categoryIcon = "📄";
        if (item.category === "Categoría") categoryIcon = "📂";

        // Corregir rutas relativas dependiendo de si estamos en la raíz o subdirectorios
        const pathPrefix = window.location.pathname.includes("/articulos/") || window.location.pathname.includes("/categorias/") ? ".." : "";
        const finalUrl = pathPrefix ? `${pathPrefix}${item.url}` : item.url;

        li.innerHTML = `
            <a href="${finalUrl}">
                <div class="result-meta">
                    <span class="result-category">${categoryIcon} ${item.category}</span>
                </div>
                <div class="result-title">${highlightMatch(item.title, query)}</div>
                <div class="result-desc">${escapeHtml(item.description)}</div>
            </a>
        `;
        list.appendChild(li);
    });

    searchResults.appendChild(list);
    searchResults.style.display = "block";
}

/**
 * Resalta el texto que coincide con la búsqueda
 */
function highlightMatch(text, query) {
    const idx = text.toLowerCase().indexOf(query);
    if (idx >= 0) {
        return text.substring(0, idx) + 
               `<mark class="search-highlight">${text.substring(idx, idx + query.length)}</mark>` + 
               text.substring(idx + query.length);
    }
    return escapeHtml(text);
}

/**
 * Escapa HTML para prevenir XSS básico
 */
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
