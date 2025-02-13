
import { 
  Home, 
  FileText, 
  Shield, 
  BarChart2, 
  Settings, 
  HelpCircle,
  Map
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
    icon: FileText, 
    label: 'Solicitation Review', 
    route: '/solicitation-review',
    permission: 'READ_SOLICITATIONS' as const,
    description: 'Review and manage solicitations'
  },
  { 
    icon: Shield, 
    label: 'Compliance', 
    route: '/compliance',
    permission: 'VIEW_AUDIT_LOGS' as const,
    description: 'Monitor compliance and audit logs'
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
