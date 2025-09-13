import { useState } from "react";
import Header from "@/components/layout/Header";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import Sidebar from "@/components/blog/Sidebar";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data - in real app this would come from Supabase
  const featuredPost = {
    id: "1",
    title: "Building Modern Web Applications with React and TypeScript",
    excerpt: "Discover the best practices for creating scalable, maintainable React applications using TypeScript. Learn about component architecture, state management, and testing strategies.",
    author: {
      name: "Sarah Chen",
      avatar: "",
      role: "Senior Developer"
    },
    publishedAt: "Nov 12, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop&crop=entropy&auto=format",
    tags: ["React", "TypeScript", "Web Development"],
    likes: 234,
    comments: 45
  };

  const blogPosts = [
    {
      id: "2",
      title: "Understanding MongoDB Aggregation Pipeline",
      excerpt: "Deep dive into MongoDB's powerful aggregation framework and learn how to process and analyze your data efficiently.",
      author: {
        name: "Mike Johnson",
        avatar: "",
        role: "Backend Developer"
      },
      publishedAt: "Nov 10, 2024",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&crop=entropy&auto=format",
      tags: ["MongoDB", "Database", "Backend"],
      likes: 156,
      comments: 23,
      featured: true
    },
    {
      id: "3",
      title: "Express.js Best Practices for Production",
      excerpt: "Learn essential Express.js patterns and practices for building robust, scalable APIs that can handle production workloads.",
      author: {
        name: "Alex Rivera",
        avatar: "",
        role: "Full Stack Developer"
      },
      publishedAt: "Nov 8, 2024",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=500&fit=crop&crop=entropy&auto=format",
      tags: ["Express", "Node.js", "API"],
      likes: 189,
      comments: 34
    },
    {
      id: "4",
      title: "User Authentication with JWT and Bcrypt",
      excerpt: "Implement secure user authentication in your Node.js applications using JSON Web Tokens and proper password hashing.",
      author: {
        name: "Emma Davis",
        avatar: "",
        role: "Security Engineer"
      },
      publishedAt: "Nov 6, 2024",
      readTime: "15 min read",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop&crop=entropy&auto=format",
      tags: ["Authentication", "Security", "JWT"],
      likes: 267,
      comments: 56
    },
    {
      id: "5",
      title: "Building RESTful APIs: A Complete Guide",
      excerpt: "Master the art of designing and implementing RESTful APIs that are intuitive, efficient, and maintainable.",
      author: {
        name: "David Kim",
        avatar: "",
        role: "API Designer"
      },
      publishedAt: "Nov 4, 2024",
      readTime: "18 min read",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop&crop=entropy&auto=format",
      tags: ["API", "REST", "Design"],
      likes: 145,
      comments: 28
    },
    {
      id: "6",
      title: "Comment System Architecture and Implementation",
      excerpt: "Design and build a scalable comment system with nested replies, real-time updates, and moderation features.",
      author: {
        name: "Lisa Zhang",
        avatar: "",
        role: "Frontend Architect"
      },
      publishedAt: "Nov 2, 2024",
      readTime: "14 min read",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=500&fit=crop&crop=entropy&auto=format",
      tags: ["Comments", "Real-time", "Architecture"],
      likes: 198,
      comments: 42
    }
  ];

  const categories = ["All", "React", "MongoDB", "Express", "Authentication", "API", "TypeScript"];

  const filteredPosts = selectedCategory 
    ? blogPosts.filter(post => post.tags.includes(selectedCategory))
    : blogPosts;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Featured Post */}
        <section className="mb-12">
          <FeaturedPost {...featuredPost} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-semibold mb-4">Latest Articles</h2>
              <CategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
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
