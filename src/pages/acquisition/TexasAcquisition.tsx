
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
      const success = await addMessage({
        role: "assistant",
        content: data.choices[0].message.content
      }, selectedAgency, selectedRole, selectedResponseLevel);
      
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
    }, selectedAgency, selectedRole, selectedResponseLevel);
    
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
      { role: "user", content: input.trim() }
    ];

    aiMutation.mutate(aiMessages);
  };

  return (
    <TexasChatContainer
      conversationId={conversationId || ""}
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
