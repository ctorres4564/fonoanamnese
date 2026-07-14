import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PatientForm } from '../../pages/patients/PatientForm';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

vi.mock('../../services/patientService', () => ({
  createPatient: vi.fn(),
}));

describe('PatientForm', () => {
  const mockUser = {
    id: 'user123',
    email: 'test@test.com',
    displayName: 'Test User'
  };

  const renderWithProviders = () => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: mockUser as any, profile: null, loading: false, refreshProfile: async () => {} }}>
          <PatientForm />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders the form fields correctly', () => {
    renderWithProviders();
    expect(screen.getByText('Cadastrar Novo Paciente')).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de Nascimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número do Prontuário/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty', async () => {
    renderWithProviders();
    const submitBtn = screen.getByText('Salvar Paciente');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('O nome completo é obrigatório e deve ter no mínimo 3 caracteres')).toBeInTheDocument();
    });
  });
});
