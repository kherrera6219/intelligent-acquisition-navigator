
import { useState, useCallback, useMemo } from 'react';

interface PaginationOptions {
  initialPage?: number;
  pageSize?: number;
  totalItems?: number;
}

export const usePagination = ({
  initialPage = 1,
  pageSize = 10,
  totalItems = 0
}: PaginationOptions = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages || totalPages === 0) {
      setCurrentPage(page);
    }
  }, [totalPages]);
  
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);
  
  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);
  
  const changePageSize = useCallback((size: number) => {
    setItemsPerPage(size);
    const newTotalPages = Math.ceil(totalItems / size);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1);
    }
  }, [currentPage, totalItems]);
  
  // Function to get current page's items from an array
  const paginateArray = useCallback((array: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);
  
  // Calculate whether we have next and previous pages
  const hasNextPage = useMemo(() => currentPage < totalPages, [currentPage, totalPages]);
  const hasPrevPage = useMemo(() => currentPage > 1, [currentPage]);
  
  // Get an array of page numbers to display
  const getPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
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
        endPage = Math.min(4, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 3, 2);
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
      
      // Always include last page if more than 1 page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  }, [currentPage, totalPages]);

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage,
    changePageSize,
    paginateArray,
    hasNextPage,
    hasPrevPage,
    getPageNumbers
  };
};
