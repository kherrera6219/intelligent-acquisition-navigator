
import { Request, Response, NextFunction } from 'express';
import { texasChatMiddleware } from '../texasChat';

describe('Texas Chat Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  describe('createConversation', () => {
    it('creates a new conversation successfully', async () => {
      const userId = 'test-user';
      const title = 'Test Conversation';
      
      const result = await texasChatMiddleware.createConversation(userId, title);
      
      expect(result).toBeDefined();
      expect(result.user_id).toBe(userId);
      expect(result.title).toBe(title);
    });

    it('throws error for invalid data', async () => {
      const userId = '';
      const title = '';
      
      await expect(
        texasChatMiddleware.createConversation(userId, title)
      ).rejects.toThrow();
    });
  });

  describe('getMessages', () => {
    it('retrieves messages for a conversation', async () => {
      const conversationId = 'test-conv';
      
      const messages = await texasChatMiddleware.getMessages(conversationId);
      
      expect(Array.isArray(messages)).toBe(true);
    });
  });

  describe('validateResponse', () => {
    it('validates message content successfully', async () => {
      const messageId = 'test-msg';
      const params = {
        content: 'Test content',
        agencyType: 'federal',
        userRole: 'admin'
      };
      
      const result = await texasChatMiddleware.validateResponse(messageId, params);
      
      expect(result).toBeDefined();
      expect(result.isValid).toBe(true);
    });
  });
});
