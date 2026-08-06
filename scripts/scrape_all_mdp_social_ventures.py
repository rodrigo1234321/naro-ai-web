import sys
import os
import re
import csv
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

STEALTH = """
Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
Object.defineProperty(navigator, 'languages', {get: () => ['es-AR', 'es', 'en']});
window.chrome = {runtime: {}};
"""

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36"

# Matriz masiva de categorías y búsquedas para todos los emprendimientos de Mar del Plata
ALL_VENTURE_QUERIES = [
    # Indumentaria, Calzado y Camisetas
    ("Showrooms e Indumentaria (Instagram)", "camisetas de futbol mar del plata instagram"),
    ("Showrooms e Indumentaria (Instagram)", "zapatillas showroom mar del plata instagram"),
    ("Showrooms e Indumentaria (Instagram)", "ropa hombre mujer mar del plata instagram"),
    ("Showrooms e Indumentaria (Instagram)", "ropa de chicos bebe mar del plata instagram"),
    ("Showrooms e Indumentaria (Instagram)", "lenceria bikinis mar del plata instagram"),
    ("Showrooms e Indumentaria (Instagram)", "marroquineria bolsos calzado mar del plata instagram"),
    ("Showrooms e Indumentaria (Instagram)", "indumentaria deportiva mar del plata instagram"),

    # Automotriz y Lavaderos
    ("Automotriz y Servicios", "lavadero de autos mar del plata instagram facebook"),
    ("Automotriz y Servicios", "car detailing lavadero mar del plata instagram"),
    ("Automotriz y Servicios", "taller mecanico gomeria mar del plata instagram facebook"),
    ("Automotriz y Servicios", "repuestos accesorios autos mar del plata instagram"),

    # Gastronomía y Delivery
    ("Comida a Domicilio y Delivery", "hamburgueseria artesanal delivery mar del plata instagram"),
    ("Comida a Domicilio y Delivery", "sushi delivery mar del plata instagram"),
    ("Comida a Domicilio y Delivery", "pizzeria empanadas delivery mar del plata instagram"),
    ("Comida a Domicilio y Delivery", "viandas saludables a domicilio mar del plata instagram"),
    ("Comida a Domicilio y Delivery", "pasteleria tortas artesanal mar del plata instagram"),
    ("Comida a Domicilio y Delivery", "rotiseria comida casera mar del plata instagram"),

    # Servicios del Hogar y Construcción
    ("Servicios para el Hogar", "electricista plomero mar del plata instagram facebook"),
    ("Servicios para el Hogar", "pintor remodelaciones mar del plata instagram facebook"),
    ("Servicios para el Hogar", "carpinteria muebles a medida mar del plata instagram"),
    ("Servicios para el Hogar", "aluminio aberturas mar del plata instagram facebook"),

    # Mascotas
    ("Mascotas y Servicios", "pet shop peluqueria canina mar del plata instagram"),
    ("Mascotas y Servicios", "veterinaria a domicilio mar del plata instagram"),

    # Fitness y Deporte
    ("Salud y Estética", "gimnasio personal trainer mar del plata instagram"),
    ("Salud y Estética", "crossfit pilates mar del plata instagram"),
    ("Salud y Estética", "estudio de danza artes marciales mar del plata instagram"),

    # Regalería y Servicios Varios
    ("Regalería y Emprendimientos", "regalos personalizados mar del plata instagram"),
    ("Regalería y Emprendimientos", "sublimacion estampados imprenta mar del plata instagram"),
    ("Regalería y Emprendimientos", "cotillon eventos organizador mar del plata instagram"),
]

MAX_ITEMS_PER_QUERY = 50
DATA_DIR = "data"


def extract_phone(body):
    phones = re.findall(r"((?:\(\d{2,4}\)\s?|\+\d{1,3}[\s-]?)?\d{2,4}[\s-]\d{3,4}[\s-]\d{3,4})", body)
    seen = []
    for ph in phones:
        if ph not in seen:
            seen.append(ph)
    return seen[0].strip() if seen else ""


def extract_address(body):
    m = re.search(r'\["([^"/\\]{4,140}?)","(B\d{4}[^",]+?)","([^"]{4,80}?)"\]', body)
    if m:
        return m.group(1)
    m = re.search(r'\["([^"]{4,120}?)",\d{4}[^]]*?\]', body)
    return m.group(1) if m else ""


