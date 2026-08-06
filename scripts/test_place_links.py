import sys
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
    page.goto(PLACE_URL, timeout=60000, wait_until="domcontentloaded")
    page.wait_for_timeout(12000)

    anchors = page.query_selector_all("a")
    print("TOTAL ANCHORS:", len(anchors))
    for a in anchors:
        href = a.get_attribute("href") or ""
        aria = a.get_attribute("aria-label") or ""
        t = (a.inner_text() or "").strip()
        if href.startswith("http") and "google.com" not in href and "youtube" not in href and "support.google" not in href and "gstatic" not in href:
            print(f"  EXT: aria={aria!r} text={t!r} href={href[:130]}")

    # todos los botones con aria-label
    btns = page.query_selector_all("button, [role='button']")
    for b in btns:
        aria = b.get_attribute("aria-label") or ""
        if aria and ("sitio" in aria.lower() or "web" in aria.lower() or "llamar" in aria.lower()):
            print("  BTN:", aria)
    browser.close()
