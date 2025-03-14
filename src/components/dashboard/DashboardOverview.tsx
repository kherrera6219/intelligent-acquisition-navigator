
import React from 'react';
import { Card } from '@/components/ui/universal/Card';

export const DashboardOverview: React.FC = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="glass" className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Projects</h3>
          <p className="text-3xl font-bold">12</p>
        </Card>
        <Card variant="glass" className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Pending Proposals</h3>
          <p className="text-3xl font-bold">4</p>
        </Card>
        <Card variant="glass" className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Documents Created</h3>
          <p className="text-3xl font-bold">23</p>
        </Card>
      </div>
    </section>
  );
};
