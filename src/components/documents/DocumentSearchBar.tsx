
import React from 'react';
import { SearchBar as UniversalSearchBar, SearchBarProps } from '@/components/ui/universal/SearchBar';

export interface DocumentSearchBarProps extends SearchBarProps {}

export const DocumentSearchBar: React.FC<DocumentSearchBarProps> = (props) => {
  return (
    <UniversalSearchBar 
      {...props} 
      placeholder={props.placeholder || "Search documents..."}
    />
  );
};
