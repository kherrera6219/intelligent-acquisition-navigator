
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';
import '@testing-library/jest-dom';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    global.localStorage = localStorageMock;
    
    // Mock IntersectionObserver
    global.IntersectionObserver = class IntersectionObserver {
      constructor() {}
      observe() { return null; }
      disconnect() { return null; }
      unobserve() { return null; }
    };
  });

  it('renders loading spinner initially', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows privacy notice on first visit', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    renderWithRouter(<HomePage />);
    
    waitFor(() => {
      expect(screen.getByText(/privacy/i)).toBeInTheDocument();
    });
  });

  it('hides privacy notice when closed', async () => {
    renderWithRouter(<HomePage />);
    
    const closeButton = await screen.findByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(screen.queryByText(/privacy/i)).not.toBeInTheDocument();
  });

  it('shows back to top button when scrolled', async () => {
    renderWithRouter(<HomePage />);
    
    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 500 } });
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /scroll back to top/i })).toBeInTheDocument();
    });
  });

  it('shows help button', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByRole('button', { name: /get help/i })).toBeInTheDocument();
  });

  it('shows keyboard shortcut guide on first visit', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    renderWithRouter(<HomePage />);
    
    waitFor(() => {
      expect(screen.getByText(/press '?' for keyboard shortcuts/i)).toBeInTheDocument();
    });
  });

  it('opens contact page when help button is clicked', () => {
    const windowSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    renderWithRouter(<HomePage />);
    
    const helpButton = screen.getByRole('button', { name: /get help/i });
    fireEvent.click(helpButton);
    
    expect(windowSpy).toHaveBeenCalledWith('/contact', '_blank');
    windowSpy.mockRestore();
  });
});
