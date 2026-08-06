import sys
import re
import urllib3
import requests
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")
urllib3.disable_warnings()

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
    "Accept-Language": "es-AR,es;q=0.9,en;q=0.8",
}

SEARCH = "https://www.google.com/maps/search/Grimoldi+Mar+del+Plata/?hl=es"

place_urls = []
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--lang=es-AR"])
    ctx = browser.new_context(locale="es-AR")
    page = ctx.new_page()
    page.goto(SEARCH, timeout=60000, wait_until="domcontentloaded")
    page.wait_for_timeout(9000)
    anchors = page.query_selector_all("a.hfpxzc")
    for a in anchors:
        href = a.get_attribute("href")
        if href:
            place_urls.append(href)
    browser.close()

print("PLACE URLS:", len(place_urls))
for u in place_urls[:3]:
    print("  ", u[:160])


def extract_web(html):
    m = re.search(r'window\.APP_INITIALIZATION_STATE\s*=\s*(\[)', html)
    if not m:
        return None
    start = m.start(1)
    depth = 0
    in_str = False
    esc = False
    for i in range(start, len(html)):
        c = html[i]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == '"':
                in_str = False
        else:
            if c == '"':
                in_str = True
            elif c == "[":
                depth += 1
            elif c == "]":
                depth -= 1
                if depth == 0:
                    blob = html[start : i + 1]
                    urls = re.findall(r"https?://[a-zA-Z0-9\.\-_/]{3,100}", blob)
                    unique = list(
                        dict.fromkeys(
                            u
                            for u in urls
                            if "google.com" not in u and "gstatic" not in u and "youtube" not in u and "googleusercontent" not in u and "googleapis" not in u and "g.co" not in u
                        )
                    )
                    return unique
    return None


for u in place_urls[:3]:
    full = u
    try:
        r = requests.get(full, headers=headers, timeout=30, verify=False)
        urls = extract_web(r.text)
        print(f"\nPLACE: {u[:60]}...")
        print("  STATUS:", r.status_code, "URLS:", urls[:6])
    except Exception as e:
        print("  ERR:", str(e)[:80])
