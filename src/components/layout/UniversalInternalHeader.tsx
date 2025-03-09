
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { HeaderLogo } from './navigation/HeaderLogo';
import { HeaderNavigation } from './navigation/HeaderNavigation';
import { HeaderSearch } from './navigation/HeaderSearch';
import { HeaderNotifications } from './navigation/HeaderNotifications';
import { HeaderProfile } from './navigation/HeaderProfile';
import { MobileMenuButton } from './navigation/MobileMenuButton';
import { MobileMenu } from './navigation/MobileMenu';

export const UniversalInternalHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-gray-900/90 backdrop-blur-md shadow-md" 
          : "bg-gray-900"
      }`}
    >
      <div className="container mx-auto">
        <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <HeaderLogo />
            <HeaderNavigation />
          </div>

          {/* Search, Notifications and Profile */}
          <div className="flex items-center space-x-3">
            <HeaderSearch />
            <HeaderNotifications />
            <HeaderProfile />
            <MobileMenuButton 
              isMobileMenuOpen={isMobileMenuOpen} 
              toggleMobileMenu={toggleMobileMenu} 
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <MobileMenu 
        isMobileMenuOpen={isMobileMenuOpen}
        menuRef={menuRef}
      />
    </header>
  );
};
