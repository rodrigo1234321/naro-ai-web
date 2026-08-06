import os
import re
import csv
import time
import urllib3
import requests

urllib3.disable_warnings()

ZONES = {
    "ccguemes": ("guemes", "data/guemes_sitemap_urls.txt"),
    "ccmicrocentro": ("microcentro", "data/ccmicrocentro_sitemap_urls.txt"),
    "ccsierradelospadres": ("sierra_de_los_padres", "data/ccsierradelospadres_sitemap_urls.txt"),
}

CACHE_DIR = "data/pages"


def load_urls(path):
    with open(path, encoding="utf-8") as f:
        return [l.strip() for l in f if l.strip()]


LABEL_PATTERNS = [
    ("direccion", r"Direccion\s*:"),
    ("telefono", r"Tel[eé]?fono\s*:"),
    ("facebook", r"Facebook\s*:"),
    ("web", r"Web\s*:"),
    ("email", r"E-?[Mm]ail\s*:"),
    ("twitter", r"Twitter\s*:"),
]


def extract_fields(html):
    text = re.sub(r"<script.*?</script>", " ", html, flags=re.S)
    text = re.sub(r"<style.*?</style>", " ", text, flags=re.S)
    text = re.sub(r"<[^>]+>", "\n", text)
    text = re.sub(r"&#8217;|&#8211;|&nbsp;|&#160;", " ", text)
    text = re.sub(r"\s+", " ", text)

    positions = []
    for key, pat in LABEL_PATTERNS:
        for m in re.finditer(pat, text, re.I):
            positions.append((m.start(), m.end(), key))
    positions.sort()

    fields = {"direccion": "", "telefono": "", "facebook": "", "web": "", "email": "", "twitter": ""}
    for i, (start, end, key) in enumerate(positions):
        nxt = positions[i + 1][0] if i + 1 < len(positions) else len(text)
        val = text[end:nxt].strip()
        val = re.sub(r"^(Tel[eé]?fono|Facebook|Web|E-?[Mm]ail|Twitter)\s*:", "", val, re.I).strip()
        fields[key] = val
        if key == "email":
            m = re.search(r"[\w\.\-\+]+@[\w\.\-]+", val)
            fields[key] = m.group(0) if m else ""

    if not fields["telefono"]:
        m = re.search(r"(\b0?223[\s\-]?\d[\d\s\-]{6,}\d\b)", text)
        if m:
            fields["telefono"] = m.group(1).strip()

    return fields


def scrape_zone(key, zone, path):
    urls = load_urls(path)
    print(f"[{zone}] {len(urls)} URLs")
    out_path = f"data/directorio_{zone}.csv"
    exists = os.path.exists(out_path)
    seen = set()
    if exists:
        with open(out_path, newline="", encoding="utf-8-sig") as f:
            for row in csv.DictReader(f):
                seen.add(row["url"])

    mode = "a" if exists else "w"
    with open(out_path, mode, newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=["zona", "nombre", "url", "direccion", "telefono", "facebook", "web", "email"],
        )
        if mode == "w":
            writer.writeheader()
        for i, url in enumerate(urls):
            if url in seen:
                continue
            try:
                r = requests.get(url, timeout=25, verify=False)
                html = r.text
            except Exception as e:
                print(f"  {i+1}/{len(urls)} ERR {url} {str(e)[:50]}")
                continue
            title = re.search(r"<title>(.*?)</title>", html, re.S | re.I)
            nombre = title.group(1).strip() if title else url.rstrip("/").split("/")[-1]
            nombre = re.sub(r"\s*[–|-].*$", "", nombre).strip()
            fields = extract_fields(html)
            writer.writerow(
                {
                    "zona": zone,
                    "nombre": nombre,
                    "url": url,
                    "direccion": fields["direccion"],
                    "telefono": fields["telefono"],
                    "facebook": fields["facebook"],
                    "web": fields["web"],
                    "email": fields["email"],
                }
            )
            if (i + 1) % 50 == 0:
                f.flush()
                print(f"  {i+1}/{len(urls)} procesadas")
            time.sleep(0.2)
    print(f"[{zone}] listo -> {out_path}")


os.makedirs(CACHE_DIR, exist_ok=True)
for key, (zone, path) in ZONES.items():
    scrape_zone(key, zone, path)
