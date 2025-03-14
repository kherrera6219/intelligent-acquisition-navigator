
import React from 'react';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';

const NotificationsPage: React.FC = () => {
  return (
    <PageErrorBoundary>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Notification Preferences</h1>
        <NotificationSettings />
      </div>
    </PageErrorBoundary>
  );
};

export default NotificationsPage;
