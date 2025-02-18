export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: Category;
  imageUrl: string;
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
}

export type Category = 
  | 'national'
  | 'international'
  | 'economy'
  | 'government'
  | 'law';

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bookmarks: string[];
}