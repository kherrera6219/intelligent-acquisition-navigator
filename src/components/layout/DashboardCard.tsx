
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Card } from "@/components/ui/universal/Card";

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  value?: string | number;
  change?: string;
  onClick?: () => void;
}

export const DashboardCard = ({
  title,
  icon,
  children,
  className,
  value,
  change,
  onClick,
}: DashboardCardProps) => {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-200",
        onClick && "cursor-pointer hover:bg-white/5",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 rounded-lg bg-white/5 transition-colors group-hover:bg-white/10">
              {icon}
            </div>
          )}
          <h3 className="text-sm font-medium text-gray-400">
            {title}
          </h3>
        </div>
      </div>
      
      {(value || change) ? (
        <div className="mt-4 space-y-1">
          {value && (
            <p className="text-2xl font-bold text-white">
              {value}
            </p>
          )}
          {change && (
            <p className="text-sm text-gray-400">
              {change}
            </p>
          )}
        </div>
      ) : children}
    </Card>
  );
};
