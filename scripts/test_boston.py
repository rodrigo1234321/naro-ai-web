import sys
import re
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

SEARCH = "https://www.google.com/maps/search/Confiter%C3%ADa+Boston+G%C3%BCemes+Mar+del+Plata/?hl=es"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--lang=es-AR"])
    ctx = browser.new_context(
        locale="es-AR",
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        viewport={"width": 1440, "height": 900},
    )
    page = ctx.new_page()
    page.goto(SEARCH, timeout=60000, wait_until="domcontentloaded")
    page.wait_for_timeout(10000)

    anchors = page.query_selector_all("a.hfpxzc")
    print("ANCHORS:", len(anchors))
    hrefs = []
    for a in anchors:
        href = a.get_attribute("href")
        label = a.get_attribute("aria-label")
        if href:
            hrefs.append((label, href))
            print("  ", (label or "")[:40], "|", href[:110])

    # navegar al primer resultado de negocio real
    place_href = hrefs[0][1] if hrefs else None
    print("\nNAVEGANDO A:", place_href[:120] if place_href else "NADA")

    preview = {}

    def on_response(resp):
        if "maps/preview/place" in resp.url or "rpc/placeinfo" in resp.url:
            try:
                preview[resp.url[:80]] = resp.text()
            except Exception:
                pass

    page.on("response", on_response)
    if place_href:
        page.goto(place_href, timeout=60000, wait_until="domcontentloaded")
        page.wait_for_timeout(15000)

    print("PREVIEW RESPONSES:", len(preview))
    for k, b in preview.items():
        urls = re.findall(r"https?://[a-zA-Z0-9\.\-_/]{3,90}", b)
        ext = list(dict.fromkeys(u for u in urls if "google.com" not in u and "gstatic" not in u and "youtube" not in u and "googleusercontent" not in u and "googleapis" not in u and "schema.org" not in u and "w3.org" not in u and "ggpht" not in u))
        print(f"  {k}: len={len(b)} EXT={ext}")
        if ext:
            print("  HEAD:", b[:300])
    browser.close()
