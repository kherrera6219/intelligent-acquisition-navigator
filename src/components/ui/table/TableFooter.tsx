
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TableFooterProps {
  children: ReactNode;
  className?: string;
}

export const TableFooter: React.FC<TableFooterProps> = ({ children, className }) => {
  return (
    <tfoot className={cn("bg-muted/50 border-t font-medium", className)}>
      {children}
    </tfoot>
  );
};
