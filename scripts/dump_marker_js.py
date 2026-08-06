import re
import urllib3
import requests

urllib3.disable_warnings()

r = requests.get("https://ccalberti.com.ar/comercios/", timeout=25, verify=False)
html = r.text
m = re.search(r"new google\.maps\.Marker\(\{", html)
if m:
    start = max(0, m.start() - 3000)
    print(html[start : m.start() + 3000])
