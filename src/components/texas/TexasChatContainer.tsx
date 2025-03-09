
import { TexasAgencyType, TexasMessage, TexasRole, ResponseLevel } from "@/types/texas-chat";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { TexasChatSettings } from "@/components/texas/TexasChatSettings";
import { GradientText } from "@/components/ui/universal/GradientText";
import { Card } from "@/components/ui/universal/Card";
import { ChatHistory } from "@/components/chat/ChatHistory";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { History, Settings } from "lucide-react";

interface TexasChatContainerProps {
  conversationId: string;
  messages: TexasMessage[];
  isLoading: boolean;
  input: string;
  selectedAgency?: TexasAgencyType;
  selectedRole?: TexasRole;
  selectedResponseLevel?: ResponseLevel;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onAgencyChange?: (value: TexasAgencyType) => void;
  onRoleChange?: (value: TexasRole) => void;
  onResponseLevelChange?: (value: ResponseLevel) => void;
  error?: string;
}

export const TexasChatContainer = ({
  conversationId,
  messages,
  isLoading,
  input,
  selectedAgency = "TEXAS_GOVERNMENT" as TexasAgencyType,
  selectedRole = "CONTRACTING_OFFICER" as TexasRole,
  selectedResponseLevel = "STANDARD" as ResponseLevel,
  onInputChange,
  onSubmit,
  onAgencyChange = () => {},
  onRoleChange = () => {},
  onResponseLevelChange = () => {},
  error,
}: TexasChatContainerProps) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const toggleVoice = () => {
    // In a real implementation, this would start/stop voice recording
    setIsVoiceActive(!isVoiceActive);
  };

  const handleFileUpload = async (files: FileList) => {
    // Logic to handle the uploaded file
    if (files.length > 0) {
      const file = files[0];
      console.log("File uploaded:", file.name);
      // Here you would typically upload the file to a storage service
      // Then add a message to the chat indicating a file was uploaded
    }
  };

  return (
    <div className="container-module w-full max-w-6xl mx-auto py-4 px-3 sm:px-4 md:px-0">
      <div className="flex flex-col gap-4">
        <div className="text-center mb-2">
          <GradientText className="text-2xl sm:text-3xl font-bold">
            Texas Acquisition Assistant
          </GradientText>
        </div>

        <div className="flex gap-4">
          {showHistory && (
            <div className="w-60 flex-shrink-0">
              <Card className="p-4 h-[650px] overflow-y-auto">
                <h3 className="text-lg font-medium mb-4">Chat History</h3>
                <ChatHistory 
                  conversations={[
                    { id: conversationId, preview: "Current conversation", timestamp: new Date() },
                    // In a real implementation, you would fetch previous conversations from backend
                  ]} 
                  currentConversationId={conversationId}
                  onSelectConversation={(id) => console.log("Selected conversation:", id)}
                />
              </Card>
            </div>
          )}

          <Card className="p-4 sm:p-6 space-y-4 flex-grow">
            <div className="flex justify-between items-center gap-2 flex-wrap">
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm"
                  title="Toggle Chat History"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <History className="h-4 w-4 mr-2" />
                  {showHistory ? "Hide History" : "Show History"}
                </Button>
                
                <TexasChatSettings
                  selectedRole={selectedRole}
                  selectedAgency={selectedAgency}
                  selectedResponseLevel={selectedResponseLevel}
                  onRoleChange={onRoleChange}
                  onAgencyChange={onAgencyChange}
                  onResponseLevelChange={onResponseLevelChange}
                />
              </div>
            </div>
            
            <div className="h-[500px] overflow-y-auto bg-gradient-to-b from-background to-background/50 rounded-lg p-3 sm:p-4">
              <ChatMessages
                messages={messages}
                isLoading={isLoading}
                error={error}
              />
            </div>
            
            <div className="relative">
              <ChatInput
                input={input}
                isLoading={isLoading}
                onInputChange={onInputChange}
                onSubmit={onSubmit}
                onFileUpload={handleFileUpload}
                isVoiceActive={isVoiceActive}
                onVoiceToggle={toggleVoice}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
