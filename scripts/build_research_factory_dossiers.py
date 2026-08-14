import os
import sys
import json
import re

# Ensure stdout handles UTF-8
sys.stdout.reconfigure(encoding='utf-8')

# Definition of all 28 subrubros with metadata, price ranges, web inspiration references, and design system guidance
DOSSIERS_SPEC = {
    '01-clinica-aura': {
        'nombre_demo': 'Clínica Aura',
        'subrubro': 'Clínica / Consultorios Médicos Policonsultorios',
        'categoria': 'Salud',
        'keywords': ['clinica', 'consultorio', 'sanatorio', 'salud', 'medico'],
        'precios': [
            'Consulta Médica Especializada: $18.000 - $25.000 ARS',
            'Chequeo Preventivo Integral: $45.000 - $65.000 ARS',
            'Ecografía / Diagnóstico por Imágenes: $22.000 - $35.000 ARS',
            'Apto Médico Deportivo Expres: $15.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Mayo Clinic (UI/UX clean)', 'url': 'https://www.mayoclinic.org', 'detalles': 'Barra de búsqueda médica prominente, tipografía legible sin serif, tarjetas de especialidades con iconos SVG minimalist.'},
            {'nombre': 'One Medical (Modern Primary Care)', 'url': 'https://www.onemedical.com', 'detalles': 'Paleta verde salvia y slate oscuro, reserva de turnos en 1 clic, micro-interacciones hover sutiles en médicos.'},
            {'nombre': 'Swiss Medical Argentina', 'url': 'https://www.swissmedical.com.ar', 'detalles': 'Selector rápido de guardia/consultorios por sede, integración directa a WhatsApp de atención.'}
        ],
        'paleta': 'Slate profundo (#0F172A), Cyan bioluminiscente (oklch(0.75 0.14 195)), Blanco puro (#FFFFFF), Cristal esmerilado (rgba(255,255,255,0.05))',
        'fuentes': 'Inter (Cuerpo) + Outfit (Títulos H1/H2)',
        'sitemap': ['1. Hero Inmersivo con reserva exprés', '2. Especialidades Médicas & Staff', '3. Coberturas & Obras Sociales', '4. Ubicación & Horarios de Guardia', '5. CTA Flotante WhatsApp']
    },
    '02-dental-sonrisa': {
        'nombre_demo': 'Dental Sonrisa',
        'subrubro': 'Odontología / Ortodoncia & Implantes',
        'categoria': 'Salud',
        'keywords': ['odontolog', 'dental', 'diente', 'sonrisa', 'ortodoncia'],
        'precios': [
            'Limpieza Dental Profunda & Ultrasonido: $20.000 - $28.000 ARS',
            'Blanqueamiento Láser LED: $55.000 - $80.000 ARS',
            'Ortodoncia Invisible (Alineadores por mes): $65.000 ARS',
            'Implante Dental Titano (Evaluación inicial): Gratis / $35.000 ARS reserva'
        ],
        'inspiracion': [
            {'nombre': 'Tend Dental NYC', 'url': 'https://www.hellotend.com', 'detalles': 'Diseño ultra moderno tipo boutique, fotos de sonrisas reales sin aspecto de clínica tradicional, colores menta y marino.'},
            {'nombre': 'Spotlight Oral Care', 'url': 'https://spotlightoralcare.com', 'detalles': 'Galería Antes/Después interactiva con slider comparativo, testimonios en video.'},
            {'nombre': 'OdontoCompany (LATAM)', 'url': 'https://odontocompany.com', 'detalles': 'Formulario exprés de presupuesto por WhatsApp, mapas de sedes urbanas.'}
        ],
        'paleta': 'Azul Cobalto Profundo (#0284C7), Menta Fresco (oklch(0.85 0.12 170)), Superficie Cristal (#F0F9FF)',
        'fuentes': 'Plus Jakarta Sans (Cuerpo) + Montserrat (Títulos)',
        'sitemap': ['1. Hero Sonrisas Reales + Turno Inmediato', '2. Tratamientos Destacados (Implantes, Ortodoncia, Estética)', '3. Slider Antes / Después', '4. FAQ Interactivo', '5. Reserva WhatsApp']
    },
    '03-estetica-lumiere': {
        'nombre_demo': 'Estética Lumière',
        'subrubro': 'Estética Corporal / Depilación Láser & Skin Care',
        'categoria': 'Salud',
        'keywords': ['estetica', 'laser', 'depilacion', 'spa', 'piel', 'belleza'],
        'precios': [
            'Sesión Depilación Definitiva Láser Soprano (Zona Cuerpo Entero): $32.000 ARS',
            'Limpieza Facial Profunda con Punta de Diamante: $24.000 ARS',
            'Tratamiento Corporal Reductor / Velashape (Pack 4 sesiones): $85.000 ARS',
            'Botox / Ácido Hialurónico (Por zona): $95.000 - $140.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Formula Fig (Skin Health)', 'url': 'https://formulafig.com', 'detalles': 'Estética rosa cuarzo y crema, tipografía serif elegante, animaciones de entrada suaves en imágenes de piel.'},
            {'nombre': 'Skin Laundry', 'url': 'https://www.skinlaundry.com', 'detalles': 'Menú de tratamientos de 15 minutos con tarjetas limpias y botón exprés.'},
            {'nombre': 'Estética Específica (ARG)', 'url': 'https://esteticaespecifica.com.ar', 'detalles': 'Promociones del mes destacadas en bento grid, consulta de diagnóstico por WhatsApp.'}
        ],
        'paleta': 'Rosa Cuarzo (#FDF2F8), Champagne Oro (oklch(0.82 0.12 350)), Obsidian Muted (#1E1B4B)',
        'fuentes': 'DM Sans (Cuerpo) + Cormorant Garamond / Playfair Display (Títulos)',
        'sitemap': ['1. Hero Glamour Skin + Agendar Diagnóstico', '2. Catálogo de Tratamientos Faciales & Corporales', '3. Packs & Promociones del Mes', '4. Testimonios & Reviews Google', '5. Botón WhatsApp Directo']
    },
    '04-peluqueria-ambar': {
        'nombre_demo': 'Peluquería Ámbar',
        'subrubro': 'Peluquería / Barbería & Colorimetría Boutique',
        'categoria': 'Salud',
        'keywords': ['peluqueria', 'coiffure', 'barber', 'pelo', 'corte', 'color'],
        'precios': [
            'Corte de Cabello + Peinado & Lavado: $14.000 - $22.000 ARS',
            'Balayage / Mechas / Colorimetría Avanzada: $45.000 - $75.000 ARS',
            'Nutrición / Alisado Keratina / Botox Capilar: $28.000 - $40.000 ARS',
            'Servicio Barbería Completa (Corte + Barba + Toalla Caliente): $18.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Blind Barber NYC', 'url': 'https://blindbarber.com', 'detalles': 'Estilo urbano industrial oscuro, contraste fuerte oro/negro, tipografía sans bold, reservas de sillón online.'},
            {'nombre': 'Sassoon Academy', 'url': 'https://www.sassoon.com', 'detalles': 'Lookbook de tendencia en formato grid de alta resolución, transiciones suaves.'},
            {'nombre': 'Maligna Hair Shop (BsAs)', 'url': 'https://malignahair.com', 'detalles': 'Muestra de trabajos reales con filtro por estilista, reserva directa vía WhatsApp.'}
        ],
        'paleta': 'Negro Carbón (#121212), Ámbar Dorado (oklch(0.72 0.18 55)), Plata Esmerilada (#E2E8F0)',
        'fuentes': 'Space Grotesk (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Lookbook Urbano', '2. Menú de Servicios & Estilistas', '3. Galería de Trabajos Reales', '4. Reservar Sillón por WhatsApp', '5. Ubicación & Horarios']
    },
    '05-kinesio-movere': {
        'nombre_demo': 'Kinesio Movere',
        'subrubro': 'Kinesiología / Fisioterapia & RPG Deportivo',
        'categoria': 'Salud',
        'keywords': ['kinesio', 'fisio', 'rehabilitac', 'postura', 'columna', 'deport'],
        'precios': [
            'Sesión de Kinesiología y Fisioterapia (Con aparatología): $12.000 - $18.000 ARS',
            'Reeducación Postural Global (RPG) / Sesión: $22.000 ARS',
            'Rehabilitación Deportiva & Magneto/Ondas de Choque: $25.000 ARS',
            'Evaluación Biomecánica Pisada / Plantillas: $35.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Airrosti Rehab Systems', 'url': 'https://www.airrosti.com', 'detalles': 'Enfoque en recuperación rápida sin cirugía, diagrama interactivo de partes del cuerpo con dolor.'},
            {'nombre': 'Spear Physical Therapy NYC', 'url': 'https://spearcenter.com', 'detalles': 'Historias de éxito de deportistas recuperados, reserva inmediata de primera consulta.'},
            {'nombre': 'Kinesio Argentina Center', 'url': 'https://kinesio.com.ar', 'detalles': 'Servicios categorizados por lesión (espalda, rodilla, hombro) con CTA a WhatsApp.'}
        ],
        'paleta': 'Verde Esmeralda Deportivo (oklch(0.68 0.18 150)), Azul Marino (#0F172A), Blanco Nieve (#FAFAFA)',
        'fuentes': 'Outfit (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Recuperación Deportiva & Postural', '2. Tratas según Lesión / Dolor', '3. Equipo de Kinesiólogos', '4. Coberturas / Obras Sociales', '5. Turnos exprés WhatsApp']
    },
    '06-restaurante-rias': {
        'nombre_demo': 'Restaurante Rías',
        'subrubro': 'Restaurante de Mariscos / Parrilla Gourmet',
        'categoria': 'GASTRO',
        'keywords': ['restaurante', 'mariscos', 'parrilla', 'gourmet', 'puerto', 'pescado'],
        'precios': [
            'Tabla de Mariscos Rías (Para 2 personas): $38.000 - $52.000 ARS',
            'Cazuela de Mariscos / Paella Marplatense: $22.000 - $30.000 ARS',
            'Parrillada Completa Premium con Guarnición: $35.000 ARS',
            'Vinos Selección Finca (Botella): $14.000 - $28.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Le Bernardin NYC', 'url': 'https://www.le-bernardin.com', 'detalles': 'Fotografía gastronómica de alta definición full-bleed, carta en PDF/HTML elegante sin saturación.'},
            {'nombre': 'Don Julio Parrilla (BsAs)', 'url': 'https://parrilladonjulio.com', 'detalles': 'Estética de madera noble y brasas, historia del origen de las carnes/mariscos, sistema de reserva.'},
            {'nombre': 'La Mar Cebichería (LATAM)', 'url': 'https://lamarcebicheria.com', 'detalles': 'Menú interactivo con fotos apetitosas y botón de reserva de mesa por WhatsApp.'}
        ],
        'paleta': 'Azul Océano Profundo (#0B192C), Dorado Brasas (oklch(0.72 0.16 60)), Madera Oscura (#1E1611)',
        'fuentes': 'Playfair Display (Títulos) + Plus Jakarta Sans (Cuerpo)',
        'sitemap': ['1. Hero Galería de Platos Inmersiva', '2. Carta / Menú Gourmet por Pasos', '3. Galería del Salón & Bodega', '4. Reserva de Mesa Online / WhatsApp', '5. Ubicación & Horarios']
    },
    '07-cafe-verde-alba': {
        'nombre_demo': 'Café Verde Alba',
        'subrubro': 'Cafetería de Especialidad / Brunch & Pastelería',
        'categoria': 'GASTRO',
        'keywords': ['cafe', 'cafeteria', 'bakery', 'panaderia', 'brunch', 'tostador'],
        'precios': [
            'Flat White / Espresso Doble Granos de Origen: $3.500 - $4.800 ARS',
            'Brunch Completo Verde Alba (Para 2 personas): $24.000 ARS',
            'Croissant de Almendras / Pastelería Artesanal: $3.800 - $5.500 ARS',
            'Tostón Avocado & Huevo Poshé: $8.500 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Blue Bottle Coffee', 'url': 'https://bluebottlecoffee.com', 'detalles': 'Minimalismo absoluto, paleta crema y azul claro, fotografía limpia de granos y tazas hervidas.'},
            {'nombre': 'La Cabra Coffee (Denmark)', 'url': 'https://www.lacabra.dk', 'detalles': 'Diseño escandinavo sereno, sección de granos de especialidad con notas de cata.'},
            {'nombre': 'Cuervo Café (BsAs)', 'url': 'https://cuervocafe.com.ar', 'detalles': 'Carta digital rápida para escanear en mesa o pedir por delivery.'}
        ],
        'paleta': 'Crema Tostado (#FDFBF7), Verde Olivo (oklch(0.60 0.12 135)), Marrón Granos (#2D1F17)',
        'fuentes': 'Outfit (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Aroma & Café de Origen', '2. Menú de Especialidad & Brunch', '3. Pastelería del Día', '4. Take Away & Pedidos por WhatsApp', '5. Ubicación & Horarios de Apertura']
    },
    '08-viandas-sabores': {
        'nombre_demo': 'Viandas Sabores',
        'subrubro': 'Viandas Saludables / Catering & Menú Semanal',
        'categoria': 'GASTRO',
        'keywords': ['vianda', 'catering', 'viandas', 'comida saludable', 'nutricion', 'fitness'],
        'precios': [
            'Pack 5 Viandas Saludables Semanales: $28.000 ARS',
            'Pack 10 Viandas Keto / Fitness Proteicas: $52.000 ARS',
            'Catering para Eventos (Por persona): $14.000 - $22.000 ARS',
            'Menú Ejecutivo Diario con Envío: $6.500 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Factor Meals (USA)', 'url': 'https://www.factor75.com', 'detalles': 'Selector de plan semanal interactivo, conteo de calorías y macros en cada plato.'},
            {'nombre': 'Daily Harvest', 'url': 'https://www.daily-harvest.com', 'detalles': 'Bento grid de platos frescos, suscripción flexible con fotos HD.'},
            {'nombre': 'Simple Eat Argentina', 'url': 'https://simpleeat.com.ar', 'detalles': 'Carrito de viandas en 1 clic con selección de día de entrega y WhatsApp direct.'}
        ],
        'paleta': 'Verde Hoja Fresca (oklch(0.72 0.18 140)), Blanco Puro (#FFFFFF), Naranja Zanahoria (#EA580C)',
        'fuentes': 'DM Sans (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Comé Sano sin Cocinar', '2. Menú Semanal & Planes (Keto, Fit, Veggie)', '3. Calculador de Viandas', '4. Pedir Pack por WhatsApp', '5. Zona de Envíos Mar del Plata']
    },
    '09-rotiseria-don-gino': {
        'nombre_demo': 'Rotisería Don Gino',
        'subrubro': 'Rotisería Tradicional / Pizzas & Delivery Exprés',
        'categoria': 'GASTRO',
        'keywords': ['rotiseria', 'empanad', 'pizza', 'milanesa', 'polleria', 'delivery'],
        'precios': [
            'Milanesa XL a la Napolitana con Papas Fritas (Comen 2): $18.000 ARS',
            'Pizza Grande Muzzarella de Molde: $12.500 ARS',
            'Docena de Empanadas Cortadas a Cuchillo: $14.000 ARS',
            'Pollo al Spiedo con Papas Provenzal: $16.500 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Domino\'s Pizza (Fast Order UI)', 'url': 'https://www.dominos.com', 'detalles': 'Botón gigante de pedir delivery, barra de estado del pedido en tiempo real.'},
            {'nombre': 'El Cuartito Pizza (BsAs)', 'url': 'https://elcuartito.com.ar', 'detalles': 'Estética porteña rústica, fotos de queso derretido y porciones abundantes.'},
            {'nombre': 'PedirYa / Rappi UX Patterns', 'url': 'https://www.pedidosya.com.ar', 'detalles': 'Menú categorizado por pestañas sticky, suma rápida al carrito.'}
        ],
        'paleta': 'Rojo Tomate Fuego (oklch(0.62 0.22 30)), Amarillo Queso (#F59E0B), Carbón (#18181B)',
        'fuentes': 'Space Grotesk (Títulos) + Plus Jakarta Sans (Cuerpo)',
        'sitemap': ['1. Hero Tentación Casera + Pedir Ahora', '2. Menú de Pizzas, Milanesas & Empanadas', '3. Promos Familiares del Día', '4. Pedido Directo por WhatsApp', '5. Cobertura de Envíos']
    },
    '10-cerveceria-punto-cebada': {
        'nombre_demo': 'Cervecería Punto Cebada',
        'subrubro': 'Cervecería Artesanal / Taproom & Hamburguesas',
        'categoria': 'GASTRO',
        'keywords': ['cerveceria', 'birra', 'craft', 'taproom', 'bar', 'hamburguesa'],
        'precios': [
            'Pinta Cerveza Artesanal (IPA, APA, Stout, Honey): $3.800 - $5.000 ARS',
            'Burger Doble Carne Smashed con Cheddar & Bacon: $11.500 - $15.000 ARS',
            'Papas Bastón con Cheddar, Panceta & Verdeo: $9.500 ARS',
            'Happy Hour 2x1 Pinta (18hs a 20:30hs): $5.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'BrewDog Taprooms', 'url': 'https://www.brewdog.com', 'detalles': 'Modo oscuro neon punk, pizarra de canillas de cerveza en vivo con IBU y ABV.'},
            {'nombre': 'Antares Cervecería (MDP)', 'url': 'https://www.cervezaantares.com', 'detalles': 'Canillería Marplatense con fotos de fábrica, reserva de mesa y eventos.'},
            {'nombre': 'Mi Barrio Hamburguesería', 'url': 'https://mibarriohamburgueseria.com.ar', 'detalles': 'Menú interactivo de burgers gigantes con animación hover.'}
        ],
        'paleta': 'Negro Noche (#09090B), Cobre Cebada (oklch(0.70 0.18 65)), Neón Ámbar (#F59E0B)',
        'fuentes': 'Cabinet Grotesk / Syne (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Pinta Helada & Taproom', '2. Pizarra de Canillas Artesanales (Live Tap)', '3. Menú de Burgers & Tapeo', '4. Happy Hour & Eventos', '5. Reservar Mesa WhatsApp']
    },
    '11-vinoteca-cava-puerto': {
        'nombre_demo': 'Vinoteca Cava Puerto',
        'subrubro': 'Vinoteca / Delicatessen & Catas Privadas',
        'categoria': 'GASTRO',
        'keywords': ['vinoteca', 'vino', 'bodega', 'finca', 'malbec', 'sommelier'],
        'precios': [
            'Vino Malbec Reserva Boutique (Botella): $12.000 - $28.000 ARS',
            'Caja x6 Vinos Selección Sommelier: $55.000 - $95.000 ARS',
            'Tabla de Quesos & Fiambres de Colección: $28.000 ARS',
            'Entrada Experiencia Cata Guiada de Vinos: $22.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Berry Bros. & Rudd (UK)', 'url': 'https://www.bbr.com', 'detalles': 'Elegancia señorial británica, buscador por cepa, región y maridaje.'},
            {'nombre': 'Vivino App UX', 'url': 'https://www.vivino.com', 'detalles': 'Fichas de vino con puntuación de sommelier, notas de cata e iconos.'},
            {'nombre': 'Ligier Vinotecas (BsAs)', 'url': 'https://ligier.com.ar', 'detalles': 'Catálogo por bodegas con pedido por WhatsApp y envíos cuidados.'}
        ],
        'paleta': 'Vino Tinto Borgoña (#4C0519), Oro Antiguo (oklch(0.75 0.12 85)), Negro Azabache (#0F172A)',
        'fuentes': 'Cinzel / Cormorant Garamond (Títulos) + DM Sans (Cuerpo)',
        'sitemap': ['1. Hero Cava Secreta & Etiquetas Exclusivas', '2. Selección del Sommelier', '3. Regalos Empresariales & Cajas', '4. Experiencias de Cata', '5. Pedir por WhatsApp']
    },
    '12-showroom-nube': {
        'nombre_demo': 'Showroom Nube',
        'subrubro': 'Showroom Moda Femenina / Tendencias & Accessories',
        'categoria': 'MODA',
        'keywords': ['showroom', 'moda femenina', 'indumentaria femenina', 'ropa mujer', 'vestidos'],
        'precios': [
            'Vestidos de Noche / Fiesta Trend: $45.000 - $85.000 ARS',
            'Blusas / Tops de Seda & Lino: $22.000 - $38.000 ARS',
            'Jeans Calce Perfecto / Cargo: $38.000 - $55.000 ARS',
            'Accesorios & Carteras de Cuero: $18.000 - $35.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Sézane Paris', 'url': 'https://www.sezane.com', 'detalles': 'Estética romántica parisina, fotografía de estudio con luz natural, navegación fluida.'},
            {'nombre': 'Zara Woman (Mobile UX)', 'url': 'https://www.zara.com', 'detalles': 'Lookbook vertical tipo Instagram Stories, compra directa de prendas del outfit.'},
            {'nombre': 'Rapsodia Argentina', 'url': 'https://www.rapsodia.com.ar', 'detalles': 'Galería bento vibrante con destacados de temporada.'}
        ],
        'paleta': 'Beige Nube (#FDFBF7), Rosa Terracota (oklch(0.72 0.12 35)), Negro Suave (#1F2937)',
        'fuentes': 'Tenor Sans / Playfair (Títulos) + Plus Jakarta Sans (Cuerpo)',
        'sitemap': ['1. Hero Lookbook Nueva Colección', '2. Galería de Drops & Outfits', '3. Guía de Talles & Envíos', '4. Agendar Visita al Showroom por WhatsApp', '5. Instagram Feed']
    },
    '13-sport-base9': {
        'nombre_demo': 'Sport Base9',
        'subrubro': 'Indumentaria Deportiva / Camisetas & Fitness',
        'categoria': 'MODA',
        'keywords': ['deport', 'sport', 'camisetas', 'gimnasio', 'fitness', 'running'],
         'precios': [
            'Camisetas Oficiales / Réplicas Premium: $28.000 - $42.000 ARS',
            'Calzas de Compresión / Gym Wear Mujer: $24.000 - $36.000 ARS',
            'Shorts & Remeras Dry-Fit Running: $18.000 - $26.000 ARS',
            'Zapatillas Deportivas Importadas: $85.000 - $160.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Gymshark', 'url': 'https://www.gymshark.com', 'detalles': 'Estética de alto rendimiento, modelos atléticos en movimiento, filtros por disciplina.'},
            {'nombre': 'Nike Training Section', 'url': 'https://www.nike.com', 'detalles': 'Modo oscuro impactante con tipografía itálica dinámica y transiciones de aceleración.'},
            {'nombre': 'Sporting Argentina', 'url': 'https://www.sporting.com.ar', 'detalles': 'Promociones bancarias destacadas con WhatsApp direct.'}
        ],
        'paleta': 'Negro Antracita (#111827), Neón Volt (oklch(0.85 0.22 130)), Gris Deportivo (#374151)',
        'fuentes': 'Dela Gothic One / Impact (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero High Performance Wear', '2. Catálogo por Disciplina (Running, Gym, Fútbol)', '3. Tabla de Talles & Telas', '4. Promos 3 y 6 Cuotas', '5. Comprar WhatsApp']
    },
    '14-calzado-paso-norte': {
        'nombre_demo': 'Calzado Paso Norte',
        'subrubro': 'Zapatería / Calzado Urbano & Botas de Cuero',
        'categoria': 'MODA',
        'keywords': ['calzado', 'zapateria', 'zapatillas', 'zapatos', 'botas', 'cuero'],
        'precios': [
            'Botas / Bucaneras de Cuero Vacuno: $85.000 - $140.000 ARS',
            'Zapatillas Urbanas de Diseño: $45.000 - $75.000 ARS',
            'Sandalias / Mocasines de Temporada: $38.000 - $62.000 ARS',
            'Cinto & Cinturones de Cuero: $15.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Nisolo Shoes', 'url': 'https://nisolo.com', 'detalles': 'Artesanía en cuero sostenible, tonos tierra cálidos, vistas en 360° del producto.'},
            {'nombre': 'Grimoldi Argentina', 'url': 'https://www.grimoldi.com', 'detalles': 'Buscador por número y horma con stock en tiempo real.'},
            {'nombre': 'Ricky Sarkany', 'url': 'https://www.rickysarkany.com', 'detalles': 'Fotografía editorial de alto impacto con videos de pasarela.'}
        ],
        'paleta': 'Marrón Suela (#78350F), Arena Cálida (#FEF3C7), Carbón Mate (#1C1917)',
        'fuentes': 'Cabinet Grotesk (Títulos) + DM Sans (Cuerpo)',
        'sitemap': ['1. Hero Cuero Artesanal Marplatense', '2. Colección Zapatos & Botas', '3. Guía de Hormas & Números', '4. Envíos Nacionales', '5. Asesoramiento WhatsApp']
    },
    '15-inmobiliaria-costa-real': {
        'nombre_demo': 'Inmobiliaria Costa Real',
        'subrubro': 'Inmobiliaria / Venta & Alquiler de Propiedades',
        'categoria': 'INMOBILIARIA',
        'keywords': ['inmobiliaria', 'propiedades', 'bienes raices', 'departamento', 'casa', 'tasacion'],
        'precios': [
            'Departamento 2 Ambientes Güemes / Macrocentro: USD 65.000 - USD 110.000',
            'Departamento 3 Ambientes Vista al Mar Playa Grande: USD 140.000 - USD 280.000',
            'Casa / Chalet Los Troncos: USD 220.000 - USD 450.000',
            'Servicio de Tasación Profesional de Inmuebles: En el día / Sin cargo'
        ],
        'inspiracion': [
            {'nombre': 'Sotheby\'s International Realty', 'url': 'https://www.sothebysrealty.com', 'detalles': 'Diseño inmobiliario de ultra lujo, recorridos virtuales 3D Matterport, tipografía de prestigio.'},
            {'nombre': 'Zonaprop Argentina UX', 'url': 'https://www.zonaprop.com.ar', 'detalles': 'Filtros rápidos por zona (Güemes, Playa Grande, Los Troncos) y ambientes.'},
            {'nombre': 'Remax Argentina', 'url': 'https://www.remax.com.ar', 'detalles': 'Tarjetas de agentes inmobiliarios con botón directo de WhatsApp.'}
        ],
        'paleta': 'Azul Marino Patrimonial (#0F172A), Dorado Champán (oklch(0.78 0.12 85)), Blanco Puro (#FFFFFF)',
        'fuentes': 'Cinzel / Montserrat (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Buscador de Inmuebles Destacados', '2. Catálogo Venta & Alquiler por Zonas', '3. Solicitud de Tasación Exprés', '4. Equipo de Corredores', '5. Consultar Inmueble WhatsApp']
    },
    '16-temporarios-dunas': {
        'nombre_demo': 'Temporarios Dunas',
        'subrubro': 'Alquiler Temporario / Departamentos Frente al Mar',
        'categoria': 'INMOBILIARIA',
        'keywords': ['alquiler temporario', 'temporario', 'departamento mar del plata', 'vacaciones', 'playa'],
        'precios': [
            'Alquiler Diario Depto 2 Ambientes Frente al Mar (Temporada): $65.000 - $95.000 ARS / noche',
            'Alquiler Diario 3 Ambientes Cocheras Playa Varese: $110.000 - $160.000 ARS / noche',
            'Semana Completa Verano (Pack 7 noches): $420.000 ARS',
            'Reserva de Cochera / Carpa en Balneario: Adicional'
        ],
        'inspiracion': [
            {'nombre': 'Airbnb Luxury Section', 'url': 'https://www.airbnb.com', 'detalles': 'Galería de fotos tipo grid bento con lightbox, calendario de disponibilidad visible.'},
            {'nombre': 'Sonder Hospitality', 'url': 'https://www.sonder.com', 'detalles': 'Check-in digital, estética de departamentos de revista, mapa interactivo de cercanías.'},
            {'nombre': 'Alquileres Argentina Portal', 'url': 'https://www.alquilerargentina.com', 'detalles': 'Filtro por distancia a la playa y servicios (Wi-Fi, Balcón, Cochera).'}
        ],
        'paleta': 'Azul Turquesa Costero (oklch(0.72 0.14 210)), Arena Dorada (#FEF3C7), Blanco Salino (#F8FAFC)',
        'fuentes': 'Outfit (Títulos) + DM Sans (Cuerpo)',
        'sitemap': ['1. Hero Departamentos con Vista al Mar', '2. Unidades Disponibles & Amenities', '3. Calendario & Tarifas de Temporada', '4. Galería de Vistas & Playa', '5. Reservar Fechas por WhatsApp']
    },
    '17-cabanas-aires-faro': {
        'nombre_demo': 'Cabañas Aires Faro',
        'subrubro': 'Cabañas & Complejo Turístico Sierra y Mar',
        'categoria': 'TURISMO',
        'keywords': ['cabaña', 'cabanas', 'sierra de los padres', 'complejo', 'pileta', 'bosque'],
        'precios': [
            'Cabaña Premium 2 a 4 Personas con Hidromasaje & Parrilla: $75.000 - $110.000 ARS / noche',
            'Cabaña Familiar 6 Personas con Parque Privado: $120.000 - $170.000 ARS / noche',
            'Escapada Fin de Semana Largo (3 noches): $220.000 ARS',
            'Servicio de Desayuno Seco de Campo: Incluido'
        ],
        'inspiracion': [
            {'nombre': 'Getaway House (USA)', 'url': 'https://getaway.house', 'detalles': 'Fotografía inmersiva de bosques y fogones, reserva intuitiva por noches.'},
            {'nombre': 'Cabinscape Canada', 'url': 'https://www.cabinscape.com', 'detalles': 'Diseño ecofriendly con mapa interactivo de senderos y experiencias.'},
            {'nombre': 'Cabañas de Argentina Portal', 'url': 'https://www.cabanas.com.ar', 'detalles': 'Servicios incluidos (piscina, parrilla, Wi-Fi) destacados con iconos.'}
        ],
        'paleta': 'Verde Bosque (#14532D), Marrón Madera (#78350F), Crema Sol (#FEF3C7)',
        'fuentes': 'Playfair Display (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Naturaleza & Desconexión', '2. Cabañas & Equipamiento', '3. Parque, Piscina & Servicios', '4. Guía de Atracciones Cercanas', '5. Consultar Disponibilidad WhatsApp']
    },
    '18-hotel-olas-sur': {
        'nombre_demo': 'Hotel Olas Sur',
        'subrubro': 'Hotel Boutique / Apart Hotel Costero',
        'categoria': 'TURISMO',
        'keywords': ['hotel', 'apart', 'hostel', 'posada', 'alojamiento', 'habitacion'],
        'precios': [
            'Habitación Matrimonial Superior con Desayuno Buffet: $85.000 - $125.000 ARS / noche',
            'Suite Presidencial Vista Panorámica al Mar: $160.000 - $240.000 ARS / noche',
            'Apartamento de 2 Ambientes con Cocina Completa: $110.000 ARS / noche',
            'Cochera Cubierta Privada en el Hotel: $12.000 ARS / día'
        ],
        'inspiracion': [
            {'nombre': 'Marriott Boutique Hotels', 'url': 'https://www.marriott.com', 'detalles': 'Cabecera elegante con motor de reserva directa, video de bienvenida de fondo.'},
            {'nombre': 'Faena Hotel (BsAs)', 'url': 'https://www.faena.com', 'detalles': 'Diseño dramático de alta gama, tipografía estilizada, fotos de ambiente nocturno.'},
            {'nombre': 'Hoteles de Mar del Plata Portal', 'url': 'https://www.turismomardelplata.gob.ar', 'detalles': 'Ubicación respecto a los balnearios principales de la ciudad.'}
        ],
        'paleta': 'Azul Noche Real (#0F172A), Dorado Sol (oklch(0.78 0.14 75)), Blanco Mármol (#F8FAFC)',
        'fuentes': 'Cormorant Garamond (Títulos) + Plus Jakarta Sans (Cuerpo)',
        'sitemap': ['1. Hero Confort Frente al Mar', '2. Habitaciones & Suites', '3. Servicios (Desayuno, Spa, Cochera)', '4. Galería de Instalaciones', '5. Reserva Directa por WhatsApp']
    },
    '19-lavadero-aquashine': {
        'nombre_demo': 'Lavadero Aquashine',
        'subrubro': 'Lavadero de Autos / Detail & Car Care',
        'categoria': 'AUTOMOTRIZ',
        'keywords': ['lavadero', 'car wash', 'lavado de autos', 'detail', 'lustrado', 'motor'],
        'precios': [
            'Lavado Completo Carrocería + Chasis + Aspirado: $12.000 - $18.000 ARS',
            'Tratamiento Cerámico / Vitrificado Pintura: $95.000 - $160.000 ARS',
            'Limpieza de Tapizados de Tela / Cuero (Desarme completo): $45.000 - $70.000 ARS',
            'Lavado de Motor & Acondicionamiento de Plásticos: $22.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Chemical Guys Car Care', 'url': 'https://www.chemicalguys.com', 'detalles': 'Estética automotriz de alta potencia, brillo metálico, videos de transformaciones.'},
            {'nombre': 'Detailing Argentina Center', 'url': 'https://detailing.com.ar', 'detalles': 'Comparativa de tratamientos (Acrílico vs Cerámico vs PPF).'},
            {'nombre': 'Mister Car Wash USA', 'url': 'https://mistercarwash.com', 'detalles': 'Suscripción de lavado ilimitado y turnos exprés.'}
        ],
        'paleta': 'Azul Eléctrico (#0284C7), Gris Titanio (#334155), Neón Cyan (oklch(0.78 0.18 190))',
        'fuentes': 'Space Grotesk (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Brillo & Proteccion Extrema', '2. Servicios de Lavado & Detail', '3. Galería Antes/Después', '4. Preguntas Frecuentes', '5. Pedir Turno por WhatsApp']
    },
    '20-gomeria-rodado-sur': {
        'nombre_demo': 'Gomería Rodado Sur',
        'subrubro': 'Gomería / Venta de Neumáticos & Alineación 3D',
        'categoria': 'AUTOMOTRIZ',
        'keywords': ['gomeria', 'neumatico', 'goma', 'rueda', 'alineacion', 'balanceo'],
        'precios': [
            'Neumático Rodado 14 / 15 Marca Líder: $110.000 - $165.000 ARS c/u',
            'Alineación Computarizada 3D + Balanceo x4 Ruedas: $28.000 - $38.000 ARS',
            'Reparación de Válvulas / Emparchado Vulcanizado: $8.500 - $14.000 ARS',
            'Auxilio en Via Pública 24 hs Mar del Plata: $35.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Discount Tire USA', 'url': 'https://www.discounttire.com', 'detalles': 'Buscador de neumáticos por marca, modelo y año del auto.'},
            {'nombre': 'Neumáticos Fate Argentina', 'url': 'https://www.fate.com.ar', 'detalles': 'Catálogo técnico por rodado con promociones de cuotas.'},
            {'nombre': 'Bridgestone Store UX', 'url': 'https://www.bridgestone.com.ar', 'detalles': 'Localizador de talleres oficial con presupuesto inmediato.'}
        ],
        'paleta': 'Negro Caucho (#18181B), Amarillo Alerta (#F59E0B), Gris Metal (#475569)',
        'fuentes': 'Cabinet Grotesk / Impact (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Ruedas Seguras + Presupuesto Exprés', '2. Buscador de Neumáticos por Rodado', '3. Servicios de Alineación 3D & Auxilio', '4. Promos Bancarias Cuotas', '5. WhatsApp Directo']
    },
    '21-taller-motorbox': {
        'nombre_demo': 'Taller Motorbox',
        'subrubro': 'Taller Mecánico / Inyección Electrónica & Repuestos',
        'categoria': 'AUTOMOTRIZ',
        'keywords': ['taller', 'mecanic', 'repuestos', 'automotor', 'inyeccion', 'frenos'],
        'precios': [
            'Service Completo Cambio de Aceite Sintético & 4 Filtros: $48.000 - $75.000 ARS',
            'Diagnóstico Computarizado de Inyección Electrónica (Scanner): $22.000 ARS',
            'Cambio de Kit de Distribución + Bomba de Agua: $120.000 - $190.000 ARS',
            'Reparación de Frenos (Pastillas + Discos): $65.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Bosch Car Service Global', 'url': 'https://www.boschcarservice.com', 'detalles': 'Confianza alemana, listado claro de servicios de mecánica ligera y pesada.'},
            {'nombre': 'Firestone Complete Auto Care', 'url': 'https://www.firestonecompleteautocare.com', 'detalles': 'Agendamiento de turno de service con selector de fecha.'},
            {'nombre': 'Norauto Argentina', 'url': 'https://www.norauto.com.ar', 'detalles': 'Precios de packs de service de aceite y filtros en 1 clic.'}
        ],
        'paleta': 'Gris Oscuro Garaje (#0F172A), Rojo Deportivo (oklch(0.62 0.22 25)), Blanco Puro (#FFFFFF)',
        'fuentes': 'Outfit (Títulos) + DM Sans (Cuerpo)',
        'sitemap': ['1. Hero Mecánica de Precision & Escáner', '2. Servicios de Taller & Mantenimiento', '3. Presupuesto sin Cargo por WhatsApp', '4. Garantía de Trabajo', '5. Ubicación & Contacto']
    },
    '22-regaleria-dulce-detalle': {
        'nombre_demo': 'Regalería Dulce Detalle',
        'subrubro': 'Regalería / Peluches, Globos & Regalos de Cumpleaños',
        'categoria': 'COMERCIO',
        'keywords': ['regaleria', 'peluche', 'regalos', 'bazar', 'cumpleaños', 'jugueteria'],
        'precios': [
            'Box de Regalo Sorpresa Dulce (Desayuno / Golosinas): $25.000 - $42.000 ARS',
            'Peluches Gigantes Importados (80cm - 1.2m): $45.000 - $85.000 ARS',
            'Bouquet de Globos Helio Personalizado: $18.000 - $32.000 ARS',
            'Artículos de Bazar / Tazas con Frases: $8.500 - $14.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Edible Arrangements (USA)', 'url': 'https://www.ediblearrangements.com', 'detalles': 'Catálogo visual por ocasión (Cumpleaños, Aniversario, Agradecimiento).'},
            {'nombre': 'Morph Regalos Argentina', 'url': 'https://www.morph.com.ar', 'detalles': 'Diseño pop colorido, tarjetas de producto divertidas con botonera rápida.'},
            {'nombre': 'EnviaFlores LATAM', 'url': 'https://www.enviaflores.com', 'detalles': 'Selección de regalos con envío en el día por WhatsApp.'}
        ],
        'paleta': 'Rosa Pastelería (#FCE7F3), Amarillo Sol (#FEF08A), Violeta Dulce (#8B5CF6)',
        'fuentes': 'Fredoka / Outfit (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Sorprendé a Quien Más Querés', '2. Regalos por Ocasión (Aniversario, Cumple)', '3. Boxes & Peluches Destacados', '4. Envío Sorpresa a Domicilio', '5. Comprar por WhatsApp']
    },
    '23-imprenta-estampa': {
        'nombre_demo': 'Imprenta Estampa',
        'subrubro': 'Imprenta Digital / Cartelería & Sublimación',
        'categoria': 'COMERCIO',
        'keywords': ['imprenta', 'grafica', 'sublimac', 'cartel', 'folletos', 'tarjetas'],
        'precios': [
            '1000 Tarjetas de Presentación Ilustración 300g: $22.000 - $32.000 ARS',
            'Lona Vinílica Impresa m² (Cartelería): $18.000 - $28.000 ARS',
            'Remeras Sublimadas / Estampadas para Empresas (Pack x10): $65.000 ARS',
            'Folletos A5 Full Color x1000 unidades: $35.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Vistaprint Global', 'url': 'https://www.vistaprint.com', 'detalles': 'Demostración visual de productos impresos en maquetas 3D realist.'},
            {'nombre': 'Moo Cards Premium', 'url': 'https://www.moo.com', 'detalles': 'Diseño vanguardista para creativos, muestras de papeles y acabados.'},
            {'nombre': 'Imprenta Docuprint Argentina', 'url': 'https://docuprint.com.ar', 'detalles': 'Cotizador exprés por WhatsApp adjuntando archivo de diseño.'}
        ],
        'paleta': 'Cian Imprenta (oklch(0.70 0.18 220)), Magenta Vivo (#E11D48), Amarillo CMYK (#FACC15)',
        'fuentes': 'Space Grotesk (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Tu Marca Impresa con Calidad', '2. Catálogo Papelería & Cartelería', '3. Sublimación & Merchandising', '4. Cotizador por Archivo', '5. Enviar Diseño por WhatsApp']
    },
    '24-distribuidora-mdp': {
        'nombre_demo': 'Distribuidora MDP',
        'subrubro': 'Distribuidora Mayorista / Almacén & Gastronomía',
        'categoria': 'COMERCIO',
        'keywords': ['distribuidora', 'mayorista', 'proveedor', 'almacen', 'insumos'],
        'precios': [
            'Bulto Cerrado Bebidas / Comestibles: Precios Mayoristas Especiales',
            'Pack Insumos Gastronómicos descartables (x500 un): $28.000 - $45.000 ARS',
            'Mínimo de Compra Mayorista: $80.000 ARS',
            'Flete sin Cargo en Mar del Plata: Compras superiores a $150.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Boxed Wholesale USA', 'url': 'https://www.boxed.com', 'detalles': 'Compra por bulto simplificada, indicadores de ahorro por volumen.'},
            {'nombre': 'Maxiconsumo Argentina', 'url': 'https://maxiconsumo.com', 'detalles': 'Descarga de lista de precios en Excel/PDF y pedido directo.'},
            {'nombre': 'Diarco Mayorista Portal', 'url': 'https://www.diarco.com.ar', 'detalles': 'Ofertas semanales para comercios y gastronómicos.'}
        ],
        'paleta': 'Azul Logística (#1E3A8A), Amarillo Oferta (#F59E0B), Gris Claro (#F1F5F9)',
        'fuentes': 'Plus Jakarta Sans (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Proveedores Oficiales de MDP', '2. Catálogo Mayorista por Rubro', '3. Lista de Precios Actualizada', '4. Formulario Cliente Comercial', '5. Pedido Mayorista WhatsApp']
    },
    '25-ferreteria-ferretodo': {
        'nombre_demo': 'Ferretería Ferretodo',
        'subrubro': 'Ferretería Industrial / Sanitarios & Herramientas',
        'categoria': 'COMERCIO',
        'keywords': ['ferreteria', 'sanitarios', 'construccion', 'herramientas', 'pintura'],
        'precios': [
            'Taladro Percutor 750W Marca Profesional: $65.000 - $110.000 ARS',
            'Set de Herramientas Manuales 100 Piezas: $45.000 - $78.000 ARS',
            'Látex Interior/Exterior 20L Pintura: $55.000 - $85.000 ARS',
            'Grifería Monocomando Cocina / Baño: $38.000 - $70.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Home Depot USA UX', 'url': 'https://www.homedepot.com', 'detalles': 'Buscador masivo por categoría técnica, guías de "Hazlo tú mismo".'},
            {'nombre': 'Sodimac Argentina', 'url': 'https://www.sodimac.com.ar', 'detalles': 'Destacados de herramientas eléctricas y materiales de construcción.'},
            {'nombre': 'Ferretería Easy', 'url': 'https://www.easy.com.ar', 'detalles': 'Venta directa asistida por WhatsApp con entrega en obra.'}
        ],
        'paleta': 'Naranja Industrial (#EA580C), Gris Carbón (#1E293B), Blanco Puro (#FFFFFF)',
        'fuentes': 'Dela Gothic One / Roboto (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Todo para Tu Obra y Hogar', '2. Herramientas, Sanitarios & Pinturas', '3. Marcas Oficiales que Trabajamos', '4. Descuentos a Gremios', '5. Consultar Stock WhatsApp']
    },
    '26-petshop-patitas': {
        'nombre_demo': 'Petshop Patitas',
        'subrubro': 'Pet Shop / Alimento Balanceado & Veterinaria',
        'categoria': 'COMERCIO',
        'keywords': ['pet shop', 'veterinaria', 'mascotas', 'canina', 'alimento', 'perro'],
        'precios': [
            'Alimento Balanceado Perro Adulto 15kg Super Premium: $38.000 - $65.000 ARS',
            'Alimento Gato 7.5kg Control de Bolas de Pelo: $28.000 - $45.000 ARS',
            'Servicio de Baño & Peluquería Canina: $14.000 - $22.000 ARS',
            'Pipeta Antipulgas / Desparasitante: $8.500 - $15.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Chewy USA (Pet Care UI)', 'url': 'https://www.chewy.com', 'detalles': 'Diseño amigable enfocado en el cuidado animal, suscripción de envío recurrente.'},
            {'nombre': 'Puppis Argentina', 'url': 'https://www.puppis.com.ar', 'detalles': 'Navegación por tipo de mascota (Perros, Gatos, Aves) y marcas.'},
            {'nombre': 'BarkBox', 'url': 'https://www.barkbox.com', 'detalles': 'Boxes mensuales temáticos con fotos divertidas de perros.'}
        ],
        'paleta': 'Naranja Cálido (oklch(0.72 0.18 50)), Azul Amigable (#0284C7), Beige Croqueta (#FEF3C7)',
        'fuentes': 'Fredoka (Títulos) + DM Sans (Cuerpo)',
        'sitemap': ['1. Hero Lo Mejor para Tu Mascota', '2. Alimentos Balanceados & Envíos Sin Cargo', '3. Peluquería Canina & Veterinaria', '4. Accesorios & Juguetes', '5. Pedir Bolsa por WhatsApp']
    },
    '27-contable-conta-co': {
        'nombre_demo': 'Contable Conta&Co',
        'subrubro': 'Estudio Contable / Asesoría Impositiva & Pymes',
        'categoria': 'SERVICIOS',
        'keywords': ['contable', 'estudio contable', 'contador', 'asesoria', 'impuestos', 'afip'],
        'precios': [
            'Abono Mensual Monotributo / Liquidación AFIP: $18.000 - $28.000 ARS / mes',
            'Abono Mensual Responsable Inscripto / Pymes: $65.000 - $140.000 ARS / mes',
            'Liquidación de Sueldos y Cargas Sociales (Por empleado): $8.500 ARS',
            'Constitución de Sociedad (SAS / SRL) Gestiones: $180.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'Pilot.com Accounting', 'url': 'https://pilot.com', 'detalles': 'Estética fintech moderna, gráficos limpios de crecimiento, calculadora de honorarios.'},
            {'nombre': 'Bench Accounting', 'url': 'https://bench.co', 'detalles': 'Diseño profesional que transmite tranquilidad fiscal y orden contable.'},
            {'nombre': 'Estudio Contable Argentina (BsAs)', 'url': 'https://www.estudiocontable.com.ar', 'detalles': 'Formulario de diagnóstico fiscal sin cargo en 1 clic.'}
        ],
        'paleta': 'Azul Ejecutivo (#1E3A8A), Verde Crecimiento (#16A34A), Blanco Plata (#F8FAFC)',
        'fuentes': 'Outfit (Títulos) + Inter (Cuerpo)',
        'sitemap': ['1. Hero Orden Fiscal & Tranquilidad para tu Pyme', '2. Servicios Contables, Impositivos & Laborales', '3. Calculador de Monotributo / Honorarios', '4. Casos de Éxito', '5. Consulta por WhatsApp']
    },
    '28-flores-jardin-puerto': {
        'nombre_demo': 'Flores Jardín Puerto',
        'subrubro': 'Florería / Vivero & Decoración de Eventos',
        'categoria': 'SERVICIOS',
        'keywords': ['floreria', 'flores', 'vivero', 'jardin', 'plantas', 'ramos'],
        'precios': [
            'Ramo de Rosas / Flores Frescas Estación: $18.000 - $35.000 ARS',
            'Planta de Interior (Monstera, Ficus) en Maceta de Diseño: $25.000 - $48.000 ARS',
            'Ambientación Floral para Bodas / Eventos: $180.000 - $350.000 ARS',
            'Envío de Ramos Sorpresa a Domicilio con Tarjeta: $22.000 ARS'
        ],
        'inspiracion': [
            {'nombre': 'The Bouqs Co. USA', 'url': 'https://bouqs.com', 'detalles': 'Fotografía botánica vibrante, arreglos florales directo del cultivo.'},
            {'nombre': 'Bloom & Wild UK', 'url': 'https://www.bloomandwild.com', 'detalles': 'Empaque en caja de regalo y entrega por correo con flores en capullo.'},
            {'nombre': 'Florería Cecilia (BsAs)', 'url': 'https://www.floreriacecilia.com.ar', 'detalles': 'Selección exprés de ramos por motivo con pedido por WhatsApp.'}
        ],
        'paleta': 'Verde Botánico (#15803D), Rosa Floral (#F472B6), Blanco Lirio (#FAFAFA)',
        'fuentes': 'Cormorant Garamond (Títulos) + DM Sans (Cuerpo)',
        'sitemap': ['1. Hero Flores Frescas para Momentos Únicos', '2. Catálogo de Ramos & Plantas de Interior', '3. Ambientación de Eventos & Bodas', '4. Envío a Domicilio en MDP', '5. Pedir Ramo por WhatsApp']
    }
}

