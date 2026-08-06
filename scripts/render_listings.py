import re
import json
from playwright.sync_api import sync_playwright

SITES = [
    {"name": "ccalberti", "listing": "https://ccalberti.com.ar/comercios/"},
    {"name": "ccconstitucion", "listing": "https://ccconstitucion.com.ar/novedades/comercios/"},
    {"name": "ccguemes", "listing": "https://ccguemes.com.ar/novedades/comercios/"},
    {"name": "ccjuanbjusto", "listing": "https://ccjuanbjusto.com.ar/novedades/comercios/"},
    {"name": "ccmicrocentro", "listing": "https://ccmicrocentro.com.ar/novedades/comercios/"},
    {"name": "ccplayagrande", "listing": "https://ccplayagrande.com.ar/comercios/"},
    {"name": "ccpuntamogotes", "listing": "https://ccpuntamogotes.com.ar/"},
    {"name": "ccsanjuan", "listing": "https://ccsanjuan.com.ar/novedades/comercios/"},
    {"name": "ccsierradelospadres", "listing": "https://ccsierradelospadres.com.ar/novedades/comercios/"},
    {"name": "cctalcahuano", "listing": "https://cctalcahuano.com.ar/comercios/"},
    {"name": "cctejedor", "listing": "https://cctejedor.com.ar/novedades/comercios/"},
    {"name": "cc12deoctubre", "listing": "https://cc12deoctubre.com.ar/"},
]

results = {}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for site in SITES:
        name = site["name"]
        url = site["listing"]
        try:
            page = browser.new_page()
            page.goto(url, timeout=45000, wait_until="domcontentloaded")
            page.wait_for_timeout(4000)
            links = page.eval_on_selector_all(
                "a",
                "els => els.map(e => ({href: e.href, text: e.innerText.trim()}))",
            )
            comm = [
                l
                for l in links
                if re.search(r"/comercio", l["href"], re.I)
                and "feed" not in l["href"]
                and "wp-json" not in l["href"]
            ]
            # dedupe conservando orden
            seen = set()
            dedup = []
            for l in comm:
                if l["href"] not in seen:
                    seen.add(l["href"])
                    dedup.append(l)
            results[name] = {"url": url, "comercio_links": dedup[:15], "total": len(dedup)}
            print(f"{name}: {len(dedup)} links comercio (mostrando 15)")
            for l in dedup[:15]:
                print(f"   {l['href']} | {l['text'][:40]}")
            page.close()
        except Exception as e:
            results[name] = {"url": url, "error": str(e)[:120]}
            print(f"{name}: ERROR {str(e)[:120]}")

with open("data/rendered_listings.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
