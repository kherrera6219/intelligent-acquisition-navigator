
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, UserCircle, FileText } from "lucide-react";
import { TexasAgencyType, TexasRole, ResponseLevel, TEXAS_AGENCY_LABELS, TEXAS_ROLE_LABELS, RESPONSE_LEVEL_LABELS } from "@/types/texas-chat";

interface TexasSelectorsProps {
  selectedAgency: TexasAgencyType;
  selectedRole: TexasRole;
  selectedDetailLevel: ResponseLevel;
  onAgencyChange: (value: TexasAgencyType) => void;
  onRoleChange: (value: TexasRole) => void;
  onDetailLevelChange: (value: ResponseLevel) => void;
}

export const ChatSelectors = ({
  selectedAgency,
  selectedRole,
  selectedDetailLevel,
  onAgencyChange,
  onRoleChange,
  onDetailLevelChange,
}: TexasSelectorsProps) => {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-4">
        <Building className="w-5 h-5 text-violet-400" />
        <Select value={selectedAgency} onValueChange={onAgencyChange}>
          <SelectTrigger className="w-[250px] bg-gray-800/50 border-gray-700 text-white">
            <SelectValue placeholder="Select agency type" />
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
      <div className="flex items-center gap-4">
        <UserCircle className="w-5 h-5 text-violet-400" />
        <Select value={selectedRole} onValueChange={onRoleChange}>
          <SelectTrigger className="w-[250px] bg-gray-800/50 border-gray-700 text-white">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {Object.entries(TEXAS_ROLE_LABELS).map(([role, label]) => (
              <SelectItem 
                key={role} 
                value={role}
                className="text-white hover:bg-gray-700 focus:bg-gray-700"
              >
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-4">
        <FileText className="w-5 h-5 text-violet-400" />
        <Select value={selectedDetailLevel} onValueChange={onDetailLevelChange}>
          <SelectTrigger className="w-[250px] bg-gray-800/50 border-gray-700 text-white">
            <SelectValue placeholder="Select response level" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {Object.entries(RESPONSE_LEVEL_LABELS).map(([level, label]) => (
              <SelectItem 
                key={level} 
                value={level}
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