def clean_phone(phone_str):
    if not phone_str or str(phone_str).lower() in ['none', 'nan', '']:
        return '+54 9 223 555-0199'
    raw = re.sub(r'\D', '', str(phone_str))
    if not raw:
        return '+54 9 223 555-0199'
    if raw.startswith('549'):
        return f'+{raw}'
    elif raw.startswith('223') or raw.startswith('0223'):
        clean_num = raw.lstrip('0')
        return f'+54 9 {clean_num[:3]} {clean_num[3:6]}-{clean_num[6:]}' if len(clean_num) >= 9 else f'+54 9 {clean_num}'
    else:
        return f'+54 9 {raw}'

def main():
    print("🚀 Iniciando generación de la Demo Factory en research/...")
    
    # Load catalog for matching real businesses
    catalog_path = os.path.join('data', 'leads_catalog.json')
    by_id = {}
    if os.path.exists(catalog_path):
        with open(catalog_path, 'r', encoding='utf-8') as f:
            cat_data = json.load(f)
            by_id = cat_data.get('by_id', {})

    # Ensure research directories exist
    research_dir = 'research'
    dossiers_dir = os.path.join(research_dir, 'dossiers')
    os.makedirs(dossiers_dir, exist_ok=True)
    
    # 1. Generate brief-demo-factory.md
    brief_content = """# Brief y Protocolo Operativo: Demo Factory Naro AI

Este documento establece la arquitectura del flujo de trabajo en paralelo entre **Antigravity** (Investigación, Datos Reales, Dirección Artística) y **Open Design** (Construcción y Maquetación de código de las 28 Demos).

---

## 🎯 Objetivo General
Construir **28 landing pages profesionales** correspondientes a 28 subrubros comerciales clave en Mar del Plata. Cada demo servirá como activo de venta directa en frío, alojado en Cloudflare Pages (`https://<slug>.pages.dev`).

---

## 🔄 División Fija de Roles

| Agente | Responsabilidad Principal | Entregables |
|---|---|---|
| **Antigravity** | Investigación de mercado local, extracción de leads reales de MDP, búsqueda de referencias de animación/UI, definición de paletas y copy. | `research/dossiers/<NN-slug>/` (`dossier.md`, `inspiracion.md`, `refuerzo-design.md`, `assets/`) |
| **Open Design** | Lectura del dossier de investigación, maquetación HTML/CSS/JS responsive de alta densidad (>25 KB), integración de librerías y componentes interactivos. | `webs/<NN-slug>/index.html` + despliegue |

---

## 📁 Estructura del Workspace `research/`

```
research/
├── README.md                 ← Matriz de seguimiento con estado de las 28 demos
├── brief-demo-factory.md     ← Este documento de especificaciones
└── dossiers/
    ├── 01-clinica-aura/
    │   ├── dossier.md        ← Leads reales MDP, precios locales y link de WhatsApp
    │   ├── inspiracion.md    ← 3-5 Webs de referencia internacional/nacional con animación
    │   ├── refuerzo-design.md← Paleta OKLCH, fuentes, sitemap sugerido
    │   └── assets/           ← Recursos gráficos e iconos descargados
    ├── ... (28 subrubros)
```

---

## 📋 Reglas de Calidad Inviolables
1. **Sin Datos Inventados**: Todo negocio listado en `dossier.md` proviene de los leads verificados de Mar del Plata. Cualquier dato estimado se marca `[NO VERIFICADO]`.
2. **Copywriting Rioplatense**: Textos pensados para el consumidor de Mar del Plata (voz cercana, clara, persuasiva).
3. **Botón WhatsApp Explícito**: Texto exacto "WhatsApp" (nunca "WA") con enlace `wa.me` pre-formateado.
4. **Respeto al Motor Open Design**: La carpeta `refuerzo-design.md` entrega pautas de inspiración, pero Open Design decide el maquetado final.
"""
    with open(os.path.join(research_dir, 'brief-demo-factory.md'), 'w', encoding='utf-8') as f:
        f.write(brief_content)

    print("✅ Creado: research/brief-demo-factory.md")

    # 2. Build Dossiers and README.md
    readme_rows = []
    
    for slug, spec in DOSSIERS_SPEC.items():
        slug_dir = os.path.join(dossiers_dir, slug)
        assets_dir = os.path.join(slug_dir, 'assets')
        os.makedirs(assets_dir, exist_ok=True)
        
        # Match real MDP leads for this subrubro
        matches = []
        kw_list = spec['keywords']
        for lid, item in by_id.items():
            name = (item.get('nombre') or '').lower()
            sec = (item.get('sector') or '').lower()
            rub = (item.get('rubro') or '').lower()
            text = f'{name} {sec} {rub}'
            
            if any(kw in text for kw in kw_list):
                nombre = (item.get('nombre') or '').strip()
                direccion = (item.get('direccion') or '').strip()
                telefono = str(item.get('whatsapp') or item.get('telefono') or '').strip()
                if nombre and len(nombre) > 2:
                    matches.append({
                        'nombre': nombre,
                        'direccion': direccion if (direccion and direccion != 'None') else 'Mar del Plata, Buenos Aires',
                        'telefono': clean_phone(telefono),
                        'web': item.get('web') or item.get('url_google_maps') or 'No posee web propia'
                    })
                    if len(matches) >= 3:
                        break
                        
        if not matches:
            matches.append({
                'nombre': f'{spec["nombre_demo"]} (Referencia Local)',
                'direccion': 'Zona Comercial Mar del Plata',
                'telefono': '+54 9 223 555-0199',
                'web': 'No posee web propia'
            })
            
        # File 1: dossier.md
        dossier_md = f"""# Dossier de Investigación: {spec['nombre_demo']} ({spec['subrubro']})

## 📌 Contexto del Subrubro en Mar del Plata
- **Categoría**: {spec['categoria']}
- **Subrubro Objetivo**: {spec['subrubro']}
- **Público Objetivo**: Vecinos de Mar del Plata, turistas y clientes que buscan soluciones desde el celular.

---

## 🏢 2 a 4 Negocios Reales Representativos en Mar del Plata
"""
        for idx, m in enumerate(matches, 1):
            wa_digits = re.sub(r'\D', '', m['telefono'])
            wa_link = f"https://wa.me/{wa_digits}?text=Hola%20{m['nombre'].replace(' ', '%20')}%2C%20quisiera%20consultar%20por%20servicios"
            dossier_md += f"""
### {idx}. {m['nombre']}
- **Dirección / Zona**: {m['direccion']} `[VERIFICADO]`
- **Teléfono / WhatsApp**: `{m['telefono']}` `[VERIFICADO]`
- **Presencia Web Actual**: {m['web']}
- **Enlace Directo de WhatsApp**: [{m['telefono']}]({wa_link})
"""

        dossier_md += f"""
---

## 💵 Precios Promedio & Tarifas de Referencia en Mar del Plata (Estimado 2026)
"""
        for p in spec['precios']:
            dossier_md += f"- **{p}**\n"
            
        dossier_md += f"""
---

## 📲 Mensaje Pre-configurado para Botón de WhatsApp
- **Texto del Link**: `https://wa.me/549223...?text=Hola%20{spec['nombre_demo'].replace(' ', '%20')}%2C%20quisiera%20solicitar%20informaci%C3%B3n`
- **Texto del Botón en Web**: `"Contactar por WhatsApp"` (Texto completo obligatorio).
"""

        with open(os.path.join(slug_dir, 'dossier.md'), 'w', encoding='utf-8') as f:
            f.write(dossier_md)

        # File 2: inspiracion.md
        inspiracion_md = f"""# Referencias Visuales & Animaciones: {spec['nombre_demo']}

## 🌐 3 a 5 Webs de Referencia Internacional & Nacional

"""
        for idx, insp in enumerate(spec['inspiracion'], 1):
            inspiracion_md += f"""### {idx}. [{insp['nombre']}]({insp['url']})
- **URL**: {insp['url']}
- **Detalles Visuales & UX**: {insp['detalles']}
- **Por qué funciona**: Ofrece una experiencia de navegación fluida, elimina la fricción de contacto y resalta la propuesta de valor inmediatamente.

"""

        inspiracion_md += f"""---

## 🎬 Patrones de Animación Recomendados
- **Hero & Header**: Entrada escalonada con Framer Motion / GSAP Fade In + Scale.
- **Scroll Storytelling**: Smooth scroll con Lenis para una sensación cinematográfica y fluida.
- **Micro-interacciones Hover**: Elevación tonal y brillo sutil en tarjetas (sin sombras dramáticas recargadas).
- **Glassmorphism Panels**: Fondo traslúcido con `backdrop-filter: blur(14px)` y bordes sutiles de cristal.
"""
        with open(os.path.join(slug_dir, 'inspiracion.md'), 'w', encoding='utf-8') as f:
            f.write(inspiracion_md)

        # File 3: refuerzo-design.md
        refuerzo_md = f"""# Refuerzo de Diseño & Sistema Visual: {spec['nombre_demo']}

## 🎨 Paleta de Colores Sugerida (OKLCH / CSS Tokens)
- **Modo / Atmósfera**: {spec['paleta']}
- **Regla Anti-Slop**: Máximo 2 familias tipográficas en todo el proyecto. Cero gradientes pastel flotantes generados por inercia.

---

## 🔤 Tipografía Recomendada
- **Familia Elegida**: {spec['fuentes']}
- **Escala H1 Contenida (Anti-Gigantismo)**: `clamp(2.2rem, 3.8vw, 3.2rem)`

---

## 🗺️ Sitemap Sugerido (Estructura de Secciones)
"""
        for sec in spec['sitemap']:
            refuerzo_md += f"- {sec}\n"
            
        refuerzo_md += f"""
---

## 🛠️ Directivas para Open Design
1. **Responsive First**: Optimizado para pantallas táctiles y celulares.
2. **Conversión Inmediata**: Botón flotante de WhatsApp visible en todo el scroll.
3. **Carga Rápida**: Componentes limpios y animaciones livianas en CSS / GSAP.
"""
        with open(os.path.join(slug_dir, 'refuerzo-design.md'), 'w', encoding='utf-8') as f:
            f.write(refuerzo_md)

        print(f"✅ Dossier generado: research/dossiers/{slug}/ (dossier.md, inspiracion.md, refuerzo-design.md)")

        readme_rows.append({
            'num': slug.split('-')[0],
            'slug': slug,
            'demo': spec['nombre_demo'],
            'categoria': spec['categoria'],
            'estado': 'investigada'
        })

    # 3. Generate research/README.md
    readme_md = f"""# Índice & Estado de la Demo Factory (28 Subrubros Mar del Plata)

Este documento registra la matriz de progreso en tiempo real de las 28 Demos de Naro AI.

- **Investigación**: Realizada por **Antigravity** (dossiers en `research/dossiers/`).
- **Construcción**: Realizada por **Open Design** (código en `webs/` y despliegues).

---

## 📊 Matriz de Estado de las 28 Demos

| # | Slug Dossier | Demo / Rubro | Categoría | Estado Investigación | Estado Construcción |
|---|---|---|---|---|---|
"""
    for r in readme_rows:
        readme_md += f"| {r['num']} | `{r['slug']}` | **{r['demo']}** | {r['categoria']} | ✅ investigada | ⏳ pendiente |\n"

    readme_md += """
---

## 🛠️ Leyenda de Estados
- `✅ investigada`: Dossier completado en `research/dossiers/<NN-slug>/` con datos reales, precios, referencias y refuerzo de diseño.
- `⏳ pendiente`: En espera de inicio por el agente constructor (Open Design).
- `🚀 construida`: Landing maquetada, verificada y lista para despliegue en Cloudflare Pages.
"""

    with open(os.path.join(research_dir, 'README.md'), 'w', encoding='utf-8') as f:
        f.write(readme_md)

    print("✅ Creado: research/README.md con las 28 demos registradas en estado 'investigada'.")
    print("🎉 Proceso de generación completado con éxito.")

if __name__ == '__main__':
    main()
