
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
    onResponseLevelChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the chat title and description', () => {
    render(<TexasChatContainer {...defaultProps} />);
    
    expect(screen.getByText(/Texas Acquisition Chat Assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/Get expert guidance/i)).toBeInTheDocument();
  });

  it('renders selectors with correct initial values', () => {
    render(<TexasChatContainer {...defaultProps} />);
    
    expect(screen.getByText('TEXAS_GOVERNMENT')).toBeInTheDocument();
    expect(screen.getByText('CONTRACTING_OFFICER')).toBeInTheDocument();
    expect(screen.getByText('STANDARD')).toBeInTheDocument();
  });

  it('handles agency change', async () => {
    render(<TexasChatContainer {...defaultProps} />);
    
    const agencySelect = screen.getByRole('combobox', { name: /agency/i });
    await userEvent.click(agencySelect);
    await userEvent.click(screen.getByText('STATE_AGENCY'));
    
    expect(defaultProps.onAgencyChange).toHaveBeenCalledWith('STATE_AGENCY');
  });

  it('handles role change', async () => {
    render(<TexasChatContainer {...defaultProps} />);
    
    const roleSelect = screen.getByRole('combobox', { name: /role/i });
    await userEvent.click(roleSelect);
    await userEvent.click(screen.getByText('PROGRAM_MANAGER'));
    
    expect(defaultProps.onRoleChange).toHaveBeenCalledWith('PROGRAM_MANAGER');
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
});
