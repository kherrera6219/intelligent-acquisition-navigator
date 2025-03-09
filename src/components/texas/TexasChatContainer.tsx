
import { TexasAgencyType, TexasMessage, TexasRole, ResponseLevel } from "@/types/texas-chat";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { TexasChatSettings } from "@/components/texas/TexasChatSettings";
import { GradientText } from "@/components/ui/universal/GradientText";
import { Card } from "@/components/ui/universal/Card";
import { ChatHistory } from "@/components/chat/ChatHistory";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { History, Code, Play, Palette } from "lucide-react";

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
  const [showHistory, setShowHistory] = useState(true);

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

        <div className="flex gap-4">
          {showHistory && (
            <div className="w-64 flex-shrink-0">
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

          <Card className="p-6 space-y-6 flex-grow">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
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

                <Button
                  variant="outline"
                  size="sm"
                  title="Canvas Tool"
                  onClick={() => console.log('Document creation clicked')}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Canvas Tool
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  title="Code Editor"
                  onClick={() => console.log('Code creation clicked')}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Code Editor
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  title="Run Environment"
                  onClick={() => console.log('Run environment clicked')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run Environment
                </Button>
              </div>
            </div>
            
            <div className="h-[500px] overflow-y-auto bg-gradient-to-b from-background to-background/50 rounded-lg p-4">
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
