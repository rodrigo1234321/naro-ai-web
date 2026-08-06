import os
import re
import csv
import sys
import glob
import urllib.parse

sys.stdout.reconfigure(encoding="utf-8")
from analyze_web_technologies import inspect_website


def clean_str(s):
    if not s:
        return ""
    return re.sub(r"\s+", " ", str(s)).strip()


def normalize_name(name):
    name = clean_str(name)
    name = re.sub(r"\s*[–|-].*$", "", name).strip()
    return name


def normalize_phone(phone):
    phone = clean_str(phone)
    if not phone:
        return "", ""
    digits = re.sub(r"\D", "", phone)
    wa_number = ""

    if len(digits) >= 8:
        if digits.startswith("549223"):
            formatted = f"+54 9 223 {digits[6:]}"
            wa_number = digits
        elif digits.startswith("223"):
            formatted = f"0223 {digits[3:]}"
            wa_number = f"549223{digits[3:]}"
        elif digits.startswith("0223"):
            formatted = f"0223 {digits[4:]}"
            wa_number = f"549223{digits[4:]}"
        elif digits.startswith("15"):
            formatted = f"0223 {digits[2:]}"
            wa_number = f"549223{digits[2:]}"
        else:
            formatted = phone
            if len(digits) == 10:
                wa_number = f"549{digits}"
    else:
        formatted = phone

    return formatted, wa_number


def infer_sector(name, current_rubro="", url=""):
    text = (name + " " + current_rubro + " " + url).lower()

    if any(
        k in text
        for k in [
            "showroom",
            "camisetas",
            "tienda online",
            "sublimacion",
            "bijouterie",
            "estampado",
            "indumentaria",
            "lenceria",
            "ropa",
        ]
    ):
        return "Showrooms e Indumentaria (Instagram)"

    if any(
        k in text
        for k in [
            "viandas",
            "delivery",
            "a domicilio",
            "pasteleria",
            "reposteria",
            "comida casera",
            "empana",
        ]
    ):
        return "Comida a Domicilio y Delivery"

    if any(
        k in text
        for k in [
            "hotel",
            "cabaña",
            "alquiler temporario",
            "aparthotel",
            "hostel",
            "hospedaje",
            "posada",
            "alojamiento",
            "complejo de mar",
        ]
    ):
        return "Turismo y Alojamiento"

    if any(
        k in text
        for k in [
            "restaurante",
            "bar",
            "cerveceria",
            "parrilla",
            "cafeteria",
            "pizzeria",
            "hamburgueseria",
            "heladeria",
            "bistro",
            "sushi",
            "trattoria",
            "comida",
        ]
    ):
        return "Gastronomía"

    if any(
        k in text
        for k in [
            "inmobiliaria",
            "bienes raices",
            "propiedades",
            "alquileres",
            "tasaciones",
            "constructora",
            "desarrollos urbanos",
        ]
    ):
        return "Inmobiliarias"

    if any(
        k in text
        for k in [
            "salud",
            "clinica",
            "medico",
            "odontolog",
            "estetica",
            "veterinaria",
            "gimnasio",
            "spa",
            "optica",
            "farmacia",
            "crossfit",
            "pilates",
            "dental",
        ]
    ):
        return "Salud y Estética"

    if any(
        k in text
        for k in [
            "puerto",
            "pesquer",
            "textil",
            "mayorista",
            "distribuidora",
            "fabrica",
            "industrial",
            "logistica",
            "deposito",
        ]
    ):
        return "Industrial y Puerto"

    if any(
        k in text
        for k in [
            "estudio contable",
            "estudio juridico",
            "abogado",
            "contador",
            "consultora",
            "escribania",
            "gestoria",
            "seguros",
        ]
    ):
        return "Servicios Profesionales"

    if any(
        k in text
        for k in [
            "taller",
            "repuestos",
            "concesionaria",
            "mecanica",
            "autos",
            "neumaticos",
            "baterias",
            "lubricentro",
        ]
    ):
        return "Automotriz y Servicios"

    return "Comercio General"


