
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Plus } from 'lucide-react';

interface FederalTabNavigationProps {
  activeTab: 'reports' | 'chat';
  onTabChange: (tab: 'reports' | 'chat') => void;
  onNewReport: () => void;
}

export const FederalTabNavigation: React.FC<FederalTabNavigationProps> = ({
  activeTab,
  onTabChange,
  onNewReport,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex gap-4">
        <Button
          variant={activeTab === 'reports' ? 'default' : 'outline'}
          onClick={() => onTabChange('reports')}
        >
          Reports
        </Button>
        <Button
          variant={activeTab === 'chat' ? 'default' : 'outline'}
          onClick={() => onTabChange('chat')}
        >
          AI Assistant
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button size="sm" onClick={onNewReport}>
          <Plus className="h-4 w-4 mr-2" />
          New Report
        </Button>
      </div>
    </div>
  );
};
