import re
import urllib3
import requests

urllib3.disable_warnings()

r = requests.get("https://ccalberti.com.ar/comercios/", timeout=25, verify=False)
html = r.text
print("len:", len(html))

patterns = [
    (r"wp\.apiFetch|apiFetch|/wp-json/[^\"']+", "wp-json refs"),
    (r"var [a-zA-Z_]+ ?= ?(\{|\"|\[|')", "js vars"),
    (r"data-[a-z-]+=\"[^\"]*\"", "data attrs"),
    (r"comercios/[a-z0-9-]+", "comercio slugs"),
    (r"/wp-content/uploads/[^\"' ]+", "uploads"),
    (r"Direccion", "direccion field"),
    (r"elementor", "elementor"),
    (r"jet-|jquery|ajax", "ajax hints"),
]

for pat, label in patterns:
    found = re.findall(pat, html, re.I)
    print(f"--- {label}: {len(found)}")
    for f in list(set(found))[:8]:
        print("   ", f[:100])

# Buscar si hay listado de items en script json embebido
m = re.findall(r"<script[^>]*application/json[^>]*>(.*?)</script>", html, re.S)
print("--- json scripts:", len(m))
for x in m[:3]:
    print("    ", x[:300])
