import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

URL = "https://www.google.com/maps/search/calle+G%C3%BCemes+Mar+del+Plata+negocios/?hl=es"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--lang=es-AR"])
    ctx = browser.new_context(
        locale="es-AR",
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        viewport={"width": 1440, "height": 900},
    )
    page = ctx.new_page()
    page.goto(URL, timeout=60000, wait_until="domcontentloaded")
    page.wait_for_timeout(10000)

    feed = page.query_selector("div[role='feed']")
    print("feed:", bool(feed))
    if feed:
        # scroll del contenedor via JS
        for i in range(15):
            page.evaluate(
                """() => {
                    const feed = document.querySelector("div[role='feed']");
                    if (feed) feed.scrollTop = feed.scrollHeight;
                    window.scrollTo(0, document.body.scrollHeight);
                }"""
            )
            page.wait_for_timeout(1500)
            items = feed.query_selector_all("div[role='article']")
            print(f"  iter {i}: {len(items)} items")
            if len(items) > 20:
                break
    browser.close()
