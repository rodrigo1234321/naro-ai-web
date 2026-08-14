const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

dotenv.config();

// Configuración general
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const SEARCH_QUERY = process.env.SEARCH_QUERY || 'Counter-Strike 2 OR "CS2" OR "9z" OR "HLTV" OR "Major CS2" OR "G2" OR "NAVI" OR "FURIA"';
const SITE_NAME = process.env.SITE_NAME || 'CS2 Noticia';
const SITE_URL = process.env.SITE_URL || 'https://cs-news-seven.vercel.app';

const RSS_URL = `https://news.google.com/rss/search?q=${encodeURIComponent(SEARCH_QUERY)}&hl=es-419&gl=AR&ceid=AR:es-419`;
const NOTICIAS_FILE = path.join(__dirname, '../noticias.json');
const TRENDS_FILE = path.join(__dirname, '../trends.json');
const TWEET_FILE = path.join(__dirname, '../tweet.txt');

function decodeHtml(str) {
  return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

async function fetchTrends() {
  console.log(`Obteniendo tendencias de X (Twitter) para ${SEARCH_QUERY}...`);
  try {
    const res = await fetch('https://getdaytrends.com/argentina/');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const html = await res.text();
    const trendRegex = /<a class="string" href="\/argentina\/trend\/[^"]+?">([^<]+?)<\/a>/g;
    const trends = [];
    let match;
    while ((match = trendRegex.exec(html)) !== null) {
      const trendText = match[1].trim();
      if (!trends.includes(trendText)) trends.push(trendText);
    }
    console.log(`Se encontraron ${trends.length} tendencias en X.`);
    const topTrends = trends.slice(0, 15);
    fs.writeFileSync(TRENDS_FILE, JSON.stringify(topTrends, null, 2), 'utf8');
    return topTrends;
  } catch (err) {
    console.warn('Advertencia: No se pudieron obtener las tendencias de X:', err.message);
    return [];
  }
}

async function fetchNewsRSS() {
  console.log(`Obteniendo noticias desde Google News RSS (${SEARCH_QUERY})...`);
  try {
    const res = await fetch(RSS_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const xml = await res.text();
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
      const itemContent = match[1];
      const titleMatch = /<title>([\s\S]*?)<\/title>/.exec(itemContent);
      const linkMatch = /<link>([\s\S]*?)<\/link>/.exec(itemContent);
      if (titleMatch && linkMatch) {
        let title = decodeHtml(titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim());
        // Filtrar noticias basura sobre CS2 bolsa o finanzas
        if (!title.toLowerCase().includes('trading') && !title.toLowerCase().includes('bolsa')) {
          items.push({
            title: title,
            link: decodeHtml(linkMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim())
          });
        }
      }
    }
    console.log(`Se encontraron ${items.length} noticias relevantes en el RSS.`);
    return items.slice(0, 7);
  } catch (err) {
    console.error('Error en RSS:', err);
    return [];
  }
}

