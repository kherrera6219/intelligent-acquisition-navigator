
import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navItems";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, BarChart2, FileText, Map, HelpCircle, GlobeLock, Flag, BookOpen, ClipboardCheck, FileSearch, Building, Shield, Scale, Users, Building2, Settings } from 'lucide-react';

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isMobileMenuOpen,
  menuRef
}) => {
  const { pathname } = useLocation();
  const { userRole } = useAuth();
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
  
  const mainMenuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: BarChart2 },
    { label: 'Federal Acquisition', href: '/federal-acquisition', icon: GlobeLock },
    { label: 'Texas Acquisition', href: '/texas-acquisition', icon: Flag },
    { label: 'Solicitation Review', href: '/solicitation-review', icon: FileText },
    { label: 'Document Control', href: '/document-control', icon: FileSearch },
    { label: 'Market Research', href: '/market-research', icon: Building },
    { label: 'Knowledge Base', href: '/knowledge-base', icon: BookOpen },
    { label: 'Compliance', href: '/compliance', icon: Shield },
    { label: 'Legal Review', href: '/legal-review', icon: Scale },
    { label: 'Small Business', href: '/small-business', icon: Users },
    { label: 'Quality Assurance', href: '/quality-assurance', icon: ClipboardCheck },
    { label: 'Contract Management', href: '/contract-management', icon: Building2 },
    { label: 'Source Selection', href: '/source-selection', icon: FileText },
    { label: 'Analytics', href: '/analytics', icon: BarChart2 },
    { label: 'Features', href: '/features', icon: BookOpen },
    { label: 'Pricing', href: '/pricing', icon: BookOpen },
    { label: 'About', href: '/about', icon: BookOpen },
    { label: 'Contact', href: '/contact', icon: BookOpen },
    { label: 'Settings', href: '/settings', icon: Settings },
    { label: 'Sitemap', href: '/sitemap', icon: Map },
    { label: 'Help', href: '/help', icon: HelpCircle },
    { label: 'Privacy', href: '/privacy', icon: Shield }
  ];
  
  if (!isMobileMenuOpen) return null;
  
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div 
          ref={menuRef}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-gray-900 border-t border-gray-800 max-h-[70vh] overflow-y-auto"
        >
          <div className="px-3 pt-2 pb-3 space-y-1">
            <div>
              <button
                onClick={() => setIsMainDropdownOpen(!isMainDropdownOpen)}
                className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                  isMainDropdownOpen ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                aria-expanded={isMainDropdownOpen}
              >
                <span>Main Navigation</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isMainDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isMainDropdownOpen && (
                <div className="pl-3 mt-1 space-y-1">
                  {mainMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        pathname === item.href
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
