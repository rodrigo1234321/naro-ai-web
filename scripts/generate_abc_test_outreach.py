import sys
import os
import re
import csv
import pandas as pd
import urllib.parse

sys.stdout.reconfigure(encoding="utf-8")

def clean_phone_str(val):
    if pd.isna(val) or val is None:
        return ""
    val_s = str(val).strip()
    if not val_s or val_s.lower() == "nan":
        return ""
    val_s = re.sub(r"\.0$", "", val_s)
    if "e+" in val_s.lower():
        try:
            val_s = str(int(float(val_s)))
        except Exception:
            pass
    return val_s

def build_tailored_script(nombre, sector, direccion, angle):
    name_clean = nombre.split(".")[0].split("-")[0].strip()
    dir_str = f" en {direccion}" if pd.notna(direccion) and str(direccion).strip() and str(direccion).lower() != "nan" else ""

    # Determinar el beneficio por sector
    if sector == "Showrooms e Indumentaria (Instagram)":
        offer = "un sistema para tienda online + bot de WhatsApp que muestra el catálogo, la disponibilidad de talles/colores en vivo y toma el pedido con cobro automático de MercadoPago"
    elif sector == "Salud y Estética":
        offer = "un agendador de turnos por WhatsApp que atiende las 24hs, cobra la seña automáticamente y envía recordatorios para eliminar el ausentismo"
    elif sector == "Comida a Domicilio y Delivery":
        offer = "un menú digital por WhatsApp que toma el pedido completo con dirección y pago y lo envía directo a la comandera de cocina sin perder ventas en hora pico"
    elif sector == "Automotriz y Servicios":
        offer = "un sistema de gestión de taller con control de repuestos, órdenes de trabajo y turnos automatizados por WhatsApp"
    else: # Comercio General, Ferreterías, Minimarkets, Pet Shops, Bazares
        offer = "un combo de Página Web + Software de Gestión Comercial para controlar el stock por código de barras, precios por inflación, cuentas corrientes (fiados) y el cierre de caja diario"

    # Generar el mensaje según el Ángulo A, B o C
    if "Ángulo A" in angle:
        intro = f"Hola {name_clean}, ¿cómo están? Les escribo desde Naro AI, agencia de tecnología e inteligencia artificial en Mar del Plata."
        body = f"Estuvimos viendo su local{dir_str} y desarrollamos {offer}."
        call = "¿Tienen 2 minutos para que les envíe un breve video de 30 segundos de cómo funciona?"
    elif "Ángulo B" in angle:
        intro = f"Hola {name_clean}, ¿cómo están? Te escribo porque somos dos estudiantes de programación de la UTN acá en Mar del Plata."
        body = f"Para un proyecto con comercios de la ciudad desarrollamos {offer}."
        call = "¿Nos darías 2 minutos para mostrarte un video de cómo funciona en locales de MDP? Nos serviría mucho tu opinión."
    else: # Ángulo C - Startup
        intro = f"Hola {name_clean}, ¿cómo va? Te contacto desde una nueva startup tecnológica que lanzamos en Mar del Plata."
        body = f"Diseñamos una herramienta para locales comerciales como {name_clean}{dir_str} que incluye {offer}."
        call = "¿Les gustaría ver una demo rápida de 30 segundos sin compromiso?"

    full_text = f"{intro} {body} {call}"
    return full_text

def main():
    csv_in = "data/primeros_100_locales_fisicos_outreach.csv"
    if not os.path.exists(csv_in):
        print(f"No existe {csv_in}")
        return

    df = pd.read_csv(csv_in, dtype=str)
    
    # Asignar balance 33 / 33 / 34
    n = len(df)
    angles = (["Ángulo A (Agencia Naro AI)"] * 33 + 
              ["Ángulo B (Estudiantes UTN MDP)"] * 33 + 
              ["Ángulo C (Startup Tecnológica MDP)"] * (n - 66))
    
    df["experimento_angulo_ab_test"] = angles[:n]

    scripts = []
    links = []

    for idx, row in df.iterrows():
        nombre = str(row.get("nombre", ""))
        sector = str(row.get("sector", ""))
        direccion = str(row.get("direccion", ""))
        angle = row["experimento_angulo_ab_test"]
        wa_num = clean_phone_str(row.get("whatsapp", ""))

        script = build_tailored_script(nombre, sector, direccion, angle)
        scripts.append(script)

        if wa_num:
            enc = urllib.parse.quote(script)
            link = f"https://wa.me/{wa_num}?text={enc}"
        else:
            link = ""
        links.append(link)

    df["script_mensajeria_personalizado"] = scripts
    df["link_whatsapp_outreach"] = links

    df.to_csv(csv_in, index=False, encoding="utf-8-sig")
    print(f"[ÉXITO] Generados 100 mensajes A/B/C personalizados en {csv_in}")

if __name__ == "__main__":
    main()
