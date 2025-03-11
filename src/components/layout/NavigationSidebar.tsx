
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationSidebarProps {
  className?: string;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
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
          "fixed inset-y-0 left-0 bg-card/90 backdrop-blur-sm border-r border-border w-64 transition-transform duration-300 ease-in-out z-30 p-4 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        <div className="pt-12 md:pt-4">
          <h2 className="text-xl font-semibold mb-6 px-2">Navigation</h2>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors group hover:bg-white/10",
                  location.pathname === item.href ? "bg-primary/20 text-primary font-medium" : "text-muted-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.name}</span>
                <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto pt-4 border-t border-border/40">
          <Link to="/help" className="text-sm px-3 py-2 block hover:text-white">Help & Support</Link>
          <Link to="/settings" className="text-sm px-3 py-2 block hover:text-white">Settings</Link>
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
