import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ForgotPassword from '../../pages/auth/ForgotPassword';
import { resetPassword } from '../../services/auth';

vi.mock('../../services/auth', () => ({
  resetPassword: vi.fn(),
}));

describe('ForgotPassword Component', () => {
  it('shows success message on successful reset', async () => {
    vi.mocked(resetPassword).mockResolvedValueOnce(undefined);
    
    render(<BrowserRouter><ForgotPassword /></BrowserRouter>);
    
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'test@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Enviar e-mail/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Instruções de recuperação enviadas para seu e-mail.')).toBeInTheDocument();
    });
  });

  it('shows error on user not found', async () => {
    vi.mocked(resetPassword).mockRejectedValueOnce({ code: 'auth/user-not-found' });
    
    render(<BrowserRouter><ForgotPassword /></BrowserRouter>);
    
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'test@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Enviar e-mail/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Usuário não encontrado.')).toBeInTheDocument();
    });
  });
});
