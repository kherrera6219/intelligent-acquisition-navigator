
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { TexasMessage, TexasAgencyType, TexasRole, ResponseLevel, ValidationResult } from "@/types/texas-chat";
import { texasChatMiddleware } from "@/middleware/texasChat";
import { supabase } from "@/integrations/supabase/client";

export const useTexasConversation = () => {
  const [messages, setMessages] = useState<TexasMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [validations, setValidations] = useState<Record<string, {
    status: ValidationResult['status'];
    confidence: number;
    notes?: string | null;
  }>>({});
  const { toast } = useToast();

  useEffect(() => {
    const initializeConversation = async () => {
      try {
        setIsLoading(true);
        
        // Get current authenticated user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to use the chat feature.",
            variant: "destructive",
          });
          return;
        }

        const conversation = await texasChatMiddleware.createConversation(
          user.id,
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

          // Load existing validations
          const validationResults = await texasChatMiddleware.getValidations(
            formattedMessages.map(m => m.id)
          );
          
          const validationMap = validationResults.reduce((acc, val: ValidationResult) => ({
            ...acc,
            [val.message_id]: {
              status: val.status,
              confidence: val.confidence_score,
              notes: val.validation_notes
            }
          }), {});
          
          setValidations(validationMap);
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
      // Get current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to send messages.",
          variant: "destructive",
        });
        return false;
      }
      
      const dbMessage = await texasChatMiddleware.sendMessage({
        conversationId,
        userId: user.id,
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

      // If it's an AI response, trigger validation
      if (message.role === "assistant") {
        const validation = await texasChatMiddleware.validateResponse(dbMessage.id, {
          content: message.content,
          agencyType: message.agencyType,
          userRole: message.userRole
        });

        setValidations(prev => ({
          ...prev,
          [dbMessage.id]: {
            status: validation.status,
            confidence: validation.confidence_score,
            notes: validation.validation_notes
          }
        }));

        // Show validation feedback if needed
        if (validation.status === 'needs_review' || validation.status === 'invalid') {
          toast({
            title: "Response Validation",
            description: validation.validation_notes || "This response requires review for accuracy.",
            variant: "destructive",
          });
        }
      }

      return true;
    } catch (error) {
      console.error('Error saving message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    messages,
    conversationId,
    addMessage,
    isLoading,
    validations
  };
};
