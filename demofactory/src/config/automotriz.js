export const automotriz = [
  {
    slug: 'lavadero-aquashine',
    nombre: 'AquaShine Wash',
    rubro: 'Lavadero y detallado',
    familia: 'automotriz',
    zona: 'Mar del Plata',
    dir: 'Av. Fortunato de la Plaza 2800, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero turno para el lavadero',
    paleta: { bg: '#08121a', bg2: '#0d1a24', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f0f9ff', sub: '#8fb3cc', prim: '#22d3ee', prim2: '#38bdf8', accent: '#a5f3fc', wa: '#25d366' },
    fuentes: { h: 'Sora', b: 'Inter' },
    hero: {
      kicker: 'Lavadero y detallado · Mar del Plata',
      titulo: ['Tu auto impecable,', 'mientras vos trabajás'],
      sub: 'Lavado, pulido y tratamiento cerámico con productos premium. Turno por WhatsApp y lo dejás listo en el día.',
      img: 'assets/lavadero-aquashine/hero.jpg'
    },
    stats: [['500+', 'autos por mes'], ['90 min', 'lavado completo'], ['100%', 'productos premium'], ['4.9★', 'valoración']],
    secciones: [
      { tipo: 'cards', kicker: 'Servicios', titulo: 'Del lavado al brillo', items: [
        { icon: 'droplet', titulo: 'Lavado exterior', desc: 'Champú de ph neutro, encerado y secado sin manchas.', precio: '$18.000' },
        { icon: 'sparkle', titulo: 'Lavado full', desc: 'Exterior + interior: tapizados, paneles, llantas y aspirado.', precio: '$35.000' },
        { icon: 'shield', titulo: 'Tratamiento cerámico', desc: 'Protección de 12 meses con brillo espejo y repelencia al agua.', precio: '$120.000' },
        { icon: 'leaf', titulo: 'Lavado de tapizados', desc: 'Profundo con vapor para tapizados y alfombras.', precio: '$40.000' }
      ]},
      { tipo: 'pasos', kicker: 'Turnos', titulo: 'Reservá tu horario', items: [
        { titulo: 'Pedí tu turno', desc: 'Contanos el servicio y el día que te convenga.' },
        { titulo: 'Lo dejás y trabajás', desc: 'Entregá el auto y te avisamos cuando esté listo.' },
        { titulo: 'Retirá brillando', desc: 'Checklist de entrega y garantía del servicio.' }
      ]},
      { tipo: 'galeria', kicker: 'Trabajos', titulo: 'El antes y el después', items: [
        { img: 'assets/lavadero-aquashine/g1.jpg', label: 'Detallado completo' },
        { img: 'assets/lavadero-aquashine/g2.jpg', label: 'Cerámico aplicado' },
        { img: 'assets/lavadero-aquashine/g3.jpg', label: 'Interior con vapor' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'Autos que hablan', items: [
        { nombre: 'Gus A.', rol: 'Cerámico', texto: 'El brillo después del cerámico es increíble y el agua no se le pega más.' },
        { nombre: 'Caro M.', rol: 'Lavado full', texto: 'Dejo el auto a la mañana y a las 14 está impecable por dentro y por fuera.' },
        { nombre: 'Rodo P.', rol: 'Cliente mensual', texto: 'Tengo el plan mensual y es lo más cómodo del mundo. Siempre listo a horario.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Cuánto tarda un lavado?', a: 'Exterior 45 min, full 90 min. Los cerámicos se dejan en el día.' },
        { q: '¿Atienden motos?', a: 'Sí, lavado y pulido de motos también.' },
        { q: '¿Cuánto dura el cerámico?', a: 'Entre 12 y 18 meses con el mantenimiento recomendado.' }
      ]},
      { tipo: 'cta', titulo: 'Agendá el brillo de tu auto', sub: 'Turno por WhatsApp y retirás en el día.' }
    ]
  },
  {
    slug: 'gomeria-rodado-sur',
    nombre: 'Rodado Sur Gomería',
    rubro: 'Gomería y neumáticos',
    familia: 'automotriz',
    zona: 'Mar del Plata',
    dir: 'Ruta 226 km 12, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, consulto por neumáticos',
    paleta: { bg: '#0c0e11', bg2: '#12151a', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f3f4f6', sub: '#9ca3af', prim: '#ef4444', prim2: '#f97316', accent: '#fca5a5', wa: '#25d366' },
    fuentes: { h: 'Manrope', b: 'Inter' },
    hero: {
      kicker: 'Gomería y neumáticos · Mar del Plata',
      titulo: ['Rodá seguro,', 'con el mejor precio'],
      sub: 'Neumáticos premium con instalación, balanceo y alineación. Cotizá tu medida por WhatsApp y te lo reservamos.',
      img: 'assets/gomeria-rodado-sur/hero.jpg'
    },
    stats: [['40+', 'marcas disponibles'], ['30 min', 'instalación completa'], ['12', 'cuotas sin interés'], ['4.8★', 'de 900 clientes']],
    secciones: [
      { tipo: 'cards', kicker: 'Servicios', titulo: 'Todo para tus ruedas', items: [
        { icon: 'wrench', titulo: 'Venta e instalación', desc: 'Neumáticos de las mejores marcas con instalación y balanceo incluido.', precio: 'Cotizá tu medida' },
        { icon: 'activity', titulo: 'Balanceo y alineación', desc: 'Diagnóstico láser y equilibrio perfecto para cuidar la cubierta.', precio: '$25.000' },
        { icon: 'shield', titulo: 'Reparación', desc: 'Parchado profesional y reparación de llantas con garantía.', precio: '$12.000' },
        { icon: 'droplet', titulo: 'Auxilio en ruta', desc: 'Asistencia móvil para cambio de cubierta en la zona.', precio: 'Consultar' }
      ]},
      { tipo: 'pasos', kicker: 'Cotizá fácil', titulo: 'Tu medida, tu precio, hoy', items: [
        { titulo: 'Escribinos tu medida', desc: 'Ej: 205/55 R16. Te cotizamos 3 opciones de marcas.' },
        { titulo: 'Reservá sin cargo', desc: 'Te guardamos el juego hasta 48 hs con 12 cuotas sin interés.' },
        { titulo: 'Instalá y andá', desc: 'En 30 minutos, con balanceo y presupuesto cerrado.' }
      ]},
      { tipo: 'galeria', kicker: 'Taller', titulo: 'Tecnología para tus ruedas', items: [
        { img: 'assets/gomeria-rodado-sur/g1.jpg', label: 'Alineación láser' },
        { img: 'assets/gomeria-rodado-sur/g2.jpg', label: 'Neumáticos en stock' },
        { img: 'assets/gomeria-rodado-sur/g3.jpg', label: 'Balanceo digital' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'Rodando seguros', items: [
        { nombre: 'Juan M.', rol: 'Juego completo', texto: 'Me cotizaron por WhatsApp al toque y el precio era mejor que en cualquier cadena.' },
        { nombre: 'Ana K.', rol: 'Alineación', texto: 'El auto dejó de jalear y las cubiertas duran más. Profesionales.' },
        { nombre: 'Leo S.', rol: 'Parchado', texto: 'Me salvaron un domingo con el auxilio móvil. Rápidos y honestos.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Cómo sé la medida de mi neumático?', a: 'Está en el costado de la cubierta: ej. 205/55 R16. O mándanos una foto.' },
        { q: '¿Financian?', a: 'Hasta 12 cuotas sin interés con tarjetas y 3 cuotas con débito.' },
        { q: '¿Guardan las cubiertas usadas?', a: 'Sí, te las dejamos listas para descarte o reuso.' }
      ]},
      { tipo: 'cta', titulo: 'Cotizá tus cubiertas hoy', sub: 'Mandanos tu medida por WhatsApp y reservá sin cargo.' }
    ]
  },
  {
    slug: 'taller-motorbox',
    nombre: 'MotorBox Taller',
    rubro: 'Taller mecánico y repuestos',
    familia: 'automotriz',
    zona: 'Mar del Plata',
    dir: 'Av. Juan B. Justo 5600, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero agendar un diagnóstico',
    paleta: { bg: '#0b0d10', bg2: '#111418', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f4f4f2', sub: '#9aa1a8', prim: '#facc15', prim2: '#f97316', accent: '#fde047', wa: '#25d366' },
    fuentes: { h: 'Space Grotesk', b: 'Inter' },
    hero: {
      kicker: 'Taller mecánico y repuestos · Mar del Plata',
      titulo: ['Diagnóstico honesto,', 'arreglo garantizado'],
      sub: 'Mecánica general, electrónica y chapa con presupuesto previo por WhatsApp. Sin sorpresas, sin letra chica.',
      img: 'assets/taller-motorbox/hero.jpg'
    },
    stats: [['15+', 'años de taller'], ['1.000+', 'vehículos reparados'], ['24 hs', 'presupuesto por escrito'], ['6', 'meses de garantía']],
    secciones: [
      { tipo: 'cards', kicker: 'Servicios', titulo: 'De la correa a la chapa', items: [
        { icon: 'wrench', titulo: 'Mecánica general', desc: 'Mantenimiento programado, frenos, suspensión y motor.' },
        { icon: 'activity', titulo: 'Diagnóstico computarizado', desc: 'Escáner de última generación para encontrar la falla real.' },
        { icon: 'flame', titulo: 'Chapa y pintura', desc: 'Reparaciones con pintura en cabina y colorimetría digital.' },
        { icon: 'shield', titulo: 'Repuestos originales', desc: 'Stock propio de filtros, correas y accesorios al instante.' }
      ]},
      { tipo: 'pasos', kicker: 'Cómo trabajamos', titulo: 'Transparencia total', items: [
        { titulo: 'Contanos el problema', desc: 'Por WhatsApp, con foto o video del síntoma.' },
        { titulo: 'Presupuesto previo', desc: 'Te enviamos diagnóstico y presupuesto por escrito antes de tocar nada.' },
        { titulo: 'Autorizás y arreglamos', desc: 'Trabajamos solo lo aprobado, con fotos del avance.' }
      ]},
      { tipo: 'galeria', kicker: 'El taller', titulo: 'Así trabajamos', items: [
        { img: 'assets/taller-motorbox/g1.jpg', label: 'Box de diagnóstico' },
        { img: 'assets/taller-motorbox/g2.jpg', label: 'Escáner y electrónica' },
        { img: 'assets/taller-motorbox/g3.jpg', label: 'Zona de chapa y pintura' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'La confianza se gana', items: [
        { nombre: 'Martín Q.', rol: 'Reparación mayor', texto: 'Me mandaron video del problema real antes de presupuestar. Esa honestidad no tiene precio.' },
        { nombre: 'Eva L.', rol: 'Mantenimiento', texto: 'El auto quedó como nuevo y pagué exactamente lo que me habían dicho.' },
        { nombre: 'Fer D.', rol: 'Electrónica', texto: 'Otro taller me quería cambiar la central. Acá encontraron un cable pelado. Ganaron un cliente.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿El diagnóstico tiene cargo?', a: 'El escaneo y diagnóstico inicial es sin cargo si hacés la reparación con nosotros.' },
        { q: '¿Qué garantía tienen los trabajos?', a: '6 meses de garantía escrita en mano de obra y repuestos.' },
        { q: '¿Trabajan con obras y flotas?', a: 'Sí, convenios para flotas y mantenimiento de vehículos comerciales.' }
      ]},
      { tipo: 'cta', titulo: 'Contanos qué le pasa a tu auto', sub: 'Diagnóstico y presupuesto por WhatsApp, sin cargo.' }
    ]
  }
]
