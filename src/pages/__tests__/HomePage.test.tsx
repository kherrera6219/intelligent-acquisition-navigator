
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
    // Mock localStorage with all required Storage interface properties
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
      length: 0,
      key: jest.fn(),
      removeItem: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    });
    
    // Mock IntersectionObserver with all required properties
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];
      
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
      
      disconnect(): void {}
      observe(): void {}
      unobserve(): void {}
      takeRecords(): IntersectionObserverEntry[] { return []; }
    }
    
    Object.defineProperty(window, 'IntersectionObserver', {
      value: MockIntersectionObserver,
      writable: true
    });
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

  it('opens contact page when help button is clicked', () => {
    const windowSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    renderWithRouter(<HomePage />);
    
    const helpButton = screen.getByRole('button', { name: /get help/i });
    fireEvent.click(helpButton);
    
    expect(windowSpy).toHaveBeenCalledWith('/contact', '_blank');
    windowSpy.mockRestore();
  });
});
