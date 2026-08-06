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

# Búsquedas por corredores comerciales y calles clave de Mar del Plata
STREET_CORRIDOR_QUERIES = [
    ("Comercio General", "comercios calle Dorrego Mar del Plata"),
    ("Showrooms e Indumentaria (Instagram)", "uniformes ropa trabajo calle Dorrego Mar del Plata"),
    ("Mascotas y Servicios", "pet shop acuario calle Dorrego Mar del Plata"),
    ("Showrooms e Indumentaria (Instagram)", "uniformes escolares calle San Juan Mar del Plata"),
    ("Comercio General", "comercios calle Olavarria Mar del Plata"),
    ("Comercio General", "comercios calle La Rioja Mar del Plata"),
    ("Comercio General", "comercios calle Catamarca Mar del Plata"),
    ("Comercio General", "comercios calle Salta Mar del Plata"),
    ("Comercio General", "comercios calle Jujuy Mar del Plata"),
    ("Comercio General", "comercios calle Hipolito Yrigoyen Mar del Plata"),
    ("Comercio General", "comercios calle Mitre Mar del Plata"),
    ("Comercio General", "comercios calle Belgrano Mar del Plata"),
    ("Comercio General", "comercios calle Moreno Mar del Plata"),
    ("Comercio General", "comercios calle Bolivar Mar del Plata"),
    ("Comercio General", "comercios calle Rivadavia Mar del Plata"),
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

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True, args=["--lang=es-AR", "--disable-blink-features=AutomationControlled"]
        )

        with open(out_path, "a", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(
                f,
                fieldnames=["rubro", "nombre", "url", "direccion", "telefono", "web", "instagram", "facebook"],
            )

            for cat, q in STREET_CORRIDOR_QUERIES:
                print(f"\n[ESCANEO POR CORREDORES DE CALLE] Buscando: '{q}'...")
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
                    print(f" -> Encontrados: {len(found)} negocios en corredor para '{q}'")

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
        print("\n[EXITO] Extracción por Corredores de Calle finalizada.")


if __name__ == "__main__":
    main()
