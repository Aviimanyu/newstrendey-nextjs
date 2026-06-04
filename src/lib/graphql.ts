const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API || 
  (process.env.NEXT_PUBLIC_WP_URL ? `${process.env.NEXT_PUBLIC_WP_URL}/graphql` : 'https://wp.newstrendey.com/graphql');

export async function fetchGraphQL(query: string, variables = {}) {
  const response = await fetch(WORDPRESS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      query,
      variables,
    }),

    next: {
      revalidate: 3600,
    },
  });

  const json = await response.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('GraphQL Error');
  }

  return json.data;
}
