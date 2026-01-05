import React from 'react'
import { render, screen } from '@testing-library/react'
import PositionCalculator from '../../components/calculator/PositionCalculator'

test('renders PositionCalculator and shows default text', () => {
  render(<PositionCalculator />)
  const title = screen.getByText(/Position Size Calculator/i)
  expect(title).toBeInTheDocument()
})
