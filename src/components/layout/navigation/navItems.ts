
import { 
  FileText, 
  Shield, 
  BarChart2, 
  Settings, 
  FileCheck,
  Users,
  Book,
  Building2,
  Scale,
  ClipboardCheck,
  AlertCircle,
  BookOpen,
  FileSearch,
  Building
} from 'lucide-react';
import { NavItem } from './types';

export const navItems: NavItem[] = [
  { 
    icon: BookOpen,
    label: 'Knowledge Base',
    href: '/knowledge-base',
    minRole: null,
    items: undefined
  },
  { 
    icon: FileText, 
    label: 'Solicitation Review', 
    href: '/solicitation-review',
    minRole: 'authenticated',
    items: undefined
  },
  {
    icon: FileCheck,
    label: 'Source Selection',
    href: '/source-selection',
    minRole: 'manager',
    items: undefined
  },
  {
    icon: Building2,
    label: 'Contract Management',
    href: '/contract-management',
    minRole: 'authenticated',
    items: undefined
  },
  { 
    icon: Shield, 
    label: 'Compliance', 
    href: '/compliance',
    minRole: 'authenticated',
    items: undefined
  },
  {
    icon: Scale,
    label: 'Legal Review',
    href: '/legal-review',
    minRole: 'manager',
    items: undefined
  },
  {
    icon: Users,
    label: 'Small Business',
    href: '/small-business',
    minRole: 'authenticated',
    items: undefined
  },
  {
    icon: ClipboardCheck,
    label: 'Quality Assurance',
    href: '/quality-assurance',
    minRole: 'authenticated',
    items: undefined
  },
  {
    icon: FileSearch,
    label: 'Document Control',
    href: '/document-control',
    minRole: 'authenticated',
    items: undefined
  },
  {
    icon: Building,
    label: 'Market Research',
    href: '/market-research',
    minRole: 'authenticated',
    items: undefined
  },
  { 
    icon: BarChart2, 
    label: 'Analytics', 
    href: '/analytics',
    minRole: 'manager',
    items: undefined
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    href: '/settings',
    minRole: 'authenticated',
    items: undefined
  }
];
