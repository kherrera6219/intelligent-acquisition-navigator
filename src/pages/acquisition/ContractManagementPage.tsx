
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { GradientText } from '@/components/ui/universal/GradientText';

const ContractManagementPage: React.FC = () => {
  return (
    <Container>
      <div className="py-6">
        <PageHeader
          title={<GradientText>Contract Management</GradientText>}
          description="Manage and monitor your contracts throughout their lifecycle"
        />
        <div className="mt-6">
          <p className="text-gray-400">Contract management tools and tracking will be displayed here.</p>
        </div>
      </div>
    </Container>
  );
};

export default ContractManagementPage;
