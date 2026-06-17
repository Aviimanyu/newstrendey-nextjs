import { NextResponse } from "next/server";
import vehiclesData from "../../data/vehicles.json";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Cache for 1 hour

interface Vehicle {
  id: string;
}

const vehicles = vehiclesData as Vehicle[];

export async function GET() {
  const urls: string[] = [];

  // Generate all unique combinations (v1 < v2 alphabetically)
  for (let i = 0; i < vehicles.length; i++) {
    for (let j = i + 1; j < vehicles.length; j++) {
      const v1 = vehicles[i].id;
      const v2 = vehicles[j].id;
      
      // Determine alphabetical order
      const first = v1 < v2 ? v1 : v2;
      const second = v1 < v2 ? v2 : v1;
      
      urls.push(`https://newstrendey.com/autos/compare/${first}-vs-${second}/`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
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
