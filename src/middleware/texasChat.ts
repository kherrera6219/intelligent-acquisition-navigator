
import { Request, Response, NextFunction } from 'express';
import { rateLimiter } from './rateLimit';
import { csrfProtection, securityHeaders, sessionManagement } from './security';
import { TexasMessage, TexasAgencyType, TexasRole, ResponseLevel, ValidationResult } from "@/types/texas-chat";
import { supabase } from "@/integrations/supabase/client";

/**
 * Middleware handlers for Texas Chat functionality
 * Includes rate limiting, security headers, session management, and CSRF protection
 */
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

/**
 * Creates a new conversation for Texas Chat
 * @param userId - The ID of the user creating the conversation
 * @param title - The title of the conversation
 * @returns The created conversation object
 * @throws Error if conversation creation fails
 */
const createConversation = async (userId: string, title: string) => {
  const { data, error } = await supabase
    .from('texas_conversations')
    .insert({
      user_id: userId,
      title: title
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Retrieves messages for a specific conversation
 * @param conversationId - The ID of the conversation to fetch messages for
 * @returns Array of messages in the conversation
 * @throws Error if message retrieval fails
 */
const getMessages = async (conversationId: string) => {
  const { data, error } = await supabase
    .from('texas_chat_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

/**
 * Retrieves validation results for specified messages
 * @param messageIds - Array of message IDs to fetch validations for
 * @returns Array of validation results
 * @throws Error if validation retrieval fails
 */
const getValidations = async (messageIds: string[]) => {
  const { data, error } = await supabase
    .from('texas_response_validations')
    .select('*')
    .in('message_id', messageIds);

  if (error) throw error;
  return data;
};

/**
 * Sends a new message in a conversation
 * @param params - Object containing message details
 * @returns The created message object
 * @throws Error if message creation fails
 */
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
};

/**
 * Validates a response message using edge function
 * @param messageId - ID of the message to validate
 * @param params - Validation parameters
 * @returns Validation result
 * @throws Error if validation fails
 */
const validateResponse = async (messageId: string, params: {
  content: string;
  agencyType: TexasAgencyType;
  userRole: TexasRole;
}) => {
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

/**
 * Export middleware handlers and API functions
 * @type {Object} texasChatMiddleware
 */
export const texasChatMiddleware = {
  ...middlewareHandlers,
  createConversation,
  getMessages,
  getValidations,
  sendMessage,
  validateResponse
};
