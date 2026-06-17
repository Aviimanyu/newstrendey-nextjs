const fs = require('fs');
const path = require('path');

const ARTICLES_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'articles.json');

function updateReferences() {
  console.log('Reading articles.json...');
  if (!fs.existsSync(ARTICLES_JSON_PATH)) {
    console.error('articles.json not found!');
    return;
  }

  let content = fs.readFileSync(ARTICLES_JSON_PATH, 'utf8');

  // We want to match paths starting with /wp-content/uploads/ or wp-content/uploads/ 
  // and ending with .png, .jpg, or .jpeg and replace the extension with .webp
  // Example match: /wp-content/uploads/2026/06/best-mid-size-suvs-2026.png -> /wp-content/uploads/2026/06/best-mid-size-suvs-2026.webp
  
  // This regex matches `/wp-content/uploads/` followed by non-quote chars, followed by .png, .jpg, or .jpeg
  const regex = /(\/wp-content\/uploads\/[^"\\]+)\.(png|jpg|jpeg)/gi;
  
  const updatedContent = content.replace(regex, '$1.webp');

  fs.writeFileSync(ARTICLES_JSON_PATH, updatedContent, 'utf8');
  console.log('Successfully updated articles.json image references to WebP.');
}

updateReferences();
