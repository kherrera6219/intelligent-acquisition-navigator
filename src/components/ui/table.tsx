
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TableProps {
  className?: string;
  children: ReactNode;
}

export const Table: React.FC<TableProps> = ({ className, children }) => {
  return (
    <table className={cn("w-full caption-bottom text-sm", className)}>
      {children}
    </table>
  );
};

interface TableHeaderProps {
  className?: string;
  children: ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ className, children }) => {
  return (
    <thead className={cn("[&_tr]:border-b [&_tr]:border-border/40", className)}>
      {children}
    </thead>
  );
};

interface TableBodyProps {
  className?: string;
  children: ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({ className, children }) => {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)}>{children}</tbody>;
};

interface TableRowProps {
  className?: string;
  children: ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({ className, children }) => {
  return (
    <tr
      className={cn(
        "border-b border-border/20 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
    >
      {children}
    </tr>
  );
};

interface TableHeadProps {
  className?: string;
  children: ReactNode;
}

export const TableHead: React.FC<TableHeadProps> = ({ className, children }) => {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
    >
      {children}
    </th>
  );
};

interface TableCellProps {
  className?: string;
  children: ReactNode;
}

export const TableCell: React.FC<TableCellProps> = ({ className, children }) => {
  return (
    <td
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    >
      {children}
    </td>
  );
};

interface TableCaptionProps {
  className?: string;
  children: ReactNode;
}

export const TableCaption: React.FC<TableCaptionProps> = ({ className, children }) => {
  return (
    <caption className={cn("mt-4 text-sm text-muted-foreground", className)}>
      {children}
    </caption>
  );
};
