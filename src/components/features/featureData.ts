
import React from 'react';
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
  Lock
} from 'lucide-react';

export const knowledgeFeatures = [
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

export const complianceFeatures = [
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

export const analyticsFeatures = [
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
