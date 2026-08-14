/**
 * CALCULADORA DE PRESUPUESTOS DE PC GAMER (BUDGET-CALCULATOR.JS)
 * 
 * Lógica interactiva para calcular un setup gamer equilibrado
 * según el presupuesto en pesos argentinos.
 */

document.addEventListener("DOMContentLoaded", () => {
    initBudgetCalculator();
});

// Base de datos de componentes
const HARDWARE_DB = {
    tiers: {
        basico: {
            name: "Tier Básico (Gaming de Entrada)",
            desc: "Ideal para juegos Esports (League of Legends, Valorant, CS2 en gráficos competitivos) y tareas generales.",
            targetMin: 600000,
            targetMax: 900000,
            components: [
                { type: "Procesador (CPU)", name: "AMD Ryzen 5 4600G (Gráficos Integrados)", affiliateKey: "cpu-ryzen-5-5600", desc: "6 núcleos, 12 hilos con placa de video Radeon Vega integrada (no requiere GPU dedicada)." },
                { type: "Placa Madre", name: "Motherboard Gigabyte A520M", affiliateKey: "mother-b550", desc: "Socket AM4 con ranura M.2, ideal para procesadores Ryzen G." },
                { type: "Memoria RAM", name: "16GB DDR4 (2x8GB) Kingston Fury 3200MHz", affiliateKey: "ram-16gb-kingston", desc: "Dual Channel para activar el máximo rendimiento de los gráficos integrados." },
                { type: "Almacenamiento", name: "SSD 480GB Kingston A400 SATA", affiliateKey: "ssd-1tb-kingston", desc: "Arranque veloz de Windows y programas cotidianos." },
                { type: "Fuente de Poder", name: "Redragon RGPS 500W / 550W 80+ Bronze", affiliateKey: "fuente-650w-bronze", desc: "Eficiencia energética certificada para asegurar tu inversión." },
                { type: "Gabinete", name: "Gabinete Kit con Coolers básicos", affiliateKey: "gabinete-gamer", desc: "Flujo de aire estándar y diseño clásico de escritorio." }
            ]
        },
        equilibrado: {
            name: "Tier Equilibrado (1080p Ultra)",
            desc: "El punto dulce. Corre juegos AAA modernos en 1080p en calidad Ultra superando los 60 FPS estables.",
            targetMin: 900000,
            targetMax: 1500000,
            components: [
                { type: "Procesador (CPU)", name: "AMD Ryzen 5 5600 3.5GHz", affiliateKey: "cpu-ryzen-5-5600", desc: "El mejor procesador precio-rendimiento para gaming puro, 32MB de Caché L3." },
                { type: "Placa de Video (GPU)", name: "AMD Radeon RX 6600 8GB GDDR6", affiliateKey: "gpu-rx-6600", desc: "Rey de los 1080p, excelente tasa de FPS con bajísimo consumo de energía." },
                { type: "Placa Madre", name: "Motherboard Gigabyte B550M-K", affiliateKey: "mother-b550", desc: "Soporte nativo para PCIe 4.0 (ancho de banda completo para GPU y SSD)." },
                { type: "Memoria RAM", name: "16GB DDR4 (2x8GB) Kingston Fury 3200MHz", affiliateKey: "ram-16gb-kingston", desc: "Capacidad recomendada para multitarea y fluidez en juegos modernos." },
                { type: "Almacenamiento", name: "SSD 1TB Kingston NV2 NVMe M.2", affiliateKey: "ssd-1tb-kingston", desc: "Carga de juegos y mapas ultra rápida con lectura de 3500MB/s." },
                { type: "Fuente de Poder", name: "Redragon RGPS 600W / 650W 80+ Bronze", affiliateKey: "fuente-650w-bronze", desc: "Protección de componentes certificada y potencia holgada para ampliaciones." },
                { type: "Gabinete", name: "Gabinete Gamer Redragon Gazer Mesh", affiliateKey: "gabinete-gamer", desc: "Frente mallado (Mesh) y ventiladores RGB para un flujo de aire óptimo." }
            ]
        },
        avanzado: {
            name: "Tier Avanzado (1440p / FPS Competitivos)",
            desc: "Potencia de sobra para streamear, editar o jugar a alta tasa de refresco (144Hz+) o resolución 1440p.",
            targetMin: 1500000,
            targetMax: 2500000,
            components: [
                { type: "Procesador (CPU)", name: "AMD Ryzen 7 5700X o Intel i5-12400F", affiliateKey: "cpu-ryzen-7-5700x", desc: "Procesador multihilo robusto para tareas pesadas y streaming." },
                { type: "Placa de Video (GPU)", name: "Nvidia GeForce RTX 4060 8GB GDDR6", affiliateKey: "gpu-rtx-4060", desc: "Arquitectura Ada Lovelace, soporte de DLSS 3.0 Frame Generation y trazado de rayos." },
                { type: "Placa Madre", name: "Motherboard Gigabyte B550M / B760", affiliateKey: "mother-b550", desc: "Soporte de alta gama con ranuras M.2 disipadas." },
                { type: "Memoria RAM", name: "32GB DDR4 (2x16GB) Kingston Fury 3200MHz", affiliateKey: "ram-16gb-kingston", desc: "Capacidad ideal para edición de video pesada, simuladores y renderizado." },
                { type: "Almacenamiento", name: "SSD 1TB High-Speed NVMe M.2", affiliateKey: "ssd-1tb-kingston", desc: "Almacenamiento de primer nivel para juegos exigentes." },
                { type: "Fuente de Poder", name: "Redragon RGPS 650W 80+ Bronze / Gold", affiliateKey: "fuente-650w-bronze", desc: "Seguridad y certificación de alta gama." },
                { type: "Gabinete", name: "Gabinete Gamer Premium Mesh con RGB", affiliateKey: "gabinete-gamer", desc: "Espacio amplio y excelente refrigeración." }
            ]
        }
    }
};

