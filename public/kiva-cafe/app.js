/* ==========================================================================
   KIVA CAFÉ — CORE JAVASCRIPT APPLICATION (GÜEMES, MAR DEL PLATA)
   GSAP Motion Engine, Interactive Specialty Menu Renderer & WhatsApp Booking
   ========================================================================== */

const KIVA_WHATSAPP = "5492236157605";

document.addEventListener('DOMContentLoaded', () => {
  console.log('☕ Kiva Café — Café de Especialidad & Brunch en Güemes, Mar del Plata');

  // Initialize Mobile Menu
  const mobileBtn = document.getElementById('mobile-toggle');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', toggleMobileMenu);
  }

  // Render initial menu category
  renderMenu('cafe');

  // Initialize GSAP Motion Engine
  initGsapAnimations();

  // Set default reservation date to today
  const fechaInput = document.getElementById('res-fecha');
  if (fechaInput) {
    const today = new Date().toISOString().split('T')[0];
    fechaInput.value = today;
  }
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

  if (menu && menu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

/* GSAP Motion Engine */
function initGsapAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Motion Entrance
  const heroTl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.7 } });

  heroTl.from(".hero-content .badge-subtle", { y: 12, opacity: 0, duration: 0.45 })
    .from(".hero-title", { y: 18, opacity: 0, duration: 0.65 }, "-=0.25")
    .from(".hero-lead, .hero-sublead", { y: 14, opacity: 0, stagger: 0.12, duration: 0.55 }, "-=0.35")
    .from(".hero-cta-group .btn", { y: 14, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.25")
    .from(".hero-stats-row", { y: 14, opacity: 0, duration: 0.45 }, "-=0.2")
    .from(".hero-visual", { y: 20, opacity: 0, duration: 0.75 }, "-=0.4");

  // 2. Scroll Reveals for Headers
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

  // 3. Stagger Reveals for Cards
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

/* Specialty Menu Items Dataset */
const menuKiva = [
  // ESPRESSO & FILTRADOS
  {
    cat: "cafe",
    nombre: "Flat White Etiopía Yirgacheffe",
    desc: "Doble ristretto espresso con leche texturizada sedosa y microespuma.",
    precio: "$ 3.800",
    badge: "Especialidad 86+ SCA"
  },
  {
    cat: "cafe",
    nombre: "Espresso Doble Origen Colombia",
    desc: "Extracción limpia de grano Huila con notas a chocolate amargo y frutos rojos.",
    precio: "$ 2.900",
    badge: "Intenso"
  },
  {
    cat: "cafe",
    nombre: "Filtrado Chemex de la Casa",
    desc: "Filtrado artesanal en vivo de tueste claro. Cuerpo sedoso y acidez brillante.",
    precio: "$ 4.200",
    badge: "Filtrado V60 / Chemex"
  },
  {
    cat: "cafe",
    nombre: "Latte de Vainilla & Caramelo",
    desc: "Espresso, leche cremada y almíbar casero de chaucha de vainilla orgánico.",
    precio: "$ 4.100",
    badge: "Dulce"
  },

  // BRUNCH & DULCE
  {
    cat: "brunch",
    nombre: "Croissant Hojaldrado con Frutillas & Nutella",
    desc: "Masa madre hojaldrada 100% manteca, crema de avellanas y frutas de estación.",
    precio: "$ 4.500",
    badge: "Pastelería de Autor"
  },
  {
    cat: "brunch",
    nombre: "Cinnamon Roll con Frosting de Q. Crema",
    desc: "Rollo de canela horneado cada mañana con glaseado suave de queso crema.",
    precio: "$ 3.900",
    badge: "Recién Horneado"
  },
  {
    cat: "brunch",
    nombre: "Cheesecake de Frutos Rojos de la Costa",
    desc: "Base crocante de galleta, crema horneada suave y compota artesanal de frutos rojos.",
    precio: "$ 4.800",
    badge: "Postre Destacado"
  },
  {
    cat: "brunch",
    nombre: "Medialunas de Manteca Kiva (x2)",
    desc: "Hojaldradas al estilo tradicional marplatense con almíbar cítrico sutil.",
    precio: "$ 2.400",
    badge: "Clásico MDP"
  },

  // TOSTONES & SALADO
  {
    cat: "salado",
    nombre: "Tostón Avocado & Huevo Poché",
    desc: "Pan de campo de masa madre, palta aplastada, huevos poché orgánicos y semillas.",
    precio: "$ 6.200",
    badge: "Brunch Estrella"
  },
  {
    cat: "salado",
    nombre: "Tostón de Jamón Crudo & Queso Brie",
    desc: "Masa madre tostada con manteca de hierbas, crudo serrano, brie y rúcula fresca.",
    precio: "$ 6.800",
    badge: "Gourmet"
  },
  {
    cat: "salado",
    nombre: "Bagel de Salmón Ahumado & Queso Crema",
    desc: "Bagel artesanal con sésamo, queso cream cheese con eneldo y alcaparras.",
    precio: "$ 7.500",
    badge: "Premium"
  },
  {
    cat: "salado",
    nombre: "Omelette de Queso Halloumi & Tomates Confitales",
    desc: "Huevos de campo revueltos cremosos con queso halloumi a la chapa y pancito.",
    precio: "$ 5.900",
    badge: "Proteico"
  },

  // BEBIDAS FRÍAS & ICED
  {
    cat: "frio",
    nombre: "Iced Latte Caramel Vanilla",
    desc: "Doble espresso sobre hielo, leche fría y caramelo artesanal. Ultra refrescante.",
    precio: "$ 4.200",
    badge: "Iced Bar"
  },
  {
    cat: "frio",
    nombre: "Espresso Tonic Cítrico",
    desc: "Extracción espresso de origen, agua tónica premiun, hielo y rodaja de pomelo.",
    precio: "$ 4.400",
    badge: "Verano Kiva"
  },
  {
    cat: "frio",
    nombre: "Cold Brew 12 Horas de Extracción",
    desc: "Café infusionado en frío durante 12 hs. Sabor chocolatoso, dulce y sin amargor.",
    precio: "$ 4.000",
    badge: "Infusión Fría"
  },
  {
    cat: "frio",
    nombre: "Limonada de Menta & Jengibre",
    desc: "Limones exprimidos en el momento con hojas de menta fresca y jengibre natural.",
    precio: "$ 3.200",
    badge: "Natural"
  }
];

function renderMenu(categoria = 'cafe') {
  const container = document.getElementById('menu-container');
  if (!container) return;

  const filtrados = menuKiva.filter(item => item.cat === categoria);

  container.innerHTML = filtrados.map(item => `
    <div class="glass-card menu-card gsap-reveal-card">
      <div class="menu-item-info">
        <div class="badge badge-amber badge-sm margin-bottom-xs">${item.badge}</div>
        <h3>${item.nombre}</h3>
        <p class="margin-top-xs">${item.desc}</p>
      </div>
      <div class="menu-item-price">${item.precio}</div>
    </div>
  `).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function filtrarMenu(cat) {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(b => b.classList.remove('active'));

  const targetBtn = Array.from(btns).find(b => b.getAttribute('onclick')?.includes(cat));
  if (targetBtn) targetBtn.classList.add('active');

  renderMenu(cat);
}

/* Reservation & Take Away WhatsApp Form Trigger */
function enviarReserva() {
  const nombre = document.getElementById('res-nombre').value;
  const personas = document.getElementById('res-personas').value;
  const fecha = document.getElementById('res-fecha').value;
  const hora = document.getElementById('res-hora').value;
  const notas = document.getElementById('res-notas').value;

  const textoWA = `Hola Kiva Café! Quisiera solicitar una reserva en Avellaneda 2325:%0A%0A*Nombre:* ${encodeURIComponent(nombre)}%0A*Personas:* ${encodeURIComponent(personas)}%0A*Fecha:* ${encodeURIComponent(fecha)}%0A*Hora:* ${encodeURIComponent(hora)}%0A*Preferencia / Notas:* ${encodeURIComponent(notas || 'Sin especificación')}`;

  window.open(`https://wa.me/${KIVA_WHATSAPP}?text=${textoWA}`, '_blank');
}
