
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, BarChart, Home, FileText, Map, FileCheck, Users, Building2, Scale, ClipboardCheck, BookOpen, Flag, HelpCircle, Settings } from 'lucide-react';

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
      { path: "/about", label: "About", icon: BookOpen },
      { path: "/contact", label: "Contact", icon: Users }
    ],
    acquisition: [
      { path: "/solicitation-review", label: "Solicitation Review", icon: FileText },
      { path: "/source-selection", label: "Source Selection", icon: FileCheck },
      { path: "/contract-management", label: "Contract Management", icon: Building2 },
      { path: "/market-research", label: "Market Research", icon: Map },
      { path: "/document-control", label: "Document Control", icon: FileText },
      { path: "/texas-acquisition", label: "Texas Acquisition", icon: Flag }
    ],
    compliance: [
      { path: "/compliance", label: "Compliance", icon: Shield },
      { path: "/legal-review", label: "Legal Review", icon: Scale },
      { path: "/small-business", label: "Small Business", icon: Users },
      { path: "/quality-assurance", label: "Quality Assurance", icon: ClipboardCheck }
    ],
    system: [
      { path: "/dashboard", label: "Dashboard", icon: Home },
      { path: "/analytics", label: "Analytics", icon: BarChart },
      { path: "/settings", label: "Settings", icon: Settings },
      { path: "/help", label: "Help", icon: HelpCircle },
      { path: "/sitemap", label: "Sitemap", icon: Map }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">Application Map</h1>
          <p className="text-lg text-gray-400">
            Complete overview of ProcurityIQ's structure and navigation
          </p>
        </div>

        {/* Sitemap Sections */}
        <div className="space-y-8">
          <SitemapSection title="Main Navigation" links={sections.main} />
          <SitemapSection title="Acquisition Management" links={sections.acquisition} />
          <SitemapSection title="Compliance & Quality" links={sections.compliance} />
          <SitemapSection title="System & Support" links={sections.system} />
        </div>

        {/* Quick Actions */}
        <div className="mt-12 flex justify-center gap-4">
          <Button 
            className="enterprise-gradient"
            size="lg"
            asChild
          >
            <Link to="/">
              Return to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
