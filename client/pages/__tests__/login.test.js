import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/login';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('shows error on invalid login', async () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } });
  fireEvent.click(screen.getByText(/Login/i));
  expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
});