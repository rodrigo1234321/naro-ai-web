import os
import sys
import json
import argparse
import re
import time
from generate_lead_landing import load_data, get_rubro_spec, generate_local_html

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = r'C:\Users\rodri\Desktop\AI\Projects\mdp-negocios-web\previews'

def sanitize_filename(name):
    clean = re.sub(r'[\\/*?:"<>|]', "", str(name))
    clean = re.sub(r'\s+', '_', clean.strip())
    return clean[:80]

def run_batch(rubro_filter=None, subrubro_filter=None, limit=None, priority_only=False):
    catalog, templates = load_data()
    by_rubro = catalog.get("by_rubro", {})
    
    total_processed = 0
    start_time = time.time()
    
    for rubro, subrubros in by_rubro.items():
        if rubro_filter and rubro_filter.lower() not in rubro.lower():
            continue
            
        for subrubro, leads in subrubros.items():
            if subrubro_filter and subrubro_filter.lower() not in subrubro.lower():
                continue
                
            folder_name = f"{sanitize_filename(rubro)}___{sanitize_filename(subrubro)}"
            target_dir = os.path.join(OUTPUT_DIR, folder_name)
            os.makedirs(target_dir, exist_ok=True)
            spec = get_rubro_spec(templates, rubro)
            
            print(f"\n🚀 Procesando Subrubro: [{rubro} -> {subrubro}] ({len(leads)} leads) -> {target_dir}")
            
            sub_count = 0
            for lead in leads:
                if priority_only and "ALTA" not in str(lead.get("prioridad", "")).upper():
                    continue
                    
                if limit and sub_count >= limit:
                    break
                    
                lead_name = lead.get("nombre") or lead.get("id")
                file_slug = sanitize_filename(lead_name)
                file_path = os.path.join(target_dir, f"preview_{file_slug}.html")
                
                try:
                    html_content = generate_local_html(lead, spec)
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(html_content)
                    sub_count += 1
                    total_processed += 1
                except Exception as e:
                    print(f"  ❌ Error generando {lead_name}: {e}")
            
            print(f"  ✅ Completado [{subrubro}]: {sub_count} landings HTML generadas.")
            
    elapsed = time.time() - start_time
    print(f"\n🎉 PROCESO BATCH FINALIZADO:")
    print(f"   • Total Landings Generadas: {total_processed}")
    print(f"   • Tiempo Transcurrido: {elapsed:.2f} segundos ({total_processed/max(elapsed, 0.001):.1f} landings/seg)")

def main():
    parser = argparse.ArgumentParser(description="Batch Generator por Rubro y Subrubro para Prospección MDP")
    parser.add_argument("--rubro", type=str, help="Filtrar por rubro (Ej: 'Salud', 'Gastronomía', 'Turismo')")
    parser.add_argument("--subrubro", type=str, help="Filtrar por subrubro (Ej: 'Cabañas', 'Odontología', 'Cervecerías')")
    parser.add_argument("--limit", type=int, help="Límite máximo de landings a generar por subrubro (para pruebas)")
    parser.add_argument("--hot-only", action="store_true", help="Generar únicamente leads calientes (Prioridad ALTA)")
    parser.add_argument("--all", action="store_true", help="Generar TODAS las landings del Excel completo")
    
    args = parser.parse_args()
    
    if not args.rubro and not args.subrubro and not args.all and not args.limit:
        print("Ejemplos de uso por Subrubro:")
        print(" 1. Probar con 5 cabañas en Turismo:")
        print("    python tools/batch_generate_landings.py --subrubro 'Cabañas' --limit 5")
        print(" 2. Probar con 5 odontologías en Salud:")
        print("    python tools/batch_generate_landings.py --subrubro 'Odontología' --limit 5")
        return

    run_batch(rubro_filter=args.rubro, subrubro_filter=args.subrubro, limit=args.limit, priority_only=args.hot_only)

if __name__ == "__main__":
    main()
