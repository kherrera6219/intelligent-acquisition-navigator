
import { ReactNode } from 'react';

interface FlexProps {
  children: ReactNode;
  align?: 'center' | 'start' | 'end' | 'between';
  direction?: 'row' | 'col';
  wrap?: boolean;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Flex = ({ 
  children, 
  align = 'start', 
  direction = 'row',
  wrap = false,
  gap,
  className = '' 
}: FlexProps) => {
  const alignClass = `flex-module-${align}`;
  const directionClass = direction === 'col' ? 'flex-module-col' : '';
  const wrapClass = wrap ? 'flex-module-wrap' : '';
  const gapClass = gap ? `flex-module-gap-${gap}` : '';

  return (
    <div className={`flex-module ${alignClass} ${directionClass} ${wrapClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
};
