
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flag } from "lucide-react";
import { TexasAgencyType, TEXAS_AGENCY_LABELS } from "@/types/texas-chat";

interface TexasChatSelectorsProps {
  selectedAgency: TexasAgencyType;
  onAgencyChange: (value: TexasAgencyType) => void;
}

export const TexasChatSelectors = ({
  selectedAgency,
  onAgencyChange,
}: TexasChatSelectorsProps) => {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-white/10">
      <div className="flex items-center gap-4">
        <Flag className="w-5 h-5 text-red-500" />
        <Select value={selectedAgency} onValueChange={onAgencyChange}>
          <SelectTrigger className="w-[250px] bg-gray-800/50 border-gray-700 text-white">
            <SelectValue placeholder="Select Texas agency type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {Object.entries(TEXAS_AGENCY_LABELS).map(([agency, label]) => (
              <SelectItem 
                key={agency} 
                value={agency}
                className="text-white hover:bg-gray-700 focus:bg-gray-700"
              >
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
