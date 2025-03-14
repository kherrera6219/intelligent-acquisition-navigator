
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/LoginButton';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';
import { MenuIcon, X } from 'lucide-react';
import { navigationItems } from '@/config/navigationItems';

interface HeaderProps {
  variant?: 'default' | 'compact' | 'transparent' | 'glass';
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  variant = 'default', 
  className
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Close menu when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);
  
  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);
  
  const headerVariantClasses = {
    default: 'bg-background shadow-md',
    compact: 'bg-background/95 backdrop-blur-sm shadow-md',
    transparent: 'bg-transparent',
    glass: 'bg-background/30 backdrop-blur-md border-b border-white/10'
  };
  
  const isCurrentPage = (path: string) => location.pathname === path;
  
  return (
    <header className={cn(
      'sticky top-0 z-50 w-full transition-all duration-200',
      headerVariantClasses[variant],
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
              <span className="ml-3 text-lg font-bold text-foreground">ProcurityIQ</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <ul className="flex space-x-4">
              {/* Navigation items */}
              <li><Link to="/" className={cn("text-sm font-medium hover:text-primary transition-colors", isCurrentPage('/') && "text-primary")}>Home</Link></li>
              <li><Link to="/features" className={cn("text-sm font-medium hover:text-primary transition-colors", isCurrentPage('/features') && "text-primary")}>Features</Link></li>
              <li><Link to="/pricing" className={cn("text-sm font-medium hover:text-primary transition-colors", isCurrentPage('/pricing') && "text-primary")}>Pricing</Link></li>
              <li><Link to="/about" className={cn("text-sm font-medium hover:text-primary transition-colors", isCurrentPage('/about') && "text-primary")}>About</Link></li>
              <li><Link to="/contact" className={cn("text-sm font-medium hover:text-primary transition-colors", isCurrentPage('/contact') && "text-primary")}>Contact</Link></li>
            </ul>
            
            {/* Right side actions */}
            <div className="flex items-center space-x-2 ml-4">
              <ThemeToggle />
              <LoginButton variant="default" size="sm" />
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-gray-800">
          <div className="container mx-auto px-4 py-3">
            <ul className="space-y-2">
              <li><Link to="/" className={cn("block px-3 py-2 rounded-md hover:bg-muted transition-colors", isCurrentPage('/') && "bg-muted")}>Home</Link></li>
              <li><Link to="/features" className={cn("block px-3 py-2 rounded-md hover:bg-muted transition-colors", isCurrentPage('/features') && "bg-muted")}>Features</Link></li>
              <li><Link to="/pricing" className={cn("block px-3 py-2 rounded-md hover:bg-muted transition-colors", isCurrentPage('/pricing') && "bg-muted")}>Pricing</Link></li>
              <li><Link to="/about" className={cn("block px-3 py-2 rounded-md hover:bg-muted transition-colors", isCurrentPage('/about') && "bg-muted")}>About</Link></li>
              <li><Link to="/contact" className={cn("block px-3 py-2 rounded-md hover:bg-muted transition-colors", isCurrentPage('/contact') && "bg-muted")}>Contact</Link></li>
            </ul>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <ThemeToggle />
                <LoginButton variant="default" size="sm" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
