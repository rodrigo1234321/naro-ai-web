import re
import urllib3
import requests

urllib3.disable_warnings()

SITES = [
    "ccalberti.com.ar",
    "ccconstitucion.com.ar",
    "ccjuanbjusto.com.ar",
    "ccplayagrande.com.ar",
    "ccpuntamogotes.com.ar",
    "ccsanjuan.com.ar",
    "cctalcahuano.com.ar",
    "cctejedor.com.ar",
    "cc12deoctubre.com.ar",
]

print("=== REST search API ===")
for s in SITES:
    try:
        r = requests.get(
            f"https://{s}/wp-json/wp/v2/search?search=comercio&per_page=20",
            timeout=20,
            verify=False,
        )
        if r.status_code == 200:
            data = r.json()
            print(f"{s}: {len(data)} resultados")
            for d in data[:3]:
                print(f"    {d.get('title','')[:40]} | {d.get('url','')}")
        else:
            print(f"{s}: HTTP {r.status_code}")
    except Exception as e:
        print(f"{s}: ERR {str(e)[:60]}")

print("\n=== NAV de home ===")
for s in SITES:
    try:
        r = requests.get(f"https://{s}/", timeout=20, verify=False)
        links = re.findall(r'href="([^"]+)"[^>]*>([^<]{1,50})</a>', r.text)
        nav = [l for l in links if l[1].strip()]
        print(f"{s}: {[f'{t.strip()}:{h}' for h, t in nav][:15]}")
    except Exception as e:
        print(f"{s}: ERR {str(e)[:60]}")
