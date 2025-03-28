
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

// Table container
const tableVariants = cva(
  "ms-table w-full caption-bottom text-sm",
  {
    variants: {
      variant: {
        default: "",
        bordered: "border border-border rounded-md overflow-hidden",
        card: "bg-card rounded-md shadow-sm overflow-hidden"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

const MsFluentTable = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div className="ms-table-responsive overflow-x-auto">
        <table
          ref={ref}
          className={cn(tableVariants({ variant, className }))}
          {...props}
        />
      </div>
    );
  }
);

// Table header
const MsFluentTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("ms-table-header bg-muted/50 [&_tr]:border-b [&_tr]:border-border/40", className)} {...props} />
));

// Table body
const MsFluentTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("ms-table-body divide-y divide-border/20", className)} {...props} />
));

// Table footer
const MsFluentTableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("ms-table-footer bg-muted/20 font-medium", className)} {...props} />
));

// Table row
const MsFluentTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { isSelected?: boolean }
>(({ className, isSelected, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "ms-table-row transition-colors hover:bg-muted/50",
      isSelected && "bg-muted/70 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));

// Table head (column headers)
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  isSortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
}

const MsFluentTableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, isSortable, sortDirection, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "ms-table-head h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        isSortable && "cursor-pointer select-none",
        className
      )}
      {...props}
    >
      {isSortable ? (
        <div className="flex items-center gap-1">
          {children}
          {sortDirection === 'asc' ? (
            <ChevronUp className="h-4 w-4" />
          ) : sortDirection === 'desc' ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          )}
        </div>
      ) : (
        children
      )}
    </th>
  )
);

// Table cell
const MsFluentTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("ms-table-cell p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
));

// Table caption
const MsFluentTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("ms-table-caption mt-4 text-sm text-muted-foreground", className)} {...props} />
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
