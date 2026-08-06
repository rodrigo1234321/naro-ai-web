import sys
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

    # elegir el item que es un negocio real (tiene teléfono o "· " con dirección)
    target = None
    for it in items:
        txt = it.inner_text()
        if "Calle Güemes" not in txt and "Atracción" not in txt:
            target = it
            break
    if not target and items:
        target = items[3] if len(items) > 3 else items[0]

    print("TARGET:", target.inner_text()[:120].replace("\n", " | ") if target else None)
    target.click()
    page.wait_for_timeout(5000)

    # buscar enlaces "Sitio web" o aria-label relacionados
    anchors = page.query_selector_all("a")
    web_links = []
    for a in anchors:
        label = (a.get_attribute("aria-label") or "")
        href = a.get_attribute("href") or ""
        txt = (a.inner_text() or "")[:40]
        if "Sitio web" in label or "Sitio web" in txt or (href and "http" in href and "google.com/maps" not in href and "googleusercontent" not in href and "accounts.google" not in href):
            web_links.append({"label": label, "href": href[:120], "txt": txt})
    print("WEB LINKS:", web_links[:5])

    # extraer texto del panel de detalle
    detail = page.query_selector("div[role='main']") or page.query_selector("body")
    text = detail.inner_text()
    print("URL ACTUAL:", page.url[:130])
    print("TEXTO PANEL:", text[:700].replace("\n", " | "))

    # buscar teléfono y dirección
    m_phone = re.search(r"(0?\d{2,4}[\s\-]?\d[\d\s\-]{5,}\d)", text)
    print("PHONE:", m_phone.group(1) if m_phone else None)
    page.screenshot(path="data/pilot_detail2.png")
    browser.close()
