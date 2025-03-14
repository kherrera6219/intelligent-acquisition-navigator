
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TableFooterProps {
  children: ReactNode;
  className?: string;
}

export const TableFooter: React.FC<TableFooterProps> = ({ children, className }) => {
  return (
    <tfoot className={cn("bg-primary-50 font-medium text-primary-900", className)}>
      {children}
    </tfoot>
  );
};
