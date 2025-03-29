
import React from 'react';
import { cn } from '@/lib/utils';

interface MsFluentTableProps extends React.HTMLAttributes<HTMLTableElement> {
  variant?: 'default' | 'striped' | 'bordered';
}

export const MsFluentTable = React.forwardRef<
  HTMLTableElement,
  MsFluentTableProps
>(({
  className,
  children,
  variant = 'default',
  ...props
}, ref) => {
  return (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn(
          "w-full caption-bottom text-sm",
          variant === 'bordered' && "border border-border",
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
});

MsFluentTable.displayName = "MsFluentTable";

export const MsFluentTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("ms-fluent-table-header", className)} {...props} />
));

MsFluentTableHeader.displayName = "MsFluentTableHeader";

export const MsFluentTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody 
    ref={ref}
    className={cn("ms-fluent-table-body", className)}
    {...props}
  />
));

MsFluentTableBody.displayName = "MsFluentTableBody";

export const MsFluentTableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("ms-fluent-table-footer bg-primary-foreground/5 font-medium text-primary-foreground", className)}
    {...props}
  />
));

MsFluentTableFooter.displayName = "MsFluentTableFooter";

export const MsFluentTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "ms-fluent-table-row border-b border-border/50 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));

MsFluentTableRow.displayName = "MsFluentTableRow";

export const MsFluentTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));

MsFluentTableHead.displayName = "MsFluentTableHead";

export const MsFluentTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));

MsFluentTableCell.displayName = "MsFluentTableCell";

export const MsFluentTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));

MsFluentTableCaption.displayName = "MsFluentTableCaption";
