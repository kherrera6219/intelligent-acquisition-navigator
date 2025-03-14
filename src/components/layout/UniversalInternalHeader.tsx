
import React, { useState, useEffect } from 'react';
import { HeaderLogo } from "@/components/ui/universal/header/HeaderLogo";
import { HeaderContent } from "@/components/ui/universal/header/HeaderContent";
import { HeaderActionButtons } from "@/components/ui/universal/header/HeaderActionButtons";
import { HeaderUserMenu } from "@/components/ui/universal/header/HeaderUserMenu";
import { useAuth } from "@/hooks/useAuth";
import { generateCsrfToken } from '@/utils/csrfProtection';
import { OfflineSyncStatus } from '@/components/ui/universal/OfflineSyncStatus';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NetworkStatusBanner } from '@/components/ui/universal/NetworkStatusBanner';

const UniversalInternalHeader: React.FC = () => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appMenuOpen, setAppMenuOpen] = useState(false);
  
  // Main app navigation items
  const appNavItems = [
    { label: 'Dashboard', href: '/dashboard', description: 'Main dashboard' },
    { label: 'Federal Acquisition', href: '/federal-acquisition', description: 'Federal acquisition information' },
    { label: 'Texas Acquisition', href: '/texas-acquisition', description: 'Texas acquisition information' },
    { label: 'Knowledge Base', href: '/knowledge-base', description: 'Knowledge resources' },
    { label: 'Solicitation Review', href: '/solicitation-review', description: 'Review solicitations' },
    { label: 'Market Research', href: '/market-research', description: 'Research market information' },
    { label: 'Compliance', href: '/compliance', description: 'Compliance information' },
    { label: 'Analytics', href: '/analytics', description: 'View analytics' },
  ];
  
  // Initialize CSRF token on mount
  useEffect(() => {
    generateCsrfToken();
    
    // Check if mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Function to refresh session
  const refreshSession = async () => {
    // This would typically call your refresh token endpoint
    console.log('Session refresh requested');
    // Example implementation:
    // await authService.refreshSession();
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (appMenuOpen) setAppMenuOpen(false);
  };
  
  const toggleAppMenu = () => {
    setAppMenuOpen(!appMenuOpen);
  };
  
  return (
    <>
      <NetworkStatusBanner />
      <header className="w-full bg-background/70 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <HeaderLogo />
            
            {/* App Menu Button */}
            <div className="relative">
              <button 
                onClick={toggleAppMenu}
                className={cn(
                  "flex items-center gap-2 text-sm rounded-lg px-3 py-1.5",
                  "transition-colors duration-200",
                  "hover:bg-gray-800/70 active:bg-gray-800/90",
                  "focus:outline-none focus:ring-2 focus:ring-primary/30 focus-visible:ring-2",
                  appMenuOpen && "bg-gray-800/70"
                )}
                aria-expanded={appMenuOpen}
                aria-haspopup="true"
              >
                <span>Applications</span>
                <ChevronDown className={cn("h-4 w-4", appMenuOpen && "rotate-180")} />
              </button>
              
              {/* App Menu Dropdown */}
              {appMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
                  <div className="p-2">
                    <div className="flex items-center p-2 border-b border-gray-700 mb-1">
                      <Search className="h-4 w-4 text-gray-400 mr-2" />
                      <input 
                        type="text" 
                        placeholder="Search applications..." 
                        className="bg-transparent border-none text-sm w-full focus:outline-none text-gray-300"
                      />
                    </div>
                    <div className="py-1 max-h-[50vh] overflow-y-auto">
                      {appNavItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                          onClick={() => setAppMenuOpen(false)}
                          title={item.description}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <OfflineSyncStatus compact />
            
            {/* Mobile Menu Toggle */}
            {isMobile && (
              <button
                onClick={toggleMobileMenu}
                className="p-1 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
            
            {/* Desktop Actions & User Menu */}
            <div className={cn(
              "flex items-center gap-4",
              isMobile && !mobileMenuOpen && "hidden",
              isMobile && mobileMenuOpen && "absolute top-16 right-0 bg-gray-900 p-4 border-t border-gray-800 shadow-lg w-full flex-col items-end gap-4 z-50"
            )}>
              <HeaderActionButtons 
                refreshSession={refreshSession}
                mobileMenuOpen={mobileMenuOpen}
                isMobile={isMobile}
              />
              
              {user && <HeaderUserMenu user={user} mobileMenuOpen={mobileMenuOpen} />}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default UniversalInternalHeader;
