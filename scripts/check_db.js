const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../src/data/articles.json');
if (!fs.existsSync(dbPath)) {
  console.log('Database not found!');
  process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
console.log('Total articles:', articles.length);
console.log('Article slugs:');
articles.forEach(a => console.log(`- ${a.slug} (${a.category})`));
