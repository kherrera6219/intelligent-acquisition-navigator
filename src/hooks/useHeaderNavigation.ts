
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useHeaderNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

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

  const isActiveRoute = (href: string, items?: any[]): boolean => {
    if (pathname === href) return true;
    
    if (items) {
      return items.some(item => 
        pathname === item.href || 
        (item.items && isActiveRoute(href, item.items))
      );
    }
    
    return false;
  };

  return {
    isMobileMenuOpen,
    openDropdown,
    isScrolled,
    pathname,
    toggleDropdown,
    toggleMobileMenu,
    isActiveRoute,
    setIsMobileMenuOpen,
    setOpenDropdown
  };
};
