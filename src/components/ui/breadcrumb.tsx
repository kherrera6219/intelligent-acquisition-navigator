
import * as React from "react";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbProps {
  className?: string;
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav 
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-sm text-muted-foreground", className)}
    >
      <Link
        to="/"
        className="flex items-center hover:text-primary transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <Link
            to={item.href}
            className={cn(
              "hover:text-primary transition-colors",
              index === items.length - 1 && "text-foreground font-medium"
            )}
            aria-current={index === items.length - 1 ? "page" : undefined}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};
