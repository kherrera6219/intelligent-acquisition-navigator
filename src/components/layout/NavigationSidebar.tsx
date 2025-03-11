
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Menu, X, PanelLeftClose, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationSidebarProps {
  className?: string;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();
  
  // Check if user has previously minimized the sidebar
  useEffect(() => {
    const minimizedState = localStorage.getItem('sidebar-minimized');
    if (minimizedState === 'true') {
      setIsMinimized(true);
    }
  }, []);
  
  // Save minimized state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-minimized', isMinimized.toString());
  }, [isMinimized]);
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Knowledge Base', href: '/knowledge-base' },
    { name: 'Federal Knowledge', href: '/federal-knowledge-base' },
    { name: 'Federal Acquisition', href: '/federal-acquisition' },
    { name: 'Texas Acquisition', href: '/texas-acquisition' },
    { name: 'Solicitation Review', href: '/solicitation-review' },
    { name: 'Document Control', href: '/document-control' },
    { name: 'Market Research', href: '/market-research' },
    { name: 'Compliance', href: '/compliance' },
    { name: 'Legal Review', href: '/legal-review' },
    { name: 'Small Business', href: '/small-business' },
    { name: 'Quality Assurance', href: '/quality-assurance' },
    { name: 'Source Selection', href: '/source-selection' },
    { name: 'Contract Management', href: '/contract-management' },
    { name: 'Settings', href: '/settings' },
  ];
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMinimize = () => setIsMinimized(!isMinimized);
  
  return (
    <>
      {/* Mobile menu toggle button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar} 
        className="md:hidden fixed top-4 left-4 z-40 bg-background/80 backdrop-blur-sm"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      
      {/* Sidebar navigation */}
      <div
        className={cn(
          "h-full bg-card/90 backdrop-blur-sm border-r border-border transition-all duration-300 ease-in-out z-30 p-4 flex flex-col",
          isMinimized ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        <div className="pt-12 md:pt-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className={cn("text-xl font-semibold", isMinimized && "hidden")}>Navigation</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMinimize}
              className="hidden md:flex"
              aria-label={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
            >
              {isMinimized ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </Button>
          </div>
          
          <nav className="space-y-1 overflow-y-auto flex-grow">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors group hover:bg-white/10",
                  location.pathname === item.href ? "bg-primary/20 text-primary font-medium" : "text-muted-foreground",
                  isMinimized && "justify-center"
                )}
                onClick={() => setIsOpen(false)}
                title={isMinimized ? item.name : undefined}
              >
                <span className={cn(!isMinimized && "flex-1")}>{isMinimized ? item.name.charAt(0) : item.name}</span>
                {!isMinimized && <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className={cn("mt-auto pt-4 border-t border-border/40", isMinimized && "flex flex-col items-center")}>
          <Link 
            to="/help" 
            className={cn("text-sm px-3 py-2 block hover:text-white", isMinimized && "px-0")} 
            title={isMinimized ? "Help & Support" : undefined}
          >
            {isMinimized ? "H" : "Help & Support"}
          </Link>
          <Link 
            to="/settings" 
            className={cn("text-sm px-3 py-2 block hover:text-white", isMinimized && "px-0")} 
            title={isMinimized ? "Settings" : undefined}
          >
            {isMinimized ? "S" : "Settings"}
          </Link>
        </div>
      </div>
      
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};
