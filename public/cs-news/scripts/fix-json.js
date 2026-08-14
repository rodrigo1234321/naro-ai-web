const fs = require('fs');
let data = JSON.parse(fs.readFileSync('noticias.json', 'utf8'));
data.forEach(d => {
  d.autor = 'Redacción CS2 Noticia';
  if (d.tweet && d.tweet.includes('${cleanTitle')) {
    d.tweet = '🚨 ÚLTIMA HORA | ' + d.titulo.substring(0, 180) + ' #CS2';
  }
});
fs.writeFileSync('noticias.json', JSON.stringify(data, null, 2), 'utf8');
console.log('noticias.json fixed');
