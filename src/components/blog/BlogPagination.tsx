
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export const BlogPagination: React.FC<BlogPaginationProps> = ({ 
  currentPage, 
  totalPages,
  onPageChange = () => {}
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Generate a reasonable range of page numbers to display
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    if (currentPage <= 3) {
      return [...pages.slice(0, 5), '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, '...', ...pages.slice(totalPages - 5)];
    } else {
      return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  };
  
  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center space-x-1">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2">...</span>
          ) : (
            <Button
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className="min-w-[40px]"
            >
              {page}
            </Button>
          )}
        </React.Fragment>
      ))}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
