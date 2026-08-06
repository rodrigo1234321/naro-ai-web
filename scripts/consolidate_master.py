import os
import re
import csv
import glob


def clean_str(s):
    if not s:
        return ""
    return re.sub(r"\s+", " ", str(s)).strip()


def normalize_name(name):
    name = clean_str(name)
    name = re.sub(r"\s*[–|-].*$", "", name).strip()
    return name


def normalize_phone(phone):
    phone = clean_str(phone)
    if not phone:
        return ""
    digits = re.sub(r"\D", "", phone)
    if len(digits) >= 8:
        if digits.startswith("549223"):
            return f"+54 9 223 {digits[6:]}"
        elif digits.startswith("223"):
            return f"0223 {digits[3:]}"
        elif digits.startswith("0223"):
            return f"0223 {digits[4:]}"
    return phone


def consolidate():
    data_dir = "data"
    out_path = os.path.join(data_dir, "master_comercios_mdp.csv")

    records = []
    seen_keys = set()

    dir_files = glob.glob(os.path.join(data_dir, "directorio_*.csv"))
    for filepath in dir_files:
        with open(filepath, newline="", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            for row in reader:
                nombre = normalize_name(row.get("nombre", ""))
                zona = clean_str(row.get("zona", "")).replace("_", " ").title()
                web = clean_str(row.get("web", ""))
                fb = clean_str(row.get("facebook", ""))
                email = clean_str(row.get("email", ""))
                telefono = normalize_phone(row.get("telefono", ""))
                direccion = clean_str(row.get("direccion", ""))
                url = clean_str(row.get("url", ""))

                if not nombre or len(nombre) < 2:
                    continue

                key = (nombre.lower(), zona.lower())
                if key in seen_keys:
                    continue
                seen_keys.add(key)

                tiene_web = "SI" if web and ("http" in web or "www." in web) else "NO"

                records.append(
                    {
                        "zona": zona,
                        "nombre": nombre,
                        "fuente": "Directorio CCCA",
                        "direccion": direccion,
                        "telefono": telefono,
                        "web": web,
                        "tiene_web": tiene_web,
                        "facebook": fb,
                        "email": email,
                        "url_origen": url,
                    }
                )

    gmaps_files = glob.glob(os.path.join(data_dir, "google_maps_*.csv"))
    for filepath in gmaps_files:
        with open(filepath, newline="", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            for row in reader:
                nombre = normalize_name(row.get("nombre", ""))
                zona = clean_str(row.get("zona", "")).replace("_", " ").title()
                web = clean_str(row.get("web", ""))
                telefono = normalize_phone(row.get("telefono", ""))
                direccion = clean_str(row.get("direccion", ""))
                url = clean_str(row.get("url", ""))

                if not nombre or len(nombre) < 2:
                    continue

                key = (nombre.lower(), zona.lower())
                if key in seen_keys:
                    for rec in records:
                        if (rec["nombre"].lower(), rec["zona"].lower()) == key:
                            if not rec["telefono"] and telefono:
                                rec["telefono"] = telefono
                            if not rec["direccion"] and direccion:
                                rec["direccion"] = direccion
                            if rec["tiene_web"] == "NO" and web:
                                rec["web"] = web
                                rec["tiene_web"] = "SI"
                    continue

                seen_keys.add(key)
                tiene_web = "SI" if web and ("http" in web or "www." in web) else "NO"

                records.append(
                    {
                        "zona": zona,
                        "nombre": nombre,
                        "fuente": "Google Maps",
                        "direccion": direccion,
                        "telefono": telefono,
                        "web": web,
                        "tiene_web": tiene_web,
                        "facebook": "",
                        "email": "",
                        "url_origen": url,
                    }
                )

    for idx, rec in enumerate(records, start=1):
        rec["id"] = f"MDP-{idx:04d}"

    fieldnames = [
        "id",
        "zona",
        "nombre",
        "fuente",
        "direccion",
        "telefono",
        "web",
        "tiene_web",
        "facebook",
        "email",
        "url_origen",
    ]

    with open(out_path, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(records)

    print(f"[EXITO] Consolidación completada: {len(records)} comercios procesados -> {out_path}")

    stats = {}
    for r in records:
        z = r["zona"]
        if z not in stats:
            stats[z] = {"total": 0, "con_web": 0, "con_tel": 0}
        stats[z]["total"] += 1
        if r["tiene_web"] == "SI":
            stats[z]["con_web"] += 1
        if r["telefono"]:
            stats[z]["con_tel"] += 1

    print("\n=== RESUMEN MAESTRO POR ZONA ===")
    for z, s in sorted(stats.items()):
        total = s["total"]
        web_pct = (s["con_web"] / total * 100) if total else 0
        tel_pct = (s["con_tel"] / total * 100) if total else 0
        print(f" • {z}: {total} comercios | Con Web: {s['con_web']} ({web_pct:.1f}%) | Con Teléfono: {s['con_tel']} ({tel_pct:.1f}%)")


if __name__ == "__main__":
    consolidate()
