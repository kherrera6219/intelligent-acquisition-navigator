
import React from 'react';
import { 
  BookOpen, 
  Shield, 
  LineChart, 
  BookMarked, 
  Code, 
  Sparkles,
  CheckCircle2, 
  Database, 
  Network, 
  FileSearch, 
  Crosshair, 
  BarChartHorizontal 
} from 'lucide-react';

export const featureTabs = [
  {
    id: 'knowledge-management',
    title: 'Knowledge Management',
    description: 'Organize and access comprehensive acquisition knowledge across all government levels.',
    features: [
      {
        title: 'Federal Acquisition Regulations',
        description: 'Access comprehensive FAR and agency-specific supplements with AI-powered search and annotation capabilities.',
        icon: <BookOpen className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'State & Local Regulations',
        description: 'Navigate complex state and local procurement rules with jurisdiction-specific guidance and compliance tools.',
        icon: <BookMarked className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'Cross-Reference Engine',
        description: 'Instantly find connections between regulations across federal, state, and local levels to ensure full compliance.',
        icon: <Crosshair className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'Real-Time Updates',
        description: 'Stay current with automatic updates when regulations change, with change tracking and historical version comparison.',
        icon: <Network className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'Custom Knowledge Base',
        description: 'Build your organization\'s acquisition knowledge repository with agency-specific policies, precedents, and best practices.',
        icon: <Database className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'Document Analysis',
        description: 'Extract key information from procurement documents using advanced natural language processing.',
        icon: <FileSearch className="w-5 h-5 text-blue-400" />
      }
    ],
    image: '/images/knowledge-management.jpg'
  },
  {
    id: 'compliance',
    title: 'Compliance',
    description: 'Ensure your acquisition processes meet all regulatory requirements with AI-powered compliance tools.',
    features: [
      {
        title: 'Compliance Checks',
        description: 'Automatically verify solicitations and contracts against applicable regulations to identify compliance issues.',
        icon: <CheckCircle2 className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'Risk Assessment',
        description: 'Identify potential compliance risks and receive mitigation recommendations based on historical patterns.',
        icon: <Shield className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'Audit Trail',
        description: 'Maintain comprehensive documentation of compliance checks, decisions, and approvals for audit readiness.',
        icon: <BookMarked className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'Regulatory Impact Analysis',
        description: 'Assess how new or updated regulations impact your acquisition processes and documents.',
        icon: <BarChartHorizontal className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'Automated Reporting',
        description: 'Generate compliance reports for stakeholders and oversight bodies with detailed analytics and insights.',
        icon: <LineChart className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'AI-Powered Recommendations',
        description: 'Receive intelligent suggestions to improve compliance based on machine learning analysis of successful practices.',
        icon: <Sparkles className="w-5 h-5 text-blue-400" />
      }
    ],
    image: '/images/compliance.jpg'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Gain actionable insights from your acquisition data to improve decision-making and outcomes.',
    features: [
      {
        title: 'Performance Dashboards',
        description: 'Visualize key acquisition metrics and KPIs with customizable dashboards for different user roles.',
        icon: <LineChart className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'Predictive Analytics',
        description: 'Forecast procurement timelines, costs, and potential issues based on historical data patterns.',
        icon: <Sparkles className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'Comparative Analysis',
        description: 'Benchmark your acquisition performance against industry standards and similar organizations.',
        icon: <BarChartHorizontal className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'Trend Identification',
        description: 'Discover emerging patterns in your procurement data to inform strategic planning and process improvements.',
        icon: <LineChart className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'Custom Reports',
        description: 'Create tailored reports for stakeholders at all levels, from executives to procurement specialists.',
        icon: <FileSearch className="w-5 h-5 text-blue-400" />
      },
      {
        title: 'Data Visualization',
        description: 'Transform complex acquisition data into clear, actionable visualizations that drive informed decisions.',
        icon: <Network className="w-5 h-5 text-blue-400" />
      }
    ],
    image: '/images/analytics.jpg'
  }
];

// Define exported constants for the individual feature sections
export const knowledgeFeatures = featureTabs[0].features;
export const complianceFeatures = featureTabs[1].features;
export const analyticsFeatures = featureTabs[2].features;
