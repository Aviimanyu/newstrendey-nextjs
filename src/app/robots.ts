import { MetadataRoute } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // Cache robots.txt for 24 hours

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/search/", "/wp-admin/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "ChatGPT-User",
          "Claude-Web"
        ],
        allow: ["/"],
        disallow: ["/api/", "/_next/", "/search/"],
      }
    ],
    sitemap: "https://newstrendey.com/sitemap.xml",
  };
}