def calculate_lead_score(sector, tiene_web, web_url, tiene_tel, web_tech):
    score = 0
    pitch = ""
    reasons = []

    # 1. Rubro de Alto Volumen de Turnos/Consultas (+25 pts)
    HIGH_VOLUME_SECTORS = [
        "Turismo y Alojamiento",
        "Gastronomía",
        "Inmobiliarias",
        "Salud y Estética",
        "Servicios Profesionales",
    ]

    if sector in HIGH_VOLUME_SECTORS:
        score += 25
        reasons.append("Rubro de alto volumen de atención (+25)")
    else:
        score += 10

    # 2. Estado de Presencia Web
    if tiene_web == "NO" or not web_url:
        score += 45
        reasons.append("Sin sitio web propio (+45)")
        if sector in ["Turismo y Alojamiento", "Gastronomía"]:
            pitch = "Creación de Sitio Web Responsivo + Bot de Reservas/Consultas 24/7 por WhatsApp"
        elif sector == "Inmobiliarias":
            pitch = "Sitio Web Inmobiliario con Catálogo + Bot de Calificación de Leads en WhatsApp"
        elif sector == "Salud y Estética":
            pitch = "Página Web + Agendador Automatizado de Turnos por WhatsApp"
        else:
            pitch = "Creación de Página Web Profesional + Bot de Atención Automatizado 24/7"
    else:
        # Evaluar sitio web existente
        if not web_tech["es_responsive"]:
            score += 20
            reasons.append("Web no adaptada a celulares (+20)")
            pitch = "Rediseño Web Responsivo + Integración de Bot de IA en WhatsApp"
        elif not web_tech["tiene_bot_o_chat"]:
            score += 15
            reasons.append("Web activa pero sin Bot de IA / Chatbot (+15)")
            pitch = "Integración de Bot de WhatsApp IA 24/7 para Automatizar Consultas y Agendamiento"
        else:
            score += 5
            pitch = "Sistema Especializado a Medida / Automatizaciones de Procesos Internos (n8n)"

    # 3. Disponibilidad de contacto (+10 pts)
    if tiene_tel:
        score += 10
        reasons.append("Teléfono directo disponible (+10)")

    # Nivel de Prioridad
    if score >= 60:
        priority = "ALTA (Lead Caliente 🔥)"
    elif score >= 40:
        priority = "MEDIA (Lead Templado ⚡)"
    else:
        priority = "BAJA (Lead Frío ❄️)"

    # 4. Evaluación de Software de Gestión Comercial (Control Comercio)
    if sector in ["Comercio General", "Showrooms e Indumentaria (Instagram)", "Automotriz y Servicios", "Comida a Domicilio y Delivery", "Salud y Estética"]:
        gestion_apto = "SI 🔥 (Alta Prioridad de Software)"
        if sector == "Comercio General":
            pitch_gestion = "Software de Gestión Comercial (POS): Control de Stock por Código de Barras, Precios, Cuentas Corrientes (Fiado) y Arqueo de Caja."
        elif sector == "Showrooms e Indumentaria (Instagram)":
            pitch_gestion = "Gestión Comercial de Indumentaria: Stock por Curva de Talles y Colores, POS en Mostrador y Sincronización con Ventas por Instagram."
        elif sector == "Comida a Domicilio y Delivery":
            pitch_gestion = "Gestión Gastronómica: Costo de Insumos, Comandera para Cocina y Cierre de Caja de Repartidores."
        elif sector == "Salud y Estética":
            pitch_gestion = "Software de Gestión de Servicios: Registro de Señas de Turnos, Liquidación de Comisiones y Descuento de Insumos."
        else:
            pitch_gestion = "Sistema de Gestión de Talleres: Stock de Repuestos, Órdenes de Trabajo y Facturación."
    else:
        gestion_apto = "OPCIONAL ⚡ (Facturación y Caja)"
        pitch_gestion = "Módulo de Facturación Electrónica y Control de Arqueo de Caja Diario."

    return score, priority, pitch, " | ".join(reasons), gestion_apto, pitch_gestion


def generate_outreach_link(wa_number, nombre, sector, pitch):
    if not wa_number:
        return ""

    if sector == "Turismo y Alojamiento":
        msg = f"Hola {nombre}, ¿cómo estás? Te escribo desde nuestra agencia de IA en Mar del Plata. Vemos que reciben muchas consultas de reservas y queríamos mostrarte cómo automatizar las respuestas 24/7 por WhatsApp. ¿Tienen 2 min para coordinar una demo?"
    elif sector == "Inmobiliarias":
        msg = f"Hola {nombre}, ¿cómo estás? Te escribo de nuestra agencia de IA en Mar del Plata. Desarrollamos un sistema que califica y atiende consultas de alquileres/ventas por WhatsApp automáticamente las 24hs. ¿Les interesaría ver una breve muestra?"
    elif sector == "Salud y Estética":
        msg = f"Hola {nombre}, ¿cómo estás? Te consulto desde nuestra agencia en Mar del Plata. Implementamos bots de agendamiento y recordatorios por WhatsApp para eliminar el ausentismo en turnos. ¿Les gustaría probarlo?"
    else:
        msg = f"Hola {nombre}, ¿cómo estás? Te contacto desde nuestra agencia de IA en Mar del Plata. Desarrollamos páginas web modernas y automatizaciones de atención por WhatsApp para comercios locales. ¿Te gustaría ver un demo para {nombre}?"

    encoded = urllib.parse.quote(msg)
    return f"https://wa.me/{wa_number}?text={encoded}"


