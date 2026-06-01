export interface Heading {
  text: string;
  id: string;
  level: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  datePublished: string;
  dateModified: string;
  author: string;
  featuredImage: string;
  headings: Heading[];
  content: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  color: string;
}
