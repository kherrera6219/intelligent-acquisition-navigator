
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TableHeadProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}

export const TableHead: React.FC<TableHeadProps> = ({ children, className, colSpan }) => {
  return (
    <th 
      className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className)}
      colSpan={colSpan}
    >
      {children}
    </th>
  );
};
