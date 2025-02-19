
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  description,
  action,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn("mb-8 space-y-4", className)}>
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