def scroll_feed(page):
    feed = page.query_selector("div[role='feed']")
    if not feed:
        return
    seen = 0
    for _ in range(20):
        items = feed.query_selector_all("div[role='article']")
        if len(items) >= MAX_ITEMS_PER_QUERY or len(items) == seen:
            break
        seen = len(items)
        page.evaluate(
            """() => {
                const feed = document.querySelector("div[role='feed']");
                if (feed) feed.scrollTop = feed.scrollHeight;
            }"""
        )
        page.wait_for_timeout(1000)
        feed = page.query_selector("div[role='feed']") or feed


def collect_place_urls(page):
    anchors = page.query_selector_all("a.hfpxzc")
    out = {}
    for a in anchors:
        href = a.get_attribute("href")
        label = a.get_attribute("aria-label")
        if href and label and len(label.strip()) >= 3:
            out[href] = label.strip()
    return out


def main():
    out_path = os.path.join(DATA_DIR, "scraped_all_social_ventures.csv")
    done_urls = set()

    if os.path.exists(out_path):
        with open(out_path, "r", encoding="utf-8-sig") as f:
            for r in csv.DictReader(f):
                if r.get("url"):
                    done_urls.add(r["url"])

    new_file = not os.path.exists(out_path)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True, args=["--lang=es-AR", "--disable-blink-features=AutomationControlled"]
        )

        with open(out_path, "a" if not new_file else "w", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(
                f,
                fieldnames=["rubro", "nombre", "url", "direccion", "telefono", "web", "instagram", "facebook"],
            )
            if new_file:
                writer.writeheader()

            for cat, q in ALL_VENTURE_QUERIES:
                print(f"\n[ESCANEO MASIVO DE EMPRENDIMIENTOS] Buscando: '{q}' ({cat})...")
                ctx = browser.new_context(
                    locale="es-AR",
                    user_agent=UA,
                    viewport={"width": 1440, "height": 900},
                    timezone_id="America/Argentina/Buenos_Aires",
                )
                ctx.add_init_script(STEALTH)
                page = ctx.new_page()

                try:
                    url = "https://www.google.com/maps/search/" + q.replace(" ", "+") + "/?hl=es"
                    page.goto(url, timeout=45000, wait_until="domcontentloaded")
                    page.wait_for_timeout(3500)

                    for _ in range(3):
                        if page.query_selector("div[role='feed']"):
                            break
                        page.wait_for_timeout(1500)

                    scroll_feed(page)
                    found = collect_place_urls(page)
                    print(f" -> Encontrados: {len(found)} negocios/emprendimientos para '{q}'")

                    pending = [h for h in found.keys() if h not in done_urls]

                    for idx, href in enumerate(pending):
                        preview = {}

                        def on_response(resp):
                            if "maps/preview/place" in resp.url:
                                try:
                                    preview["body"] = resp.text()
                                except Exception:
                                    pass

                        page.on("response", on_response)
                        row = {
                            "rubro": cat,
                            "nombre": found[href],
                            "url": href,
                            "direccion": "",
                            "telefono": "",
                            "web": "",
                            "instagram": "",
                            "facebook": "",
                        }

                        for attempt in range(2):
                            try:
                                page.goto(href, timeout=25000, wait_until="domcontentloaded")
                                page.wait_for_timeout(2500)
                                if "body" in preview:
                                    break
                            except Exception:
                                time.sleep(1.5)

                        if "body" in preview:
                            body = preview["body"]
                            row["direccion"] = extract_address(body)
                            row["telefono"] = extract_phone(body)
                            m_ig = re.search(r"instagram\.com/([a-zA-Z0-9_\.\-]+)", body)
                            if m_ig:
                                row["instagram"] = f"@{m_ig.group(1)}"
                            m_fb = re.search(r"facebook\.com/([a-zA-Z0-9_\.\-]+)", body)
                            if m_fb:
                                row["facebook"] = f"fb.com/{m_fb.group(1)}"

                        writer.writerow(row)
                        f.flush()
                        done_urls.add(href)

                        if (idx + 1) % 15 == 0:
                            print(f"    {idx+1}/{len(pending)} procesados...")
                        time.sleep(0.8)

                except Exception as e:
                    print(f"  [ERROR] {q}: {str(e)[:80]}")

                ctx.close()
                time.sleep(1.0)

        browser.close()
        print("\n[EXITO] Extracción Masiva de Todos los Emprendimientos en Mar del Plata finalizada.")


if __name__ == "__main__":
    main()
