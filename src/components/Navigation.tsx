
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { auditLogger } from '@/lib/audit';
import { useTheme } from '@/providers/ThemeProvider';

/**
 * Secondary navigation component for pages without the main header.
 * This is primarily used as a fallback or in specific contexts where
 * the full header is not needed.
 */
const Navigation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleNavClick = (destination: string) => {
    // Log navigation event
    auditLogger.log({
      action: 'NAVIGATION',
      resource: 'page',
      details: { destination },
      status: 'success'
    });
    
    toast({
      title: 'Navigating',
      description: `Navigating to ${destination}`,
    });
  };

  const navLinks = [
    { path: "/", label: "Home", description: "Welcome page" },
    { path: "/dashboard", label: "Dashboard", description: "Main dashboard" },
    { path: "/federal-acquisition", label: "Federal Acquisition", description: "Federal acquisition information" },
    { path: "/texas-acquisition", label: "Texas Acquisition", description: "Texas acquisition information" },
    { path: "/market-research", label: "Market Research", description: "Research market information" },
    { path: "/knowledge-base", label: "Knowledge Base", description: "Browse knowledge resources" },
    { path: "/analytics", label: "Analytics", description: "View analytics data" },
    { path: "/sitemap", label: "Sitemap", description: "View all pages" }
  ];

  // Use theme-aware styling
  const navClass = `flex gap-4 p-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`;
  const linkClass = `${theme === 'dark' ? 'text-white hover:text-blue-300' : 'text-slate-800 hover:text-blue-600'}`;

  return (
    <nav className={navClass}>
      {navLinks.map((link) => (
        <Link 
          key={link.path}
          to={link.path} 
          onClick={() => handleNavClick(link.label)} 
          className={linkClass}
          title={link.description}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
