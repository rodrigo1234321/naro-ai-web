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
print("STATUS:", r.status_code, "len:", len(r.text))
html = r.text

# buscar ld+json
ld = re.findall(r"<script type=\"application/ld\+json\">(.*?)</script>", html, re.S)
print("LD+JSON blocks:", len(ld))
for x in ld[:3]:
    try:
        d = json.loads(x)
        print("  keys:", list(d.keys()) if isinstance(d, dict) else type(d))
        print("  ", json.dumps(d, ensure_ascii=False)[:500])
    except Exception as e:
        print("  parse err", str(e)[:60])

# buscar hrefs de web externa
ext = re.findall(r'href="(https?://[^"]*)"', html)
non_google = [h for h in ext if "google.com" not in h and "gstatic" not in h and "youtube" not in h]
print("LINKS EXTERNOS:", non_google[:10])

# buscar en JSON embebido window.APP_INITIALIZATION_STATE o similar
for key in ["APP_INITIALIZATION_STATE", "window.APP_FLAGS", "AF_initDataCallback"]:
    m = re.search(re.escape(key), html)
    print(f"  contiene {key}:", bool(m))
