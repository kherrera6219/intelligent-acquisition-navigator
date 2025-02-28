
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
      <Link to="/proposals" onClick={() => handleNavClick('Proposals')} className="text-white hover:text-blue-300">
        Proposals
      </Link>
      <Link to="/settings" onClick={() => handleNavClick('Settings')} className="text-white hover:text-blue-300">
        Settings
      </Link>
    </nav>
  );
};

export default Navigation;
