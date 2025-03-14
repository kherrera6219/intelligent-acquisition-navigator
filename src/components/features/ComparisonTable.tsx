
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-400 border-blue-400">Platform Comparison</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">How We Compare</h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed">
          See how our comprehensive solution stacks up against traditional acquisition tools.
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 text-left text-gray-400 font-medium text-base">Features</th>
              <th className="py-4 px-6 text-center text-white bg-blue-900/20 font-semibold text-base">AKF Platform</th>
              <th className="py-4 px-6 text-center text-gray-400 font-medium text-base">Traditional Tools</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            <tr>
              <td className="py-4 px-6 text-gray-300 text-base">Integrated Knowledge Base</td>
              <td className="py-4 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
              </td>
              <td className="py-4 px-6 text-center text-gray-500 text-base">Limited</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-gray-300 text-base">AI-Powered Compliance</td>
              <td className="py-4 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
              </td>
              <td className="py-4 px-6 text-center text-gray-500 text-base">—</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-gray-300 text-base">Real-time Regulatory Updates</td>
              <td className="py-4 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
              </td>
              <td className="py-4 px-6 text-center text-gray-500 text-base">Manual Updates</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-gray-300 text-base">Advanced Analytics</td>
              <td className="py-4 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
              </td>
              <td className="py-4 px-6 text-center text-gray-500 text-base">Basic</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-gray-300 text-base">Collaborative Workflows</td>
              <td className="py-4 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
              </td>
              <td className="py-4 px-6 text-center text-gray-500 text-base">Limited</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-gray-300 text-base">Document Generation</td>
              <td className="py-4 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
              </td>
              <td className="py-4 px-6 text-center text-gray-500 text-base">Basic Templates</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-gray-300 text-base">Mobile Accessibility</td>
              <td className="py-4 px-6 text-center bg-blue-900/10">
                <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
              </td>
              <td className="py-4 px-6 text-center text-gray-500 text-base">Limited</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