async function scrapeArticles(newsItems) {
  console.log('Iniciando extracción profunda con Playwright...');
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const scrapedData = [];
  
  for (const item of newsItems) {
    console.log(`\nExtrayendo: ${item.title}`);
    const context = await browser.newContext();
    const page = await context.newPage();
    let textContent = '';
    let ogImage = '';
    let realUrl = item.link;
    
    try {
      await page.goto(item.link, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForTimeout(3000); // Esperar redirección de Google News
      
      realUrl = page.url();
      
      ogImage = await page.evaluate(() => {
        const meta = document.querySelector('meta[property="og:image"]');
        return meta ? meta.content : '';
      });
      
      textContent = await page.evaluate(() => {
        const paragraphs = Array.from(document.querySelectorAll('p'));
        return paragraphs.map(p => p.innerText.trim()).filter(p => p.length > 50).join('\n\n').substring(0, 2000);
      });
      
    } catch (err) {
      console.warn(`Falló la extracción para ${item.title}: ${err.message}`);
    } finally {
      await context.close();
    }
    
    scrapedData.push({
      originalTitle: item.title,
      realUrl,
      ogImage,
      textContent: textContent || item.title
    });
  }
  
  await browser.close();
  return scrapedData;
}

async function generateArticlesWithGemini(scrapedItems, trends) {
  console.log('Llamando a Gemini para redactar notas profesionales...');
  const today = new Date().toISOString().split('T')[0];
  const finalArticles = [];
  
  const validApiKey = GEMINI_API_KEY && GEMINI_API_KEY !== 'dummy_key' && GEMINI_API_KEY !== '';
  
  for (let i = 0; i < scrapedItems.length; i++) {
    const item = scrapedItems[i];
    const cleanTitle = item.originalTitle.split(' - ')[0].trim();
    const slug = cleanTitle.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `noticia-${Date.now()}`;
    const categories = ['actualizaciones', 'torneos', 'equipos', 'comunidad'];
    const cat = categories[i % categories.length];

    let gResult = null;
    
    if (validApiKey) {
      const prompt = `
      Sos redactor jefe de "${SITE_NAME}".
      TENDENCIAS X: ${JSON.stringify(trends)}
      
      Aquí está el texto extraído de una noticia real:
      TÍTULO ORIGINAL: ${item.originalTitle}
      TEXTO: ${item.textContent.substring(0, 1500)}
      
      Redacta un JSON estricto con:
      - titulo: Máximo 15 palabras, impactante.
      - bajada: Resumen del artículo en 1 oración (gancho).
      - cuerpo: El artículo reescrito en tono crítico y profesional (min 2 párrafos, max 4). Usa saltos de línea \\n\\n.
      - categoria: "actualizaciones", "torneos", "equipos" o "comunidad".
      - tweet: Borrador de tweet, máx 230 chars, con hashtags, sin links.
      `;

      try {
        const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
        for (const model of models) {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: "application/json" }
            })
          });
          
          if (res.ok) {
            const result = await res.json();
            const rawJson = result.candidates[0].content.parts[0].text;
            gResult = JSON.parse(rawJson.replace(/```json|```/g, '').trim());
            console.log(`Gemini (${model}) redactó exitosamente la nota.`);
            break;
          } else {
            console.warn(`Gemini (${model}) retornó error ${res.status}. Probando siguiente modelo...`);
          }
        }
      } catch (e) {
        console.warn('Gemini parser error:', e.message);
      }
    }
    
    // Fallback robusto (Usa el texto extraído y la imagen original si Gemini falla)
    if (!gResult) {
      console.log(`Usando extracción directa de Playwright para: "${cleanTitle}"`);
      gResult = {
        titulo: cleanTitle,
        bajada: cleanTitle,
        cuerpo: item.textContent.length > 100 ? item.textContent : `${cleanTitle}.\n\nMás detalles pronto en nuestro portal.`,
        categoria: cat,
        tweet: `🚨 ÚLTIMA HORA | ${cleanTitle.substring(0, 180)} #CS2`
      };
    }
    
    finalArticles.push({
      titulo: gResult.titulo || cleanTitle,
      bajada: gResult.bajada || cleanTitle,
      cuerpo: gResult.cuerpo || item.textContent,
      categoria: gResult.categoria || cat,
      autor: `Redacción ${SITE_NAME}`,
      lectura: "3 min",
      slug: slug,
      fecha: today,
      imagen: item.ogImage || getFallbackImage(slug),
      destacada: i === 0,
      tweet: gResult.tweet || `🚨 ${cleanTitle.substring(0, 150)} #CS2`
    });
  }
  
  return finalArticles;
}

function getFallbackImage(slug) {
  const images = [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80'
  ];
  let h = 0;
  for(let i=0; i<slug.length; i++) h = (h<<5)-h+slug.charCodeAt(i);
  return images[Math.abs(h) % images.length];
}

