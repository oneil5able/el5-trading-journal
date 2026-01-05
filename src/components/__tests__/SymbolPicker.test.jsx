import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SymbolPicker from '../../components/SymbolPicker'

test('renders symbol list and allows selection', () => {
  render(<SymbolPicker market="spot" onSelect={() => {}} />)
  const input = screen.getByPlaceholderText(/Search symbol/i)
  expect(input).toBeInTheDocument()
  fireEvent.change(input, { target: { value: 'BTC' } })
  // After searching, a symbol option should be visible
  const option = screen.getByText(/BTCUSDT/i)
  expect(option).toBeInTheDocument()
})
