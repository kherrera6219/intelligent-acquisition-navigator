
import { texasChatMiddleware } from '../texasChat';
import { supabase } from "@/integrations/supabase/client";

jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn(),
      eq: jest.fn().mockReturnThis(),
      in: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis()
    })),
    functions: {
      invoke: jest.fn()
    }
  }
}));

describe('texasChatMiddleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createConversation', () => {
    it('creates a new conversation successfully', async () => {
      const mockConversation = {
        id: 'test-id',
        user_id: 'user-id',
        title: 'Test Conversation'
      };

      (supabase.from as jest.Mock)().single.mockResolvedValue({ data: mockConversation, error: null });

      const result = await texasChatMiddleware.createConversation('user-id', 'Test Conversation');

      expect(result).toEqual(mockConversation);
      expect(supabase.from).toHaveBeenCalledWith('texas_conversations');
    });

    it('throws error when creation fails', async () => {
      const mockError = new Error('Creation failed');
      (supabase.from as jest.Mock)().single.mockResolvedValue({ data: null, error: mockError });

      await expect(texasChatMiddleware.createConversation('user-id', 'Test')).rejects.toThrow();
    });
  });

  describe('getMessages', () => {
    it('retrieves messages for a conversation', async () => {
      const mockMessages = [
        { id: 'msg-1', content: 'Hello' },
        { id: 'msg-2', content: 'World' }
      ];

      (supabase.from as jest.Mock)().mockResolvedValue({ data: mockMessages, error: null });

      const result = await texasChatMiddleware.getMessages('conv-id');

      expect(result).toEqual(mockMessages);
      expect(supabase.from).toHaveBeenCalledWith('texas_chat_messages');
    });
  });

  describe('validateResponse', () => {
    it('validates message response successfully', async () => {
      const mockValidation = {
        status: 'valid',
        confidence_score: 0.95,
        validation_notes: null
      };

      (supabase.functions.invoke as jest.Mock).mockResolvedValue({ data: mockValidation, error: null });

      const result = await texasChatMiddleware.validateResponse('msg-id', {
        content: 'test',
        agencyType: 'TEXAS_GOVERNMENT',
        userRole: 'CONTRACTING_OFFICER'
      });

      expect(result).toEqual(mockValidation);
      expect(supabase.functions.invoke).toHaveBeenCalledWith('validate-texas-response', expect.any(Object));
    });
  });
});
