
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, BarChart, Zap, Globe, RefreshCw, Settings } from 'lucide-react';
import { Container, Row, Col } from '@/components/ui/universal/Grid';

export const HomeFeatures: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-[#9b87f5]" />,
      title: "Compliance Management",
      description: "Automatically monitor regulatory requirements and ensure all procurement activities meet compliance standards."
    },
    {
      icon: <BarChart className="h-8 w-8 text-[#D946EF]" />,
      title: "Advanced Analytics",
      description: "Gain actionable insights from your procurement data with our powerful analytics dashboard."
    },
    {
      icon: <Zap className="h-8 w-8 text-[#F97316]" />,
      title: "AI-Powered Processing",
      description: "Leverage artificial intelligence to optimize your procurement workflows and reduce manual effort."
    },
    {
      icon: <Globe className="h-8 w-8 text-[#9b87f5]" />,
      title: "Multi-Level Governance",
      description: "Manage procurement across federal, state, and local levels with consistent rules and oversight."
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-[#D946EF]" />,
      title: "Process Automation",
      description: "Automate repetitive tasks and approval workflows to accelerate procurement cycles."
    },
    {
      icon: <Settings className="h-8 w-8 text-[#F97316]" />,
      title: "Customizable Framework",
      description: "Adapt the platform to your specific organizational needs with flexible configuration options."
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#1A1F2C]/70 backdrop-blur-sm">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Procurement Features</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our comprehensive suite of tools helps streamline your procurement workflows with AI-powered intelligence.
          </p>
        </div>
        
        <Row className="justify-center">
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={4} className="mb-8 px-4">
              <div className="glass-card hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 h-full rounded-xl border border-[#9b87f5]/20 bg-[#1A1F2C]/50 backdrop-blur-sm">
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-[#1A1F2C]/50 transform transition-transform duration-300 hover:scale-110">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                  <p className="text-gray-300 flex-grow text-center">{feature.description}</p>
                  <div className="mt-4 pt-4 border-t border-[#9b87f5]/20 text-center">
                    <Link to="/features" className="text-[#9b87f5] hover:text-[#8B5CF6] flex items-center justify-center text-sm font-medium group">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
