const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const articlesPath = path.join(__dirname, '../src/data/articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// Build slug to category map
const slugMap = new Map();
const categorySet = new Set(['autos', 'technology', 'sports', 'entertainment', 'rankings']);

articles.forEach(art => {
  if (art.slug) {
    slugMap.set(art.slug.toLowerCase().trim(), art.category.toLowerCase().trim());
  }
});

console.log(`Loaded ${articles.length} articles.`);
console.log(`Slug-to-Category map size: ${slugMap.size}`);

let totalLinksChecked = 0;
let totalLinksFixed = 0;
let missingFieldsCount = 0;

articles.forEach((art, idx) => {
  // Check required fields
  const requiredFields = ['title', 'slug', 'content', 'category', 'datePublished', 'author'];
  requiredFields.forEach(field => {
    if (!art[field]) {
      console.warn(`Article index ${idx} (${art.title || 'untitled'}) is missing field: ${field}`);
      missingFieldsCount++;
    }
  });

  if (art.content) {
    const $ = cheerio.load(art.content, { xmlMode: false });
    let contentModified = false;

    $('a').each((_, elem) => {
      const href = $(elem).attr('href');
      if (!href) return;
      
      totalLinksChecked++;

      // Check if it's an internal link
      // Match patterns:
      // 1. /slug/index.html
      // 2. /category/slug/index.html
      // 3. https://newstrendey.com/...
      let cleanHref = href;
      let isInternal = false;

      if (href.startsWith('/') || href.startsWith('https://newstrendey.com') || href.startsWith('http://newstrendey.com')) {
        isInternal = true;
        // Strip domain
        cleanHref = href.replace(/^https?:\/\/(www\.)?newstrendey\.com/, '');
      }

      if (isInternal) {
        // Normalize: remove leading/trailing slashes and index.html
        let pathParts = cleanHref.split('?')[0].split('#')[0].split('/').filter(Boolean);
        
        // Remove 'index.html' or similar from parts
        pathParts = pathParts.filter(p => p !== 'index.html' && p !== 'index.php');

        // Check if last part ends with .html
        if (pathParts.length > 0) {
          const lastPart = pathParts[pathParts.length - 1];
          if (lastPart.endsWith('.html')) {
            pathParts[pathParts.length - 1] = lastPart.replace(/\.html$/, '');
          }
        }

        if (pathParts.length === 0) {
          // It's the homepage
          if (href !== '/') {
            $(elem).attr('href', '/');
            contentModified = true;
            totalLinksFixed++;
          }
        } else if (pathParts.length === 1) {
          const part = pathParts[0].toLowerCase();
          if (categorySet.has(part)) {
            // It's a category page
            const newHref = `/${part}/`;
            if (href !== newHref) {
              $(elem).attr('href', newHref);
              contentModified = true;
              totalLinksFixed++;
            }
          } else {
            // It's a slug at root level, look up its category
            const category = slugMap.get(part) || 'autos'; // fallback
            const newHref = `/${category}/${part}/`;
            if (href !== newHref) {
              $(elem).attr('href', newHref);
              contentModified = true;
              totalLinksFixed++;
            }
          }
        } else if (pathParts.length >= 2) {
          // Should be /category/slug/
          const category = pathParts[0].toLowerCase();
          const slug = pathParts[1].toLowerCase();
          
          if (categorySet.has(category)) {
            const newHref = `/${category}/${slug}/`;
            if (href !== newHref) {
              $(elem).attr('href', newHref);
              contentModified = true;
              totalLinksFixed++;
            }
          } else {
            // Category in link is invalid or mismatch, let's look up correct category
            const correctCategory = slugMap.get(slug) || category;
            const newHref = `/${correctCategory}/${slug}/`;
            if (href !== newHref) {
              $(elem).attr('href', newHref);
              contentModified = true;
              totalLinksFixed++;
            }
          }
        }
      }
    });

    if (contentModified) {
      art.content = $.html();
    }
  }
});

console.log(`Diagnosis complete.`);
console.log(`Missing fields found: ${missingFieldsCount}`);
console.log(`Total internal links checked: ${totalLinksChecked}`);
console.log(`Total internal links fixed/normalized: ${totalLinksFixed}`);

if (totalLinksFixed > 0) {
  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
  console.log('Saved fixed articles back to articles.json.');
}
