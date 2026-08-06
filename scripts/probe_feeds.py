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
    for path in ["/comercios/feed/", "/feed/", "/novedades/comercios/feed/"]:
        try:
            r = requests.get("https://" + s + path, timeout=25, verify=False)
            if r.status_code == 200 and "<rss" in r.text.lower():
                titles = re.findall(r"<item>(.*?)</item>", r.text, re.S)
                first = ""
                if titles:
                    t = re.search(r"<title>(.*?)</title>", titles[0], re.S)
                    if t:
                        first = t.group(1).strip()
                print(f"{s}{path} -> RSS OK, {len(titles)} items | primero={first[:50]}")
                break
            else:
                print(f"{s}{path} -> HTTP {r.status_code} (no rss)")
        except Exception as e:
            print(f"{s}{path} -> ERR {str(e)[:60]}")
