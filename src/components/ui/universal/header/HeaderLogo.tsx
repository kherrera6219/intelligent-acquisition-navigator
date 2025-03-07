
import React from 'react';
import { Link } from 'react-router-dom';
import { Database } from 'lucide-react';

export const HeaderLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition">
      <Database className="h-4 w-4" />
      <span className="font-medium">ProcurityIQ</span>
    </Link>
  );
};
