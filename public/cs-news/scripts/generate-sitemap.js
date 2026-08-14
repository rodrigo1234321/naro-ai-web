const fs = require('fs');
const path = require('path');

const NOTICIAS_FILE = path.join(__dirname, '../noticias.json');
const SITEMAP_FILE = path.join(__dirname, '../sitemap.xml');
const SITE_URL = 'https://cs-news-seven.vercel.app';

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  let news = [];
  if (fs.existsSync(NOTICIAS_FILE)) {
    news = JSON.parse(fs.readFileSync(NOTICIAS_FILE, 'utf8'));
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
`;

  for (const item of news) {
    xml += `  <url>
    <loc>${SITE_URL}/notas/${item.slug}.html</loc>
    <lastmod>${item.fecha || today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  fs.writeFileSync(SITEMAP_FILE, xml, 'utf8');
  console.log('sitemap.xml generado exitosamente con ' + (news.length + 1) + ' URLs.');
}

generateSitemap();
