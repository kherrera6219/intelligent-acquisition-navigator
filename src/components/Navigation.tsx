
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { auditLogger } from '@/lib/audit';

const Navigation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

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
    { path: "/", label: "Landing", description: "Welcome page" },
    { path: "/dashboard", label: "Dashboard", description: "Main dashboard" },
    { path: "/federal-acquisition", label: "Federal Acquisition", description: "Federal acquisition information" },
    { path: "/texas-acquisition", label: "Texas Acquisition", description: "Texas acquisition information" },
    { path: "/market-research", label: "Market Research", description: "Research market information" },
    { path: "/knowledge-base", label: "Knowledge Base", description: "Browse knowledge resources" },
    { path: "/sitemap", label: "Sitemap", description: "View all pages" }
  ];

  return (
    <nav className="flex gap-4 p-4 bg-slate-800">
      {navLinks.map((link) => (
        <Link 
          key={link.path}
          to={link.path} 
          onClick={() => handleNavClick(link.label)} 
          className="text-white hover:text-blue-300"
          title={link.description}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
