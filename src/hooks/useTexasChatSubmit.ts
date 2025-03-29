
import { useState } from "react";
import { useAzureAI } from "@/hooks/useAzureAI";
import { useToast } from "@/hooks/use-toast";
import { TexasAgencyType, TexasRole, ResponseLevel } from "@/types/texas-chat";
import { prepareTexasAIMessages } from "@/utils/texasAcquisition";

interface UseTexasChatSubmitProps {
  messages: any[];
  conversationId: string | null;
  addMessage: (message: any) => Promise<boolean>;
}

interface UseTexasChatSubmitReturn {
  input: string;
  setInput: (input: string) => void;
  selectedAgency: TexasAgencyType;
  setSelectedAgency: (agency: TexasAgencyType) => void;
  selectedRole: TexasRole;
  setSelectedRole: (role: TexasRole) => void;
  selectedResponseLevel: ResponseLevel;
  setSelectedResponseLevel: (level: ResponseLevel) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isProcessing: boolean;
}

export const useTexasChatSubmit = ({
  messages,
  conversationId,
  addMessage
}: UseTexasChatSubmitProps): UseTexasChatSubmitReturn => {
  const [input, setInput] = useState("");
  const [selectedAgency, setSelectedAgency] = useState<TexasAgencyType>("TEXAS_GOVERNMENT");
  const [selectedRole, setSelectedRole] = useState<TexasRole>("CONTRACTING_OFFICER");
  const [selectedResponseLevel, setSelectedResponseLevel] = useState<ResponseLevel>("STANDARD");
  const { toast } = useToast();

  const aiMutation = useAzureAI(messages, {
    onSuccess: async (data) => {
      const success = await addMessage({
        role: "assistant",
        content: data.choices[0].message.content,
        agencyType: selectedAgency,
        userRole: selectedRole,
        responseLevel: selectedResponseLevel
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
      content: input.trim(),
      agencyType: selectedAgency,
      userRole: selectedRole,
      responseLevel: selectedResponseLevel
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
    
    const aiMessages = prepareTexasAIMessages(
      messages,
      currentInput,
      selectedAgency,
      selectedRole,
      selectedResponseLevel
    );

    aiMutation.mutate(aiMessages);
  };

  return {
    input,
    setInput,
    selectedAgency,
    setSelectedAgency,
    selectedRole,
    setSelectedRole,
    selectedResponseLevel,
    setSelectedResponseLevel,
    handleSubmit,
    isProcessing: aiMutation.isPending
  };
};
