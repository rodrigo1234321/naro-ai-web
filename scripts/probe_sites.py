import re
import urllib3
import requests

urllib3.disable_warnings()

SITES = [
    "ccalberti.com.ar",
    "ccconstitucion.com.ar",
    "ccguemes.com.ar",
    "ccjuanbjusto.com.ar",
    "ccmicrocentro.com.ar",
    "ccplayagrande.com.ar",
    "ccpuntamogotes.com.ar",
    "ccsanjuan.com.ar",
    "ccsierradelospadres.com.ar",
    "cctalcahuano.com.ar",
    "cctejedor.com.ar",
    "cc12deoctubre.com.ar",
]

for s in SITES:
    try:
        r = requests.get("https://" + s, timeout=25, verify=False)
        links = re.findall(r'href="([^"]*comercio[^"]*)"', r.text, re.I)
        uniq = list(dict.fromkeys(links))[:8]
        print(f"{s} | HTTP {r.status_code} | {uniq}")
    except Exception as e:
        print(f"{s} | ERROR | {str(e)[:100]}")
