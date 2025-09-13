import { useParams } from "react-router-dom";
import { useBlogPost } from "@/hooks/useBlogData";
import Header from "@/components/layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Share2, Clock, Calendar, Eye, Bookmark } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const { post, loading, error } = useBlogPost(slug || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-6">
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.category?.name || 'Uncategorized'}</span>
                  <span>•</span>
                  <span>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                  <span>•</span>
                  <span>{post.reading_time} min read</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.author?.avatar_url || ''} />
                    <AvatarFallback>{post.author?.full_name?.split(' ').map(n => n[0]).join('') || 'A'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{post.author?.full_name || 'Anonymous'}</div>
                    <div className="text-sm text-muted-foreground">Author</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
            
            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src={post.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop&crop=entropy&auto=format'} 
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-medium"
              />
            </div>
            
            {/* Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || 'No content available.' }}
            />
          </div>
          
          {/* Author Bio */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={post.author?.avatar_url || ''} />
                  <AvatarFallback>{post.author?.full_name?.split(' ').map(n => n[0]).join('') || 'A'}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{post.author?.full_name || 'Anonymous'}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Author</p>
                  <p className="text-sm">Passionate writer and developer sharing insights about modern web development.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Engagement */}
          <div className="flex items-center justify-between py-6 border-t border-b">
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>0</span>
              </Button>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>{post.views} views</span>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share article
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;