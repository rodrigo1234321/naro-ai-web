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

# Cobertura Total por Grilla de Calles y Arterias Comerciales de Mar del Plata
ALL_MDP_STREET_QUERIES = [
    # Eje Centro & Güemes
    ("Comercio General", "comercios calle San Martin Mar del Plata"),
    ("Comercio General", "comercios calle Rivadavia Mar del Plata"),
    ("Comercio General", "comercios calle Belgrano Mar del Plata"),
    ("Comercio General", "comercios calle Moreno Mar del Plata"),
    ("Comercio General", "comercios calle Bolivar Mar del Plata"),
    ("Comercio General", "comercios avenida Colon Mar del Plata"),
    ("Comercio General", "comercios calle Alberti Mar del Plata"),
    ("Comercio General", "comercios calle Gascon Mar del Plata"),
    ("Comercio General", "comercios calle Falucho Mar del Plata"),
    ("Comercio General", "comercios calle Brown Mar del Plata"),
    ("Comercio General", "comercios calle Rawson Mar del Plata"),
    ("Comercio General", "comercios calle Garay Mar del Plata"),
    ("Comercio General", "comercios calle Castelli Mar del Plata"),
    ("Comercio General", "comercios calle Roca Mar del Plata"),
    ("Comercio General", "comercios calle Guemes Mar del Plata"),
    ("Comercio General", "comercios calle Olavarria Mar del Plata"),
    ("Comercio General", "comercios calle Alvear Mar del Plata"),
    ("Comercio General", "comercios calle Viamonte Mar del Plata"),
    ("Comercio General", "comercios calle Mendoza Mar del Plata"),

    # Eje San Juan, Norte y MacroCentro
    ("Comercio General", "comercios calle San Juan Mar del Plata"),
    ("Comercio General", "comercios calle Dorrego Mar del Plata"),
    ("Comercio General", "comercios calle Olazabal Mar del Plata"),
    ("Comercio General", "comercios calle Funes Mar del Plata"),
    ("Comercio General", "comercios calle Italia Mar del Plata"),
    ("Comercio General", "comercios avenida Jara Mar del Plata"),
    ("Comercio General", "comercios avenida Champagnat Mar del Plata"),
    ("Comercio General", "comercios avenida Tejedor Mar del Plata"),
    ("Comercio General", "comercios avenida Constitucion Mar del Plata"),
    ("Comercio General", "comercios avenida Luro Mar del Plata"),

    # Eje España, Salta, Jujuy, Catamarca, La Rioja, Yrigoyen
    ("Comercio General", "comercios calle España Mar del Plata"),
    ("Comercio General", "comercios calle Jujuy Mar del Plata"),
    ("Comercio General", "comercios calle Salta Mar del Plata"),
    ("Comercio General", "comercios calle Catamarca Mar del Plata"),
    ("Comercio General", "comercios calle La Rioja Mar del Plata"),
    ("Comercio General", "comercios calle Hipolito Yrigoyen Mar del Plata"),
    ("Comercio General", "comercios calle Mitre Mar del Plata"),
    ("Comercio General", "comercios calle Cordoba Mar del Plata"),
    ("Comercio General", "comercios calle Santa Fe Mar del Plata"),
    ("Comercio General", "comercios calle Corrientes Mar del Plata"),
    ("Comercio General", "comercios calle Entre Rios Mar del Plata"),
    ("Comercio General", "comercios calle Tucuman Mar del Plata"),

    # Eje Puerto, Mogotes y Sur
    ("Comercio General", "comercios calle 12 de Octubre Mar del Plata"),
    ("Comercio General", "comercios avenida Edison Mar del Plata"),
    ("Comercio General", "comercios calle Acha Mar del Plata"),
    ("Comercio General", "comercios avenida Juan B Justo Mar del Plata"),
    ("Comercio General", "comercios calle Talcahuano Mar del Plata"),
    ("Comercio General", "comercios avenida Jacinto Peralta Ramos Mar del Plata"),
    ("Comercio General", "comercios avenida Mario Bravo Mar del Plata"),
    ("Comercio General", "comercios avenida Fortunato de la Plaza Mar del Plata"),
]

MAX_ITEMS_PER_QUERY = 60
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
    for _ in range(22):
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
    out_path = os.path.join(DATA_DIR, "master_comercios_mdp.csv")
    done_urls = set()

    if os.path.exists(out_path):
        with open(out_path, "r", encoding="utf-8-sig") as f:
            for r in csv.DictReader(f):
                if r.get("url_origen"):
                    done_urls.add(r["url_origen"])

    new_file = not os.path.exists(out_path)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True, args=["--lang=es-AR", "--disable-blink-features=AutomationControlled"]
        )

        with open(out_path, "a" if not new_file else "w", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(
                f,
                fieldnames=["nombre", "zona", "direccion", "telefono", "web", "tiene_web", "url_origen"],
            )
            if new_file:
                writer.writeheader()

            for cat, q in ALL_MDP_STREET_QUERIES:
                print(f"\n[BARRIDO TOTAL POR CALLE] Buscando: '{q}'...")
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
                    print(f" -> Encontrados: {len(found)} negocios activos en '{q}'")

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
                            "nombre": found[href],
                            "zona": "Mar del Plata",
                            "direccion": "",
                            "telefono": "",
                            "web": "",
                            "tiene_web": "NO",
                            "url_origen": href,
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
                            m_web = re.search(r'\["http([^"]+?)",', body)
                            if m_web and "google.com" not in m_web.group(1):
                                row["web"] = f"http{m_web.group(1)}"
                                row["tiene_web"] = "SI"

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
        print("\n[EXITO] Barrido Total por Grilla de Calles de Mar del Plata finalizado.")


if __name__ == "__main__":
    main()
