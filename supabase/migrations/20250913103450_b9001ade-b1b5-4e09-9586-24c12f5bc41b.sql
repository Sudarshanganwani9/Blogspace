-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  author_id UUID NOT NULL,
  category_id UUID,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  likes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#6366f1',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL,
  author_id UUID NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tags table
CREATE TABLE public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts_tags junction table
CREATE TABLE public.blog_posts_tags (
  post_id UUID NOT NULL,
  tag_id UUID NOT NULL,
  PRIMARY KEY (post_id, tag_id)
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published posts" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

CREATE POLICY "Authors can view their own posts" 
ON public.blog_posts 
FOR SELECT 
USING (auth.uid() = author_id);

CREATE POLICY "Authors can create posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts" 
ON public.blog_posts 
FOR UPDATE 
USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own posts" 
ON public.blog_posts 
FOR DELETE 
USING (auth.uid() = author_id);

-- RLS Policies for categories
CREATE POLICY "Anyone can view categories" 
ON public.categories 
FOR SELECT 
USING (true);

-- RLS Policies for comments
CREATE POLICY "Anyone can view comments" 
ON public.comments 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create comments" 
ON public.comments 
FOR INSERT 
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own comments" 
ON public.comments 
FOR UPDATE 
USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own comments" 
ON public.comments 
FOR DELETE 
USING (auth.uid() = author_id);

-- RLS Policies for tags
CREATE POLICY "Anyone can view tags" 
ON public.tags 
FOR SELECT 
USING (true);

-- RLS Policies for blog_posts_tags
CREATE POLICY "Anyone can view post tags" 
ON public.blog_posts_tags 
FOR SELECT 
USING (true);

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON public.comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.categories (name, slug, description, color) VALUES
('React', 'react', 'React.js tutorials and best practices', '#61DAFB'),
('TypeScript', 'typescript', 'TypeScript guides and tips', '#3178C6'),
('Web Development', 'web-development', 'General web development topics', '#6366F1'),
('MongoDB', 'mongodb', 'MongoDB database tutorials', '#47A248'),
('Express', 'express', 'Express.js backend development', '#000000'),
('Authentication', 'authentication', 'User authentication and security', '#FF6B6B'),
('API', 'api', 'API design and development', '#4ECDC4'),
('Node.js', 'nodejs', 'Node.js development', '#339933'),
('Security', 'security', 'Web security and best practices', '#E74C3C'),
('Comments', 'comments', 'Comment systems and real-time features', '#9B59B6'),
('Real-time', 'real-time', 'Real-time applications', '#F39C12'),
('Architecture', 'architecture', 'Software architecture patterns', '#34495E'),
('JWT', 'jwt', 'JSON Web Tokens', '#000000'),
('REST', 'rest', 'REST API design', '#FF9F43'),
('Design', 'design', 'Design patterns and UI/UX', '#FF6B9D');

-- Insert some tags
INSERT INTO public.tags (name, slug) VALUES
('React', 'react'),
('TypeScript', 'typescript'),
('MongoDB', 'mongodb'),
('Express', 'express'),
('Node.js', 'nodejs'),
('API', 'api'),
('Authentication', 'authentication'),
('Security', 'security'),
('JWT', 'jwt'),
('REST', 'rest'),
('Comments', 'comments'),
('Real-time', 'real-time'),
('Architecture', 'architecture'),
('Design', 'design'),
('Web Development', 'web-development');