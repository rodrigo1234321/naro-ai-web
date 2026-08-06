import re
import csv
import glob
import urllib.parse


def clean_web(val):
    val = val.strip()
    if not val:
        return ""
    m = re.search(r"https?://[^\s;\"']+", val)
    if m:
        return m.group(0).rstrip(".,)")
    if re.match(r"^www\.[^\s]+", val):
        return "http://" + val.split()[0]
    return val.split()[0] if val.split() else val


def clean_facebook(val):
    val = val.strip()
    if not val:
        return ""
    m = re.search(r"https?://(www\.)?facebook\.com/\S+", val)
    if m:
        return m.group(0).rstrip(".,)")
    return val


for path in glob.glob("data/directorio_*.csv"):
    with open(path, newline="", encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))
    changed = 0
    for row in rows:
        w = clean_web(row.get("web", ""))
        if w != row.get("web", "").strip():
            row["web"] = w
            changed += 1
        fb = clean_facebook(row.get("facebook", ""))
        row["facebook"] = fb
    with open(path, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    print(f"{path}: {len(rows)} filas, {changed} web limpiadas")

# Resumen rápido por zona
print("\n=== RESUMEN ===")
for path in sorted(glob.glob("data/directorio_*.csv")):
    with open(path, newline="", encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))
    total = len(rows)
    with_web = sum(1 for r in rows if r.get("web", "").strip())
    with_fb = sum(1 for r in rows if r.get("facebook", "").strip())
    print(f"{path}: {total} negocios | con web: {with_web} ({100*with_web/total:.0f}%) | con facebook: {with_fb}")
