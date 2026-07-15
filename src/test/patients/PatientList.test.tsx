import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { PatientList } from '../../pages/patients/PatientList'
import { AuthContext } from '../../contexts/AuthContext'
import * as patientService from '../../services/patientService'

vi.mock('../../services/patientService', () => ({
  listPatientsByProfessional: vi.fn(),
  listArchivedPatientsByProfessional: vi.fn(),
  updatePatientStatus: vi.fn(),
}))

describe('PatientList', () => {
  const mockUser = { id: 'pro123', email: 'pro@test.com', displayName: 'Dr. Test' }

  const renderWithProviders = () => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            user: mockUser as any,
            profile: null,
            loading: false,
            refreshProfile: async () => {},
          }}
        >
          <PatientList />
        </AuthContext.Provider>
      </BrowserRouter>,
    )
  }

  it('renders loading state initially', () => {
    ;(patientService.listPatientsByProfessional as any).mockImplementation(
      () => new Promise(() => {}),
    ) // Never resolves
    ;(patientService.listArchivedPatientsByProfessional as any).mockImplementation(
      () => new Promise(() => {}),
    ) // Never resolves
    renderWithProviders()
    expect(screen.getByText('Carregando pacientes...')).toBeInTheDocument()
  })

  it('renders list of active patients', async () => {
    const mockPatients = [
      {
        id: '1',
        fullName: 'João Silva',
        recordNumber: '101',
        status: 'evaluation',
        isArchived: false,
      },
    ]
    const mockArchived = [
      {
        id: '2',
        fullName: 'Maria Souza',
        recordNumber: '102',
        status: 'therapy',
        isArchived: true,
      },
    ]
    ;(patientService.listPatientsByProfessional as any).mockResolvedValue(mockPatients)
    ;(patientService.listArchivedPatientsByProfessional as any).mockResolvedValue(mockArchived)

    renderWithProviders()

    await waitFor(() => {
      expect(screen.queryByText('Carregando pacientes...')).not.toBeInTheDocument()
    })

    // Should render only active (non-archived) by default
    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.queryByText('Maria Souza')).not.toBeInTheDocument()
  })
})
