export const servicios = [
  {
    slug: 'contable-conta-co',
    nombre: 'Conta & Co.',
    rubro: 'Estudio contable',
    familia: 'servicios',
    zona: 'Mar del Plata',
    dir: 'San Martín 1550, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero asesorarme contablemente',
    paleta: { bg: '#0a0f0e', bg2: '#0f1513', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f0fdf4', sub: '#a3b8a8', prim: '#10b981', prim2: '#f59e0b', accent: '#a7f3d0', wa: '#25d366' },
    fuentes: { h: 'Manrope', b: 'Inter' },
    hero: {
      kicker: 'Estudio contable y impositivo · Mar del Plata',
      titulo: ['Tu contabilidad al día,', 'tu cabeza libre'],
      sub: 'Monotributo, sueldos, AFIP e impuestos para pymes y profesionales. Todo gestionado con respuesta por WhatsApp.',
      img: 'assets/contable-conta-co/hero.jpg'
    },
    stats: [['15+', 'años de trayectoria'], ['350+', 'clientes activos'], ['100%', 'digital, sin papeles'], ['24 hs', 'respuesta de consultas']],
    secciones: [
      { tipo: 'cards', kicker: 'Servicios', titulo: 'Toda tu gestión en un solo estudio', items: [
        { icon: 'calculator', titulo: 'Monotributo', desc: 'Alta, categorización, recategorización y pagos al día.' },
        { icon: 'user', titulo: 'Sueldos y liquidaciones', desc: 'Liquidación mensual, aguinaldo, vacaciones y cargas sociales.' },
        { icon: 'shield', titulo: 'Sociedades y pymes', desc: 'Libros, balances, actas y cumplimiento ante AFIP y ARBA.' },
        { icon: 'leaf', titulo: 'Asesoramiento integral', desc: 'Planificación impositiva y decisiones con números claros.' }
      ]},
      { tipo: 'galeria', kicker: 'El estudio', titulo: 'Un equipo que mira tus números', items: [
        { img: 'assets/contable-conta-co/g1.jpg', label: 'Oficina del estudio' },
        { img: 'assets/contable-conta-co/g2.jpg', label: 'Trabajo en equipo' },
        { img: 'assets/contable-conta-co/g3.jpg', label: 'Reuniones de asesoramiento' }
      ]},
      { tipo: 'pasos', kicker: 'Empezá hoy', titulo: 'Sumarte es simple', items: [
        { titulo: 'Escribinos', desc: 'Contanos tu actividad: monotributo, autónomo o sociedad.' },
        { titulo: 'Recibí tu propuesta', desc: 'Plan de trabajo con costos claros y sin sorpresas.' },
        { titulo: 'Delegá y despreocupate', desc: 'Nos encargamos de todo y te avisamos solo lo importante.' }
      ]},
      { tipo: 'precios', kicker: 'Honorarios', titulo: 'Planes claros por mes', items: [
        { nombre: 'Monotributo', precio: 'Desde $35.000 / mes', lista: ['Declaraciones juradas', 'Recategorizaciones', 'Consultas ilimitadas'] },
        { nombre: 'Autónomos y responsables inscriptos', precio: 'Desde $60.000 / mes', lista: ['IVA y Ganancias', 'Sueldos opcionales', 'Reporte mensual'] },
        { nombre: 'Sociedades', precio: 'A medida', lista: ['Contabilidad completa', 'Balances y actas', 'Gestión ante organismos'] }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'Emprendedores tranquilos', items: [
        { nombre: 'Nico E.', rol: 'Monotributista', texto: 'Me recategorizaron sola a tiempo y me ahorraron una multa. Responden siempre.' },
        { nombre: 'Marisa B.', rol: 'Pyme', texto: 'Las liquidaciones de sueldo nunca más me dieron dolor de cabeza. Digital todo.' },
        { nombre: 'Gastón P.', rol: 'Profesional', texto: 'Atención por WhatsApp, reuniones cortas y claras. Así deberían ser todos.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Me pueden sacar las multas que ya tengo?', a: 'Sí, realizamos el plan de facilidades y gestión de deudas ante AFIP y ARBA.' },
        { q: '¿Trabajan de forma remota?', a: 'Sí, toda la gestión es digital: por WhatsApp, mail y videollamada.' },
        { q: '¿Cuándo necesito pasar de monotributo a RI?', a: 'Te avisamos nosotros con anticipación cuando tus ingresos se acercan al límite.' }
      ]},
      { tipo: 'cta', titulo: 'Poné tus números en orden', sub: 'Consultá sin cargo y con respuesta el mismo día.' }
    ]
  },
  {
    slug: 'flores-jardin-puerto',
    nombre: 'Jardín del Puerto',
    rubro: 'Florería y decoración',
    familia: 'servicios',
    zona: 'Mar del Plata',
    dir: 'Av. de los Trabajadores 2400, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero encargar flores',
    paleta: { bg: '#0d110f', bg2: '#131a15', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f4fbf6', sub: '#a6b8a8', prim: '#f43f5e', prim2: '#f9a8d4', accent: '#fecdd3', wa: '#25d366' },
    fuentes: { h: 'Fraunces', b: 'Inter' },
    hero: {
      kicker: 'Florería y decoración · Mar del Plata',
      titulo: ['Flores que dicen', 'lo que las palabras no'],
      sub: 'Ramos, arreglos y decoración para eventos. Encargá por WhatsApp con fotos y entregamos el mismo día en toda la ciudad.',
      img: 'assets/flores-jardin-puerto/hero.jpg'
    },
    stats: [['300+', 'arreglos por mes'], ['3 hs', 'entrega en la ciudad'], ['100%', 'flores frescas'], ['4.9★', 'en 900 reseñas']],
    secciones: [
      { tipo: 'cards', kicker: 'Catálogo', titulo: 'Elegí tu flor, armamos la historia', items: [
        { icon: 'flower', titulo: 'Ramos clásicos', desc: 'Rosas, tulipanes y mixes de estación envueltos a mano.', precio: 'Desde $18.000' },
        { icon: 'flower', titulo: 'Arreglos para eventos', desc: 'Centros de mesa, arcos y decoración completa.', precio: 'A medida' },
        { icon: 'gift', titulo: 'Flor + regalo', desc: 'Combinamos flores con chocolates, peluches y tarjetas.', precio: 'Desde $25.000' },
        { icon: 'leaf', titulo: 'Plantas y suscripción', desc: 'Plantas de interior y entrega mensual para oficinas.', precio: 'Desde $12.000' }
      ]},
      { tipo: 'pasos', kicker: 'Encargos', titulo: 'Flores en 3 pasos', items: [
        { titulo: 'Contanos la ocasión', desc: 'Cumpleaños, aniversario, condolencias o simple amor.' },
        { titulo: 'Elegí tu arreglo', desc: 'Te mandamos fotos de opciones según presupuesto.' },
        { titulo: 'Entregamos por vos', desc: 'En 3 horas en la ciudad, con tarjeta de tu puño y letra.' }
      ]},
      { tipo: 'galeria', kicker: 'Nuestros arreglos', titulo: 'Flores que hablan', items: [
        { img: 'assets/flores-jardin-puerto/g1.jpg', label: 'Ramo clásico' },
        { img: 'assets/flores-jardin-puerto/g2.jpg', label: 'Arreglo de boda' },
        { img: 'assets/flores-jardin-puerto/g3.jpg', label: 'Flor + regalo' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'Momentos con flores', items: [
        { nombre: 'Facu L.', rol: 'Aniversario', texto: 'Le llegaron a la oficina de mi novia con su mensaje. Lloró de la emoción.' },
        { nombre: 'Juli R.', rol: 'Boda', texto: 'La decoración floral de mi casamiento fue exactamente lo que soñamos.' },
        { nombre: 'Tami G.', rol: 'Condolencias', texto: 'El arreglo fue delicado y hermoso. Agradezco la sensibilidad con la que lo armaron.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Entregan el mismo día?', a: 'Sí, pedidos antes de las 14 hs se entregan el mismo día en la ciudad.' },
        { q: '¿Dónde hacen envíos?', a: 'Toda la ciudad de Mar del Plata y alrededores coordinados.' },
        { q: '¿Personalizan la tarjeta?', a: 'Sí, incluimos tarjeta con tu mensaje en cada entrega.' }
      ]},
      { tipo: 'cta', titulo: 'Regalá flores que emocionan', sub: 'Encargá por WhatsApp y entregamos hoy.' }
    ]
  }
]
