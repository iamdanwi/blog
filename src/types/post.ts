export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    image?: string;
  };
  views?: number;
  likes?: number;
} 