import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();

  // Mock data - in real app this would come from Supabase
  const post = {
    id: "1",
    title: "Building Modern Web Applications with React and TypeScript",
    content: `
      <p>In today's rapidly evolving web development landscape, creating scalable and maintainable applications has become more crucial than ever. React and TypeScript have emerged as a powerful combination that enables developers to build robust, type-safe applications with confidence.</p>
      
      <h2>Why React and TypeScript?</h2>
      <p>The combination of React's component-based architecture and TypeScript's static typing provides numerous benefits:</p>
      
      <ul>
        <li><strong>Type Safety:</strong> Catch errors at compile time rather than runtime</li>
        <li><strong>Better Developer Experience:</strong> Enhanced IDE support with autocomplete and refactoring</li>
        <li><strong>Maintainability:</strong> Clear interfaces and contracts between components</li>
        <li><strong>Team Collaboration:</strong> Self-documenting code that's easier for teams to work with</li>
      </ul>
      
      <h2>Setting Up Your Project</h2>
      <p>Getting started with React and TypeScript is straightforward. You can use Create React App with TypeScript template or modern build tools like Vite for faster development.</p>
      
      <pre><code>npx create-react-app my-app --template typescript
# or
npm create vite@latest my-app -- --template react-ts</code></pre>
      
      <h2>Component Architecture Best Practices</h2>
      <p>When building React applications with TypeScript, following these architectural patterns will help maintain clean, scalable code:</p>
      
      <h3>1. Define Clear Interfaces</h3>
      <p>Always define TypeScript interfaces for your component props:</p>
      
      <pre><code>interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};</code></pre>
      
      <h3>2. Use Generic Types</h3>
      <p>Leverage TypeScript's generic types for reusable components:</p>
      
      <pre><code>interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}</code></pre>
      
      <h2>State Management</h2>
      <p>Choose the right state management solution based on your application's complexity:</p>
      
      <ul>
        <li><strong>useState & useReducer:</strong> For local component state</li>
        <li><strong>Context API:</strong> For sharing state across component trees</li>
        <li><strong>Zustand/Redux Toolkit:</strong> For complex global state management</li>
      </ul>
      
      <h2>Testing Strategies</h2>
      <p>TypeScript enhances your testing capabilities by providing type safety in your tests:</p>
      
      <pre><code>import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with correct text', () => {
  render(<Button variant="primary">Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});</code></pre>
      
      <h2>Conclusion</h2>
      <p>React and TypeScript together provide a powerful foundation for building modern web applications. By following these best practices and leveraging TypeScript's type system, you can create applications that are not only robust and maintainable but also enjoyable to develop.</p>
      
      <p>Remember, the key to success is starting simple and gradually adopting more advanced patterns as your application grows. Happy coding!</p>
    `,
    author: {
      name: "Sarah Chen",
      avatar: "",
      role: "Senior Developer",
      bio: "Full-stack developer with 8+ years of experience building scalable web applications. Passionate about React, TypeScript, and developer experience."
    },
    publishedAt: "Nov 12, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop&crop=entropy&auto=format",
    tags: ["React", "TypeScript", "Web Development", "Frontend"],
    likes: 234,
    comments: 45,
    isLiked: false,
    isBookmarked: false
  };

  const comments = [
    {
      id: 1,
      author: {
        name: "Mike Johnson",
        avatar: "",
      },
      content: "Great article! The examples are really helpful, especially the generic types section. I've been struggling with making reusable components and this clears up a lot of confusion.",
      timestamp: "2 hours ago",
      likes: 12,
      replies: []
    },
    {
      id: 2,
      author: {
        name: "Alex Rivera",
        avatar: "",
      },
      content: "This is exactly what I needed. Just started a new project with React and TypeScript. The component architecture section is gold!",
      timestamp: "4 hours ago",
      likes: 8,
      replies: [
        {
          id: 21,
          author: {
            name: "Sarah Chen",
            avatar: "",
          },
          content: "Thanks Alex! Feel free to reach out if you have any specific questions as you build your project.",
          timestamp: "3 hours ago",
          likes: 3
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-blog-surface-secondary hover:bg-blog-primary hover:text-white transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{post.author.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{post.publishedAt}</span>
                  <span>·</span>
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                {post.likes}
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                {post.comments}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="aspect-[21/9] overflow-hidden rounded-xl mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Bio */}
        <Card className="p-6 mb-12">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-heading text-xl font-semibold mb-1">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{post.author.role}</p>
              <p className="text-sm leading-relaxed">{post.author.bio}</p>
              <Button variant="outline" size="sm" className="mt-4">
                Follow
              </Button>
            </div>
          </div>
        </Card>

        {/* Comments Section */}
        <section>
          <h2 className="font-heading text-2xl font-semibold mb-6">
            Comments ({comments.length})
          </h2>
          
          {/* Add Comment */}
          <Card className="p-6 mb-8">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>YU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea 
                  placeholder="Share your thoughts..." 
                  className="mb-4"
                />
                <Button className="blog-gradient text-white">
                  Post Comment
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id} className="p-6">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>{comment.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{comment.author.name}</h4>
                      <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3">{comment.content}</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blog-primary transition-colors">
                        <Heart className="h-4 w-4" />
                        {comment.likes}
                      </button>
                      <button className="text-sm text-muted-foreground hover:text-blog-primary transition-colors">
                        Reply
                      </button>
                    </div>
                    
                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-muted space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={reply.author.avatar} />
                              <AvatarFallback>{reply.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-medium text-sm">{reply.author.name}</h5>
                                <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                              </div>
                              <p className="text-sm leading-relaxed">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};

export default BlogPost;