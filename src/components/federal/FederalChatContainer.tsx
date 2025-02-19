
import { Message } from "@/types/chat";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatToolbar } from "@/components/chat/ChatToolbar";
import { GradientText } from "@/components/ui/universal/GradientText";
import { Card } from "@/components/ui/universal/Card";

interface FederalChatContainerProps {
  conversationId: string;
  messages: Message[];
  isLoading: boolean;
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const FederalChatContainer = ({
  conversationId,
  messages,
  isLoading,
  input,
  onInputChange,
  onSubmit,
}: FederalChatContainerProps) => {
  return (
    <div className="container-module-lg py-8">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <GradientText className="text-3xl font-bold">
            Federal Acquisition Chat Assistant
          </GradientText>
          <p className="text-muted-foreground mt-2">
            Get expert guidance on federal acquisition regulations and requirements
          </p>
        </div>

        <Card className="p-6 space-y-6">
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
