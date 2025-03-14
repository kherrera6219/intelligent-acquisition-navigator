
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TableCellProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}

export const TableCell: React.FC<TableCellProps> = ({ children, className, colSpan }) => {
  return (
    <td 
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};
