import re
from playwright.sync_api import sync_playwright

TESTS = [
    ("https://www.google.com/maps/search/tiendas+en+Mart%C3%ADn+Miguel+de+G%C3%BCemes+Mar+del+Plata/?hl=es", "tiendas en Guemes"),
    ("https://www.google.com/maps/search/negocios+G%C3%BCemes+Mar+del+Plata/?hl=es", "negocios Guemes"),
    ("https://www.google.com/maps/search/restaurantes+en+calle+G%C3%BCemes+Mar+del+Plata/?hl=es", "restaurantes Guemes"),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--lang=es-AR"])
    ctx = browser.new_context(
        locale="es-AR",
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        viewport={"width": 1440, "height": 900},
    )
    for url, label in TESTS:
        page = ctx.new_page()
        try:
            page.goto(url, timeout=60000, wait_until="domcontentloaded")
            page.wait_for_timeout(9000)
            feed = page.query_selector("div[role='feed']")
            cards = page.query_selector_all("a[href*='/maps/place/']")
            items = feed.query_selector_all("div[role='article']") if feed else []
            print(f"--- {label}")
            print(f"    url final: {page.url[:110]}")
            print(f"    feed: {bool(feed)}, items: {len(items)}, cards: {len(cards)}")
            if items:
                print("    primer item:", items[0].inner_text()[:150].replace('\n',' | '))
        except Exception as e:
            print(f"--- {label} ERR {str(e)[:80]}")
        page.close()
    browser.close()
