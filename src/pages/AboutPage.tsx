
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { TeamSection } from '@/components/about/TeamSection';
import { MissionVision } from '@/components/about/MissionVision';
import { CompanyTimeline } from '@/components/about/CompanyTimeline';
import { Partners } from '@/components/about/Partners';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();
  
  return (
    <ExternalPageLayout
      showHeader={true}
      showFooter={true}
    >
      <Helmet>
        <title>About Us | ProcurityIQ</title>
        <meta name="description" content="Learn about our mission to revolutionize government acquisition processes through AI and intelligent solutions." />
      </Helmet>
      
      <Container className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About <MsGradientText>ProcurityIQ</MsGradientText></h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're on a mission to transform government acquisition through intelligent technology solutions that simplify compliance and maximize efficiency.
          </p>
          <Button 
            onClick={() => navigate('/contact')}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {/* Mission and Vision */}
        <div className="mb-24">
          <MissionVision />
        </div>
        
        {/* Company Timeline */}
        <div className="mb-24">
          <CompanyTimeline />
        </div>
        
        {/* Team Section */}
        <div className="mb-24">
          <TeamSection />
        </div>
        
        {/* Partners */}
        <div className="mb-24">
          <Partners />
        </div>
      </Container>
    </ExternalPageLayout>
  );
}
