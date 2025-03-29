
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Search, Menu, X, Bell, HelpCircle, Settings } from 'lucide-react';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { HeaderSystemStatus } from '@/components/ui/universal/header/HeaderSystemStatus';
import { HeaderUserMenu } from '@/components/ui/universal/header/HeaderUserMenu';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { cn } from '@/lib/utils';

const UniversalInternalHeader: React.FC = () => {
  const { user, refreshSession } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOnline } = useNetworkMonitor();

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
      "ms-header-internal sticky top-0 z-40 w-full transition-colors duration-200 border-b",
      isScrolled 
        ? "bg-background/95 backdrop-blur-lg border-border/40" 
        : "bg-background border-border/20"
    )}>
      <div className="ms-container h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo and System Status */}
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <MsGradientText className="text-lg font-semibold" gradient="primary">
                ProcurityIQ
              </MsGradientText>
            </Link>
            
            <div className="h-8 border-r border-border/40 mx-2 hidden md:block"></div>
            
            <HeaderSystemStatus />
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent/20 transition-colors"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {/* Search Bar (Desktop) */}
          <div className="hidden md:block max-w-md w-full mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-9 bg-muted/40 border border-border/30 rounded-md pl-9 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          
          {/* Action Icons */}
          <div className="hidden md:flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-accent/20 transition-colors" aria-label="Notifications">
              <Bell size={18} className="text-foreground/70" />
            </button>
            <button className="p-2 rounded-full hover:bg-accent/20 transition-colors" aria-label="Help">
              <HelpCircle size={18} className="text-foreground/70" />
            </button>
            <button className="p-2 rounded-full hover:bg-accent/20 transition-colors" aria-label="Settings">
              <Settings size={18} className="text-foreground/70" />
            </button>
            
            <div className="h-8 border-r border-border/40 mx-2"></div>
            
            {/* User Menu */}
            {user && <HeaderUserMenu user={user} />}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border/20 p-4 animate-in slide-in-from-top-5">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-9 bg-muted/40 border border-border/30 rounded-md pl-9 pr-4 text-sm"
              />
            </div>
          </div>
          
          <nav className="space-y-1">
            <Link to="/dashboard" className="ms-nav-item flex items-center gap-2 p-2">
              Dashboard
            </Link>
            <Link to="/proposals" className="ms-nav-item flex items-center gap-2 p-2">
              Proposals
            </Link>
            <Link to="/notifications" className="ms-nav-item flex items-center gap-2 p-2">
              Notifications
            </Link>
            <Link to="/settings" className="ms-nav-item flex items-center gap-2 p-2">
              Settings
            </Link>
            <Link to="/help" className="ms-nav-item flex items-center gap-2 p-2">
              Help & Support
            </Link>
          </nav>
          
          {user && (
            <div className="mt-4 pt-4 border-t border-border/20">
              <HeaderUserMenu user={user} mobileMenuOpen={true} />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default UniversalInternalHeader;
