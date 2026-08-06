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

    print("URL:", page.url[:140])
    h1 = page.query_selector("div[role='main'] h1")
    print("H1:", h1.inner_text()[:60] if h1 else "N/A")

    # buscar 'Sitio web'
    found = page.query_selector_all("a")
    for a in found:
        t = (a.inner_text() or "").strip()
        href = a.get_attribute("href") or ""
        if t.lower() == "sitio web" or (href.startswith("http") and "google.com" not in href and "youtube" not in href and "support.google" not in href):
            print("LINK:", repr(t), "->", href[:130])

    # buscar teléfono
    txt = page.inner_text("div[role='main']") if page.query_selector("div[role='main']") else page.inner_text("body")
    import re
    m = re.search(r"(0?\d{2,4}[\s\-]?\d[\d\s\-]{5,}\d)", txt)
    print("PHONE:", m.group(1) if m else None)
    print("TXT:", txt[:400].replace("\n", " | "))
    page.screenshot(path="data/pilot_place_direct.png")
    browser.close()
