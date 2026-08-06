import re
import csv
import urllib3
import requests

urllib3.disable_warnings()

TARGETS = [
    ("alberti", "https://ccalberti.com.ar/comercios/"),
    ("playa_grande", "https://ccplayagrande.com.ar/comercios/"),
    ("talcahuano", "https://cctalcahuano.com.ar/comercios/"),
]

for zone, url in TARGETS:
    try:
        r = requests.get(url, timeout=30, verify=False)
        html = r.text
    except Exception as e:
        print(f"{zone}: ERR {str(e)[:80]}")
        continue

    markers = re.findall(
        r'<div[^>]*class="[^"]*marker[^"]*"[^>]*>(.*?)</div>\s*</div>', html, re.S
    )
    if not markers:
        markers = re.findall(r'class="[^"]*marker[^"]*"[^>]*>(.*?)</div>', html, re.S)

    print(f"\n=== {zone}: {len(markers)} markers ===")
    rows = []
    for mk in markers:
        lat = re.search(r'data-lat="([^"]+)"', mk)
        lng = re.search(r'data-lng="([^"]+)"', mk)
        content = re.sub(r"<br\s*/?>", " | ", mk)
        content = re.sub(r"<[^>]+>", " ", content)
        content = re.sub(r"&nbsp;|&#160;", " ", content)
        content = re.sub(r"\s+", " ", content).strip()
        web = re.search(r'<a[^>]+href="(https?://[^"]+)"', mk)
        rows.append(
            {
                "zona": zone,
                "nombre": content.split("|")[0].strip() if content else "",
                "web": web.group(1) if web else "",
                "lat": lat.group(1) if lat else "",
                "lng": lng.group(1) if lng else "",
                "contenido": content[:300],
            }
        )
    for row in rows[:8]:
        print(f"  {row['nombre'][:35]} | web={row['web']} | {row['contenido'][:80]}")
    if rows:
        out = f"data/directorio_{zone}.csv"
        with open(out, "w", newline="", encoding="utf-8-sig") as f:
            w = csv.DictWriter(f, fieldnames=["zona", "nombre", "web", "lat", "lng", "contenido"])
            w.writeheader()
            w.writerows(rows)
        print(f"  guardado -> {out}")
    else:
        print("  NO se encontraron markers (revisar estructura HTML)")
