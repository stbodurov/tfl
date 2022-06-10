import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main screen', () => {
  render(<App />);
  const headerTitle = screen.getByText(/TfL Discovery/i);
  expect(headerTitle).toBeInTheDocument();
});
