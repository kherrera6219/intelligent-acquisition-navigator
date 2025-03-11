
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, BarChart, Zap, Globe, RefreshCw, Settings } from 'lucide-react';
import { Container, Row, Col } from '@/components/ui/universal/Grid';

export const HomeFeatures: React.FC = () => {
  const features = [
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
  ];

  return (
    <section className="w-full py-10 md:py-16 bg-secondary/10 backdrop-blur-sm">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Powerful Procurement Features</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our comprehensive suite of tools helps streamline your procurement workflows with AI-powered intelligence.
          </p>
        </div>
        
        <Row>
          {features.map((feature, index) => (
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
  );
};
