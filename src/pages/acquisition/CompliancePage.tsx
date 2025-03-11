
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { GradientText } from '@/components/ui/universal/GradientText';

const CompliancePage: React.FC = () => {
  return (
    <Container>
      <div className="py-6">
        <PageHeader
          title={<GradientText>Compliance</GradientText>}
          description="Manage regulatory compliance for your acquisition activities"
        />
        <div className="mt-6">
          <p className="text-gray-400">Compliance management content will be displayed here.</p>
        </div>
      </div>
    </Container>
  );
};

export default CompliancePage;
