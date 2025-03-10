
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { HeaderLogo } from './navigation/HeaderLogo';
import { HeaderNavigation } from './navigation/HeaderNavigation';
import { HeaderSearch } from './navigation/HeaderSearch';
import { HeaderNotifications } from './navigation/HeaderNotifications';
import { HeaderProfile } from './navigation/HeaderProfile';
import { MobileMenuButton } from './navigation/MobileMenuButton';
import { MobileMenu } from './navigation/MobileMenu';
import { GlobeLock, Flag, FileText, BarChart2, BookOpen, ClipboardCheck, Menu, ChevronDown, FileSearch, Shield, Scale, Users, Building2, Building } from 'lucide-react';

export const UniversalInternalHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // Main sections for quick access in dropdown
  const mainSections = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: BarChart2 },
    { id: 'federal', label: 'Federal Acquisition', path: '/federal-acquisition', icon: GlobeLock },
    { id: 'texas', label: 'Texas Acquisition', path: '/texas-acquisition', icon: Flag },
    { id: 'solicitation', label: 'Solicitation Review', path: '/solicitation-review', icon: FileText },
    { id: 'documents', label: 'Document Control', path: '/document-control', icon: FileSearch },
    { id: 'market', label: 'Market Research', path: '/market-research', icon: Building },
    { id: 'knowledge', label: 'Knowledge Base', path: '/knowledge-base', icon: BookOpen },
    { id: 'compliance', label: 'Compliance', path: '/compliance', icon: Shield },
    { id: 'legal', label: 'Legal Review', path: '/legal-review', icon: Scale },
    { id: 'small', label: 'Small Business', path: '/small-business', icon: Users },
    { id: 'quality', label: 'Quality Assurance', path: '/quality-assurance', icon: ClipboardCheck },
    { id: 'contract', label: 'Contract Management', path: '/contract-management', icon: Building2 },
    { id: 'analytics', label: 'Analytics', path: '/analytics', icon: BarChart2 },
    { id: 'sitemap', label: 'Sitemap', path: '/sitemap', icon: Menu },
  ];

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

          {/* Central Navigation Dropdown */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors ${
                  isDropdownOpen ? 'bg-black/20 text-white' : 'text-gray-300 hover:text-white hover:bg-black/10'
                }`}
                aria-expanded={isDropdownOpen}
              >
                <span>Navigation</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full mt-1 left-0 bg-gray-900 border border-gray-800 rounded-md shadow-lg overflow-hidden w-64 z-50 max-h-[calc(100vh-100px)] overflow-y-auto">
                  <div className="py-1">
                    {mainSections.map((section) => (
                      <Link
                        key={section.id}
                        to={section.path}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          pathname.includes(section.id) || pathname === section.path
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <section.icon className="h-4 w-4 flex-shrink-0" />
                        <span>{section.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
