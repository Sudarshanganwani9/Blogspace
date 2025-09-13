import { useState } from "react";
import Header from "@/components/layout/Header";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import Sidebar from "@/components/blog/Sidebar";
import { useBlogPosts, useCategories } from "@/hooks/useBlogData";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { posts, loading: postsLoading } = useBlogPosts(selectedCategory);
  const { categories, loading: categoriesLoading } = useCategories();

  // Get featured post (first featured post or first post)
  const featuredPost = posts.find(post => post.featured) || posts[0];
  
  // Get non-featured posts
  const regularPosts = posts.filter(post => !post.featured || post.id !== featuredPost?.id);

  // Prepare categories for filter
  const categoryOptions = ['All', ...categories.map(cat => cat.name)];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Featured Post */}
        <section className="mb-12">
          {postsLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          ) : featuredPost ? (
            <FeaturedPost 
              id={featuredPost.id}
              title={featuredPost.title}
              excerpt={featuredPost.excerpt || ''}
              author={{
                name: featuredPost.author?.full_name || 'Anonymous',
                avatar: featuredPost.author?.avatar_url || '',
                role: 'Author'
              }}
              publishedAt={new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
              readTime={`${featuredPost.reading_time} min read`}
              image={featuredPost.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop&crop=entropy&auto=format'}
              tags={featuredPost.tags?.map(tag => tag.name) || []}
              likes={featuredPost.likes}
              comments={0} // TODO: Add comments count
              slug={featuredPost.slug}
            />
          ) : null}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-semibold mb-4">Latest Articles</h2>
              {categoriesLoading ? (
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-20" />
                  ))}
                </div>
              ) : (
                <CategoryFilter 
                  categories={categoryOptions}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                />
              )}
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {postsLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              ) : (
                regularPosts.map((post) => (
                  <BlogCard 
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt || ''}
                    author={{
                      name: post.author?.full_name || 'Anonymous',
                      avatar: post.author?.avatar_url || '',
                      role: 'Author'
                    }}
                    publishedAt={new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                    readTime={`${post.reading_time} min read`}
                    image={post.image_url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&crop=entropy&auto=format'}
                    tags={post.tags?.map(tag => tag.name) || []}
                    likes={post.likes}
                    comments={0} // TODO: Add comments count
                    featured={post.featured}
                    slug={post.slug}
                  />
                ))
              )}
            </div>

            {/* Load More Button */}
            <div className="mt-12 text-center">
              <button className="px-8 py-3 blog-gradient text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                Load More Articles
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="bg-blog-surface border-t mt-16">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="font-heading text-3xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Get the latest articles and insights delivered to your inbox. Join our community of developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border bg-background"
            />
            <button className="px-6 py-3 blog-gradient text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
