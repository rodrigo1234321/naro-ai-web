/* ==========================================================================
   NARO AI — CORE JAVASCRIPT APPLICATION (Mobile-First & Live GitHub Pages Portfolio)
   GSAP 60FPS Motion Engine, ScrollTrigger Reveals, Calculators & Bot Simulator
   ========================================================================== */

const WHATSAPP_NUM = "5492235000000";

document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ Naro AI — Impulsando el Comercio Web Marplatense');

  // Initialize Mobile Menu Listener
  const mobileBtn = document.getElementById('mobile-toggle');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', toggleMobileMenu);
  }

  // Initialize Portfolio Showcase
  renderPortfolio('todos');

  // Initialize ROI Calculator Listener
  initCalculator();

  // Initialize GSAP Motion Engine
  initGsapAnimations();

  // Highlight Nav link on scroll
  window.addEventListener('scroll', handleNavHighlight);
});

/* Mobile Drawer Menu & Overlay Toggle */
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('drawer-overlay');
  
  if (menu) {
    menu.classList.toggle('active');
  }
  if (overlay) {
    overlay.classList.toggle('active');
  }

  // Lock body scroll when drawer is open to prevent background scrolling
  if (menu && menu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

/* Nav Link Scroll Highlight */
function handleNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

/* ==========================================================================
   GSAP 60FPS Motion Engine & ScrollTrigger
   ========================================================================== */
function initGsapAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Respect prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Entrance Timeline (Clean & Subtle for Mobile & Desktop)
  const heroTl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.7 } });
  
  heroTl.from(".hero-content .badge-subtle", {
    y: 12,
    opacity: 0,
    duration: 0.45
  })
  .from(".hero-title", {
    y: 18,
    opacity: 0,
    duration: 0.65
  }, "-=0.25")
  .from(".hero-lead, .hero-sublead", {
    y: 14,
    opacity: 0,
    stagger: 0.12,
    duration: 0.55
  }, "-=0.35")
  .from(".hero-cta-group .btn", {
    y: 14,
    opacity: 0,
    stagger: 0.1,
    duration: 0.5
  }, "-=0.25")
  .from(".hero-stats-row", {
    y: 14,
    opacity: 0,
    duration: 0.45
  }, "-=0.2")
  .from(".hero-visual", {
    y: 20,
    opacity: 0,
    duration: 0.75
  }, "-=0.4");

  // 2. Section Headers Reveal on Scroll
  gsap.utils.toArray(".gsap-reveal").forEach(elem => {
    gsap.from(elem, {
      scrollTrigger: {
        trigger: elem,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    });
  });

  // 3. Stagger Cards Reveal on Scroll
  gsap.utils.toArray(".gsap-reveal-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none reverse"
      },
      y: 25,
      opacity: 0,
      duration: 0.55,
      delay: (index % 3) * 0.08,
      ease: "power2.out"
    });
  });
}

/* ==========================================================================
   Service Detail Modals
   ========================================================================== */
