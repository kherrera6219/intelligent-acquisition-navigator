
import { Request, Response, NextFunction } from 'express';
import { rateLimiter } from './rateLimit';
import { csrfProtection, securityHeaders, sessionManagement } from './security';
import { TexasMessage, TexasAgencyType, TexasRole, ResponseLevel, ValidationResult } from "@/types/texas-chat";
import { supabase } from "@/integrations/supabase/client";

// Middleware handlers
const middlewareHandlers = [
  rateLimiter,
  securityHeaders,
  sessionManagement,
  csrfProtection,
  // Error handling specific to Texas Chat
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Texas Chat Error:', err);
    res.status(500).json({ error: 'Texas Chat service error' });
  }
];

// API functions
const createConversation = async (userId: string, title: string) => {
  const { data, error } = await supabase
    .from('conversations')
    .insert({
      user_id: userId,
      title: title
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

const getMessages = async (conversationId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

const getValidations = async (messageIds: string[]) => {
  const { data, error } = await supabase
    .from('validations')
    .select('*')
    .in('message_id', messageIds);

  if (error) throw error;
  return data;
};

const sendMessage = async (params: {
  conversationId: string;
  userId: string;
  content: string;
  role: "user" | "assistant";
  agencyType: TexasAgencyType;
  userRole: TexasRole;
  responseLevel: ResponseLevel;
}) => {
  const { data, error } = await supabase
    .from('messages')
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
};

const validateResponse = async (messageId: string, params: {
  content: string;
  agencyType: TexasAgencyType;
  userRole: TexasRole;
}) => {
  // Call validation function from edge function
  const { data, error } = await supabase.functions.invoke('validate-texas-response', {
    body: {
      messageId,
      content: params.content,
      agencyType: params.agencyType,
      userRole: params.userRole
    }
  });

  if (error) throw error;
  return data as ValidationResult;
};

// Export both middleware handlers and API functions
export const texasChatMiddleware = {
  ...middlewareHandlers,
  createConversation,
  getMessages,
  getValidations,
  sendMessage,
  validateResponse
};
