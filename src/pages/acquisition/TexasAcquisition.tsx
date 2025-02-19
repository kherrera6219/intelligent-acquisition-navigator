
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useAzureAI } from "@/hooks/useAzureAI";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import { TexasChatSelectors } from "@/components/texas/TexasChatSelectors";
import { TexasAgencyType, TexasRole, TexasMessage } from "@/types/texas-chat";
import { Message, AIChatMessage } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/chat/FileUpload";

const TexasAcquisition = () => {
  const [messages, setMessages] = useState<TexasMessage[]>([]);
  const [input, setInput] = useState("");
  const [selectedAgency, setSelectedAgency] = useState<TexasAgencyType>("TEXAS_GOVERNMENT");
  const [selectedRole, setSelectedRole] = useState<TexasRole>("CONTRACT_OFFICER");
  const { toast } = useToast();
  const [conversationId] = useState(crypto.randomUUID());

  const aiMutation = useAzureAI(messages, {
    onSuccess: async (data) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const assistantMessage: TexasMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.choices[0].message.content,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);

      const messageData = {
        content: assistantMessage.content,
        role: assistantMessage.role,
        user_id: user.id,
        conversation_id: conversationId,
        context_data: null,
        metadata: {
          agencyType: selectedAgency,
          userRole: selectedRole
        }
      };

      const { error } = await supabase.from('chat_messages').insert(messageData);

      if (error) {
        console.error('Error saving message:', error);
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

  const handleUploadComplete = (documentId: string) => {
    toast({
      title: "Document uploaded",
      description: "Your document has been successfully uploaded and will be processed.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || aiMutation.isPending) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use the chat feature.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: TexasMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
      agencyType: selectedAgency,
      userRole: selectedRole
    };

    const messageData = {
      content: userMessage.content,
      role: userMessage.role,
      user_id: user.id,
      conversation_id: conversationId,
      context_data: null,
      metadata: {
        agencyType: selectedAgency,
        userRole: selectedRole
      }
    };

    const { error: dbError } = await supabase.from('chat_messages').insert(messageData);

    if (dbError) {
      console.error('Error saving message:', dbError);
      toast({
        title: "Error saving message",
        description: "Your message couldn't be saved. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    const aiContext = `You are a procurement expert for the ${selectedAgency.replace('_', ' ').toLowerCase()} sector, 
                      specifically assisting a ${selectedRole.replace('_', ' ').toLowerCase()}. 
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-black/40 backdrop-blur-sm border-white/10">
          <div className="h-[600px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <TexasChatSelectors
                selectedAgency={selectedAgency}
                selectedRole={selectedRole}
                onAgencyChange={setSelectedAgency}
                onRoleChange={setSelectedRole}
              />
              <FileUpload 
                conversationId={conversationId}
                onUploadComplete={handleUploadComplete}
              />
            </div>
            <ChatMessages 
              messages={messages} 
              isLoading={aiMutation.isPending} 
            />
            <ChatInput
              input={input}
              isLoading={aiMutation.isPending}
              onInputChange={setInput}
              onSubmit={handleSubmit}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TexasAcquisition;
