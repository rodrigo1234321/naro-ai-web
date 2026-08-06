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

# Zonas -> queries de búsqueda (calle principal + variantes)
ZONES = {
    "microcentro": [
        "Peatonal San Martín Mar del Plata comercios",
        "calle Rivadavia Mar del Plata comercios",
        "San Martín Mar del Plata locales comerciales",
    ],
    "guemes": [
        "calle Güemes Mar del Plata negocios",
        "negocios calle Olavarría Mar del Plata",
        "locales comerciales Güemes Mar del Plata",
    ],
    "juan_b_justo": [
        "Avenida Juan B. Justo Mar del Plata negocios",
        "Juan B. Justo Mar del Plata locales",
    ],
    "12_de_octubre": [
        "calle 12 de Octubre Mar del Plata negocios",
    ],
    "constitucion": [
        "Avenida Constitución Mar del Plata negocios",
        "Constitución Mar del Plata comercios",
    ],
    "tejedor": [
        "calle Tejedor Mar del Plata negocios",
    ],
    "san_juan": [
        "calle San Juan Mar del Plata negocios",
    ],
    "alberti": [
        "calle Alberti Mar del Plata negocios",
    ],
    "talcahuano": [
        "calle Talcahuano Mar del Plata negocios",
    ],
    "av_39": [
        "calle 39 Mar del Plata negocios",
        "Fortunato de la Plaza Mar del Plata negocios",
    ],
    "playa_grande": [
        "Playa Grande Mar del Plata negocios",
        "calle Buenos Aires Mar del Plata negocios",
    ],
    "punta_mogotes": [
        "Punta Mogotes Mar del Plata negocios",
    ],
    "sierra_de_los_padres": [
        "Sierra de los Padres negocios",
    ],
    "colon": [
        "Avenida Colón Mar del Plata negocios",
        "Avenida Colón Mar del Plata repuestos",
    ],
}

MAX_ITEMS_PER_QUERY = 120
DATA_DIR = "data"

NON_BUSINESS = re.compile(
    r"^(calle|avenida|av\.|pasaje|paseo|plaza|plaza\s+\d|rotonda|ruta|bulevar|blvd|"
    r"parque|playa|balneario|barrio|zona|cuadra|esquina|square|terminal|estaci[oó]n)\b",
    re.IGNORECASE,
)


def is_business_name(name):
    name = name.strip()
    if len(name) < 3:
        return False
    if NON_BUSINESS.match(name):
        return False
    return True


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
                "sentry-cdn",
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
    for _ in range(40):
        items = feed.query_selector_all("div[role='article']")
        if len(items) >= MAX_ITEMS_PER_QUERY:
            break
        if len(items) == seen:
            break
        seen = len(items)
        page.evaluate(
            """() => {
                const feed = document.querySelector("div[role='feed']");
                if (feed) feed.scrollTop = feed.scrollHeight;
                window.scrollTo(0, document.body.scrollHeight);
            }"""
        )
        page.wait_for_timeout(1500)
        feed = page.query_selector("div[role='feed']") or feed


def collect_place_urls(page):
    anchors = page.query_selector_all("a.hfpxzc")
    out = {}
    for a in anchors:
        href = a.get_attribute("href")
        label = a.get_attribute("aria-label")
        if href and label and is_business_name(label):
            out[href] = label
    return out


def load_done(path):
    done = set()
    if os.path.exists(path):
        with open(path, newline="", encoding="utf-8-sig") as f:
            for row in csv.DictReader(f):
                done.add(row["url"])
    return done


def run_zone(browser, zone, queries, done):
    out_path = os.path.join(DATA_DIR, f"google_maps_{zone}.csv")
    new_file = not os.path.exists(out_path)
    ctx = browser.new_context(
        locale="es-AR",
        user_agent=UA,
        viewport={"width": 1440, "height": 900},
        timezone_id="America/Argentina/Buenos_Aires",
    )
    ctx.add_init_script(STEALTH)
    page = ctx.new_page()

    all_places = {}
    for qi, q in enumerate(queries):
        try:
            url = "https://www.google.com/maps/search/" + q.replace(" ", "+") + "/?hl=es"
            page.goto(url, timeout=60000, wait_until="domcontentloaded")
            page.wait_for_timeout(7000)
            for _ in range(3):
                if page.query_selector("div[role='feed']"):
                    break
                page.wait_for_timeout(3000)
            scroll_feed(page)
            found = collect_place_urls(page)
            before = len(all_places)
            all_places.update(found)
            print(f"  [query {qi+1}/{len(queries)}] '{q}' -> {len(found)} lugares (total acumulado: {len(all_places)})")
            page.wait_for_timeout(2000)
        except Exception as e:
            print(f"  [query {qi+1}] ERR {str(e)[:80]}")
        time.sleep(1.5)

    pending = [h for h, n in all_places.items() if h not in done]
    print(f"  {zone}: {len(all_places)} lugares unicos, {len(pending)} pendientes")

    if pending:
        with open(out_path, "a", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(
                f,
                fieldnames=["zona", "nombre", "url", "direccion", "telefono", "web", "tiene_web"],
            )
            if new_file:
                writer.writeheader()

            for idx, href in enumerate(pending):
                preview = {}

                def on_response(resp):
                    if "maps/preview/place" in resp.url:
                        try:
                            preview["body"] = resp.text()
                        except Exception:
                            pass

                page.on("response", on_response)
                row = {"zona": zone, "nombre": all_places[href], "url": href, "direccion": "", "telefono": "", "web": "", "tiene_web": "NO"}
                for attempt in range(3):
                    try:
                        page.goto(href, timeout=45000, wait_until="domcontentloaded")
                        page.wait_for_timeout(5000)
                        if "body" in preview:
                            break
                    except Exception:
                        time.sleep(3)
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
                done.add(href)
                if (idx + 1) % 25 == 0:
                    print(f"    {idx+1}/{len(pending)} procesados")
                time.sleep(1.2 + (idx % 3) * 0.4)

    ctx.close()
    return len(pending)


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else None
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--lang=es-AR", "--disable-blink-features=AutomationControlled"])
        zones = {target: ZONES[target]} if target and target in ZONES else ZONES
        for zone, queries in zones.items():
            done = load_done(os.path.join(DATA_DIR, f"google_maps_{zone}.csv"))
            print(f"\n===== ZONA: {zone} =====")
            run_zone(browser, zone, queries, done)
        browser.close()


if __name__ == "__main__":
    main()
