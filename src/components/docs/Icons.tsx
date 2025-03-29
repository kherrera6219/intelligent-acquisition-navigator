
import { 
  Book, 
  FileText, 
  List, 
  ListOrdered,
  LucideIcon 
} from 'lucide-react';

export type IconName = 'book' | 'file-text' | 'list' | 'list-ordered';

export const Icons: Record<IconName, LucideIcon> = {
  'book': Book,
  'file-text': FileText,
  'list': List,
  'list-ordered': ListOrdered
};
