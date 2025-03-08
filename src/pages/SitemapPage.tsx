
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/universal/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { 
  ArrowRight, Shield, BarChart2, Home, FileText, Map, FileCheck, 
  Users, Building2, Scale, BookOpen, 
  HelpCircle, Settings, Database, Layers,
  FileSearch, User, Webhook
} from 'lucide-react';

const SitemapSection = ({ title, links }: { title: string, links: Array<{ path: string, label: string, icon: any }> }) => (
  <Card className="p-6 glass-card">
    <h2 className="text-xl font-semibold mb-4 text-gradient">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {links.map(({ path, label, icon: Icon }) => (
        <Link 
          key={path} 
          to={path}
          className="flex items-center p-3 rounded-lg hover:bg-white/5 transition-colors gap-3
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Icon className="w-5 h-5 text-primary/60" />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  </Card>
);

const Sitemap = () => {
  const sections = {
    main: [
      { path: "/", label: "Home", icon: Home },
      { path: "/features", label: "Features", icon: BookOpen },
      { path: "/pricing", label: "Pricing", icon: Scale },
      { path: "/about", label: "About", icon: Users },
      { path: "/contact", label: "Contact", icon: Users },
      { path: "/privacy", label: "Privacy Policy", icon: Shield }
    ],
    auth: [
      { path: "/auth", label: "Sign In / Sign Up", icon: Users },
      { path: "/auth/reset-password", label: "Reset Password", icon: Shield },
      { path: "/settings", label: "User Settings", icon: Settings },
      { path: "/profile", label: "User Profile", icon: User },
    ],
    core: [
      { path: "/dashboard", label: "Dashboard", icon: Home },
      { path: "/analytics", label: "Analytics", icon: BarChart2 },
      { path: "/knowledge-base", label: "Knowledge Base", icon: Database },
    ],
    proposals: [
      { path: "/proposals", label: "Proposals", icon: FileText },
      { path: "/proposals/1", label: "Proposal Details Example", icon: Layers },
    ],
    acquisition: [
      { path: "/acquisition/document-control", label: "Document Control", icon: FileText },
      { path: "/acquisition/market-research", label: "Market Research", icon: FileSearch },
      { path: "/acquisition/solicitation-review", label: "Solicitation Review", icon: FileCheck },
      { path: "/acquisition/texas", label: "Texas Acquisition", icon: Building2 },
      { path: "/acquisition/federal", label: "Federal Acquisition", icon: Database }
    ],
    system: [
      { path: "/help", label: "Help Center", icon: HelpCircle },
      { path: "/sitemap", label: "Sitemap", icon: Map }
    ],
    development: [
      { path: "/api-docs", label: "API Documentation", icon: Webhook },
      { path: "/component-library", label: "Component Library", icon: Layers }
    ]
  };

  return (
    <main className="flex-grow">
      <Container>
        <div className="space-y-6 py-6">
          <PageHeader
            title="Application Map"
            description="Complete overview of ProcurityIQ's structure and navigation"
          />

          <div className="space-y-8">
            <SitemapSection title="Main Navigation" links={sections.main} />
            <SitemapSection title="Authentication & User" links={sections.auth} />
            <SitemapSection title="Core Features" links={sections.core} />
            <SitemapSection title="Proposal Management" links={sections.proposals} />
            <SitemapSection title="Acquisition Management" links={sections.acquisition} />
            <SitemapSection title="System & Support" links={sections.system} />
            <SitemapSection title="Developer Resources" links={sections.development} />
          </div>

          <div className="mt-12 flex justify-center gap-4">
            <Button 
              className="enterprise-gradient"
              size="lg"
              asChild
            >
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Sitemap;
