
import React from 'react';
import { WireframeBase, WireframePlaceholder } from './WireframeBase';
import { 
  PlusIcon, 
  SearchIcon, 
  FilterIcon, 
  DownloadIcon, 
  ChevronDownIcon,
  TableIcon,
  MoreHorizontalIcon,
  FileIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ListWireframeProps {
  className?: string;
  withPlaceholders?: boolean;
  title?: string;
}

export const ListWireframe: React.FC<ListWireframeProps> = ({
  className,
  withPlaceholders = true,
  title = 'List Page',
}) => {
  return (
    <WireframeBase className={cn('ms-list-wireframe', className)}>
      <div className="ms-header-wireframe mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="ms-heading-3 font-semibold flex items-center gap-2">
            <TableIcon size={20} className="text-primary" />
            {title}
          </h1>
          <p className="ms-text-muted text-sm mt-1">Displaying a list of items in a table format.</p>
        </div>
        <div className="flex gap-2">
          <button className="ms-button ms-button-outline flex items-center gap-1 h-9 px-4 rounded-md border border-border bg-transparent text-foreground text-sm">
            <DownloadIcon size={16} />
            <span>Export</span>
          </button>
          <button className="ms-button ms-button-primary flex items-center gap-1 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm">
            <PlusIcon size={16} />
            <span>New Item</span>
          </button>
        </div>
      </div>

      <div className="ms-list-toolbar mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-9 pl-9 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-2">
          <button className="ms-button ms-button-outline flex items-center gap-1 h-9 px-4 rounded-md border border-border bg-transparent text-foreground text-sm">
            <FilterIcon size={16} />
            <span>Filter</span>
            <ChevronDownIcon size={16} />
          </button>
          {withPlaceholders && (
            <>
              <WireframePlaceholder height="h-9" width="w-24" text="Status" />
              <WireframePlaceholder height="h-9" width="w-24" text="Date" />
            </>
          )}
        </div>
      </div>

      <div className="ms-list-table-container overflow-x-auto border border-border rounded-md">
        <table className="ms-list-table w-full">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="text-left py-2 px-4 text-sm font-medium text-muted-foreground">#</th>
              <th className="text-left py-2 px-4 text-sm font-medium text-muted-foreground">Item</th>
              <th className="text-left py-2 px-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left py-2 px-4 text-sm font-medium text-muted-foreground">Date</th>
              <th className="text-left py-2 px-4 text-sm font-medium text-muted-foreground">Owner</th>
              <th className="text-right py-2 px-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b last:border-b-0 border-border hover:bg-muted/30">
                <td className="py-3 px-4 text-sm">{i + 1}</td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                      <FileIcon size={14} />
                    </div>
                    {withPlaceholders ? `Item ${1000 + i}` : 'Item Name'}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
                    Active
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">
                  {withPlaceholders ? `2023-05-${10 + i}` : 'YYYY-MM-DD'}
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex items-center gap-2">
                    <WireframePlaceholder height="h-6" width="w-6" className="rounded-full" />
                    <span>User {i + 1}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-right">
                  <button className="ms-button ms-button-ghost flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent/20">
                    <MoreHorizontalIcon size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ms-list-pagination mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing 1-5 of 100 items
        </div>
        <div className="flex items-center gap-1">
          <button className="ms-button ms-button-outline h-8 w-8 flex items-center justify-center rounded-md border border-border">
            1
          </button>
          <button className="ms-button ms-button-ghost h-8 w-8 flex items-center justify-center rounded-md">
            2
          </button>
          <button className="ms-button ms-button-ghost h-8 w-8 flex items-center justify-center rounded-md">
            3
          </button>
          <button className="ms-button ms-button-ghost h-8 w-8 flex items-center justify-center rounded-md">
            ...
          </button>
          <button className="ms-button ms-button-ghost h-8 w-8 flex items-center justify-center rounded-md">
            10
          </button>
        </div>
      </div>
    </WireframeBase>
  );
};
