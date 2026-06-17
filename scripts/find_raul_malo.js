const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '../src/data/articles.json');
const data = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

console.log('Total articles:', data.length);
const matching = data.filter(a => a.slug && a.slug.includes('raul-malo'));
console.log('Matching articles:', matching.map(a => ({ slug: a.slug, title: a.title })));

if (matching.length > 0) {
  const art = matching[0];
  console.log('Content snippet (first 500 chars):');
  console.log(art.content ? art.content.substring(0, 500) : 'No content');
  
  console.log('Has empty H1?');
  const h1Match = art.content ? art.content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) : null;
  console.log('H1 matches:', h1Match);
}
