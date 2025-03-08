
import React from 'react';
import { SearchBar as UniversalSearchBar, SearchBarProps } from '@/components/ui/universal/SearchBar';

export const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <UniversalSearchBar 
      {...props} 
      placeholder={props.placeholder || "Search proposals..."}
    />
  );
};
