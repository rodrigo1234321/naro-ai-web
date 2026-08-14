import os
import shutil
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DEMOS = r"C:\Users\rodri\Desktop\AI\Projects\conectar clientes\demos"
DEST_PUBLIC = os.path.join(ROOT, "public")

if not os.path.exists(SRC_DEMOS):
    raise FileNotFoundError(f"No se encontró la carpeta origen de demos en: {SRC_DEMOS}")

rubros_info = [
    {
        'id': '01-clinica-medica',
        'clean_slug': 'clinica-medica',
        'titulo': '01. Clínica & Consultorios Médicos',
        'categoria': 'salud',
        'categoria_label': 'Salud & Medicina',
        'desc': 'Staff de especialistas por cartilla, selector de turnos online y cobertura de obras sociales.',
        'color': '#0284c7',
        'icon': 'fa-user-doctor',
        'tags': ['Cartilla Médica', 'Turnos Online', 'Obras Sociales']
    },
    {
        'id': '02-odontologia',
        'clean_slug': 'odontologia',
        'titulo': '02. Odontología & Estética Dental',
        'categoria': 'salud',
        'categoria_label': 'Salud & Medicina',
        'desc': 'Comparador interactivo Antes/Después de blanqueamiento e implantes y turnero de guardia.',
        'color': '#0ea5e9',
        'icon': 'fa-tooth',
        'tags': ['Antes / Después', 'Implantes', 'Guardia Dental']
    },
    {
        'id': '03-estetica-belleza',
        'clean_slug': 'estetica-belleza',
        'titulo': '03. Estética, Spa & Belleza',
        'categoria': 'estetica',
        'categoria_label': 'Estética & Spa',
        'desc': 'Packs de spa (Faciales, Láser, Masajes), cálculo en 3 y 6 cuotas y gift cards de regalo.',
        'color': '#ec4899',
        'icon': 'fa-spa',
        'tags': ['Packs de Spa', 'Depilación Láser', 'Cuotas']
    },
    {
        'id': '04-kinesiologia',
        'clean_slug': 'kinesiologia',
        'titulo': '04. Kinesiología & Fisioterapia',
        'categoria': 'salud',
        'categoria_label': 'Salud & Medicina',
        'desc': 'Test interactivo de síntoma doloroso y solicitud de turno para RPG, fisioterapia y readaptación.',
        'color': '#059669',
        'icon': 'fa-bone',
        'tags': ['Test de Síntomas', 'Rehabilitación', 'RPG']
    },
    {
        'id': '05-restaurante',
        'clean_slug': 'restaurante',
        'titulo': '05. Restaurante Gourmet & Fuegos',
        'categoria': 'gastronomia',
        'categoria_label': 'Gastronomía & Bares',
        'desc': 'Reservas de mesa con mapa de sectores (Salón, Cava VIP, Patio de Fuegos) y maridaje de autor.',
        'color': '#ea580c',
        'icon': 'fa-utensils',
        'tags': ['Mapa de Sectores', 'Cava VIP', 'Menú Degustación']
    },
    {
        'id': '06-cafeteria',
        'clean_slug': 'cafeteria',
        'titulo': '06. Cafetería de Especialidad',
        'categoria': 'gastronomia',
        'categoria_label': 'Gastronomía & Bares',
        'desc': 'Carta sensorial con perfiles de notas de cata, tuestes de origen y fotos de café en alta definición.',
        'color': '#c2410c',
        'icon': 'fa-mug-hot',
        'tags': ['Notas de Cata', 'Café de Origen', 'Brunch']
    },
    {
        'id': '07-viandas-saludables',
        'clean_slug': 'viandas-saludables',
        'titulo': '07. Viandas Saludables & Meal Prep',
        'categoria': 'gastronomia',
        'categoria_label': 'Gastronomía & Bares',
        'desc': 'Planificador semanal de viandas (5, 10, 14 packs) con desglose de macros (Kcal, Proteínas).',
        'color': '#16a34a',
        'icon': 'fa-bowl-food',
        'tags': ['Packs Semanales', 'Macros Kcal/Prot', 'Sin TACC/Keto']
    },
    {
        'id': '08-rotiseria-delivery',
        'clean_slug': 'rotiseria-delivery',
        'titulo': '08. Rotisería & Minutas Delivery',
        'categoria': 'gastronomia',
        'categoria_label': 'Gastronomía & Bares',
        'desc': 'Carrusel horizontal scrollytelling con minutas y carrito lateral con comanda directa a cocina.',
        'color': '#b91c1c',
        'icon': 'fa-drumstick-bite',
        'tags': ['Delivery Rápido', 'Minutas XL', 'Comanda WhatsApp']
    },
    {
        'id': '09-cerveceria-bar',
        'clean_slug': 'cerveceria-bar',
        'titulo': '09. Bar de Especialidad & Cervecería (Dual)',
        'categoria': 'gastronomia',
        'categoria_label': 'Gastronomía & Bares',
        'desc': 'Dos versiones: Speakeasy Coctelería de Autor (index.html) y Taproom 16 Canillas (cerveceria.html).',
        'color': '#8b5cf6',
        'icon': 'fa-martini-glass',
        'dual': True,
        'dual_links': [
            {'name': '🍸 Speakeasy Cócteles', 'url': '/09-cerveceria-bar/'},
            {'name': '🍺 Taproom 16 Canillas', 'url': '/09-cerveceria-bar/cerveceria.html'}
        ],
        'tags': ['Speakeasy', '16 Canillas', 'Happy Hour Timer']
    },
    {
        'id': '10-showroom-indumentaria',
        'clean_slug': 'showroom-indumentaria',
        'titulo': '10. Showroom e Indumentaria (Dual)',
        'categoria': 'moda',
        'categoria_label': 'Moda & Showroom',
        'desc': 'Dos versiones: DYNASTY Streetwear (index.html) y AURELIA Alta Costura Femenina (boutique.html).',
        'color': '#bef264',
        'icon': 'fa-shirt',
        'dual': True,
        'dual_links': [
            {'name': '⚡ Dynasty Streetwear', 'url': '/10-showroom-indumentaria/'},
            {'name': '🌸 Aurelia Boutique', 'url': '/10-showroom-indumentaria/boutique.html'}
        ],
        'tags': ['Talles en Vivo', '15% OFF Transferencia', 'Envío Gratis >$120k']
    },
    {
        'id': '11-inmobiliaria',
        'clean_slug': 'inmobiliaria',
        'titulo': '11. Inmobiliaria & Bienes Raíces',
        'categoria': 'servicios',
        'categoria_label': 'Servicios & Inmuebles',
        'desc': 'Dock de búsqueda rápida, fichas técnicas (m², suites, cocheras), tasador online y agendador de visitas.',
        'color': '#d97706',
        'icon': 'fa-building',
        'tags': ['Buscador Inmobiliario', 'Fichas m²', 'Tasación Online']
    },
    {
        'id': '12-regaleria',
        'clean_slug': 'regaleria',
        'titulo': '12. Regalería & Deco Hogar',
        'categoria': 'moda',
        'categoria_label': 'Moda & Showroom',
        'desc': 'Armador interactivo de Gift Box con dedicatoria caligrafiada para la tarjeta y packaging de regalo.',
        'color': '#c2785c',
        'icon': 'fa-gift',
        'tags': ['Armá tu Gift Box', 'Tarjeta Caligrafiada', 'Velas de Soja']
    },
    {
        'id': '13-imprenta-grafica',
        'clean_slug': 'imprenta-grafica',
        'titulo': '13. Imprenta & Gráfica Digital',
        'categoria': 'b2b',
        'categoria_label': 'Empresarial & B2B',
        'desc': 'Cotizador técnico en vivo por volumen, packaging microcorrugado, laca UV y checklist Pre-Flight.',
        'color': '#2563eb',
        'icon': 'fa-print',
        'tags': ['Cotizador en Vivo', 'Descuento por Volumen', 'Pre-Flight 300DPI']
    },
    {
        'id': '14-distribuidora-mayorista',
        'clean_slug': 'distribuidora-mayorista',
        'titulo': '14. Distribuidora Mayorista B2B',
        'categoria': 'b2b',
        'categoria_label': 'Empresarial & B2B',
        'desc': 'Portal B2B con súper combos, sellos AFIP/ARBA, medidor de mínimo ($180k) y lista de precios Excel.',
        'color': '#f59e0b',
        'icon': 'fa-truck-ramp-box',
        'tags': ['Súper Combos -25%', 'Mínimo Mayorista', 'Factura A y B']
    },
    {
        'id': '15-petshop-veterinaria',
        'clean_slug': 'petshop-veterinaria',
        'titulo': '15. Pet Shop & Veterinaria',
        'categoria': 'servicios',
        'categoria_label': 'Servicios & Inmuebles',
        'desc': 'Calculador de ración diaria por peso, agendador de turnos para spa canino y envío gratis en el día.',
        'color': '#059669',
        'icon': 'fa-paw',
        'tags': ['Calculador Ración g/día', 'Spa Canino', 'Delivery Gratis']
    }
]

def sync_demos():
    for r in rubros_info:
        src = os.path.join(SRC_DEMOS, r['id'])
        dest_num = os.path.join(DEST_PUBLIC, r['id'])
        dest_clean = os.path.join(DEST_PUBLIC, r['clean_slug'])

        if os.path.exists(dest_num):
            shutil.rmtree(dest_num)
        if os.path.exists(dest_clean):
            shutil.rmtree(dest_clean)

        shutil.copytree(src, dest_num)
        shutil.copytree(src, dest_clean)
        print(f"✓ Sincronizado {r['id']} -> public/{r['id']} y public/{r['clean_slug']}")

    index_json_data = {
        'generated_at': '2026-08-14T02:45:00.000Z',
        'total': len(rubros_info),
        'project': 'mis-clientes-html',
        'base_url': 'https://mis-clientes-html.pages.dev',
        'rubros': rubros_info
    }

    with open(os.path.join(DEST_PUBLIC, 'index.json'), 'w', encoding='utf-8') as f:
        json.dump(index_json_data, f, indent=2, ensure_ascii=False)
    print("✓ public/index.json actualizado con los 15 rubros.")

if __name__ == '__main__':
    sync_demos()
