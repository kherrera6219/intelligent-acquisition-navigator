
import React from 'react';
import { WireframeBase, WireframePlaceholder } from './WireframeBase';
import { ArrowLeft, FileTextIcon, Edit2Icon, TrashIcon, MoreHorizontalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DetailPageWireframeProps {
  className?: string;
  withPlaceholders?: boolean;
  title?: string;
}

export const DetailPageWireframe: React.FC<DetailPageWireframeProps> = ({
  className,
  withPlaceholders = true,
  title = 'Detail Page',
}) => {
  return (
    <WireframeBase className={cn('ms-detail-wireframe', className)}>
      <div className="ms-header-wireframe mb-4 flex items-center">
        <button className="ms-button ms-button-ghost flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent/20">
          <ArrowLeft size={18} />
        </button>
        <div className="ms-breadcrumb text-sm text-muted-foreground ml-2">
          Home / List / {title}
        </div>
      </div>

      <div className="ms-detail-header mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
            <FileTextIcon size={20} />
          </div>
          <div>
            <h1 className="ms-heading-3 font-semibold">{title}</h1>
            <p className="ms-text-muted text-sm mt-1">
              ID: {withPlaceholders ? 'DOC-2023-0001' : '#####-####-####'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="ms-button ms-button-outline flex items-center gap-1 h-9 px-4 rounded-md border border-border bg-transparent text-foreground text-sm">
            <Edit2Icon size={16} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button className="ms-button ms-button-danger flex items-center gap-1 h-9 px-4 rounded-md bg-destructive text-destructive-foreground text-sm">
            <TrashIcon size={16} />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button className="ms-button ms-button-ghost flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent/20">
            <MoreHorizontalIcon size={18} />
          </button>
        </div>
      </div>

      <div className="ms-detail-content mb-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <div className="ms-detail-main">
          <div className="ms-detail-section mb-6">
            <h2 className="ms-heading-4 font-medium mb-4">Overview</h2>
            {withPlaceholders && (
              <div className="space-y-2">
                <WireframePlaceholder height="h-6" width="w-full" />
                <WireframePlaceholder height="h-6" width="w-full" />
                <WireframePlaceholder height="h-6" width="w-1/2" />
              </div>
            )}
          </div>

          <div className="ms-detail-section mb-6">
            <h2 className="ms-heading-4 font-medium mb-4">Details</h2>
            {withPlaceholders && (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Field {i * 2 + 1}</p>
                      <WireframePlaceholder height="h-8" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Field {i * 2 + 2}</p>
                      <WireframePlaceholder height="h-8" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="ms-detail-section">
            <h2 className="ms-heading-4 font-medium mb-4">Related Items</h2>
            {withPlaceholders && (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-3 border border-border rounded-md hover:bg-accent/5 cursor-pointer">
                    <div className="flex justify-between">
                      <p className="font-medium">Related Item {i + 1}</p>
                      <p className="text-sm text-muted-foreground">ID-{1000 + i}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Description for related item {i + 1}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="ms-detail-sidebar">
          <div className="ms-detail-card p-4 rounded-lg border border-border bg-card/50 sticky top-4">
            <h3 className="font-medium mb-4">Information</h3>
            {withPlaceholders && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <p className="font-medium">Active</p>
                  </div>
                </div>
                
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <p className="text-sm text-muted-foreground mb-1">Info Field {i + 1}</p>
                    <WireframePlaceholder height="h-8" />
                  </div>
                ))}
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Created by</p>
                  <div className="flex items-center gap-2">
                    <WireframePlaceholder height="h-8" width="w-8" className="rounded-full" />
                    <div>
                      <p className="text-sm font-medium">User Name</p>
                      <p className="text-xs text-muted-foreground">user@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </WireframeBase>
  );
};
