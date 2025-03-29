
import React from 'react';
import { cn } from '@/lib/utils';

interface MsFluentTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: 'default' | 'striped' | 'bordered';
  size?: 'default' | 'sm' | 'lg';
  hover?: boolean;
}

const MsFluentTable = React.forwardRef<HTMLTableElement, MsFluentTableProps>(
  ({ className, variant = 'default', size = 'default', hover = true, ...props }, ref) => {
    const variantClasses = {
      default: 'border border-border/20',
      striped: 'border border-border/20 [&_tbody_tr:nth-child(even)]:bg-muted/30',
      bordered: 'border-2 border-border/30 [&_th]:border [&_th]:border-border/20 [&_td]:border [&_td]:border-border/20',
    };

    const sizeClasses = {
      default: '[&_th]:p-3 [&_td]:p-3',
      sm: '[&_th]:p-2 [&_td]:py-1.5 [&_td]:px-2 text-sm',
      lg: '[&_th]:p-4 [&_td]:p-4',
    };

    return (
      <div className="w-full overflow-auto">
        <table
          ref={ref}
          className={cn(
            'w-full caption-bottom rounded-md',
            variantClasses[variant],
            sizeClasses[size],
            hover && '[&_tbody_tr]:hover:bg-muted/50',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
MsFluentTable.displayName = 'MsFluentTable';

interface MsFluentTableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const MsFluentTableHeader = React.forwardRef<HTMLTableSectionElement, MsFluentTableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('border-b border-border/20 bg-muted/20', className)} {...props} />
  )
);
MsFluentTableHeader.displayName = 'MsFluentTableHeader';

interface MsFluentTableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const MsFluentTableBody = React.forwardRef<HTMLTableSectionElement, MsFluentTableBodyProps>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn('', className)} {...props} />
);
MsFluentTableBody.displayName = 'MsFluentTableBody';

interface MsFluentTableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const MsFluentTableFooter = React.forwardRef<HTMLTableSectionElement, MsFluentTableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn('border-t border-border/20 bg-muted/10 font-medium', className)} {...props} />
  )
);
MsFluentTableFooter.displayName = 'MsFluentTableFooter';

interface MsFluentTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  isSelected?: boolean;
}

const MsFluentTableRow = React.forwardRef<HTMLTableRowElement, MsFluentTableRowProps>(
  ({ className, isSelected, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-border/10 transition-colors',
        isSelected && 'bg-muted/30',
        className
      )}
      {...props}
    />
  )
);
MsFluentTableRow.displayName = 'MsFluentTableRow';

interface MsFluentTableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

const MsFluentTableHead = React.forwardRef<HTMLTableCellElement, MsFluentTableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
);
MsFluentTableHead.displayName = 'MsFluentTableHead';

interface MsFluentTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const MsFluentTableCell = React.forwardRef<HTMLTableCellElement, MsFluentTableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  )
);
MsFluentTableCell.displayName = 'MsFluentTableCell';

interface MsStatusCellProps {
  status: string;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md';
}

const MsStatusCell = React.forwardRef<HTMLSpanElement, MsStatusCellProps>(
  ({ status, variant = 'default', size = 'md', ...props }, ref) => {
    const getStatusColor = () => {
      switch (status.toLowerCase()) {
        case 'active':
        case 'approved':
        case 'completed':
        case 'success':
          return variant === 'default' 
            ? 'bg-success/10 text-success' 
            : 'border-success/50 text-success';
        case 'pending':
        case 'in progress':
        case 'processing':
        case 'warning':
          return variant === 'default' 
            ? 'bg-warning/10 text-warning' 
            : 'border-warning/50 text-warning';
        case 'inactive':
        case 'disabled':
        case 'closed':
          return variant === 'default' 
            ? 'bg-muted/50 text-muted-foreground' 
            : 'border-muted/50 text-muted-foreground';
        case 'error':
        case 'failed':
        case 'rejected':
        case 'blocked':
          return variant === 'default' 
            ? 'bg-destructive/10 text-destructive' 
            : 'border-destructive/50 text-destructive';
        default:
          return variant === 'default' 
            ? 'bg-primary/10 text-primary' 
            : 'border-primary/50 text-primary';
      }
    };

    const sizeClasses = {
      sm: 'text-xs px-1.5 py-0.5',
      md: 'text-xs px-2.5 py-0.5'
    };

    return (
      <span 
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          sizeClasses[size],
          variant === 'outline' && 'border',
          getStatusColor()
        )}
        {...props}
      >
        {status}
      </span>
    );
  }
);
MsStatusCell.displayName = 'MsStatusCell';

export {
  MsFluentTable,
  MsFluentTableHeader,
  MsFluentTableBody,
  MsFluentTableFooter,
  MsFluentTableRow,
  MsFluentTableHead,
  MsFluentTableCell,
  MsStatusCell
};
