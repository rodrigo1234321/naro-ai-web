import sys
import re
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

STEALTH = """
Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
Object.defineProperty(navigator, 'languages', {get: () => ['es-AR', 'es', 'en']});
Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});
window.chrome = {runtime: {}};
const origQuery = window.navigator.permissions && window.navigator.permissions.query;
if (window.navigator.permissions) {
  window.navigator.permissions.query = (parameters) => (
    parameters.name === 'notifications'
      ? Promise.resolve({state: Notification.permission})
      : origQuery(parameters)
  );
}
"""

URL = "https://www.google.com/maps/search/negocios+en+calle+G%C3%BCemes+Mar+del+Plata/?hl=es"

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        args=["--lang=es-AR", "--disable-blink-features=AutomationControlled", "--disable-gpu"],
    )
    ctx = browser.new_context(
        locale="es-AR",
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        viewport={"width": 1440, "height": 900},
        timezone_id="America/Argentina/Buenos_Aires",
    )
    ctx.add_init_script(STEALTH)
    page = ctx.new_page()
    page.goto(URL, timeout=60000, wait_until="domcontentloaded")
    page.wait_for_timeout(10000)

    anchors = page.query_selector_all("a.hfpxzc")
    print("anclas:", len(anchors))
    target = None
    for a in anchors:
        label = a.get_attribute("aria-label") or ""
        if label and "Calle" not in label:
            target = a
            print("CLICK:", label)
            break
    if not target and anchors:
        target = anchors[0]
        print("CLICK fallback:", target.get_attribute("aria-label"))

    target.click()
    h1 = None
    for t in range(10):
        page.wait_for_timeout(1500)
        h1 = page.query_selector("div[role='main'] h1")
        if h1 and "Resultados" not in h1.inner_text():
            break
    print("H1 FINAL:", h1.inner_text()[:60] if h1 else "N/A")
    print("URL:", page.url[:130])

    # detectar web buttons
    anchors_all = page.query_selector_all("a")
    for a in anchors_all:
        t = (a.inner_text() or "").strip()
        href = a.get_attribute("href") or ""
        if t.lower() == "sitio web":
            print("BOTON SITIO WEB ->", href[:130])
    page.screenshot(path="data/pilot_stealth.png")
    browser.close()
