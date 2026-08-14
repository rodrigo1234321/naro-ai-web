/**
 * COMPARADOR DINÁMICO DE HARDWARE (PRODUCT-COMPARATOR.JS)
 * 
 * Permite comparar especificaciones técnicas de productos
 * dentro de la misma categoría.
 */

// Base de datos de comparación
const COMPARATOR_DB = {
    // Notebooks
    "notebook-asus-tuf": {
        name: "ASUS TUF Gaming F15",
        category: "Notebooks",
        imageIcon: "💻",
        highlight: "Ideal para gaming de entrada y diseño gráfico pesado.",
        specs: {
            "Procesador": "Intel Core i5-11400H / 12500H",
            "Gráficos (GPU)": "Nvidia GeForce RTX 3050 4GB",
            "Memoria RAM": "8GB / 16GB DDR4 (Expandible)",
            "Pantalla": "15.6\" IPS Full HD 144Hz",
            "Almacenamiento": "512GB SSD NVMe M.2",
            "Batería": "48 Wh (Baja duración bajo carga)",
            "Peso": "2.30 Kg"
        }
    },
    "notebook-lenovo-ideapad": {
        name: "Lenovo IdeaPad 1",
        category: "Notebooks",
        imageIcon: "💻",
        highlight: "Excelente costo para estudiantes y tareas escolares cotidianas.",
        specs: {
            "Procesador": "Intel Celeron / Pentium / Ryzen 3",
            "Gráficos (GPU)": "Gráficos Integrados Intel UHD / Radeon",
            "Memoria RAM": "4GB / 8GB DDR4",
            "Pantalla": "14\" HD Antirreflejo",
            "Almacenamiento": "128GB / 256GB SSD",
            "Batería": "42 Wh (Larga duración, uso básico)",
            "Peso": "1.40 Kg"
        }
    },
    "notebook-hp-15": {
        name: "HP 15-FC Ryzen 5",
        category: "Notebooks",
        imageIcon: "💻",
        highlight: "El mejor equilibrio para oficina, programación y multitarea.",
        specs: {
            "Procesador": "AMD Ryzen 5 7520U",
            "Gráficos (GPU)": "AMD Radeon 610M (Integrada)",
            "Memoria RAM": "8GB / 16GB LPDDR5 (Soldada)",
            "Pantalla": "15.6\" IPS Full HD",
            "Almacenamiento": "512GB SSD NVMe M.2",
            "Batería": "41 Wh (Buena autonomía)",
            "Peso": "1.59 Kg"
        }
    },

    // GPUs
    "gpu-rx-6600": {
        name: "AMD Radeon RX 6600 8GB",
        category: "Placas de Video",
        imageIcon: "🎮",
        highlight: "La mejor relación FPS por peso invertido en 1080p.",
        specs: {
            "VRAM": "8GB GDDR6",
            "Interfaz": "128-bit",
            "Consumo (TDP)": "132W (Requiere Fuente 500W+)",
            "Tecnología Clave": "FSR 2.0 / PCIe 4.0",
            "Rendimiento CS2": "~180-240 FPS (Calidad competitiva)"
        }
    },
    "gpu-rtx-3060": {
        name: "Nvidia GeForce RTX 3060 12GB",
        category: "Placas de Video",
        imageIcon: "🎮",
        highlight: "Ideal para creadores de contenido por sus 12GB de VRAM.",
        specs: {
            "VRAM": "12GB GDDR6",
            "Interfaz": "192-bit",
            "Consumo (TDP)": "170W (Requiere Fuente 550W+)",
            "Tecnología Clave": "DLSS 2.0 / Ray Tracing Completo",
            "Rendimiento CS2": "~200-260 FPS (Calidad competitiva)"
        }
    },
    "gpu-rtx-4060": {
        name: "Nvidia GeForce RTX 4060 8GB",
        category: "Placas de Video",
        imageIcon: "🎮",
        highlight: "Arquitectura moderna con Frame Generation para ganar FPS.",
        specs: {
            "VRAM": "8GB GDDR6",
            "Interfaz": "128-bit",
            "Consumo (TDP)": "115W (Consumo ultra bajo, Fuente 500W+)",
            "Tecnología Clave": "DLSS 3.0 / Frame Generator",
            "Rendimiento CS2": "~240-300 FPS (Calidad competitiva)"
        }
    },

    // Auriculares
    "auricular-jbl-quantum-100": {
        name: "JBL Quantum 100",
        category: "Auriculares",
        imageIcon: "🎧",
        highlight: "Firma de audio balanceada y micrófono extraíble.",
        specs: {
            "Tipo": "Over-Ear (Circumaural)",
            "Conexión": "Jack 3.5 mm (Universal)",
            "Micrófono": "Desmontable / Flexible",
            "Aislación": "Pasiva estándar",
            "Peso": "220g (Muy liviano)"
        }
    },
    "auricular-hyperx-cloud-stinger": {
        name: "HyperX Cloud Stinger 2",
        category: "Auriculares",
        imageIcon: "🎧",
        highlight: "Comodidad legendaria de HyperX y muteo rápido.",
        specs: {
            "Tipo": "Over-Ear (Circumaural)",
            "Conexión": "Jack 3.5 mm (Splitter incluido)",
            "Micrófono": "Girable para silenciar (Flip-to-mute)",
            "Aislación": "Pasiva de buena densidad",
            "Peso": "275g"
        }
    },
    "auricular-redragon-zeus": {
        name: "Redragon Zeus H510 RGB",
        category: "Auriculares",
        imageIcon: "🎧",
        highlight: "Muy resistente (estructura metálica) y cables extraíbles.",
        specs: {
            "Tipo": "Over-Ear (Circumaural)",
            "Conexión": "USB (Placa integrada 7.1) y Jack 3.5 mm",
            "Micrófono": "Flexible desmontable con filtro",
            "Aislación": "Pasiva alta (Cuerina gruesa)",
            "Peso": "330g"
        }
    },

    // Monitores
    "monitor-samsung-24-75hz": {
        name: "Samsung F350 24\"",
        category: "Monitores",
        imageIcon: "📺",
        highlight: "Económico para oficina o gaming casual sin altas pretensiones.",
        specs: {
            "Tasa de Refresco": "75 Hz",
            "Tipo de Panel": "PLS (Colores estables)",
            "Tiempo de Respuesta": "4 ms (Gtg)",
            "Resolución": "Full HD (1920x1080)",
            "Soporte ajustable": "Solo inclinación"
        }
    },
    "monitor-lg-24-144hz": {
        name: "LG UltraGear 24GN600",
        category: "Monitores",
        imageIcon: "📺",
        highlight: "El estándar de oro para Esports por su velocidad real.",
        specs: {
            "Tasa de Refresco": "144 Hz",
            "Tipo de Panel": "IPS (Ángulo amplio y colores vivos)",
            "Tiempo de Respuesta": "1 ms reales (GtG)",
            "Resolución": "Full HD (1920x1080)",
            "Soporte ajustable": "Solo inclinación"
        }
    },
    "monitor-asus-tuf-165hz": {
        name: "ASUS TUF VG249Q1A",
        category: "Monitores",
        imageIcon: "📺",
        highlight: "Un extra de Hz y filtros avanzados para cuidar la vista.",
        specs: {
            "Tasa de Refresco": "165 Hz (Overclock)",
            "Tipo de Panel": "IPS",
            "Tiempo de Respuesta": "1 ms MPRT",
            "Resolución": "Full HD (1920x1080)",
            "Soporte ajustable": "Solo inclinación"
        }
    }
};

