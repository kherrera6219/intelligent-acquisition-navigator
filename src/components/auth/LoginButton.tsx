
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthState } from '@/hooks/useAuthState';

interface LoginButtonProps {
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  className,
  variant = 'default',
  size = 'default'
}) => {
  const { isAuthenticated } = useAuthState();
  
  if (isAuthenticated) {
    return (
      <Link to="/dashboard">
        <Button 
          variant={variant} 
          size={size} 
          className={className}
        >
          Dashboard
        </Button>
      </Link>
    );
  }
  
  return (
    <Link to="/auth">
      <Button 
        variant={variant} 
        size={size} 
        className={className}
      >
        Sign In
      </Button>
    </Link>
  );
};
