
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { TexasMessage, TexasAgencyType, TexasRole, ResponseLevel } from "@/types/texas-chat";
import { texasChatMiddleware } from "@/middleware/texasChat";

export const useTexasConversation = () => {
  const [messages, setMessages] = useState<TexasMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [validations, setValidations] = useState<Record<string, {
    status: 'pending' | 'valid' | 'invalid' | 'needs_review';
    confidence: number;
    notes?: string;
  }>>({});
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

          // Load existing validations
          const validationResults = await texasChatMiddleware.getValidations(
            formattedMessages.map(m => m.id)
          );
          
          const validationMap = validationResults.reduce((acc, val) => ({
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
            variant: "warning",
          });
        }
      }

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
    isLoading,
    validations
  };
};
