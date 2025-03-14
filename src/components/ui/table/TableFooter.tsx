
import React from 'react';
import { cn } from '@/lib/utils';

interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-primary-100/10 border-t", className)}
    {...props}
  />
));

TableFooter.displayName = "TableFooter";
