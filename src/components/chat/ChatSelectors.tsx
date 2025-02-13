
import { UserCheck, Building, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLE_LABELS, AGENCY_LABELS, DETAIL_LEVELS } from "@/constants/chatOptions";
import { AcquisitionRole, AgencyRegulation, DetailLevel } from "@/types/chat";

interface ChatSelectorsProps {
  selectedRole: AcquisitionRole;
  selectedAgency: AgencyRegulation;
  selectedDetailLevel: DetailLevel;
  onRoleChange: (value: AcquisitionRole) => void;
  onAgencyChange: (value: AgencyRegulation) => void;
  onDetailLevelChange: (value: DetailLevel) => void;
}

export const ChatSelectors = ({
  selectedRole,
  selectedAgency,
  selectedDetailLevel,
  onRoleChange,
  onAgencyChange,
  onDetailLevelChange,
}: ChatSelectorsProps) => {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-4">
        <UserCheck className="w-5 h-5 text-violet-400" />
        <Select value={selectedRole} onValueChange={onRoleChange}>
          <SelectTrigger className="w-[250px] bg-gray-800/50 border-gray-700 text-white">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {Object.entries(ROLE_LABELS).map(([role, label]) => (
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
        <Building className="w-5 h-5 text-violet-400" />
        <Select value={selectedAgency} onValueChange={onAgencyChange}>
          <SelectTrigger className="w-[250px] bg-gray-800/50 border-gray-700 text-white">
            <SelectValue placeholder="Select agency regulation" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {Object.entries(AGENCY_LABELS).map(([agency, label]) => (
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
        <FileText className="w-5 h-5 text-violet-400" />
        <Select value={selectedDetailLevel} onValueChange={onDetailLevelChange}>
          <SelectTrigger className="w-[250px] bg-gray-800/50 border-gray-700 text-white">
            <SelectValue placeholder="Select detail level" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {Object.entries(DETAIL_LEVELS).map(([level, label]) => (
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
