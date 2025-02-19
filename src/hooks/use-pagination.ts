
import { useState } from "react";

interface UsePaginationProps {
  defaultPage?: number;
  defaultPageSize?: number;
  total?: number;
}

export function usePagination({
  defaultPage = 1,
  defaultPageSize = 10,
  total = 0,
}: UsePaginationProps = {}) {
  const [page, setPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const totalPages = Math.ceil(total / pageSize);
  
  const nextPage = () => setPage(old => Math.min(old + 1, totalPages));
  const prevPage = () => setPage(old => Math.max(old - 1, 1));
  const goToPage = (newPage: number) => setPage(Math.min(Math.max(newPage, 1), totalPages));
  
  return {
    page,
    pageSize,
    setPageSize,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
