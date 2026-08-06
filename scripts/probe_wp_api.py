import json
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
        r = requests.get("https://" + s + "/wp-json/wp/v2/types", timeout=25, verify=False)
        if r.status_code == 200:
            types = r.json()
            interesting = {k: v["rest_base"] for k, v in types.items() if "comercio" in k or "local" in k or "negocio" in k}
            all_types = list(types.keys())
            print(f"{s} | tipos={len(all_types)} | comercio-related={interesting}")
        else:
            print(f"{s} | wp-json HTTP {r.status_code}")
    except Exception as e:
        print(f"{s} | ERR {str(e)[:80]}")
