
import { supabase } from "@/integrations/supabase/client";
import { TexasMessage, TexasAgencyType, TexasRole, ResponseLevel, ValidationResult } from "@/types/texas-chat";

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
  },

  getValidations: async (messageIds: string[]): Promise<ValidationResult[]> => {
    const { data, error } = await supabase
      .from('texas_response_validations')
      .select('*')
      .in('message_id', messageIds);

    if (error) throw error;
    return data || [];
  },

  validateResponse: async (messageId: string, params: {
    content: string;
    agencyType: TexasAgencyType;
    userRole: TexasRole;
  }): Promise<ValidationResult> => {
    // First, analyze the response using the compliance validation edge function
    const { data: validationResults, error: validationError } = await supabase.functions.invoke<{
      status: ValidationResult['status'];
      confidence: number;
      data: any;
      notes: string;
    }>(
      'validate-texas-response',
      {
        body: {
          messageId,
          content: params.content,
          agencyType: params.agencyType,
          userRole: params.userRole
        }
      }
    );

    if (validationError) throw validationError;

    // Store validation results
    const { data, error } = await supabase
      .from('texas_response_validations')
      .insert({
        message_id: messageId,
        status: validationResults.status,
        confidence_score: validationResults.confidence,
        validation_data: validationResults.data,
        validation_notes: validationResults.notes
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
