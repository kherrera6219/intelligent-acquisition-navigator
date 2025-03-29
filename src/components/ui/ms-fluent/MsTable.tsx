
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export interface MsTableProps extends React.HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
}

export const MsTable = forwardRef<HTMLTableElement, MsTableProps>(
  ({ className, striped = false, hoverable = true, bordered = false, compact = false, ...props }, ref) => {
    return (
      <div className="w-full overflow-auto">
        <table
          ref={ref}
          className={cn(
            "ms-table w-full caption-bottom text-sm",
            bordered && "border border-border",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

MsTable.displayName = "MsTable";

export const MsTableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("ms-table-header bg-muted/30 [&>tr]:border-b [&>tr]:border-border/50", className)}
    {...props}
  />
));

MsTableHeader.displayName = "MsTableHeader";

export const MsTableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { striped?: boolean; hoverable?: boolean }
>(({ className, striped = false, hoverable = true, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "ms-table-body",
      striped && "[&>tr:nth-child(odd)]:bg-muted/20",
      hoverable && "[&>tr:hover]:bg-muted/40",
      className
    )}
    {...props}
  />
));

MsTableBody.displayName = "MsTableBody";

export const MsTableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("ms-table-footer border-t bg-muted/20 font-medium", className)}
    {...props}
  />
));

MsTableFooter.displayName = "MsTableFooter";

export const MsTableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { selected?: boolean; disabled?: boolean }
>(({ className, selected, disabled, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "ms-table-row border-b border-border/30 transition-colors",
      selected && "bg-primary/5 data-[state=selected]:bg-primary/5",
      disabled && "opacity-60 pointer-events-none",
      className
    )}
    {...props}
  />
));

MsTableRow.displayName = "MsTableRow";

export const MsTableHead = forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement> & { sorted?: 'asc' | 'desc' | false }
>(({ className, sorted = false, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "ms-table-head h-12 px-4 text-left align-middle font-medium text-muted-foreground",
      sorted && "cursor-pointer hover:text-foreground relative pe-6",
      className
    )}
    {...props}
  />
));

MsTableHead.displayName = "MsTableHead";

export const MsTableCell = forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement> & { compact?: boolean }
>(({ className, compact = false, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "ms-table-cell p-4 align-middle",
      compact && "p-2",
      className
    )}
    {...props}
  />
));

MsTableCell.displayName = "MsTableCell";

export const MsTableCaption = forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("ms-table-caption mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));

MsTableCaption.displayName = "MsTableCaption";

export interface MsStatusCellProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'success' | 'error' | 'warning' | 'info' | 'pending';
  text?: string;
}

export const MsStatusCell = forwardRef<HTMLDivElement, MsStatusCellProps>(
  ({ className, status, text, ...props }, ref) => {
    const statusConfig = {
      success: {
        icon: <CheckCircle className="h-4 w-4" />,
        color: "text-success",
        bg: "bg-success/10",
        border: "border-success/20",
        defaultText: "Success"
      },
      error: {
        icon: <XCircle className="h-4 w-4" />,
        color: "text-destructive",
        bg: "bg-destructive/10",
        border: "border-destructive/20",
        defaultText: "Error"
      },
      warning: {
        icon: <AlertTriangle className="h-4 w-4" />,
        color: "text-warning",
        bg: "bg-warning/10",
        border: "border-warning/20",
        defaultText: "Warning"
      },
      info: {
        icon: <CheckCircle className="h-4 w-4" />,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        defaultText: "Info"
      },
      pending: {
        icon: <AlertTriangle className="h-4 w-4" />,
        color: "text-muted-foreground",
        bg: "bg-muted/30",
        border: "border-muted/40",
        defaultText: "Pending"
      }
    };

    const config = statusConfig[status];

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
          config.color,
          config.bg,
          config.border,
          className
        )}
        {...props}
      >
        {config.icon}
        <span className="ml-1">{text || config.defaultText}</span>
      </div>
    );
  }
);

MsStatusCell.displayName = "MsStatusCell";
