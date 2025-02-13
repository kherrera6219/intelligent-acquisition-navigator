
import { ReactNode } from 'react';
import { Card } from '@/components/ui/universal/Card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const DashboardCard = ({
  icon,
  title,
  description,
  children,
  className
}: DashboardCardProps) => {
  return (
    <Card className={cn("spacing-module-lg", className)}>
      <div className="flex-module-start flex-module-gap-md mb-4">
        {icon && (
          <div className="p-3 rounded-lg bg-violet-500/20">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {description && (
            <p className="text-sm text-gray-400">{description}</p>
          )}
        </div>
      </div>
      {children}
    </Card>
  );
};
