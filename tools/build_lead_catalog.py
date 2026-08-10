import pandas as pd
import json
import os
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

EXCEL_PATH = r'C:\Users\rodri\Desktop\AI\Projects\mdp-negocios-web\data\PROSPECCION_MAR_DEL_PLATA_COMPLETA.xlsx'
OUTPUT_DIR = r'C:\Users\rodri\Desktop\AI\Projects\mdp-negocios-web\data'
CATALOG_FILE = os.path.join(OUTPUT_DIR, 'leads_catalog.json')

def clean_value(val):
    if pd.isna(val):
        return None
    val_str = str(val).strip()
    return val_str if val_str else None

def get_subrubro(sector, pitch_sugerido, nombre, pitch_gestion):
    pitch_combined = f"{pitch_sugerido or ''} {pitch_gestion or ''}".lower()
    nombre_lower = str(nombre).lower()
    
    if sector == "Salud y Estética":
        if any(w in pitch_combined or w in nombre_lower for w in ["dermatolog", "estetic", "belleza"]):
            return "Dermatología y Estética"
        elif any(w in pitch_combined or w in nombre_lower for w in ["odontolog", "dient", "dental"]):
            return "Odontología"
        elif any(w in pitch_combined or w in nombre_lower for w in ["sanatorio", "clinica", "hospital"]):
            return "Clínica Médica / Sanatorio"
        else:
            return "Consultorios y Salud Integral"

    elif sector in ["Turismo y Alojamiento", "Turismo y Hoteles"]:
        if any(w in pitch_combined or w in nombre_lower for w in ["cabaña", "cabanas"]):
            return "Cabañas y Complejos"
        elif any(w in pitch_combined or w in nombre_lower for w in ["hotel", "posada", "hostel"]):
            return "Hoteles y Posadas"
        else:
            return "Alojamiento Turístico"

    elif sector == "Inmobiliarias":
        if "alquiler" in pitch_combined or "temporada" in pitch_combined:
            return "Alquileres de Temporada y Turísticos"
        else:
            return "Venta y Alquiler Propiedades"

    elif sector in ["Automotriz y Servicios", "Lavaderos y Automotriz"]:
        if "lavadero" in nombre_lower or "lavado" in pitch_combined:
            return "Lavaderos de Autos"
        elif "taller" in nombre_lower or "mecanica" in pitch_combined:
            return "Talleres y Servicios Automotrices"
        else:
            return "Servicios Vehiculares"

    elif sector in ["Gastronomía", "Delivery / Gastronomía"]:
        if any(w in pitch_combined or w in nombre_lower for w in ["pizza", "pizzeria"]):
            return "Pizzerías y Empanadas"
        elif any(w in pitch_combined or w in nombre_lower for w in ["cerveza", "cerveceria", "bar"]):
            return "Resto-Bars y Cervecerías"
        elif any(w in pitch_combined or w in nombre_lower for w in ["picada", "fiambre"]):
            return "Fiambrerías y Picadas"
        elif any(w in pitch_combined or w in nombre_lower for w in ["pasta"]):
            return "Fabrica de Pastas"
        else:
            return "Restaurantes y Delivery"

    elif sector in ["Showrooms e Indumentaria (Instagram)", "Showrooms e Instagram"]:
        return "Showrooms e Indumentaria"

    else:
        return "Comercio General & Minorista"

def build_catalog():
    print(f"Leyendo Excel desde: {EXCEL_PATH}")
    xl = pd.ExcelFile(EXCEL_PATH)
    
    catalog_by_id = {}
    catalog_by_rubro = {}
    total_leads = 0

    target_sheets = [s for s in xl.sheet_names if s not in ["📊 Dashboard & Conclusiones", "🏢 Master Comercios MDP"]]

    for sheet in target_sheets:
        df = xl.parse(sheet)
        for _, row in df.iterrows():
            lead_id = clean_value(row.get("id_lead")) or clean_value(row.get("id"))
            nombre = clean_value(row.get("nombre"))
            
            if not nombre:
                continue

            sector = clean_value(row.get("sector")) or "Comercio General & Minorista"
            pitch_sugerido = clean_value(row.get("servicio_pitch_sugerido"))
            pitch_gestion = clean_value(row.get("pitch_gestion_comercial"))
            
            subrubro = get_subrubro(sector, pitch_sugerido, nombre, pitch_gestion)

            lead_data = {
                "id": lead_id,
                "nombre": nombre,
                "sector": sector,
                "subrubro": subrubro,
                "zona": clean_value(row.get("zona")) or "Mar del Plata",
                "direccion": clean_value(row.get("direccion")),
                "telefono": clean_value(row.get("telefono")),
                "whatsapp": clean_value(row.get("whatsapp")),
                "link_whatsapp_outreach": clean_value(row.get("link_whatsapp_outreach")),
                "tiene_web": clean_value(row.get("tiene_web")),
                "web": clean_value(row.get("web")),
                "prioridad": clean_value(row.get("prioridad")) or "MEDIA",
                "puntaje_oportunidad": clean_value(row.get("puntaje_oportunidad")),
                "servicio_pitch_sugerido": pitch_sugerido,
                "pitch_gestion_comercial": pitch_gestion,
                "script_mensajeria": clean_value(row.get("script_mensajeria_personalizado")),
                "url_google_maps": clean_value(row.get("url_google_maps"))
            }

            if lead_id and lead_id not in catalog_by_id:
                catalog_by_id[lead_id] = lead_data
                total_leads += 1

            # Grouping by Rubro and Subrubro
            if sector not in catalog_by_rubro:
                catalog_by_rubro[sector] = {}
            if subrubro not in catalog_by_rubro[sector]:
                catalog_by_rubro[sector][subrubro] = []
            
            # Avoid duplicate entries in subrubro list
            if not any(l["nombre"] == nombre for l in catalog_by_rubro[sector][subrubro]):
                catalog_by_rubro[sector][subrubro].append(lead_data)

    output_data = {
        "metadata": {
            "total_leads_unicos": len(catalog_by_id),
            "rubros_count": len(catalog_by_rubro)
        },
        "by_id": catalog_by_id,
        "by_rubro": catalog_by_rubro
    }

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with open(CATALOG_FILE, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    print(f"✅ Catálogo generado con éxito: {len(catalog_by_id)} leads procesados en {len(catalog_by_rubro)} rubros.")

if __name__ == "__main__":
    build_catalog()
