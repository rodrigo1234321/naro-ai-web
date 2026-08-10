import os
import sys
import json
import subprocess
import argparse
import re
import time

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

CATALOG_PATH = r'C:\Users\rodri\Desktop\AI\Projects\mdp-negocios-web\data\leads_catalog.json'
PREVIEWS_DIR = r'C:\Users\rodri\Desktop\AI\Projects\mdp-negocios-web\previews_opencode'

def sanitize_filename(name):
    clean = re.sub(r'[\\/*?:"<>|]', "", str(name))
    clean = re.sub(r'\s+', '_', clean.strip())
    return clean[:80]

def build_deepseek_prompt(lead):
    wa_num = str(lead.get("whatsapp") or lead.get("telefono") or "5492230000000").replace(".0", "").replace(" ", "").replace("-", "")
    wa_link = lead.get("link_whatsapp_outreach") or f"https://wa.me/{wa_num}"
    
    prompt = f"""Activa obligatoriamente el skill landing-page-studio. Lee SKILL.md, BEST-CASES.md y TOOLBOX.md en ~/.agents/skills/landing-page-studio/.

Sigue la Fase 0 (Investigación del negocio) y construye una Landing Page HTML de Nivel Elite (35KB - 70KB de código real, sin escatimar calidad ni secciones) en un archivo index.html en el directorio actual para el siguiente prospecto:

DATOS DEL CLIENTE:
- Nombre Comercial: {lead['nombre']}
- ID Lead: {lead.get('id', 'N/A')}
- Rubro: {lead['sector']}
- Subrubro: {lead['subrubro']}
- Dirección: {lead.get('direccion') or 'Mar del Plata, Buenos Aires'}
- Teléfono: {lead.get('telefono') or 'Consultar por WhatsApp'}
- WhatsApp Directo: {wa_num}
- Link WhatsApp Outreach: {wa_link}
- Servicio Pitch Sugerido: {lead.get('servicio_pitch_sugerido') or 'Página Web Profesional + Agendamiento por WhatsApp'}
- Pitch Gestión Comercial: {lead.get('pitch_gestion_comercial') or 'Software de Gestión Comercial y Control de Caja'}
- Ubicación Google Maps: {lead.get('url_google_maps') or 'Mar del Plata'}

INNEGOCIABLES DE CÓDIGO:
1. Usar Lenis Smooth Scroll + GSAP ScrollTrigger o IntersectionObserver nativo para revelado (.reveal en secciones).
2. OKLCH Color Harmony, Dark Mode refinado y Glassmorphism traslúcido (backdrop-filter blur).
3. Botón flotante pulsante de WhatsApp en la esquina inferior derecha apuntando a {wa_link}.
4. 10 Secciones Canónicas (Nav, Hero con CTA impactante, Especialidades/Servicios, Por qué elegirnos, Proceso de atención, Galería/Muestras, Testimonios, Cotizador/Agendador por WhatsApp, Mapa/Dirección y Footer dinámico).
5. Escribir el archivo index.html completo directamente en este directorio. Cero placeholders, datos reales de {lead['nombre']}.
"""
    return prompt

def process_lead_with_opencode(lead, target_dir):
    os.makedirs(target_dir, exist_ok=True)
    prompt = build_deepseek_prompt(lead)
    
    cmd = [
        "opencode", "run",
        "-m", "opencode/deepseek-v4-flash-free",
        "--variant", "max",
        "--auto",
        "--dir", target_dir,
        prompt
    ]
    
    print(f"\n🚀 Iniciando OpenCode (DeepSeek V4 Flash) para: [{lead.get('id')}] {lead['nombre']}")
    print(f"   📁 Directorio objetivo: {target_dir}")
    
    start = time.time()
    res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace', shell=True)
    elapsed = time.time() - start
    
    out_html = os.path.join(target_dir, "index.html")
    if os.path.exists(out_html):
        size_kb = os.path.getsize(out_html) / 1024
        print(f"   ✅ EXITO: HTML generado por DeepSeek V4 Flash -> {out_html} ({size_kb:.1f} KB) en {elapsed:.1f}s")
        return True, out_html, size_kb
    else:
        print(f"   ⚠️ WARNING: OpenCode finalizó en {elapsed:.1f}s pero index.html no fue creado. Logs:")
        print(res.stdout[:500] if res.stdout else res.stderr[:500])
        return False, None, 0

