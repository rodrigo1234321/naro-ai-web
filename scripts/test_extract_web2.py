import sys
import re
import json
import urllib3
import requests

sys.stdout.reconfigure(encoding="utf-8")
urllib3.disable_warnings()

PLACES = [
    ("Grimoldi Guemes", "https://www.google.com/maps/search/Grimoldi+G%C3%BCemes+Mar+del+Plata/?hl=es"),
    ("Paseo Güemes", "https://www.google.com/maps/search/Paseo+G%C3%BCemes+Mar+del+Plata/?hl=es"),
    ("Confiteria Boston", "https://www.google.com/maps/search/Confiter%C3%ADa+Boston+G%C3%BCemes+Mar+del+Plata/?hl=es"),
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
    "Accept-Language": "es-AR,es;q=0.9,en;q=0.8",
}


def extract_state(html):
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
                    return html[start : i + 1]
    return None


for label, url in PLACES:
    r = requests.get(url, headers=headers, timeout=30, verify=False)
    blob = extract_state(r.text)
    print(f"=== {label}: blob={len(blob) if blob else 0}")
    if blob:
        urls = re.findall(r"https?://[a-zA-Z0-9\.\-_/]{3,100}", blob)
        unique = list(
            dict.fromkeys(
                u
                for u in urls
                if "google.com" not in u and "gstatic" not in u and "youtube" not in u and "googleusercontent" not in u and "googleapis" not in u
            )
        )
        print("   URLS:", unique[:8])
