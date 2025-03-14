
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-sm mb-4 ${className}`}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground transition-colors" 
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
              {index === items.length - 1 ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  to={item.href} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};
