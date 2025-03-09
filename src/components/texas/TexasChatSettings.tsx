
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TexasAgencyType, TexasRole, ResponseLevel } from "@/types/texas-chat";
import { TexasChatSelectors } from "@/components/texas/TexasChatSelectors";

interface TexasChatSettingsProps {
  selectedAgency: TexasAgencyType;
  selectedRole: TexasRole;
  selectedResponseLevel: ResponseLevel;
  onAgencyChange: (value: TexasAgencyType) => void;
  onRoleChange: (value: TexasRole) => void;
  onResponseLevelChange: (value: ResponseLevel) => void;
}

export const TexasChatSettings: React.FC<TexasChatSettingsProps> = ({
  selectedAgency,
  selectedRole,
  selectedResponseLevel,
  onAgencyChange,
  onRoleChange,
  onResponseLevelChange,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" title="Chat Settings">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chat Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Configure your chat experience with the Texas Acquisition Assistant
          </p>
          <TexasChatSelectors
            selectedRole={selectedRole}
            selectedAgency={selectedAgency}
            selectedDetailLevel={selectedResponseLevel}
            onRoleChange={onRoleChange}
            onAgencyChange={onAgencyChange}
            onDetailLevelChange={onResponseLevelChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