def main():
    data_dir = "data"
    out_path = os.path.join(data_dir, "prospectos_agencia_ia_mdp.csv")

    raw_records = []
    seen_keys = set()

    # 1. Cargar datos de emprendimientos e Instagram shops
    venture_path = os.path.join(data_dir, "scraped_instagram_ventures.csv")
    if os.path.exists(venture_path):
        with open(venture_path, newline="", encoding="utf-8-sig") as f:
            for row in csv.DictReader(f):
                raw_records.append(
                    {
                        "nombre": row.get("nombre", ""),
                        "zona": "Mar del Plata",
                        "rubro_orig": row.get("categoria_venture", ""),
                        "direccion": row.get("direccion", ""),
                        "telefono": row.get("telefono", ""),
                        "web": row.get("web", ""),
                        "tiene_web": "NO" if row.get("solo_instagram") == "SI" else "SI",
                        "url_origen": row.get("url", ""),
                    }
                )

    # 2. Cargar datos de scraped_target_prospects.csv si existe
    target_path = os.path.join(data_dir, "scraped_target_prospects.csv")
    if os.path.exists(target_path):
        with open(target_path, newline="", encoding="utf-8-sig") as f:
            for row in csv.DictReader(f):
                raw_records.append(
                    {
                        "nombre": row.get("nombre", ""),
                        "zona": "Mar del Plata",
                        "rubro_orig": row.get("rubro", ""),
                        "direccion": row.get("direccion", ""),
                        "telefono": row.get("telefono", ""),
                        "web": row.get("web", ""),
                        "tiene_web": row.get("tiene_web", "NO"),
                        "url_origen": row.get("url", ""),
                    }
                )

    # 1b. Cargar emprendimientos de estética y depilación láser (Instagram)
    beauty_path = os.path.join(data_dir, "scraped_beauty_entrepreneurs.csv")
    if os.path.exists(beauty_path):
        with open(beauty_path, newline="", encoding="utf-8-sig") as f:
            for row in csv.DictReader(f):
                raw_records.append(
                    {
                        "nombre": row.get("nombre", ""),
                        "zona": "Mar del Plata (Colinas de Peralta Ramos / Zonal)",
                        "rubro_orig": row.get("categoria_beauty", "Salud y Estética"),
                        "direccion": row.get("direccion", "Mar del Plata"),
                        "telefono": row.get("telefono", ""),
                        "web": row.get("web", ""),
                        "tiene_web": row.get("tiene_web", "NO"),
                        "url_origen": row.get("url", ""),
                    }
                )

    # 1c. Cargar todos los emprendimientos de redes sociales (Instagram/Facebook, lavaderos, camisetas, etc.)
    all_social_path = os.path.join(data_dir, "scraped_all_social_ventures.csv")
    if os.path.exists(all_social_path):
        with open(all_social_path, newline="", encoding="utf-8-sig") as f:
            for row in csv.DictReader(f):
                raw_records.append(
                    {
                        "nombre": row.get("nombre", ""),
                        "zona": "Mar del Plata",
                        "rubro_orig": row.get("rubro", "Comercio General"),
                        "direccion": row.get("direccion", "Mar del Plata"),
                        "telefono": row.get("telefono", ""),
                        "web": row.get("web", ""),
                        "tiene_web": row.get("tiene_web", "NO"),
                        "url_origen": row.get("url", ""),
                    }
                )

    # 2. Cargar datos de master_comercios_mdp.csv
    master_path = os.path.join(data_dir, "master_comercios_mdp.csv")
    if os.path.exists(master_path):
        with open(master_path, newline="", encoding="utf-8-sig") as f:
            for row in csv.DictReader(f):
                raw_records.append(
                    {
                        "nombre": row.get("nombre", ""),
                        "zona": row.get("zona", "Mar del Plata"),
                        "rubro_orig": "",
                        "direccion": row.get("direccion", ""),
                        "telefono": row.get("telefono", ""),
                        "web": row.get("web", ""),
                        "tiene_web": row.get("tiene_web", "NO"),
                        "url_origen": row.get("url_origen", ""),
                    }
                )

    prospects = []
    print(f"Procesando {len(raw_records)} comercios para calificación de leads de IA...")

    # Recopilar URLs web únicas para inspección paralela
    unique_urls = list(set(clean_str(r["web"]) for r in raw_records if clean_str(r["web"]) and ("http" in clean_str(r["web"]) or "www." in clean_str(r["web"]))))
    print(f"Analizando {len(unique_urls)} páginas web activas en paralelo...")

    from concurrent.futures import ThreadPoolExecutor
    web_tech_cache = {}

    def fetch_url(url):
        return url, inspect_website(url)

    with ThreadPoolExecutor(max_workers=40) as executor:
        results = executor.map(fetch_url, unique_urls)
        for url, tech in results:
            web_tech_cache[url] = tech

    print("Analisis web completado. Generando base de datos de leads...")

    for idx, raw in enumerate(raw_records, start=1):
        nombre = normalize_name(raw["nombre"])
        if not nombre or len(nombre) < 2:
            continue

        zona = clean_str(raw["zona"])
        key = (nombre.lower(), zona.lower())
        if key in seen_keys:
            continue
        seen_keys.add(key)

        tel_fmt, wa_num = normalize_phone(raw["telefono"])
        web_url = clean_str(raw["web"])
        tiene_web = "SI" if web_url and ("http" in web_url or "www." in web_url) else "NO"

        sector = infer_sector(nombre, raw["rubro_orig"], web_url)

        web_tech = web_tech_cache.get(web_url, {"web_activa": False, "es_responsive": True, "tiene_ssl": True, "tiene_bot_o_chat": False})

        score, priority, pitch, razones, gestion_apto, pitch_gestion = calculate_lead_score(
            sector, tiene_web, web_url, bool(tel_fmt), web_tech
        )

        wa_link = generate_outreach_link(wa_num, nombre, sector, pitch)

        prospects.append(
            {
                "id_lead": f"LEAD-IA-{idx:04d}",
                "nombre": nombre,
                "sector": sector,
                "zona": zona,
                "prioridad": priority,
                "puntaje_oportunidad": score,
                "servicio_pitch_sugerido": pitch,
                "apto_gestion_comercial": gestion_apto,
                "pitch_gestion_comercial": pitch_gestion,
                "tiene_web": tiene_web,
                "web": web_url,
                "telefono": tel_fmt,
                "whatsapp": wa_num,
                "link_whatsapp_outreach": wa_link,
                "direccion": raw["direccion"],
                "razones_puntaje": razones,
                "url_google_maps": raw["url_origen"],
            }
        )

    # Ordenar por puntaje descendente (leads más calientes primero)
    prospects.sort(key=lambda x: x["puntaje_oportunidad"], reverse=True)

    fieldnames = [
        "id_lead",
        "nombre",
        "sector",
        "zona",
        "prioridad",
        "puntaje_oportunidad",
        "servicio_pitch_sugerido",
        "apto_gestion_comercial",
        "pitch_gestion_comercial",
        "tiene_web",
        "web",
        "telefono",
        "whatsapp",
        "link_whatsapp_outreach",
        "direccion",
        "razones_puntaje",
        "url_google_maps",
    ]

    with open(out_path, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(prospects)

    print(f"\n[EXITO] Base de Prospección para Agencia de IA generada: {len(prospects)} prospectos -> {out_path}")

    # Resumen de Métricas de Prospección
    stats_sector = {}
    hot_leads = 0
    warm_leads = 0

    for p in prospects:
        sec = p["sector"]
        if sec not in stats_sector:
            stats_sector[sec] = 0
        stats_sector[sec] += 1

        if "ALTA" in p["prioridad"]:
            hot_leads += 1
        elif "MEDIA" in p["prioridad"]:
            warm_leads += 1

    print(f"\n=== METRICAS DE PROSPECCION AGENCIA IA ===")
    print(f" 🔥 Leads Calientes (Prioridad Alta): {hot_leads}")
    print(f" ⚡ Leads Templados (Prioridad Media): {warm_leads}")
    print(f"\n--- Desglose por Sector ---")
    for sec, count in sorted(stats_sector.items(), key=lambda x: x[1], reverse=True):
        print(f" • {sec}: {count} prospectos")


if __name__ == "__main__":
    main()
