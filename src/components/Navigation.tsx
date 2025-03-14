
import React from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { auditLogger } from '@/lib/audit';

const Navigation = () => {
  const { toast } = useToast();

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

  return (
    <nav className="flex gap-4 p-4 bg-slate-800">
      <Link to="/" onClick={() => handleNavClick('Home')} className="text-white hover:text-blue-300">
        Home
      </Link>
      <Link to="/dashboard" onClick={() => handleNavClick('Dashboard')} className="text-white hover:text-blue-300">
        Dashboard
      </Link>
      <Link to="/federal-acquisition" onClick={() => handleNavClick('Federal Acquisition')} className="text-white hover:text-blue-300">
        Federal Acquisition
      </Link>
      <Link to="/market-research" onClick={() => handleNavClick('Market Research')} className="text-white hover:text-blue-300">
        Market Research
      </Link>
      <Link to="/settings" onClick={() => handleNavClick('Settings')} className="text-white hover:text-blue-300">
        Settings
      </Link>
      <Link to="/sitemap" onClick={() => handleNavClick('Sitemap')} className="text-white hover:text-blue-300">
        Sitemap
      </Link>
    </nav>
  );
};

export default Navigation;
