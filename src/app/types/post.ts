export type Category = 'computer-science' | 'cybersecurity' | 'it';

export interface Author {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id?: string;
  slug: string;
  title: string;
  description: string;
  category: Category;
  date: Date;
  content: string;
  author: Author;
  tags: string[];
} 