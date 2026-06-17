const cheerio = require('cheerio');

const INDEXNOW_KEY = '8c5a2c4e5d7a4b8eb4e9c70a1a8c9b2f';
const HOST = 'newstrendey.com';
const SITEMAP_INDEX_URL = `https://${HOST}/sitemap.xml`;

async function submitIndexNow() {
  console.log(`Fetching sitemap index from: ${SITEMAP_INDEX_URL}`);
  
  const allUrls = new Set();
  
  try {
    const sitemapIndexRes = await fetch(SITEMAP_INDEX_URL);
    if (!sitemapIndexRes.ok) {
      throw new Error(`Failed to fetch sitemap index: ${sitemapIndexRes.status} ${sitemapIndexRes.statusText}`);
    }
    
    const sitemapIndexXml = await sitemapIndexRes.text();
    const $index = cheerio.load(sitemapIndexXml, { xmlMode: true });
    
    const sitemaps = [];
    $index('sitemap loc').each((_, elem) => {
      sitemaps.push($index(elem).text().trim());
    });
    
    console.log(`Found ${sitemaps.length} individual sitemaps in index.`);
    
    for (const sitemapUrl of sitemaps) {
      console.log(`Fetching sitemap: ${sitemapUrl}`);
      const sitemapRes = await fetch(sitemapUrl);
      if (!sitemapRes.ok) {
        console.error(`Warning: Failed to fetch sitemap ${sitemapUrl}`);
        continue;
      }
      
      const sitemapXml = await sitemapRes.text();
      const $sitemap = cheerio.load(sitemapXml, { xmlMode: true });
      
      $sitemap('url loc').each((_, elem) => {
        const url = $sitemap(elem).text().trim();
        // Only submit URLs from the target host
        if (url.includes(HOST)) {
          allUrls.add(url);
        }
      });
    }
    
    const urlList = Array.from(allUrls);
    console.log(`Total unique URLs extracted: ${urlList.length}`);
    
    if (urlList.length === 0) {
      console.log('No URLs found to submit. Exiting.');
      return;
    }
    
    // IndexNow API POST Payload
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urlList
    };
    
    console.log('Submitting URLs to IndexNow API (Bing/Yandex/etc)...');
    
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });
    
    console.log(`HTTP Status: ${response.status}`);
    if (response.ok) {
      console.log('Successfully submitted all URLs to IndexNow!');
      console.log('Bing Webmaster Tools will start crawling your submitted pages shortly.');
    } else {
      const responseText = await response.text();
      console.error(`IndexNow submission failed: ${responseText}`);
    }
  } catch (error) {
    console.error('Error executing IndexNow submission:', error.message);
  }
}

submitIndexNow();
