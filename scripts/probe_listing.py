import re
import urllib3
import requests

urllib3.disable_warnings()

URLS = [
    "https://ccguemes.com.ar/novedades/comercios/",
    "https://ccplayagrande.com.ar/comercios/",
    "https://ccalberti.com.ar/comercios/",
    "https://ccjuanbjusto.com.ar/novedades/comercios/",
    "https://cctejedor.com.ar/novedades/comercios/",
]

for u in URLS:
    try:
        r = requests.get(u, timeout=25, verify=False)
        print(f"\n=== {u} (len={len(r.text)}) ===")
        if "feed" in r.text:
            print("  tiene feed")
        links = re.findall(r'href="([^"]*comercios/[a-z0-9\-]+/?)"', r.text, re.I)
        uniq = list(dict.fromkeys(links))
        print(f"  links comercios-individuales ({len(uniq)}): {uniq[:8]}")
        # buscar patrones de grilla/listado
        for m in re.findall(r'class="([^"]*(?:comercio|local|negocio)[^"]*)"', r.text, re.I)[:8]:
            print("  class:", m)
        if len(uniq) == 0:
            posts = re.findall(r'<a[^>]+href="([^"]+)"[^>]*>([^<]{2,60})</a>', r.text)
            localish = [p for p in posts if re.search(r"comercio|local|\.com\.ar/", p[0], re.I)]
            print(f"  candidatos genericos: {localish[:10]}")
    except Exception as e:
        print(f"\n=== {u} ===\n  ERR {str(e)[:80]}")
