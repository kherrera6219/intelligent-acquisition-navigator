
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TexasMessage, TexasAgencyType, TexasRole, ResponseLevel } from "@/types/texas-chat";

export const useTexasConversation = () => {
  const [messages, setMessages] = useState<TexasMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const initializeConversation = async () => {
      const temporaryUserId = crypto.randomUUID(); // Generate a proper UUID

      const { data: newConversation, error: createError } = await supabase
        .from('texas_conversations')
        .insert({
          user_id: temporaryUserId,
          title: `Texas Acquisition Chat - ${new Date().toLocaleDateString()}`
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating conversation:', createError);
        toast({
          title: "Error",
          description: "Failed to initialize chat. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setConversationId(newConversation.id);

      const { data: existingMessages, error: messagesError } = await supabase
        .from('texas_chat_messages')
        .select('*')
        .eq('conversation_id', newConversation.id)
        .order('created_at', { ascending: true });

      if (messagesError) {
        console.error('Error loading messages:', messagesError);
      } else if (existingMessages) {
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

    const timestamp = new Date();
    const id = crypto.randomUUID();

    // Create the complete TexasMessage object
    const newMessage: TexasMessage = {
      id,
      role: message.role,
      content: message.content,
      timestamp,
      agencyType: message.agencyType,
      userRole: message.userRole
    };

    // Map to database schema
    const dbMessage = {
      id,
      content: message.content,
      role: message.role,
      user_id: crypto.randomUUID(), // Generate a new UUID for user_id
      conversation_id: conversationId,
      agency_type: message.agencyType,
      user_role: message.userRole,
      response_level: message.responseLevel,
      created_at: timestamp.toISOString()
    };

    const { error } = await supabase
      .from('texas_chat_messages')
      .insert(dbMessage);

    if (error) {
      console.error('Error saving message:', error);
      return false;
    }

    setMessages(prev => [...prev, newMessage]);
    return true;
  };

  return {
    messages,
    conversationId,
    addMessage
  };
};
