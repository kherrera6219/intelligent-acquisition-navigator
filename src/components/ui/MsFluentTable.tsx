
import * as React from "react";
import { cn } from "@/lib/utils";

const MsFluentTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    variant?: "default" | "striped" | "bordered" | "minimal";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "border",
    striped: "border [&_tbody_tr:nth-child(odd)]:bg-muted/50",
    bordered: "border [&_th]:border [&_td]:border",
    minimal: "border-none [&_thead_th]:border-b [&_tbody_tr:not(:last-child)_td]:border-b",
  };

  return (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn(
          "w-full caption-bottom",
          variantClasses[variant],
          className
        )}
        {...props}
      />
    </div>
  );
});
MsFluentTable.displayName = "MsFluentTable";

const MsFluentTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLTableSectionHTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("ms-fluent-table-header bg-muted/50", className)}
    {...props}
  />
));
MsFluentTableHeader.displayName = "MsFluentTableHeader";

const MsFluentTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLTableSectionHTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("ms-fluent-table-body", className)} {...props} />
));
MsFluentTableBody.displayName = "MsFluentTableBody";

const MsFluentTableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLTableSectionHTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("ms-fluent-table-footer border-t bg-muted/50 font-medium", className)}
    {...props}
  />
));
MsFluentTableFooter.displayName = "MsFluentTableFooter";

const MsFluentTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLTableRowHTMLAttributes<HTMLTableRowElement> & {
    isSelected?: boolean;
  }
>(({ className, isSelected, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "ms-fluent-table-row transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      isSelected && "bg-muted",
      className
    )}
    {...props}
  />
));
MsFluentTableRow.displayName = "MsFluentTableRow";

const MsFluentTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    align?: "left" | "center" | "right";
  }
>(({ className, align = "left", ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "ms-fluent-table-head h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      align === "center" && "text-center",
      align === "right" && "text-right",
      className
    )}
    {...props}
  />
));
MsFluentTableHead.displayName = "MsFluentTableHead";

const MsFluentTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    align?: "left" | "center" | "right";
  }
>(({ className, align = "left", ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "ms-fluent-table-cell p-4 align-middle [&:has([role=checkbox])]:pr-0",
      align === "center" && "text-center",
      align === "right" && "text-right",
      className
    )}
    {...props}
  />
));
MsFluentTableCell.displayName = "MsFluentTableCell";

const MsFluentTableCaption = React.forwardRef<
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

// Status cell component for displaying status badges
interface MsStatusCellProps {
  status: string;
  variant?: "default" | "outline";
  colorMap?: Record<string, string>;
}

const MsStatusCell: React.FC<MsStatusCellProps> = ({
  status,
  variant = "default",
  colorMap
}) => {
  const getStatusColor = () => {
    if (colorMap && colorMap[status.toLowerCase()]) {
      return colorMap[status.toLowerCase()];
    }
    
    switch (status.toLowerCase()) {
      case 'active':
      case 'success':
      case 'approved':
      case 'completed':
        return variant === "default" 
          ? "bg-green-500/10 text-green-500 border-green-500/20" 
          : "border-green-500 text-green-500";
      case 'pending':
      case 'in progress':
      case 'processing':
        return variant === "default"
          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
          : "border-amber-500 text-amber-500";
      case 'inactive':
      case 'disabled':
      case 'archived':
        return variant === "default"
          ? "bg-gray-500/10 text-gray-500 border-gray-500/20"
          : "border-gray-500 text-gray-500";
      case 'error':
      case 'failed':
      case 'rejected':
        return variant === "default"
          ? "bg-red-500/10 text-red-500 border-red-500/20"
          : "border-red-500 text-red-500";
      default:
        return variant === "default"
          ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
          : "border-blue-500 text-blue-500";
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor()}`}>
      {status}
    </span>
  );
};

export {
  MsFluentTable,
  MsFluentTableHeader,
  MsFluentTableBody,
  MsFluentTableFooter,
  MsFluentTableHead,
  MsFluentTableRow,
  MsFluentTableCell,
  MsFluentTableCaption,
  MsStatusCell
};
