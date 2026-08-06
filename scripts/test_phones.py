import csv
import re
import sys
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

rows = list(csv.DictReader(open("data/google_maps_guemes.csv", encoding="utf-8")))
print("rows:", len(rows))

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--lang=es-AR"])
    ctx = browser.new_context(
        locale="es-AR",
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        viewport={"width": 1440, "height": 900},
    )
    page = ctx.new_page()

    def on_response(resp):
        if "maps/preview/place" in resp.url:
            try:
                preview["body"] = resp.text()
            except Exception:
                pass

    page.on("response", on_response)

    for r in rows[:10]:
        preview = {}
        try:
            page.goto(r["url"], timeout=45000, wait_until="domcontentloaded")
            page.wait_for_timeout(7000)
            body = preview.get("body", "")
            if not body:
                print(f"{r['nombre']}: NO BODY")
                continue
            phones = re.findall(r"((?:\(\d{2,4}\)\s?|\+\d{1,3}[\s-]?)?\d{2,4}[\s-]\d{3,4}[\s-]\d{3,4})", body)
            addr = re.findall(r'\["([^"]{4,140}?)","(B\d{4}[^"]+)"', body)
            print(f"{r['nombre']}: addr={addr[:1]} phone={phones[:3]}")
        except Exception as e:
            print(f"{r['nombre']}: ERR {str(e)[:60]}")
    browser.close()
