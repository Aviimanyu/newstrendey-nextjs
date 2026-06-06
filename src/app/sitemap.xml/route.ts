import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const sitemaps = [
    "https://newstrendey.com/sitemap-static.xml",
    "https://newstrendey.com/sitemap-autos.xml",
    "https://newstrendey.com/sitemap-technology.xml",
    "https://newstrendey.com/sitemap-sports.xml",
    "https://newstrendey.com/sitemap-entertainment.xml",
    "https://newstrendey.com/sitemap-rankings.xml",
    "https://newstrendey.com/sitemap-news.xml",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (url) => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
