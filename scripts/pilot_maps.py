import json
import re
from playwright.sync_api import sync_playwright

QUERY = "locales calle Güemes Mar del Plata"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--lang=es-AR"])
    ctx = browser.new_context(
        locale="es-AR",
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        viewport={"width": 1440, "height": 900},
    )
    page = ctx.new_page()
    page.goto(f"https://www.google.com/maps/search/{QUERY.replace(' ', '+')}", timeout=60000, wait_until="domcontentloaded")
    page.wait_for_timeout(8000)
    print("TITLE:", page.title())
    print("URL:", page.url)

    feed = page.query_selector("div[role='feed']")
    print("FEED presente:", bool(feed))
    if feed:
        items = feed.query_selector_all("div[role='article']")
        print("ITEMS:", len(items))
        if items:
            for it in items[:3]:
                txt = it.inner_text()[:200].replace("\n", " | ")
                print("  ITEM:", txt)

    # snapshot de la estructura de un resultado
    cards = page.query_selector_all("a[href*='/maps/place/']")
    print("CARDS con href place:", len(cards))
    if cards:
        for c in cards[:3]:
            print("  href:", c.get_attribute("href")[:150])
            print("  inner:", c.inner_text()[:150].replace("\n", " | "))
    page.screenshot(path="data/pilot_guemes.png", full_page=False)
    browser.close()