const detallesServicios = {
  web: {
    titulo: "🌐 Página Web Profesional + SEO Mar del Plata",
    tagline: "Tu vidriera digital en Google. Sin ataduras mensuales.",
    precio: "$ 140.000 – $ 190.000 ARS (Pago Único)",
    abono: "¡SIN ABONO MENSUAL! (La página es 100% tuya)",
    tiempo: "4 a 7 días hábiles",
    detalles: [
      "Diseño responsivo optimizado 100% para celulares y carga ultra rápida.",
      "SEO Local configurado para figurar primeros en búsquedas de Mar del Plata.",
      "Catálogo interactivo de productos o listado de servicios con fotos HD y precios.",
      "Botonera directa de conexión a WhatsApp y redes sociales.",
      "Entrega llave en mano: la web queda a tu nombre sin costos ocultos."
    ]
  },
  bot: {
    titulo: "🤖 Bot de WhatsApp con Inteligencia Artificial 24/7",
    tagline: "Tu empleado estrella que responde en 5 segundos y vende mientras dormís.",
    precio: "$ 110.000 – $ 160.000 ARS (Pago Único Setup)",
    abono: "$ 18.000 – $ 25.000 ARS / mes (Servidor IA + Conexión Oficial)",
    tiempo: "4 a 7 días hábiles",
    detalles: [
      "Respuestas inteligentes en menos de 5 segundos las 24 horas del día.",
      "Muestra catálogo de productos con precios y talles en tiempo real.",
      "Cobro automático de señas por MercadoPago o CBU bancario directo.",
      "Agendamiento de turnos para centros de estética, peluquerías o consultorios.",
      "Envío de recordatorios automáticos por WhatsApp anti-ausentismo."
    ]
  },
  pos: {
    titulo: "🏬 Software POS & Gestión Comercial (Estándar o a Medida)",
    tagline: "El control total de tu caja, stock y ventas sin barreras de entrada.",
    precio: "VERSIÓN ESTÁNDAR: $ 0 Setup (Solo Abono Mensual) | A MEDIDA: $180.000 - $260.000 ARS",
    abono: "$ 22.000 ARS / mes (Versión Estándar Lista para Usar)",
    tiempo: "Activación Inmediata (Estándar) / 5 días (A Medida)",
    detalles: [
      "Versión Estándar: Comenzá hoy mismo solo pagando el abono mensual de $22.000 ARS.",
      "Control de Stock por talle, color o lector de código de barras.",
      "Cuentas corrientes, fiados y caja diaria sin libretas de papel.",
      "Actualización masiva de precios por porcentaje en 1 clic.",
      "Desarrollo a Medida disponible si requerís módulos custom o integraciones específicas."
    ]
  },
  combo: {
    titulo: "🔥 Combo Transformación 360° (Web + Bot + POS)",
    tagline: "La solución integral de máximo valor para comercios de Mar del Plata.",
    precio: "$ 340.000 ARS (o 2 cuotas promocionales de $ 170.000 ARS)",
    abono: "$ 35.000 ARS / mes (Todo Incluido: IA, Servidores, POS y Soporte)",
    tiempo: "7 días hábiles para entrega 100% probada",
    detalles: [
      "Integración total: tu Web, tu Bot de WhatsApp y tu Sistema de Gestión interconectados.",
      "Si vendés en el local físico, el stock se descuenta automáticamente en la web.",
      "Cobros automatizados por MercadoPago directo a tu cuenta bancaria.",
      "Capacitación a tu personal en 20 minutos y soporte técnico continuo en Mar del Plata.",
      "Recupero de inversión estimado en el primer mes de uso."
    ]
  },
  menu: {
    titulo: "🍔 Menú Digital QR & Pedidos Directos WhatsApp",
    tagline: "Especial para Gastronomía, Delivery, Rotiserías y Cervecerías.",
    precio: "$ 95.000 ARS (Pago Único - Sin Abono)",
    abono: "Opcional $ 8.000 ARS / mes (Actualización de Menú)",
    tiempo: "48 a 72 horas",
    detalles: [
      "Menú digital interactivo accesible mediante código QR en mesa o link en Instagram.",
      "El cliente arma el pedido, aclara gustos/envío y envía el pedido directo a la comandera de WhatsApp.",
      "Fotos HD de cada plato, bebidas y postres con actualización fácil."
    ]
  }
};