function updateDatabase(newArticles) {
  console.log('Actualizando archivo noticias.json local...');
  let existingNews = [];
  if (fs.existsSync(NOTICIAS_FILE)) {
    const fileData = fs.readFileSync(NOTICIAS_FILE, 'utf8');
    if(fileData.trim() !== '' && fileData.trim() !== '[]') {
       existingNews = JSON.parse(fileData);
    }
  }
  
  const featuredStory = newArticles.find(n => n.destacada) || newArticles[0];
  if (featuredStory && featuredStory.tweet) {
    const tweetText = `${featuredStory.tweet.trim()}\n\n👉 ${SITE_URL}/notas/${featuredStory.slug}.html`;
    fs.writeFileSync(TWEET_FILE, tweetText, 'utf8');
  }

  const mergedNews = [...newArticles];
  for (const item of existingNews) {
    if (!mergedNews.some(n => n.slug === item.slug)) mergedNews.push(item);
  }
  if (!mergedNews.some(n => n.destacada) && mergedNews.length > 0) mergedNews[0].destacada = true;

  const limitedNews = mergedNews.slice(0, 24);
  fs.writeFileSync(NOTICIAS_FILE, JSON.stringify(limitedNews, null, 2), 'utf8');
  
  // Generar HTML
  const TEMPLATE_FILE = path.join(__dirname, '../templates/noticia-template.html');
  const NOTAS_DIR = path.join(__dirname, '../notas');
  if (fs.existsSync(TEMPLATE_FILE)) {
    console.log('Generando páginas HTML...');
    if (!fs.existsSync(NOTAS_DIR)) fs.mkdirSync(NOTAS_DIR, { recursive: true });
    const templateContent = fs.readFileSync(TEMPLATE_FILE, 'utf8');
    const NOMBRES_CAT = { actualizaciones: 'Actualizaciones', torneos: 'Torneos', equipos: 'Equipos', comunidad: 'Comunidad' };
    
    for (const item of limitedNews) {
      let bodyHtml = item.cuerpo ? item.cuerpo.split('\n\n').map(p => `<p>${p}</p>`).join('') : `<p>${item.bajada}</p>`;
      const dateF = new Date(item.fecha + 'T00:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
      
      let pageImageUrl = item.imagen;
      if (pageImageUrl && !pageImageUrl.startsWith('http')) {
        pageImageUrl = '../' + pageImageUrl.replace(/^\.\.\//, '');
      }

      let metaImageUrl = item.imagen;
      if (metaImageUrl && !metaImageUrl.startsWith('http')) {
        const cleanRel = metaImageUrl.replace(/^\.\.\//, '').replace(/^\//, '');
        metaImageUrl = `${SITE_URL}/${cleanRel}`;
      }
      
      let html = templateContent
        .replace(/\{\{TITLE\}\}/g, item.titulo)
        .replace(/\{\{TITLE_ESCAPED\}\}/g, item.titulo.replace(/"/g, '&quot;'))
        .replace(/\{\{DEK\}\}/g, item.bajada)
        .replace(/\{\{SLUG\}\}/g, item.slug)
        .replace(/\{\{IMAGE\}\}/g, pageImageUrl)
        .replace(/\{\{META_IMAGE\}\}/g, metaImageUrl)
        .replace(/\{\{CATEGORY\}\}/g, item.categoria)
        .replace(/\{\{CATEGORY_LABEL\}\}/g, NOMBRES_CAT[item.categoria] || 'Noticia')
        .replace(/\{\{AUTHOR\}\}/g, item.autor)
        .replace(/\{\{DATE\}\}/g, dateF)
        .replace(/\{\{READTIME\}\}/g, item.lectura)
        .replace(/\{\{BODY_HTML\}\}/g, bodyHtml);
      
      fs.writeFileSync(path.join(NOTAS_DIR, `${item.slug}.html`), html, 'utf8');
    }
  }
}

async function main() {
  try {
    const trends = await fetchTrends();
    const newsItems = await fetchNewsRSS();
    if (newsItems.length === 0) return;
    const scrapedItems = await scrapeArticles(newsItems);
    const finalArticles = await generateArticlesWithGemini(scrapedItems, trends);
    updateDatabase(finalArticles);
    try { require('./generate-sitemap'); } catch(e) {}
    console.log('Pipeline de noticias premium finalizado con éxito.');
  } catch (err) {
    fs.writeFileSync(TWEET_FILE, "CRASH IN MAIN: " + err.stack, 'utf8');
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
