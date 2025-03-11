
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { GradientText } from '@/components/ui/universal/GradientText';

const SourceSelectionPage: React.FC = () => {
  return (
    <Container>
      <div className="py-6">
        <PageHeader
          title={<GradientText>Source Selection</GradientText>}
          description="Evaluate and select the optimal sources for your procurement needs"
        />
        <div className="mt-6">
          <p className="text-gray-400">Source selection tools and evaluations will be displayed here.</p>
        </div>
      </div>
    </Container>
  );
};

export default SourceSelectionPage;
