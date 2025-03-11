
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { GradientText } from '@/components/ui/universal/GradientText';

const QualityAssurancePage: React.FC = () => {
  return (
    <Container>
      <div className="py-6">
        <PageHeader
          title={<GradientText>Quality Assurance</GradientText>}
          description="Ensure quality control for your acquisition processes"
        />
        <div className="mt-6">
          <p className="text-gray-400">Quality assurance tools and tracking will be displayed here.</p>
        </div>
      </div>
    </Container>
  );
};

export default QualityAssurancePage;
