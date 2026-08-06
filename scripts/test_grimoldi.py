import sys
import re
import urllib3
import requests

sys.stdout.reconfigure(encoding="utf-8")
urllib3.disable_warnings()

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
    "Accept-Language": "es-AR,es;q=0.9,en;q=0.8",
}

SEARCH = "https://www.google.com/maps/search/Grimoldi+Mar+del+Plata/?hl=es"
r = requests.get(SEARCH, headers=headers, timeout=30, verify=False)
hrefs = re.findall(r'href="(/maps/place/[^"]+)"', r.text)
print("hrefs place:", len(hrefs))
seen = set()
for h in hrefs:
    if h in seen:
        continue
    seen.add(h)
    print("  ", h[:150])

# tomar uno y parsear su página
if hrefs:
    place = "https://www.google.com" + hrefs[0]
    r2 = requests.get(place, headers=headers, timeout=30, verify=False)
    html2 = r2.text
    blob = re.search(r"window\.APP_INITIALIZATION_STATE\s*=\s*(\[)", html2)
    if blob:
        start = blob.start(1)
        depth = 0
        in_str = False
        esc = False
        for i in range(start, len(html2)):
            c = html2[i]
            if in_str:
                if esc:
                    esc = False
                elif c == "\\":
                    esc = True
                elif c == '"':
                    in_str = False
            else:
                if c == '"':
                    in_str = True
                elif c == "[":
                    depth += 1
                elif c == "]":
                    depth -= 1
                    if depth == 0:
                        blobstr = html2[start : i + 1]
                        urls = re.findall(r"https?://[a-zA-Z0-9\.\-_/]{3,100}", blobstr)
                        unique = list(
                            dict.fromkeys(
                                u
                                for u in urls
                                if "google.com" not in u and "gstatic" not in u and "youtube" not in u and "googleusercontent" not in u and "googleapis" not in u and "g.co" not in u
                            )
                        )
                        print("BLOB len:", len(blobstr))
                        print("URLS:", unique[:10])
                        # nombre del lugar en el blob
                        names = re.findall(r'"([^"]{3,60})"', blobstr)
                        print("nombres candidatos:", names[:8])
                        break
