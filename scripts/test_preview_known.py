import sys
import re
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

QUERIES = [
    ("Confitería Boston", "https://www.google.com/maps/search/Confiter%C3%ADa+Boston+Mar+del+Plata/?hl=es"),
    ("La Fonte D'Oro", "https://www.google.com/maps/search/La+Fonte+D%27Oro+Mar+del+Plata/?hl=es"),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--lang=es-AR"])
    ctx = browser.new_context(
        locale="es-AR",
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        viewport={"width": 1440, "height": 900},
    )
    for label, url in QUERIES:
        page = ctx.new_page()
        preview = {}

        def on_response(resp):
            if "maps/preview/place" in resp.url:
                try:
                    preview["body"] = resp.text()
                except Exception:
                    pass
            if "rpc/placeinfo" in resp.url:
                try:
                    preview["placeinfo"] = resp.text()
                except Exception:
                    pass

        page.on("response", on_response)
        page.goto(url, timeout=60000, wait_until="domcontentloaded")
        page.wait_for_timeout(15000)
        print(f"=== {label}")
        for k in ["body", "placeinfo"]:
            b = preview.get(k, "")
            urls = re.findall(r"https?://[a-zA-Z0-9\.\-_/]{3,90}", b)
            ext = list(dict.fromkeys(u for u in urls if "google.com" not in u and "gstatic" not in u and "youtube" not in u and "googleusercontent" not in u and "googleapis" not in u and "schema.org" not in u and "w3.org" not in u))
            print(f"  {k}: len={len(b)} EXT={ext}")
        page.close()
    browser.close()
