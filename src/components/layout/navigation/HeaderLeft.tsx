
import { Link } from "react-router-dom";
import { Database } from "lucide-react";

export const HeaderLeft = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 text-white">
      <div className="h-8 w-8 bg-primary/90 rounded-lg flex items-center justify-center">
        <Database className="h-5 w-5 text-white" />
      </div>
      <span className="font-bold text-xl tracking-tight">ProcurityIQ</span>
    </Link>
  );
};
