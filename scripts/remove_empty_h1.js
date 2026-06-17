const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '../src/data/articles.json');
const data = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

let count = 0;
const updatedData = data.map(article => {
  if (article.slug === 'raul-malo-dies-at-60-tribute-legacy') {
    if (article.content.includes('<h1 class="wp-block-heading"></h1>')) {
      article.content = article.content.replace('<h1 class="wp-block-heading"></h1>', '');
      count++;
    }
  }
  return article;
});

if (count > 0) {
  fs.writeFileSync(articlesPath, JSON.stringify(updatedData, null, 2), 'utf8');
  console.log(`Successfully removed empty H1 from 'raul-malo-dies-at-60-tribute-legacy' article. Count: ${count}`);
} else {
  console.log('No empty H1 found in the target article.');
}
