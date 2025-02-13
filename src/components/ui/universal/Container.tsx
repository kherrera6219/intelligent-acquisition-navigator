
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export const Container = ({ children, size = 'default', className = '' }: ContainerProps) => {
  const sizeClass = {
    default: 'container-module',
    sm: 'container-module-sm',
    lg: 'container-module-lg',
  }[size];

  return (
    <div className={`${sizeClass} ${className}`}>
      {children}
    </div>
  );
};
