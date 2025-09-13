import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  slug: string;
  image_url: string | null;
  author_id: string;
  category_id: string | null;
  featured: boolean | null;
  published: boolean | null;
  likes: number;
  views: number;
  reading_time: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  author?: {
    full_name: string;
    avatar_url: string | null;
  } | null;
  category?: {
    name: string;
    color: string;
  } | null;
  tags?: Array<{
    name: string;
    slug: string;
  }>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
}

export function useBlogPosts(categorySlug?: string | null) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        let query = supabase
          .from('blog_posts')
          .select(`
            *,
            author:profiles(full_name, avatar_url),
            category:categories(name, color)
          `)
          .eq('published', true)
          .order('published_at', { ascending: false });

        if (categorySlug && categorySlug !== 'All') {
          query = query.eq('category.slug', categorySlug);
        }

        const { data, error } = await query;

        if (error) throw error;

        // Transform the data to match our interface
        const transformedPosts = data?.map(post => ({
          ...post,
          tags: [] // We'll get tags separately if needed
        } as unknown as BlogPost)) || [];

        setPosts(transformedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [categorySlug]);

  return { posts, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (error) throw error;
        setCategories(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            author:profiles(full_name, avatar_url),
            category:categories(name, color)
          `)
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;

        // Transform the data to match our interface
        const transformedPost = {
          ...data,
          tags: [] // We'll get tags separately if needed
        } as unknown as BlogPost;

        setPost(transformedPost);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { post, loading, error };
}