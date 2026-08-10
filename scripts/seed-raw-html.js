/**
 * seed-raw-html.js
 * Helper único: copia las webs ya construidas en el repo hacia /raw_html/
 * con nombres limpios (sin el prefijo LEAD-IA-XXXX-), listas para el pipeline.
 *
 * Uso: node scripts/seed-raw-html.js
 */
import fs from "node:fs";
import path from "node:path";

import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const RAW_DIR = path.join(ROOT, "raw_html");

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

const SOURCES = [
  {
    html: path.join(ROOT, "webs", "terca", "index.html"),
    name: "terca",
    assetsDir: path.join(ROOT, "webs", "terca"),
    assetsExclude: ["index.html"],
  },
  {
    html: path.join(ROOT, "webs", "verde-limon", "index.html"),
    name: "verde-limon",
    assetsDir: path.join(ROOT, "webs", "verde-limon"),
    assetsExclude: ["index.html"],
  },
  {
    html: path.join(ROOT, "webs", "kiva-cafe", "index.html"),
    name: "kiva-cafe",
    assetsDir: path.join(ROOT, "webs", "kiva-cafe"),
    assetsExclude: ["index.html"],
  },
  {
    html: path.join(ROOT, "sites", "restaurante-la-marina", "index.html"),
    name: "restaurante-la-marina",
    assetsDir: path.join(ROOT, "sites", "restaurante-la-marina"),
    assetsExclude: ["index.html"],
  },
];

function main() {
  fs.mkdirSync(RAW_DIR, { recursive: true });
  let count = 0;

  // 1) Webs completas custom (terca, verde-limon, kiva-cafe, la-marina)
  for (const s of SOURCES) {
    if (!fs.existsSync(s.html)) {
      console.warn(`SKIP ${s.name} (no existe ${s.html})`);
      continue;
    }
    copyFile(s.html, path.join(RAW_DIR, `${s.name}.html`));
    if (s.assetsDir && fs.existsSync(s.assetsDir)) {
      const dest = path.join(RAW_DIR, s.name);
      if (s.assetsExclude) {
        for (const entry of fs.readdirSync(s.assetsDir, { withFileTypes: true })) {
          if (s.assetsExclude.includes(entry.name)) continue;
          const src = path.join(s.assetsDir, entry.name);
          const d = path.join(dest, entry.name);
          if (entry.isDirectory()) copyDir(src, d);
          else {
            fs.mkdirSync(dest, { recursive: true });
            fs.copyFileSync(src, d);
          }
        }
      } else {
        copyDir(s.assetsDir, dest);
      }
    }
    console.log(`OK  ${s.name}.html (+assets)`);
    count++;
  }

  // 2) Landings de webs/leads (single-file HTML)
  const leadsDir = path.join(ROOT, "webs", "leads");
  if (fs.existsSync(leadsDir)) {
    for (const folder of fs.readdirSync(leadsDir, { withFileTypes: true })) {
      if (!folder.isDirectory()) continue;
      const indexHtml = path.join(leadsDir, folder.name, "index.html");
      if (!fs.existsSync(indexHtml)) continue;
      // LEAD-IA-1313-clinica-luro -> clinica-luro
      const clean = folder.name.replace(/^LEAD-IA-\d+[-_]/, "");
      copyFile(indexHtml, path.join(RAW_DIR, `${clean}.html`));
      console.log(`OK  ${clean}.html`);
      count++;
    }
  }

  // 3) Previews HTML por lead (showrooms, odontolog&iacute;a, caba&ntilde;as)
  const PREVIEWS = [
    {
      html: path.join(ROOT, "previews", "Showrooms_e_Indumentaria_(Instagram)", "preview_Antes_Muerta_que_Sencilla_Showroom.html"),
      name: "antes-muerta-que-sencilla-showroom",
    },
    {
      html: path.join(ROOT, "previews", "Showrooms_e_Indumentaria_(Instagram)", "preview_Bulgarie.html"),
      name: "bulgarie",
    },
    {
      html: path.join(ROOT, "previews", "Salud_y_Est\u00e9tica___Odontolog\u00eda", "preview_Urgencias_Odontologicas.html"),
      name: "urgencias-odontologicas",
    },
    {
      html: path.join(ROOT, "previews", "Turismo_y_Alojamiento___Caba\u00f1as_y_Complejos", "preview_Caba\u00f1as_Entre_Los_Arboles.html"),
      name: "cabanas-entre-los-arboles",
    },
  ];
  for (const p of PREVIEWS) {
    if (!fs.existsSync(p.html)) {
      console.warn(`SKIP ${p.name} (no existe ${p.html})`);
      continue;
    }
    copyFile(p.html, path.join(RAW_DIR, `${p.name}.html`));
    console.log(`OK  ${p.name}.html (preview)`);
    count++;
  }

  console.log(`\nSeed completo: ${count} HTMLs en raw_html/`);
}

main();
