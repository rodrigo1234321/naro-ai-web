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
        r = requests.get(
            f"https://{s}/wp-json/wp/v2/comercios?per_page=5",
            timeout=25,
            verify=False,
        )
        if r.status_code == 200:
            data = r.json()
            total = r.headers.get("X-WP-Total", "?")
            first = ""
            if data:
                first = data[0].get("slug", "")
                if not first and "content" in data[0]:
                    txt = re.sub(r"<[^>]+>", " ", data[0]["content"]["rendered"])
                    first = txt[:60]
            print(f"{s} | comercios API OK | total={total} | primero={first}")
        elif r.status_code == 400:
            print(f"{s} | comercios API HTTP 400 (tipo no publico)")
        else:
            print(f"{s} | comercios API HTTP {r.status_code}")
    except Exception as e:
        print(f"{s} | ERR {str(e)[:80]}")
