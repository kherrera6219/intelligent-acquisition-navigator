
import { 
  Home, 
  FileText, 
  Shield, 
  BarChart2, 
  Settings, 
  HelpCircle,
  Map,
  FileCheck,
  Users,
  Book,
  Building2,
  Scale,
  ClipboardCheck,
  AlertCircle,
  BookOpen,
  Flag,
  FileSearch,
  Building,
  GlobeLock
} from 'lucide-react';
import { NavItem } from './types';

export const navItems: NavItem[] = [
  { 
    icon: Home, 
    label: 'Dashboard', 
    href: '/dashboard',
    minRole: null,
    items: undefined
  },
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
    icon: GlobeLock,
    label: 'Federal Acquisition',
    href: '/federal-acquisition',
    minRole: null,
    items: undefined
  },
  { 
    icon: Flag, 
    label: 'Texas Acquisition', 
    href: '/texas-acquisition',
    minRole: null,
    items: undefined
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    href: '/settings',
    minRole: 'authenticated',
    items: undefined
  },
  { 
    icon: HelpCircle, 
    label: 'Help', 
    href: '/help',
    minRole: null,
    items: undefined
  },
  {
    icon: Map,
    label: 'Sitemap',
    href: '/sitemap',
    minRole: null,
    items: undefined
  }
];
