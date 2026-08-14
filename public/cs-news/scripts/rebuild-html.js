const fs = require('fs');
const path = require('path');

const NOTICIAS_FILE = path.join(__dirname, '../noticias.json');
const TEMPLATE_FILE = path.join(__dirname, '../templates/noticia-template.html');
const NOTAS_DIR = path.join(__dirname, '../notas');
const SITE_URL = 'https://cs-news-seven.vercel.app';

if (fs.existsSync(NOTICIAS_FILE) && fs.existsSync(TEMPLATE_FILE)) {
  const limitedNews = JSON.parse(fs.readFileSync(NOTICIAS_FILE, 'utf8'));
  const templateContent = fs.readFileSync(TEMPLATE_FILE, 'utf8');
  const NOMBRES_CAT = { actualizaciones: 'Actualizaciones', torneos: 'Torneos', equipos: 'Equipos', comunidad: 'Comunidad' };
  
  if (!fs.existsSync(NOTAS_DIR)) fs.mkdirSync(NOTAS_DIR, { recursive: true });
  
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
  console.log('HTML files regenerated with fixed metaImageUrl for social previews.');
}
