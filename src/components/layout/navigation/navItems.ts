
import { 
  Home, FileText, BarChart2, Building2, 
  FileSearch, FileCheck, Database, BookOpen, Scale, HelpCircle, Map
} from "lucide-react";
import { NavItem } from "./types";

export const navItems: NavItem[] = [
  // Core Features
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { 
    href: "#", 
    label: "Acquisition", 
    icon: FileText,
    items: [
      { href: "/acquisition/document-control", label: "Document Control", minRole: "user", icon: FileText },
      { href: "/acquisition/market-research", label: "Market Research", minRole: "user", icon: FileSearch },
      { href: "/acquisition/solicitation-review", label: "Solicitation Review", minRole: "manager", icon: FileCheck },
      { href: "/acquisition/texas-acquisition", label: "Texas Acquisition", minRole: "user", icon: Building2 },
      { href: "/acquisition/federal-acquisition", label: "Federal Acquisition", minRole: "manager", icon: Database }
    ]
  },
  { 
    href: "#", 
    label: "Management", 
    icon: BarChart2,
    items: [
      { href: "/proposals", label: "Proposals", minRole: "user", icon: FileText },
      { href: "/analytics", label: "Analytics", minRole: "user", icon: BarChart2 }
    ]
  },
  
  // Support & Resources
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
