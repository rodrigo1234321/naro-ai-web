export const inmobiliaria = [
  {
    slug: 'inmobiliaria-costa-real',
    nombre: 'Costa Real Propiedades',
    rubro: 'Inmobiliaria',
    familia: 'inmobiliaria',
    zona: 'Mar del Plata',
    dir: 'Olavarría 2450, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero consultar por una propiedad',
    paleta: { bg: '#0a0f1c', bg2: '#0f1628', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f1f5f9', sub: '#94a3b8', prim: '#38bdf8', prim2: '#eab308', accent: '#bae6fd', wa: '#25d366' },
    fuentes: { h: 'Sora', b: 'Inter' },
    hero: {
      kicker: 'Propiedades · Mar del Plata',
      titulo: ['El lugar perfecto,', 'lo encontramos juntos'],
      sub: 'Compra, venta y alquileres con asesoramiento de principio a fin. Escribinos y te pasamos propiedades según tu perfil.',
      img: 'assets/inmobiliaria-costa-real/hero.jpg'
    },
    stats: [['25+', 'años en el mercado'], ['1500+', 'operaciones cerradas'], ['98%', 'clientes satisfechos'], ['24 hs', 'respuesta de consultas']],
    secciones: [
      { tipo: 'cards', kicker: 'Propiedades destacadas', titulo: 'Oportunidades reales, disponibles hoy', sub: 'Cada publicación con datos verificados y fotos reales.', items: [
        { icon: 'home', titulo: 'Depto 2 amb. Centro', desc: 'A 3 cuadras de la peatonal. Balcón, cocina integrada y expensas bajas.', precio: 'USD 95.000', chips: ['Venta', '2 amb'] },
        { icon: 'home', titulo: 'PH a estrenar La Perla', desc: '3 dormitorios, terraza propia con parrilla y cochera.', precio: 'USD 165.000', chips: ['Venta', '3 amb'] },
        { icon: 'key', titulo: 'Casa con patio en La Florida', desc: 'Dos plantas, jardín de 200m², ideal familia.', precio: 'USD 210.000', chips: ['Venta', '4 amb'] }
      ]},
      { tipo: 'pasos', kicker: 'Tu próxima propiedad', titulo: 'Así te ayudamos', items: [
        { titulo: 'Contanos tu búsqueda', desc: 'Zona, ambientes, presupuesto y si es compra o alquiler.' },
        { titulo: 'Recibís opciones curadas', desc: 'Propiedades que coinciden con tu perfil, con fotos y planos.' },
        { titulo: 'Visitás y cerramos', desc: 'Acompañamiento en visita, negociación y papelería incluida.' }
      ]},
      { tipo: 'galeria', kicker: 'Propiedades', titulo: 'Algunos de nuestros desarrollos', items: [
        { img: 'assets/inmobiliaria-costa-real/g1.jpg', label: 'PH a estrenar' },
        { img: 'assets/inmobiliaria-costa-real/g2.jpg', label: 'Casa en La Florida' },
        { img: 'assets/inmobiliaria-costa-real/g3.jpg', label: 'Depto vista al mar' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'Operaciones que hablan solas', items: [
        { nombre: 'Sandra y Leo', rol: 'Compra de PH', texto: 'Nos acompañaron en cada visita y la negociación fue transparente de punta a punta.' },
        { nombre: 'Rodrigo F.', rol: 'Venta de departamento', texto: 'Vendieron mi depto en 3 semanas y al precio que pedía. Gestión impecable.' },
        { nombre: 'Camila V.', rol: 'Alquiler temporario', texto: 'Encontré un alquiler en el día, con fotos reales y trato directo con el dueño.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Cuánto tarda una venta promedio?', a: 'Depende de la propiedad, pero con fotos profesionales y difusión digital promedio 30 a 60 días.' },
        { q: '¿Tasaciones sin cargo?', a: 'Sí, tasamos tu propiedad gratis y te pasamos el informe por WhatsApp.' },
        { q: '¿Trabajan con créditos hipotecarios?', a: 'Sí, acompañamos el proceso completo con los bancos y escribanías.' }
      ]},
      { tipo: 'cta', titulo: '¿Buscás o vendés?', sub: 'Escribinos y arrancamos hoy mismo.' }
    ]
  },
  {
    slug: 'temporarios-dunas',
    nombre: 'Dunas Temporarios',
    rubro: 'Alquileres temporarios',
    familia: 'inmobiliaria',
    zona: 'Mar del Plata',
    dir: 'Av. Alem 2400, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero consultar por un alquiler temporario',
    paleta: { bg: '#0d1117', bg2: '#131a21', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f8fafc', sub: '#94a3b8', prim: '#f59e0b', prim2: '#38bdf8', accent: '#fde68a', wa: '#25d366' },
    fuentes: { h: 'Fraunces', b: 'Inter' },
    hero: {
      kicker: 'Alquileres temporarios · Mar del Plata',
      titulo: ['Vacaciones sin vueltas,', 'alquiler con garantía'],
      sub: 'Departamentos y casas temporarios con fotos reales, contrato y atención 24/7. Escribinos y reservá tu estadía hoy.',
      img: 'assets/temporarios-dunas/hero.jpg'
    },
    stats: [['120+', 'propiedades temporarias'], ['24/7', 'atención al huésped'], ['0', 'sorpresas con la reserva'], ['4.9★', 'puntaje de huéspedes']],
    secciones: [
      { tipo: 'cards', kicker: 'Disponibles', titulo: 'Tu lugar en la costa', sub: 'Fechas reales y reserva confirmada al instante.', items: [
        { icon: 'home', titulo: 'Depto vista al mar', desc: '2 ambientes frente a la rambla, wifi, aire y estacionamiento.', precio: 'USD 90 / noche', chips: ['2 huéspedes', 'Vista al mar'] },
        { icon: 'home', titulo: 'Casa con jardín', desc: '3 dormitorios en zona residencial, parrilla y pileta.', precio: 'USD 150 / noche', chips: ['6 huéspedes', 'Pileta'] },
        { icon: 'key', titulo: 'Loft céntrico', desc: 'Moderno, a pasos de la peatonal. Ideal parejas.', precio: 'USD 75 / noche', chips: ['2 huéspedes', 'Centro'] }
      ]},
      { tipo: 'pasos', kicker: 'Reserva simple', titulo: '3 pasos y estás de vacaciones', items: [
        { titulo: 'Elegí y consultá fechas', desc: 'Te pasamos disponibilidad real al instante.' },
        { titulo: 'Reservá con seña', desc: 'Contrato digital y comprobante al toque.' },
        { titulo: 'Recibí tu estadía', desc: 'Check-in autónomo, limpieza y atención 24/7.' }
      ]},
      { tipo: 'galeria', kicker: 'Propiedades', titulo: 'Fotos reales, sin sorpresas', items: [
        { img: 'assets/temporarios-dunas/g1.jpg', label: 'Vista al mar' },
        { img: 'assets/temporarios-dunas/g2.jpg', label: 'Casa con pileta' },
        { img: 'assets/temporarios-dunas/g3.jpg', label: 'Loft céntrico' }
      ]},
      { tipo: 'testimonios', kicker: 'Huéspedes', titulo: 'Temporadas que se repiten', items: [
        { nombre: 'Julieta P.', rol: 'Verano en la rambla', texto: 'Todo tal cual las fotos: limpio, equipado y con una atención increíble.' },
        { nombre: 'Andrés M.', rol: 'Escape de invierno', texto: 'Reservé por WhatsApp y en 20 minutos tenía el contrato. La casa era divina.' },
        { nombre: 'Laura y Nico', rol: 'Familia', texto: 'La casa con pileta nos quedó chica de ganas de volver, no de espacio. 10 puntos.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Las fotos son reales?', a: 'Sí, todas nuestras propiedades tienen fotos actualizadas y verificación de disponibilidad en tiempo real.' },
        { q: '¿Aceptan mascotas?', a: 'Tenemos propiedades pet friendly filtrables. Consultanos.' },
        { q: '¿Cómo es la seña?', a: 'Seña del 30% para reservar, el resto a la llegada. Transferencia o tarjeta.' }
      ]},
      { tipo: 'cta', titulo: '¿Cuándo arrancan tus vacaciones?', sub: 'Consultá disponibilidad por WhatsApp y reservá sin vueltas.' }
    ]
  }
]
