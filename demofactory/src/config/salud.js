export const salud = [
  {
    slug: 'clinica-aura',
    nombre: 'Clínica Aura',
    rubro: 'Clínica y consultorios médicos',
    familia: 'salud',
    zona: 'Mar del Plata',
    dir: 'Av. Pedro Luro 4636, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quisiera reservar un turno médico',
    paleta: { bg: '#0b1220', bg2: '#0f1b2e', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f1f5f9', sub: '#94a3b8', prim: '#22d3ee', prim2: '#38bdf8', accent: '#a5f3fc', wa: '#25d366' },
    fuentes: { h: 'Outfit', b: 'Inter' },
    hero: {
      kicker: 'Clínica y consultorios · Mar del Plata',
      titulo: ['Medicina integral que', 'te cuida de verdad'],
      sub: 'Especialistas médicos, diagnóstico por imágenes y guardia coordinada. Reservá tu turno por WhatsApp en menos de un minuto.',
      img: 'assets/clinica-aura/hero.jpg'
    },
    stats: [['15+', 'especialidades médicas'], ['2500+', 'pacientes al año'], ['20 min', 'respuesta de turnos'], ['4.9★', 'valoración de pacientes']],
    secciones: [
      { tipo: 'cards', kicker: 'Especialidades', titulo: 'Un consultorio para cada necesidad', sub: 'Atención médica con tecnología, sin esperas eternas.', items: [
        { icon: 'stethoscope', titulo: 'Clínica médica', desc: 'Consultas generales y seguimiento integral de pacientes crónicos.', precio: 'Desde $18.000' },
        { icon: 'heart', titulo: 'Cardiología', desc: 'Ecocardiograma, ergometría y controles preventivos de riesgo cardiovascular.' },
        { icon: 'activity', titulo: 'Ecografía e imágenes', desc: 'Diagnóstico por imágenes con turno prioritario y resultados digitales.' },
        { icon: 'shield', titulo: 'Apto médico deportivo', desc: 'Certificado exprés para actividades deportivas y gimnasios.' }
      ]},
      { tipo: 'galeria', kicker: 'El consultorio', titulo: 'Atención con tecnología y calidez', items: [
        { img: 'assets/clinica-aura/g1.jpg', label: 'Consultorios luminosos' },
        { img: 'assets/clinica-aura/g2.jpg', label: 'Equipo médico' },
        { img: 'assets/clinica-aura/g3.jpg', label: 'Diagnóstico por imágenes' }
      ]},
      { tipo: 'pasos', kicker: 'Así de simple', titulo: 'Reservá tu turno en 3 pasos', items: [
        { titulo: 'Escribinos por WhatsApp', desc: 'Contanos qué especialidad necesitás y el horario que te queda cómodo.' },
        { titulo: 'Confirmá tu turno', desc: 'Te asignamos profesional y te confirmamos al instante, sin llamadas.' },
        { titulo: 'Consultá y listo', desc: 'Atención puntual, historia digital y seguimiento posterior por WhatsApp.' }
      ]},
      { tipo: 'precios', kicker: 'Tarifas de referencia', titulo: 'Precios claros, sin sorpresas', sub: 'Obras sociales y prepagas con convenio.', items: [
        { nombre: 'Consulta especializada', precio: '$18.000 – $25.000', lista: ['Cardiología, clínica, pediatría', 'Recetas y órdenes digitales', 'Historia clínica electrónica'] },
        { nombre: 'Chequeo preventivo integral', precio: '$45.000 – $65.000', lista: ['Análisis de laboratorio', 'Electrocardiograma', 'Informe final con médico'] },
        { nombre: 'Ecografía / imágenes', precio: '$22.000 – $35.000', lista: ['Abdominal, ginecológica, mamaria', 'Resultados en 24 hs', 'Turno prioridad sin cargo'] }
      ]},
      { tipo: 'testimonios', kicker: 'Pacientes', titulo: 'Lo que dicen quienes ya se atendieron', items: [
        { nombre: 'Mariana G.', rol: 'Paciente de cardiología', texto: 'Me atendieron a horario y el médico me explicó todo con paciencia. La reserva por WhatsApp fue rapidísima.' },
        { nombre: 'Diego R.', rol: 'Apto médico deportivo', texto: 'Saqué el apto el mismo día que escribí. Súper práctico para el club.' },
        { nombre: 'Laura P.', rol: 'Paciente de clínica', texto: 'Historia clínica digital, turnos puntuales y seguimiento después de la consulta. Recomendable.' }
      ]},
      { tipo: 'faq', kicker: 'Consultas frecuentes', titulo: 'Todo lo que necesitás saber', items: [
        { q: '¿Atienden obras sociales y prepagas?', a: 'Sí, trabajamos con la mayoría de las obras sociales y prepagas de la zona. Escribinos por WhatsApp y te confirmamos tu cobertura.' },
        { q: '¿Tienen guardia?', a: 'Contamos con guardia coordinada y turnos de urgencia para pacientes de la clínica. Consultá disponibilidad.' },
        { q: '¿Cómo obtengo mi apto médico?', a: 'Es el servicio más rápido: escribinos por la mañana y podés retirar tu certificado el mismo día.' }
      ]},
      { tipo: 'cta', titulo: '¿Necesitás un turno hoy?', sub: 'Respondemos por WhatsApp en minutos. Sin llamadas, sin esperas.' }
    ]
  },
  {
    slug: 'dental-sonrisa',
    nombre: 'Dental Sonrisa',
    rubro: 'Odontología integral',
    familia: 'salud',
    zona: 'Mar del Plata',
    dir: 'San Martín 2245, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quisiera consultar por un turno dental',
    paleta: { bg: '#0e151f', bg2: '#13202e', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#f0fdfa', sub: '#94a3b8', prim: '#5eead4', prim2: '#2dd4bf', accent: '#99f6e4', wa: '#25d366' },
    fuentes: { h: 'Sora', b: 'Inter' },
    hero: {
      kicker: 'Odontología integral · Mar del Plata',
      titulo: ['Sonrisas que se', 'sienten desde el primer día'],
      sub: 'Ortodoncia, implantes y estética dental con tecnología digital. Planificá tu consulta por WhatsApp sin esperar en sala.',
      img: 'assets/dental-sonrisa/hero.jpg'
    },
    stats: [['10+', 'años de experiencia'], ['3000+', 'sonrisas transformadas'], ['3D', 'planificación digital'], ['0', 'lista de espera']],
    secciones: [
      { tipo: 'cards', kicker: 'Tratamientos', titulo: 'Odontología para toda la familia', items: [
        { icon: 'tooth', titulo: 'Ortodoncia y alineadores', desc: 'Aparatología fija e invisible. Seguimiento con escaneo digital, sin moldes.' },
        { icon: 'sparkle', titulo: 'Estética dental', desc: 'Carillas, blanqueamiento y diseño de sonrisa personalizado.' },
        { icon: 'shield', titulo: 'Implantes', desc: 'Rehabilitación completa con guía digital 3D y garantía de por vida del implante.' },
        { icon: 'user', titulo: 'Odontopediatría', desc: 'Atención lúdica para los más chicos, con técnicas de sedación consciente.' }
      ]},
      { tipo: 'galeria', kicker: 'El consultorio', titulo: 'Tecnología dental a tu servicio', items: [
        { img: 'assets/dental-sonrisa/g1.jpg', label: 'Consultorio equipado' },
        { img: 'assets/dental-sonrisa/g2.jpg', label: 'Escaneo digital' },
        { img: 'assets/dental-sonrisa/g3.jpg', label: 'Equipo profesional' }
      ]},
      { tipo: 'pasos', kicker: 'Primera consulta', titulo: 'Así arrancás tu tratamiento', items: [
        { titulo: 'Contanos tu caso', desc: 'WhatsApp con fotos de tu sonrisa y te respondemos con una orientación inicial.' },
        { titulo: 'Diagnóstico sin cargo', desc: 'Escaneo digital y plan de tratamiento con costos por escrito.' },
        { titulo: 'Arrancá cuando quieras', desc: 'Turnos a tu medida, financiación y recordatorios automáticos por WhatsApp.' }
      ]},
      { tipo: 'precios', kicker: 'Inversión clara', titulo: 'Planes con financiación', items: [
        { nombre: 'Consulta + diagnóstico', precio: 'Sin cargo', lista: ['Evaluación completa', 'Escaneo 3D', 'Presupuesto por escrito'] },
        { nombre: 'Blanqueamiento dental', precio: '$60.000', lista: ['Sesión en consultorio', 'Kit de mantenimiento', 'Resultados en 7 días'] },
        { nombre: 'Ortodoncia invisible', precio: 'Consultar', lista: ['Plan mensual', 'Seguimiento remoto', 'Financiación sin interés'] }
      ]},
      { tipo: 'testimonios', kicker: 'Pacientes', titulo: 'Historias que nos enorgullecen', items: [
        { nombre: 'Sofía L.', rol: 'Ortodoncia invisible', texto: 'En 8 meses ya se nota un cambio enorme. El seguimiento por WhatsApp me salvó de viajes innecesarios.' },
        { nombre: 'Jorge M.', rol: 'Implantes', texto: 'Todo el proceso explicado con imágenes 3D. El implante quedó perfecto y sin dolor.' },
        { nombre: 'Valentina C.', rol: 'Paciente desde los 8 años', texto: 'Mi hija va feliz al dentista. El trato con los chicos es de otro nivel.' }
      ]},
      { tipo: 'faq', kicker: 'Consultas frecuentes', titulo: 'Resolvé tus dudas', items: [
        { q: '¿Atienden obras sociales?', a: 'Trabajamos con las principales obras sociales y prepagas. Consultá tu cobertura por WhatsApp.' },
        { q: '¿Cómo es el pago?', a: 'Efectivo, transferencia, tarjetas y planes de financiación en hasta 12 cuotas.' },
        { q: '¿Duele la ortodoncia invisible?', a: 'Mucho menos que la fija: se cambian alineadores cada 2 semanas y las molestias son mínimas.' }
      ]},
      { tipo: 'cta', titulo: 'Tu sonrisa te está esperando', sub: 'Escribinos y agendá tu diagnóstico sin cargo.' }
    ]
  },
  {
    slug: 'estetica-lumiere',
    nombre: 'Lumière Estética',
    rubro: 'Estética y depilación láser',
    familia: 'salud',
    zona: 'Mar del Plata',
    dir: 'Alvarado 1840, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quiero consultar por un tratamiento estético',
    paleta: { bg: '#150f1e', bg2: '#1d142b', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#fdf4ff', sub: '#c4b5fd', prim: '#e879f9', prim2: '#c084fc', accent: '#f5d0fe', wa: '#25d366' },
    fuentes: { h: 'Bricolage Grotesque', b: 'Inter' },
    hero: {
      kicker: 'Centro de estética · Mar del Plata',
      titulo: ['Tu mejor versión,', 'sin prisa y sin miedo'],
      sub: 'Depilación láser con tecnología diodo, tratamientos faciales corporales y aparatología de última generación. Evaluación sin cargo.',
      img: 'assets/estetica-lumiere/hero.jpg'
    },
    stats: [['Diodo', 'láser de alta potencia'], ['6000+', 'sesiones realizadas'], ['1', 'evaluación sin cargo'], ['10/10', 'en atención al cliente']],
    secciones: [
      { tipo: 'cards', kicker: 'Tratamientos', titulo: 'Tecnología que se nota', items: [
        { icon: 'sparkle', titulo: 'Depilación láser diodo', desc: 'Todas las zonas, todos los fototipos. Plan de sesiones a tu medida.' },
        { icon: 'droplet', titulo: 'Limpieza facial profunda', desc: 'Extracción, hidratación y luminosidad al instante.' },
        { icon: 'activity', titulo: 'Radiofrecuencia', desc: 'Reafirmación facial y corporal sin cirugía.' },
        { icon: 'leaf', titulo: 'Drenaje y presoterapia', desc: 'Desinflamación, piernas cansadas y silueta.' }
      ]},
      { tipo: 'galeria', kicker: 'El centro', titulo: 'Un espacio pensado para tu bienestar', items: [
        { img: 'assets/estetica-lumiere/g1.jpg', label: 'Sala de tratamientos' },
        { img: 'assets/estetica-lumiere/g2.jpg', label: 'Láser diodo' },
        { img: 'assets/estetica-lumiere/g3.jpg', label: 'Ritual facial' }
      ]},
      { tipo: 'pasos', kicker: 'Primera vez', titulo: 'Cómo empezar', items: [
        { titulo: 'Escribinos', desc: 'Contanos qué zona querés tratar y el objetivo que buscás.' },
        { titulo: 'Evaluación sin cargo', desc: 'Análisis de piel y vello, plan de sesiones y costos claros.' },
        { titulo: 'Sesión y seguimiento', desc: 'Tratamiento cómodo y control de resultados en cada visita.' }
      ]},
      { tipo: 'precios', kicker: 'Promo de ingreso', titulo: 'Planes que se adaptan a vos', items: [
        { nombre: 'Láser zona chica', precio: '$12.000 / sesión', lista: ['Labio, axilas o cejas', 'Sesiones sin anestesia', 'Sin dolor con punta fría'] },
        { nombre: 'Láser cuerpo completo', precio: '$55.000 / mes', lista: ['Todas las zonas', 'Plan ilimitado por mes', 'Acompañamiento de resultados'] },
        { nombre: 'Facial + Drenaje', precio: '$35.000', lista: ['Limpieza profunda', 'Drenaje linfático', 'Ritual de relax 90 min'] }
      ]},
      { tipo: 'testimonios', kicker: 'Clientas', titulo: 'Resultados reales', items: [
        { nombre: 'Cami D.', rol: 'Láser corporal', texto: 'Después de 4 sesiones ya casi no me depilo. El plan mensual es lo más conveniente.' },
        { nombre: 'Rocío F.', rol: 'Facial + drenaje', texto: 'Salí renovada. Se nota el cuidado en cada detalle, desde la recepción hasta el servicio.' },
        { nombre: 'Belén S.', rol: 'Radiofrecuencia', texto: 'Noté la firmeza del rostro al mes. La profesionalidad y la buena onda son constantes.' }
      ]},
      { tipo: 'faq', kicker: 'Consultas frecuentes', titulo: 'Tus dudas, resueltas', items: [
        { q: '¿El láser es doloroso?', a: 'Con la tecnología de punta fría la sensación es mínima. La mayoría de las pacientes lo describe como una gomita fría.' },
        { q: '¿Cuántas sesiones necesito?', a: 'Entre 6 y 8 en promedio, dependiendo de la zona, el vello y el fototipo. La evaluamos gratis.' },
        { q: '¿Aceptan medios de pago?', a: 'Efectivo, transferencia y tarjetas en cuotas para planes.' }
      ]},
      { tipo: 'cta', titulo: 'Evaluación inicial sin cargo', sub: 'Escribinos hoy y empezá tu plan de tratamientos.' }
    ]
  },
  {
    slug: 'peluqueria-ambar',
    nombre: 'Ámbar Studio',
    rubro: 'Peluquería y colorimetría',
    familia: 'salud',
    zona: 'Mar del Plata',
    dir: 'Güemes 3140, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quisiera reservar un turno en Ámbar',
    paleta: { bg: '#15100a', bg2: '#1f1710', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#fef3c7', sub: '#d6c7a8', prim: '#f59e0b', prim2: '#fbbf24', accent: '#fde68a', wa: '#25d366' },
    fuentes: { h: 'Fraunces', b: 'Inter' },
    hero: {
      kicker: 'Peluquería y colorimetría · Mar del Plata',
      titulo: ['Tu pelo, hablando', 'por vos antes que vos'],
      sub: 'Corte, color y tratamientos con profesionales en colorimetría. Reservá tu turno por WhatsApp y evitá la espera.',
      img: 'assets/peluqueria-ambar/hero.jpg'
    },
    stats: [['12', 'años en el rubro'], ['8', 'estilistas certificados'], ['500+', 'coloraciones al año'], ['1', 'asesoría sin cargo']],
    secciones: [
      { tipo: 'cards', kicker: 'Servicios', titulo: 'Todo lo que tu pelo necesita', items: [
        { icon: 'scissors', titulo: 'Corte y peinado', desc: 'Cortes con técnica y asesoría de estilo según tu cara y rutina.' },
        { icon: 'droplet', titulo: 'Color y balayage', desc: 'Colorimetría profesional, mechas y balayage con análisis de tono.' },
        { icon: 'leaf', titulo: 'Tratamientos capilares', desc: 'Nutrición, keratina y reconstrucción profunda.' },
        { icon: 'sparkle', titulo: 'Novias y eventos', desc: 'Peinados y producción completa para el día más importante.' }
      ]},
      { tipo: 'galeria', kicker: 'El salón', titulo: 'Dónde tu pelo cobra vida', items: [
        { img: 'assets/peluqueria-ambar/g1.jpg', label: 'Nuestro salón' },
        { img: 'assets/peluqueria-ambar/g2.jpg', label: 'Color en acción' },
        { img: 'assets/peluqueria-ambar/g3.jpg', label: 'Equipo de estilistas' }
      ]},
      { tipo: 'pasos', kicker: 'Turnos online', titulo: 'Reservá en 30 segundos', items: [
        { titulo: 'Elegí tu servicio', desc: 'Contanos qué buscás y mandanos una foto de tu pelo.' },
        { titulo: 'Te confirmamos', desc: 'Presupuesto estimado y horario confirmado por WhatsApp.' },
        { titulo: 'Llegá y relajate', desc: 'Café de bienvenida y atención de estilista dedicado.' }
      ]},
      { tipo: 'precios', kicker: 'Tarifas', titulo: 'Precios de referencia', items: [
        { nombre: 'Corte + lavado', precio: '$15.000', lista: ['Consulta de estilo', 'Lavado y secado', 'Terminación con productos profesionales'] },
        { nombre: 'Balayage completo', precio: '$85.000', lista: ['Análisis de color', 'Técnica a mano alzada', 'Tratamiento post-color'] },
        { nombre: 'Keratina', precio: '$70.000', lista: ['Protección térmica', 'Duración 3 a 5 meses', 'Incluye corte de puntas'] }
      ]},
      { tipo: 'testimonios', kicker: 'Clientas', titulo: 'El boca en boca no falla', items: [
        { nombre: 'Juli A.', rol: 'Balayage', texto: 'El color quedó exactamente como quería. La asesoría previa fue clave para el resultado.' },
        { nombre: 'Naty P.', rol: 'Corte + keratina', texto: 'Mi pelo estaba destruido y volvió a la vida. Se nota que saben lo que hacen.' },
        { nombre: 'Pili M.', rol: 'Novia', texto: 'Me peinaron para mi casamiento y duró todo el día perfecto. Un equipo hermoso.' }
      ]},
      { tipo: 'faq', kicker: 'Consultas frecuentes', titulo: 'Antes de venir', items: [
        { q: '¿Hacen arreglos de color fallidos?', a: 'Sí, la colorimetría de corrección es una de nuestras especialidades. Escribinos con fotos.' },
        { q: '¿Cuánto dura un balayage?', a: 'Entre 4 y 6 meses con mantenimiento de tono, y la técnica queda natural al crecer.' },
        { q: '¿Trabajan con turno o sin turno?', a: 'Priorizamos los turnos por WhatsApp, pero si venís sin turno te acomodamos en cuanto se libera un sillón.' }
      ]},
      { tipo: 'cta', titulo: 'Tu próximo look arranca acá', sub: 'Reservá tu turno y asesoría sin cargo.' }
    ]
  },
  {
    slug: 'kinesio-movere',
    nombre: 'Movere Kinesiología',
    rubro: 'Kinesiología y rehabilitación',
    familia: 'salud',
    zona: 'Mar del Plata',
    dir: 'Olazábal 1580, Mar del Plata',
    tel: '5492231234567',
    wa_texto: 'Hola {nombre}, quisiera consultar por una sesión de kinesiología',
    paleta: { bg: '#0d1512', bg2: '#12201a', surface: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.10)', text: '#ecfdf5', sub: '#a7b8ae', prim: '#4ade80', prim2: '#34d399', accent: '#bbf7d0', wa: '#25d366' },
    fuentes: { h: 'Manrope', b: 'Inter' },
    hero: {
      kicker: 'Kinesiología y rehabilitación · Mar del Plata',
      titulo: ['Movete sin dolor,', 'volvé a tu mejor versión'],
      sub: 'Rehabilitación deportiva, traumatológica y post-quirúrgica con kinesiólogos especializados. Evaluación inicial y plan personalizado.',
      img: 'assets/kinesio-movere/hero.jpg'
    },
    stats: [['20+', 'años de experiencia'], ['95%', 'pacientes con mejoría'], ['1', 'evaluación inicial'], ['6', 'profesionales del equipo']],
    secciones: [
      { tipo: 'cards', kicker: 'Especialidades', titulo: 'Kinesiología con diagnóstico', items: [
        { icon: 'activity', titulo: 'Rehabilitación deportiva', desc: 'Vuelta a la cancha segura, con protocolos progresivos y trabajo específico.' },
        { icon: 'bone', titulo: 'Traumatológica', desc: 'Columna, rodilla, hombro: tratamiento del dolor con métodos manuales.' },
        { icon: 'shield', titulo: 'Post-quirúrgica', desc: 'Recuperación asistida tras cirugías de ligamentos, cadera y columna.' },
        { icon: 'dumbbell', titulo: 'Fortalecimiento', desc: 'Gimnasio terapéutico para prevenir lesiones y mejorar el rendimiento.' }
      ]},
      { tipo: 'galeria', kicker: 'Nuestro espacio', titulo: 'Donde la recuperación empieza', items: [
        { img: 'assets/kinesio-movere/g1.jpg', label: 'Sala de rehabilitación' },
        { img: 'assets/kinesio-movere/g2.jpg', label: 'Trabajo con el paciente' },
        { img: 'assets/kinesio-movere/g3.jpg', label: 'Gimnasio terapéutico' }
      ]},
      { tipo: 'pasos', kicker: 'Cómo trabajamos', titulo: 'Evaluación, plan, resultados', items: [
        { titulo: 'Evaluación inicial', desc: 'Diagnóstico funcional completo y objetivos claros con el paciente.' },
        { titulo: 'Plan personalizado', desc: 'Sesiones combinadas de terapia manual y ejercicio terapéutico.' },
        { titulo: 'Seguimiento', desc: 'Progreso medible en cada sesión y ejercicios para hacer en casa.' }
      ]},
      { tipo: 'precios', kicker: 'Valores', titulo: 'Tarifas de referencia', items: [
        { nombre: 'Sesión individual', precio: '$18.000', lista: ['Terapia manual', 'Trabajo de movilidad', 'Plan de ejercicios'] },
        { nombre: 'Plan 8 sesiones', precio: '$125.000', lista: ['Sesiones individuales', 'Evaluación intermedia', 'Seguimiento por WhatsApp'] },
        { nombre: 'Evaluación inicial', precio: 'Sin cargo', lista: ['Entrevista y examen', 'Informe funcional', 'Propuesta de tratamiento'] }
      ]},
      { tipo: 'testimonios', kicker: 'Pacientes', titulo: 'Recuperaciones que nos llenan', items: [
        { nombre: 'Leo T.', rol: 'Lesión de rodilla', texto: 'Volví a jugar al fútbol después de 6 meses con un plan perfectamente progresivo.' },
        { nombre: 'Graciela M.', rol: 'Lumbalgia crónica', texto: 'Venía con dolor de años y con el plan de ejercicios cambió mi calidad de vida.' },
        { nombre: 'Nacho B.', rol: 'Post quirúrgico', texto: 'El acompañamiento post-cirugía fue impecable, siempre con un objetivo claro por semana.' }
      ]},
      { tipo: 'faq', kicker: 'Consultas frecuentes', titulo: 'Resolvé tus dudas', items: [
        { q: '¿Necesito orden médica?', a: 'Para obras sociales sí. Si venís particular, podés consultar directamente y hacemos la derivación si corresponde.' },
        { q: '¿Atienden obras sociales?', a: 'Sí, con la mayoría de las obras sociales y prepagas. Consultá la tuya por WhatsApp.' },
        { q: '¿Cada cuánto son las sesiones?', a: 'Depende del caso: entre 2 y 3 sesiones semanales en la fase aguda, y luego espaciamos.' }
      ]},
      { tipo: 'cta', titulo: 'Empezá tu recuperación hoy', sub: 'Evaluación inicial sin cargo. Escribinos por WhatsApp.' }
    ]
  }
]
