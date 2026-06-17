import { NextResponse } from "next/server";
import vehiclesData from "../../data/vehicles.json";
import { SUPPORTED_LANGUAGES } from "../../lib/translate";

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

  let xmlItems = "";
  const lastmod = new Date().toISOString();

  urls.forEach((url) => {
    const domain = "https://newstrendey.com";
    let path = url.substring(domain.length);
    if (!path.startsWith("/")) {
      path = "/" + path;
    }

    // 1. English default entry
    xmlItems += `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}${path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${domain}${path}" />\n`;
    
    SUPPORTED_LANGUAGES.forEach((lang) => {
      xmlItems += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${domain}/${lang}${path}" />\n`;
    });
    
    xmlItems += `  </url>\n`;

    // 2. Localized entries
    SUPPORTED_LANGUAGES.forEach((lang) => {
      xmlItems += `  <url>
    <loc>${domain}/${lang}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}${path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${domain}${path}" />\n`;

      SUPPORTED_LANGUAGES.forEach((otherLang) => {
        xmlItems += `    <xhtml:link rel="alternate" hreflang="${otherLang}" href="${domain}/${otherLang}${path}" />\n`;
      });

      xmlItems += `  </url>\n`;
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
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
