const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '../src/data/articles.json');
const list = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const target = list.filter(a => a.category !== 'author');
console.log('Total non-author articles:', target.length);

const noFaq = [];
const someFaq = [];

target.forEach(a => {
  const faqRegex = /<h5[^>]*class="saswp-faq-question-title\s*[^"]*"[^>]*>([\s\S]*?)<\/h5>\s*<p[^>]*class="saswp-faq-answer-text"[^>]*>([\s\S]*?)<\/p>/g;
  const faqs = [];
  let match;
  while ((match = faqRegex.exec(a.content)) !== null) {
    faqs.push({
      q: match[1].replace(/<[^>]*>/g, '').trim(),
      a: match[2].replace(/<[^>]*>/g, '').trim()
    });
  }
  if (faqs.length === 0) {
    noFaq.push(a.slug);
  } else {
    someFaq.push({ slug: a.slug, count: faqs.length, faqs });
  }
});

console.log('No FAQ slugs:', noFaq);
console.log('Some FAQ slugs & counts:', someFaq.map(x => ({ slug: x.slug, count: x.count })));
