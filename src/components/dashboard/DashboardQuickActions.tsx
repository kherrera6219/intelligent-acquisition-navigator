
import React from 'react';
import { FileText, PieChart, Users, HelpCircle } from 'lucide-react';
import { QuickActionCard } from './QuickActionCard';

export const DashboardQuickActions: React.FC = () => {
  const quickActions = [
    {
      title: "Document Control",
      description: "Manage and organize your acquisition documents.",
      icon: FileText,
      href: "/acquisition/document-control",
      color: "text-blue-500"
    },
    {
      title: "Analytics",
      description: "View analytics and reports for your acquisitions.",
      icon: PieChart,
      href: "/analytics",
      color: "text-purple-500"
    },
    {
      title: "Proposals",
      description: "Review and manage your proposal submissions.",
      icon: Users,
      href: "/proposals",
      color: "text-green-500"
    },
    {
      title: "Knowledge Base",
      description: "Access guides and documentation.",
      icon: HelpCircle,
      href: "/knowledge-base",
      color: "text-amber-500"
    }
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <QuickActionCard key={index} {...action} />
        ))}
      </div>
    </section>
  );
};
