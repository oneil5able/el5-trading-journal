import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SymbolPicker from '@/components/SymbolPicker'; // ✅ use alias for Vite

test('renders symbol list and allows selection', () => {
  render(<SymbolPicker market="spot" onSelect={() => {}} />);
  
  // Get the search input
  const input = screen.getByPlaceholderText(/Search symbol/i);
  expect(input).toBeInTheDocument();

  // Type 'BTC' in the search input
  fireEvent.change(input, { target: { value: 'BTC' } });

  // After searching, BTCUSDT option should be visible
  const option = screen.getByText(/BTCUSDT/i);
  expect(option).toBeInTheDocument();
});
