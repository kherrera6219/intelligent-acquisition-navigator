
import { TexasAgencyType, TexasMessage, TexasRole, ResponseLevel } from "@/types/texas-chat";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatToolbar } from "@/components/chat/ChatToolbar";
import { ChatSelectors } from "@/components/texas/TexasChatSelectors";
import { GradientText } from "@/components/ui/universal/GradientText";
import { Card } from "@/components/ui/universal/Card";

interface TexasChatContainerProps {
  conversationId: string;
  messages: TexasMessage[];
  isLoading: boolean;
  input: string;
  selectedAgency: TexasAgencyType;
  selectedRole: TexasRole;
  selectedResponseLevel: ResponseLevel;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onAgencyChange: (value: TexasAgencyType) => void;
  onRoleChange: (value: TexasRole) => void;
  onResponseLevelChange: (value: ResponseLevel) => void;
}

export const TexasChatContainer = ({
  conversationId,
  messages,
  isLoading,
  input,
  selectedAgency,
  selectedRole,
  selectedResponseLevel,
  onInputChange,
  onSubmit,
  onAgencyChange,
  onRoleChange,
  onResponseLevelChange,
}: TexasChatContainerProps) => {
  return (
    <div className="container-module-lg py-8">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <GradientText className="text-3xl font-bold">
            Texas Acquisition Chat Assistant
          </GradientText>
          <p className="text-muted-foreground mt-2">
            Get expert guidance on Texas state procurement regulations and requirements
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <ChatSelectors
            selectedRole={selectedRole}
            selectedAgency={selectedAgency}
            selectedDetailLevel={selectedResponseLevel}
            onRoleChange={onRoleChange}
            onAgencyChange={onAgencyChange}
            onDetailLevelChange={onResponseLevelChange}
          />
          
          <ChatToolbar
            onDocumentCreation={() => console.log('Document creation clicked')}
            onCodeCreation={() => console.log('Code creation clicked')}
            onRunEnvironment={() => console.log('Run environment clicked')}
          />
          
          <div className="h-[600px] overflow-y-auto bg-gradient-to-b from-background to-background/50 rounded-lg p-4">
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
            />
          </div>
          
          <ChatInput
            input={input}
            isLoading={isLoading}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
          />
        </Card>
      </div>
    </div>
  );
};
