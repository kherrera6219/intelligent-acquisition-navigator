
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tableVariants = cva(
  "ms-table w-full text-sm border-collapse",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        bordered: "border border-border/40 rounded-md overflow-hidden",
        striped: "border border-border/40 rounded-md overflow-hidden [&_tr:nth-child(even)]:bg-muted/30",
        minimal: "border-none"
      },
      size: {
        sm: "[&_th]:py-2 [&_th]:px-2 [&_td]:py-1.5 [&_td]:px-2 text-xs",
        md: "[&_th]:py-3 [&_th]:px-4 [&_td]:py-2.5 [&_td]:px-4",
        lg: "[&_th]:py-4 [&_th]:px-6 [&_td]:py-3.5 [&_td]:px-6 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export interface MsFluentTableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  responsive?: boolean;
}

const MsFluentTable = React.forwardRef<HTMLTableElement, MsFluentTableProps>(
  ({ className, variant, size, responsive = true, ...props }, ref) => {
    const table = (
      <table
        ref={ref}
        className={cn(tableVariants({ variant, size, className }))}
        {...props}
      />
    );

    if (responsive) {
      return (
        <div className="overflow-auto w-full">
          {table}
        </div>
      );
    }

    return table;
  }
);

const MsFluentTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("ms-table-header border-b border-border/40 bg-muted/30", className)} {...props} />
));

const MsFluentTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("ms-table-body", className)}
    {...props}
  />
));

const MsFluentTableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("ms-table-footer border-t border-border/40 bg-muted/20 font-medium", className)}
    {...props}
  />
));

const MsFluentTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { isSelected?: boolean }
>(({ className, isSelected, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "ms-table-row border-b border-border/20 transition-colors hover:bg-muted/30",
      isSelected && "bg-primary/5 hover:bg-primary/10",
      className
    )}
    {...props}
  />
));

const MsFluentTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "ms-table-head h-11 text-left align-middle font-medium text-muted-foreground whitespace-nowrap",
      className
    )}
    {...props}
  />
));

const MsFluentTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("ms-table-cell align-middle", className)}
    {...props}
  />
));

const MsFluentTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("ms-table-caption mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));

MsFluentTable.displayName = "MsFluentTable";
MsFluentTableHeader.displayName = "MsFluentTableHeader";
MsFluentTableBody.displayName = "MsFluentTableBody";
MsFluentTableFooter.displayName = "MsFluentTableFooter";
MsFluentTableRow.displayName = "MsFluentTableRow";
MsFluentTableHead.displayName = "MsFluentTableHead";
MsFluentTableCell.displayName = "MsFluentTableCell";
MsFluentTableCaption.displayName = "MsFluentTableCaption";

export {
  MsFluentTable,
  MsFluentTableHeader,
  MsFluentTableBody,
  MsFluentTableFooter,
  MsFluentTableRow,
  MsFluentTableHead,
  MsFluentTableCell,
  MsFluentTableCaption
};
