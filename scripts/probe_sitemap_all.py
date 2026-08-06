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

PATHS = [
    "/sitemap_index.xml",
    "/sitemap.xml",
    "/sitemap-index.xml",
    "/wp-sitemap.xml",
    "/sitemap_index.xml.gz",
]

for s in SITES:
    found = []
    for p in PATHS:
        try:
            r = requests.get("https://" + s + p, timeout=20, verify=False)
            if r.status_code == 200 and len(r.text) > 200:
                urls = re.findall(r"<loc>(.*?)</loc>", r.text)
                comm = [u for u in urls if "comercio" in u.lower()]
                found.append(f"{p}->{len(urls)}urls,{len(comm)}comercio")
        except Exception:
            pass
    print(s, "|", "; ".join(found) if found else "no sitemaps encontrados")
