import sys
import json
import re
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

    feed = page.query_selector("div[role='feed']")
    items = feed.query_selector_all("div[role='article']") if feed else []
    print("ITEMS:", len(items))
    for i, it in enumerate(items[:3]):
        print(f"\n--- ITEM {i}")
        print("HTML:", it.inner_html()[:600].replace("\n", " "))
        print("TEXT:", it.inner_text()[:250].replace("\n", " | "))

    # click en el primero para ver panel de detalle
    if items:
        items[0].click()
        page.wait_for_timeout(4000)
        print("\n=== DESPUES DE CLICK ===")
        # panel de detalle suele tener aria-label con el nombre y un contenedor de acciones
        main = page.query_selector("div[role='main']")
        text = main.inner_text()[:1500].replace("\n", " | ") if main else "no main"
        print("TEXT MAIN:", text)
        links = page.query_selector_all("div[role='main'] a")
        hrefs = [l.get_attribute("href") for l in links if l.get_attribute("href")]
        print("LINKS:", [h[:100] for h in hrefs if "google.com" not in h][:10])

    page.screenshot(path="data/pilot_detail.png")
    browser.close()
