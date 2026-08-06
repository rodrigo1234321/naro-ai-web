import re
import collections

html = open("data/guemes_listing.html", encoding="utf-8").read()
links = re.findall(r'href="([^"]+)"', html)
c = [l for l in links if "comercio" in l.lower()]
print("links comercio:", len(set(c)))
for l in list(set(c))[:15]:
    print("  ", l)
print("top hrefs:", collections.Counter(re.findall(r'href="(/[^"]*)"', html)).most_common(12))
