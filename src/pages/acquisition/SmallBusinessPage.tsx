
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { GradientText } from '@/components/ui/universal/GradientText';

const SmallBusinessPage: React.FC = () => {
  return (
    <Container>
      <div className="py-6">
        <PageHeader
          title={<GradientText>Small Business</GradientText>}
          description="Manage small business participation in your acquisition activities"
        />
        <div className="mt-6">
          <p className="text-gray-400">Small business tools and information will be displayed here.</p>
        </div>
      </div>
    </Container>
  );
};

export default SmallBusinessPage;
