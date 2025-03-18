import { BlogPost } from './blogService';
import { blogService } from './blogService';

export type Category = 'computer-science' | 'cybersecurity' | 'it';

export interface Post extends Omit<BlogPost, 'category'> {
  category: Category;
  description: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await blogService.getAllPosts();
  return posts.map(post => ({
    ...post,
    category: post.category as Category,
    description: post.content.split('\n')[0].replace('#', '').trim() // Use first line as description
  }));
}

export async function getPostsByCategory(category: Category): Promise<Post[]> {
  const posts = await blogService.getAllPosts();
  return posts
    .filter(post => post.category === category)
    .map(post => ({
      ...post,
      category: post.category as Category,
      description: post.content.split('\n')[0].replace('#', '').trim()
    }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await blogService.getAllPosts();
  const post = posts.find(post => post.slug === slug);
  if (!post) return null;
  
  return {
    ...post,
    category: post.category as Category,
    description: post.content.split('\n')[0].replace('#', '').trim()
  };
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await blogService.getAllPosts();
  return posts
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 3)
    .map(post => ({
      ...post,
      category: post.category as Category,
      description: post.content.split('\n')[0].replace('#', '').trim()
    }));
} 