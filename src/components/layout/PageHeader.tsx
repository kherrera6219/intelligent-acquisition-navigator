
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  breadcrumbs?: Breadcrumb[];
}

export const PageHeader = ({
  title,
  description,
  action,
  className,
  breadcrumbs,
}: PageHeaderProps) => {
  return (
    <div className={cn("mb-8 space-y-4", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 text-sm text-gray-400">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
              <Link
                to={crumb.href}
                className="hover:text-white transition-colors"
              >
                {crumb.label}
              </Link>
            </div>
          ))}
        </nav>
      )}
      
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-gray-400">
              {description}
            </p>
          )}
        </div>
        {action && (
          <div className="flex items-center gap-4">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};
