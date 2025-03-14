
import { Link } from "react-router-dom";
import { Database } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const HeaderLeft = () => {
  const { isAuthenticated } = useAuth();
  
  // If authenticated, link to the dashboard page, otherwise to the landing page
  const linkPath = isAuthenticated ? "/dashboard" : "/";
  
  return (
    <Link to={linkPath} className="flex items-center space-x-2 text-white group">
      <div className={cn(
        "h-9 w-9 bg-primary/90 rounded-lg flex items-center justify-center shadow-md",
        "group-hover:bg-primary/100 transition-all duration-200"
      )}>
        <Database className="h-5 w-5 text-white" />
      </div>
      <span className="font-bold text-xl tracking-tight">ProcurityIQ</span>
    </Link>
  );
};
