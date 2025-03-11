
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { FlexColumn } from '@/components/ui/universal/Flexbox';

export const HomeHero: React.FC = () => {
  return (
    <section className="w-full py-10 md:py-16">
      <Container>
        <Row>
          <Col lg={6} className="mb-8 lg:mb-0">
            <FlexColumn className="h-full justify-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Intelligent Acquisition Navigator
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl mt-4">
                Streamline procurement processes across federal, state, and local levels with AI-powered insights and compliance automation.
              </p>
              <div className="flex flex-wrap gap-4 pt-6">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 h-12 rounded-md text-base font-medium shadow-lg hover:shadow-xl transition-all">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/contact">
                  <Button variant="outline" className="border-primary/30 hover:border-primary/60 text-primary hover:text-primary/90 px-6 py-6 h-12 rounded-md text-base font-medium">
                    Schedule Demo
                  </Button>
                </Link>
              </div>
            </FlexColumn>
          </Col>
          <Col lg={6}>
            <div className="metallic-card p-6 rounded-xl">
              <img 
                src="/assets/dashboard-preview.png" 
                alt="Intelligent Acquisition Navigator Dashboard" 
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  // Fallback for missing image
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x500?text=Intelligent+Acquisition+Navigator';
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
