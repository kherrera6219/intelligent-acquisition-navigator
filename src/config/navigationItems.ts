
import { 
  Home, 
  FileText, 
  Search, 
  Settings, 
  HelpCircle,
  Map,
  FileCheck,
  MessageSquare,
  FolderKanban,
  UserRound,
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
    route: '/acquisition/solicitation-review',
    permission: 'READ_SOLICITATIONS' as const,
    description: 'Review and manage solicitations'
  },
  {
    icon: Search,
    label: 'Market Research',
    route: '/acquisition/market-research',
    permission: 'MANAGE_EVALUATIONS' as const,
    description: 'Conduct acquisition-focused market research'
  },
  {
    icon: FileCheck,
    label: 'Document Control',
    route: '/acquisition/document-control',
    permission: 'MANAGE_CONTRACTS' as const,
    description: 'Manage document versions and controls'
  },
  { 
    icon: FolderKanban, 
    label: 'Proposals', 
    route: '/proposals',
    permission: 'READ_PROPOSALS' as const,
    description: 'Manage proposals and related artifacts'
  },
  {
    icon: MessageSquare,
    label: 'Chat',
    route: '/chat',
    permission: null,
    description: 'Get AI-assisted acquisition guidance'
  },
  {
    icon: UserRound,
    label: 'Profile',
    route: '/profile',
    permission: null,
    description: 'View your account profile and settings'
  },
  { 
    icon: Settings, 
    label: 'Dashboard', 
    route: '/dashboard',
    permission: null,
    description: 'Return to your dashboard overview'
  },
  { 
    icon: HelpCircle, 
    label: 'Help', 
    route: '/contact',
    permission: null,
    description: 'Contact support and get assistance'
  },
  {
    icon: Map,
    label: 'Sitemap',
    route: '/sitemap',
    permission: null,
    description: 'View complete site structure'
  }
] as const;
