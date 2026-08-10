import os
import sys
import json
import argparse
import re
import urllib.parse

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

CATALOG_PATH = r'C:\Users\rodri\Desktop\AI\Projects\mdp-negocios-web\data\leads_catalog.json'
TEMPLATES_PATH = r'C:\Users\rodri\Desktop\AI\Projects\mdp-negocios-web\templates\rubro_templates.json'
OUTPUT_DIR = r'C:\Users\rodri\Desktop\AI\Projects\mdp-negocios-web\previews'

def load_data():
    if not os.path.exists(CATALOG_PATH):
        raise FileNotFoundError(f"No se encontró el catálogo en {CATALOG_PATH}. Ejecutá primero build_lead_catalog.py")
    if not os.path.exists(TEMPLATES_PATH):
        raise FileNotFoundError(f"No se encontró el archivo de templates en {TEMPLATES_PATH}")
    
    with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
        catalog = json.load(f)
    with open(TEMPLATES_PATH, 'r', encoding='utf-8') as f:
        templates = json.load(f)
        
    return catalog, templates

def find_lead(catalog, query):
    by_id = catalog.get("by_id", {})
    if query in by_id:
        return by_id[query]
    
    query_clean = query.lower().strip()
    matches = [lead for lead in by_id.values() if query_clean in lead["nombre"].lower()]
            
    if len(matches) >= 1:
        return matches[0]
        
    return None

def get_rubro_spec(templates, sector):
    for rubro_key, spec in templates.items():
        if rubro_key.lower() in sector.lower() or sector.lower() in rubro_key.lower():
            return spec
    return templates.get("Comercio General & Minorista", list(templates.values())[0])

