
import React from 'react';
import { Card } from '@/components/ui/universal/Card';
import { PieChart, File, Calendar, FileText, Bookmark, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <Card 
      className="p-4 cursor-pointer ms-dashboard-card-interactive"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          {icon}
        </div>
        <div>
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export const DashboardMainContent: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="lg:col-span-2 space-y-6">
      <section>
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickActionCard
            title="View Proposals"
            description="Browse and manage all proposals"
            icon={<FileText className="h-5 w-5 text-primary" />}
            onClick={() => navigate('/proposals')}
          />
          <QuickActionCard
            title="Texas Acquisition"
            description="Manage Texas state compliance"
            icon={<Store className="h-5 w-5 text-primary" />}
            onClick={() => navigate('/acquisition/texas')}
          />
          <QuickActionCard
            title="Schedule Review"
            description="Set up procurement review meetings"
            icon={<Calendar className="h-5 w-5 text-primary" />}
            onClick={() => navigate('/schedule')}
          />
          <QuickActionCard
            title="Saved Templates"
            description="Access your document templates"
            icon={<Bookmark className="h-5 w-5 text-primary" />}
            onClick={() => navigate('/templates')}
          />
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-medium mb-4">Procurement Analytics</h2>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Spending by Category</h3>
            <PieChart className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
            <p className="text-sm text-muted-foreground">Analytics visualization would render here</p>
          </div>
        </Card>
      </section>
    </div>
  );
};
