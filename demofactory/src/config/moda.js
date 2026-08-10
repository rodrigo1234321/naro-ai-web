export const moda = [
  {
    slug: 'showroom-nube',
    nombre: 'Nube Atelier',
    rubro: 'Showroom de indumentaria femenina',
    familia: 'moda',
    zona: 'Mar del Plata',
    dir: 'San Luis 1650, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, vi un producto en el showroom y quiero encargarlo',
    paleta: { bg: '#100b14', bg2: '#171020', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#faf5f9', sub: '#b8a6bd', prim: '#e879f9', prim2: '#f9a8d4', accent: '#fbcfe8', wa: '#25d366' },
    fuentes: { h: 'Space Grotesk', b: 'Inter' },
    hero: {
      kicker: 'Showroom de moda · Mar del Plata',
      titulo: ['Prendas con historia,', 'en talles que existen'],
      sub: 'Producción propia en pequeñas tandas, talles del 1 al 5 y stock real. Mirá la colección y encargá tu talle por WhatsApp.',
      img: 'assets/showroom-nube/hero.jpg'
    },
    stats: [['100%', 'producción propia'], ['S–XL', 'talles disponibles'], ['2', 'lanzamientos al mes'], ['3 hs', 'respuesta de pedidos']],
    secciones: [
      { tipo: 'cards', kicker: 'Colección', titulo: 'Lo nuevo del atelier', sub: 'Tocá un producto para ver talles y pedilo por WhatsApp.', items: [
        { icon: 'shirt', titulo: 'Top Lenny', desc: 'Algodón peinado, corte oversize. Edición limitada.', precio: '$28.000', chips: ['S', 'M', 'L'] },
        { icon: 'shirt', titulo: 'Vestido Aura', desc: 'Lino y viscosa, ideal para la tarde.', precio: '$42.000', chips: ['M', 'L', 'XL'] },
        { icon: 'shirt', titulo: 'Blazer Milena', desc: 'Estructurado, tela de confección premium.', precio: '$55.000', chips: ['S', 'M'] }
      ]},
      { tipo: 'galeria', kicker: 'El atelier', titulo: 'Producción propia, detalle a detalle', items: [
        { img: 'assets/showroom-nube/g1.jpg', label: 'Colección otoño' },
        { img: 'assets/showroom-nube/g2.jpg', label: 'Nuestros talleres' },
        { img: 'assets/showroom-nube/g3.jpg', label: 'Detalles de confección' }
      ]},
      { tipo: 'pasos', kicker: 'Cómo comprar', titulo: 'De la pasarela a tu casa', items: [
        { titulo: 'Elegí tus prendas', desc: 'Mirá el catálogo y contanos qué te gustó.' },
        { titulo: 'Consultá stock real', desc: 'Te confirmamos talle y disponibilidad al instante.' },
        { titulo: 'Retiro o envío', desc: 'Retiro en showroom o envío a todo el país por motomensajería.' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientas', titulo: 'Las que ya son de Nube', items: [
        { nombre: 'Mili C.', rol: 'Suscriptora de novedades', texto: 'Los talles son exactos y las telas se sienten premium. Compré 3 veces seguidas.' },
        { nombre: 'Roxana F.', rol: 'Compradora online', texto: 'Me mandaron fotos de las prendas puestas y me ayudaron a elegir talle. Excelente trato.' },
        { nombre: 'Luli O.', rol: 'Edición limitada', texto: 'Cuando dice edición limitada es limitada: me lo compré al toque y no me arrepiento.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Cómo elijo mi talle?', a: 'Te pasamos la tabla de medidas por WhatsApp y podés pedir talles de prueba.' },
        { q: '¿Hacen envíos?', a: 'Sí, a todo el país. Coordinamos por WhatsApp y te llega en 48/72 hs hábiles.' },
        { q: '¿Hay cambios?', a: 'Sí, 10 días para cambios por talle o color en productos sin uso.' }
      ]},
      { tipo: 'cta', titulo: 'Tu próxima prenda te espera', sub: 'Escribinos y consultá stock real de la colección.' }
    ]
  },
  {
    slug: 'sport-base9',
    nombre: 'Base 9 Sport',
    rubro: 'Camisetas y deportivo',
    familia: 'moda',
    zona: 'Mar del Plata',
    dir: 'Av. Luro 3300, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero encargar una camiseta',
    paleta: { bg: '#0a0e14', bg2: '#0f1520', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f8fafc', sub: '#94a3b8', prim: '#38bdf8', prim2: '#f43f5e', accent: '#bae6fd', wa: '#25d366' },
    fuentes: { h: 'Space Grotesk', b: 'Inter' },
    hero: {
      kicker: 'Camisetas y deportivo · Mar del Plata',
      titulo: ['Vestí tu pasión,', 'con tu nombre en la espalda'],
      sub: 'Camisetas originales de fútbol y selecciones, personalizadas con nombre y número. Encargá por WhatsApp y retirá en 48 hs.',
      img: 'assets/sport-base9/hero.jpg'
    },
    stats: [['100%', 'originales, con códigos'], ['48 hs', 'personalización'], ['80+', 'modelos en stock'], ['4.9★', 'de 1200 clientes']],
    secciones: [
      { tipo: 'cards', kicker: 'Catálogo', titulo: 'La que buscas, con tu nombre', sub: 'Elegí modelo, talles y personalización. Todo por WhatsApp.', items: [
        { icon: 'shirt', titulo: 'Camisetas de clubes', desc: 'Originales, con parches de competición y numeración.', precio: '$48.000', chips: ['S', 'M', 'L', 'XL'] },
        { icon: 'shirt', titulo: 'Selecciones', desc: 'Mundiales y ediciones retro, con tela termoadherente.', precio: '$52.000', chips: ['S', 'M', 'L', 'XL'] },
        { icon: 'dumbbell', titulo: 'Indumentaria entrenamiento', desc: 'Buzos, pantalones y camperas técnicas.', precio: 'Desde $35.000' }
      ]},
      { tipo: 'pasos', kicker: 'Personalización', titulo: 'Tu camiseta en 3 pasos', items: [
        { titulo: 'Elegí tu modelo', desc: 'Mandanos el modelo que buscás y te confirmamos stock.' },
        { titulo: 'Personalizá', desc: 'Nombre y número, en tipografía original de tu club.' },
        { titulo: 'Retirá en 48 hs', desc: 'Te avisamos cuando esté lista, o te la enviamos.' }
      ]},
      { tipo: 'galeria', kicker: 'Productos', titulo: 'Stock real, sin vueltas', items: [
        { img: 'assets/sport-base9/g1.jpg', label: 'Camisetas originales' },
        { img: 'assets/sport-base9/g2.jpg', label: 'Personalización' },
        { img: 'assets/sport-base9/g3.jpg', label: 'Indumentaria de entrenamiento' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'La hinchada recomienda', items: [
        { nombre: 'Ramiro V.', rol: 'Camiseta personalizada', texto: 'Pidieron mi nombre y número en la camiseta y quedó igual a la oficial. 10 puntos.' },
        { nombre: 'Lautaro S.', rol: 'Regalo', texto: 'Compré la camiseta de mi sobrino con su nombre: llegó en tiempo récord y con código de verificación.' },
        { nombre: 'Nico A.', rol: 'Coleccionista', texto: 'Consiguen ediciones que en otros lados no aparecen. Mi local de confianza.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Son originales?', a: 'Sí, todas con código de verificación holográfico y packaging original.' },
        { q: '¿Cuánto tarda la personalización?', a: '48 horas hábiles para nombre y número. Sin personalizar, retiro inmediato.' },
        { q: '¿Hacen envíos?', a: 'Sí, a todo el país por correo con seguimiento.' }
      ]},
      { tipo: 'cta', titulo: 'Tu camiseta te está esperando', sub: 'Consultá stock y personalizá por WhatsApp.' }
    ]
  },
  {
    slug: 'calzado-paso-norte',
    nombre: 'Paso Norte',
    rubro: 'Calzado',
    familia: 'moda',
    zona: 'Mar del Plata',
    dir: 'Güemes 3000, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero consultar por un calzado',
    paleta: { bg: '#0d1117', bg2: '#131a23', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f1f5f9', sub: '#94a3b8', prim: '#fb923c', prim2: '#2dd4bf', accent: '#fed7aa', wa: '#25d366' },
    fuentes: { h: 'Sora', b: 'Inter' },
    hero: {
      kicker: 'Calzado urbano y deportivo · Mar del Plata',
      titulo: ['Cada paso cuenta,', 'empezá por el calzado'],
      sub: 'Zapatillas urbanas, cuero y deportivas con stock real en todos los talles. Consultá tu talle por WhatsApp y reservalo.',
      img: 'assets/calzado-paso-norte/hero.jpg'
    },
    stats: [['350+', 'pares en local'], ['36–45', 'talles en stock'], ['90 días', 'garantía de suela'], ['4.8★', 'valoración']],
    secciones: [
      { tipo: 'cards', kicker: 'Catálogo', titulo: 'El calzado que buscás', sub: 'Reservá tu par por WhatsApp antes de venir.', items: [
        { icon: 'shoe', titulo: 'Zapatillas urbanas', desc: 'Modelos street y lifestyle de las mejores marcas.', precio: 'Desde $85.000', chips: ['38', '40', '42'] },
        { icon: 'shoe', titulo: 'Cuero de vestir', desc: 'Calzado clásico y cómodo para oficina y eventos.', precio: 'Desde $95.000', chips: ['39', '41', '43'] },
        { icon: 'activity', titulo: 'Deportivas', desc: 'Running y entrenamiento con amortiguación certificada.', precio: 'Desde $90.000', chips: ['40', '42', '44'] }
      ]},
      { tipo: 'pasos', kicker: 'Reservá tu par', titulo: 'Sin perder el viaje', items: [
        { titulo: 'Contanos el modelo', desc: 'Te confirmamos stock y talles disponibles al instante.' },
        { titulo: 'Reservá sin cargo', desc: 'Te lo guardamos hasta 48 horas para que lo pruebes.' },
        { titulo: 'Probá y llevate', desc: 'Prueba en local con asesoramiento de talles.' }
      ]},
      { tipo: 'galeria', kicker: 'El local', titulo: 'Stock real, todos los talles', items: [
        { img: 'assets/calzado-paso-norte/g1.jpg', label: 'Zona urbana' },
        { img: 'assets/calzado-paso-norte/g2.jpg', label: 'Línea deportiva' },
        { img: 'assets/calzado-paso-norte/g3.jpg', label: 'Cuero y vestir' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'Pies felices, clientes felices', items: [
        { nombre: 'Gabi H.', rol: 'Reserva online', texto: 'Reservé mi talle por WhatsApp y al llegar ya estaba probándome el par. Súper cómodo.' },
        { nombre: 'Elías T.', rol: 'Running', texto: 'Me asesoraron con la pisada y elegí las zapatillas correctas. Corro sin dolor ahora.' },
        { nombre: 'Micaela R.', rol: 'Deporte', texto: 'Precios justos y garantía de suela real. Compro acá siempre.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Hacen envíos?', a: 'Sí, envíos a todo el país y local para probarte los talles.' },
        { q: '¿Cómo reservo?', a: 'Por WhatsApp: modelo, talle y te lo guardamos hasta 48 hs sin cargo.' },
        { q: '¿Qué pasa si no me queda?', a: 'Tenés 10 días para cambio por talle o modelo, con la etiqueta intacta.' }
      ]},
      { tipo: 'cta', titulo: 'Tu talle te espera', sub: 'Consultá stock y reservá tu par por WhatsApp.' }
    ]
  }
]
