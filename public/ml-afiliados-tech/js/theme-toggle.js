/**
 * CONTROLADOR DE MODO CLARO / OSCURO (THEME-TOGGLE.JS)
 * 
 * Gestiona la alternancia del tema y la persistencia en el navegador.
 */

(function () {
    // 1. Determinar el tema inicial de manera inmediata para evitar parpadeos
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    
    if (savedTheme === "light" || (!savedTheme && systemPrefersLight)) {
        document.body.classList.add("light-theme");
    }

    // 2. Inicializar la interfaz del botón al cargar el DOM
    document.addEventListener("DOMContentLoaded", () => {
        createThemeToggleButton();
    });

    /**
     * Crea e inyecta el botón alternador de tema en el DOM
     */
    function createThemeToggleButton() {
        if (document.getElementById("theme-switcher")) return;

        const button = document.createElement("button");
        button.id = "theme-switcher";
        button.className = "theme-switch-btn";
        button.setAttribute("aria-label", "Cambiar tema de color");
        
        // Asignar icono inicial
        updateButtonIcon(button);

        button.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light-theme");
            localStorage.setItem("theme", isLight ? "light" : "dark");
            updateButtonIcon(button);
        });

        document.body.appendChild(button);
    }

    /**
     * Actualiza el icono (emoji) del botón según el tema activo
     */
    function updateButtonIcon(button) {
        const isLightTheme = document.body.classList.contains("light-theme");
        button.textContent = isLightTheme ? "☀️" : "🌙";
    }
})();
