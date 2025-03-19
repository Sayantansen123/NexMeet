
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Video, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export function Navbar({ isAuthenticated, onLogout }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out px-6 py-4",
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-opacity duration-300 hover:opacity-80"
        >
          <Video className="h-6 w-6" />
          <span className="font-medium text-xl">NexMeet</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/" ? "text-black" : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/about" ? "text-black" : "text-muted-foreground"
            )}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/contact" ? "text-black" : "text-muted-foreground"
            )}
          >
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full p-0">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLogout}
                className="h-9 w-9 rounded-full p-0"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
