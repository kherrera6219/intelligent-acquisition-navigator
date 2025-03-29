
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn, ChevronDown } from 'lucide-react';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const UniversalExternalHeader: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events to adjust header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={cn(
      "ms-header-external sticky top-0 z-40 w-full transition-colors duration-200",
      isScrolled 
        ? "bg-background/95 backdrop-blur-lg shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="ms-container h-20">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <MsGradientText className="text-2xl font-bold tracking-tight" gradient="primary">
              ProcurityIQ
            </MsGradientText>
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-accent/20 transition-colors"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-1 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              Features
              <ChevronDown size={16} />
            </div>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* Call to Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <Button asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">
                    Get Started <LogIn className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border/10 p-4 animate-in slide-in-from-top-5">
          <nav className="space-y-2">
            <Link to="/features" className="block py-2 text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link to="/pricing" className="block py-2 text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link to="/about" className="block py-2 text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link to="/contact" className="block py-2 text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>
          
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/10">
            {user ? (
              <Button asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default UniversalExternalHeader;
