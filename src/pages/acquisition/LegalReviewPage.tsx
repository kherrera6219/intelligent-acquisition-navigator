
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { GradientText } from '@/components/ui/universal/GradientText';

const LegalReviewPage: React.FC = () => {
  return (
    <Container>
      <div className="py-6">
        <PageHeader
          title={<GradientText>Legal Review</GradientText>}
          description="Conduct legal reviews of acquisition documents and contracts"
        />
        <div className="mt-6">
          <p className="text-gray-400">Legal review tools and workflows will be displayed here.</p>
        </div>
      </div>
    </Container>
  );
};

export default LegalReviewPage;
