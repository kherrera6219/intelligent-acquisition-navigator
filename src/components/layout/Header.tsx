
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HeaderLeft } from "./navigation/HeaderLeft";
import { DesktopNavigation } from "./navigation/DesktopNavigation";
import { MobileNavigation } from "./navigation/MobileNavigation";
import { navItems } from "@/components/layout/navigation/navItems";
import { useAuthState } from "@/hooks/useAuthState";
import { HeaderContainer } from "./header/HeaderContainer";
import { HeaderActions } from "./header/HeaderActions";
import { MobileMenuToggle } from "./header/MobileMenuToggle";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const { isAuthenticated, userRole, isAuthorized } = useAuthState();

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
    <HeaderContainer isScrolled={isScrolled} className={className}>
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
      
      <HeaderActions 
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        userRole={userRole}
        isAuthenticated={isAuthenticated}
      />
      
      <MobileMenuToggle 
        isMobileMenuOpen={isMobileMenuOpen} 
        toggleMobileMenu={toggleMobileMenu} 
      />
      
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
    </HeaderContainer>
  );
};
