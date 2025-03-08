
import { 
  Home, FileText, BarChart2, Building2, 
  FileSearch, FileCheck, Database, BookOpen, Scale, HelpCircle, Map,
  User, Settings, Webhook, Users, Shield
} from "lucide-react";
import { NavItem } from "./types";

export const navItems: NavItem[] = [
  // Dashboard
  { href: "/dashboard", label: "Dashboard", icon: Home },
  
  // Acquisition Management
  { 
    href: "#", 
    label: "Acquisition", 
    icon: FileText,
    items: [
      { href: "/acquisition/document-control", label: "Document Control", minRole: "user", icon: FileText },
      { href: "/acquisition/market-research", label: "Market Research", minRole: "user", icon: FileSearch },
      { href: "/acquisition/solicitation-review", label: "Solicitation Review", minRole: "manager", icon: FileCheck },
      { href: "/acquisition/texas", label: "Texas Acquisition", minRole: "user", icon: Building2 },
      { href: "/acquisition/federal", label: "Federal Acquisition", minRole: "manager", icon: Database }
    ]
  },
  
  // Proposal Management
  { 
    href: "#", 
    label: "Proposals", 
    icon: FileText,
    items: [
      { href: "/proposals", label: "All Proposals", minRole: "user", icon: FileText },
      { href: "/proposals/drafts", label: "Draft Proposals", minRole: "user", icon: FileText },
    ]
  },
  
  // Analytics & Knowledge
  { 
    href: "#", 
    label: "Intelligence", 
    icon: BarChart2,
    items: [
      { href: "/analytics", label: "Analytics Dashboard", minRole: "user", icon: BarChart2 },
      { href: "/knowledge-base", label: "Knowledge Base", minRole: "user", icon: Database }
    ]
  },
  
  // User Management
  { 
    href: "#", 
    label: "User", 
    icon: User,
    items: [
      { href: "/profile", label: "Profile", minRole: "user", icon: User },
      { href: "/settings", label: "Settings", minRole: "user", icon: Settings },
    ]
  },
  
  // Resources & Help
  { 
    href: "#", 
    label: "Resources", 
    icon: BookOpen,
    items: [
      { href: "/features", label: "Features", icon: BookOpen },
      { href: "/pricing", label: "Pricing", icon: Scale },
      { href: "/help", label: "Help", icon: HelpCircle },
      { href: "/sitemap", label: "Sitemap", icon: Map }
    ]
  }
];

// Additional navigation items for footer or other areas
export const auxiliaryNavItems: NavItem[] = [
  { href: "/about", label: "About Us", icon: Users },
  { href: "/contact", label: "Contact", icon: Users },
  { href: "/privacy", label: "Privacy Policy", icon: Shield },
  { href: "/api-docs", label: "API Documentation", icon: Webhook },
];
