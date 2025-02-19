
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { TexasMessage, TexasAgencyType, TexasRole, ResponseLevel } from "@/types/texas-chat";
import { texasChatMiddleware } from "@/middleware/texasChat";

export const useTexasConversation = () => {
  const [messages, setMessages] = useState<TexasMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initializeConversation = async () => {
      try {
        setIsLoading(true);
        const temporaryUserId = crypto.randomUUID();
        
        const conversation = await texasChatMiddleware.createConversation(
          temporaryUserId,
          `Texas Acquisition Chat - ${new Date().toLocaleDateString()}`
        );

        setConversationId(conversation.id);

        const existingMessages = await texasChatMiddleware.getMessages(conversation.id);
        
        if (existingMessages) {
          const formattedMessages: TexasMessage[] = existingMessages.map(msg => ({
            id: msg.id,
            role: msg.role as "user" | "assistant",
            content: msg.content,
            timestamp: new Date(msg.created_at),
            agencyType: msg.agency_type,
            userRole: msg.user_role
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error('Error initializing conversation:', error);
        toast({
          title: "Error",
          description: "Failed to initialize chat. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeConversation();
  }, [toast]);

  const addMessage = async (
    message: {
      role: "user" | "assistant";
      content: string;
      agencyType: TexasAgencyType;
      userRole: TexasRole;
      responseLevel: ResponseLevel;
    }
  ) => {
    if (!conversationId) return false;

    try {
      const temporaryUserId = crypto.randomUUID();
      
      const dbMessage = await texasChatMiddleware.sendMessage({
        conversationId,
        userId: temporaryUserId,
        content: message.content,
        role: message.role,
        agencyType: message.agencyType,
        userRole: message.userRole,
        responseLevel: message.responseLevel
      });

      const newMessage: TexasMessage = {
        id: dbMessage.id,
        role: message.role,
        content: message.content,
        timestamp: new Date(dbMessage.created_at),
        agencyType: message.agencyType,
        userRole: message.userRole
      };

      setMessages(prev => [...prev, newMessage]);
      return true;
    } catch (error) {
      console.error('Error saving message:', error);
      return false;
    }
  };

  return {
    messages,
    conversationId,
    addMessage,
    isLoading
  };
};
