
import { useState } from "react";
import { useAzureAI } from "@/hooks/useAzureAI";
import { Message, AIChatMessage } from "@/types/chat";
import { FederalChatContainer } from "@/components/federal/FederalChatContainer";
import { useToast } from "@/hooks/use-toast";

const FederalAcquisition = () => {
  const [input, setInput] = useState("");
  const { messages, conversationId, addMessage, isLoading: isInitializing } = useState<{
    messages: Message[];
    conversationId: string;
    addMessage: (message: Omit<Message, "id" | "timestamp">) => Promise<boolean>;
    isLoading: boolean;
  }>({
    messages: [],
    conversationId: "federal-" + Date.now(),
    addMessage: async () => true,
    isLoading: false
  });
  
  const { toast } = useToast();

  const aiMutation = useAzureAI(messages, {
    onSuccess: async (data) => {
      const success = await addMessage({
        role: "assistant",
        content: data.choices[0].message.content
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
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || aiMutation.isPending || !conversationId) return;

    const success = await addMessage({
      role: "user",
      content: input.trim()
    });
    
    if (!success) {
      toast({
        title: "Error saving message",
        description: "Your message couldn't be saved. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const currentInput = input;
    setInput("");
    
    const aiContext = `You are a federal acquisition expert, specializing in FAR regulations and federal procurement processes. 
                      Provide guidance specific to federal acquisition regulations and requirements.`;
    
    const aiMessages: AIChatMessage[] = [
      { role: "system", content: aiContext },
      ...messages.map(msg => ({ 
        role: msg.role as "user" | "assistant", 
        content: msg.content 
      })),
      { role: "user", content: currentInput.trim() }
    ];

    aiMutation.mutate(aiMessages);
  };

  return (
    <FederalChatContainer
      conversationId={conversationId}
      messages={messages}
      isLoading={isInitializing || aiMutation.isPending}
      input={input}
      onInputChange={setInput}
      onSubmit={handleSubmit}
    />
  );
};

export default FederalAcquisition;
