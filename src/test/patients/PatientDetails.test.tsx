import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { PatientDetails } from '../../pages/patients/PatientDetails';
import { AuthContext } from '../../contexts/AuthContext';
import * as patientService from '../../services/patientService';
import * as guardianService from '../../services/guardianService';

vi.mock('../../services/patientService', () => ({
  getPatientById: vi.fn(),
}));

vi.mock('../../services/guardianService', () => ({
  listGuardiansByPatient: vi.fn(),
}));

describe('PatientDetails', () => {
  const mockUser = { id: 'pro123', email: 'pro@test.com', displayName: 'Dr. Test' };

  const renderWithProviders = (initialRoute = '/patients/pat1') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <AuthContext.Provider value={{ user: mockUser as any, profile: null, loading: false, refreshProfile: async () => {} }}>
          <Routes>
            {/* The component uses useParams for :id */}
            <Route path="/patients/:id" element={<PatientDetails />} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  it('shows error if patient belongs to another professional', async () => {
    (patientService.getPatientById as any).mockResolvedValue({
      id: 'pat1',
      professionalId: 'otherPro', // Different from pro123
      fullName: 'Outro Paciente',
    });

    renderWithProviders('/patients/pat1');

    await waitFor(() => {
      expect(screen.getByText('Você não tem permissão para acessar este paciente.')).toBeInTheDocument();
    });
  });

  it('renders patient details and calculates age correctly', async () => {
    // Mock today to 2024-07-13 so age is deterministic
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2024-07-13T12:00:00Z'));

    (patientService.getPatientById as any).mockResolvedValue({
      id: 'pat1',
      professionalId: 'pro123',
      fullName: 'João Silva',
      recordNumber: '101',
      birthDate: '2000-01-01',
      status: 'evaluation',
    });
    
    (guardianService.listGuardiansByPatient as any).mockResolvedValue([
      {
        id: 'g1',
        fullName: 'José Silva',
        relationship: 'Pai',
        phone: '123',
        isPrimaryContact: true,
      }
    ]);

    renderWithProviders('/patients/pat1');

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
    });

    // Verify age (2000 to 2024 is 24 years)
    expect(screen.getByText(/24 anos/)).toBeInTheDocument();
    
    // Verify guardian
    expect(screen.getByText('José Silva')).toBeInTheDocument();
    expect(screen.getByText('Principal')).toBeInTheDocument(); // Tag for primary contact

    vi.useRealTimers();
  });
});
