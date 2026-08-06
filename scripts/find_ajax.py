import json
from playwright.sync_api import sync_playwright

TARGETS = [
    ("ccalberti", "https://ccalberti.com.ar/comercios/"),
    ("ccplayagrande", "https://ccplayagrande.com.ar/comercios/"),
    ("cctalcahuano", "https://cctalcahuano.com.ar/comercios/"),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for name, url in TARGETS:
        print(f"\n=== {name} ===")
        page = browser.new_page()
        captured = []

        def on_response(response):
            ct = response.headers.get("content-type", "")
            if "json" in ct or "/wp-json" in response.url or "api" in response.url.lower():
                try:
                    body = response.text()
                except Exception:
                    body = ""
                captured.append({"url": response.url, "size": len(body), "body": body[:500]})

        page.on("response", on_response)
        try:
            page.goto(url, timeout=45000, wait_until="networkidle")
            page.wait_for_timeout(4000)
            for c in captured:
                print(f"  {c['url']} ({c['size']} bytes)")
                if c["body"]:
                    print(f"    {c['body'][:200]}")
        except Exception as e:
            print(f"  ERR {str(e)[:100]}")
        page.close()
    browser.close()
