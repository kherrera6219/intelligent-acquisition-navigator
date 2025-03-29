
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

interface UniversalExternalHeaderProps {
  variant?: 'default' | 'transparent' | 'solid';
}

export const UniversalExternalHeader: React.FC<UniversalExternalHeaderProps> = ({ 
  variant = 'default' 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Track scroll position for transparent header variant
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    if (variant === 'transparent') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial position
    }
    
    return () => {
      if (variant === 'transparent') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [variant]);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
  
  const headerClasses = cn(
    'fixed top-0 left-0 right-0 z-40 transition-all duration-200',
    {
      // Transparent variant becomes solid on scroll
      'bg-transparent': variant === 'transparent' && !isScrolled,
      'bg-background/80 backdrop-blur-sm shadow-sm': 
        variant === 'default' || variant === 'solid' || (variant === 'transparent' && isScrolled),
    }
  );
  
  const textColorClass = cn(
    { 'text-white': variant === 'transparent' && !isScrolled },
    { 'text-foreground': variant !== 'transparent' || isScrolled }
  );
  
  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className={cn("font-bold text-xl flex items-center gap-2", textColorClass)}
        >
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white">
            P
          </div>
          <span>ProcurityIQ</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.href 
                  ? "text-primary" 
                  : textColorClass
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <div className="hidden md:block">
            <Link to="/login">
              <Button variant="default" size="sm">
                Sign In
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={cn("h-6 w-6", textColorClass)} />
            ) : (
              <Menu className={cn("h-6 w-6", textColorClass)} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-b border-border/40 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.href 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-accent/50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-border/40">
                <Link 
                  to="/login"
                  className="w-full"
                >
                  <Button variant="default" className="w-full">
                    Sign In
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default UniversalExternalHeader;
