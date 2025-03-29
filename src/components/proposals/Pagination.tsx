
import React from 'react';
import { SimplePagination } from '@/components/ui/pagination/SimplePagination';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  
  return (
    <div className="mt-6">
      <SimplePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        variant="compact"
        className="justify-center"
      />
    </div>
  );
};
