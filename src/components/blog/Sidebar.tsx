import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Star } from "lucide-react";

const Sidebar = () => {
  const trendingPosts = [
    {
      id: 1,
      title: "10 Best Practices for React Development",
      author: "Sarah Chen",
      views: "12.5k",
    },
    {
      id: 2,
      title: "Understanding TypeScript Generics",
      author: "Mike Johnson",
      views: "8.2k",
    },
    {
      id: 3,
      title: "MongoDB vs PostgreSQL: Which to Choose?",
      author: "Alex Rivera",
      views: "15.3k",
    },
  ];

  const topAuthors = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      posts: 45,
      followers: "2.5k",
      avatar: "",
    },
    {
      name: "Mike Johnson",
      role: "Tech Lead",
      posts: 32,
      followers: "1.8k",
      avatar: "",
    },
    {
      name: "Alex Rivera",
      role: "Full Stack",
      posts: 28,
      followers: "3.2k",
      avatar: "",
    },
  ];

  const popularTags = [
    "React", "TypeScript", "Node.js", "MongoDB", "Express", "JavaScript",
    "Web Development", "Backend", "Frontend", "Database"
  ];

  return (
    <div className="space-y-6">
      {/* Trending Posts */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-blog-primary" />
          <h3 className="font-heading text-lg font-semibold">Trending Posts</h3>
        </div>
        <div className="space-y-4">
          {trendingPosts.map((post, index) => (
            <div key={post.id} className="flex gap-3 group cursor-pointer">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blog-primary/10 flex items-center justify-center text-sm font-semibold text-blog-primary">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm group-hover:text-blog-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Authors */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-blog-primary" />
          <h3 className="font-heading text-lg font-semibold">Top Authors</h3>
        </div>
        <div className="space-y-4">
          {topAuthors.map((author) => (
            <div key={author.name} className="flex items-center gap-3 group cursor-pointer">
              <Avatar className="h-10 w-10">
                <AvatarImage src={author.avatar} />
                <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm group-hover:text-blog-primary transition-colors">
                  {author.name}
                </h4>
                <p className="text-xs text-muted-foreground">{author.role}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{author.posts} posts</span>
                  <span>·</span>
                  <span>{author.followers} followers</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Popular Tags */}
      <Card className="p-6">
        <h3 className="font-heading text-lg font-semibold mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="cursor-pointer hover:bg-blog-primary hover:text-white transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;