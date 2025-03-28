
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Layout,
  Shield,
  FileText,
  Settings,
  User,
  BarChart2,
  FileCheck,
  BookOpen,
  Building2
} from 'lucide-react';

interface SitemapSectionProps {
  title: string;
  icon: React.ReactNode;
  links: Array<{
    path: string;
    label: string;
  }>;
}

const SitemapSection: React.FC<SitemapSectionProps> = ({ title, icon, links }) => (
  <Card className="p-6 bg-gray-800 border-gray-700 h-full">
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h2 className="text-xl font-semibold text-white">{title}</h2>
    </div>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <Link 
            to={link.path} 
            className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </Card>
);

export default function SitemapPage() {
  const siteMapSections = [
    {
      title: "Main Navigation",
      icon: <Home className="h-5 w-5 text-blue-500" />,
      links: [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/knowledge-base", label: "Knowledge Base" },
      ]
    },
    {
      title: "Acquisition",
      icon: <FileCheck className="h-5 w-5 text-blue-500" />,
      links: [
        { path: "/federal-acquisition", label: "Federal Acquisition" },
        { path: "/texas-acquisition", label: "Texas Acquisition" },
        { path: "/market-research", label: "Market Research" },
        { path: "/solicitation-review", label: "Solicitation Review" },
        { path: "/document-control", label: "Document Control" },
        { path: "/compliance", label: "Compliance" },
        { path: "/legal-review", label: "Legal Review" },
        { path: "/small-business", label: "Small Business" },
        { path: "/quality-assurance", label: "Quality Assurance" },
        { path: "/source-selection", label: "Source Selection" },
        { path: "/contract-management", label: "Contract Management" },
      ]
    },
    {
      title: "Analytics",
      icon: <BarChart2 className="h-5 w-5 text-blue-500" />,
      links: [
        { path: "/analytics", label: "Analytics Dashboard" },
      ]
    },
    {
      title: "Knowledge Base",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      links: [
        { path: "/knowledge-base", label: "Knowledge Base" },
        { path: "/federal-knowledge-base", label: "Federal Knowledge Base" },
      ]
    },
    {
      title: "Account & Settings",
      icon: <User className="h-5 w-5 text-blue-500" />,
      links: [
        { path: "/settings", label: "Settings" },
        { path: "/settings/profile", label: "Profile" },
        { path: "/settings/security", label: "Security" },
        { path: "/settings/preferences", label: "Preferences" },
      ]
    }
  ];

  return (
    <ExternalPageLayout 
      title="Sitemap"
      description="Find all the pages and resources on our platform."
    >
      <Container className="py-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-400 border-blue-400">Navigation</Badge>
          <h1 className="text-4xl font-bold mb-6 text-white">Sitemap</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore all available pages and resources on the Acquisition Knowledge Framework platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteMapSections.map((section, index) => (
            <SitemapSection 
              key={index}
              title={section.title}
              icon={section.icon}
              links={section.links}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-br from-blue-900/30 to-gray-800 border-gray-700 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-white">Need help navigating?</h2>
            <p className="text-gray-300 mb-4">
              Contact the support team if you need assistance.
            </p>
            <Link to="/settings">
              <Badge className="hover:bg-blue-700 px-4 py-2 bg-blue-600 text-white">
                Go to Settings
              </Badge>
            </Link>
          </Card>
        </div>
      </Container>
    </ExternalPageLayout>
  );
}
