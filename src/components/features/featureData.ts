
import React from 'react';
import { 
  ShieldCheck, BookOpen, Zap, Clock, BarChart3, FileText, 
  LayoutGrid, Database, Settings, CheckSquare, Users, Lock 
} from 'lucide-react';

export interface FeatureTab {
  id: string;
  title: string;
  description: string;
  features: Feature[];
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const featureTabs: FeatureTab[] = [
  {
    id: "compliance",
    title: "Compliance",
    description: "Ensure adherence to acquisition regulations across all government levels",
    features: [
      {
        title: "Automated Compliance Checks",
        description: "Automatically scan documents for compliance issues with FAR, DFARS, and agency-specific regulations.",
        icon: React.createElement(ShieldCheck, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Regulatory Updates",
        description: "Stay current with automatic updates when regulations change at federal, state, or local levels.",
        icon: React.createElement(BookOpen, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Real-time Validation",
        description: "Get instant feedback on compliance issues as you draft acquisition documents.",
        icon: React.createElement(Zap, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Audit Trail",
        description: "Maintain comprehensive records of compliance checks and resolutions for auditing purposes.",
        icon: React.createElement(Clock, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Compliance Analytics",
        description: "View metrics and insights on compliance performance across your organization.",
        icon: React.createElement(BarChart3, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Compliance Reporting",
        description: "Generate detailed reports on compliance status for internal reviews and oversight bodies.",
        icon: React.createElement(FileText, { className: "h-6 w-6 text-blue-500" })
      }
    ]
  },
  {
    id: "knowledge",
    title: "Knowledge Management",
    description: "Access and manage comprehensive acquisition knowledge resources",
    features: [
      {
        title: "4D Knowledge Framework",
        description: "Navigate acquisition knowledge through an intuitive four-dimensional structure that maps regulations across jurisdictions.",
        icon: React.createElement(LayoutGrid, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "AI-Powered Search",
        description: "Find relevant acquisition information quickly with our advanced semantic search capabilities.",
        icon: React.createElement(Zap, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Knowledge Base",
        description: "Access a comprehensive library of acquisition regulations, best practices, and guidance documents.",
        icon: React.createElement(Database, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Customizable Workflows",
        description: "Create tailored acquisition processes that meet your organization's specific requirements.",
        icon: React.createElement(Settings, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Template Library",
        description: "Access a collection of pre-approved acquisition document templates that ensure compliance.",
        icon: React.createElement(FileText, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Version Control",
        description: "Track changes to acquisition documents with comprehensive version history.",
        icon: React.createElement(Clock, { className: "h-6 w-6 text-blue-500" })
      }
    ]
  },
  {
    id: "intelligence",
    title: "AI Intelligence",
    description: "Leverage advanced AI capabilities for smarter acquisition processes",
    features: [
      {
        title: "Predictive Analytics",
        description: "Forecast acquisition outcomes based on historical data and similar procurements.",
        icon: React.createElement(BarChart3, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Risk Assessment",
        description: "Identify potential risks in your acquisition strategy with AI-powered analysis.",
        icon: React.createElement(ShieldCheck, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Market Intelligence",
        description: "Gain insights into supplier capabilities, pricing trends, and market conditions.",
        icon: React.createElement(LayoutGrid, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Document Generation",
        description: "Create compliant acquisition documents with AI assistance based on your requirements.",
        icon: React.createElement(FileText, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Intelligent Recommendations",
        description: "Receive AI-powered suggestions for improving acquisition strategies and documents.",
        icon: React.createElement(Zap, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Anomaly Detection",
        description: "Automatically identify unusual patterns or outliers in procurement data that may indicate issues.",
        icon: React.createElement(CheckSquare, { className: "h-6 w-6 text-blue-500" })
      }
    ]
  },
  {
    id: "collaboration",
    title: "Collaboration",
    description: "Enable seamless teamwork across your acquisition teams",
    features: [
      {
        title: "Team Workspaces",
        description: "Create dedicated spaces for acquisition teams to collaborate on projects.",
        icon: React.createElement(Users, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Role-Based Access",
        description: "Control document access and editing permissions based on user roles and responsibilities.",
        icon: React.createElement(Lock, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Review & Approval Workflows",
        description: "Streamline document reviews with customizable approval processes.",
        icon: React.createElement(CheckSquare, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Real-Time Collaboration",
        description: "Work simultaneously on acquisition documents with team members.",
        icon: React.createElement(Users, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Communication Tools",
        description: "Discuss acquisition projects with integrated messaging and comment features.",
        icon: React.createElement(FileText, { className: "h-6 w-6 text-blue-500" })
      },
      {
        title: "Activity Tracking",
        description: "Monitor team progress and activities on acquisition projects in real-time.",
        icon: React.createElement(Clock, { className: "h-6 w-6 text-blue-500" })
      }
    ]
  }
];
