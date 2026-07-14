import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProfessionalProfile from '../../pages/profile/ProfessionalProfile';
import { createOrUpdateProfile } from '../../services/auth';

vi.mock('../../services/auth', () => ({
  createOrUpdateProfile: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual as any,
    useNavigate: () => mockNavigate,
  };
});

let mockProfile: any = null;
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'user123' },
    profile: mockProfile,
    refreshProfile: vi.fn(),
  }),
}));

describe('ProfessionalProfile Component', () => {
  it('requires CREFONO to submit', async () => {
    mockProfile = null;
    render(<BrowserRouter><ProfessionalProfile /></BrowserRouter>);
    
    // Fill required fields except CREFONO
    fireEvent.change(screen.getByLabelText(/Nome Completo/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Nome Profissional/i), { target: { value: 'Dr. Test' } });
    fireEvent.change(screen.getByLabelText(/CPF/i), { target: { value: '11122233344' } });
    fireEvent.change(screen.getByLabelText(/UF do Conselho/i), { target: { value: 'SP' } });
    fireEvent.change(screen.getByLabelText(/Telefone/i), { target: { value: '11999999999' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Salvar Perfil/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Número do CREFONO é obrigatório')).toBeInTheDocument();
      expect(createOrUpdateProfile).not.toHaveBeenCalled();
    });
  });

  it('submits successfully with all fields', async () => {
    mockProfile = null;
    vi.mocked(createOrUpdateProfile).mockResolvedValueOnce(undefined);
    
    render(<BrowserRouter><ProfessionalProfile /></BrowserRouter>);
    
    fireEvent.change(screen.getByLabelText(/Nome Completo/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Nome Profissional/i), { target: { value: 'Dr. Test' } });
    fireEvent.change(screen.getByLabelText(/CPF/i), { target: { value: '11122233344' } });
    fireEvent.change(screen.getByLabelText(/Número do CREFONO/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/UF do Conselho/i), { target: { value: 'SP' } });
    fireEvent.change(screen.getByLabelText(/Telefone/i), { target: { value: '11999999999' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Salvar Perfil/i }));
    
    await waitFor(() => {
      expect(createOrUpdateProfile).toHaveBeenCalledWith('user123', expect.objectContaining({
        crefonoNumber: '12345'
      }));
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });
  });
});