(function () {
    let selectedProducts = [];

    document.addEventListener("DOMContentLoaded", () => {
        injectCompareCheckboxes();
        createCompareBarMarkup();
        createCompareModalMarkup();
        listenCheckboxChanges();
    });

    /**
     * Busca las tarjetas de producto e inyecta dinámicamente el checkbox 'Comparar'
     */
    function injectCompareCheckboxes() {
        const cards = document.querySelectorAll(".product-card");
        
        cards.forEach(card => {
            const affiliateLink = card.querySelector("[data-affiliate]");
            if (!affiliateLink) return;

            const productKey = affiliateLink.getAttribute("data-affiliate");
            
            // Verificar si el producto existe en la base de datos de comparación
            if (!COMPARATOR_DB[productKey]) return;

            // Inyectar el checkbox en el área de info
            const infoWrap = card.querySelector(".product-info-wrap");
            if (infoWrap) {
                const label = document.createElement("label");
                label.className = "compare-checkbox-wrapper";
                label.innerHTML = `
                    <input type="checkbox" value="${productKey}" class="compare-checkbox-input">
                    <span>Comparar</span>
                `;
                
                // Insertar justo antes del footer de la tarjeta
                const footer = card.querySelector(".product-card-footer");
                if (footer) {
                    infoWrap.insertBefore(label, footer);
                } else {
                    infoWrap.appendChild(label);
                }
            }
        });
    }

    /**
     * Inyecta la barra flotante inferior en el DOM
     */
    function createCompareBarMarkup() {
        if (document.getElementById("compare-floating-bar")) return;

        const bar = document.createElement("div");
        bar.id = "compare-floating-bar";
        bar.className = "compare-floating-bar";
        
        bar.innerHTML = `
            <div class="compare-bar-info">
                ⚖️ Seleccionados: <span id="compare-count">0</span>/2
            </div>
            <div class="compare-bar-actions">
                <button type="button" id="compare-btn-clear" class="compare-btn-clear">Limpiar</button>
                <button type="button" id="compare-btn-submit" class="cta-button" style="padding: 8px 16px; font-size: 0.85rem;">Comparar ahora</button>
            </div>
        `;

        document.body.appendChild(bar);

        // Eventos de la barra
        document.getElementById("compare-btn-clear").addEventListener("click", clearSelection);
        document.getElementById("compare-btn-submit").addEventListener("click", openComparisonModal);
    }

    /**
     * Inyecta el modal contenedor para la tabla comparativa
     */
    function createCompareModalMarkup() {
        if (document.getElementById("comparator-modal")) return;

        const modal = document.createElement("div");
        modal.id = "comparator-modal";
        modal.className = "comparator-modal-backdrop";
        modal.style.display = "none";

        modal.innerHTML = `
            <div class="comparator-modal-box">
                <div class="comparator-modal-header">
                    <h3 class="comparator-modal-title">Comparador de Hardware ⚖️</h3>
                    <button type="button" id="comparator-close" class="comparator-close-btn">&times;</button>
                </div>
                <div id="comparator-modal-body" class="comparator-modal-body">
                    <!-- Tabla generada dinámicamente -->
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Cerrar modal
        document.getElementById("comparator-close").addEventListener("click", closeComparisonModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeComparisonModal();
        });
    }

    /**
     * Escucha cambios en las casillas de verificación
     */
    function listenCheckboxChanges() {
        document.addEventListener("change", (e) => {
            if (!e.target.classList.contains("compare-checkbox-input")) return;

            const checkbox = e.target;
            const productKey = checkbox.value;

            if (checkbox.checked) {
                // Validar límite (máximo 2 productos para comparación side-by-side limpia)
                if (selectedProducts.length >= 2) {
                    checkbox.checked = false;
                    alert("Solo puedes comparar hasta 2 productos a la vez.");
                    return;
                }

                // Validar misma categoría
                if (selectedProducts.length > 0) {
                    const firstProduct = COMPARATOR_DB[selectedProducts[0]];
                    const newProduct = COMPARATOR_DB[productKey];

                    if (firstProduct.category !== newProduct.category) {
                        checkbox.checked = false;
                        alert(`Solo puedes comparar productos de la misma categoría. Estás intentando comparar un artículo de "${newProduct.category}" con uno de "${firstProduct.category}".`);
                        return;
                    }
                }

                selectedProducts.push(productKey);
            } else {
                selectedProducts = selectedProducts.filter(id => id !== productKey);
            }

            updateCompareBar();
        });
    }

    /**
     * Actualiza el estado visual de la barra flotante
     */
    function updateCompareBar() {
        const bar = document.getElementById("compare-floating-bar");
        const countSpan = document.getElementById("compare-count");

        if (!bar || !countSpan) return;

        countSpan.textContent = selectedProducts.length;

        if (selectedProducts.length > 0) {
            bar.classList.add("active");
        } else {
            bar.classList.remove("active");
        }
    }

    /**
     * Limpia todas las selecciones
     */
    function clearSelection() {
        selectedProducts = [];
        
        // Desmarcar todos los checkboxes
        const checkboxes = document.querySelectorAll(".compare-checkbox-input");
        checkboxes.forEach(cb => cb.checked = false);

        updateCompareBar();
    }

    /**
     * Abre el modal y renderiza la tabla comparativa
     */
    function openComparisonModal() {
        const modal = document.getElementById("comparator-modal");
        const body = document.getElementById("comparator-modal-body");

        if (!modal || !body) return;

        if (selectedProducts.length < 2) {
            alert("Selecciona 2 productos para poder compararlos.");
            return;
        }

        const prodA = COMPARATOR_DB[selectedProducts[0]];
        const prodB = COMPARATOR_DB[selectedProducts[1]];

        // Obtener todas las especificaciones únicas disponibles
        const allSpecKeys = Array.from(new Set([
            ...Object.keys(prodA.specs),
            ...Object.keys(prodB.specs)
        ]));

        // Generar la tabla comparativa
        let tableHtml = `
            <table class="comparator-table">
                <thead>
                    <tr>
                        <th>Características</th>
                        <th>
                            <div style="font-size: 1.5rem; margin-bottom: 5px;">${prodA.imageIcon}</div>
                            <strong>${prodA.name}</strong>
                            <div style="margin-top: 10px;">
                                <a href="#" data-affiliate="${selectedProducts[0]}" class="cta-button" style="padding: 6px 12px; font-size: 0.8rem;">Ver en ML ↗</a>
                            </div>
                        </th>
                        <th>
                            <div style="font-size: 1.5rem; margin-bottom: 5px;">${prodB.imageIcon}</div>
                            <strong>${prodB.name}</strong>
                            <div style="margin-top: 10px;">
                                <a href="#" data-affiliate="${selectedProducts[1]}" class="cta-button" style="padding: 6px 12px; font-size: 0.8rem;">Ver en ML ↗</a>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="comparator-feature-name">Ventaja Clave</td>
                        <td style="color: var(--color-primary); font-weight: 600;">${prodA.highlight}</td>
                        <td style="color: var(--color-primary); font-weight: 600;">${prodB.highlight}</td>
                    </tr>
        `;

        // Renderizar especificaciones
        allSpecKeys.forEach(spec => {
            const valA = prodA.specs[spec] || "-";
            const valB = prodB.specs[spec] || "-";
            tableHtml += `
                <tr>
                    <td class="comparator-feature-name">${spec}</td>
                    <td>${valA}</td>
                    <td>${valB}</td>
                </tr>
            `;
        });

        tableHtml += `
                </tbody>
            </table>
        `;

        body.innerHTML = tableHtml;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Desactivar scroll fondo

        // Inicializar enlaces de afiliado dinámicos del comparador
        if (typeof initAffiliateLinks === "function") {
            initAffiliateLinks();
        }
    }

    function closeComparisonModal() {
        const modal = document.getElementById("comparator-modal");
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = ""; // Reactivar scroll
        }
    }
})();
