
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn("mb-8", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex items-center gap-1 text-sm text-gray-500" role="list">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <Fragment key={index}>
                  <li>
                    {crumb.href && !isLast ? (
                      <Link
                        to={crumb.href}
                        className="hover:text-gray-300 transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className={isLast ? "text-gray-300" : ""}
                        aria-current={isLast ? "page" : undefined}
                      >
                        {crumb.label}
                      </span>
                    )}
                  </li>
                  {!isLast && (
                    <li aria-hidden="true">
                      <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
                    </li>
                  )}
                </Fragment>
              );
            })}
          </ol>
        </nav>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-bold bg-clip-text text-transparent
                       bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400"
          >
            {title}
          </h1>
          {description && (
            <p className="text-gray-400 mt-1.5 text-sm leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
    </div>
  );
};
