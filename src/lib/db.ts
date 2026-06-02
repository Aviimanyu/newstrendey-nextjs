import { Article, CategoryInfo } from '../types';
import articlesData from '../data/articles.json';

const articles: Article[] = articlesData as Article[];

export const categories: CategoryInfo[] = [
  {
    id: 'autos',
    name: 'Autos & Vehicles',
    description: 'Expert reviews, buying guides, and breaking news on American and international vehicles.',
    color: '#1b5f8a' // brand primary blue
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Tech updates, 5G breakdowns, Apple deals, and cybersecurity advice.',
    color: '#0066cc' // vibrant accent blue
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Pro Bowl updates, Western Conference recaps, and star headlines.',
    color: '#26870d' // vibrant field green
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Celebrity updates, Netflix horror alerts, and awards predictions.',
    color: '#be6464' // warning/rose red
  }
];

// Get all articles sorted by date
export function getArticles(): Article[] {
  return [...articles].sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());
}

// Get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  if (!slug) return undefined;
  return articles.find(
  article =>
    article.slug?.toLowerCase().trim() ===
    slug?.toLowerCase().trim()
);
}

// Get articles in a category
export function getArticlesByCategory(categoryId: string): Article[] {
  if (!categoryId) return [];
  return getArticles().filter(article => 
    article.category && 
    article.category.toLowerCase() === categoryId.toLowerCase()
  );
}

// Get featured articles
export function getFeaturedArticles(limit = 4): Article[] {
  // Return the longest articles or newest ones under specific categories as featured
  return getArticles().slice(0, limit);
}

// Get trending articles
export function getTrendingArticles(limit = 5): Article[] {
  // Return a slice of recent articles
  return getArticles().slice(2, 2 + limit);
}

// Search articles
export function searchArticles(query: string): Article[] {
  if (!query) return [];
  const cleanQuery = query.toLowerCase().trim();
  return getArticles().filter(article => {
    return (
      (article.title && article.title.toLowerCase().includes(cleanQuery)) ||
      (article.description && article.description.toLowerCase().includes(cleanQuery)) ||
      (article.content && article.content.toLowerCase().includes(cleanQuery))
    );
  });
}

// Get category metadata
export function getCategoryById(id: string): CategoryInfo | undefined {
  if (!id) return undefined;
  return categories.find(cat => cat.id && cat.id.toLowerCase() === id.toLowerCase());
}
