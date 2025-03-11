
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  fallbackPath?: string;
  label?: string;
  onClick?: () => void;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  fallbackPath = '/dashboard', 
  label = 'Back',
  onClick,
  className
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    if (onClick) {
      onClick();
      return;
    }
    
    if (window.history.length > 2) {
      navigate(-1); // Go back in history if possible
    } else {
      navigate(fallbackPath); // Navigate to fallback path if there's no history
    }
  };
  
  // Don't show back button on the main dashboard page
  if (location.pathname === '/dashboard') {
    return null;
  }
  
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`mb-4 pl-0 flex items-center text-muted-foreground hover:text-primary group ${className || ''}`}
      onClick={handleBack}
    >
      <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
      <span>{label}</span>
    </Button>
  );
};
