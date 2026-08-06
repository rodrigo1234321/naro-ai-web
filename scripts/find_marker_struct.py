import re
import urllib3
import requests

urllib3.disable_warnings()

r = requests.get("https://ccalberti.com.ar/comercios/", timeout=30, verify=False)
html = r.text

for pat in [r"acf-map", r"\.marker", r"marker", r"data-lat", r"data-lng", r"info-window", r"iw-content"]:
    ms = [m.start() for m in re.finditer(pat, html)]
    print(f"--- '{pat}': {len(ms)} ocurrencias")
    for pos in ms[:3]:
        seg = html[max(0, pos - 200): pos + 300]
        seg = re.sub(r"\s+", " ", seg)
        print("    ...", seg[:380])
