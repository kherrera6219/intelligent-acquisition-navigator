
import React from 'react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  page: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages = 1, onPageChange }) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <Button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        variant="outline"
      >
        Previous
      </Button>
      <span className="py-2 text-white">Page {page}</span>
      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        variant="outline"
      >
        Next
      </Button>
    </div>
  );
};
