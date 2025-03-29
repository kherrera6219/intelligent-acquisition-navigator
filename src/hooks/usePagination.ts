
import { useState, useCallback } from 'react';

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
    if (page >= 1 && page <= totalPages) {
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
  
  // Function to get the current page's items from an array
  const paginateArray = useCallback((array: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);
  
  return {
    currentPage,
    itemsPerPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage,
    changePageSize,
    paginateArray
  };
};
