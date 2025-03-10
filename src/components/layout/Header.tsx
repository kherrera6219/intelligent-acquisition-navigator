
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, Search, Bell } from "lucide-react";
import { HeaderLeft } from "./navigation/HeaderLeft";
import { HeaderRight } from "./navigation/HeaderRight";
import { DesktopNavigation } from "./navigation/DesktopNavigation";
import { MobileNavigation } from "./navigation/MobileNavigation";
import { navItems } from "@/components/layout/navigation/navItems";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const { isAuthenticated, userRole, isAuthorized } = useAuthState();
  const { signOut } = useAuth();
  const [hasNotifications, setHasNotifications] = useState(true);

  // Close the dropdown on location change or outside click
  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && !(event.target as Element).closest(".nav-dropdown")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(prevState => prevState === label ? null : label);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (href: string, items?: typeof navItems): boolean => {
    if (pathname === href) return true;
    
    if (items) {
      return items.some(item => 
        pathname === item.href || 
        (item.items && isActiveRoute(href, item.items))
      );
    }
    
    return false;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-gray-900/90 backdrop-blur-md shadow-md" 
          : "bg-gray-900"
      } ${className}`}
    >
      <div className="container mx-auto">
        <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <HeaderLeft />
            </div>
            <div className="hidden md:ml-6 md:block">
              <DesktopNavigation 
                navItems={navItems}
                isAuthorized={isAuthorized}
                currentPath={pathname}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                isActiveRoute={isActiveRoute}
              />
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-1.5 text-sm bg-gray-800/80 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all w-36 focus:w-52"
              />
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-gray-800/70 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {hasNotifications && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"
                />
              )}
            </Button>
            
            {isAuthenticated ? (
              <HeaderRight 
                userRole={userRole}
                signOut={signOut}
                isMobileMenuOpen={isMobileMenuOpen}
                toggleMobileMenu={toggleMobileMenu}
              />
            ) : (
              <Link to="/auth">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          
          <div className="flex items-center md:hidden space-x-3">
            {!isAuthenticated && (
              <Link to="/auth">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-white mr-2"
                >
                  Sign In
                </Button>
              </Link>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-gray-800/70 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {hasNotifications && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"
                />
              )}
            </Button>
            
            <Button 
              variant="ghost"
              size="icon"
              className="p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-gray-800/70 transition-colors"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        <MobileNavigation
          isMobileMenuOpen={isMobileMenuOpen}
          navItems={navItems}
          isAuthorized={isAuthorized}
          currentPath={pathname}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          isActiveRoute={isActiveRoute}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setOpenDropdown={setOpenDropdown}
        />
      </AnimatePresence>
    </header>
  );
};
