
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return (
    <tr className={cn("border-b border-border/50 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}>
      {children}
    </tr>
  );
};
