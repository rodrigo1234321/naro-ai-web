# -*- coding: utf-8 -*-
"""Descarga imagenes curadas de Unsplash para las 28 demos de la Demo Factory.
Salida: demofactory/public/assets/<slug>/<slot>.jpg (hero, g1..g3)
Cada slot tiene candidatos en orden: usa el primero que responda 200."""
import os
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "demofactory" / "public" / "assets"

# Cada slot: [candidatos de photo-id unsplash, en orden de preferencia]
SLOTS = {
    "clinica-aura": {
        "hero": ["1519494026892-80bbd2d6fd0d"],
        "g1": ["1576091160399-112ba8d25d1d"],
        "g2": ["1538108149393-fbbd81895907"],
        "g3": ["1505751172876-fa1923c5c528"],
    },
    "dental-sonrisa": {
        "hero": ["1606811841689-23dfddce3e95"],
        "g1": ["1588776814546-1ffcf47267a5", "1629909613654-28e377c37b09"],
        "g2": ["1598256989800-fe5f95da9787"],
        "g3": ["1629909613654-28e377c37b09", "1588776814546-1ffcf47267a5"],
    },
    "estetica-lumiere": {
        "hero": ["1512290923902-8a9f81dc236c"],
        "g1": ["1540555700478-4be289fbecef"],
        "g2": ["1570172619644-dfd03ed5d881"],
        "g3": ["1616394584738-fc6e612e71b9"],
    },
    "peluqueria-ambar": {
        "hero": ["1522337660859-02fbefca4702"],
        "g1": ["1562322140-8baeececf3df"],
        "g2": ["1580618672591-eb180b1a973f", "1605497788044-5a32c7078486"],
        "g3": ["1605497788044-5a32c7078486", "1580618672591-eb180b1a973f"],
    },
    "kinesio-movere": {
        "hero": ["1571019613454-1cb2f99b2d8b"],
        "g1": ["1544367567-0f2fcb009e0b"],
        "g2": ["1517836357463-d25dfeac3438"],
        "g3": ["1534438327276-14e5300c3a48"],
    },
    "restaurante-rias": {
        "hero": ["1517248135467-4c7edcad34c4"],
        "g1": ["1414235077428-338989a2e8c0"],
        "g2": ["1552566626-52f8b828add9"],
        "g3": ["1514933651103-005eec06c04b"],
    },
    "cafe-verde-alba": {
        "hero": ["1509042239860-f550ce710b93"],
        "g1": ["1445116572660-236099ec97a0"],
        "g2": ["1495474472287-4d71bcdd2085"],
        "g3": ["1559925393-8be0ec4767c8"],
    },
    "viandas-sabores": {
        "hero": ["1546069901-ba9599a7e63c"],
        "g1": ["1490645935967-10de6ba17061"],
        "g2": ["1512621776951-a57141f2eefd"],
        "g3": ["1482049016688-2d3e1b311543"],
    },
    "rotiseria-don-gino": {
        "hero": ["1565958011703-44f9829ba187"],
        "g1": ["1571407970349-bc81e7e96d47"],
        "g2": ["1565299624946-b28f40a0ae38"],
        "g3": ["1529692236671-f1f6cf9683ba"],
    },
    "cerveceria-punto-cebada": {
        "hero": ["1518176258769-f227c798150e"],
        "g1": ["1535958636474-b021ee887b13"],
        "g2": ["1571613316887-6f8d5cbf7ef7"],
        "g3": ["1608270586620-248524c67de9", "1516714435131-c33c2657980f"],
    },
    "vinoteca-cava-puerto": {
        "hero": ["1506377247377-2a5b3b417ebb"],
        "g1": ["1510812431401-41d2bd2722f3"],
        "g2": ["1547592180-85f173990554", "1474722883778-792e7990302f"],
        "g3": ["1474722883778-792e7990302f", "1510812431401-41d2bd2722f3"],
    },
    "showroom-nube": {
        "hero": ["1445205170230-053b83016050"],
        "g1": ["1483985988355-763728e1935b"],
        "g2": ["1496747611176-843222e1e57c"],
        "g3": ["1469334031218-e382a71b716b"],
    },
    "sport-base9": {
        "hero": ["1517466787929-bc90951d0974"],
        "g1": ["1526232761682-d26e03ac148e"],
        "g2": ["1556906781-9a412961c28c", "1579952363873-27f3bade9f55"],
        "g3": ["1579952363873-27f3bade9f55", "1556906781-9a412961c28c"],
    },
    "calzado-paso-norte": {
        "hero": ["1542291026-7eec264c27ff"],
        "g1": ["1549298916-b41d501d3772"],
        "g2": ["1560769629-975ec94e6a86"],
        "g3": ["1595950653106-6c9ebd614d3a", "1560769629-975ec94e6a86"],
    },
    "inmobiliaria-costa-real": {
        "hero": ["1560518883-ce09059eeffa"],
        "g1": ["1600596542815-ffad4c1539a9"],
        "g2": ["1580587771525-78b9dba3b914"],
        "g3": ["1523217582562-09d0def993a6"],
    },
    "temporarios-dunas": {
        "hero": ["1502672260266-1c1ef2d93688"],
        "g1": ["1560448204-e02f11c3d0e2"],
        "g2": ["1522708323590-d24dbb6b0267"],
        "g3": ["1512917774080-9991f1c4c750"],
    },
    "cabanas-aires-faro": {
        "hero": ["1449158743715-0a90ebb6d2d8"],
        "g1": ["1470770841072-f978cf4d019e"],
        "g2": ["1510798831971-661eb04b3739", "1445019980597-93fa8acb246c"],
        "g3": ["1445019980597-93fa8acb246c"],
    },
    "hotel-olas-sur": {
        "hero": ["1566073771259-6a8506099945"],
        "g1": ["1571896349842-33c89424de2d"],
        "g2": ["1611892440504-42a792e24d32"],
        "g3": ["1520250497591-112f2f40a3f4"],
    },
    "lavadero-aquashine": {
        "hero": ["1503376780353-7e6692767b70"],
        "g1": ["1607860108855-64acf2078ed9", "1568605117036-5fe5e7bab0b7"],
        "g2": ["1568605117036-5fe5e7bab0b7"],
        "g3": ["1494976388531-d1058494cdd8"],
    },
    "gomeria-rodado-sur": {
        "hero": ["1486262715619-67b85e0b08d3", "1568605117036-5fe5e7bab0b7"],
        "g1": ["1568605117036-5fe5e7bab0b7", "1486262715619-67b85e0b08d3"],
        "g2": ["1530046339160-ce3e530c7d2f", "1487754180451-c456f719a1fc"],
        "g3": ["1487754180451-c456f719a1fc", "1625047509168-a7026f36de04"],
    },
    "taller-motorbox": {
        "hero": ["1530046339160-ce3e530c7d2f", "1487754180451-c456f719a1fc"],
        "g1": ["1487754180451-c456f719a1fc", "1530046339160-ce3e530c7d2f"],
        "g2": ["1625047509168-a7026f36de04", "1581093458791-9d42e3c7e117"],
        "g3": ["1581093458791-9d42e3c7e117", "1486262715619-67b85e0b08d3"],
    },
    "regaleria-dulce-detalle": {
        "hero": ["1549465220-1a8b9238cd48"],
        "g1": ["1513201099705-a9746e1e201f"],
        "g2": ["1518998053901-5348d3961a04", "1533154683836-84ea7a0bc310"],
        "g3": ["1533154683836-84ea7a0bc310", "1518998053901-5348d3961a04"],
    },
    "imprenta-estampa": {
        "hero": ["1563986768609-322da13575f3"],
        "g1": ["1455390582262-044cdead277a"],
        "g2": ["1579436863518-38a9feb4d17b", "1586075010923-2dd4570fb338"],
        "g3": ["1586075010923-2dd4570fb338", "1563986768609-322da13575f3"],
    },
    "distribuidora-mdp": {
        "hero": ["1586528116311-ad8dd3c8310d"],
        "g1": ["1553413077-190dd305871c"],
        "g2": ["1600880292203-757bb62b4baf"],
        "g3": ["1504384308090-c894fdcc538d"],
    },
    "ferreteria-ferretodo": {
        "hero": ["1504148455328-c376907d081c", "1530124566582-a618bc2615dc"],
        "g1": ["1530124566582-a618bc2615dc", "1504148455328-c376907d081c"],
        "g2": ["1581092160562-40aa08e78837", "1504148455328-c376907d081c"],
        "g3": ["1581093458791-9d42e3c7e117", "1530124566582-a618bc2615dc"],
    },
    "petshop-patitas": {
        "hero": ["1548199973-03cce0bbc87b"],
        "g1": ["1583511655857-d19b40a7a54e"],
        "g2": ["1552053831-71594a27632d"],
        "g3": ["1537151625747-768eb6cf92b2", "1552053831-71594a27632d"],
    },
    "contable-conta-co": {
        "hero": ["1554224155-6726b3ff858f"],
        "g1": ["1450101499163-c8848c66ca85"],
        "g2": ["1460925895917-afdab827c52f"],
        "g3": ["1521791136064-7986c2920216"],
    },
    "flores-jardin-puerto": {
        "hero": ["1490750967868-88aa4486c946"],
        "g1": ["1457089328109-e5d9bd499191"],
        "g2": ["1519225421980-715cb0215aed", "1455659817273-f96807779a8a"],
        "g3": ["1455659817273-f96807779a8a", "1490750967868-88aa4486c946"],
    },
}

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) NaroAI-demo-factory/1.0"}


def download(photo_id: str, dest: Path, w: int, q: int = 80) -> bool:
    url = f"https://images.unsplash.com/photo-{photo_id}?w={w}&q={q}&fm=jpg&fit=crop"
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=30) as r:
            if r.status != 200:
                return False
            data = r.read()
        if len(data) < 5000:
            return False
        dest.write_bytes(data)
        return True
    except Exception:
        return False


def main():
    ok, fail = 0, []
    for slug, slots in SLOTS.items():
        folder = OUT / slug
        folder.mkdir(parents=True, exist_ok=True)
        for slot, ids in slots.items():
            dest = folder / f"{slot}.jpg"
            if dest.exists() and dest.stat().st_size > 5000:
                ok += 1
                continue
            w = 1600 if slot == "hero" else 1000
            done = False
            for pid in ids:
                if download(pid, dest, w):
                    done = True
                    break
            if done:
                ok += 1
            else:
                fail.append(f"{slug}/{slot}")
    print(f"OK: {ok}  FALLIDAS: {len(fail)}")
    for f in fail:
        print("  FALTA:", f)
    if fail:
        sys.exit(1)


if __name__ == "__main__":
    main()
