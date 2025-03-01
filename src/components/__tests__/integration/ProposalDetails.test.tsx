
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
  submissionDate: new Date().toISOString(),
  budget: 10000,
  timeframe: 3,
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
    renderWithProviders(<ProposalDetails proposal={mockProposal} handleBack={() => {}} />);
    
    expect(screen.getByText(mockProposal.title)).toBeInTheDocument();
    expect(screen.getByText(mockProposal.description)).toBeInTheDocument();
  });

  it('shows evaluation section', () => {
    renderWithProviders(<ProposalDetails proposal={mockProposal} handleBack={() => {}} />);
    expect(screen.getByText(/evaluations/i)).toBeInTheDocument();
  });

  it('allows adding new evaluation', async () => {
    renderWithProviders(<ProposalDetails proposal={mockProposal} handleBack={() => {}} />);
    
    const addButton = screen.getByRole('button', { name: /add evaluation/i });
    await userEvent.click(addButton);
    
    expect(screen.getByText(/add your evaluation/i)).toBeInTheDocument();
  });

  it('shows attachments list', () => {
    const proposalWithAttachments = {
      ...mockProposal,
      attachments: [
        { id: '1', name: 'test.pdf', url: 'test.pdf', type: 'application/pdf' }
      ]
    };
    
    renderWithProviders(<ProposalDetails proposal={proposalWithAttachments} handleBack={() => {}} />);
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
  });
});
