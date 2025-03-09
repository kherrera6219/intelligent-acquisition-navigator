
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { TexasChatContainer } from '@/components/texas/TexasChatContainer';
import { useAzureAI } from "@/hooks/useAzureAI";
import { useState } from "react";
import { Message, AIChatMessage } from "@/types/chat";
import { TexasMessage, TexasAgencyType } from "@/types/texas-chat";
import { useToast } from "@/hooks/use-toast";

interface ChatState {
  messages: TexasMessage[];
  conversationId: string;
  addMessage: (message: Omit<TexasMessage, "id" | "timestamp">) => Promise<boolean>;
  isLoading: boolean;
}

const TexasAcquisitionPage = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string>();
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    conversationId: "texas-" + Date.now(),
    addMessage: async (message) => {
      const newMessage: TexasMessage = {
        id: Date.now().toString(),
        timestamp: new Date(),
        agencyType: "TEXAS_GOVERNMENT" as TexasAgencyType,
        userRole: message.userRole || "CONTRACTING_OFFICER",
        ...message
      };
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage]
      }));
      
      return true;
    },
    isLoading: false
  });

  const { toast } = useToast();

  const aiMutation = useAzureAI(chatState.messages, {
    onSuccess: async (data) => {
      setError(undefined);
      const success = await chatState.addMessage({
        role: "assistant",
        content: data.choices[0].message.content,
        agencyType: "TEXAS_GOVERNMENT" as TexasAgencyType,
        userRole: "CONTRACTING_OFFICER"
      });
      
      if (!success) {
        toast({
          title: "Error saving message",
          description: "Your message was displayed but couldn't be saved.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error('AI Error:', error);
      setError("Failed to get AI response. Please try again.");
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || aiMutation.isPending || !chatState.conversationId) return;

    setError(undefined);
    const success = await chatState.addMessage({
      role: "user",
      content: input.trim(),
      agencyType: "TEXAS_GOVERNMENT" as TexasAgencyType,
      userRole: "CONTRACTING_OFFICER"
    });
    
    if (!success) {
      setError("Failed to save your message. Please try again.");
      toast({
        title: "Error saving message",
        description: "Your message couldn't be saved. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const currentInput = input;
    setInput("");
    
    const aiContext = `You are a Texas acquisition expert, specializing in Texas state procurement regulations and processes. 
                      Provide clear, accurate guidance specific to Texas acquisition regulations and requirements. 
                      Focus on compliance, best practices, and practical implementation.`;
    
    const aiMessages: AIChatMessage[] = [
      { role: "system", content: aiContext },
      ...chatState.messages.map(msg => ({ 
        role: msg.role as "user" | "assistant", 
        content: msg.content 
      })),
      { role: "user", content: currentInput.trim() }
    ];

    aiMutation.mutate(aiMessages);
  };

  return (
    <ProtectedPageLayout
      title="Texas Acquisition"
      description="Get AI assistance for Texas state acquisition regulations and requirements"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Texas Acquisition', href: '/texas-acquisition' }
      ]}
    >
      <div className="min-h-[calc(100vh-200px)]">
        <TexasChatContainer
          conversationId={chatState.conversationId}
          messages={chatState.messages}
          isLoading={chatState.isLoading || aiMutation.isPending}
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          error={error}
        />
      </div>
    </ProtectedPageLayout>
  );
};

export default TexasAcquisitionPage;