function abrirModalServicio(tipo) {
  const modal = document.getElementById('service-modal');
  const body = document.getElementById('modal-body-content');
  const info = detallesServicios[tipo];

  if (!modal || !body || !info) return;

  body.innerHTML = `
    <h2 class="margin-bottom-xs">${info.titulo}</h2>
    <p class="text-gradient-blue font-weight-bold margin-bottom-md">${info.tagline}</p>

    <div class="glass-panel padding-md margin-bottom-md">
      <div class="flex-between margin-bottom-xs flex-wrap">
        <span>Desarrollo / Setup:</span>
        <strong class="text-gradient-green">${info.precio}</strong>
      </div>
      <div class="flex-between margin-bottom-xs flex-wrap">
        <span>Abono Mensual:</span>
        <strong class="text-gradient-amber">${info.abono}</strong>
      </div>
      <div class="flex-between flex-wrap">
        <span>Tiempo de Entrega:</span>
        <strong class="badge badge-status">${info.tiempo}</strong>
      </div>
    </div>

    <h4>¿Qué incluye esta solución?</h4>
    <ul class="service-features margin-top-xs margin-bottom-lg">
      ${info.detalles.map(d => `<li><i data-lucide="check-circle-2"></i> ${d}</li>`).join('')}
    </ul>

    <a href="https://wa.me/${WHATSAPP_NUM}?text=Hola%20Naro%20AI,%20me%20interesa%20contratar%20el%20servicio:%20${encodeURIComponent(info.titulo)}" target="_blank" class="btn btn-whatsapp btn-full">
      <i data-lucide="message-square"></i> Solicitar este Servicio por WhatsApp
    </a>
  `;

  modal.classList.add('active');
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function cerrarModalServicio(e) {
  const modal = document.getElementById('service-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

/* ==========================================================================
   1. Portfolio Showcase Data & Renderer (6 Proyectos Reales GitHub Pages / Live)
   ========================================================================== */
const proyectosMDP = [
  {
    id: "gestion-comercial",
    nombre: "GestiónComercial POS",
    categoria: "industrial",
    rubro: "Sistema POS & Gestión de Comercio",
    ubicación: "Mar del Plata",
    urlDisplay: "control-comercio-weld.vercel.app",
    desc: "Plataforma completa de gestión para comercios: control de stock por código de barras, fiados, caja diaria y actualización masiva de precios.",
    linkLive: "https://control-comercio-weld.vercel.app",
    badge: "SaaS Live",
    metrica: "Control de Caja & Stock 24/7",
    features: ["Lector Código de Barras", "Gestión de Fiados", "Actualización Masiva %"]
  },
  {
    id: "lucky-detail",
    nombre: "Lucky Detail Studio",
    categoria: "salud",
    rubro: "Estética Automotriz & Detailing",
    ubicación: "Constitución, Mar del Plata",
    urlDisplay: "rodrigo1234321.github.io/lucky-detail",
    desc: "Catálogo interactivo de tratamientos cerámicos y PPF para vehículos de alta gama con agendamiento directo por WhatsApp.",
    linkLive: "https://rodrigo1234321.github.io/lucky-detail/",
    badge: "Estética / Detailing",
    metrica: "Reservas de Turnos 100% Autónomas",
    features: ["Catálogo de Servicios HD", "Turnero por WhatsApp", "Cotizador en Línea"]
  },
  {
    id: "dynasty",
    nombre: "Dynasty Streetwear",
    categoria: "industrial",
    rubro: "E-Commerce & Moda Urbana",
    ubicación: "Güemes, Mar del Plata",
    urlDisplay: "rodrigo1234321.github.io/dynasty",
    desc: "Tienda online de ropa y streetwear con catálogo dinámico por talles, carrito inteligente y pasarela de cobro integrada.",
    linkLive: "https://rodrigo1234321.github.io/dynasty/",
    badge: "E-Commerce Moda",
    metrica: "Ventas Autónomas 24/7",
    features: ["Filtros por Talle/Color", "Carrito Inteligente", "Integración MercadoPago"]
  },
  {
    id: "panorama-ar",
    nombre: "Panorama.ar",
    categoria: "turismo",
    rubro: "Guía Urbana & Eventos",
    ubicación: "Mar del Plata",
    urlDisplay: "panorama-web-one.vercel.app",
    desc: "Plataforma digital para la difusión de eventos culturales, gastronomía y paseos turísticos en Mar del Plata.",
    linkLive: "https://panorama-web-one.vercel.app/",
    badge: "Plataforma Live",
    metrica: "#1 Cartelera de Eventos",
    features: ["Guía Gastronómica HD", "Agenda Geolocalizada", "Sección Productoras"]
  },
  {
    id: "ms-refrigeracion",
    nombre: "MS Refrigeración Naval",
    categoria: "industrial",
    rubro: "Refrigeración Industrial & Naval",
    ubicación: "Puerto de Mar del Plata",
    urlDisplay: "rodrigo1234321.github.io/ms-refrigeracion",
    desc: "Plataforma institucional corporativa con catálogo de servicios navales, auditoría de clientes y formularios de cotización inmediata.",
    linkLive: "https://rodrigo1234321.github.io/ms-refrigeracion/",
    badge: "Industrial / Naval",
    metrica: "Líder Sector Puerto",
    features: ["Cotizador Industrial", "Ficha Técnica Naval", "Soporte 24/7 Puerto"]
  },
  {
    id: "ml-afiliados",
    nombre: "ML Afiliados Tech",
    categoria: "industrial",
    rubro: "Automatización & Afiliación e-Commerce",
    ubicación: "Mar del Plata",
    urlDisplay: "rodrigo1234321.github.io/ml-afiliados",
    desc: "Motor de automatización y métricas en tiempo real para campañas de afiliación y ventas e-commerce multicanal.",
    linkLive: "https://rodrigo1234321.github.io/ml-afiliados/",
    badge: "IA & Automatización",
    metrica: "Motor High Conversion",
    features: ["Tracking de Afiliados", "Métricas en Tiempo Real", "Carga Ultra Rápida"]
  }
];

function renderPortfolio(categoriaFiltro = 'todos') {
  const container = document.getElementById('portfolio-container');
  if (!container) return;

  const filtrados = categoriaFiltro === 'todos' 
    ? proyectosMDP 
    : proyectosMDP.filter(p => p.categoria === categoriaFiltro);

  container.innerHTML = filtrados.map(proj => `
    <div class="glass-card portfolio-card gsap-reveal-card">
      <div class="project-browser">
        <div class="browser-dots">
          <span class="browser-dot dot-red"></span>
          <span class="browser-dot dot-yellow"></span>
          <span class="browser-dot dot-green"></span>
        </div>
        <div class="browser-url">https://${proj.urlDisplay}</div>
      </div>

      <div class="flex-between margin-bottom-xs flex-wrap">
        <div class="portfolio-badge badge badge-amber">${proj.badge}</div>
        <span class="portfolio-location"><i data-lucide="map-pin"></i> ${proj.ubicación}</span>
      </div>

      <h3 class="margin-top-xs">${proj.nombre}</h3>
      <p class="portfolio-desc margin-top-xs">${proj.desc}</p>
      
      <ul class="service-features margin-top-xs">
        ${proj.features.map(f => `<li><i data-lucide="check"></i> ${f}</li>`).join('')}
      </ul>

      <div class="portfolio-metric margin-top-sm">
        <span class="text-gradient-green">✦ ${proj.metrica}</span>
      </div>

      <div class="project-links">
        <a href="${proj.linkLive}" target="_blank" class="btn btn-primary btn-full flex-between">
          <span>Ver sitio en vivo</span>
          <i data-lucide="external-link"></i>
        </a>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function filtrarPortfolio(cat) {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(b => b.classList.remove('active'));
  
  const targetBtn = Array.from(btns).find(b => b.getAttribute('onclick')?.includes(cat));
  if (targetBtn) targetBtn.classList.add('active');

  renderPortfolio(cat);
}

/* ==========================================================================
   2. Calibración de Calculadora Interactiva de ROI (Punto 6)
   ========================================================================== */
function initCalculator() {
  const rubroSelect = document.getElementById('rubro-select');
  const consultasRange = document.getElementById('consultas-range');
  const ticketRange = document.getElementById('ticket-range');

  if (!consultasRange || !ticketRange) return;

  const updateCalculos = () => {
    const consultas = parseInt(consultasRange.value);
    const ticket = parseInt(ticketRange.value);
    const rubro = rubroSelect ? rubroSelect.value : 'indumentaria';

    document.getElementById('consultas-val').innerText = consultas;
    document.getElementById('ticket-val').innerText = `$ ${ticket.toLocaleString('es-AR')}`;

    // Coeficiente de pérdida según rubro (Horario nocturno / demoras)
    let tasaPerdida = 0.25; // 25% por defecto
    let conversionMora = 0.15; // 15% conversion

    if (rubro === 'gastronomia') { tasaPerdida = 0.35; conversionMora = 0.20; }
    if (rubro === 'estetica') { tasaPerdida = 0.30; conversionMora = 0.25; }
    if (rubro === 'comercio') { tasaPerdida = 0.20; conversionMora = 0.12; }

    const consultasPerdidasMes = consultas * 30 * tasaPerdida;
    const ventasRecuperadasMes = Math.round(consultasPerdidasMes * conversionMora);
    const montoRecuperado = ventasRecuperadasMes * ticket;

    // ROI días (Costo del Bot o Combo promedio $200.000 / diario recuperado)
    const recuperoDiario = montoRecuperado / 30;
    const diasROI = recuperoDiario > 0 ? Math.max(3, Math.round(200000 / recuperoDiario)) : 30;

    document.getElementById('recupero-monto').innerText = `$ ${montoRecuperado.toLocaleString('es-AR')} ARS`;
    document.getElementById('roi-dias').innerText = `${diasROI} días`;
  };

  consultasRange.addEventListener('input', updateCalculos);
  ticketRange.addEventListener('input', updateCalculos);
  rubroSelect?.addEventListener('change', updateCalculos);

  // Initialize values immediately
  updateCalculos();
}

/* ==========================================================================
   3. WhatsApp Bot Simulator con Animación de Escritura
   ========================================================================== */
function simularChat(opcion) {
  const windowBody = document.getElementById('chat-window');
  if (!windowBody) return;

  let userText = '';
  let botReply = '';

  switch (opcion) {
    case 'turnos':
      userText = '📅 ¿Cómo agendás turnos?';
      botReply = '¡Es facilísimo! El bot le muestra a tu clienta los días y horarios libres de tu agenda, cobra la seña por MercadoPago y le envía un recordatorio automático por WhatsApp 2 horas antes para que no falte. ⚡';
      break;
    case 'precios':
      userText = '💰 ¿Cuáles son los precios?';
      botReply = 'La Web o Menú QR se cobra 1 solo pago sin abono. El Bot de WhatsApp arranca en $110.000 ARS setup + $18.000/mes. Y el Software POS Estándar solo cuesta $22.000 ARS/mes sin costo de inicio. ¡O el Combo 360° por $340.000 ARS en 2 cuotas! 📈';
      break;
    case 'stock':
      userText = '📦 ¿Cómo controlás stock?';
      botReply = 'El sistema se conecta a tu stock real por código de barras, talle o color. Si un producto se agota en el local, el bot avisa en el acto que no hay disponibilidad para evitar ventas sin mercadería. 📦';
      break;
    case 'demo':
      userText = '🚀 Quiero una demo para mi local';
      botReply = `¡Excelente decisión! Hacé clic en el botón de abajo y te enviamos un video interactivo y asesoramiento adaptado a tu negocio en Mar del Plata. 👇<br><a href="https://wa.me/${WHATSAPP_NUM}?text=Hola%20Naro%20AI,%20quiero%20solicitar%20una%20demo%20para%20mi%20local" target="_blank" class="btn btn-whatsapp btn-sm margin-top-xs block text-center">📱 Solicitar Demo por WhatsApp</a>`;
      break;
  }

  // Insert user bubble
  windowBody.innerHTML += `
    <div class="bot-msg msg-sent margin-top-xs">
      ${userText}
    </div>
  `;

  // Scroll down
  windowBody.scrollTop = windowBody.scrollHeight;

  // Insert typing indicator
  const typingId = 'typing-' + Date.now();
  windowBody.innerHTML += `
    <div class="bot-msg msg-received margin-top-xs typing-indicator" id="${typingId}">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>
  `;
  windowBody.scrollTop = windowBody.scrollHeight;

  // Replace typing indicator with bot response after short delay
  setTimeout(() => {
    const typingElem = document.getElementById(typingId);
    if (typingElem) {
      typingElem.outerHTML = `
        <div class="bot-msg msg-received margin-top-xs">
          ${botReply}
        </div>
      `;
    }
    windowBody.scrollTop = windowBody.scrollHeight;
  }, 800);
}

/* ==========================================================================
   4. FAQ Accordion Toggle
   ========================================================================== */
function toggleFaq(element) {
  const item = element.parentElement;
  item.classList.toggle('active');
}

/* ==========================================================================
   5. Auditoria Form Lead Trigger
   ========================================================================== */
function enviarAuditoria() {
  const nombre = document.getElementById('nombre').value;
  const rubro = document.getElementById('rubro').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const mensaje = document.getElementById('mensaje').value;

  const textoWA = `Hola Naro AI! Quisiera solicitar la Auditoría Gratuita para mi comercio en Mar del Plata.%0A%0A*Comercio:* ${encodeURIComponent(nombre)}%0A*Rubro:* ${encodeURIComponent(rubro)}%0A*Teléfono:* ${encodeURIComponent(whatsapp)}%0A*Mensaje:* ${encodeURIComponent(mensaje)}`;
  
  window.open(`https://wa.me/${WHATSAPP_NUM}?text=${textoWA}`, '_blank');
}
