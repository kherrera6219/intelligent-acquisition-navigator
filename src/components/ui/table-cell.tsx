
import React from "react";

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  colSpan?: number;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, colSpan, ...props }, ref) => (
    <td ref={ref} className={className} colSpan={colSpan} {...props}>
      {children}
    </td>
  )
);

TableCell.displayName = "TableCell";
