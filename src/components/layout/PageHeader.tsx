
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Heading } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeaderProps {
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  className?: string;
  breadcrumbs?: Breadcrumb[];
  backLink?: { label: string; href: string };
  tags?: { label: string; color?: string }[];
}

export const PageHeader = ({
  title,
  description,
  action,
  className,
  breadcrumbs,
  backLink,
  tags,
}: PageHeaderProps) => {
  return (
    <div className={cn("fluent-page-header space-y-4", className)}>
      {/* Breadcrumbs navigation */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center flex-wrap text-sm text-muted-foreground mb-2" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" aria-hidden="true" />}
              <Link
                to={crumb.href}
                className="hover:text-white transition-colors whitespace-nowrap"
                aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}
              >
                {crumb.label}
              </Link>
            </div>
          ))}
        </nav>
      )}
      
      {/* Back link if provided */}
      {backLink && (
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            className="pl-0 flex items-center text-muted-foreground hover:text-primary group"
            asChild
          >
            <Link to={backLink.href}>
              <ChevronRight className="h-4 w-4 mr-1 rotate-180 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              <span>{backLink.label}</span>
            </Link>
          </Button>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="fluent-typography-title text-2xl sm:text-3xl font-semibold tracking-tight text-white flex items-center gap-2">
              <Heading className="h-6 w-6 text-primary hidden sm:inline-block" aria-hidden="true" />
              {title}
            </h1>
            
            {/* Tags rendering */}
            {tags && tags.length > 0 && (
              <div className="flex gap-2 ml-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className={cn(
                      "fluent-badge",
                      tag.color === "blue" && "fluent-badge-info",
                      tag.color === "green" && "fluent-badge-success",
                      tag.color === "amber" && "fluent-badge-warning",
                      tag.color === "red" && "fluent-badge-danger",
                      !tag.color && "fluent-badge-info"
                    )}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {description && (
            <p className="fluent-typography-subtitle text-sm text-muted-foreground max-w-3xl">
              {description}
            </p>
          )}
        </div>
        
        {action && (
          <div className="flex-shrink-0 mt-2 sm:mt-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};
