
import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Grid = ({ children, columns = 1, gap = 'md', className = '' }: GridProps) => {
  const columnClass = `grid-module-${columns}`;
  const gapClass = `grid-module-gap-${gap}`;

  return (
    <div className={`grid-module ${columnClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
};
