import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AnamnesisReview from '../../pages/anamnesis/AnamnesisReview'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import * as anamnesisService from '../../services/anamnesisService'
import * as patientService from '../../services/patientService'
import * as authContext from '../../contexts/AuthContext'
import * as validation from '../../utils/validation'

vi.mock('../../services/anamnesisService', () => ({
  getAnamnesisById: vi.fn(),
  updateAnamnesis: vi.fn(),
  finalizeAnamnesis: vi.fn(),
}))

vi.mock('../../services/patientService', () => ({
  getPatientById: vi.fn(),
}))

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))

// Mock simple para validações para controlar comportamento nos testes
vi.mock('../../utils/validation', async (importOriginal) => {
  const actual = await importOriginal<typeof validation>()
  return {
    ...actual,
    validateSection: vi.fn(),
  }
})

const mockUser = { id: 'prof-123' }
const mockProfile = { crefonoNumber: '12345', crefonoState: 'SP' }

const mockAnamnesis = {
  id: 'anamnesis-1',
  patientId: 'patient-1',
  professionalId: 'prof-123',
  status: 'draft',
  version: 1,
  currentSection: 'chiefComplaint',
  completedSections: [],
  completionPercentage: 0,
  sections: {
    interviewData: { interviewee: 'João' },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockPatient = {
  id: 'patient-1',
  name: 'Paciente Teste',
  recordNumber: 'PRONT-001',
}

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter initialEntries={['/patients/patient-1/anamneses/anamnesis-1/review']}>
      <Routes>
        <Route path="/patients/:patientId/anamneses/:anamnesisId/review" element={ui} />
        <Route
          path="/patients/:patientId/anamneses/:anamnesisId/view"
          element={<div data-testid="view-page" />}
        />
        <Route
          path="/patients/:patientId/anamneses/:anamnesisId/edit"
          element={<div data-testid="edit-page" />}
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('AnamnesisReview', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(authContext.useAuth as any).mockReturnValue({ user: mockUser, profile: mockProfile })
    ;(patientService.getPatientById as any).mockResolvedValue(mockPatient)
    ;(anamnesisService.getAnamnesisById as any).mockResolvedValue(mockAnamnesis)

    // Default validation: all invalid
    ;(validation.validateSection as any).mockReturnValue({
      isValid: false,
      errors: ['Erro simulado'],
      filledFieldsCount: 0,
    })
  })

  it('deve exibir carregamento inicialmente', () => {
    renderWithRouter(<AnamnesisReview />)
    expect(screen.getByText(/carregando/i)).toBeInTheDocument()
  })

  it('deve carregar e exibir dados do paciente e anamnese', async () => {
    renderWithRouter(<AnamnesisReview />)

    await waitFor(() => {
      expect(screen.getByText('Revisão da Anamnese')).toBeInTheDocument()
    })

    expect(screen.getByText(/Paciente Teste/)).toBeInTheDocument()
    expect(screen.getByText(/PRONT-001/)).toBeInTheDocument()
    expect(screen.getAllByText(/Rascunho/i).length).toBeGreaterThan(0)
  })

  it('deve mostrar mensagem de erro se a anamnese pertencer a outro paciente', async () => {
    ;(anamnesisService.getAnamnesisById as any).mockResolvedValue({
      ...mockAnamnesis,
      patientId: 'outro-paciente',
    })

    renderWithRouter(<AnamnesisReview />)

    await waitFor(() => {
      expect(screen.getByText(/Anamnese não pertence a este paciente/i)).toBeInTheDocument()
    })
  })

  it('deve mostrar mensagem de erro se o professionalId for diferente (acesso negado)', async () => {
    ;(anamnesisService.getAnamnesisById as any).mockResolvedValue({
      ...mockAnamnesis,
      professionalId: 'outro-prof',
    })

    renderWithRouter(<AnamnesisReview />)

    await waitFor(() => {
      expect(screen.getByText(/Acesso negado/i)).toBeInTheDocument()
    })
  })

  it('deve redirecionar para a rota de view se a anamnese já estiver finalizada', async () => {
    ;(anamnesisService.getAnamnesisById as any).mockResolvedValue({
      ...mockAnamnesis,
      status: 'finalized',
    })

    renderWithRouter(<AnamnesisReview />)

    await waitFor(() => {
      expect(screen.getByTestId('view-page')).toBeInTheDocument()
    })
  })

  it('deve listar as seções com seus status (Completa, Incompleta, Não iniciada)', async () => {
    // Mockar validações mistas
    ;(validation.validateSection as any).mockImplementation((sectionId: string) => {
      if (sectionId === 'interviewData') return { isValid: true, errors: [], filledFieldsCount: 5 }
      if (sectionId === 'chiefComplaint')
        return { isValid: false, errors: ['Falta algo'], filledFieldsCount: 2 }
      return { isValid: false, errors: [], filledFieldsCount: 0 } // Não iniciada
    })

    renderWithRouter(<AnamnesisReview />)

    await waitFor(() => {
      expect(screen.getByText('Dados da Entrevista')).toBeInTheDocument()
    })

    // Check status
    expect(screen.getByText('(Completa)')).toBeInTheDocument()
    expect(screen.getByText('(Incompleta)')).toBeInTheDocument()
    const naoIniciadas = screen.getAllByText('(Não iniciada)')
    expect(naoIniciadas.length).toBeGreaterThan(0)
  })

  it('deve desabilitar botão finalizar se houver pendências (seções inválidas)', async () => {
    renderWithRouter(<AnamnesisReview />)

    await waitFor(() => {
      expect(screen.getByText('Dados da Entrevista')).toBeInTheDocument()
    })

    const finishBtn = screen.getByText('Finalizar Anamnese')
    expect(finishBtn).toBeDisabled()
  })

  it('deve habilitar botão finalizar e abrir confirmação quando tudo for válido', async () => {
    ;(validation.validateSection as any).mockReturnValue({
      isValid: true,
      errors: [],
      filledFieldsCount: 5,
    })

    renderWithRouter(<AnamnesisReview />)

    await waitFor(() => {
      const finishBtn = screen.getByText('Finalizar Anamnese')
      expect(finishBtn).not.toBeDisabled()

      fireEvent.click(finishBtn)
    })

    expect(screen.getByText('Confirmar Finalização')).toBeInTheDocument()
  })

  it('deve chamar finalizarAnamnesis ao confirmar', async () => {
    ;(validation.validateSection as any).mockReturnValue({
      isValid: true,
      errors: [],
      filledFieldsCount: 5,
    })

    ;(anamnesisService.finalizeAnamnesis as any).mockResolvedValue(true)

    renderWithRouter(<AnamnesisReview />)

    await waitFor(() => {
      const finishBtn = screen.getByText('Finalizar Anamnese')
      fireEvent.click(finishBtn)
    })

    const confirmBtn = screen.getByText('Confirmar Finalização')
    fireEvent.click(confirmBtn)

    await waitFor(() => {
      expect(anamnesisService.finalizeAnamnesis).toHaveBeenCalledWith('anamnesis-1', 'prof-123')
      // Redirecionou para view
      expect(screen.getByTestId('view-page')).toBeInTheDocument()
    })
  })

  it('deve desabilitar finalização e mostrar aviso se CREFONO estiver ausente', async () => {
    ;(authContext.useAuth as any).mockReturnValue({
      user: mockUser,
      profile: { crefonoNumber: '' },
    })
    ;(validation.validateSection as any).mockReturnValue({
      isValid: true,
      errors: [],
      filledFieldsCount: 5,
    })

    renderWithRouter(<AnamnesisReview />)

    await waitFor(() => {
      expect(screen.getByText(/perfil profissional está incompleto/i)).toBeInTheDocument()
      const finishBtn = screen.getByText('Finalizar Anamnese')
      expect(finishBtn).toBeDisabled()
    })
  })

  it('deve garantir que o total de seções da revisão seja igual a 7 (excluindo placeholders)', async () => {
    ;(validation.validateSection as any).mockReturnValue({
      isValid: true,
      errors: [],
      filledFieldsCount: 5,
    })
    renderWithRouter(<AnamnesisReview />)

    await waitFor(() => {
      expect(
        screen.getByText((_, element) => element?.textContent === 'Seções Concluídas: 7 de 7'),
      ).toBeInTheDocument()
    })
  })
})
