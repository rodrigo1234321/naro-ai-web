/**
 * NARO AI — Exportador de piezas Instagram a PNG
 * Convierte cada HTML de piezas/ a una imagen PNG del tamaño exacto.
 *
 * Requisitos:
 *   npm i puppeteer-core
 *   (usa el Edge/Chrome ya instalado en Windows, no descarga Chromium)
 *
 * Uso:
 *   node exportar.js            → exporta todo a piezas/salida/
 *   node exportar.js post-03    → exporta solo una pieza
 *
 * Salida:
 *   salida/posts/post-01-intro.png      (1080x1080)
 *   salida/stories/story-01.png         (1080x1920)
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const RAIZ = __dirname;

function buscarNavegador() {
  const candidatos = [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    process.env.PROGRAMFILES + '/Google/Chrome/Application/chrome.exe',
    process.env['PROGRAMFILES(X86)'] + '/Google/Chrome/Application/chrome.exe',
  ];
  return candidatos.find((p) => fs.existsSync(p));
}

async function exportarUna(browser, htmlPath, outPath, width, height) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: outPath, type: 'png' });
  await page.close();
  console.log('  ✔ ' + path.relative(RAIZ, outPath));
}

(async () => {
  const ejecutable = buscarNavegador();
  if (!ejecutable) {
    console.error('✖ No encontré Edge ni Chrome en el sistema.');
    process.exit(1);
  }

  const filtro = process.argv[2] || '';
  const browser = await puppeteer.launch({ executablePath: ejecutable, headless: 'new' });

  const piezas = [
    ...fs.readdirSync(path.join(RAIZ, 'posts')).filter((f) => f.endsWith('.html')).map((f) => ({
      archivo: path.join(RAIZ, 'posts', f),
      salida: path.join(RAIZ, 'salida', 'posts', f.replace('.html', '.png')),
      ancho: 1080, alto: 1080,
    })),
    ...fs.readdirSync(path.join(RAIZ, 'stories')).filter((f) => f.endsWith('.html')).map((f) => ({
      archivo: path.join(RAIZ, 'stories', f),
      salida: path.join(RAIZ, 'salida', 'stories', f.replace('.html', '.png')),
      ancho: 1080, alto: 1920,
    })),
  ];

  const seleccion = filtro ? piezas.filter((p) => p.archivo.includes(filtro)) : piezas;

  console.log('Exportando ' + seleccion.length + ' pieza(s) a PNG...\n');
  for (const p of seleccion) {
    fs.mkdirSync(path.dirname(p.salida), { recursive: true });
    await exportarUna(browser, p.archivo, p.salida, p.ancho, p.alto);
  }

  await browser.close();
  console.log('\nListo. Las imágenes están en piezas/salida/');
})().catch((e) => { console.error(e); process.exit(1); });
