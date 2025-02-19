
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatMessages } from '../../chat/ChatMessages';
import { ChatInput } from '../../chat/ChatInput';
import { Message } from '@/types/chat';
import '@testing-library/jest-dom';

describe('Chat Components Integration', () => {
  const mockMessages: Message[] = [
    { 
      id: '1', 
      content: 'Test message 1', 
      role: 'user',
      timestamp: new Date()
    },
    { 
      id: '2', 
      content: 'Test response 1', 
      role: 'assistant',
      timestamp: new Date()
    }
  ];

  describe('ChatMessages', () => {
    it('renders messages correctly', () => {
      render(<ChatMessages messages={mockMessages} isLoading={false} />);
      
      expect(screen.getByText('Test message 1')).toBeInTheDocument();
      expect(screen.getByText('Test response 1')).toBeInTheDocument();
    });

    it('shows loading state', () => {
      render(<ChatMessages messages={mockMessages} isLoading={true} />);
      
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('ChatInput', () => {
    const mockOnInputChange = jest.fn();
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('updates input value on change', async () => {
      render(
        <ChatInput 
          input=""
          isLoading={false}
          onInputChange={mockOnInputChange}
          onSubmit={mockOnSubmit}
        />
      );

      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'Hello');

      expect(mockOnInputChange).toHaveBeenCalledWith('Hello');
    });

    it('disables input when loading', () => {
      render(
        <ChatInput 
          input=""
          isLoading={true}
          onInputChange={mockOnInputChange}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('submits message on form submit', async () => {
      render(
        <ChatInput 
          input="Test message"
          isLoading={false}
          onInputChange={mockOnInputChange}
          onSubmit={mockOnSubmit}
        />
      );

      const form = screen.getByRole('form');
      await userEvent.click(screen.getByRole('button', { name: /send/i }));

      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
