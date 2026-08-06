import sys
import os
import re
import csv
import time
import json
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

STEALTH = """
Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
Object.defineProperty(navigator, 'languages', {get: () => ['es-AR', 'es', 'en']});
window.chrome = {runtime: {}};
"""

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36"

# Matriz de Búsqueda por Rubros Clave en Mar del Plata
QUERIES_BY_SECTOR = {
    "Turismo y Alojamiento": [
        "hotel Mar del Plata",
        "cabañas Mar del Plata",
        "alquiler temporario Mar del Plata",
        "aparthotel Mar del Plata",
        "hostel Mar del Plata",
    ],
    "Gastronomía": [
        "restaurante Mar del Plata",
        "bar cerveceria Mar del Plata",
        "parrilla Mar del Plata",
        "cafeteria Mar del Plata",
    ],
    "Inmobiliarias": [
        "inmobiliaria Mar del Plata",
        "bienes raices Mar del Plata",
        "administracion de propiedades Mar del Plata",
    ],
    "Salud y Estética": [
        "consultorio medico Mar del Plata",
        "clinica odontologica Mar del Plata",
        "centro de estetica Mar del Plata",
        "veterinaria Mar del Plata",
        "gimnasio Mar del Plata",
    ],
    "Industrial y Puerto": [
        "distribuidora mayorista Mar del Plata",
        "pesquera puerto Mar del Plata",
        "empresa textil Mar del Plata",
    ],
    "Servicios Profesionales": [
        "estudio contable Mar del Plata",
        "estudio juridico Mar del Plata",
    ],
}

MAX_ITEMS_PER_QUERY = 80
DATA_DIR = "data"


def extract_website(body):
    urls = re.findall(r"https?://[a-zA-Z0-9][a-zA-Z0-9\.\-_/]{2,120}", body)
    for u in urls:
        u_lower = u.lower()
        if any(
            ignored in u_lower
            for ignored in [
                "google.com",
                "gstatic",
                "youtube",
                "googleusercontent",
                "googleapis",
                "schema.org",
                "w3.org",
                "ggpht",
                "g.co",
                "instagram.com",
                "facebook.com",
                "googlesyndication",
                "doubleclick",
                "sentry.io",
            ]
        ):
            continue
        if any(ext in u_lower for ext in [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".css", ".js"]):
            continue
        return u.rstrip(".,;")
    return ""


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
    for _ in range(25):
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
        page.wait_for_timeout(1200)
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
    out_path = os.path.join(DATA_DIR, "scraped_target_prospects.csv")
    done_urls = set()
    if os.path.exists(out_path):
        with open(out_path, newline="", encoding="utf-8-sig") as f:
            for row in csv.DictReader(f):
                done_urls.add(row.get("url", ""))

    new_file = not os.path.exists(out_path)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True, args=["--lang=es-AR", "--disable-blink-features=AutomationControlled"]
        )

        with open(out_path, "a", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(
                f,
                fieldnames=["rubro", "nombre", "url", "direccion", "telefono", "web", "tiene_web"],
            )
            if new_file:
                writer.writeheader()

            for sector, queries in QUERIES_BY_SECTOR.items():
                print(f"\n==========================================")
                print(f"SECTOR TARGET: {sector}")
                print(f"==========================================")

                for q in queries:
                    ctx = browser.new_context(
                        locale="es-AR",
                        user_agent=UA,
                        viewport={"width": 1440, "height": 900},
                        timezone_id="America/Argentina/Buenos_Aires",
                    )
                    ctx.add_init_script(STEALTH)
                    page = ctx.new_page()

                    try:
                        print(f" -> Buscando: '{q}'...")
                        url = "https://www.google.com/maps/search/" + q.replace(" ", "+") + "/?hl=es"
                        page.goto(url, timeout=45000, wait_until="domcontentloaded")
                        page.wait_for_timeout(5000)

                        for _ in range(3):
                            if page.query_selector("div[role='feed']"):
                                break
                            page.wait_for_timeout(2000)

                        scroll_feed(page)
                        found = collect_place_urls(page)
                        print(f"    Encontrados: {len(found)} lugares para '{q}'")

                        pending = [h for h in found.keys() if h not in done_urls]
                        print(f"    Pendientes de extraer detalles: {len(pending)}")

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
                                "rubro": sector,
                                "nombre": found[href],
                                "url": href,
                                "direccion": "",
                                "telefono": "",
                                "web": "",
                                "tiene_web": "NO",
                            }

                            for attempt in range(2):
                                try:
                                    page.goto(href, timeout=30000, wait_until="domcontentloaded")
                                    page.wait_for_timeout(3500)
                                    if "body" in preview:
                                        break
                                except Exception:
                                    time.sleep(2)

                            if "body" in preview:
                                body = preview["body"]
                                row["direccion"] = extract_address(body)
                                row["telefono"] = extract_phone(body)
                                web = extract_website(body)
                                if web:
                                    row["web"] = web
                                    row["tiene_web"] = "SI"

                            writer.writerow(row)
                            f.flush()
                            done_urls.add(href)

                            if (idx + 1) % 15 == 0:
                                print(f"      {idx+1}/{len(pending)} procesados...")
                            time.sleep(1.0)

                    except Exception as e:
                        print(f"  [ERROR] {q}: {str(e)[:80]}")

                    ctx.close()
                    time.sleep(1.5)

        browser.close()
        print("\n[EXITO] Extracción de rubros target finalizada.")


if __name__ == "__main__":
    main()
