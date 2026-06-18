import { NextResponse } from "next/server";
import { getArticles } from "../../lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 600; // Cache news sitemap for 10 minutes

export async function GET() {
  const allArticles = await getArticles();
  
  // Clean articles: avoid author pages
  const articles = allArticles.filter(art => art.category !== "author" && art.slug);

  // Filter for articles published in the last 48 hours and deduplicate by slug
  const fortyEightHoursAgo = Date.now() - 48 * 60 * 60 * 1000;
  const seenSlugs = new Set<string>();
  let recentArticles = articles.filter((article) => {
    const pubTime = new Date(article.datePublished).getTime();
    if (pubTime < fortyEightHoursAgo) return false;
    const slug = article.slug?.toLowerCase().trim();
    if (!slug || seenSlugs.has(slug)) return false;
    seenSlugs.add(slug);
    return true;
  });

  // Fallback to top 5 articles if no article has been published in the last 48 hours
  if (recentArticles.length === 0) {
    const fallbackSeen = new Set<string>();
    recentArticles = articles.filter((article) => {
      const slug = article.slug?.toLowerCase().trim();
      if (!slug || fallbackSeen.has(slug)) return false;
      fallbackSeen.add(slug);
      return true;
    }).slice(0, 5);
  }

  let xmlItems = "";
  recentArticles.forEach((article) => {
    const locUrl = `https://newstrendey.com/${article.category.toLowerCase()}/${article.slug}/`;
    
    let datePubStr = new Date().toISOString();
    if (article.datePublished) {
      try {
        datePubStr = new Date(article.datePublished).toISOString();
      } catch (e) {
        // Keep fallback
      }
    }

    const escapedTitle = article.title
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

    xmlItems += `  <url>
    <loc>${locUrl}</loc>
    <news:news>
      <news:publication>
        <news:name>NewsTrendey</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${datePubStr}</news:publication_date>
      <news:title><![CDATA[${escapedTitle}]]></news:title>
    </news:news>
  </url>\n`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
>
${xmlItems}</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600, stale-while-revalidate=120",
    },
  });
}
