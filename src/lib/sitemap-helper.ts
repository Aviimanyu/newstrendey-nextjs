import { NextResponse } from "next/server";
import { getArticlesByCategory } from "./db";
import { SUPPORTED_LANGUAGES } from "./translate";

// Helper to render URL XML with all hreflang alternates
function renderUrlXml(url: string, priority: number, changefreq: string, lastmod: string, imagesXml: string = ""): string {
  const domain = "https://newstrendey.com";
  let path = url.substring(domain.length);
  if (!path.startsWith("/")) {
    path = "/" + path;
  }

  let xml = "";

  // 1. Render default/English URL
  xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}${path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${domain}${path}" />\n`;
  
  SUPPORTED_LANGUAGES.forEach((lang) => {
    xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${domain}/${lang}${path}" />\n`;
  });
  
  if (imagesXml) {
    xml += imagesXml;
  }
  xml += `  </url>\n`;

  // 2. Render localized alternate URLs as main entries
  SUPPORTED_LANGUAGES.forEach((lang) => {
    xml += `  <url>
    <loc>${domain}/${lang}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}${path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${domain}${path}" />\n`;

    SUPPORTED_LANGUAGES.forEach((otherLang) => {
      xml += `    <xhtml:link rel="alternate" hreflang="${otherLang}" href="${domain}/${otherLang}${path}" />\n`;
    });

    if (imagesXml) {
      xml += imagesXml;
    }
    xml += `  </url>\n`;
  });

  return xml;
}

export async function generateCategorySitemap(category: string) {
  const lastmod = new Date().toISOString();

  if (category === "static") {
    // Return static pages sitemap
    const staticPages = [
      { url: "https://newstrendey.com/", priority: 1.0, changefreq: "daily" },
      { url: "https://newstrendey.com/about-us/", priority: 0.5, changefreq: "monthly" },
      { url: "https://newstrendey.com/contact-us/", priority: 0.5, changefreq: "monthly" },
      { url: "https://newstrendey.com/privacy-policy/", priority: 0.5, changefreq: "monthly" },
      { url: "https://newstrendey.com/terms-and-conditions/", priority: 0.5, changefreq: "monthly" },
      { url: "https://newstrendey.com/disclaimer/", priority: 0.5, changefreq: "monthly" },
      { url: "https://newstrendey.com/editorial-policy/", priority: 0.5, changefreq: "monthly" },
      { url: "https://newstrendey.com/fact-checking-policy/", priority: 0.5, changefreq: "monthly" },
      { url: "https://newstrendey.com/corrections-policy/", priority: 0.5, changefreq: "monthly" },
      { url: "https://newstrendey.com/ownership-and-funding/", priority: 0.5, changefreq: "monthly" },
      { url: "https://newstrendey.com/autos/compare/", priority: 0.6, changefreq: "daily" },
    ];

    let xmlItems = "";
    staticPages.forEach((page) => {
      xmlItems += renderUrlXml(page.url, page.priority, page.changefreq, lastmod);
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${xmlItems}</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=600",
      },
    });
  }

  // Fetch articles belonging to this specific category
  const articles = await getArticlesByCategory(category);
  let xmlItems = "";

  // 1. Add the category listing page itself
  const catUrl = `https://newstrendey.com/${category}/`;
  xmlItems += renderUrlXml(catUrl, 0.9, "daily", lastmod);

  // 2. Add individual article routes
  articles.forEach((article) => {
    let dateModifiedStr = lastmod;
    if (article.dateModified) {
      try {
        dateModifiedStr = new Date(article.dateModified).toISOString();
      } catch (e) {
        // Keep fallback
      }
    }

    const locUrl = `https://newstrendey.com/${article.category.toLowerCase()}/${article.slug}/`;

    let imagesXml = "";
    if (article.featuredImage) {
      let imageUrl = article.featuredImage;
      if (imageUrl.startsWith("/")) {
        imageUrl = `https://newstrendey.com${imageUrl}`;
      }

      // Escape XML characters in title
      const escapedTitle = article.title
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

      imagesXml = `    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title><![CDATA[${escapedTitle}]]></image:title>
    </image:image>\n`;
    }

    xmlItems += renderUrlXml(locUrl, 0.8, "weekly", dateModifiedStr, imagesXml);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${xmlItems}</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
