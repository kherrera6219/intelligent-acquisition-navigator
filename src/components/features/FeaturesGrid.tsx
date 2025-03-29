
import React from 'react';
import { 
  Shield, 
  BarChart, 
  Database, 
  Search, 
  FileText, 
  Clock, 
  Settings, 
  Zap,
  Users
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-[#1A1F2C]/80 border border-[#9b87f5]/10 rounded-lg p-6 transition-all duration-300 hover:transform hover:translate-y-[-4px] hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-lg bg-[#9b87f5]/10 flex items-center justify-center mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-[#9b87f5]" />,
      title: "Compliance Automation",
      description: "Automatically track and ensure compliance with federal, state, and local acquisition regulations."
    },
    {
      icon: <BarChart className="h-6 w-6 text-[#D946EF]" />,
      title: "Advanced Analytics",
      description: "Gain actionable insights with visual dashboards and customizable reports."
    },
    {
      icon: <Database className="h-6 w-6 text-[#F97316]" />,
      title: "Centralized Knowledge",
      description: "Access a comprehensive database of acquisition regulations and best practices."
    },
    {
      icon: <Search className="h-6 w-6 text-[#0EA5E9]" />,
      title: "Intelligent Search",
      description: "Find relevant information quickly with our AI-powered search capabilities."
    },
    {
      icon: <FileText className="h-6 w-6 text-[#9b87f5]" />,
      title: "Document Management",
      description: "Organize and manage all your acquisition documents in one secure location."
    },
    {
      icon: <Clock className="h-6 w-6 text-[#D946EF]" />,
      title: "Timeline Tracking",
      description: "Monitor project milestones and deadlines with interactive timeline views."
    },
    {
      icon: <Settings className="h-6 w-6 text-[#F97316]" />,
      title: "Customizable Workflows",
      description: "Configure acquisition processes to match your organization's specific requirements."
    },
    {
      icon: <Zap className="h-6 w-6 text-[#0EA5E9]" />,
      title: "AI-Powered Insights",
      description: "Leverage machine learning to identify patterns and optimize acquisition strategies."
    },
    {
      icon: <Users className="h-6 w-6 text-[#9b87f5]" />,
      title: "Collaborative Tools",
      description: "Enable teams to work together seamlessly throughout the acquisition process."
    }
  ];

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Comprehensive Feature Set</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our platform offers a wide range of tools designed specifically for government acquisition professionals.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Feature 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};
