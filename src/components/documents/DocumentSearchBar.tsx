
import React from 'react';
import { SearchBar as UniversalSearchBar, SearchBarProps } from '@/components/ui/universal/SearchBar';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

export interface DocumentSearchBarProps extends SearchBarProps {
  variant?: 'default' | 'modern' | 'minimal' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
}

export const DocumentSearchBar: React.FC<DocumentSearchBarProps> = ({
  placeholder = "Search documents...",
  ariaLabel = "Search documents",
  debounceMs = 400,
  className,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const variantClasses = {
    default: "bg-secondary/30 border-border/50",
    modern: "bg-white/5 backdrop-blur-sm border-white/10",
    minimal: "bg-transparent border-border/30",
    outlined: "bg-transparent border-border"
  };

  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-10 text-base",
    lg: "h-12 text-lg"
  };

  return (
    <div className={cn(
      "relative rounded-md overflow-hidden shadow-sm",
      variantClasses[variant],
      sizeClasses[size],
      "border focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20",
      "transition-all duration-200",
      "max-w-md w-full",
      className
    )}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <UniversalSearchBar 
        placeholder={placeholder}
        ariaLabel={ariaLabel}
        debounceMs={debounceMs}
        className={cn(
          "border-0 bg-transparent focus:ring-0 pl-10",
          "w-full h-full"
        )}
        {...props} 
      />
    </div>
  );
};
