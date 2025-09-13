import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedPostProps {
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
}

const FeaturedPost = ({ 
  id, 
  title, 
  excerpt, 
  author, 
  publishedAt, 
  readTime, 
  image, 
  tags, 
  likes, 
  comments 
}: FeaturedPostProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl group">
      <div className="aspect-[21/9] relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-white/20 text-white hover:bg-white/30">
              Featured
            </Badge>
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="border-white/30 text-white hover:bg-white/20">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Link to={`/post/${id}`}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 group-hover:text-blog-primary transition-colors">
              {title}
            </h1>
          </Link>
          
          <p className="text-white/90 text-lg mb-6 max-w-2xl">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 ring-2 ring-white/30">
                <AvatarImage src={author.avatar} />
                <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-white">{author.name}</p>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Calendar className="h-4 w-4" />
                  <span>{publishedAt}</span>
                  <span>·</span>
                  <Clock className="h-4 w-4" />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>{likes}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span>{comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;