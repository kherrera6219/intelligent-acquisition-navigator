
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProposalsPage } from '@/pages/ProposalsPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('ProposalsPage', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('renders the proposals page title', () => {
    renderWithProviders(<ProposalsPage />);
    expect(screen.getByText(/Proposals Management/i)).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    renderWithProviders(<ProposalsPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message when fetch fails', async () => {
    // Mock a failed query
    queryClient.setQueryData(['proposals'], () => {
      throw new Error('Failed to fetch');
    });

    renderWithProviders(<ProposalsPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Error loading proposals/i)).toBeInTheDocument();
    });
  });

  it('allows filtering of proposals', async () => {
    renderWithProviders(<ProposalsPage />);
    
    const filterInput = screen.getByPlaceholderText(/search proposals/i);
    await userEvent.type(filterInput, 'test');
    
    expect(filterInput).toHaveValue('test');
  });

  it('allows sorting of proposals', async () => {
    renderWithProviders(<ProposalsPage />);
    
    const sortButton = screen.getByRole('button', { name: /sort/i });
    await userEvent.click(sortButton);
    
    expect(screen.getByText(/sort by date/i)).toBeInTheDocument();
  });

  it('shows proposal details when clicked', async () => {
    renderWithProviders(<ProposalsPage />);
    
    const proposalTitle = screen.getByText(/Proposal 1/i);
    await userEvent.click(proposalTitle);
    
    expect(screen.getByText(/proposal details/i)).toBeInTheDocument();
  });

  it('supports pagination of proposals', async () => {
    renderWithProviders(<ProposalsPage />);
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    await userEvent.click(nextButton);
    
    expect(screen.getByText(/page 2/i)).toBeInTheDocument();
  });
});
