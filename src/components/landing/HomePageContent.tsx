
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PrivacyNotice } from './PrivacyNotice';
import { BackToTopButton } from '@/components/ui/navigation/BackToTopButton';
import { HelpButton } from '@/components/ui/navigation/HelpButton';
import { ChevronRight, Shield, BarChart, Zap, Globe, RefreshCw, Settings } from 'lucide-react';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Flexbox, FlexColumn, FlexBetween } from '@/components/ui/universal/Flexbox';

interface HomePageContentProps {
  showPrivacyNotice: boolean;
  setShowPrivacyNotice: (show: boolean) => void;
  showBackToTop: boolean;
  isFirstVisit: boolean;
  scrollToTop: () => void;
}

export const HomePageContent: React.FC<HomePageContentProps> = ({
  showPrivacyNotice,
  setShowPrivacyNotice,
  showBackToTop,
  isFirstVisit,
  scrollToTop,
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section with Microsoft Fluent Design */}
      <section className="w-full py-10 md:py-16">
        <Container>
          <Row>
            <Col lg={6} className="mb-8 lg:mb-0">
              <FlexColumn className="h-full justify-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  Advanced Procurement Intelligence Platform
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-xl mt-4">
                  Streamline acquisition processes across federal, state, and local levels with AI-powered insights and compliance tools.
                </p>
                <div className="flex flex-wrap gap-4 pt-6">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 h-12 rounded-md text-base font-medium shadow-lg hover:shadow-xl transition-all">
                    Get Started
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="border-primary/30 hover:border-primary/60 text-primary hover:text-primary/90 px-6 py-6 h-12 rounded-md text-base font-medium">
                    Schedule Demo
                  </Button>
                </div>
              </FlexColumn>
            </Col>
            <Col lg={6}>
              <div className="metallic-card p-6 rounded-xl">
                <img 
                  src="/assets/dashboard-preview.png" 
                  alt="ProcurityIQ Dashboard Preview" 
                  className="w-full h-auto rounded-lg shadow-lg"
                  onError={(e) => {
                    // Fallback for missing image
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/800x500?text=ProcurityIQ+Dashboard';
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section - Microsoft Card Grid */}
      <section className="w-full py-10 md:py-16 bg-secondary/10 backdrop-blur-sm">
        <Container>
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Powerful Procurement Features</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our comprehensive suite of tools helps streamline your procurement workflows with AI-powered intelligence.
            </p>
          </div>
          
          <Row>
            {[
              {
                icon: <Shield className="h-8 w-8 text-blue-400" />,
                title: "Compliance Management",
                description: "Automatically monitor regulatory requirements and ensure all procurement activities meet compliance standards."
              },
              {
                icon: <BarChart className="h-8 w-8 text-green-400" />,
                title: "Advanced Analytics",
                description: "Gain actionable insights from your procurement data with our powerful analytics dashboard."
              },
              {
                icon: <Zap className="h-8 w-8 text-amber-400" />,
                title: "AI-Powered Processing",
                description: "Leverage artificial intelligence to optimize your procurement workflows and reduce manual effort."
              },
              {
                icon: <Globe className="h-8 w-8 text-purple-400" />,
                title: "Multi-Level Governance",
                description: "Manage procurement across federal, state, and local levels with consistent rules and oversight."
              },
              {
                icon: <RefreshCw className="h-8 w-8 text-rose-400" />,
                title: "Process Automation",
                description: "Automate repetitive tasks and approval workflows to accelerate procurement cycles."
              },
              {
                icon: <Settings className="h-8 w-8 text-cyan-400" />,
                title: "Customizable Framework",
                description: "Adapt the platform to your specific organizational needs with flexible configuration options."
              }
            ].map((feature, index) => (
              <Col key={index} md={6} lg={4} className="mb-6">
                <div className="ms-fluent-panel hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-300 flex-grow">{feature.description}</p>
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <Link to="/features" className="text-primary hover:text-primary/90 flex items-center text-sm font-medium">
                        Learn more
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-20">
        <Container>
          <div className="ms-fluent-panel max-w-4xl mx-auto">
            <div className="p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your procurement process?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Join organizations across the country that are already saving time and reducing compliance risks with ProcurityIQ.
              </p>
              <FlexBetween className="flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 h-12 rounded-md text-base font-medium">
                  Start Free Trial
                </Button>
                <Button variant="outline" className="border-gray-600 bg-transparent hover:bg-white/5 px-6 py-6 h-12 rounded-md text-base font-medium">
                  Schedule Demo
                </Button>
              </FlexBetween>
            </div>
          </div>
        </Container>
      </section>

      {/* Privacy Notice */}
      {showPrivacyNotice && (
        <PrivacyNotice
          onLearnMore={() => console.log('Learn more clicked')}
          onClose={() => setShowPrivacyNotice(false)}
        />
      )}

      {/* Navigation Controls */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        {showBackToTop && <BackToTopButton onClick={scrollToTop} />}
        <HelpButton />
      </div>
    </div>
  );
};
