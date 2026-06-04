import { MetadataRoute } from "next";
import { getArticles } from "../lib/db";

export const dynamic = 'force-static';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  
  // Dynamic article routes
  const articleSitemaps = articles.map((article) => ({
    url: `https://newstrendey.com/${article.category.toLowerCase()}/${article.slug}`,
    lastModified: new Date(article.dateModified),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Main category routes
  const categorySitemaps = ["autos", "technology", "sports", "entertainment"].map((cat) => ({
    url: `https://newstrendey.com/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // Core static pages
  const staticSitemaps = ["", "about-us", "contact-us", "privacy-policy", "terms-and-conditions", "disclaimer", "search"].map((page) => ({
    url: `https://newstrendey.com/${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page === "" ? 1.0 : 0.5,
  }));

  return [...staticSitemaps, ...categorySitemaps, ...articleSitemaps];
}
