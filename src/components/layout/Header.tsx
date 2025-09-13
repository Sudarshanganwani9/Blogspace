import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Menu, PenTool } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg blog-gradient flex items-center justify-center">
              <PenTool className="h-4 w-4 text-white" />
            </div>
            <span className="font-heading text-xl font-bold">BlogSpace</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-blog-primary transition-colors">
              Home
            </Link>
            <Link to="/categories" className="text-sm font-medium text-muted-foreground hover:text-blog-primary transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-blog-primary transition-colors">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 w-64"
              />
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="sm" className="hidden md:flex">
            Write
          </Button>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;