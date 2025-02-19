
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface UseSearchProps<T> {
  data: T[];
  searchFields: Array<keyof T>;
  debounceMs?: number;
}

export function useSearch<T extends Record<string, any>>({
  data,
  searchFields,
  debounceMs = 300,
}: UseSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  const searchData = useCallback(() => {
    if (!debouncedSearchTerm) {
      setFilteredData(data);
      return;
    }

    const lowercaseSearchTerm = debouncedSearchTerm.toLowerCase();
    const filtered = data.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        return value?.toString().toLowerCase().includes(lowercaseSearchTerm);
      })
    );

    setFilteredData(filtered);
  }, [data, debouncedSearchTerm, searchFields]);

  useEffect(() => {
    searchData();
  }, [searchData, debouncedSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    isSearching: searchTerm !== "",
  };
}
