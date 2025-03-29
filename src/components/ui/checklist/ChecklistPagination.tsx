
import React from 'react';
import { SimplePagination } from '@/components/ui/pagination/SimplePagination';

interface ChecklistPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const ChecklistPagination: React.FC<ChecklistPaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-6">
      <SimplePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        variant="minimal"
      />
    </div>
  );
};
