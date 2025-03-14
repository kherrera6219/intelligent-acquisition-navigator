
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  BarChart3, 
  CheckCircle, 
  Shield, 
  Zap, 
  Database, 
  Users, 
  FileText, 
  PenTool,
  GanttChart,
  Bot,
  Search,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Container } from '@/components/ui/universal/Container';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <Card className="p-6 bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors h-full flex flex-col">
    <div className="rounded-full bg-blue-900/20 p-3 w-fit mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-400 flex-grow">{description}</p>
  </Card>
);

interface FeatureTabContentProps {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  image?: string;
}

const FeatureTabContent: React.FC<FeatureTabContentProps> = ({ 
  title, 
  description, 
  features, 
  image = '/images/feature-placeholder.jpg' 
}) => (
  <div className="pt-8">
    <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
        <p className="text-xl text-gray-400 mb-6">{description}</p>
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <img 
          src={image} 
          alt={`${title} feature visualization`} 
          className="w-full h-auto object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/600x400/1e293b/38bdf8?text=Feature+Image';
          }}
        />
      </div>
    </div>
    
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </div>
  </div>
);

export default function FeaturesPage() {
  const knowledgeFeatures = [
    {
      title: 'Comprehensive FAR Database',
      description: 'Access the complete Federal Acquisition Regulation database with advanced search capabilities.',
      icon: <Database className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Interactive Learning Modules',
      description: 'Engage with interactive tutorials and training materials to enhance your acquisition knowledge.',
      icon: <BookOpen className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Real-time Updates',
      description: 'Stay current with automatically updated regulatory changes and acquisition policy updates.',
      icon: <Zap className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Cross-Reference Tools',
      description: 'Easily navigate between related regulations, clauses, and provisions across multiple documents.',
      icon: <Search className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Customizable Knowledge Base',
      description: 'Create and maintain your organization's acquisition knowledge repository with custom annotations.',
      icon: <PenTool className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Expert Community',
      description: 'Connect with acquisition professionals and subject matter experts to share insights and best practices.',
      icon: <Users className="h-6 w-6 text-blue-500" />
    }
  ];

  const complianceFeatures = [
    {
      title: 'Automated Compliance Checks',
      description: 'Ensure acquisition documents meet all relevant regulatory requirements with AI-powered verification.',
      icon: <CheckCircle className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Audit Trail Documentation',
      description: 'Maintain comprehensive records of compliance checks and decisions for audit readiness.',
      icon: <FileText className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Risk Assessment Tools',
      description: 'Identify and mitigate compliance risks with built-in risk assessment frameworks.',
      icon: <Shield className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Approval Workflows',
      description: 'Streamline the review and approval process with customizable compliance-focused workflows.',
      icon: <GanttChart className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Policy Implementation',
      description: 'Transform organizational policies into actionable compliance requirements.',
      icon: <PenTool className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Secure Document Management',
      description: 'Store and manage acquisition documents with enterprise-grade security protocols.',
      icon: <Lock className="h-6 w-6 text-blue-500" />
    }
  ];

  const analyticsFeatures = [
    {
      title: 'Performance Dashboards',
      description: 'Visualize key acquisition metrics and performance indicators in customizable dashboards.',
      icon: <BarChart3 className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Predictive Analytics',
      description: 'Leverage AI to forecast acquisition outcomes and identify optimization opportunities.',
      icon: <Bot className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Spending Analysis',
      description: 'Gain insights into procurement spending patterns across categories, suppliers, and time periods.',
      icon: <Database className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Supplier Performance Tracking',
      description: 'Monitor and evaluate vendor performance against contractual obligations and quality metrics.',
      icon: <Users className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Compliance Analytics',
      description: 'Measure and report on organizational compliance with acquisition regulations and policies.',
      icon: <CheckCircle className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Custom Reporting',
      description: 'Generate tailored reports to meet specific stakeholder information needs and requirements.',
      icon: <FileText className="h-6 w-6 text-blue-500" />
    }
  ];

  return (
    <ExternalPageLayout title="Features" description="Explore the comprehensive features of our acquisition knowledge platform.">
      <Container className="py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-400 border-blue-400">Platform Capabilities</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Comprehensive Acquisition Solutions</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover how our platform streamlines federal acquisition processes with intelligent tools, 
            comprehensive knowledge management, and robust compliance features.
          </p>
        </div>
        
        {/* Feature Tabs */}
        <Tabs defaultValue="knowledge" className="mb-20">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="knowledge" className="data-[state=active]:bg-blue-900/20">
              <BookOpen className="h-4 w-4 mr-2" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-blue-900/20">
              <Shield className="h-4 w-4 mr-2" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-900/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="knowledge">
            <FeatureTabContent
              title="Comprehensive Knowledge Management"
              description="Access comprehensive acquisition knowledge resources, from FAR regulations to agency-specific guidance, all in one centralized platform."
              features={knowledgeFeatures}
              image="/images/knowledge-base.jpg"
            />
          </TabsContent>
          
          <TabsContent value="compliance">
            <FeatureTabContent
              title="Automated Compliance Tools"
              description="Ensure adherence to acquisition regulations with powerful compliance tools that automate checks and streamline approvals."
              features={complianceFeatures}
              image="/images/compliance.jpg"
            />
          </TabsContent>
          
          <TabsContent value="analytics">
            <FeatureTabContent
              title="Advanced Analytics & Reporting"
              description="Gain actionable insights into your acquisition processes with comprehensive analytics and customizable reporting capabilities."
              features={analyticsFeatures}
              image="/images/analytics.jpg"
            />
          </TabsContent>
        </Tabs>
        
        {/* Feature Comparison */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-400 border-blue-400">Platform Comparison</Badge>
            <h2 className="text-3xl font-bold text-white">How We Compare</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
              See how our comprehensive solution stacks up against traditional acquisition tools.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Features</th>
                  <th className="py-4 px-6 text-center text-white bg-blue-900/20 font-semibold">AKF Platform</th>
                  <th className="py-4 px-6 text-center text-gray-400 font-medium">Traditional Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="py-4 px-6 text-gray-300">Integrated Knowledge Base</td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">Limited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-300">AI-Powered Compliance</td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">—</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-300">Real-time Regulatory Updates</td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">Manual Updates</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-300">Advanced Analytics</td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">Basic</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-300">Collaborative Workflows</td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">Limited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-300">Document Generation</td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">Basic Templates</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-300">Mobile Accessibility</td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">Limited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-br from-blue-900/30 to-gray-800 border-gray-700 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Transform Your Acquisition Process?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join federal agencies nationwide that use our platform to streamline procurement, 
              ensure compliance, and make data-driven acquisition decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Request a Demo
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-700">
                View Pricing Plans
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </ExternalPageLayout>
  );
}
