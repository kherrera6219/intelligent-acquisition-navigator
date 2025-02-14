
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
  BookOpen
} from 'lucide-react';

export const navigationItems = [
  { 
    icon: Home, 
    label: 'Dashboard', 
    route: '/dashboard',
    permission: null,
    description: 'View your personalized dashboard'
  },
  { 
    icon: BookOpen,
    label: 'Knowledge Base',
    route: '/knowledge-base',
    permission: null,
    description: 'Access the Multi-Domain Knowledge Framework'
  },
  { 
    icon: FileText, 
    label: 'Solicitation Review', 
    route: '/solicitation-review',
    permission: 'READ_SOLICITATIONS' as const,
    description: 'Review and manage solicitations'
  },
  {
    icon: FileCheck,
    label: 'Source Selection',
    route: '/source-selection',
    permission: 'MANAGE_EVALUATIONS' as const,
    description: 'Manage source selection evaluations'
  },
  {
    icon: Building2,
    label: 'Contract Management',
    route: '/contract-management',
    permission: 'MANAGE_CONTRACTS' as const,
    description: 'Oversee contract execution and modifications'
  },
  { 
    icon: Shield, 
    label: 'Compliance', 
    route: '/compliance',
    permission: 'VIEW_AUDIT_LOGS' as const,
    description: 'Monitor compliance and audit logs'
  },
  {
    icon: Scale,
    label: 'Legal Review',
    route: '/legal-review',
    permission: 'LEGAL_REVIEW' as const,
    description: 'Review and approve legal documents'
  },
  {
    icon: Users,
    label: 'Small Business',
    route: '/small-business',
    permission: 'SMALL_BUSINESS_REVIEW' as const,
    description: 'Small business program management'
  },
  {
    icon: ClipboardCheck,
    label: 'Quality Assurance',
    route: '/quality-assurance',
    permission: 'QA_ACCESS' as const,
    description: 'Quality assurance and inspections'
  },
  { 
    icon: BarChart2, 
    label: 'Analytics', 
    route: '/analytics',
    permission: 'EXPORT_DATA' as const,
    description: 'View system analytics and reports'
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    route: '/settings',
    permission: 'MANAGE_USERS' as const,
    description: 'Manage system settings'
  },
  { 
    icon: HelpCircle, 
    label: 'Help', 
    route: '/help',
    permission: null,
    description: 'Access help and documentation'
  },
  {
    icon: Map,
    label: 'Sitemap',
    route: '/sitemap',
    permission: null,
    description: 'View complete site structure'
  }
] as const;
