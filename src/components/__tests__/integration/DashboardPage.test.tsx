
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardPage from '@/pages/DashboardPage';
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

describe('DashboardPage', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('renders the dashboard title', () => {
    renderWithProviders(<DashboardPage />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    renderWithProviders(<DashboardPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays key metrics', async () => {
    renderWithProviders(<DashboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/total proposals/i)).toBeInTheDocument();
      expect(screen.getByText(/active projects/i)).toBeInTheDocument();
      expect(screen.getByText(/pending reviews/i)).toBeInTheDocument();
    });
  });

  it('allows filtering of dashboard data', async () => {
    renderWithProviders(<DashboardPage />);
    
    const filterInput = screen.getByPlaceholderText(/filter/i);
    await userEvent.type(filterInput, 'test');
    
    expect(filterInput).toHaveValue('test');
  });

  it('displays charts and graphs', async () => {
    renderWithProviders(<DashboardPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('metrics-chart')).toBeInTheDocument();
      expect(screen.getByTestId('activity-chart')).toBeInTheDocument();
    });
  });

  it('allows date range selection', async () => {
    renderWithProviders(<DashboardPage />);
    
    const dateRangeButton = screen.getByRole('button', { name: /date range/i });
    await userEvent.click(dateRangeButton);
    
    expect(screen.getByText(/select date range/i)).toBeInTheDocument();
  });

  it('handles error states gracefully', async () => {
    // Mock a failed query
    queryClient.setQueryData(['dashboard'], () => {
      throw new Error('Failed to fetch');
    });

    renderWithProviders(<DashboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading dashboard data/i)).toBeInTheDocument();
    });
  });

  it('supports data refresh', async () => {
    renderWithProviders(<DashboardPage />);
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    await userEvent.click(refreshButton);
    
    await waitFor(() => {
      expect(screen.getByText(/data refreshed/i)).toBeInTheDocument();
    });
  });

  it('displays user notifications', async () => {
    renderWithProviders(<DashboardPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('notifications-panel')).toBeInTheDocument();
    });
  });
});
