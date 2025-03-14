
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  return (
    <div className="mb-24">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4 px-4 py-1.5 text-blue-400 border-blue-400 text-sm">
          PLATFORM COMPARISON
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">How We Compare</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-4 leading-relaxed">
          See how our comprehensive solution stacks up against traditional acquisition tools.
        </p>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-5 px-6 text-left text-gray-400 font-medium text-lg">Features</th>
              <th className="py-5 px-6 text-center text-white bg-blue-900/20 font-semibold text-lg">AKF Platform</th>
              <th className="py-5 px-6 text-center text-gray-400 font-medium text-lg">Traditional Tools</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            <tr>
              <td className="py-5 px-6 text-gray-200 text-lg">Integrated Knowledge Base</td>
              <td className="py-5 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
              </td>
              <td className="py-5 px-6 text-center text-gray-500 text-lg">Limited</td>
            </tr>
            <tr>
              <td className="py-5 px-6 text-gray-200 text-lg">AI-Powered Compliance</td>
              <td className="py-5 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
              </td>
              <td className="py-5 px-6 text-center text-gray-500 text-lg">—</td>
            </tr>
            <tr>
              <td className="py-5 px-6 text-gray-200 text-lg">Real-time Regulatory Updates</td>
              <td className="py-5 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
              </td>
              <td className="py-5 px-6 text-center text-gray-500 text-lg">Manual Updates</td>
            </tr>
            <tr>
              <td className="py-5 px-6 text-gray-200 text-lg">Advanced Analytics</td>
              <td className="py-5 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
              </td>
              <td className="py-5 px-6 text-center text-gray-500 text-lg">Basic</td>
            </tr>
            <tr>
              <td className="py-5 px-6 text-gray-200 text-lg">Collaborative Workflows</td>
              <td className="py-5 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
              </td>
              <td className="py-5 px-6 text-center text-gray-500 text-lg">Limited</td>
            </tr>
            <tr>
              <td className="py-5 px-6 text-gray-200 text-lg">Document Generation</td>
              <td className="py-5 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
              </td>
              <td className="py-5 px-6 text-center text-gray-500 text-lg">Basic Templates</td>
            </tr>
            <tr>
              <td className="py-5 px-6 text-gray-200 text-lg">Mobile Accessibility</td>
              <td className="py-5 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
              </td>
              <td className="py-5 px-6 text-center text-gray-500 text-lg">Limited</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