function initBudgetCalculator() {
    const container = document.getElementById("budget-calculator-container");
    if (!container) return;

    // Crear la estructura de la calculadora
    container.innerHTML = `
        <div class="budget-calculator-box">
            <div class="calc-header">
                <div class="slider-container">
                    <label for="budget-slider" style="font-family: var(--font-title); font-weight: 700; font-size: 1.1rem; color: var(--text-primary);">Ajustá tu Presupuesto:</label>
                    <input type="range" id="budget-slider" class="budget-slider" min="600000" max="2500000" step="50000" value="1200000">
                </div>
                <div style="text-align: right;">
                    <div id="budget-display" class="budget-badge-display">$1.200.000</div>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">Pesos Argentinos (ARS)</span>
                </div>
            </div>

            <div class="calc-header" style="margin-bottom: 2rem; border-top: 1px dashed var(--border-color); padding-top: 1.5rem;">
                <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-secondary);">Accesos Rápidos:</span>
                <div class="budget-preset-group">
                    <button type="button" class="preset-btn" data-preset="750000">PC Básico (~$750k)</button>
                    <button type="button" class="preset-btn active" data-preset="1200000">PC Equilibrado (~$1.2M)</button>
                    <button type="button" class="preset-btn" data-preset="1800000">PC Avanzado (~$1.8M)</button>
                </div>
            </div>

            <div class="calc-setup-meta">
                <div>
                    <div id="setup-tier-title" class="setup-tier-info">Cargando Tier...</div>
                    <div id="setup-tier-desc" class="setup-tier-desc">Cargando descripción...</div>
                </div>
                <div class="calculator-actions">
                    <button type="button" id="btn-copy-setup" class="calc-secondary-btn">
                        📋 Copiar Componentes
                    </button>
                </div>
            </div>

            <!-- Grilla de componentes recomendados -->
            <div id="calculator-results-grid" class="products-grid">
                <!-- Se inyecta con JS -->
            </div>
        </div>
    `;

    const slider = document.getElementById("budget-slider");
    const display = document.getElementById("budget-display");
    const presetButtons = document.querySelectorAll(".preset-btn");
    const copyButton = document.getElementById("btn-copy-setup");

    // Evento del slider
    slider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        updateCalculatorView(val);
        updatePresetActiveState(val);
    });

    // Evento de los botones de preajustes
    presetButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const presetVal = parseInt(btn.getAttribute("data-preset"));
            slider.value = presetVal;
            updateCalculatorView(presetVal);
            
            // Remover active de todos y dar a este
            presetButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // Copiar setup al portapapeles
    copyButton.addEventListener("click", () => {
        const currentVal = parseInt(slider.value);
        const tier = getTierByBudget(currentVal);
        const data = HARDWARE_DB.tiers[tier];
        
        let text = `--- PRESUPUESTO PC GAMER RECOMENDADO ($${formatPrice(currentVal)} ARS) ---\n`;
        text += `Configuración: ${data.name}\n`;
        text += `${data.desc}\n\n`;
        
        data.components.forEach((c, idx) => {
            text += `${idx + 1}. [${c.type}] ${c.name}\n`;
        });
        
        text += `\nGenerado por TechAfiliados Argentina. Compra segura en Mercado Libre.`;
        
        navigator.clipboard.writeText(text).then(() => {
            const prevText = copyButton.innerHTML;
            copyButton.innerHTML = "✓ ¡Copiado con éxito!";
            setTimeout(() => {
                copyButton.innerHTML = prevText;
            }, 2000);
        }).catch(err => {
            console.error("Error al copiar setup: ", err);
        });
    });

    // Inicializar por defecto
    updateCalculatorView(1200000);
}

