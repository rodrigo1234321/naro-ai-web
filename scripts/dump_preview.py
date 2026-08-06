import sys
import re
import json
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

PLACE_URL = "https://www.google.com/maps/place/Grimoldi+Guemes+Mar+del+Plata/data=!4m7!3m6!1s0x9584dc3b0fb6a9fb:0x72fc056b2519776f!8m2!3d-38.0130165!4d-57.5397708!16s%2Fg%2F11bwznd1qv!19sChIJ-6m2DztchJURb3cZJWwF_3I?authuser=0&hl=es&rclk=1"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--lang=es-AR"])
    ctx = browser.new_context(
        locale="es-AR",
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        viewport={"width": 1440, "height": 900},
    )
    page = ctx.new_page()
    captured = {}

    def on_response(resp):
        if "maps/preview/place" in resp.url:
            try:
                captured["preview"] = resp.text()
            except Exception as e:
                captured["preview"] = f"ERR {e}"

    page.on("response", on_response)
    page.goto(PLACE_URL, timeout=60000, wait_until="domcontentloaded")
    page.wait_for_timeout(15000)

    body = captured.get("preview", "")
    print("BODY len:", len(body))
    if body:
        # quitar prefijo )]}'
        clean = body.strip()
        if clean.startswith(")]}'"):
            clean = clean[4:]
        try:
            data = json.loads(clean)
            print("JSON parsed, tipo:", type(data), "len:", len(data) if isinstance(data, list) else "?")
        except Exception as e:
            print("JSON parse error:", str(e)[:100])
            data = None
        # buscar todas las URLs http no-google
        urls = re.findall(r"https?://[a-zA-Z0-9\.\-_/]{3,90}", body)
        ext = list(dict.fromkeys(u for u in urls if "google.com" not in u and "gstatic" not in u and "youtube" not in u and "googleusercontent" not in u and "googleapis" not in u and "schema.org" not in u))
        print("EXT URLS:", ext)
        # dump primeros 4000 chars
        print("\nHEAD:", body[:3000])
    browser.close()
