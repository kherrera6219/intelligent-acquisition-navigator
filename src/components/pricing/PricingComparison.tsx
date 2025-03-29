
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

export const PricingComparison: React.FC = () => {
  const features = [
    {
      category: "Core Features",
      items: [
        {
          name: "Users",
          starter: "Up to 10",
          professional: "Up to 50",
          enterprise: "Unlimited"
        },
        {
          name: "Document Storage",
          starter: "5 GB",
          professional: "25 GB",
          enterprise: "Unlimited"
        },
        {
          name: "Documents per Month",
          starter: "100",
          professional: "1,000",
          enterprise: "Unlimited"
        }
      ]
    },
    {
      category: "Compliance Features",
      items: [
        {
          name: "Basic Compliance Checks",
          starter: true,
          professional: true,
          enterprise: true
        },
        {
          name: "Advanced Compliance Automation",
          starter: false,
          professional: true,
          enterprise: true
        },
        {
          name: "Custom Compliance Rules",
          starter: false,
          professional: "Limited",
          enterprise: "Unlimited"
        },
        {
          name: "Regulatory Updates",
          starter: "Quarterly",
          professional: "Monthly",
          enterprise: "Real-time"
        }
      ]
    },
    {
      category: "Document Management",
      items: [
        {
          name: "Basic Document Storage",
          starter: true,
          professional: true,
          enterprise: true
        },
        {
          name: "Version Control",
          starter: "Basic",
          professional: "Advanced",
          enterprise: "Enterprise-grade"
        },
        {
          name: "Document Templates",
          starter: "5 included",
          professional: "25 included",
          enterprise: "Unlimited"
        },
        {
          name: "OCR & Document Scanning",
          starter: false,
          professional: true,
          enterprise: true
        }
      ]
    },
    {
      category: "Analytics & Reporting",
      items: [
        {
          name: "Standard Reports",
          starter: true,
          professional: true,
          enterprise: true
        },
        {
          name: "Custom Dashboards",
          starter: false,
          professional: "Limited",
          enterprise: "Unlimited"
        },
        {
          name: "Data Export",
          starter: "CSV only",
          professional: "CSV, Excel, PDF",
          enterprise: "All formats"
        },
        {
          name: "AI-Powered Insights",
          starter: false,
          professional: "Basic",
          enterprise: "Advanced"
        }
      ]
    },
    {
      category: "Support",
      items: [
        {
          name: "Support Channels",
          starter: "Email only",
          professional: "Email & Phone",
          enterprise: "Email, Phone & Dedicated"
        },
        {
          name: "Response Time",
          starter: "48 hours",
          professional: "24 hours",
          enterprise: "4 hours"
        },
        {
          name: "Training Sessions",
          starter: "1 included",
          professional: "3 included",
          enterprise: "Unlimited"
        },
        {
          name: "Dedicated Support Manager",
          starter: false,
          professional: false,
          enterprise: true
        }
      ]
    }
  ];
  
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Features Comparison</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare our plans to find the perfect fit for your organization's acquisition needs.
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border/30">
              <th className="p-4 text-left w-1/4">Features</th>
              <th className="p-4 text-center">Starter</th>
              <th className="p-4 text-center bg-primary/5 border-x border-primary/10">
                <span className="relative">
                  Professional
                  <span className="absolute -top-3 right-0 bg-primary px-2 py-0.5 text-xs font-semibold text-white rounded">
                    Popular
                  </span>
                </span>
              </th>
              <th className="p-4 text-center">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {features.map((category, index) => (
              <React.Fragment key={index}>
                <tr className="bg-primary/5">
                  <td colSpan={4} className="p-3 font-semibold">
                    {category.category}
                  </td>
                </tr>
                {category.items.map((item, itemIndex) => (
                  <tr key={itemIndex} className="border-b border-border/10">
                    <td className="p-4 text-left">{item.name}</td>
                    <td className="p-4 text-center">
                      {renderFeatureValue(item.starter)}
                    </td>
                    <td className="p-4 text-center bg-primary/5 border-x border-primary/10">
                      {renderFeatureValue(item.professional)}
                    </td>
                    <td className="p-4 text-center">
                      {renderFeatureValue(item.enterprise)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function renderFeatureValue(value: boolean | string): React.ReactNode {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="h-5 w-5 text-green-500 mx-auto" />
    ) : (
      <X className="h-5 w-5 text-muted-foreground mx-auto" />
    );
  }
  
  return <span>{value}</span>;
}
