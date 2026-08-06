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
        r = requests.get("https://" + s + "/wp-sitemap.xml", timeout=25, verify=False)
        if r.status_code == 200:
            urls = re.findall(r"<loc>(.*?)</loc>", r.text)
            comercio = [u for u in urls if "comercio" in u.lower()]
            print(f"{s} | sitemap OK, {len(urls)} urls | comercio-sitemaps={comercio}")
        else:
            print(f"{s} | wp-sitemap HTTP {r.status_code}")
    except Exception as e:
        print(f"{s} | ERR {str(e)[:60]}")
