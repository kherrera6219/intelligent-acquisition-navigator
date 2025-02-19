
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CodeConversion } from '../../CodeConversion';

// Mock useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

describe('CodeConversion Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('converts code and displays result', async () => {
    render(<CodeConversion isOpen={true} onClose={() => {}} />);
    
    const codeInput = screen.getByRole('textbox');
    const convertButton = screen.getByRole('button', { name: /convert/i });

    fireEvent.change(codeInput, {
      target: { value: 'def example(): pass' }
    });
    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(screen.getByText(/function example\(\)/)).toBeInTheDocument();
    });
  });

  it('handles invalid code input', async () => {
    render(<CodeConversion isOpen={true} onClose={() => {}} />);
    
    const codeInput = screen.getByRole('textbox');
    const convertButton = screen.getByRole('button', { name: /convert/i });

    fireEvent.change(codeInput, {
      target: { value: 'invalid python code @#$' }
    });
    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid syntax/i)).toBeInTheDocument();
    });
  });
});
