import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Category } from '@/app/types/post';

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  category: Category;
  author: {
    id: string;
    name: string;
    email: string;
  };
  tags: string[];
  date: Date;
  slug: string;
  views?: number;
  likes?: number;
}

const COLLECTION_NAME = 'posts';

export const blogService = {
  // Create a new blog post
  async createPost(post: Omit<BlogPost, 'id' | 'views' | 'likes'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...post,
        views: 0,
        likes: 0,
        date: Timestamp.fromDate(post.date),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Get all posts
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: (doc.data().date as Timestamp).toDate(),
      })) as BlogPost[];
    } catch (error) {
      console.error('Error getting posts:', error);
      throw error;
    }
  },

  // Get posts by author
  async getPostsByAuthor(authorId: string): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('author.id', '==', authorId),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: (doc.data().date as Timestamp).toDate(),
      })) as BlogPost[];
    } catch (error) {
      console.error('Error getting posts by author:', error);
      throw error;
    }
  },

  // Get a single post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
        date: (docSnap.data().date as Timestamp).toDate(),
      } as BlogPost;
    } catch (error) {
      console.error('Error getting post:', error);
      throw error;
    }
  },

  // Get a single post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('slug', '==', slug)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: (data.date as Timestamp).toDate(),
        } as BlogPost;
      }
      return null;
    } catch (error) {
      console.error('Error getting post by slug:', error);
      throw error;
    }
  },

  // Update a blog post
  async updatePost(id: string, updates: Partial<BlogPost>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  // Delete a blog post
  async deletePost(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  // Increment views of a post
  async incrementViews(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        views: (await getDoc(docRef)).data()?.views + 1 || 1
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
      throw error;
    }
  },

  // Toggle like on a post
  async toggleLike(id: string, userId: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const likesRef = doc(db, 'likes', `${id}_${userId}`);
      const likeDoc = await getDoc(likesRef);

      if (likeDoc.exists()) {
        await deleteDoc(likesRef);
        await updateDoc(docRef, {
          likes: (await getDoc(docRef)).data()?.likes - 1 || 0
        });
      } else {
        await addDoc(collection(db, 'likes'), {
          postId: id,
          userId: userId,
          createdAt: Timestamp.fromDate(new Date())
        });
        await updateDoc(docRef, {
          likes: (await getDoc(docRef)).data()?.likes + 1 || 1
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  },
}; 