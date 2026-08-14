/**
 * process-html.js
 * Pipeline de procesamiento de HTMLs para Cloudflare Pages.
 *
 * 1. Recorre /raw_html/*.html
 * 2. Transforma a URLs limpias: raw_html/nombre-cliente.html -> public/nombre-cliente/index.html
 * 3. Inyecta <meta name="robots" content="noindex, nofollow"> si no existe (privacidad de clientes)
 * 4. Copia una carpeta de assets hermana (raw_html/nombre-cliente/) si existe
 * 5. Actualiza public/index.json fusionando el registro de páginas raw_html
 *    sin pisar el manifest de rubros generado por scripts/sync_15_demos.py
 *
 * IMPORTANTE: NO destructivo. No borra public/ para preservar los 15 rubros,
 * la portada (public/index.html) y public/demos. Solo reescribe las carpetas
 * que se generan desde raw_html/.
 *
 * Uso: node scripts/process-html.js
 */
import fs from "node:fs";
import path from "node:path";

import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const RAW_DIR = path.join(ROOT, "raw_html");
const PUBLIC_DIR = path.join(ROOT, "public");

const NOINDEX = `<meta name="robots" content="noindex, nofollow">`;

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function listHtml(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".html"))
    .map((e) => e.name);
}

function injectNoindex(html) {
  const re = /<meta[^>]*name=["']robots["'][^>]*>/i;
  if (re.test(html)) {
    if (/noindex/i.test(html.match(re)[0])) return html;
    return html.replace(re, `<meta name="robots" content="noindex, nofollow">`);
  }
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head[^>]*>/i, (m) => `${m}\n    ${NOINDEX}`);
  }
  return `${NOINDEX}\n${html}`;
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

function main() {
  if (!fs.existsSync(RAW_DIR)) {
    console.error("No existe la carpeta raw_html/. Agregá tus HTMLs ahí o corré node scripts/seed-raw-html.js");
    process.exit(1);
  }

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  const pages = [];
  for (const file of listHtml(RAW_DIR)) {
    const slug = slugify(path.basename(file, ".html"));
    const srcHtml = path.join(RAW_DIR, file);
    const outDir = path.join(PUBLIC_DIR, slug);
    const outHtml = path.join(outDir, "index.html");

    fs.rmSync(outDir, { recursive: true, force: true });
    fs.mkdirSync(outDir, { recursive: true });
    let html = fs.readFileSync(srcHtml, "utf-8");
    html = injectNoindex(html);
    fs.writeFileSync(outHtml, html, "utf-8");

    const assetsSrc = path.join(RAW_DIR, slug);
    if (fs.existsSync(assetsSrc) && fs.statSync(assetsSrc).isDirectory()) {
      copyDir(assetsSrc, outDir);
    }

    pages.push({ slug, source: file, url: `/${slug}`, file: outHtml.replace(ROOT + path.sep, "") });
    console.log(`OK  ${file} -> ${slug}/`);
  }

  if (pages.length === 0) {
    console.warn("No se encontraron archivos .html en raw_html/");
  }

  const manifestPath = path.join(PUBLIC_DIR, "index.json");
  let manifest = {};
  try {
    if (fs.existsSync(manifestPath)) {
      manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    }
  } catch (e) {
    console.warn("index.json ilegible, se regenera desde cero:", e.message);
  }

  const rubros = Array.isArray(manifest.rubros) ? manifest.rubros : [];
  manifest.generated_at = new Date().toISOString();
  manifest.total = rubros.length > 0 ? rubros.length : pages.length;
  manifest.project = "mis-clientes-html";
  manifest.base_url = "https://mis-clientes-html.pages.dev";
  manifest.pages = pages;
  manifest.rubros = rubros;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`\nListo: ${pages.length} páginas raw_html publicadas. Rubros (${rubros.length}), portada y demos preservados en public/.`);
}

main();
