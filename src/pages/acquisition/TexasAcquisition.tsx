
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useAzureAI } from "@/hooks/useAzureAI";
import { TexasAgencyType, TexasRole, TexasMessage, ResponseLevel, RESPONSE_LEVEL_LABELS } from "@/types/texas-chat";
import { AIChatMessage } from "@/types/chat";
import { useTexasConversation } from "@/hooks/useTexasConversation";
import { TexasChatContainer } from "@/components/texas/TexasChatContainer";
import { useToast } from "@/hooks/use-toast";

const TexasAcquisition = () => {
  const [input, setInput] = useState("");
  const [selectedAgency, setSelectedAgency] = useState<TexasAgencyType>("TEXAS_GOVERNMENT");
  const [selectedRole, setSelectedRole] = useState<TexasRole>("CONTRACTING_OFFICER");
  const [selectedResponseLevel, setSelectedResponseLevel] = useState<ResponseLevel>("STANDARD");
  const { messages, conversationId, addMessage } = useTexasConversation();
  const { toast } = useToast();

  const aiMutation = useAzureAI(messages, {
    onSuccess: async (data) => {
      const assistantMessage: Omit<TexasMessage, "id" | "timestamp" | "agencyType" | "userRole"> = {
        role: "assistant",
        content: data.choices[0].message.content
      };
      
      const success = await addMessage(assistantMessage, selectedAgency, selectedRole, selectedResponseLevel);
      
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

    const userMessage: Omit<TexasMessage, "id" | "timestamp" | "agencyType" | "userRole"> = {
      role: "user",
      content: input.trim()
    };

    const success = await addMessage(userMessage, selectedAgency, selectedRole, selectedResponseLevel);
    
    if (!success) {
      toast({
        title: "Error saving message",
        description: "Your message couldn't be saved. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setInput("");
    
    const aiContext = `You are a procurement expert for the ${selectedAgency.replace('_', ' ').toLowerCase()} sector, 
                      specifically assisting a ${selectedRole.replace('_', ' ').toLowerCase()}. 
                      Please provide a ${selectedResponseLevel.toLowerCase()} response that is appropriate for a ${RESPONSE_LEVEL_LABELS[selectedResponseLevel].toLowerCase()}.
                      Provide guidance specific to Texas state regulations and requirements.`;
    
    const aiMessages: AIChatMessage[] = [
      { role: "system", content: aiContext },
      ...messages.map(msg => ({ 
        role: msg.role as "user" | "assistant", 
        content: msg.content 
      })),
      { role: "user", content: userMessage.content }
    ];

    aiMutation.mutate(aiMessages);
  };

  if (!conversationId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <Card className="p-8 bg-black/40 backdrop-blur-sm border-white/10">
          <p className="text-white">Initializing chat...</p>
        </Card>
      </div>
    );
  }

  return (
    <TexasChatContainer
      conversationId={conversationId}
      messages={messages}
      isLoading={aiMutation.isPending}
      input={input}
      selectedAgency={selectedAgency}
      selectedRole={selectedRole}
      selectedResponseLevel={selectedResponseLevel}
      onInputChange={setInput}
      onSubmit={handleSubmit}
      onAgencyChange={setSelectedAgency}
      onRoleChange={setSelectedRole}
      onResponseLevelChange={setSelectedResponseLevel}
    />
  );
};

export default TexasAcquisition;
