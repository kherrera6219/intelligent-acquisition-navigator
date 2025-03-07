
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import DashboardPage from '@/pages/DashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { ToastProvider } from '@/components/ui/toaster';

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
      <BrowserRouter>
        <ToastProvider>{ui}</ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('DashboardPage', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('renders the dashboard title', async () => {
    renderWithProviders(<DashboardPage />);
    expect(screen.getByText(/Procurement Dashboard/i)).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    renderWithProviders(<DashboardPage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays dashboard cards after loading', async () => {
    renderWithProviders(<DashboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Proposals/i)).toBeInTheDocument();
      expect(screen.getByText(/Analytics/i)).toBeInTheDocument();
      expect(screen.getByText(/Document Control/i)).toBeInTheDocument();
      expect(screen.getByText(/Knowledge Base/i)).toBeInTheDocument();
    });
  });

  it('allows refreshing dashboard data', async () => {
    const user = userEvent.setup();
    renderWithProviders(<DashboardPage />);
    
    // Wait for initial load to complete
    await waitFor(() => {
      expect(screen.getByText(/Refresh/i)).toBeInTheDocument();
    });

    // Click refresh button
    const refreshButton = screen.getByText(/Refresh/i);
    await user.click(refreshButton);
    
    // Should show loading state again
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    // Should show refreshed data
    await waitFor(() => {
      expect(screen.getByText(/Proposals/i)).toBeInTheDocument();
    });
  });

  it('displays error message when data fetching fails', async () => {
    // Mock console.error to prevent test output noise
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Override fetch implementation to simulate error
    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));
    
    renderWithProviders(<DashboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Error loading dashboard data/i)).toBeInTheDocument();
    });
    
    // Restore console.error
    jest.restoreAllMocks();
  });

  it('displays notifications panel', async () => {
    renderWithProviders(<DashboardPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('notifications-panel')).toBeInTheDocument();
      expect(screen.getByText(/System Maintenance/i)).toBeInTheDocument();
      expect(screen.getByText(/New Features Available/i)).toBeInTheDocument();
    });
  });

  it('displays recent activity section', async () => {
    renderWithProviders(<DashboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Recent Activity/i)).toBeInTheDocument();
      expect(screen.getByText(/View All Activity/i)).toBeInTheDocument();
    });
  });
});
