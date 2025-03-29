
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface MsDataGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'bordered';
  className?: string;
}

export const MsDataGrid: React.FC<MsDataGridProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  return (
    <div 
      className={cn(
        "ms-data-grid w-full", 
        variant === 'bordered' && "border border-border rounded-md overflow-hidden",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

interface MsDataGridHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const MsDataGridHeader: React.FC<MsDataGridHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div 
      className={cn(
        "ms-data-grid-header px-4 py-3 bg-muted/20 border-b border-border flex items-center justify-between",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

interface MsDataGridTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const MsDataGridTitle: React.FC<MsDataGridTitleProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3 
      className={cn(
        "ms-data-grid-title text-base font-medium",
        className
      )} 
      {...props}
    >
      {children}
    </h3>
  );
};

interface MsDataGridDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export const MsDataGridDescription: React.FC<MsDataGridDescriptionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p 
      className={cn(
        "ms-data-grid-description text-sm text-muted-foreground",
        className
      )} 
      {...props}
    >
      {children}
    </p>
  );
};

interface MsDataGridActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const MsDataGridActions: React.FC<MsDataGridActionsProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div 
      className={cn(
        "ms-data-grid-actions flex items-center space-x-2",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

interface MsDataGridContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export const MsDataGridContent: React.FC<MsDataGridContentProps> = ({
  children,
  className,
  padding = true,
  ...props
}) => {
  return (
    <div 
      className={cn(
        "ms-data-grid-content",
        padding && "p-4",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

interface MsDataGridFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const MsDataGridFooter: React.FC<MsDataGridFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div 
      className={cn(
        "ms-data-grid-footer px-4 py-3 bg-muted/10 border-t border-border flex items-center justify-between",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

interface MsDataGridPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
}

export const MsDataGridPagination: React.FC<MsDataGridPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  siblingCount = 1,
}) => {
  const generatePaginationItems = () => {
    const items = [];
    
    // Previous button
    items.push(
      <button
        key="prev"
        className={cn(
          "flex items-center justify-center h-8 w-8 rounded-md",
          currentPage === 1 
            ? "text-muted-foreground cursor-not-allowed" 
            : "hover:bg-accent/50"
        )}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    );
    
    // First page
    items.push(
      <button
        key="first"
        className={cn(
          "flex items-center justify-center h-8 w-8 rounded-md text-sm",
          currentPage === 1 ? "bg-primary text-primary-foreground" : "hover:bg-accent/50"
        )}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );
    
    // Calculate range of visible pages
    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);
    
    // Add ellipsis at start if needed
    if (startPage > 2) {
      items.push(
        <span key="start-ellipsis" className="flex items-center justify-center h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </span>
      );
    }
    
    // Add numbered pages between first and last
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <button
          key={i}
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-md text-sm",
            currentPage === i ? "bg-primary text-primary-foreground" : "hover:bg-accent/50"
          )}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    
    // Add ellipsis at end if needed
    if (endPage < totalPages - 1) {
      items.push(
        <span key="end-ellipsis" className="flex items-center justify-center h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </span>
      );
    }
    
    // Last page (if more than 1 page)
    if (totalPages > 1) {
      items.push(
        <button
          key="last"
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-md text-sm",
            currentPage === totalPages ? "bg-primary text-primary-foreground" : "hover:bg-accent/50"
          )}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    
    // Next button
    items.push(
      <button
        key="next"
        className={cn(
          "flex items-center justify-center h-8 w-8 rounded-md",
          currentPage === totalPages 
            ? "text-muted-foreground cursor-not-allowed" 
            : "hover:bg-accent/50"
        )}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    );
    
    return items;
  };
  
  return (
    <div 
      className={cn(
        "ms-pagination flex items-center space-x-1",
        className
      )}
    >
      {generatePaginationItems()}
    </div>
  );
};

interface MsDataGridEmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const MsDataGridEmptyState: React.FC<MsDataGridEmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
  ...props
}) => {
  return (
    <div 
      className={cn(
        "ms-data-grid-empty-state flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

interface MsDataGridLoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  className?: string;
}

export const MsDataGridLoadingState: React.FC<MsDataGridLoadingStateProps> = ({
  message = "Loading data...",
  className,
  ...props
}) => {
  return (
    <div 
      className={cn(
        "ms-data-grid-loading-state flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
      {...props}
    >
      <div className="h-6 w-6 border-2 border-primary/30 border-t-primary animate-spin rounded-full mb-4"></div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};
