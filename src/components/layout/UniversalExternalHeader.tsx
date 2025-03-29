
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

interface NavigationItem {
  name: string;
  href: string;
  external?: boolean;
  children?: NavigationItem[];
}

interface UniversalExternalHeaderProps {
  className?: string;
  variant?: 'default' | 'transparent' | 'solid';
}

export const UniversalExternalHeader: React.FC<UniversalExternalHeaderProps> = ({
  className,
  variant = 'default'
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const navigate = useNavigate();

  const mainNavigation: NavigationItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { 
      name: 'Resources', 
      href: '#',
      children: [
        { name: 'Documentation', href: '/help' },
        { name: 'Knowledge Base', href: '/knowledge-base' },
        { name: 'API', href: '/api', external: true },
      ]
    },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Listen to scroll position for sticky header behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (isDesktop && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isDesktop, mobileMenuOpen]);

  // Determine header style based on variant and scroll position
  const headerClasses = {
    default: cn(
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
      isScrolled
        ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border/40'
        : 'bg-transparent'
    ),
    transparent: cn(
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
      isScrolled
        ? 'bg-background/80 backdrop-blur-md shadow-sm'
        : 'bg-transparent'
    ),
    solid: 'fixed top-0 left-0 right-0 z-40 bg-background border-b border-border'
  };

  return (
    <header className={cn(headerClasses[variant], className)}>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold">Acquisition Framework</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-8">
            {mainNavigation.map((item) => (
              item.children ? (
                <div key={item.name} className="relative group">
                  <button 
                    className="flex items-center px-1 text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="flex items-center">
                            {child.name}
                            {child.external && <ExternalLink className="ml-1 h-3 w-3" />}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-1 text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden sm:block">
              <Button 
                onClick={() => navigate('/login')}
                variant="outline"
                size="sm"
                className="mr-2"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                size="sm"
              >
                Get Started
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="lg:hidden flex items-center" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="container mx-auto px-4 pb-4">
            <nav className="flex flex-col space-y-2">
              {mainNavigation.map((item) => (
                <React.Fragment key={item.name}>
                  {item.children ? (
                    <div className="space-y-2 pl-4">
                      <div className="font-medium">{item.name}</div>
                      <div className="flex flex-col space-y-2 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="text-sm text-foreground/80 hover:text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                            {child.external && <ExternalLink className="ml-1 inline h-3 w-3" />}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-base font-medium text-foreground/80 hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </React.Fragment>
              ))}
              <div className="pt-4 border-t border-border/40 mt-4 flex flex-col space-y-2">
                <Button 
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                  size="sm"
                  className="w-full"
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default UniversalExternalHeader;
