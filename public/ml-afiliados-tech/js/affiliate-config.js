/**
 * CONFIGURACIÓN CENTRALIZADA DE ENLACES DE AFILIADO
 * 
 * Para cambiar un enlace de afiliado en todo el sitio, solo debes modificar el valor de la URL aquí.
 * En el HTML, los enlaces se definen usando el atributo data-affiliate="KEY_DEL_PRODUCTO".
 * El script de main.js se encargará de inyectar automáticamente el enlace correcto y los atributos SEO.
 */

const AFFILIATE_CONFIG = {
    // Info del afiliado
    settings: {
        defaultFallbackUrl: "https://www.mercadolibre.com.ar", // URL si no se encuentra la clave
        openInNewTab: true,
        addNoFollow: true,
        disclosureText: "Como afiliado de Mercado Libre, esta web genera ingresos por las compras elegibles realizadas a través de estos enlaces."
    },

    // Enlaces de productos específicos
    products: {
        // --- NOTEBOOKS ---
        "notebook-asus-tuf": "https://www.mercadolibre.com.ar/notebook-gamer-asus-tuf-gaming-f15/p/MLA22839931", // Ejemplo link real/producto
        "notebook-lenovo-ideapad": "https://www.mercadolibre.com.ar/notebook-lenovo-ideapad-1-14igl7/p/MLA21711200",
        "notebook-hp-15": "https://www.mercadolibre.com.ar/notebook-hp-15-fc0008la/p/MLA23015509",

        // --- PCS GAMER (COMPONENTES PARA EL ARMADO) ---
        "cpu-ryzen-5-5600": "https://www.mercadolibre.com.ar/procesador-amd-ryzen-5-5600-am4/p/MLA19149952",
        "gpu-rx-6600": "https://www.mercadolibre.com.ar/placa-de-video-amd-radeon-rx-6600/p/MLA18596645",
        "mother-b550": "https://www.mercadolibre.com.ar/motherboard-gigabyte-b550m-k-am4/p/MLA24872935",
        "ram-16gb-kingston": "https://www.mercadolibre.com.ar/memoria-ram-fury-beast-ddr4-16gb-kingston/p/MLA19757659",
        "ssd-1tb-kingston": "https://www.mercadolibre.com.ar/disco-solido-interno-kingston-snv2s1000g-1tb/p/MLA19717145",
        "fuente-650w-bronze": "https://www.mercadolibre.com.ar/fuente-de-alimentacion-redragon-rgps-650w-80-plus-bronze/p/MLA16246377",
        "gabinete-gamer": "https://www.mercadolibre.com.ar/gabinete-gamer-redragon-gazer-gc-605/p/MLA19755490",

        // --- PROCESADORES ---
        "cpu-intel-i5-12400f": "https://www.mercadolibre.com.ar/procesador-intel-core-i5-12400f-lga1700/p/MLA18789524",
        "cpu-ryzen-7-5700x": "https://www.mercadolibre.com.ar/procesador-amd-ryzen-7-5700x-am4/p/MLA19149953",

        // --- PLACAS DE VIDEO ---
        "gpu-rtx-4060": "https://www.mercadolibre.com.ar/placa-de-video-nvidia-geforce-rtx-4060/p/MLA24810777",
        "gpu-rtx-3060": "https://www.mercadolibre.com.ar/placa-de-video-nvidia-geforce-rtx-3060-12gb/p/MLA18255959",

        // --- MONITORES ---
        "monitor-lg-24-144hz": "https://www.mercadolibre.com.ar/monitor-gamer-lg-ultra-gear-24gn600-b/p/MLA18255957",
        "monitor-samsung-24-75hz": "https://www.mercadolibre.com.ar/monitor-samsung-f350-24-pulgadas/p/MLA15152003",
        "monitor-asus-tuf-165hz": "https://www.mercadolibre.com.ar/monitor-gamer-asus-tuf-gaming-vg249q1a-238/p/MLA18588320",

        // --- TECLADOS ---
        "teclado-redragon-kumara": "https://www.mercadolibre.com.ar/teclado-gamer-redragon-kumara-k552/p/MLA15155958",
        "teclado-hyperx-alloy-origins": "https://www.mercadolibre.com.ar/teclado-gamer-hyperx-alloy-origins/p/MLA15243954",

        // --- MOUSE GAMER ---
        "mouse-logitech-g203": "https://www.mercadolibre.com.ar/mouse-gamer-de-juego-logitech-gg-series-g203-lightsync-negro/p/MLA16211422?pdp_filters=item_id%3AMLA1566117831&matt_tool=89488245&ua=wMMaHuU3jX0ScLHqzgmjnWE9G5crOLKzcztzO0b6kx5MicOO#origin=share&sid=share&wid=MLA1566117831&action=copy",
        "mouse-razer-deathadder-essential": "https://www.mercadolibre.com.ar/mouse-gamer-razer-deathadder-essential/p/MLA15255959",

        // --- AURICULARES ---
        "auricular-redragon-zeus": "https://www.mercadolibre.com.ar/auriculares-gamer-redragon-zeus-h510/p/MLA16122493",
        "auricular-hyperx-cloud-stinger": "https://www.mercadolibre.com.ar/auriculares-gamer-hyperx-cloud-stinger-2/p/MLA21711202",
        "auricular-jbl-quantum-100": "https://www.mercadolibre.com.ar/auriculares-gamer-jbl-quantum-100/p/MLA16122498"
    }
};

// Exportar configuración si se usa en un entorno de módulos, o dejar global para navegador
if (typeof module !== "undefined" && module.exports) {
    module.exports = AFFILIATE_CONFIG;
}
