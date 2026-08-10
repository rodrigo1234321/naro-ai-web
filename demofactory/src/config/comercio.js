export const comercio = [
  {
    slug: 'regaleria-dulce-detalle',
    nombre: 'Dulce Detalle',
    rubro: 'Regalería y peluches',
    familia: 'comercio',
    zona: 'Mar del Plata',
    dir: '3 de Febrero 2450, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero hacer un pedido',
    paleta: { bg: '#100c12', bg2: '#171119', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#faf7fb', sub: '#b8a7b8', prim: '#f472b6', prim2: '#fbbf24', accent: '#fbcfe8', wa: '#25d366' },
    fuentes: { h: 'Sora', b: 'Inter' },
    hero: {
      kicker: 'Regalería y peluches · Mar del Plata',
      titulo: ['Regalar bien,', 'es un arte'],
      sub: 'Peluches personalizados, globos y cajas regalo para cada ocasión. Pedí por WhatsApp y te lo dejamos listo en el día.',
      img: 'assets/regaleria-dulce-detalle/hero.jpg'
    },
    stats: [['300+', 'productos en stock'], ['2 hs', 'armado de regalos'], ['100%', 'personalización'], ['4.9★', 'en 700 reseñas']],
    secciones: [
      { tipo: 'cards', kicker: 'Catálogo', titulo: 'El detalle perfecto existe', items: [
        { icon: 'gift', titulo: 'Peluches personalizados', desc: 'Con bordado de nombre, outfit a elección y tarjeta incluida.', precio: 'Desde $18.000' },
        { icon: 'gift', titulo: 'Cajas regalo', desc: 'Armadas a medida: chocolates, globos, peluche y más.', precio: 'Desde $25.000' },
        { icon: 'sparkle', titulo: 'Globos y deco', desc: 'Ramos de globos y decoración para cumpleaños y fechas.', precio: 'Desde $8.000' },
        { icon: 'heart', titulo: 'San Valentín y fechas', desc: 'Kits especiales para el día de los enamorados.', precio: 'Desde $30.000' }
      ]},
      { tipo: 'pasos', kicker: 'Pedidos', titulo: 'Regalá en 3 pasos', items: [
        { titulo: 'Contanos la ocasión', desc: 'Quién recibe, qué fecha y qué presupuesto.' },
        { titulo: 'Te armamos el regalo', desc: 'Te mandamos fotos de las opciones antes de armar.' },
        { titulo: 'Retirás o enviamos', desc: 'Armado en el día y envío sorpresa opcional.' }
      ]},
      { tipo: 'galeria', kicker: 'Productos', titulo: 'Detalles que emocionan', items: [
        { img: 'assets/regaleria-dulce-detalle/g1.jpg', label: 'Peluches con nombre' },
        { img: 'assets/regaleria-dulce-detalle/g2.jpg', label: 'Cajas regalo' },
        { img: 'assets/regaleria-dulce-detalle/g3.jpg', label: 'Ramos de globos' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'Regalos que emocionaron', items: [
        { nombre: 'Mechi L.', rol: 'Cumpleaños', texto: 'El peluche con el nombre de mi nene lo hizo llorar de la emoción. Gracias.' },
        { nombre: 'Fede R.', rol: 'San Valentín', texto: 'Armaron una caja perfecta y me la enviaron con nota sorpresa. 10/10.' },
        { nombre: 'Cami H.', rol: 'Baby shower', texto: 'La decoración con globos fue la estrella de la fiesta. Súper puntuales.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Puedo encargar con mi diseño?', a: 'Sí, bordamos nombres y textos a elección en los peluches.' },
        { q: '¿Entregan el mismo día?', a: 'Los pedidos antes de las 14 hs salen el mismo día en zona centro.' },
        { q: '¿Hacen tarjetas personalizadas?', a: 'Sí, tarjeta con tu mensaje incluida en todos los regalos.' }
      ]},
      { tipo: 'cta', titulo: 'La próxima sorpresa, hecha por nosotros', sub: 'Escribinos y armamos el regalo perfecto.' }
    ]
  },
  {
    slug: 'imprenta-estampa',
    nombre: 'Estampa MDP',
    rubro: 'Imprenta y sublimados',
    familia: 'comercio',
    zona: 'Mar del Plata',
    dir: 'Belgrano 1800, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero cotizar una impresión',
    paleta: { bg: '#0b0a10', bg2: '#111018', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f5f3fa', sub: '#a09db8', prim: '#d946ef', prim2: '#22d3ee', accent: '#f0abfc', wa: '#25d366' },
    fuentes: { h: 'Space Grotesk', b: 'Inter' },
    hero: {
      kicker: 'Imprenta y sublimados · Mar del Plata',
      titulo: ['Tu diseño,', 'impreso con calidad'],
      sub: 'Sublimados, banners, tarjetas y merchandising para tu marca. Subí tu diseño por WhatsApp y cotizá en minutos.',
      img: 'assets/imprenta-estampa/hero.jpg'
    },
    stats: [['48 hs', 'producción promedio'], ['1500+', 'pedidos por año'], ['100%', 'control de calidad'], ['0', 'mínimo de unidad']],
    secciones: [
      { tipo: 'cards', kicker: 'Productos', titulo: 'Imprimimos tu marca', items: [
        { icon: 'shirt', titulo: 'Sublimados', desc: 'Tazas, remeras, gorras y mates con tu diseño, incluso 1 unidad.', precio: 'Desde $6.000' },
        { icon: 'printer', titulo: 'Gráfica comercial', desc: 'Tarjetas, volantes, etiquetas y lona para eventos.', precio: 'Desde $3.000' },
        { icon: 'tag', titulo: 'Merchandising', desc: 'Stickers, imanes, lapiceras y artículos promocionales.', precio: 'Desde $1.500' },
        { icon: 'shield', titulo: 'Diseño', desc: 'Si no tenés el arte, nuestro equipo lo diseña por vos.', precio: 'Consultar' }
      ]},
      { tipo: 'pasos', kicker: 'Cotización', titulo: 'De archivo a impreso', items: [
        { titulo: 'Mandanos tu diseño', desc: 'PDF, PNG o AI. Te asesoramos si necesitás arte nuevo.' },
        { titulo: 'Cotización en minutos', desc: 'Precio y plazo de entrega por WhatsApp.' },
        { titulo: 'Producimos y entregamos', desc: 'Control de calidad previo a la entrega o envío.' }
      ]},
      { tipo: 'galeria', kicker: 'Trabajos', titulo: 'Calidad que se ve', items: [
        { img: 'assets/imprenta-estampa/g1.jpg', label: 'Sublimación' },
        { img: 'assets/imprenta-estampa/g2.jpg', label: 'Gráfica comercial' },
        { img: 'assets/imprenta-estampa/g3.jpg', label: 'Merchandising' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'Marcas que ya imprimen acá', items: [
        { nombre: 'Sofi T.', rol: 'Emprendimiento', texto: 'Hago mis etiquetas y volantes acá desde que empecé. Precios accesibles y buena calidad.' },
        { nombre: 'Diego A.', rol: 'Evento', texto: 'Imprimieron la lona de mi cumpleaños en 24 horas y quedó impecable.' },
        { nombre: 'Micaela B.', rol: 'Empresa', texto: 'El merchandising para nuestros clientes salió perfecto y llegó antes de lo pactado.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Cuál es el mínimo de unidades?', a: 'No tenemos mínimo: imprimimos desde 1 unidad en sublimados.' },
        { q: '¿Cuánto tarda un pedido?', a: 'Promedio 48 hs hábiles. Trabajos express con costo adicional.' },
        { q: '¿Me ayudan con el diseño?', a: 'Sí, tenemos servicio de diseño y corrección de arte.' }
      ]},
      { tipo: 'cta', titulo: 'Cotizá tu próximo pedido', sub: 'Subí tu diseño por WhatsApp y cotizá en minutos.' }
    ]
  },
  {
    slug: 'distribuidora-mdp',
    nombre: 'MDP Distribuciones',
    rubro: 'Distribuidora mayorista',
    familia: 'comercio',
    zona: 'Mar del Plata',
    dir: 'Chile 3450, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero abrir una cuenta mayorista',
    paleta: { bg: '#0a0e14', bg2: '#0f1520', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f8fafc', sub: '#94a3b8', prim: '#3b82f6', prim2: '#f97316', accent: '#bfdbfe', wa: '#25d366' },
    fuentes: { h: 'Sora', b: 'Inter' },
    hero: {
      kicker: 'Distribuidora mayorista · Mar del Plata',
      titulo: ['Stock para tu negocio,', 'entrega en el día'],
      sub: 'Distribución mayorista y minorista de bebidas, almacén y limpieza. Pedido mínimo accesible y entrega en 24 hs.',
      img: 'assets/distribuidora-mdp/hero.jpg'
    },
    stats: [['1500+', 'productos en catálogo'], ['24 hs', 'entrega en la zona'], ['200+', 'clientes activos'], ['7', 'días de atención']],
    secciones: [
      { tipo: 'cards', kicker: 'Catálogo', titulo: 'Todo lo que tu negocio necesita', items: [
        { icon: 'beer', titulo: 'Bebidas', desc: 'Aguas, gaseosas, cervezas y jugos de primeras marcas.', precio: 'Mayorista y minorista' },
        { icon: 'leaf', titulo: 'Almacén', desc: 'Alimentos no perecederos, snacks y artículos de consumo masivo.' },
        { icon: 'sparkle', titulo: 'Limpieza', desc: 'Línea completa de limpieza profesional y hogar.' },
        { icon: 'truck', titulo: 'Logística propia', desc: 'Flota propia con entregas programadas y urgencias.' }
      ]},
      { tipo: 'pasos', kicker: 'Empezá a comprar', titulo: 'Abrí tu cuenta en el día', items: [
        { titulo: 'Solicitá tu cuenta', desc: 'Completá tus datos por WhatsApp y coordinamos visita.' },
        { titulo: 'Recibí el catálogo', desc: 'Precio mayorista actualizado con listas por categoría.' },
        { titulo: 'Pedí y recibí', desc: 'Pedido mínimo accesible con entrega en 24 hs.' }
      ]},
      { tipo: 'galeria', kicker: 'Depósito', titulo: 'Stock que no para', items: [
        { img: 'assets/distribuidora-mdp/g1.jpg', label: 'Depósito central' },
        { img: 'assets/distribuidora-mdp/g2.jpg', label: 'Flota de reparto' },
        { img: 'assets/distribuidora-mdp/g3.jpg', label: 'Zona de picking' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'Comercios que confían', items: [
        { nombre: 'Ale C.', rol: 'Kiosco', texto: 'Pido el lunes y me llega el lunes. Nunca me quedé sin stock.' },
        { nombre: 'Roxana D.', rol: 'Almacén', texto: 'La lista mayorista es clara y el repartidor un genio. Excelente atención.' },
        { nombre: 'Jorge P.', rol: 'Bar', texto: 'Tienen todo lo que pido y si falta, me lo consiguen. Llevo 3 años con ellos.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Cuál es el pedido mínimo?', a: 'Para mayorista: $80.000 o 6 unidades por ítem. Minorista sin mínimo.' },
        { q: '¿Cobran el flete?', a: 'Sin cargo en la zona de reparto desde $120.000.' },
        { q: '¿Trabajan con factura A?', a: 'Sí, facturamos A y B. Pedí tu constancia de monotributo.' }
      ]},
      { tipo: 'cta', titulo: 'Stock para tu negocio, hoy', sub: 'Abrí tu cuenta mayorista por WhatsApp.' }
    ]
  },
  {
    slug: 'ferreteria-ferretodo',
    nombre: 'FerreTodo',
    rubro: 'Ferretería y sanitarios',
    familia: 'comercio',
    zona: 'Mar del Plata',
    dir: 'Av. Luro 5600, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, consulto por un producto de ferretería',
    paleta: { bg: '#0c0e0d', bg2: '#121413', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f6f6f4', sub: '#a3a29a', prim: '#facc15', prim2: '#fb923c', accent: '#fef08a', wa: '#25d366' },
    fuentes: { h: 'Manrope', b: 'Inter' },
    hero: {
      kicker: 'Ferretería y sanitarios · Mar del Plata',
      titulo: ['Encontrar es la', 'mitad de arreglar'],
      sub: 'Herramientas, electricidad, sanitarios y pinturería con stock real. Consultá disponibilidad por WhatsApp y retirá en el día.',
      img: 'assets/ferreteria-ferretodo/hero.jpg'
    },
    stats: [['12.000+', 'artículos en stock'], ['98%', 'consultas respondidas en el día'], ['1', 'asesoramiento técnico'], ['0', 'vueltas en vano']],
    secciones: [
      { tipo: 'cards', kicker: 'Rubros', titulo: 'De la pared al techo', items: [
        { icon: 'wrench', titulo: 'Herramientas', desc: 'Manuales, eléctricas e inalámbricas de primeras marcas.' },
        { icon: 'lightbulb', titulo: 'Electricidad', desc: 'Cables, llaves, térmicas y tableros con certificación IRAM.' },
        { icon: 'droplet', titulo: 'Sanitarios y plomería', desc: 'Grifos, tanques, caños y accesorios de baño.' },
        { icon: 'sparkle', titulo: 'Pinturería', desc: 'Línea completa de pinturas, enduidos y accesorios.' }
      ]},
      { tipo: 'pasos', kicker: 'Comprá sin vueltas', titulo: 'Consultá, confirmá, retirá', items: [
        { titulo: 'Mandanos tu consulta', desc: 'Foto o descripción del artículo que necesitás.' },
        { titulo: 'Te confirmamos stock', desc: 'Precio y disponibilidad al instante.' },
        { titulo: 'Retirá o enviamos', desc: 'Reserva hasta 24 hs o delivery en la zona.' }
      ]},
      { tipo: 'galeria', kicker: 'El local', titulo: 'Stock real, todos los rubros', items: [
        { img: 'assets/ferreteria-ferretodo/g1.jpg', label: 'Herramientas' },
        { img: 'assets/ferreteria-ferretodo/g2.jpg', label: 'Sanitarios' },
        { img: 'assets/ferreteria-ferretodo/g3.jpg', label: 'Pinturería' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'El barrio confía', items: [
        { nombre: 'Omar V.', rol: 'Albañil', texto: 'Consulto por WhatsApp y me lo dejan reservado. Nunca perdí el viaje.' },
        { nombre: 'Laura G.', rol: 'Hogar', texto: 'Me asesoraron para arreglar el grifo y quedó perfecto con lo que me vendieron.' },
        { nombre: 'Pedro S.', rol: 'Electricista', texto: 'Tienen todo lo certificado que necesito para mis trabajos.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Atienden a profesionales?', a: 'Sí, tenemos lista de precios especiales y cuenta corriente para profesionales.' },
        { q: '¿Hacen envíos?', a: 'Sí, delivery en la zona para pedidos desde $15.000.' },
        { q: '¿Puedo devolver si no me sirve?', a: 'Sí, 10 días con ticket y producto en buen estado.' }
      ]},
      { tipo: 'cta', titulo: '¿Qué necesitás encontrar?', sub: 'Consultá stock y precio por WhatsApp.' }
    ]
  },
  {
    slug: 'petshop-patitas',
    nombre: 'Patitas Felices',
    rubro: 'Pet shop y veterinaria',
    familia: 'comercio',
    zona: 'Mar del Plata',
    dir: 'Almafuerte 4250, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, tengo una consulta sobre mi mascota',
    paleta: { bg: '#0c1210', bg2: '#121a16', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f0fdf4', sub: '#a3b8a8', prim: '#34d399', prim2: '#fbbf24', accent: '#a7f3d0', wa: '#25d366' },
    fuentes: { h: 'Sora', b: 'Inter' },
    hero: {
      kicker: 'Pet shop y veterinaria · Mar del Plata',
      titulo: ['Mimos para tu mascota,', 'cuidado para su salud'],
      sub: 'Alimentos premium, accesorios, peluquería y atención veterinaria. Consultá por WhatsApp y pedí tu turno hoy.',
      img: 'assets/petshop-patitas/hero.jpg'
    },
    stats: [['800+', 'productos para mascotas'], ['4.9★', 'en 1200 reseñas'], ['30 min', 'turnos de vacunación'], ['0', 'espera sin turno']],
    secciones: [
      { tipo: 'cards', kicker: 'Servicios', titulo: 'Todo para tu compañero', items: [
        { icon: 'paw', titulo: 'Alimentos y snacks', desc: 'Premium y súper premium para perros y gatos, en todas las medidas.' },
        { icon: 'paw', titulo: 'Veterinaria', desc: 'Vacunación, desparasitación, consultas y cirugías menores.' },
        { icon: 'scissors', titulo: 'Peluquería canina', desc: 'Baño, corte y estética con productos hipoalergénicos.' },
        { icon: 'gift', titulo: 'Accesorios y juguetes', desc: 'Camitas, correas, juguetes interactivos y más.' }
      ]},
      { tipo: 'pasos', kicker: 'Turnos', titulo: 'Atendé a tu mascota en 3 pasos', items: [
        { titulo: 'Contanos qué necesita', desc: 'Consulta, vacuna, baño o producto: te orientamos.' },
        { titulo: 'Agendá tu turno', desc: 'Te confirmamos horario al instante.' },
        { titulo: 'Tu mascota feliz', desc: 'Atención con veterinarios y bañadores certificados.' }
      ]},
      { tipo: 'galeria', kicker: 'El pet shop', titulo: 'Un lugar que ellos aman', items: [
        { img: 'assets/petshop-patitas/g1.jpg', label: 'Góndolas de alimentos' },
        { img: 'assets/petshop-patitas/g2.jpg', label: 'Consultorio veterinario' },
        { img: 'assets/petshop-patitas/g3.jpg', label: 'Zona de peluquería' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'Clientas de 4 patas y humanas', items: [
        { nombre: 'Vale M.', rol: 'Peluquería', texto: 'Mi perra sale feliz de cada baño. La tratan como si fuera de la familia.' },
        { nombre: 'Agus C.', rol: 'Veterinaria', texto: 'Sacamos turno por WhatsApp sin esperar y la atención fue excelente.' },
        { nombre: 'Ro D.', rol: 'Alimentos', texto: 'Encontré el alimento premium que buscaba al mejor precio de la zona.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Atienden urgencias?', a: 'Sí, coordinamos urgencias por WhatsApp de lunes a sábado hasta las 20 hs.' },
        { q: '¿Trabajan con obra social de mascotas?', a: 'Sí, con las principales mutuales veterinarias de la ciudad.' },
        { q: '¿Hacen envíos de alimentos?', a: 'Sí, delivery en la zona con bolsas grandes sin cargo.' }
      ]},
      { tipo: 'cta', titulo: 'Tu mascota se lo merece', sub: 'Turnos y consultas por WhatsApp.' }
    ]
  }
]
