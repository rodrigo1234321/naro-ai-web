export const turismo = [
  {
    slug: 'cabanas-aires-faro',
    nombre: 'Aires del Faro Cabañas',
    rubro: 'Cabañas y complejos',
    familia: 'turismo',
    zona: 'Mar del Plata',
    dir: 'Ruta 11 km 505, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero consultar disponibilidad de cabañas',
    paleta: { bg: '#0b100e', bg2: '#101713', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f4f7f0', sub: '#9fb09e', prim: '#84cc16', prim2: '#d97706', accent: '#d9f99d', wa: '#25d366' },
    fuentes: { h: 'Fraunces', b: 'Inter' },
    hero: {
      kicker: 'Cabañas en la costa · Ruta 11 km 505',
      titulo: ['Despertá entre', 'árboles y dunas'],
      sub: 'Cabañas de madera con hidromasaje, fogón y vista al bosque. A 5 minutos de la playa. Consultá disponibilidad por WhatsApp.',
      img: 'assets/cabanas-aires-faro/hero.jpg'
    },
    stats: [['12', 'cabañas en el complejo'], ['4.9★', 'en 800 reseñas'], ['5 min', 'de la playa'], ['100%', 'con hidromasaje']],
    secciones: [
      { tipo: 'cards', kicker: 'Las cabañas', titulo: 'Elegí la tuya', sub: 'Todas con cocina equipada, wifi y estacionamiento.', items: [
        { icon: 'home', titulo: 'Cabaña Aromo', desc: 'Para 2 personas. Hidromasaje en suite privada y fogón.', precio: 'USD 85 / noche', chips: ['2 pax', 'Hidromasaje'] },
        { icon: 'home', titulo: 'Cabaña Ciprés', desc: 'Para 4 personas. Loft con vista al bosque y deck con parrilla.', precio: 'USD 120 / noche', chips: ['4 pax', 'Parrilla'] },
        { icon: 'home', titulo: 'Cabaña Arrayán', desc: 'Para 6 personas. Dos plantas, dos baños y quincho propio.', precio: 'USD 160 / noche', chips: ['6 pax', 'Quincho'] }
      ]},
      { tipo: 'galeria', kicker: 'El complejo', titulo: 'Naturaleza y confort', items: [
        { img: 'assets/cabanas-aires-faro/g1.jpg', label: 'Entrada del complejo' },
        { img: 'assets/cabanas-aires-faro/g2.jpg', label: 'Cabaña tipo' },
        { img: 'assets/cabanas-aires-faro/g3.jpg', label: 'Bosque y senderos' }
      ]},
      { tipo: 'pasos', kicker: 'Reservas', titulo: 'Tu escapada en 3 pasos', items: [
        { titulo: 'Consultá fechas', desc: 'Disponibilidad real al instante por WhatsApp.' },
        { titulo: 'Reservá con seña', desc: 'Contrato digital y confirmación inmediata.' },
        { titulo: 'Llegá y desconectá', desc: 'Check-in autónomo con código, leña incluida.' }
      ]},
      { tipo: 'testimonios', kicker: 'Huéspedes', titulo: 'Escapadas inolvidables', items: [
        { nombre: 'Fran y Mel', rol: 'Fin de semana', texto: 'El hidromasaje bajo las estrellas con el sonido del bosque: no hay mejor plan.' },
        { nombre: 'Familia Ríos', rol: 'Vacaciones de invierno', texto: 'Los chicos se la pasaron entre las cabañas y el fogón. Limpieza impecable.' },
        { nombre: 'Tomi B.', rol: 'Trabajo remoto', texto: 'Wifi de 100 megas y paz absoluta. Me quedé una semana laburando desde el deck.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Aceptan mascotas?', a: 'Sí, somos pet friendly en todas las cabañas. Traé a tu compañero.' },
        { q: '¿Cuál es el check-in?', a: 'Desde las 14:00 con código autónomo. Check-out 10:30.' },
        { q: '¿Hay supermercado cerca?', a: 'A 3 km hay almacén y carnicería. También ofrecemos cajas de bienvenida.' }
      ]},
      { tipo: 'cta', titulo: 'Tu escapada te espera', sub: 'Consultá disponibilidad por WhatsApp y reservá hoy.' }
    ]
  },
  {
    slug: 'hotel-olas-sur',
    nombre: 'Olas Sur Hotel & Apart',
    rubro: 'Hotel y apart hotel',
    familia: 'turismo',
    zona: 'Mar del Plata',
    dir: 'Av. Colón 3150, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero consultar tarifas del hotel',
    paleta: { bg: '#081019', bg2: '#0d1722', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f0f9ff', sub: '#8fb3cc', prim: '#0ea5e9', prim2: '#eab308', accent: '#bae6fd', wa: '#25d366' },
    fuentes: { h: 'Sora', b: 'Inter' },
    hero: {
      kicker: 'Hotel y apart hotel · 50 mts de la playa',
      titulo: ['Dormite con el mar,', 'despertate con olas'],
      sub: 'Habitaciones y apartamentos con desayuno, piscina climatizada y estacionamiento. Reservá directo por WhatsApp y ahorrá en tarifas.',
      img: 'assets/hotel-olas-sur/hero.jpg'
    },
    stats: [['50 mts', 'de la playa'], ['4.8★', 'en 2100 reseñas'], ['24/7', 'recepción'], ['10%', 'off reservando directo']],
    secciones: [
      { tipo: 'cards', kicker: 'Alojamiento', titulo: 'Elegí cómo dormir', sub: 'Tarifas directas con desayuno incluido.', items: [
        { icon: 'bed', titulo: 'Habitación Standard', desc: 'Vista al mar o a la ciudad. Desayuno buffet incluido.', precio: 'USD 95 / noche', chips: ['2 pax', 'Desayuno'] },
        { icon: 'bed', titulo: 'Superior', desc: 'Balcón privado, amplia y luminosa, servicio a la habitación.', precio: 'USD 140 / noche', chips: ['2 pax', 'Balcón'] },
        { icon: 'home', titulo: 'Apart para 4', desc: 'Cocina equipada, living y capacidad familiar.', precio: 'USD 180 / noche', chips: ['4 pax', 'Cocina'] }
      ]},
      { tipo: 'galeria', kicker: 'El hotel', titulo: 'Comodidades pensadas para vos', items: [
        { img: 'assets/hotel-olas-sur/g1.jpg', label: 'Piscina climatizada' },
        { img: 'assets/hotel-olas-sur/g2.jpg', label: 'Habitación Superior' },
        { img: 'assets/hotel-olas-sur/g3.jpg', label: 'Desayuno buffet' }
      ]},
      { tipo: 'pasos', kicker: 'Reserva directa', titulo: 'Mejor precio, cero comisiones', items: [
        { titulo: 'Contanos tus fechas', desc: 'Te pasamos tarifa directa con 10% de descuento.' },
        { titulo: 'Confirmá tu reserva', desc: 'Seña mínima y confirmación al instante.' },
        { titulo: 'Llegá y disfrutá', desc: 'Toallones de playa y reposeras incluidas.' }
      ]},
      { tipo: 'testimonios', kicker: 'Huéspedes', titulo: 'Experiencias de mar', items: [
        { nombre: 'Agustina L.', rol: 'Escapada de relax', texto: 'La piscina climatizada en otoño es un lujo. Reservamos directo y pagamos 10% menos.' },
        { nombre: 'Los Páez', rol: 'Vacaciones familiares', texto: 'El apart para 4 fue cómodo y el desayuno riquísimo. La playa cruzando la calle.' },
        { nombre: 'Nacho S.', rol: 'Viaje de trabajo', texto: 'Wifi impecable, vista al mar y estacionamiento cubierto. Para volver.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Cuál es el horario de piscina?', a: 'De 8 a 22 hs, climatizada todo el año.' },
        { q: '¿Tienen cochera?', a: 'Sí, estacionamiento cubierto con cargo de USD 8 por día.' },
        { q: '¿Aceptan mascotas?', a: 'En el sector apart y con previa consulta. Pet friendly limitado.' }
      ]},
      { tipo: 'cta', titulo: 'El mar te está llamando', sub: 'Consultá tarifa directa y reservá por WhatsApp.' }
    ]
  }
]
