import { fetchGraphQL } from './graphql';
import articlesData from '../data/articles.json';
import { Article } from '../types';

const staticArticles = articlesData as Article[];

export async function getPostBySlug(slug: string): Promise<Article | null> {
  if (!slug) return null;

  let wpPost: any = null;

  try {
    const query = `
      query GetPost($slug: String!) {
        posts(where: { name: $slug }) {
          nodes {
            id
            title
            content
            slug
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

            seo {
              title
              metaDesc
              canonical
            }
          }
        }
      }
    `;

    const data = await fetchGraphQL(query, {
      slug,
    });

    wpPost = data?.posts?.nodes?.[0];
  } catch (error) {
    console.error('Error fetching post from WordPress:', error);
  }

  if (wpPost) {
    return {
      ...wpPost,
      category: wpPost.categories?.nodes?.[0]?.slug || 'news',

      featuredImage:
        wpPost.featuredImage?.node?.sourceUrl || '',

      datePublished: wpPost.date,
      dateModified: wpPost.date,

      author: wpPost.author?.node?.name || 'David Williams',

      description:
        wpPost.excerpt?.replace(/<[^>]+>/g, '') || '',

      headings: [],
      seo: wpPost.seo ? {
        title: wpPost.seo.title || null,
        metaDesc: wpPost.seo.metaDesc || null,
        canonical: wpPost.seo.canonical || null,
      } : undefined,
    } as any;
  }

  // Fallback to static articles
  const staticArticle = staticArticles.find(
    (art) => art.slug?.toLowerCase().trim() === slug.toLowerCase().trim()
  );

  return staticArticle || null;
}
