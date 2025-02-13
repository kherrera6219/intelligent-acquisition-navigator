
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export const PageHeader = ({ 
  title, 
  description, 
  children,
  className 
}: PageHeaderProps) => {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      {description && (
        <p className="text-lg text-gray-400">{description}</p>
      )}
      {children}
    </div>
  );
};
