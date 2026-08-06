import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

s = '["Martín Miguel de Güemes 2876","B7600 Mar del Plata","Provincia de Buenos Aires"]'
m = re.search(r'"([^"]{4,140}?)","(B\d{4})"', s)
print("search {4,140}:", m.groups() if m else None)
m2 = re.search(r'"([^"]{4,140})","(B\d{4})"', s)
print("search {4,140} greedy:", m2.groups() if m2 else None)
m3 = re.search(r'"(.{4,140}?)","(B\d{4})"', s)
print("search dot {4,140}?", m3.groups() if m3 else None)
m4 = re.search(r'"([^"]{1,4}?)","(B\d{4})"', s)
print("search {1,4}:", m4.groups() if m4 else None)
