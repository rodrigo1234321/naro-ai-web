import sys
import re
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

PLACE_URL = "https://www.google.com/maps/place/Trip+Store+Guemes/data=!4m7!3m6!1s0x9584dc3ac8f57af1:0xf4b61a667fa01c05!8m2!3d-38.0154668!4d-57.5414482!16s%2Fg%2F11c5s59ky0!19sChIJ8Xr1yDrchJURBRygf2YatvQ?authuser=0&hl=es&rclk=1"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--lang=es-AR"])
    ctx = browser.new_context(
        locale="es-AR",
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        viewport={"width": 1440, "height": 900},
    )
    page = ctx.new_page()
    preview = {}

    def on_response(resp):
        if "maps/preview/place" in resp.url:
            try:
                preview["body"] = resp.text()
            except Exception:
                pass

    page.on("response", on_response)
    page.goto(PLACE_URL, timeout=60000, wait_until="domcontentloaded")
    page.wait_for_timeout(12000)
    body = preview.get("body", "")
    print("BODY len:", len(body))

    with open("data/preview_sample.txt", "w", encoding="utf-8") as f:
        f.write(body)

    # probar extracciones
    m_addr = re.findall(r'\["([^"]{4,140}?)","(B\d{4})","[^"]*?"\]', body)
    print("ADDR regex:", m_addr[:3])

    phones = re.findall(r"(0\d{2,4}[\s\-]\d[\d\s\-]{5,}\d)", body)
    print("PHONES strict:", phones[:5])
    phones2 = re.findall(r"(\b0?\d{2,4}[\s\-]?\d[\d\s\-]{5,}\d\b)", body)
    print("PHONES loose:", phones2[:8])

    # mostrar contexto del telefono real
    for m in re.finditer(r"(\d{2,4}[\s\-]\d[\d\s\-]{5,}\d)", body):
        ctx2 = body[max(0, m.start()-60):m.end()+20]
        if "0223" in m.group(0) or "011" in m.group(0) or "223" in m.group(0):
            print("  CANDIDATO:", m.group(0), "| ctx:", ctx2.replace("\n", " ")[:110])
    browser.close()
