import re
import urllib3
import requests

urllib3.disable_warnings()

JOBS = [
    ("ccplayagrande", "https://ccplayagrande.com.ar/comercios/"),
    ("ccjuanbjusto_home", "https://ccjuanbjusto.com.ar/"),
    ("ccjuanbjusto_listing", "https://ccjuanbjusto.com.ar/novedades/comercios/"),
    ("ccalberti", "https://ccalberti.com.ar/comercios/"),
    ("cctalcahuano", "https://cctalcahuano.com.ar/comercios/"),
]

for name, url in JOBS:
    try:
        r = requests.get(url, timeout=25, verify=False)
        html = r.text
        links = re.findall(r'href="([^"]+)"', html)
        comm = [l for l in links if re.search(r"comercio", l, re.I)]
        # también buscar enlaces absolutos a dominios del propio sitio que no sean nav
        print(f"=== {name} (len={len(html)}) ===")
        print("  links con 'comercio':", len(set(comm)))
        for l in list(set(comm))[:8]:
            print("   ", l)
        # Buscar posibles tarjetas de negocio en el HTML
        cards = re.findall(r'class="([^"]*card[^"]*)"', html)
        print("  clases card:", list(set(cards))[:6])
    except Exception as e:
        print(f"=== {name} === ERR {str(e)[:80]}")
