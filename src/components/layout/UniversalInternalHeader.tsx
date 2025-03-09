
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { HeaderLogo } from './navigation/HeaderLogo';
import { HeaderNavigation } from './navigation/HeaderNavigation';
import { HeaderSearch } from './navigation/HeaderSearch';
import { HeaderNotifications } from './navigation/HeaderNotifications';
import { HeaderProfile } from './navigation/HeaderProfile';
import { MobileMenuButton } from './navigation/MobileMenuButton';
import { MobileMenu } from './navigation/MobileMenu';
import { GlobeLock, Flag, FileText, BarChart2, BookOpen, ClipboardCheck } from 'lucide-react';

export const UniversalInternalHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const menuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // Main sections for quick access
  const mainSections = [
    { id: 'federal', label: 'Federal', path: '/federal-acquisition', icon: GlobeLock },
    { id: 'texas', label: 'Texas', path: '/texas-acquisition', icon: Flag },
    { id: 'solicitation', label: 'Solicitation', path: '/solicitation-review', icon: FileText },
    { id: 'analytics', label: 'Analytics', path: '/analytics', icon: BarChart2 },
    { id: 'knowledge', label: 'Knowledge', path: '/knowledge-base', icon: BookOpen },
    { id: 'documents', label: 'Documents', path: '/document-control', icon: ClipboardCheck },
  ];

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set active section based on current path
  useEffect(() => {
    const section = mainSections.find(section => pathname.includes(section.id) || pathname === section.path);
    setActiveSection(section?.id || '');
  }, [pathname]);

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
          ? "bg-secondary/90 backdrop-blur-md shadow-md" 
          : "bg-secondary"
      }`}
    >
      <div className="container mx-auto">
        <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <HeaderLogo />
            <HeaderNavigation />
          </div>

          {/* Quick Access Tabs for Main Sections (visible on medium+ screens) */}
          <div className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
            {mainSections.map((section) => (
              <Link
                key={section.id}
                to={section.path}
                className={`px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-1.5 ${
                  activeSection === section.id
                    ? 'text-white bg-black/20'
                    : 'text-gray-300 hover:text-white hover:bg-black/10'
                }`}
              >
                <section.icon className="h-4 w-4" />
                <span>{section.label}</span>
              </Link>
            ))}
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
