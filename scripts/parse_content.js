const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const targetDir = path.join(__dirname, '../wordpress_mirror/newstrendey.com');
const outputDir = path.join(__dirname, '../src/data');
const outputFile = path.join(outputDir, 'articles.json');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else if (file === 'index.html') {
            results.push(fullPath);
        }
    });
    return results;
}

console.log('Scanning WordPress static mirror directory...');
const htmlFiles = walk(targetDir);
console.log(`Found ${htmlFiles.length} raw index.html files. Beginning parsing...`);

const articles = [];

htmlFiles.forEach((file) => {
    const relPath = path.relative(targetDir, file).replace(/\\/g, '/');

    // Skip technical, query, pagination and feed files
    if (
        relPath.startsWith('wp-') ||
        relPath.startsWith('feed') ||
        relPath.startsWith('comments') ||
        relPath === 'index.html' ||
        relPath.includes('index09f3') ||
        relPath.includes('index0bae') ||
        relPath.includes('indexc3ad') ||
        relPath.includes('xmlrpc') ||
        relPath.includes('/feed/') ||
        relPath.includes('/page/')
    ) {
        return;
    }

    try {
        const html = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(html);

        const title = $('h1.entry-title').text().trim() || $('title').text().trim().replace(' - Newstrendey.com', '');
        
        // Skip error pages or blank titles
        if (title === 'Page Not Found - Newstrendey.com' || title === 'No Title' || title === 'Page has moved') {
            return;
        }

        // Meta Description
        const desc = $('meta[name="description"]').attr('content') || '';

        // Category & Type details
        const pathParts = relPath.split('/');
        let category = 'general';
        let slug = '';
        let type = 'page';

        if (pathParts.length > 2) {
            category = pathParts[0];
            slug = pathParts[pathParts.length - 2];
            type = 'article';
        } else if (pathParts.length === 2) {
            slug = pathParts[0];
            category = pathParts[0];
            type = 'category';
        }

        // Avoid pushing category indices as single articles
        if (type === 'category') {
            return;
        }

        // Dates
        const datePublished = $('time.entry-date.published').attr('datetime') || 
                              $('time').first().attr('datetime') || 
                              new Date().toISOString();
        const dateModified = $('time.updated').attr('datetime') || datePublished;

        // Author
        const author = $('.author-name').text().trim() || 
                       $('.author.vcard a').text().trim() || 
                       'David Williams';

        // Featured Image
        let featuredImage = '';
        const featImgEl = $('.featured-image img').first() || $('.page-header-image-single img').first();
        if (featImgEl.length > 0) {
            featuredImage = featImgEl.attr('src') || '';
        } else {
            // Fallback to og:image
            featuredImage = $('meta[property="og:image"]').attr('content') || '';
        }

        // Clean featured image path to be absolute within public folder
        if (featuredImage) {
            featuredImage = featuredImage.replace(/^https:\/\/newstrendey\.com/, '');
            featuredImage = featuredImage.replace(/^(\.\.\/)+/, '/');
        } else {
            featuredImage = '/wp-content/uploads/2025/12/header_image-1.jpg'; // default fallback
        }

        // Extract and Clean Content HTML
        const contentEl = $('.entry-content').first();
        let contentHtml = '';
        const headings = [];

        if (contentEl.length > 0) {
            // Remove social sharing widgets
            contentEl.find('.scriptlesssocialsharing').remove();
            contentEl.find('.sharedaddy').remove();
            contentEl.find('.wpcnt').remove();
            
            // Remove Table of Contents widget
            contentEl.find('#ez-toc-container').remove();

            // Extract headings for our custom TOC
            contentEl.find('h2, h3').each((i, el) => {
                const text = $(el).text().trim();
                const level = el.tagName.toLowerCase();
                let id = $(el).attr('id') || text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                
                // Ensure id is set on the element
                $(el).attr('id', id);
                
                headings.push({
                    text,
                    id,
                    level
                });
            });

            // Clean up relative image paths inside content
            contentEl.find('img').each((i, img) => {
                let src = $(img).attr('src') || '';
                if (src) {
                    src = src.replace(/^https:\/\/newstrendey\.com/, '');
                    src = src.replace(/^(\.\.\/)+/, '/');
                    $(img).attr('src', src);
                }
                
                let srcset = $(img).attr('srcset') || '';
                if (srcset) {
                    srcset = srcset.replace(/https:\/\/newstrendey\.com/g, '');
                    srcset = srcset.replace(/(\.\.\/)+/g, '/');
                    $(img).attr('srcset', srcset);
                }
            });

            // Clean up internal links to point to Next.js routes
            contentEl.find('a').each((i, link) => {
                let href = $(link).attr('href') || '';
                if (href.startsWith('https://newstrendey.com') || href.startsWith('../../') || href.startsWith('../')) {
                    href = href.replace(/^https:\/\/newstrendey\.com/, '');
                    href = href.replace(/^(\.\.\/)+/, '/');
                    
                    // Rewrite categories and articles links to point to exact Google-indexed URLs
                    if (href.startsWith('/autos/') || href.startsWith('/technology/') || href.startsWith('/sports/') || href.startsWith('/entertainment/')) {
                        const parts = href.split('/').filter(Boolean);
                        if (parts.length > 1) {
                            href = `/${parts[0]}/${parts[parts.length - 1]}`;
                        } else {
                            href = `/${parts[0]}`;
                        }
                    }
                    $(link).attr('href', href);
                }
            });

            contentHtml = contentEl.html().trim();
        }

        articles.push({
            slug,
            title,
            description: desc,
            category,
            datePublished,
            dateModified,
            author,
            featuredImage,
            headings,
            content: contentHtml
        });

    } catch (err) {
        console.error(`Error parsing file ${file}: ${err.message}`);
    }
});

console.log(`Successfully parsed ${articles.length} clean articles.`);

// Save parsed articles array
fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
console.log(`Database saved successfully to: ${outputFile}`);
