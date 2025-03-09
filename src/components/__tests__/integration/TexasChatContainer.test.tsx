
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TexasChatContainer } from '../../texas/TexasChatContainer';
import { TexasAgencyType, TexasRole, ResponseLevel, TexasMessage } from '@/types/texas-chat';
import '@testing-library/jest-dom';

describe('TexasChatContainer', () => {
  const defaultProps = {
    conversationId: 'test-conv',
    messages: [],
    isLoading: false,
    input: '',
    selectedAgency: 'TEXAS_GOVERNMENT' as TexasAgencyType,
    selectedRole: 'CONTRACTING_OFFICER' as TexasRole,
    selectedResponseLevel: 'STANDARD' as ResponseLevel,
    onInputChange: jest.fn(),
    onSubmit: jest.fn(),
    onAgencyChange: jest.fn(),
    onRoleChange: jest.fn(),
    onResponseLevelChange: jest.fn(),
    error: undefined
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the chat title and description', () => {
    render(<TexasChatContainer {...defaultProps} />);
    
    expect(screen.getByText(/Texas Acquisition Chat Assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/Get expert guidance/i)).toBeInTheDocument();
  });

  it('renders settings button', () => {
    render(<TexasChatContainer {...defaultProps} />);
    
    expect(screen.getByTitle('Chat Settings')).toBeInTheDocument();
  });

  it('disables input when loading', () => {
    render(<TexasChatContainer {...defaultProps} isLoading={true} />);
    
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('shows messages in chat area', () => {
    const messages: TexasMessage[] = [
      { 
        id: '1', 
        content: 'Test question', 
        role: 'user',
        timestamp: new Date(),
        agencyType: 'TEXAS_GOVERNMENT',
        userRole: 'CONTRACTING_OFFICER'
      },
      { 
        id: '2', 
        content: 'Test response', 
        role: 'assistant',
        timestamp: new Date(),
        agencyType: 'TEXAS_GOVERNMENT',
        userRole: 'CONTRACTING_OFFICER'
      }
    ];
    
    render(<TexasChatContainer {...defaultProps} messages={messages} />);
    
    expect(screen.getByText('Test question')).toBeInTheDocument();
    expect(screen.getByText('Test response')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(<TexasChatContainer {...defaultProps} error="Test error message" />);
    
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders file upload button', () => {
    render(<TexasChatContainer {...defaultProps} />);
    
    // The upload button now has a title instead of text content
    expect(screen.getByTitle('Upload Document')).toBeInTheDocument();
  });

  it('renders chat history section', () => {
    render(<TexasChatContainer {...defaultProps} />);
    
    expect(screen.getByText('Chat History')).toBeInTheDocument();
  });

  it('renders voice control button', () => {
    render(<TexasChatContainer {...defaultProps} />);
    
    expect(screen.getByText('Start Voice')).toBeInTheDocument();
  });

  it('toggles voice control button state when clicked', async () => {
    render(<TexasChatContainer {...defaultProps} />);
    
    const voiceButton = screen.getByText('Start Voice');
    await userEvent.click(voiceButton);
    
    expect(screen.getByText('Stop Voice')).toBeInTheDocument();
  });

  it('toggles chat history visibility when clicked', async () => {
    render(<TexasChatContainer {...defaultProps} />);
    
    const historyToggleButton = screen.getByText('Hide History');
    await userEvent.click(historyToggleButton);
    
    expect(screen.getByText('Show History')).toBeInTheDocument();
    expect(screen.queryByText('Chat History')).not.toBeInTheDocument();
  });
});
