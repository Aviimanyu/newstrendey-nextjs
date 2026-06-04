import { Article, CategoryInfo } from '../types';
import articlesData from '../data/articles.json';
import { fetchGraphQL } from './graphql';
import { getPostBySlug } from './posts';

export const categories: CategoryInfo[] = [
  {
    id: 'autos',
    name: 'Autos & Vehicles',
    description: 'Expert reviews, buying guides, and breaking news on American and international vehicles.',
    color: '#1b5f8a'
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Tech updates, 5G breakdowns, Apple deals, and cybersecurity advice.',
    color: '#0066cc'
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Pro Bowl updates, Western Conference recaps, and star headlines.',
    color: '#26870d'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Celebrity updates, Netflix horror alerts, and awards predictions.',
    color: '#991b1b'
  }
];

// Get all articles (WordPress merged with static articles)
export async function getArticles(): Promise<Article[]> {
  let wpArticles: Article[] = [];

  try {
    const query = `
      query GetPosts {
        posts(first: 50) {
          nodes {
            id
            title
            slug
            content
            date
            excerpt
            categories {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    `;

    const data = await fetchGraphQL(query);

    if (data?.posts?.nodes) {
      wpArticles = data.posts.nodes.map((post: any) => ({
        slug: post.slug || '',
        title: post.title || '',
        content: post.content || '',
        description: post.excerpt?.replace(/<[^>]+>/g, '') || post.content?.replace(/<[^>]+>/g, '').slice(0, 150) || '',
        category: post.categories?.nodes?.[0]?.slug || 'news',
        author: post.author?.node?.name || 'David Williams',
        featuredImage: post.featuredImage?.node?.sourceUrl || '',
        datePublished: post.date || new Date().toISOString(),
        dateModified: post.date || new Date().toISOString(),
        headings: [],
      }));
    }
  } catch (error) {
    console.error('Error fetching articles from WordPress:', error);
  }

  // Filter out static articles that are authors or have the same slug as WordPress posts
  const filteredStatic = (articlesData as Article[]).filter((staticArt) => {
    // Avoid authors
    if (staticArt.category === 'author') return false;
    // Avoid duplicates
    const isDuplicate = wpArticles.some(
      (wpArt) => wpArt.slug?.toLowerCase().trim() === staticArt.slug?.toLowerCase().trim()
    );
    return !isDuplicate;
  });

  // Merge both arrays
  const merged = [...wpArticles, ...filteredStatic];

  // Sort by datePublished descending
  return merged.sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());
}

// Get article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return getPostBySlug(slug);
}

// Category articles
export async function getArticlesByCategory(categoryId: string): Promise<Article[]> {
  if (!categoryId) return [];
  const articles = await getArticles();
  return articles.filter(
    (article) =>
      article.category &&
      article.category.toLowerCase() === categoryId.toLowerCase()
  );
}

// Featured articles
export async function getFeaturedArticles(limit = 4): Promise<Article[]> {
  const articles = await getArticles();
  return articles.slice(0, limit);
}

// Get trending articles
export async function getTrendingArticles(limit = 5): Promise<Article[]> {
  const articles = await getArticles();
  return articles.slice(2, 2 + limit);
}

// Search articles
export async function searchArticles(query: string): Promise<Article[]> {
  if (!query) return [];
  const articles = await getArticles();
  const cleanQuery = query.toLowerCase().trim();
  return articles.filter((article) => {
    return (
      (article.title && article.title.toLowerCase().includes(cleanQuery)) ||
      (article.description && article.description.toLowerCase().includes(cleanQuery)) ||
      (article.content && article.content.toLowerCase().includes(cleanQuery))
    );
  });
}

// Category metadata
export function getCategoryById(id: string): CategoryInfo | undefined {
  if (!id) return undefined;
  return categories.find((cat) => cat.id && cat.id.toLowerCase() === id.toLowerCase());
}
