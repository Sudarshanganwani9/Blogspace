import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  image: string;
  tags: string[];
  likes: number;
  comments: number;
  featured?: boolean;
}

const BlogCard = ({ 
  id, 
  title, 
  excerpt, 
  author, 
  publishedAt, 
  readTime, 
  image, 
  tags, 
  likes, 
  comments,
  featured = false 
}: BlogCardProps) => {
  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-medium ${
      featured ? 'ring-2 ring-blog-primary/20' : ''
    }`}>
      <Link to={`/post/${id}`}>
        <div className="aspect-[16/10] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {tags.slice(0, 2).map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs bg-blog-surface-secondary hover:bg-blog-primary hover:text-white transition-colors"
            >
              {tag}
            </Badge>
          ))}
          {featured && (
            <Badge className="text-xs blog-gradient text-white">
              Featured
            </Badge>
          )}
        </div>
        
        <Link to={`/post/${id}`}>
          <h3 className="font-heading text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blog-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={author.avatar} />
              <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{author.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{publishedAt}</span>
                <span>·</span>
                <Clock className="h-3 w-3" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{comments}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;