def run_opencode_batch(rubro_filter=None, subrubro_filter=None, lead_id=None, limit=None):
    with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
        catalog = json.load(f)
        
    by_id = catalog.get("by_id", {})
    by_rubro = catalog.get("by_rubro", {})
    
    # Target leads list
    targets = []
    
    if lead_id:
        if lead_id in by_id:
            targets.append(by_id[lead_id])
        else:
            # Search by name match
            for l in by_id.values():
                if lead_id.lower() in l['nombre'].lower():
                    targets.append(l)
    else:
        for rubro, subrubros in by_rubro.items():
            if rubro_filter and rubro_filter.lower() not in rubro.lower():
                continue
            for subrubro, leads in subrubros.items():
                if subrubro_filter and subrubro_filter.lower() not in subrubro.lower():
                    continue
                for lead in leads:
                    targets.append(lead)
                    if limit and len(targets) >= limit:
                        break
                if limit and len(targets) >= limit:
                    break
            if limit and len(targets) >= limit:
                break

    print(f"📊 Total de leads seleccionados para procesar con OpenCode (DeepSeek V4 Flash): {len(targets)}")
    
    successes = 0
    total_kb = 0
    
    for idx, lead in enumerate(targets, 1):
        rubro_folder = sanitize_filename(lead['sector'])
        sub_folder = sanitize_filename(lead['subrubro'])
        lead_folder = sanitize_filename(lead['nombre'])
        
        target_dir = os.path.join(PREVIEWS_DIR, rubro_folder, sub_folder, lead_folder)
        
        print(f"\n--- [{idx}/{len(targets)}] PROCESANDO LEAD CON DEEPSEEK V4 FLASH ---")
        ok, path, kb = process_lead_with_opencode(lead, target_dir)
        if ok:
            successes += 1
            total_kb += kb
            
    print(f"\n🎉 RESUMEN DE PROCESAMIENTO OPENCODE (DEEPSEEK V4 FLASH):")
    print(f"   • Exitosos: {successes} / {len(targets)}")
    if successes > 0:
        print(f"   • Tamaño promedio de HTML generado por DeepSeek: {total_kb/successes:.1f} KB")

def main():
    parser = argparse.ArgumentParser(description="Ejecutor Masivo de OpenCode + DeepSeek V4 Flash con landing-page-studio")
    parser.add_argument("--lead", type=str, help="ID o Nombre de un lead específico (Ej: LEAD-IA-1313 o 'Clínica Luro')")
    parser.add_argument("--rubro", type=str, help="Filtrar por rubro")
    parser.add_argument("--subrubro", type=str, help="Filtrar por subrubro (Ej: 'Cabañas', 'Odontología')")
    parser.add_argument("--limit", type=int, help="Límite máximo de leads a procesar")
    parser.add_argument("--all", action="store_true", help="Procesar todos los leads del catálogo")
    
    args = parser.parse_args()
    
    if not args.lead and not args.rubro and not args.subrubro and not args.all:
        print("Ejemplos de uso:")
        print(" 1. Generar 1 web con DeepSeek V4 Flash para Clínica Luro:")
        print("    python tools/opencode_deepseek_batch.py --lead LEAD-IA-1313")
        print(" 2. Generar 2 webs de Odontología con DeepSeek V4 Flash:")
        print("    python tools/opencode_deepseek_batch.py --subrubro 'Odontología' --limit 2")
        print(" 3. Dejar corriendo toda la noche procesando con DeepSeek V4 Flash:")
        print("    python tools/opencode_deepseek_batch.py --all")
        return
        
    run_opencode_batch(rubro_filter=args.rubro, subrubro_filter=args.subrubro, lead_id=args.lead, limit=args.limit)

if __name__ == "__main__":
    main()
