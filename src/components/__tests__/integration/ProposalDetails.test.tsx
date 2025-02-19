
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProposalDetails } from '@/components/proposals/ProposalDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Proposal } from '@/types/proposals';
import '@testing-library/jest-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockProposal: Proposal = {
  id: '1',
  title: 'Test Proposal',
  description: 'Test Description',
  status: 'PENDING',
  submittedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  attachments: [],
  evaluations: []
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('ProposalDetails', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('renders proposal details correctly', () => {
    renderWithProviders(<ProposalDetails proposal={mockProposal} />);
    
    expect(screen.getByText(mockProposal.title)).toBeInTheDocument();
    expect(screen.getByText(mockProposal.description)).toBeInTheDocument();
    expect(screen.getByText(mockProposal.status)).toBeInTheDocument();
  });

  it('shows evaluation section', () => {
    renderWithProviders(<ProposalDetails proposal={mockProposal} />);
    expect(screen.getByText(/evaluations/i)).toBeInTheDocument();
  });

  it('allows adding new evaluation', async () => {
    renderWithProviders(<ProposalDetails proposal={mockProposal} />);
    
    const addButton = screen.getByRole('button', { name: /add evaluation/i });
    await userEvent.click(addButton);
    
    expect(screen.getByText(/new evaluation/i)).toBeInTheDocument();
  });

  it('shows attachments list', () => {
    const proposalWithAttachments = {
      ...mockProposal,
      attachments: [
        { id: '1', name: 'test.pdf', url: 'test.pdf', type: 'application/pdf' }
      ]
    };
    
    renderWithProviders(<ProposalDetails proposal={proposalWithAttachments} />);
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
  });

  it('allows downloading attachments', async () => {
    const proposalWithAttachments = {
      ...mockProposal,
      attachments: [
        { id: '1', name: 'test.pdf', url: 'test.pdf', type: 'application/pdf' }
      ]
    };
    
    renderWithProviders(<ProposalDetails proposal={proposalWithAttachments} />);
    
    const downloadButton = screen.getByRole('button', { name: /download/i });
    await userEvent.click(downloadButton);
    
    // Verify download initiated
    expect(screen.getByText(/downloading/i)).toBeInTheDocument();
  });

  it('shows loading state while updating', () => {
    renderWithProviders(<ProposalDetails proposal={mockProposal} isLoading={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message when update fails', async () => {
    renderWithProviders(
      <ProposalDetails 
        proposal={mockProposal} 
        error="Failed to update proposal" 
      />
    );
    
    expect(screen.getByText(/failed to update proposal/i)).toBeInTheDocument();
  });
});
