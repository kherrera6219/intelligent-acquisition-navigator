
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  // Limit the number of page buttons shown
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    
    const visiblePages = pages.slice(start - 1, end);
    
    if (start > 1) {
      return [1, '...', ...visiblePages.slice(2)];
    }
    
    if (end < totalPages) {
      return [...visiblePages.slice(0, -2), '...', totalPages];
    }
    
    return visiblePages;
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      
      {getVisiblePages().map((page, index) => (
        typeof page === 'number' ? (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className="h-8 w-8 p-0"
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="text-gray-500">...</span>
        )
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
};
