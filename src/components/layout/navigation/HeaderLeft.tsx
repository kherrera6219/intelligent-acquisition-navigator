
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

export const HeaderLeft = () => {
  return (
    <div className="flex items-center gap-4">
      <Link to="/" className="text-white font-bold text-xl">
        ProcurityIQ
      </Link>
      
      <Link to="/settings" className="text-gray-400 hover:text-white transition-colors duration-200">
        <Settings className="h-5 w-5" />
        <span className="sr-only">Settings</span>
      </Link>
    </div>
  );
};
