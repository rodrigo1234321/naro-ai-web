export const gastro = [
  {
    slug: 'restaurante-rias',
    nombre: 'Restaurante Rías',
    rubro: 'Restaurante y cocina de mar',
    familia: 'gastro',
    zona: 'Mar del Plata',
    dir: 'Av. de los Trabajadores 1800, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero reservar una mesa',
    paleta: { bg: '#0a0f1a', bg2: '#0f1626', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f8fafc', sub: '#94a3b8', prim: '#2dd4bf', prim2: '#f59e0b', accent: '#99f6e4', wa: '#25d366' },
    fuentes: { h: 'Fraunces', b: 'Inter' },
    hero: {
      kicker: 'Cocina de mar · Zona Puerto · Mar del Plata',
      titulo: ['El mar en su punto,', 'en cada plato'],
      sub: 'Mariscos frescos, pescados del día y una bodega pensada para maridar. Reservá tu mesa por WhatsApp en segundos.',
      img: 'assets/restaurante-rias/hero.jpg'
    },
    stats: [['15', 'años de historia'], ['4.9★', 'calificación promedio'], ['90%', 'pescados del día'], ['300+', 'bodega de etiquetas']],
    secciones: [
      { tipo: 'cards', kicker: 'La carta', titulo: 'Sabores que nacen del mar', sub: 'Probá nuestros clásicos y las especialidades del día.', items: [
        { icon: 'flame', titulo: 'Parrilla de mar', desc: 'Pulpo a la parrilla, langostinos y pescados sobre brasas.', precio: '$18.000' },
        { icon: 'wine', titulo: 'Mariscada Rías', desc: 'Mejillones, almejas, berberechos y langostinos al vapor.', precio: '$42.000' },
        { icon: 'leaf', titulo: 'Vegetales del huerto', desc: 'Guarniciones y platos vegetarianos de estación.', precio: '$12.000' },
        { icon: 'sparkle', titulo: 'Postres de la casa', desc: 'Tarta de limón, panna cotta y flan de la abuela.', precio: '$8.000' }
      ]},
      { tipo: 'galeria', kicker: 'El restaurante', titulo: 'Un espacio para recordar', items: [
        { img: 'assets/restaurante-rias/g1.jpg', label: 'Salón principal' },
        { img: 'assets/restaurante-rias/g2.jpg', label: 'Mesa junto al ventanal' },
        { img: 'assets/restaurante-rias/g3.jpg', label: 'Especialidad del día' }
      ]},
      { tipo: 'pasos', kicker: 'Reservas', titulo: 'Reservá en 3 pasos', items: [
        { titulo: 'Escribinos', desc: 'Contanos fecha, cantidad de personas y si hay algún antojo especial.' },
        { titulo: 'Confirmá tu mesa', desc: 'Te respondemos al instante con la confirmación y el sector elegido.' },
        { titulo: 'Disfrutá', desc: 'Llegá y el equipo te recibe con el mejor servicio de la zona.' }
      ]},
      { tipo: 'testimonios', kicker: 'Comensales', titulo: 'Lo que se dice de Rías', items: [
        { nombre: 'Martín E.', rol: 'Cena de aniversario', texto: 'El pulpo a la parrilla es de otro planeta. La atención hizo la noche perfecta.' },
        { nombre: 'Vero S.', rol: 'Turista de Buenos Aires', texto: 'Lo mejor del viaje a Mar del Plata. Reservamos por WhatsApp y cero espera.' },
        { nombre: 'Pablo R.', rol: 'Cliente frecuente', texto: 'El pescado siempre fresco y el servicio, impecable. Mi lugar de confianza en el puerto.' }
      ]},
      { tipo: 'faq', kicker: 'Información', titulo: 'Antes de venir', items: [
        { q: '¿Necesito reserva?', a: 'Los fines de semana recomendamos reservar. Entre semana podés venir sin turno.' },
        { q: '¿Tienen menú para celíacos?', a: 'Sí, contamos con opciones sin TACC y cocina sin contaminación cruzada.' },
        { q: '¿Aceptan mascotas?', a: 'Sí, en el sector exterior de la terraza son bienvenidas.' }
      ]},
      { tipo: 'cta', titulo: '¿Reservamos tu mesa?', sub: 'Escribinos y en minutos tenés tu reserva confirmada.' }
    ]
  },
  {
    slug: 'cafe-verde-alba',
    nombre: 'Café Verde Alba',
    rubro: 'Cafetería de especialidad',
    familia: 'gastro',
    zona: 'Mar del Plata',
    dir: 'Córdoba 2740, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero hacer un pedido al Café Verde Alba',
    paleta: { bg: '#14100a', bg2: '#1b150e', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f7f3ea', sub: '#b3a888', prim: '#9bb168', prim2: '#d9a05b', accent: '#e8e0c8', wa: '#25d366' },
    fuentes: { h: 'Bricolage Grotesque', b: 'Inter' },
    hero: {
      kicker: 'Café de especialidad · Mar del Plata',
      titulo: ['Despertá con el', 'mejor café de la ciudad'],
      sub: 'Granos de origen, tostado propio y brunch de fin de semana. Pedí por WhatsApp y pasá a retirar sin filas.',
      img: 'assets/cafe-verde-alba/hero.jpg'
    },
    stats: [['3', 'orígenes en rotación'], ['86+', 'puntos de tostión'], ['12', 'filtrados y métodos'], ['1', 'barista campeón regional']],
    secciones: [
      { tipo: 'cards', kicker: 'Carta', titulo: 'De la máquina a tu mesa', items: [
        { icon: 'coffee', titulo: 'Espresso y filtrados', desc: 'Café de especialidad con extracción cuidada y leche de origen.', precio: '$3.500' },
        { icon: 'leaf', titulo: 'Brunch de fin de semana', desc: 'Tostadas, huevos, granola y jugos naturales.', precio: '$14.000' },
        { icon: 'sparkle', titulo: 'Pastelería artesanal', desc: 'Alfajores, medialunas de manteca y tortas de estación.', precio: '$3.000' },
        { icon: 'coffee', titulo: 'Café para llevar', desc: 'Bolsas de 250g y 1kg tostadas en el local.', precio: 'Desde $12.000' }
      ]},
      { tipo: 'pasos', kicker: 'Pedidos', titulo: 'Pedí y retirá sin espera', items: [
        { titulo: 'Elegí tu pedido', desc: 'Mirá la carta y armá tu combo por WhatsApp.' },
        { titulo: 'Pagá al retirar', desc: 'Te dejamos el pedido listo con tu nombre en la barra.' },
        { titulo: 'Retirá y disfrutá', desc: 'Sin filas, sin esperas: todo listo en 15 minutos.' }
      ]},
      { tipo: 'galeria', kicker: 'El local', titulo: 'Un rincón verde para quedarte', items: [
        { img: 'assets/cafe-verde-alba/g1.jpg', label: 'Nuestra barra' },
        { img: 'assets/cafe-verde-alba/g2.jpg', label: 'Especialidad de la casa' },
        { img: 'assets/cafe-verde-alba/g3.jpg', label: 'Brunch del finde' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'El café del que todos hablan', items: [
        { nombre: 'Agus V.', rol: 'Teletrabajo', texto: 'El filtrado de la casa es el mejor café de Mar del Plata. Mi oficina de cada mañana.' },
        { nombre: 'Florencia T.', rol: 'Brunch de domingo', texto: 'Vale cada peso: la pastelería es artesanal de verdad y el lugar es hermoso.' },
        { nombre: 'Seba K.', rol: 'Compra de grano', texto: 'Compro el café para mi casa hace un año. Nunca más tomé café en cápsulas.' }
      ]},
      { tipo: 'faq', kicker: 'Información', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Tienen opciones sin TACC?', a: 'Sí, la mayoría de la pastelería es libre de gluten y tenés opciones veganas.' },
        { q: '¿Hacen envíos?', a: 'Por ahora retiro en local y delivery para la zona centro por app.' },
        { q: '¿Venden el café molido?', a: 'Sí, molido para espresso o filtrado según tu método.' }
      ]},
      { tipo: 'cta', titulo: 'Tu próximo café te espera', sub: 'Pedí por WhatsApp y retirá sin filas.' }
    ]
  },
  {
    slug: 'viandas-sabores',
    nombre: 'Sabores de Barrio',
    rubro: 'Viandas y catering',
    familia: 'gastro',
    zona: 'Mar del Plata',
    dir: 'Buenos Aires 3350, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero encargar viandas',
    paleta: { bg: '#120e0a', bg2: '#19130d', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#faf7f0', sub: '#c2b8a4', prim: '#f97316', prim2: '#fb923c', accent: '#fed7aa', wa: '#25d366' },
    fuentes: { h: 'Sora', b: 'Inter' },
    hero: {
      kicker: 'Viandas y catering · Mar del Plata',
      titulo: ['Comida de la casa,', 'todos los días'],
      sub: 'Viandas frescas, menús semanales y catering para eventos. Pedí por WhatsApp y te lo dejamos listo para retirar o te lo llevamos.',
      img: 'assets/viandas-sabores/hero.jpg'
    },
    stats: [['450+', 'viandas por semana'], ['15', 'menús semanales'], ['0', 'congelados'], ['100%', 'ingredientes frescos']],
    secciones: [
      { tipo: 'cards', kicker: 'Menú semanal', titulo: 'Variedad de lunes a viernes', items: [
        { icon: 'flame', titulo: 'Clásicas del barrio', desc: 'Milanesa, guiso, tartas y pastas caseras como en casa.', precio: '$9.000' },
        { icon: 'leaf', titulo: 'Línea fitness', desc: 'Pollo grillé, verduras al horno y legumbres. Alta proteína.', precio: '$10.500' },
        { icon: 'shield', titulo: 'Sin TACC y veggie', desc: 'Opciones celíacas y vegetarianas elaboradas por separado.', precio: '$10.500' },
        { icon: 'sparkle', titulo: 'Catering para eventos', desc: 'Mesas dulces y saladas, picadas y menús para oficinas.', precio: 'A medida' }
      ]},
      { tipo: 'galeria', kicker: 'Nuestra cocina', titulo: 'Hecho en el día, como en casa', items: [
        { img: 'assets/viandas-sabores/g1.jpg', label: 'Cocina del día' },
        { img: 'assets/viandas-sabores/g2.jpg', label: 'Viandas listas' },
        { img: 'assets/viandas-sabores/g3.jpg', label: 'Entregas puntuales' }
      ]},
      { tipo: 'pasos', kicker: 'Cómo funciona', titulo: 'Encargá en 3 pasos', items: [
        { titulo: 'Elegí tu plan', desc: 'Viandas sueltas o plan semanal con menú rotativo.' },
        { titulo: 'Pedí por WhatsApp', desc: 'Confirmamos disponibilidad y te pasamos el horario de retiro o delivery.' },
        { titulo: 'Comé rico', desc: 'Entregas en la zona centro o retirá calentito al mediodía.' }
      ]},
      { tipo: 'precios', kicker: 'Planes', titulo: 'Precios por semana', items: [
        { nombre: '3 viandas / semana', precio: '$27.000', lista: ['Menú a elección', 'Retiro o delivery', 'Cambios de menú'] },
        { nombre: '5 viandas / semana', precio: '$42.000', lista: ['Menú completo', 'Envío incluido', 'Prioridad en pedidos'] },
        { nombre: 'Catering empresa', precio: 'A medida', lista: ['Menú corporativo', 'Facturación A', 'Atención personalizada'] }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'Fieles del barrio', items: [
        { nombre: 'Caro N.', rol: 'Plan semanal', texto: 'Cocinan como en casa y llegan siempre puntuales. Pedir por WhatsApp es re fácil.' },
        { nombre: 'Fran M.', rol: 'Fitness', texto: 'Las viandas fitness me cambiaron la semana. Porción justa y rica de verdad.' },
        { nombre: 'Silvia D.', rol: 'Celíaca', texto: 'Por fin una cocina que toma en serio la contaminación cruzada. Tranquilidad total.' }
      ]},
      { tipo: 'faq', kicker: 'Consultas', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Entregan los sábados?', a: 'Sí, delivery sábados hasta el mediodía y retiro con aviso previo.' },
        { q: '¿Puedo congelar las viandas?', a: 'Sí, pero te recomendamos consumirlas dentro de las 48 horas: son todas frescas.' },
        { q: '¿Hacen para eventos grandes?', a: 'Hacemos catering para eventos desde 20 personas. Escribinos con fecha y cantidad.' }
      ]},
      { tipo: 'cta', titulo: 'Comé rico esta semana', sub: 'Pedí hoy y asegurá tus viandas.' }
    ]
  },
  {
    slug: 'rotiseria-don-gino',
    nombre: 'Don Gino Rotisería',
    rubro: 'Rotisería y delivery',
    familia: 'gastro',
    zona: 'Mar del Plata',
    dir: 'Rivadavia 4200, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero hacer un pedido',
    paleta: { bg: '#120a0a', bg2: '#1a0f0e', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#fdf3f1', sub: '#c9a9a2', prim: '#e11d48', prim2: '#fb7185', accent: '#fecdd3', wa: '#25d366' },
    fuentes: { h: 'Manrope', b: 'Inter' },
    hero: {
      kicker: 'Rotisería y delivery · Mar del Plata',
      titulo: ['El sabor de la casa,', 'en tu puerta en 40 minutos'],
      sub: 'Pizzas, empanadas, parrilla al horno y minutas. Pedí por WhatsApp y seguí tu pedido hasta que llegue.',
      img: 'assets/rotiseria-don-gino/hero.jpg'
    },
    stats: [['40 min', 'delivery promedio'], ['3000+', 'pedidos al mes'], ['4.8★', 'calificación'], ['0', 'comida recalentada']],
    secciones: [
      { tipo: 'cards', kicker: 'Menú', titulo: 'Clásicos que nunca fallan', items: [
        { icon: 'flame', titulo: 'Pizza a la piedra', desc: 'Masa madre de 24 hs, muzza de calidad y horno de barro.', precio: '$13.000' },
        { icon: 'sparkle', titulo: 'Empanadas', desc: 'De carne cortada a cuchillo, jamón y queso, verdura y capresse.', precio: '$3.500 c/u' },
        { icon: 'flame', titulo: 'Parrilla al horno', desc: 'Vacio, bondiola y pollo con guarniciones.', precio: 'Desde $16.000' },
        { icon: 'leaf', titulo: 'Minutas y sándwiches', desc: 'Milanesas, hamburguesas y lomitos con papas caseras.', precio: 'Desde $9.500' }
      ]},
      { tipo: 'pasos', kicker: 'Delivery', titulo: 'Pedí en 1 minuto', items: [
        { titulo: 'Mandanos tu pedido', desc: 'Escribí tu pedido por WhatsApp, con dirección y forma de pago.' },
        { titulo: 'Confirmación al instante', desc: 'Te confirmamos y estimamos el tiempo de entrega.' },
        { titulo: 'Seguilo en vivo', desc: 'Te avisamos cuando sale el delivery y al llegar.' }
      ]},
      { tipo: 'galeria', kicker: 'Nuestra cocina', titulo: 'Lo que nos hace únicos', items: [
        { img: 'assets/rotiseria-don-gino/g1.jpg', label: 'Horno de barro' },
        { img: 'assets/rotiseria-don-gino/g2.jpg', label: 'Pizza a la piedra' },
        { img: 'assets/rotiseria-don-gino/g3.jpg', label: 'Empanadas caseras' }
      ]},
      { tipo: 'testimonios', kicker: 'Vecinos', titulo: 'El barrio habla', items: [
        { nombre: 'Dani P.', rol: 'Pedido semanal', texto: 'La pizza nunca llega fría y las empanadas son de las mejores de MDP.' },
        { nombre: 'Ayelén G.', rol: 'Delivery express', texto: 'Pedí un lomito y llegó en 35 minutos, caliente y con papas crocantes.' },
        { nombre: 'Tito B.', rol: 'Cliente de años', texto: 'Don Gino es de toda la vida. El vacío al horno los domingos es obligatorio.' }
      ]},
      { tipo: 'faq', kicker: 'Información', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Hasta qué hora toman pedidos?', a: 'Todos los días hasta las 23:45, y los fines de semana hasta las 00:30.' },
        { q: '¿Cuánto tarda el delivery?', a: 'Entre 30 y 45 minutos en la zona de reparto. Te avisamos por WhatsApp.' },
        { q: '¿Qué medios de pago aceptan?', a: 'Efectivo, transferencia, tarjetas y QR al recibir.' }
      ]},
      { tipo: 'cta', titulo: '¿Se te antojó algo?', sub: 'Pedí por WhatsApp y en 40 minutos está en tu puerta.' }
    ]
  },
  {
    slug: 'cerveceria-punto-cebada',
    nombre: 'Punto Cebada',
    rubro: 'Cervecería artesanal',
    familia: 'gastro',
    zona: 'Mar del Plata',
    dir: 'Av. Constitución 6880, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero reservar mesa en Punto Cebada',
    paleta: { bg: '#0f0c08', bg2: '#171208', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#fdf6e3', sub: '#bfae8a', prim: '#f59e0b', prim2: '#d97706', accent: '#fcd34d', wa: '#25d366' },
    fuentes: { h: 'Bricolage Grotesque', b: 'Inter' },
    hero: {
      kicker: 'Cervecería artesanal · Mar del Plata',
      titulo: ['Birra de verdad,', 'tirando desde la fábrica'],
      sub: '8 estilos propios elaborados en el local, picadas y grisines. Reservá tu mesa o pedí growlers por WhatsApp.',
      img: 'assets/cerveceria-punto-cebada/hero.jpg'
    },
    stats: [['8', 'estilos en canilla'], ['100%', 'elaboración propia'], ['12', 'etiquetas en lata'], ['5', 'años de fábrica']],
    secciones: [
      { tipo: 'cards', kicker: 'Nuestras birras', titulo: 'Estilos para cada paladar', items: [
        { icon: 'beer', titulo: 'IPA de la casa', desc: 'Lúpulo cítrico y amargor equilibrado. 6,5% ABV.', precio: '$8.500 pinta' },
        { icon: 'beer', titulo: 'Golden Ale', desc: 'Suave, dorada y refrescante. La favorita de todos.', precio: '$7.500 pinta' },
        { icon: 'flame', titulo: 'Stout', desc: 'Cuerpo cremoso, notas a café y chocolate tostado.', precio: '$9.000 pinta' },
        { icon: 'sparkle', titulo: 'Red Ale', desc: 'Caramelo y maltas rojas, cálida y redondeada.', precio: '$8.500 pinta' }
      ]},
      { tipo: 'galeria', kicker: 'El bar', titulo: 'Un lugar hecho para quedarse', items: [
        { img: 'assets/cerveceria-punto-cebada/g1.jpg', label: 'Nuestra barra' },
        { img: 'assets/cerveceria-punto-cebada/g2.jpg', label: 'Canillas de la casa' },
        { img: 'assets/cerveceria-punto-cebada/g3.jpg', label: 'Picada para compartir' }
      ]},
      { tipo: 'pasos', kicker: 'Reservas y growlers', titulo: 'Dos formas de disfrutarnos', items: [
        { titulo: 'Reservá tu mesa', desc: 'Escribinos con fecha, hora y cantidad. Te la guardamos sin cargo.' },
        { titulo: 'Pedí growlers y latas', desc: 'Growler de 1L y 2L, y latas de 473ml para llevar a casa.' },
        { titulo: 'Eventos y barras', desc: 'Barras móviles para cumpleaños y eventos privados.' }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'La tribu de la cebada', items: [
        { nombre: 'Marco L.', rol: 'Fan de la IPA', texto: 'La IPA es de las mejores que probé en la costa. El ambiente es brutal.' },
        { nombre: 'Jose C.', rol: 'Growler semanal', texto: 'Pedir el growler por WhatsApp y retirar sin fila es un lujo.' },
        { nombre: 'Flor R.', rol: 'Cumpleaños', texto: 'Contratamos la barra móvil y fue un éxito total. Cerveza fresca hasta el final.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Hacen sin alcohol?', a: 'Sí, tenemos una gaseosa de la casa y próximamente una versión low. Consultá en barra.' },
        { q: '¿Aceptan mascotas?', a: 'Sí, son bienvenidas en la vereda y el patio.' },
        { q: '¿Venden envasada para llevar?', a: 'Sí, latas de 473ml y growlers de 1 y 2 litros, siempre frescos.' }
      ]},
      { tipo: 'cta', titulo: 'La mesa te espera', sub: 'Reservá o pedí tu growler por WhatsApp.' }
    ]
  },
  {
    slug: 'vinoteca-cava-puerto',
    nombre: 'Cava del Puerto',
    rubro: 'Vinoteca y espirituosas',
    familia: 'gastro',
    zona: 'Mar del Plata',
    dir: 'Av. de los Trabajadores 2600, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero consultar por un vino',
    paleta: { bg: '#0e080a', bg2: '#150c10', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#faf3f4', sub: '#c4a3a9', prim: '#e4a11b', prim2: '#b91c1c', accent: '#f6d8a8', wa: '#25d366' },
    fuentes: { h: 'Fraunces', b: 'Inter' },
    hero: {
      kicker: 'Vinoteca · Mar del Plata',
      titulo: ['La cava perfecta,', 'a un mensaje de distancia'],
      sub: 'Vinos argentinos y del mundo, espumantes y regalos con packaging. Pedí por WhatsApp y coordinamos la entrega el mismo día.',
      img: 'assets/vinoteca-cava-puerto/hero.jpg'
    },
    stats: [['600+', 'etiquetas en cava'], ['15°', 'temperatura ideal'], ['2 hs', 'entrega en zona'], ['100%', 'asesoramiento gratuito']],
    secciones: [
      { tipo: 'cards', kicker: 'Selección', titulo: 'Vinos para cada momento', items: [
        { icon: 'wine', titulo: 'Tintos argentinos', desc: 'Malbec, Cabernet y blends de Mendoza, Salta y Patagonia.', precio: 'Desde $12.000' },
        { icon: 'wine', titulo: 'Blancos y rosados', desc: 'Sauvignon Blanc, Chardonnay y rosados frescos.', precio: 'Desde $10.000' },
        { icon: 'sparkle', titulo: 'Espumantes', desc: 'Método champenoise y Charmat para celebrar.', precio: 'Desde $15.000' },
        { icon: 'gift', titulo: 'Regalos y cajas', desc: 'Box personalizados con copas y packaging premium.', precio: 'Desde $25.000' }
      ]},
      { tipo: 'galeria', kicker: 'La cava', titulo: 'Un mundo de etiquetas', items: [
        { img: 'assets/vinoteca-cava-puerto/g1.jpg', label: 'Nuestra cava' },
        { img: 'assets/vinoteca-cava-puerto/g2.jpg', label: 'Degustaciones' },
        { img: 'assets/vinoteca-cava-puerto/g3.jpg', label: 'Selección de etiquetas' }
      ]},
      { tipo: 'pasos', kicker: 'Comprá fácil', titulo: 'Tu vino en 3 pasos', items: [
        { titulo: 'Contanos tu ocasión', desc: 'Cena, regalo o antojo: te asesoramos sin cargo.' },
        { titulo: 'Elegí tu botella', desc: 'Te mandamos opciones por foto con precio y perfil.' },
        { titulo: 'Retiro o delivery', desc: 'Entrega en 2 horas en zona o retirá en local.' }
      ]},
      { tipo: 'precios', kicker: 'Ofertas', titulo: 'Promos de la semana', items: [
        { nombre: 'Combo Noche de vino', precio: '$38.000', lista: ['2 tintos premium', '2 copas de regalo', 'Entrega incluida'] },
        { nombre: 'Caja regalo', precio: '$45.000', lista: ['Botella + chocolates', 'Packaging premium', 'Tarjeta personalizada'] },
        { nombre: 'Club Cava', precio: '$30.000 / mes', lista: ['2 botellas seleccionadas', 'Descuentos exclusivos', 'Catas privadas'] }
      ]},
      { tipo: 'testimonios', kicker: 'Clientes', titulo: 'Lo que nos escriben', items: [
        { nombre: 'Hernán D.', rol: 'Club Cava', texto: 'Cada mes descubro un vino nuevo que no conocía. La selección es excelente.' },
        { nombre: 'Vale M.', rol: 'Regalo corporativo', texto: 'Armaron 20 cajas para nuestros clientes con una calidad impecable y en tiempo récord.' },
        { nombre: 'Tomas B.', rol: 'Delivery', texto: 'Pedí un vino para una cena y me lo trajeron en 1 hora, frío y con copas. Increíble.' }
      ]},
      { tipo: 'faq', kicker: 'Info', titulo: 'Preguntas frecuentes', items: [
        { q: '¿Hacen entregas a domicilio?', a: 'Sí, entrega el mismo día en la zona de reparto y coordinamos el horario por WhatsApp.' },
        { q: '¿Asesoran para elegir vino?', a: 'Sí, nuestro equipo te recomienda según presupuesto, ocasión y preferencias.' },
        { q: '¿Tienen vinos para regalar?', a: 'Tenemos cajas regalo con packaging premium y tarjeta personalizada.' }
      ]},
      { tipo: 'cta', titulo: 'Tu próxima botella te espera', sub: 'Escribinos y te asesoramos sin cargo.' }
    ]
  }
]
