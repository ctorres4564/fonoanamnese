import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/auth/Login';
import { loginUser } from '../../services/auth';

// Mock the authentication service
vi.mock('../../services/auth', () => ({
  loginUser: vi.fn(),
}));

// Mock react-router-dom hooks
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual as any,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: { from: { pathname: '/dashboard' } } }),
  };
});

describe('Login Component', () => {
  it('renders login form', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    expect(screen.getByText('Acesse sua conta para continuar')).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
  });

  it('shows error on invalid credentials', async () => {
    vi.mocked(loginUser).mockRejectedValueOnce({ code: 'auth/wrong-password' });
    
    render(<BrowserRouter><Login /></BrowserRouter>);
    
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    
    await waitFor(() => {
      expect(screen.getByText('E-mail ou senha incorretos.')).toBeInTheDocument();
    });
  });

  it('navigates to dashboard on successful login', async () => {
    vi.mocked(loginUser).mockResolvedValueOnce({} as any);
    
    render(<BrowserRouter><Login /></BrowserRouter>);
    
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });
});
