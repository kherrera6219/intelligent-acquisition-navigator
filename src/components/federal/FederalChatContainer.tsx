
import { Message } from "@/types/chat";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatToolbar } from "@/components/chat/ChatToolbar";
import { GradientText } from "@/components/ui/universal/GradientText";
import { Card } from "@/components/ui/universal/Card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FederalChatContainerProps {
  conversationId: string;
  messages: Message[];
  isLoading: boolean;
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDocumentCreation: () => void;
  onCodeCreation: () => void;
  onRunEnvironment: () => void;
  error?: string;
}

export const FederalChatContainer = ({
  conversationId,
  messages,
  isLoading,
  input,
  onInputChange,
  onSubmit,
  onDocumentCreation,
  onCodeCreation,
  onRunEnvironment,
  error
}: FederalChatContainerProps) => {
  return (
    <div className="container-module-lg py-8">
      <div className="flex flex-col gap-8">
        <div className="text-center max-w-3xl mx-auto">
          <GradientText className="text-3xl font-bold mb-4">
            Federal Acquisition Chat Assistant
          </GradientText>
          <p className="text-muted-foreground">
            Get expert guidance on federal acquisition regulations and requirements. Ask questions about FAR compliance, 
            contracting procedures, and procurement best practices.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="p-6 space-y-6 bg-black/40 backdrop-blur-sm shadow-xl border border-white/10">
          <ChatToolbar
            onDocumentCreation={onDocumentCreation}
            onCodeCreation={onCodeCreation}
            onRunEnvironment={onRunEnvironment}
          />
          
          <div 
            className="h-[600px] overflow-y-auto rounded-lg p-4 space-y-4 bg-gradient-to-b from-background/80 to-background/40 border border-white/10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.length === 0 && !isLoading && (
              <div className="flex items-center justify-center h-full text-muted-foreground text-center px-4">
                <div className="space-y-2">
                  <p className="text-lg font-medium">No messages yet</p>
                  <p className="text-sm opacity-70">Start by asking a question about federal acquisition regulations, contracting procedures, or procurement requirements.</p>
                </div>
              </div>
            )}
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
            className="animate-in fade-in-50"
          />
        </Card>
      </div>
    </div>
  );
};
