
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TableCaptionProps {
  children: ReactNode;
  className?: string;
}

const TableCaption: React.FC<TableCaptionProps> = ({ children, className }) => {
  return (
    <caption className={cn("mt-4 text-sm text-muted-foreground", className)}>
      {children}
    </caption>
  );
};

export default TableCaption;
