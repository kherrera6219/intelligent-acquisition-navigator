
import React from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Container } from '@/components/ui/universal/Grid';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { CtaSection } from '@/components/features/CtaSection';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';
import MarketResearchDashboard from '@/components/acquisition/market-research/MarketResearchDashboard';
import MarketResearchFilter from '@/components/acquisition/market-research/MarketResearchFilter';
import MarketResearchTable from '@/components/acquisition/market-research/MarketResearchTable';

const MarketResearchPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <UniversalInternalHeader />
      
      <div className="flex-1 flex">
        <PageErrorBoundary>
          <ProtectedPageLayout 
            title="Market Research" 
            description="Analyze market trends and identify potential opportunities."
            breadcrumbs={[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Market Research', href: '/market-research' }
            ]}
          >
            <Container>
              <MarketResearchDashboard />
              <MarketResearchFilter />
              <MarketResearchTable />
              <CtaSection />
            </Container>
          </ProtectedPageLayout>
        </PageErrorBoundary>
      </div>
      
      <InternalFooter />
    </div>
  );
};

export default MarketResearchPage;
