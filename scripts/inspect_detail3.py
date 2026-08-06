import sys
import re
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

URL = "https://www.google.com/maps/search/negocios+en+calle+G%C3%BCemes+Mar+del+Plata/?hl=es"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--lang=es-AR"])
    ctx = browser.new_context(
        locale="es-AR",
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        viewport={"width": 1440, "height": 900},
    )
    page = ctx.new_page()
    page.goto(URL, timeout=60000, wait_until="domcontentloaded")
    page.wait_for_timeout(9000)

    anchors = page.query_selector_all("a.hfpxzc")
    print("anclas:", len(anchors))
    target = None
    for a in anchors:
        label = a.get_attribute("aria-label") or ""
        if label and "Calle" not in label and "Paseo Güemes. Shopping" not in label:
            target = a
            print("CLICK:", label)
            break
    if not target and anchors:
        target = anchors[1]
        print("CLICK fallback:", target.get_attribute("aria-label"))

    target.click()
    for t in range(8):
        page.wait_for_timeout(1500)
        # comprobar si aparece el pane de detalle: buscar h1 o botones de acción
        h1 = page.query_selector("div[role='main'] h1")
        site_btn = page.query_selector("a[href*='http']:not([href*='google.com'])")
        if h1:
            print(f"  tras {(t+1)*1.5:.0f}s: h1={h1.inner_text()[:40]}")
            break
    page.wait_for_timeout(3000)

    txt = page.inner_text("body")
    print("URL:", page.url[:120])
    # buscar 'Sitio web' y botones
    web = page.query_selector_all("a")
    for a in web:
        t = (a.inner_text() or "").strip()
        href = a.get_attribute("href") or ""
        if t.lower() == "sitio web" or (t and href.startswith("http") and "google.com" not in href and "youtube" not in href and "support.google" not in href):
            print("WEB BUTTON:", t, "->", href[:120])
    # ver si hay pane de detalle
    for sel in ["h1", "button[aria-label*='Sitio web']", "a[aria-label*='Sitio web']", "button[jsaction*='place']"]:
        el = page.query_selector(sel)
        if el:
            print("SEL:", sel, "->", el.inner_text()[:80] if el.inner_text() else el.get_attribute("aria-label"))
    page.screenshot(path="data/pilot_detail3.png")
    browser.close()
