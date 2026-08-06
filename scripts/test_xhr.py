import sys
import re
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
    hits = []

    def on_response(resp):
        if "rpc" in resp.url or "place" in resp.url.lower() or "batchexecute" in resp.url:
            try:
                body = resp.text()
            except Exception:
                body = ""
            if "grimoldi" in body.lower() or "http" in body and len(body) > 200:
                urls = re.findall(r"https?://[a-zA-Z0-9\.\-_/]{3,80}", body)
                ext = [u for u in urls if "google.com" not in u and "gstatic" not in u and "youtube" not in u and "googleusercontent" not in u and "googleapis" not in u]
                if ext or "grimoldi" in body.lower():
                    hits.append({"url": resp.url[:140], "len": len(body), "ext": ext[:5], "body_head": body[:200]})

    page.on("response", on_response)
    page.goto(PLACE_URL, timeout=60000, wait_until="domcontentloaded")
    page.wait_for_timeout(15000)

    print("HITS:", len(hits))
    for h in hits:
        print(f"\n  URL: {h['url']}")
        print(f"  LEN: {h['len']}")
        print(f"  EXT: {h['ext']}")
        print(f"  HEAD: {h['body_head'][:200]}")
    browser.close()
