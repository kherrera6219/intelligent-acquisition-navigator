
import React from 'react';
import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const HeaderLogo: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // If authenticated, link to the dashboard page, otherwise to the landing page
  const linkPath = isAuthenticated ? "/dashboard" : "/";
  
  return (
    <Link to={linkPath} className="flex items-center">
      <div className="bg-primary/20 p-1.5 rounded-lg mr-2">
        <LayoutDashboard className="h-5 w-5 text-primary" />
      </div>
      <span className="text-lg font-semibold text-white">ProcurityIQ</span>
    </Link>
  );
};
