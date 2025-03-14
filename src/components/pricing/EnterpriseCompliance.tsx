
import React from 'react';
import { AlertCircle, InfoIcon } from 'lucide-react';
import { Tooltip } from "@/components/ui/tooltip/Tooltip";
import { TooltipContent } from "@/components/ui/tooltip/TooltipContent";
import { TooltipProvider } from "@/components/ui/tooltip/TooltipProvider";
import { Root, TooltipTrigger } from '@radix-ui/react-tooltip';

interface ComplianceInfoProps {
  items: Array<{
    title: string;
    description: string;
  }>;
  tooltipText: string;
}

export const EnterpriseCompliance: React.FC<ComplianceInfoProps> = ({ 
  items,
  tooltipText
}) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      {items.map((item, index) => (
        <div key={index} className={`flex items-start ${index > 0 ? 'mt-4' : ''}`}>
          <AlertCircle className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
            <p className="text-gray-400">
              {item.description}
            </p>
          </div>
        </div>
      ))}
      
      <TooltipProvider>
        <Tooltip content={tooltipText}>
          <div className="flex items-center mt-4 cursor-help">
            <InfoIcon className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Enterprise plans include additional benefits</span>
          </div>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
