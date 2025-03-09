import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';

const AnalyticsPage = () => {
  return (
    <ProtectedPageLayout
      title="Analytics"
      description="View and analyze acquisition performance metrics"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Analytics', href: '/analytics' }
      ]}
    >
      <div className="min-h-[calc(100vh-200px)]">
        {/* Add your analytics content here */}
        <p>This is the analytics page content.</p>
      </div>
    </ProtectedPageLayout>
  );
};

export default AnalyticsPage;
