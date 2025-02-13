
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}

export const Card = ({ children, hover = false, className = '' }: CardProps) => {
  return (
    <div className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}>
      {children}
    </div>
  );
};
