
import { Link } from "react-router-dom";
import { Database } from "lucide-react";

export const HeaderLeft = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 text-white group">
      <div className="h-9 w-9 bg-primary/90 rounded-lg flex items-center justify-center shadow-md group-hover:bg-primary/100 transition-all duration-200">
        <Database className="h-5 w-5 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xl tracking-tight">ProcurityIQ</span>
        <span className="text-xs text-gray-400 -mt-1">Federal Acquisition Intelligence</span>
      </div>
    </Link>
  );
};
