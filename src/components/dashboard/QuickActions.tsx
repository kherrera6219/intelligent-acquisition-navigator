
import React from 'react';
import { MsDashboardSection } from '@/components/layout/MsDashboardSection';
import { MsDashboardGrid } from '@/components/layout/MsDashboardGrid';
import { Link } from 'react-router-dom';
import { FileText, PieChart, Users, HelpCircle, LucideIcon } from 'lucide-react';

interface ActionCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ href, icon, title, subtitle }) => {
  return (
    <Link to={href} className="block h-full">
      <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-lg p-4 h-full
                    transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-card/60">
        <div className="flex flex-col items-center text-center">
          <div className="p-2 rounded-full bg-primary/10 mb-2">
            {icon}
          </div>
          <h3 className="text-sm font-semibold mb-1">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
};

export const QuickActions: React.FC = () => {
  return (
    <MsDashboardSection 
      title="Quick Actions" 
      variant="card" 
      action={{ label: "View All", href: "/actions" }}
    >
      <MsDashboardGrid columns={4} gap="sm">
        <ActionCard
          href="/acquisition/document-control"
          icon={<FileText className="h-5 w-5 text-blue-400" />}
          title="Documents"
          subtitle="Manage documents"
        />
        <ActionCard
          href="/analytics"
          icon={<PieChart className="h-5 w-5 text-purple-400" />}
          title="Analytics"
          subtitle="View reports"
        />
        <ActionCard
          href="/proposals"
          icon={<Users className="h-5 w-5 text-green-400" />}
          title="Proposals"
          subtitle="Review submissions"
        />
        <ActionCard
          href="/knowledge-base"
          icon={<HelpCircle className="h-5 w-5 text-amber-400" />}
          title="Knowledge Base"
          subtitle="Access guides"
        />
      </MsDashboardGrid>
    </MsDashboardSection>
  );
};
