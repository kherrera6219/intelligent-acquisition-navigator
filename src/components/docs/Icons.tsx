
import React from 'react';
import { Book, FileText, List, ListOrdered, Search } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type IconName = 'book' | 'file-text' | 'list' | 'list-ordered' | 'search';

export const Icons: Record<IconName, LucideIcon> = {
  'book': Book,
  'file-text': FileText,
  'list': List,
  'list-ordered': ListOrdered,
  'search': Search
};