def generate_local_html(lead, spec):
    wa_num = str(lead.get("whatsapp") or lead.get("telefono") or "5492230000000").replace(".0", "").replace(" ", "").replace("-", "")
    wa_message = f"Hola {lead['nombre']}, vi su sitio web y quisiera realizar una consulta."
    wa_link = lead.get("link_whatsapp_outreach") or f"https://wa.me/{wa_num}?text={urllib.parse.quote(wa_message)}"
    
    colors = spec['color_palette']
    nombre = lead['nombre']
    rubro = lead['sector']
    subrubro = lead['subrubro']
    direccion = lead.get('direccion') or 'Mar del Plata, Buenos Aires'
    telefono = lead.get('telefono') or 'Consultar por WhatsApp'
    pitch_sugerido = lead.get('servicio_pitch_sugerido') or 'Soluciones de atención y agendamiento inteligente 24/7'
    pitch_gestion = lead.get('pitch_gestion_comercial') or 'Software de gestión comercial y control de caja'
    maps_url = lead.get('url_google_maps') or 'https://maps.google.com'
    
    html_code = f"""<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{nombre} | {subrubro} en Mar del Plata</title>
    <meta name="description" content="{nombre} - {subrubro} en Mar del Plata. {pitch_sugerido}. Atención directa por WhatsApp las 24hs.">
    
    <!-- OpenGraph / Social Meta Tags -->
    <meta property="og:title" content="{nombre} | {subrubro} Mar del Plata">
    <meta property="og:description" content="{pitch_sugerido}">
    <meta property="og:type" content="website">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
    
    <!-- FontAwesome 6 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <!-- Lenis Smooth Scroll -->
    <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.39/dist/lenis.min.js"></script>

    <style>
        :root {{
            --primary: {colors['primary']};
            --secondary: {colors['secondary']};
            --accent: {colors['accent']};
            --bg-dark: {colors['dark_bg']};
            --surface: {colors['surface']};
            --surface-hover: rgba(255, 255, 255, 0.08);
            --text-main: {colors['text']};
            --text-muted: #94a3b8;
            --border: rgba(255, 255, 255, 0.12);
            --glass-glow: rgba(14, 116, 144, 0.25);
        }}

        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        html {{
            font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-main);
            overflow-x: hidden;
            scroll-behavior: smooth;
        }}

        h1, h2, h3, h4, .font-heading {{
            font-family: 'Outfit', sans-serif;
        }}

        /* Ambient Kinetic Background */
        .ambient-glow {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 0;
            background: 
                radial-gradient(circle at 15% 20%, rgba(14, 116, 144, 0.15) 0%, transparent 45%),
                radial-gradient(circle at 85% 75%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 60%);
        }}

        /* Navigation Header */
        header {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border);
            padding: 1.1rem 6%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
        }}

        .brand-logo {{
            font-size: 1.4rem;
            font-weight: 800;
            color: #fff;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 12px;
            letter-spacing: -0.01em;
        }}

        .brand-logo i {{
            color: var(--secondary);
            font-size: 1.5rem;
        }}

        nav {{
            display: flex;
            gap: 2.2rem;
            align-items: center;
        }}

        nav a {{
            color: var(--text-muted);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            transition: color 0.25s ease;
        }}

        nav a:hover {{
            color: var(--text-main);
        }}

        .nav-cta {{
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: #fff;
            padding: 0.75rem 1.6rem;
            border-radius: 99px;
            text-decoration: none;
            font-weight: 700;
            font-size: 0.9rem;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 10px 25px -5px var(--glass-glow);
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }}

        .nav-cta:hover {{
            transform: translateY(-2px);
            box-shadow: 0 15px 35px -5px var(--glass-glow);
        }}

        /* Hero Section */
        .hero {{
            position: relative;
            z-index: 1;
            padding: 180px 6% 120px;
            min-height: 92vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 4rem;
        }}

        .hero-left {{
            max-width: 660px;
        }}

        .tag-badge {{
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border);
            padding: 0.45rem 1.2rem;
            border-radius: 99px;
            font-size: 0.85rem;
            color: var(--secondary);
            font-weight: 600;
            margin-bottom: 1.8rem;
        }}

        .hero h1 {{
            font-size: clamp(2.3rem, 4.2vw, 3.6rem);
            font-weight: 800;
            line-height: 1.12;
            margin-bottom: 1.6rem;
            letter-spacing: -0.02em;
        }}

        .hero h1 span {{
            background: linear-gradient(135deg, #ffffff, var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }}

        .hero-desc {{
            font-size: 1.15rem;
            color: var(--text-muted);
            margin-bottom: 2.5rem;
            line-height: 1.65;
        }}

        .hero-actions {{
            display: flex;
            gap: 1.2rem;
            align-items: center;
            flex-wrap: wrap;
        }}

        .btn-secondary {{
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border);
            color: var(--text-main);
            padding: 0.9rem 1.8rem;
            border-radius: 99px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
        }}

        .btn-secondary:hover {{
            background: var(--surface-hover);
            border-color: var(--secondary);
        }}

        /* Hero Right Card */
        .hero-card {{
            background: var(--surface);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid var(--border);
            border-radius: 28px;
            padding: 2.8rem;
            width: 100%;
            max-width: 460px;
            box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6);
            position: relative;
        }}

        .card-header-badge {{
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 1.5rem;
        }}

        .card-header-badge i {{
            font-size: 1.8rem;
            color: var(--secondary);
        }}

        .card-header-badge h3 {{
            font-size: 1.4rem;
            font-weight: 700;
        }}

        .info-item {{
            display: flex;
            align-items: flex-start;
            gap: 14px;
            padding: 0.9rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }}

        .info-item:last-child {{
            border-bottom: none;
        }}

        .info-item i {{
            color: var(--secondary);
            font-size: 1.1rem;
            margin-top: 4px;
        }}

        .info-item div strong {{
            display: block;
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-bottom: 2px;
        }}

        .info-item div span {{
            font-size: 0.95rem;
            color: var(--text-main);
            font-weight: 500;
        }}

        /* Canonical Sections */
        .section {{
            position: relative;
            z-index: 1;
            padding: 110px 6%;
        }}

        .section-header {{
            text-align: center;
            max-width: 720px;
            margin: 0 auto 4.5rem;
        }}

        .section-header h2 {{
            font-size: 2.3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            letter-spacing: -0.01em;
        }}

        .section-header p {{
            color: var(--text-muted);
            font-size: 1.05rem;
        }}

        .grid-3 {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2.2rem;
        }}

        .feature-card {{
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border);
            border-radius: 24px;
            padding: 2.4rem;
            transition: all 0.35s ease;
            position: relative;
            overflow: hidden;
        }}

        .feature-card:hover {{
            transform: translateY(-6px);
            border-color: var(--secondary);
            background: rgba(255, 255, 255, 0.05);
            box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
        }}

        .feature-icon {{
            width: 56px;
            height: 56px;
            border-radius: 16px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: #fff;
            margin-bottom: 1.6rem;
            box-shadow: 0 10px 20px -5px var(--glass-glow);
        }}

        .feature-card h3 {{
            font-size: 1.3rem;
            margin-bottom: 0.9rem;
            font-weight: 700;
        }}

        .feature-card p {{
            color: var(--text-muted);
            font-size: 0.95rem;
            line-height: 1.6;
        }}

        /* Interactive Scheduler / Calculator Card */
        .interactive-box {{
            background: var(--surface);
            backdrop-filter: blur(24px);
            border: 1px solid var(--border);
            border-radius: 32px;
            padding: 3.5rem 6%;
            max-width: 900px;
            margin: 0 auto;
            box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.5);
        }}

        .form-grid {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-top: 2rem;
        }}

        .form-group label {{
            display: block;
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-bottom: 0.5rem;
            font-weight: 600;
        }}

        .form-group input, .form-group select {{
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border);
            padding: 0.9rem 1.2rem;
            border-radius: 14px;
            color: #fff;
            font-size: 0.95rem;
            outline: none;
            transition: border-color 0.3s ease;
        }}

        .form-group input:focus, .form-group select:focus {{
            border-color: var(--secondary);
        }}

        /* WhatsApp Floating Button */
        .wa-floating-btn {{
            position: fixed;
            bottom: 32px;
            right: 32px;
            width: 66px;
            height: 66px;
            background: #25d366;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 34px;
            box-shadow: 0 12px 30px rgba(37, 211, 102, 0.5);
            text-decoration: none;
            z-index: 9999;
            transition: transform 0.3s ease;
            animation: pulseWave 2.2s infinite;
        }}

        .wa-floating-btn:hover {{
            transform: scale(1.12);
        }}

        @keyframes pulseWave {{
            0% {{ box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }}
            70% {{ box-shadow: 0 0 0 18px rgba(37, 211, 102, 0); }}
            100% {{ box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }}
        }}

        /* Reveal on Scroll Animations */
        .reveal {{
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }}

        .reveal.active {{
            opacity: 1;
            transform: translateY(0);
        }}

        footer {{
            position: relative;
            z-index: 1;
            border-top: 1px solid var(--border);
            padding: 3.5rem 6%;
            text-align: center;
            color: var(--text-muted);
            font-size: 0.95rem;
            background: rgba(15, 23, 42, 0.9);
        }}

        @media (max-width: 900px) {{
            .hero {{
                flex-direction: column;
                padding-top: 140px;
            }}
            .form-grid {{
                grid-template-columns: 1fr;
            }}
            nav {{
                display: none;
            }}
        }}
    </style>
</head>
<body>

    <div class="ambient-glow"></div>

    <!-- Header Navigation -->
    <header>
        <a href="#" class="brand-logo">
            <i class="fa-solid fa-gem"></i> {nombre}
        </a>
        <nav>
            <a href="#servicios">Servicios</a>
            <a href="#beneficios">Por Qué Elegirnos</a>
            <a href="#agendamiento">Agendar Turno</a>
            <a href="#ubicacion">Ubicación</a>
        </nav>
        <a href="{wa_link}" target="_blank" class="nav-cta">
            <i class="fa-brands fa-whatsapp"></i> Contactar por WhatsApp
        </a>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-left reveal">
            <div class="tag-badge">
                <i class="fa-solid fa-location-dot"></i> Mar del Plata • {subrubro}
            </div>
            <h1>Excelencia y Atención Profesional en <span>{nombre}</span></h1>
            <p class="hero-desc">{pitch_sugerido}. Brindamos atención personalizada en Mar del Plata con respuesta inmediata y agendamiento 24/7 por WhatsApp.</p>
            
            <div class="hero-actions">
                <a href="{wa_link}" target="_blank" class="nav-cta" style="padding: 1rem 2.2rem; font-size: 1rem;">
                    <i class="fa-brands fa-whatsapp"></i> Consultar Ahora por WhatsApp
                </a>
                <a href="#agendamiento" class="btn-secondary">
                    <i class="fa-solid fa-calendar-days"></i> Ver Agendador
                </a>
            </div>
        </div>

        <div class="hero-card reveal">
            <div class="card-header-badge">
                <i class="fa-solid fa-building-user"></i>
                <div>
                    <h3>Ficha del Comercio</h3>
                    <p style="font-size: 0.85rem; color: var(--text-muted);">Información oficial verificada</p>
                </div>
            </div>

            <div class="info-item">
                <i class="fa-solid fa-location-dot"></i>
                <div>
                    <strong>DIRECCIÓN EN MAR DEL PLATA</strong>
                    <span>{direccion}</span>
                </div>
            </div>

            <div class="info-item">
                <i class="fa-solid fa-phone"></i>
                <div>
                    <strong>TELÉFONO DE CONTACTO</strong>
                    <span>{telefono}</span>
                </div>
            </div>

            <div class="info-item">
                <i class="fa-solid fa-clock"></i>
                <div>
                    <strong>HORARIOS DE ATENCIÓN</strong>
                    <span>Lunes a Sábado: 09:00 a 20:00 hs</span>
                </div>
            </div>

            <div class="info-item">
                <i class="fa-solid fa-shield-check" style="color: #10b981;"></i>
                <div>
                    <strong>ATENCIÓN AUTOMATIZADA 24/7</strong>
                    <span>Respuestas inmediatas sin esperas</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Servicios Canónicos -->
    <section id="servicios" class="section">
        <div class="section-header reveal">
            <h2>Nuestros Servicios Destacados</h2>
            <p>Soluciones diseñadas específicamente para el rubro {rubro} en Mar del Plata.</p>
        </div>

        <div class="grid-3">
            <div class="feature-card reveal">
                <div class="feature-icon"><i class="fa-solid fa-user-check"></i></div>
                <h3>Atención Personalizada</h3>
                <p>Atención directa por profesionales dedicados a brindarte la mejor experiencia técnica y humana.</p>
            </div>

            <div class="feature-card reveal">
                <div class="feature-icon"><i class="fa-solid fa-calendar-check"></i></div>
                <h3>Agendamiento Inteligente 24/7</h3>
                <p>Reservá tu turno o consulta en 1 clic directamente desde tu celular en cualquier momento del día.</p>
            </div>

            <div class="feature-card reveal">
                <div class="feature-icon"><i class="fa-solid fa-star"></i></div>
                <h3>Garantía de Calidad</h3>
                <p>Respaldados por clientes satisfechos en Mar del Plata con los más altos estándares de servicio.</p>
            </div>
        </div>
    </section>

    <!-- Por Qué Elegirnos -->
    <section id="beneficios" class="section" style="background: rgba(255,255,255,0.01);">
        <div class="section-header reveal">
            <h2>¿Por Qué Elegir {nombre}?</h2>
            <p>Cuatro razones clave que nos diferencian en Mar del Plata.</p>
        </div>

        <div class="grid-3">
            <div class="feature-card reveal">
                <div class="feature-icon" style="background: linear-gradient(135deg, #10b981, #059669);"><i class="fa-solid fa-bolt"></i></div>
                <h3>Inmediatez Absoluta</h3>
                <p>Sin demoras al teléfono. Consultá disponibilidades y tarifas al instante por WhatsApp.</p>
            </div>

            <div class="feature-card reveal">
                <div class="feature-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706);"><i class="fa-solid fa-location-crosshairs"></i></div>
                <h3>Ubicación Estratégica</h3>
                <p>Encontranos fácilmente en {direccion} con estacionamiento y fácil acceso.</p>
            </div>

            <div class="feature-card reveal">
                <div class="feature-icon" style="background: linear-gradient(135deg, #6366f1, #4f46e5);"><i class="fa-solid fa-thumbs-up"></i></div>
                <h3>Servicio Garantizado</h3>
                <p>{pitch_gestion}. Calidad técnica probada para resolver tus necesidades.</p>
            </div>
        </div>
    </section>

    <!-- Agendador Interactivo -->
    <section id="agendamiento" class="section">
        <div class="interactive-box reveal">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2><i class="fa-brands fa-whatsapp" style="color: #25d366;"></i> Agendá tu Turno o Consulta por WhatsApp</h2>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Completá los datos y enviá tu mensaje directo en 1 clic.</p>
            </div>

            <form onsubmit="sendWhatsApp(event)">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Tu Nombre</label>
                        <input type="text" id="clientName" placeholder="Ej: María González" required>
                    </div>
                    <div class="form-group">
                        <label>Servicio o Consulta</label>
                        <input type="text" id="serviceType" placeholder="Ej: Consulta de turno / Presupuesto" required>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 2.2rem;">
                    <button type="submit" class="nav-cta" style="border: none; cursor: pointer; padding: 1.1rem 2.8rem; font-size: 1.05rem;">
                        <i class="fa-brands fa-whatsapp"></i> Enviar Consulta a {nombre}
                    </button>
                </div>
            </form>
        </div>
    </section>

    <!-- Ubicación y Mapa -->
    <section id="ubicacion" class="section">
        <div class="section-header reveal">
            <h2>Ubicación en Mar del Plata</h2>
            <p>{direccion}</p>
        </div>

        <div style="text-align: center;" class="reveal">
            <a href="{maps_url}" target="_blank" class="btn-secondary" style="padding: 1.1rem 2.5rem; font-size: 1rem;">
                <i class="fa-solid fa-map-location-dot"></i> Abrir en Google Maps
            </a>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; <script>document.write(new Date().getFullYear())</script> {nombre}. Todos los derechos reservados. Mar del Plata, Argentina.</p>
    </footer>

    <!-- WhatsApp Floating Button -->
    <a href="{wa_link}" class="wa-floating-btn" target="_blank" title="Contactar por WhatsApp">
        <i class="fa-brands fa-whatsapp"></i>
    </a>

    <!-- Scripts -->
    <script>
        // Lenis Smooth Scroll Initialization
        const lenis = new Lenis({{ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }});
        function raf(time) {{
            lenis.raf(time);
            requestAnimationFrame(raf);
        }}
        requestAnimationFrame(raf);

        // IntersectionObserver Reveal Animation
        const observer = new IntersectionObserver((entries) => {{
            entries.forEach(entry => {{
                if (entry.isIntersecting) {{
                    entry.target.classList.add('active');
                }}
            }});
        }}, {{ threshold: 0.15 }});

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // WhatsApp Form Handler
        function sendWhatsApp(e) {{
            e.preventDefault();
            const name = document.getElementById('clientName').value;
            const service = document.getElementById('serviceType').value;
            const text = `Hola {nombre}, mi nombre es ${{name}} y quisiera consultar por ${{service}}.`;
            const url = `https://wa.me/{wa_num}?text=${{encodeURIComponent(text)}}`;
            window.open(url, '_blank');
        }}
    </script>
</body>
</html>"""
    return html_code

