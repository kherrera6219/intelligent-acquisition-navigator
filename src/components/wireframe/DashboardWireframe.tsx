
import React from 'react';
import { WireframeBase, WireframePlaceholder } from './WireframeBase';
import { PlusIcon, LayoutDashboardIcon, PieChartIcon, BarChartIcon, TableIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardWireframeProps {
  className?: string;
  withPlaceholders?: boolean;
  title?: string;
}

export const DashboardWireframe: React.FC<DashboardWireframeProps> = ({
  className,
  withPlaceholders = true,
  title = 'Dashboard Wireframe',
}) => {
  return (
    <WireframeBase className={cn('ms-dashboard-wireframe', className)}>
      <div className="ms-header-wireframe mb-6 flex items-center justify-between">
        <div>
          <h1 className="ms-heading-3 font-semibold flex items-center gap-2">
            <LayoutDashboardIcon size={20} className="text-primary" />
            {title}
          </h1>
          <p className="ms-text-muted text-sm mt-1">Welcome to the dashboard wireframe layout.</p>
        </div>
        <div className="flex gap-2">
          {withPlaceholders && (
            <>
              <WireframePlaceholder height="h-9" width="w-24" text="Filter" className="hidden sm:flex" />
              <WireframePlaceholder height="h-9" width="w-24" text="Action" />
            </>
          )}
          <button className="ms-button ms-button-primary flex items-center gap-1 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm">
            <PlusIcon size={16} />
            <span>New</span>
          </button>
        </div>
      </div>

      <div className="ms-grid-dashboard mb-6">
        <div className="ms-stats-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="ms-stats-card p-4 rounded-lg border border-border bg-card/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Metric {i + 1}</p>
                  <h3 className="text-2xl font-semibold mt-1">
                    {withPlaceholders ? `${Math.floor(Math.random() * 1000)}` : '000'}
                  </h3>
                  <p className="text-xs text-emerald-500 mt-1">
                    {withPlaceholders ? `+${Math.floor(Math.random() * 10)}%` : '+0%'} since last period
                  </p>
                </div>
                <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                  {i === 0 && <PieChartIcon size={18} />}
                  {i === 1 && <BarChartIcon size={18} />}
                  {i === 2 && <TableIcon size={18} />}
                  {i === 3 && <LayoutDashboardIcon size={18} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ms-grid-split grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="ms-dashboard-card p-4 rounded-lg border border-border bg-card/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Main Chart</h3>
            {withPlaceholders && (
              <div className="flex gap-2">
                <WireframePlaceholder height="h-7" width="w-20" text="Day" />
                <WireframePlaceholder height="h-7" width="w-20" text="Week" />
                <WireframePlaceholder height="h-7" width="w-20" text="Month" />
              </div>
            )}
          </div>
          {withPlaceholders && (
            <WireframePlaceholder height="h-64" text="Chart Area" />
          )}
        </div>

        <div className="ms-dashboard-card p-4 rounded-lg border border-border bg-card/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Activity</h3>
            {withPlaceholders && (
              <WireframePlaceholder height="h-7" width="w-20" text="View All" />
            )}
          </div>
          {withPlaceholders && (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <WireframePlaceholder height="h-8" width="w-8" className="rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <WireframePlaceholder height="h-4" width="w-full" />
                    <WireframePlaceholder height="h-3" width="w-24" className="mt-1" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </WireframeBase>
  );
};
