import sys
import re
import json
import urllib3
import requests

sys.stdout.reconfigure(encoding="utf-8")
urllib3.disable_warnings()

PLACE_URL = "https://www.google.com/maps/place/Paseo+G%C3%BCemes/data=!4m7!3m6!1s0x9584dc3b1b2e345b:0x41718958aa633d14!8m2!3d-38.014182!4d-57.5407091!16s%2Fg%2F11cks65s0p!19sChIJWzQuGzvchJURFD1jqliJcUE?authuser=0&hl=es&rclk=1"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
    "Accept-Language": "es-AR,es;q=0.9,en;q=0.8",
}
r = requests.get(PLACE_URL, headers=headers, timeout=30, verify=False)
html = r.text

# extraer APP_INITIALIZATION_STATE (puede ser muy grande)
m = re.search(r'window\.APP_INITIALIZATION_STATE\s*=\s*(\[.*?\]);', html, re.S)
if m:
    blob = m.group(1)
    print("BLOB len:", len(blob))
    urls = re.findall(r'https?://[a-zA-Z0-9\.\-_]+[^\s"\\,\]\}]*', blob)
    unique = list(dict.fromkeys(u for u in urls if "google.com" not in u and "gstatic" not in u and "youtube" not in u and "googleusercontent" not in u and "googleapis" not in u))
    print("URLS EXTERNAS en blob:", len(unique))
    for u in unique[:15]:
        print("   ", u[:120])
else:
    print("no APP_INITIALIZATION_STATE")