def main():
    parser = argparse.ArgumentParser(description="Motor de Generación de Landings para Leads MDP")
    parser.add_argument("--lead", type=str, help="ID o Nombre del lead")
    parser.add_argument("--prompt", action="store_true", help="Imprime el prompt formateado para OpenCode")
    parser.add_argument("--html", action="store_true", help="Genera el archivo HTML preview")
    
    args = parser.parse_args()
    catalog, templates = load_data()
    
    if not args.lead:
        print("Debes especificar un lead con --lead <ID o Nombre>.")
        return

    lead = find_lead(catalog, args.lead)
    if not lead:
        print(f"❌ No se encontró ningún lead coincidente con '{args.lead}'")
        return
        
    spec = get_rubro_spec(templates, lead["sector"])
    print(f"✅ Lead Seleccionado: [{lead.get('id')}] {lead['nombre']} ({lead['sector']} | {lead['subrubro']})")
    
    if args.html:
        os.makedirs(OUTPUT_DIR, exist_ok=True)
        slug = re.sub(r'[^a-zA-Z0-9]', '_', lead['nombre'].lower())
        file_path = os.path.join(OUTPUT_DIR, f"preview_{slug}.html")
        
        html_content = generate_local_html(lead, spec)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
            
        print(f"\n🎉 Preview de Calidad Generado: {file_path} ({len(html_content)/1024:.1f} KB)")

if __name__ == "__main__":
    main()
