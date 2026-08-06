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
    for path in ["/comercios/", "/comercios", "/locales/", "/nuestros-comercios/"]:
        try:
            r = requests.get("https://" + s + path, timeout=25, verify=False)
            if r.status_code == 200:
                links = re.findall(r'href="([^"]*)"', r.text, re.I)
                inner = [
                    l
                    for l in dict.fromkeys(links)
                    if re.search(r"comercio|local", l, re.I) and "wp-json" not in l
                ]
                print(f"{s}{path} -> 200, links_comercio={inner[:6]}")
                break
            else:
                print(f"{s}{path} -> HTTP {r.status_code}")
        except Exception as e:
            print(f"{s}{path} -> ERR {str(e)[:60]}")
