
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Database,
  FileCode,
  List
} from 'lucide-react';
import { MsDashboardCard } from '@/components/layout/MsDashboardCard';

const QuickActionItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  href: string;
}> = ({ icon, label, href }) => {
  return (
    <Link
      to={href}
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors"
    >
      <div className="p-2 rounded-full bg-primary/10 mb-2">
        {icon}
      </div>
      <span className="text-sm font-medium text-center">{label}</span>
    </Link>
  );
};

export const DashboardQuickActions: React.FC = () => {
  return (
    <MsDashboardCard title="Quick Actions" className="glass-card">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickActionItem
          icon={<FileText className="h-5 w-5 text-primary" />}
          label="Proposals"
          href="/proposals"
        />
        <QuickActionItem
          icon={<Users className="h-5 w-5 text-primary" />}
          label="Team"
          href="/team"
        />
        <QuickActionItem
          icon={<BarChart3 className="h-5 w-5 text-primary" />}
          label="Analytics"
          href="/analytics"
        />
        <QuickActionItem
          icon={<MessageSquare className="h-5 w-5 text-primary" />}
          label="Chat"
          href="/chat"
        />
        <QuickActionItem
          icon={<Settings className="h-5 w-5 text-primary" />}
          label="Settings"
          href="/settings"
        />
        <QuickActionItem
          icon={<Database className="h-5 w-5 text-primary" />}
          label="Knowledge Base"
          href="/knowledge-base"
        />
        <QuickActionItem
          icon={<List className="h-5 w-5 text-primary" />}
          label="Activities"
          href="/activity"
        />
        <QuickActionItem
          icon={<FileCode className="h-5 w-5 text-primary" />}
          label="Code Review"
          href="/code-review"
        />
      </div>
    </MsDashboardCard>
  );
};
