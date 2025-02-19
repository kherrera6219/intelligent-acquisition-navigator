
import { supabase } from "@/integrations/supabase/client";
import { TexasMessage, TexasAgencyType, TexasRole, ResponseLevel } from "@/types/texas-chat";

export const texasChatMiddleware = {
  createConversation: async (userId: string, title: string) => {
    const { data, error } = await supabase
      .from('texas_conversations')
      .insert({
        user_id: userId,
        title
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getMessages: async (conversationId: string) => {
    const { data, error } = await supabase
      .from('texas_chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  sendMessage: async (params: {
    conversationId: string;
    userId: string;
    content: string;
    role: "user" | "assistant";
    agencyType: TexasAgencyType;
    userRole: TexasRole;
    responseLevel: ResponseLevel;
  }) => {
    const { data, error } = await supabase
      .from('texas_chat_messages')
      .insert({
        conversation_id: params.conversationId,
        user_id: params.userId,
        content: params.content,
        role: params.role,
        agency_type: params.agencyType,
        user_role: params.userRole,
        response_level: params.responseLevel
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
