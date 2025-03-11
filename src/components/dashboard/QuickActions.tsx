
import React from 'react';
import { MsDashboardSection } from '@/components/layout/MsDashboardSection';
import { MsDashboardGrid } from '@/components/layout/MsDashboardGrid';
import { MsDashboardCard } from '@/components/layout/MsDashboardCard';
import { FileText, PieChart, Users, HelpCircle } from 'lucide-react';

export const QuickActions: React.FC = () => {
  return (
    <MsDashboardSection 
      title="Quick Actions" 
      variant="card" 
      action={{ label: "View All", href: "/actions" }}
    >
      <MsDashboardGrid columns={4} gap="sm">
        <MsDashboardCard
          href="/acquisition/document-control"
          icon={<FileText className="h-5 w-5 text-blue-400" />}
          title="Documents"
          subtitle="Manage documents"
        />
        <MsDashboardCard
          href="/analytics"
          icon={<PieChart className="h-5 w-5 text-purple-400" />}
          title="Analytics"
          subtitle="View reports"
        />
        <MsDashboardCard
          href="/proposals"
          icon={<Users className="h-5 w-5 text-green-400" />}
          title="Proposals"
          subtitle="Review submissions"
        />
        <MsDashboardCard
          href="/knowledge-base"
          icon={<HelpCircle className="h-5 w-5 text-amber-400" />}
          title="Knowledge Base"
          subtitle="Access guides"
        />
      </MsDashboardGrid>
    </MsDashboardSection>
  );
};
