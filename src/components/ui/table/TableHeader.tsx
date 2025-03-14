
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return (
    <thead className={cn("[&_tr]:border-b", className)}>
      {children}
    </thead>
  );
};
