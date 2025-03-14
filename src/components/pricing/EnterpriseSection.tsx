
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle, InfoIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const EnterpriseSection: React.FC = () => {
  return (
    <div className="mt-20">
      <Card className="p-8 bg-gray-800 border-gray-700 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Enterprise Custom Solutions</h2>
            <p className="text-gray-400 mb-6">
              Need a tailored solution for your agency's specific acquisition challenges? Our team will work with you to create a custom plan that meets your exact requirements.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-300">Custom integrations with existing systems</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-300">Dedicated account management</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-300">Tailored training and onboarding</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-300">Custom SLAs and support options</span>
              </li>
            </ul>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Contact Our Sales Team
            </Button>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start mb-4">
              <AlertCircle className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">FedRAMP Compliance</h3>
                <p className="text-gray-400">
                  Our platform is FedRAMP authorized, ensuring the highest level of security and compliance for federal agencies.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Special Agency Pricing</h3>
                <p className="text-gray-400">
                  We offer special pricing for government agencies through various contract vehicles including GSA Schedule 70.
                </p>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center mt-4 cursor-help">
                    <InfoIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Enterprise plans include additional benefits</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>These plans include unlimited users, priority support, and customized training</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </Card>
    </div>
  );
};
