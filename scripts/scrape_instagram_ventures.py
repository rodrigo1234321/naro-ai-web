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

# Búsquedas especializadas en Showrooms, Emprendimientos de Ropa/Camisetas, Comida a Domicilio e Instagram Shops
VENTURE_QUERIES = [
    ("Indumentaria y Showrooms", "showroom ropa Mar del Plata"),
    ("Indumentaria y Showrooms", "tienda online ropa Mar del Plata"),
    ("Indumentaria y Showrooms", "camisetas indumentaria Mar del Plata"),
    ("Indumentaria y Showrooms", "showroom calzados accesorios Mar del Plata"),
    ("Indumentaria y Showrooms", "lencería showroom Mar del Plata"),
    ("Gastronomía a Domicilio / Dark Kitchens", "viandas a domicilio Mar del Plata"),
    ("Gastronomía a Domicilio / Dark Kitchens", "comida casera a domicilio Mar del Plata"),
    ("Gastronomía a Domicilio / Dark Kitchens", "pasteleria artesanal a domicilio Mar del Plata"),
    ("Gastronomía a Domicilio / Dark Kitchens", "hamburgueseria delivery Mar del Plata"),
    ("Gastronomía a Domicilio / Dark Kitchens", "sushi delivery Mar del Plata"),
    ("Emprendimientos y Regalería", "regalos personalizados Mar del Plata"),
    ("Emprendimientos y Regalería", "sublimacion estampados Mar del Plata"),
    ("Emprendimientos y Regalería", "accesorios bijouterie Mar del Plata"),
    ("Emprendimientos y Regalería", "showroom Mar del Plata"),
]

MAX_ITEMS_PER_QUERY = 70
DATA_DIR = "data"


def extract_website_or_social(body):
    urls = re.findall(r"https?://[a-zA-Z0-9][a-zA-Z0-9\.\-_/]{2,120}", body)
    social_link = ""
    web_link = ""
    for u in urls:
        u_lower = u.lower()
        if "instagram.com" in u_lower or "linktr.ee" in u_lower or "facebook.com" in u_lower:
            if not social_link:
                social_link = u.rstrip(".,;")
            continue
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
                "googlesyndication",
                "doubleclick",
                "sentry.io",
            ]
        ):
            continue
        if any(ext in u_lower for ext in [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".css", ".js"]):
            continue
        if not web_link:
            web_link = u.rstrip(".,;")

    return web_link, social_link


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
    out_path = os.path.join(DATA_DIR, "scraped_instagram_ventures.csv")
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
                fieldnames=["categoria_venture", "nombre", "url", "direccion", "telefono", "web", "social", "solo_instagram"],
            )
            if new_file:
                writer.writeheader()

            for cat, q in VENTURE_QUERIES:
                print(f"\n[EMPRENDIMIENTOS INSTAGRAM] Buscando: '{q}' ({cat})...")
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
                    page.wait_for_timeout(4500)

                    for _ in range(3):
                        if page.query_selector("div[role='feed']"):
                            break
                        page.wait_for_timeout(1800)

                    scroll_feed(page)
                    found = collect_place_urls(page)
                    print(f" -> Encontrados: {len(found)} emprendimientos para '{q}'")

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
                            "categoria_venture": cat,
                            "nombre": found[href],
                            "url": href,
                            "direccion": "",
                            "telefono": "",
                            "web": "",
                            "social": "",
                            "solo_instagram": "SI",
                        }

                        for attempt in range(2):
                            try:
                                page.goto(href, timeout=30000, wait_until="domcontentloaded")
                                page.wait_for_timeout(3000)
                                if "body" in preview:
                                    break
                            except Exception:
                                time.sleep(2)

                        if "body" in preview:
                            body = preview["body"]
                            row["direccion"] = extract_address(body)
                            row["telefono"] = extract_phone(body)
                            web, social = extract_website_or_social(body)
                            row["web"] = web
                            row["social"] = social
                            row["solo_instagram"] = "SI" if (not web or "instagram" in web or "linktr" in web) else "NO"

                        writer.writerow(row)
                        f.flush()
                        done_urls.add(href)

                        if (idx + 1) % 15 == 0:
                            print(f"    {idx+1}/{len(pending)} procesados...")
                        time.sleep(1.0)

                except Exception as e:
                    print(f"  [ERROR] {q}: {str(e)[:80]}")

                ctx.close()
                time.sleep(1.2)

        browser.close()
        print("\n[EXITO] Extracción de Emprendimientos Instagram / Showrooms finalizada.")


if __name__ == "__main__":
    main()
