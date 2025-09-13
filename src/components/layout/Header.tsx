import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Menu, PenTool, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
            <a href="#categories" className="text-sm font-medium text-muted-foreground hover:text-blog-primary transition-colors">
              Categories
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-blog-primary transition-colors">
              About
            </a>
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
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-4 w-4" />
          </Button>
          
          {user ? (
            <>
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm" className="hidden md:flex">
                Write
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
                      <AvatarFallback>
                        {user.user_metadata?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>{user.user_metadata?.full_name || user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth">
              <Button className="blog-gradient text-white hover:opacity-90">
                Sign In
              </Button>
            </Link>
          )}
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <div className="container py-4">
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-foreground hover:text-blog-primary transition-colors">Home</Link>
                <a href="#categories" className="text-foreground hover:text-blog-primary transition-colors">Categories</a>
                <a href="#about" className="text-foreground hover:text-blog-primary transition-colors">About</a>
                <div className="pt-4 border-t">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search articles..."
                      className="pl-10 w-full"
                    />
                  </div>
                  {user ? (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        {user.user_metadata?.full_name || user.email}
                      </div>
                      <Button onClick={handleSignOut} variant="outline" className="w-full">
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Link to="/auth" className="block">
                      <Button className="w-full blog-gradient text-white hover:opacity-90">
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;