
import { TexasAgencyType, TexasMessage, TexasRole, ResponseLevel } from "@/types/texas-chat";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatToolbar } from "@/components/chat/ChatToolbar";
import { TexasChatSettings } from "@/components/texas/TexasChatSettings";
import { GradientText } from "@/components/ui/universal/GradientText";
import { Card } from "@/components/ui/universal/Card";
import { ChatHistory } from "@/components/chat/ChatHistory";
import { FileUpload } from "@/components/chat/FileUpload";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

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
                  onClick={() => setShowHistory(!showHistory)}
                >
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
              
              <Button
                variant={isVoiceActive ? "destructive" : "outline"}
                size="sm"
                onClick={toggleVoice}
              >
                {isVoiceActive ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isVoiceActive ? "Stop Voice" : "Start Voice"}
              </Button>
            </div>
            
            <ChatToolbar
              onDocumentCreation={() => console.log('Document creation clicked')}
              onCodeCreation={() => console.log('Code creation clicked')}
              onRunEnvironment={() => console.log('Run environment clicked')}
            />
            
            <div className="h-[500px] overflow-y-auto bg-gradient-to-b from-background to-background/50 rounded-lg p-4">
              <ChatMessages
                messages={messages}
                isLoading={isLoading}
                error={error}
              />
            </div>
            
            <div className="relative">
              <div className="absolute bottom-4 left-4 z-10">
                <FileUpload onFileUpload={handleFileUpload} className="inline-block" />
              </div>
              <ChatInput
                input={input}
                isLoading={isLoading}
                onInputChange={onInputChange}
                onSubmit={onSubmit}
                className="pl-14" // Add left padding to accommodate the upload button
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
