
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Flex } from '@/components/ui/universal/Flexbox';

export const HomeHero: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24">
      <Container>
        <Row className="items-center">
          <Col lg={6} className="mb-8 lg:mb-0 text-center lg:text-left">
            <Flex direction="column" className="h-full justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                ProcurityIQ Acquisition Platform
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl mt-6 mx-auto lg:mx-0">
                Streamline procurement processes across federal, state, and local levels with AI-powered insights and compliance automation.
              </p>
              <div className="flex flex-wrap gap-4 pt-8 justify-center lg:justify-start">
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
            </Flex>
          </Col>
          <Col lg={6} className="flex justify-center">
            <div className="metal-card p-6 rounded-xl max-w-md lg:max-w-full">
              <img 
                src="/assets/dashboard-preview.png" 
                alt="ProcurityIQ Dashboard Preview" 
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  // Fallback for missing image
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x500?text=ProcurityIQ+Acquisition+Platform';
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
