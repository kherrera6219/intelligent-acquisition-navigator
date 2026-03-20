
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Shield, Zap, BarChart } from 'lucide-react';

const SitemapSection = ({ title, links }: { title: string, links: Array<{ path: string, label: string, icon: React.ComponentType<{ className?: string }> }> }) => (
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
      { path: "/", label: "Home", icon: Brain },
      { path: "/features", label: "Features", icon: Shield },
      { path: "/pricing", label: "Pricing", icon: BarChart },
    ],
    dashboard: [
      { path: "/dashboard", label: "Dashboard", icon: Brain },
      { path: "/proposals", label: "Proposals", icon: Shield },
      { path: "/chat", label: "Chat Support", icon: Zap },
    ],
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
          <SitemapSection title="Dashboard & Tools" links={sections.dashboard} />
        </div>

        {/* Quick Actions */}
        <div className="mt-12 flex justify-center gap-4">
          <Button 
            className="enterprise-gradient"
            size="lg"
          >
            Return to Home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
