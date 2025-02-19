
import { Card } from "@/components/ui/card";
import { TexasChatSelectors } from "./TexasChatSelectors";
import { FileUpload } from "@/components/chat/FileUpload";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import { TexasAgencyType, TexasRole, TexasMessage, ResponseLevel } from "@/types/texas-chat";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

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
  onResponseLevelChange
}: TexasChatContainerProps) => {
  const { toast } = useToast();

  const handleUploadComplete = (documentId: string) => {
    toast({
      title: "Document uploaded",
      description: "Your document has been successfully uploaded and will be processed.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 animate-gradient-x">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-black/40 backdrop-blur-sm border-white/10 animate-fade-up">
          <div className="h-[calc(100vh-8rem)] flex flex-col">
            {/* Header Section */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-violet-400" />
                <h2 className="text-lg font-semibold text-white">Texas Acquisition Chat</h2>
              </div>
              <div className="flex items-center gap-4">
                <TexasChatSelectors
                  selectedAgency={selectedAgency}
                  selectedRole={selectedRole}
                  selectedResponseLevel={selectedResponseLevel}
                  onAgencyChange={onAgencyChange}
                  onRoleChange={onRoleChange}
                  onResponseLevelChange={onResponseLevelChange}
                />
                <FileUpload 
                  conversationId={conversationId}
                  onUploadComplete={handleUploadComplete}
                />
              </div>
            </div>

            {/* Messages Section */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <ChatMessages 
                messages={messages} 
                isLoading={isLoading}
                className="animate-fade-in"
              />
            </div>

            {/* Input Section */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <ChatInput
                input={input}
                isLoading={isLoading}
                onInputChange={onInputChange}
                onSubmit={onSubmit}
                className="animate-fade-up"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
