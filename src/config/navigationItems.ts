
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
  MessageSquare,
  FileStack,
  Search,
  Radar,
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
    icon: MessageSquare,
    label: 'AI Assistant',
    route: '/chat',
    permission: null,
    description: 'Chat with the AI acquisition assistant'
  },
  {
    icon: FileStack,
    label: 'Proposals',
    route: '/proposals',
    permission: null,
    description: 'Track and manage proposal submissions'
  },
  {
    icon: Radar,
    label: 'Opportunities',
    route: '/opportunities',
    permission: null,
    description: 'Browse active SAM.gov contracting opportunities'
  },
  {
    icon: FileText,
    label: 'Solicitation Review',
    route: '/acquisition/solicitation-review',
    permission: 'READ_SOLICITATIONS' as const,
    description: 'Review and manage solicitations'
  },
  {
    icon: Search,
    label: 'Market Research',
    route: '/acquisition/market-research',
    permission: 'READ_SOLICITATIONS' as const,
    description: 'Conduct and review market research'
  },
  {
    icon: FileCheck,
    label: 'Document Control',
    route: '/acquisition/document-control',
    permission: 'MANAGE_CONTRACTS' as const,
    description: 'Manage acquisition documents'
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

// Items grouped for display in the sidebar
// 0=Dashboard 1=KnowledgeBase 2=AI 3=Proposals 4=Opportunities
// 5=SolicitationReview 6=MarketResearch 7=DocumentControl
// 8=Compliance 9=Analytics 10=Settings 11=Help 12=Sitemap
export const navGroups = [
  {
    label: 'Core',
    items: [0, 1, 2, 3, 4],
  },
  {
    label: 'Acquisition',
    items: [5, 6, 7],
  },
  {
    label: 'System',
    items: [8, 9, 10, 11, 12],
  },
] as const;
