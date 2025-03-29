
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

export const SimplePagination: React.FC<SimplePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  className,
  size = 'default'
}) => {
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show at most 5 page numbers
    
    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than the max, show them all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end page numbers to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the beginning or end
      if (currentPage <= 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always include last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    default: 'text-sm py-2 px-4',
    lg: 'text-base py-3 px-6'
  };

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Button 
        variant="outline" 
        size="sm"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={cn(sizeClasses[size])}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Button>
      
      {showPageNumbers && (
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) => (
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                  "h-8 w-8",
                  currentPage === page 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-transparent hover:bg-muted"
                )}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-1">
                {page}
              </span>
            )
          ))}
        </div>
      )}
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={cn(sizeClasses[size])}
        aria-label="Next page"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};
