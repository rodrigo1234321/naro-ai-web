import json
import re
from playwright.sync_api import sync_playwright

TARGETS = [
    ("alberti", "https://ccalberti.com.ar/comercios/"),
    ("playa_grande", "https://ccplayagrande.com.ar/comercios/"),
    ("talcahuano", "https://cctalcahuano.com.ar/comercios/"),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for zone, url in TARGETS:
        print(f"\n=== {zone} ===")
        page = browser.new_page()
        api_calls = []

        def on_response(resp):
            if "/wp-json/" in resp.url or "admin-ajax" in resp.url:
                try:
                    api_calls.append({"url": resp.url, "body": resp.text()[:2000]})
                except Exception:
                    pass

        page.on("response", on_response)
        try:
            page.goto(url, timeout=60000, wait_until="networkidle")
            page.wait_for_timeout(5000)
        except Exception as e:
            print(f"  goto ERR {str(e)[:80]}")
            page.close()
            continue

        markers = page.eval_on_selector_all(
            ".marker",
            "els => els.map(e => ({html: e.outerHTML, lat: e.getAttribute('data-lat'), lng: e.getAttribute('data-lng')}))",
        )
        print(f"  markers en DOM: {len(markers)}")
        for mk in markers[:5]:
            txt = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", mk["html"]))[:150]
            print(f"    lat={mk['lat']} lng={mk['lng']} | {txt}")
        print(f"  llamadas api: {len(api_calls)}")
        for a in api_calls[:5]:
            print(f"    {a['url'][:120]} | {a['body'][:150]}")
        page.close()
    browser.close()