/**
 * Obtiene la categoría (tier) según el presupuesto
 */
function getTierByBudget(budget) {
    if (budget < 900000) return "basico";
    if (budget < 1500000) return "equilibrado";
    return "avanzado";
}

/**
 * Formatea número a pesos con punto separador de miles
 */
function formatPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Setea la clase active de preajustes de forma visual
 */
function updatePresetActiveState(val) {
    const presetButtons = document.querySelectorAll(".preset-btn");
    presetButtons.forEach(btn => {
        const presetVal = parseInt(btn.getAttribute("data-preset"));
        // Rango de tolerancia
        if (Math.abs(val - presetVal) < 25000) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

/**
 * Actualiza la vista de los resultados
 */
function updateCalculatorView(budget) {
    const display = document.getElementById("budget-display");
    const tierTitle = document.getElementById("setup-tier-title");
    const tierDesc = document.getElementById("setup-tier-desc");
    const grid = document.getElementById("calculator-results-grid");
    
    if (!display || !tierTitle || !tierDesc || !grid) return;

    // Actualizar precio
    display.textContent = `$${formatPrice(budget)}`;

    // Obtener componentes
    const tier = getTierByBudget(budget);
    const data = HARDWARE_DB.tiers[tier];

    tierTitle.textContent = data.name;
    tierDesc.textContent = data.desc;

    // Renderizar grilla de componentes
    grid.innerHTML = "";
    data.components.forEach(comp => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        // Icono según tipo de componente
        let icon = "⚙️";
        if (comp.type.includes("Procesador")) icon = "🧠";
        else if (comp.type.includes("Video")) icon = "🎮";
        else if (comp.type.includes("Mother") || comp.type.includes("Placa Madre")) icon = "🔌";
        else if (comp.type.includes("RAM")) icon = "💾";
        else if (comp.type.includes("Almacenamiento")) icon = "💽";
        else if (comp.type.includes("Fuente")) icon = "⚡";
        else if (comp.type.includes("Gabinete")) icon = "🖥️";

        card.innerHTML = `
            <div class="product-info-wrap" style="padding: 1.5rem; justify-content: space-between; height: 100%;">
                <div>
                    <span class="product-category-tag">${comp.type}</span>
                    <h3 class="product-card-title" style="font-size: 1.1rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 8px;">
                        <span>${icon}</span> ${comp.name}
                    </h3>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem;">${comp.desc}</p>
                </div>
                <div class="product-card-footer" style="padding-top: 1rem; border-top: 1px solid var(--border-color); margin-top: auto;">
                    <div>
                        <span class="product-price-label">Mercado Libre:</span>
                        <div class="product-price-range" style="font-size: 0.95rem; color: var(--color-success);">Link Verificado</div>
                    </div>
                    <a href="#" data-affiliate="${comp.affiliateKey}" class="cta-button" style="padding: 8px 14px; font-size: 0.8rem;">Comprar ↗</a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Re-vincular los nuevos enlaces de afiliados creados dinámicamente
    if (typeof initAffiliateLinks === "function") {
        initAffiliateLinks();
    }
}
