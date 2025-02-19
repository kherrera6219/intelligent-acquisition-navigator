
import { renderHook, act } from '@testing-library/react-hooks';
import { useTexasConversation } from '../useTexasConversation';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Mock dependencies
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn()
  }))
}));

jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: jest.fn()
    },
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

describe('useTexasConversation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes conversation when user is authenticated', async () => {
    const mockUser = { id: 'test-user-id' };
    const mockConversation = { id: 'test-conv-id' };
    
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({ data: { user: mockUser } });
    (supabase.from as jest.Mock)().single.mockResolvedValue({ data: mockConversation, error: null });
    (supabase.from as jest.Mock)().mockResolvedValue({ data: [], error: null });

    const { result, waitForNextUpdate } = renderHook(() => useTexasConversation());

    await waitForNextUpdate();

    expect(result.current.conversationId).toBe('test-conv-id');
    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('handles authentication error gracefully', async () => {
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({ data: { user: null } });
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });

    const { result, waitForNextUpdate } = renderHook(() => useTexasConversation());

    await waitForNextUpdate();

    expect(mockToast).toHaveBeenCalledWith({
      title: "Authentication Required",
      description: "Please sign in to use the chat feature.",
      variant: "destructive",
    });
    expect(result.current.isLoading).toBe(false);
  });

  it('adds new message successfully', async () => {
    const mockUser = { id: 'test-user-id' };
    const mockMessage = {
      role: 'user' as const,
      content: 'test message',
      agencyType: 'TEXAS_GOVERNMENT' as const,
      userRole: 'CONTRACTING_OFFICER' as const,
      responseLevel: 'STANDARD' as const
    };

    (supabase.auth.getUser as jest.Mock).mockResolvedValue({ data: { user: mockUser } });
    (supabase.from as jest.Mock)().single.mockResolvedValue({ 
      data: { 
        id: 'msg-id',
        created_at: new Date().toISOString(),
        ...mockMessage 
      }, 
      error: null 
    });

    const { result } = renderHook(() => useTexasConversation());
    
    // Set conversation ID manually since we're not testing initialization
    act(() => {
      (result.current as any).setConversationId('test-conv-id');
    });

    const success = await act(async () => {
      return await result.current.addMessage(mockMessage);
    });

    expect(success).toBe(true);
    expect(result.current.messages.length).toBe(1);
    expect(result.current.messages[0].content).toBe('test message');
  });
});
