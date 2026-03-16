import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage branding text', () => {
  render(<App />);
  const headingElement = screen.getByText(/play more sports/i);
  expect(headingElement).toBeInTheDocument();
});
