import { NextResponse } from "next/server";
import { getArticlesByCategory } from "./db";

export async function generateCategorySitemap(category: string) {
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

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

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
  xmlItems += `  <url>
    <loc>https://newstrendey.com/${category}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>\n`;

  // 2. Add individual article routes
  articles.forEach((article) => {
    let dateModifiedStr = new Date().toISOString();
    if (article.dateModified) {
      try {
        dateModifiedStr = new Date(article.dateModified).toISOString();
      } catch (e) {
        // Keep fallback
      }
    }

    const locUrl = `https://newstrendey.com/${article.category.toLowerCase()}/${article.slug}/`;

    xmlItems += `  <url>
    <loc>${locUrl}</loc>
    <lastmod>${dateModifiedStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;

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

      xmlItems += `\n    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title><![CDATA[${escapedTitle}]]></image:title>
    </image:image>`;
    }

    xmlItems += `\n  </url>\n`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
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
