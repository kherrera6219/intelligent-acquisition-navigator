
import { useState, useEffect } from "react";
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

interface ChatMessageData {
  content: string;
  role: string;
  user_id: string;
  conversation_id: string;
  agency_type: TexasAgencyType;
  user_role: TexasRole;
  context_data?: any;
  metadata?: any;
}

const TexasAcquisition = () => {
  const [messages, setMessages] = useState<TexasMessage[]>([]);
  const [input, setInput] = useState("");
  const [selectedAgency, setSelectedAgency] = useState<TexasAgencyType>("TEXAS_GOVERNMENT");
  const [selectedRole, setSelectedRole] = useState<TexasRole>("CONTRACT_OFFICER");
  const { toast } = useToast();
  const [conversationId, setConversationId] = useState<string>("");

  useEffect(() => {
    const initializeConversation = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to use the chat feature.",
          variant: "destructive",
        });
        return;
      }

      const { data: conversation, error } = await supabase
        .from('texas_conversations')
        .insert({
          user_id: user.id,
          title: `Texas Acquisition Chat - ${new Date().toLocaleDateString()}`
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating conversation:', error);
        toast({
          title: "Error",
          description: "Failed to initialize chat. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setConversationId(conversation.id);

      // Load existing messages for this conversation
      const { data: existingMessages, error: messagesError } = await supabase
        .from('texas_chat_messages')
        .select('*')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: true });

      if (messagesError) {
        console.error('Error loading messages:', messagesError);
      } else if (existingMessages) {
        setMessages(existingMessages.map(msg => ({
          id: msg.id,
          role: msg.role as "user" | "assistant",
          content: msg.content,
          timestamp: new Date(msg.created_at),
          agencyType: msg.agency_type,
          userRole: msg.user_role
        })));
      }
    };

    initializeConversation();
  }, [toast]);

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

      const messageData: ChatMessageData = {
        content: assistantMessage.content,
        role: assistantMessage.role,
        user_id: user.id,
        conversation_id: conversationId,
        agency_type: selectedAgency,
        user_role: selectedRole
      };

      const { error } = await supabase
        .from('texas_chat_messages')
        .insert(messageData);

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
    if (!input.trim() || aiMutation.isPending || !conversationId) return;

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

    const messageData: ChatMessageData = {
      content: userMessage.content,
      role: userMessage.role,
      user_id: user.id,
      conversation_id: conversationId,
      agency_type: selectedAgency,
      user_role: selectedRole
    };

    const { error: dbError } = await supabase
      .from('texas_chat_messages')
      .insert(messageData);

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
