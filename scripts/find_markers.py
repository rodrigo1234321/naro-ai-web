import re
import urllib3
import requests

urllib3.disable_warnings()

for name, url in [
    ("ccalberti", "https://ccalberti.com.ar/comercios/"),
    ("ccplayagrande", "https://ccplayagrande.com.ar/comercios/"),
]:
    r = requests.get(url, timeout=25, verify=False)
    html = r.text
    print(f"=== {name} (len={len(html)}) ===")
    for pat, label in [
        (r"\.js\?[^\"]*", "scripts"),
        (r"new google\.maps\.Marker[^\n]{0,200}", "markers"),
        (r"var [a-zA-Z_]+ ?= ?\[", "js arrays"),
        (r"L\.geoJSON|geojson|kml|json", "geo hints"),
        (r"data-[a-z-]+=\"[^\"]+\"", "data attrs"),
    ]:
        found = list(set(re.findall(pat, html, re.I)))
        print(f"  {label}: {found[:6]}")
    # buscar lat/lng
    lats = re.findall(r"lat\s*[=:]\s*([-\d\.]+)", html)
    lngs = re.findall(r"lng\s*[=:]\s*([-\d\.]+)", html)
    print(f"  lats={lats[:5]} lngs={lngs[:5]}")
