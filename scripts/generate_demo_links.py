# -*- coding: utf-8 -*-
"""
generate_demo_links.py
Mapea los primeros 100 leads (primeros_100_leads_outreach.csv) a una de las
8 plantillas de demo y genera una URL personalizada por lead.

Personalización por URL params:
    ?n=<nombre>&t=<telefono_intl>&d=<direccion>&w=<mensaje_whatsapp>

Reglas de mapeo (por orden de prioridad):
    1. Match por keywords en el nombre del negocio (sub-rubros dentro de
       Comercio General, ej: imprenta, regalos, vinoteca, etc.)
    2. Fallback por sector del CSV.
    3. Fallback final -> plantilla generica-premium.

Salida: data/demo_links_outreach.csv
"""
import csv
import sys
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_IN = ROOT / "data" / "primeros_100_leads_outreach.csv"
DATA_OUT = ROOT / "data" / "demo_links_outreach.csv"

TEMPLATES = {
    "regaleria-souvenirs": "regaleria-souvenirs",
    "showroom-indumentaria": "showroom-indumentaria",
    "salud-estetica": "salud-estetica",
    "delivery-gastronomia": "delivery-gastronomia",
    "imprenta-sublimados": "imprenta-sublimados",
    "automotriz-servicios": "automotriz-servicios",
    "vinoteca-bebidas": "vinoteca-bebidas",
    "generica-premium": "generica-premium",
}

# (keywords en nombre, plantilla)
KEYWORD_RULES = [
    (("imprenta", "sublimad", "serigraf", "vinilo", "grafica", "cartel"), "imprenta-sublimados"),
    (("regal", "souvenir", "cotillon", "peluche", "bijou", "decoracion", "deco", "bazar"), "regaleria-souvenirs"),
    (("vino", "vinoteca", "bebida", "cerveza", "whisky"), "vinoteca-bebidas"),
    (("taller", "mecanic", "gomeria", "goma", "lavadero", "lava", "auto", "cubierta"), "automotriz-servicios"),
    (("showroom", "indumentaria", "moda", "ropa", "calzado", "jean", "outlet"), "showroom-indumentaria"),
    (("restaurant", "pizzeria", "rotiseria", "comida", "delivery", "hamburguesa", "cafe", "lo de", "parrilla", "heladeria"), "delivery-gastronomia"),
]

SECTOR_RULES = {
    "Salud y Estetica": "salud-estetica",
    "Showrooms e Indumentaria": "showroom-indumentaria",
    "Comida a Domicilio y Delivery": "delivery-gastronomia",
    "Automotriz y Servicios": "automotriz-servicios",
}

DEFAULT_WA = "Hola! Vi la demo de {nombre} y quería más información sobre el bot de WhatsApp y la web para mi negocio."


def normalize(s):
    """Normaliza para matching: lower, sin acentos."""
    if not s:
        return ""
    s = s.lower()
    accents = {"á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u", "ñ": "n", "ü": "u"}
    for a, b in accents.items():
        s = s.replace(a, b)
    return s


def pick_template(nombre, sector):
    name_norm = normalize(nombre)
    sector_norm = normalize(sector)
    for keywords, template in KEYWORD_RULES:
        if any(k in name_norm for k in keywords):
            return template
    for key, template in SECTOR_RULES.items():
        if normalize(key) == sector_norm:
            return template
    return "generica-premium"

def build_url(template, nombre, telefono, direccion, sector):
    wa_msg = DEFAULT_WA.format(nombre=nombre.strip() or "el negocio")
    params = urllib.parse.urlencode({
        "n": nombre.strip(),
        "t": telefono.strip(),
        "d": (direccion.strip() or "Mar del Plata, Buenos Aires"),
        "w": wa_msg,
    })
    return "demos/{0}/index.html?{1}".format(template, params)


def main():
    if not DATA_IN.exists():
        sys.exit("No se encuentra {0}".format(DATA_IN))

    with DATA_IN.open(encoding="utf-8-sig", newline="") as fh:
        reader = csv.DictReader(fh)
        leads = list(reader)

    rows_out = []
    for lead in leads:
        nombre = lead.get("nombre") or ""
        sector = lead.get("sector") or ""
        telefono = lead.get("whatsapp") or lead.get("telefono") or "5492230000000"
        direccion = lead.get("direccion") or ""
        template = pick_template(nombre, sector)
        url = build_url(template, nombre, telefono, direccion, sector)
        rows_out.append({
            "id_lead": lead.get("id_lead") or "",
            "nombre": nombre,
            "sector": sector,
            "plantilla": template,
            "demo_url": url,
            "link_whatsapp_outreach": lead.get("link_whatsapp_outreach") or "",
            "puntaje_num": lead.get("puntaje_num") or "",
        })

    with DATA_OUT.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=list(rows_out[0].keys()))
        writer.writeheader()
        writer.writerows(rows_out)

    from collections import Counter
    by_tpl = Counter(r["plantilla"] for r in rows_out)
    print("Leads mapeados: {0}".format(len(rows_out)))
    for tpl, count in sorted(by_tpl.items()):
        print("  {0:26s} -> {1}".format(tpl, count))
    print("\nSalida: {0}".format(DATA_OUT))


if __name__ == "__main__":
    main()
