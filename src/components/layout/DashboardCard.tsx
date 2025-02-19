
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Card } from "@/components/ui/universal/Card";

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const DashboardCard = ({
  title,
  icon,
  children,
  className,
}: DashboardCardProps) => {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 rounded-lg bg-white/5">
              {icon}
            </div>
          )}
          <h3 className="text-sm font-medium text-gray-400">
            {title}
          </h3>
        </div>
      </div>
      {children}
    </Card>
  );
};
