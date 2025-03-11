
import React from 'react';
import { MsDashboardCard } from '@/components/layout/MsDashboardCard';
import { Button } from '@/components/ui/button';

export const UserProfileCard: React.FC = () => {
  return (
    <MsDashboardCard
      title="Alex Morgan"
      subtitle="Department Manager"
      badge={{ text: "Premium", variant: "success" }}
    >
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary mb-2">
          AM
        </div>
        <p className="text-sm text-center text-muted-foreground">Logged in since 09:45 AM</p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-center text-sm">
        <div className="p-2 rounded bg-white/5">
          <p className="font-medium">18</p>
          <p className="text-xs text-muted-foreground">Tasks</p>
        </div>
        <div className="p-2 rounded bg-white/5">
          <p className="font-medium">5</p>
          <p className="text-xs text-muted-foreground">Projects</p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between">
        <Button variant="outline" size="sm">Profile</Button>
        <Button variant="outline" size="sm">Settings</Button>
      </div>
    </MsDashboardCard>
  );
};
