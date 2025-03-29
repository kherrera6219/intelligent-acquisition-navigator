
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { Helmet } from 'react-helmet';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Button } from '@/components/ui/button';
import { CaseStudyCard } from '@/components/case-studies/CaseStudyCard';
import { CaseStudyFilter } from '@/components/case-studies/CaseStudyFilter';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CaseStudiesPage() {
  const navigate = useNavigate();
  
  const caseStudies = [
    {
      id: 'case1',
      title: 'Department of Defense Procurement Modernization',
      summary: 'How the DoD streamlined their acquisition process and reduced procurement time by 45%.',
      agency: 'Department of Defense',
      industry: 'Defense',
      challenge: 'Complex procurement processes with extensive manual reviews',
      solution: 'Implemented ProcurityIQ with custom compliance automation',
      results: ['45% reduction in procurement timeline', '32% cost savings', 'Improved vendor participation'],
      image: 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=800'
    },
    {
      id: 'case2',
      title: 'USDA Grant Management Transformation',
      summary: 'Modernizing the grant review and approval process at the USDA.',
      agency: 'U.S. Department of Agriculture',
      industry: 'Agriculture',
      challenge: 'Fragmented systems for grant management across departments',
      solution: 'Centralized grant management with ProcurityIQ integration',
      results: ['60% faster grant processing', '99.7% compliance rate', 'Increased applicant satisfaction'],
      image: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=800'
    },
    {
      id: 'case3',
      title: 'Texas State Agency Vendor Management',
      summary: 'Unified vendor management across multiple state agencies in Texas.',
      agency: 'Texas Health and Human Services',
      industry: 'Healthcare',
      challenge: 'Disjointed vendor management across 5 departments',
      solution: 'Implemented vendor portal with integrated compliance checking',
      results: ['85% reduction in vendor onboarding time', '$4.2M annual savings', 'Improved vendor diversity'],
      image: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&w=800'
    },
    {
      id: 'case4',
      title: 'EPA Environmental Compliance Assessment',
      summary: 'Automating compliance verification for environmental procurement regulations.',
      agency: 'Environmental Protection Agency',
      industry: 'Environmental',
      challenge: 'Complex sustainability requirements across procurement categories',
      solution: 'AI-powered compliance verification system',
      results: ['98% accuracy in compliance verification', '70% faster assessment process', 'Enhanced sustainability reporting'],
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800'
    }
  ];

  return (
    <ExternalPageLayout
      showHeader={true}
      showFooter={true}
    >
      <Helmet>
        <title>Case Studies | ProcurityIQ</title>
        <meta name="description" content="Explore how government agencies are transforming their acquisition processes with ProcurityIQ." />
      </Helmet>
      
      <Container className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Success <MsGradientText>Stories</MsGradientText></h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover how government agencies are transforming acquisition processes and achieving compliance with ProcurityIQ.
          </p>
          <Button 
            onClick={() => navigate('/contact')}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {/* Filter Section */}
        <div className="mb-12">
          <CaseStudyFilter />
        </div>
        
        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {caseStudies.map(caseStudy => (
            <CaseStudyCard 
              key={caseStudy.id}
              caseStudy={caseStudy}
            />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to write your success story?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the growing list of government agencies transforming their procurement processes with ProcurityIQ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg"
              onClick={() => navigate('/contact')}
            >
              Schedule a Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/features')}
            >
              Explore Features
            </Button>
          </div>
        </div>
      </Container>
    </ExternalPageLayout>
  );
}
