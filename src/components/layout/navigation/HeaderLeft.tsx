
import { Link } from "react-router-dom";
import { Database } from "lucide-react";

export const HeaderLeft = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 text-white">
      <Database className="h-6 w-6 text-primary" />
      <span className="font-semibold text-xl">ProcurityIQ</span>
    </Link>
  );
};
