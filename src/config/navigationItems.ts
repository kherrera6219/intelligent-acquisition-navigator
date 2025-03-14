
import { 
  Home, 
  FileText, 
  Shield, 
  BarChart2, 
  Settings, 
  HelpCircle,
  Map,
  Book,
  Building2,
  Scale,
  BookOpen,
  Flag
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
    label: 'Market Research', 
    route: '/market-research',
    permission: null,
    description: 'Research market information'
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
  },
  { 
    icon: Flag, 
    label: 'Federal Acquisition', 
    route: '/federal-acquisition',
    permission: null,
    description: 'Federal-specific procurement guidance'
  },
  { 
    icon: Flag, 
    label: 'Texas Acquisition', 
    route: '/texas-acquisition',
    permission: null,
    description: 'Texas-specific procurement guidance'
  }
] as const;
