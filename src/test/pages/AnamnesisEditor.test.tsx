import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AnamnesisEditor from '../../../src/pages/anamnesis/AnamnesisEditor'
import * as anamnesisService from '../../../src/services/anamnesisService'
import * as AuthContext from '../../../src/contexts/AuthContext'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

vi.mock('../../../src/services/anamnesisService', () => ({
  getAnamnesisById: vi.fn(),
  updateAnamnesis: vi.fn(),
}))

vi.mock('../../../src/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))

describe('AnamnesisEditor Integration', () => {
  const mockUser = { id: 'user1', role: 'professional' }
  const mockAnamnesis = {
    id: 'anam1',
    patientId: 'pat1',
    professionalId: 'user1',
    status: 'in_progress',
    currentSection: 'pregnancyBirthNeonatal',
    completedSections: ['interviewData', 'chiefComplaint'],
    completionPercentage: 66,
    sections: {
      interviewData: { interviewee: 'Mãe' },
      chiefComplaint: { complaint: 'Atraso de fala' },
      pregnancyBirthNeonatal: {},
    },
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    updatedBy: 'user1',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(AuthContext.useAuth as any).mockReturnValue({ user: mockUser })
    ;(anamnesisService.getAnamnesisById as any).mockResolvedValue(mockAnamnesis)
    ;(anamnesisService.updateAnamnesis as any).mockResolvedValue()
  })

  function renderEditor() {
    return render(
      <MemoryRouter initialEntries={['/patients/pat1/anamnesis/anam1']}>
        <Routes>
          <Route path="/patients/:id/anamnesis/:anamnesisId" element={<AnamnesisEditor />} />
        </Routes>
      </MemoryRouter>,
    )
  }

  it('should preserve previous sections when saving current section', async () => {
    renderEditor()

    // Espera carregar e renderizar
    await waitFor(() => {
      expect(screen.getAllByText('Gestação, Parto e Neonatal').length).toBeGreaterThan(0)
    })

    // Clica em salvar
    const saveBtn = screen.getByText('Salvar Agora')
    fireEvent.click(saveBtn)

    await waitFor(() => {
      expect(anamnesisService.updateAnamnesis).toHaveBeenCalledTimes(1)
    })

    const updateArgs = (anamnesisService.updateAnamnesis as any).mock.calls[0][1]

    // interviewData e chiefComplaint devem estar preservados no payload enviado ao firestore
    expect(updateArgs.sections.interviewData).toEqual({ interviewee: 'Mãe' })
    expect(updateArgs.sections.chiefComplaint).toEqual({ complaint: 'Atraso de fala' })
  })

  it('should not add to completedSections if invalid', async () => {
    renderEditor()
    await waitFor(() => {
      expect(screen.getAllByText('Gestação, Parto e Neonatal').length).toBeGreaterThan(0)
    })

    // Salvar sem preencher dados obrigatórios = invalido
    const saveBtn = screen.getByText('Salvar Agora')
    fireEvent.click(saveBtn)

    await waitFor(() => {
      expect(anamnesisService.updateAnamnesis).toHaveBeenCalledTimes(1)
    })

    const updateArgs = (anamnesisService.updateAnamnesis as any).mock.calls[0][1]

    // completedSections nao deve incluir pregnancyBirthNeonatal
    expect(updateArgs.completedSections).not.toContain('pregnancyBirthNeonatal')
  })

  it('should update completionPercentage based on total sections', async () => {
    renderEditor()
    await waitFor(() => {
      expect(screen.getAllByText('Gestação, Parto e Neonatal').length).toBeGreaterThan(0)
    })

    const saveBtn = screen.getByText('Salvar Agora')
    fireEvent.click(saveBtn)

    await waitFor(() => {
      expect(anamnesisService.updateAnamnesis).toHaveBeenCalledTimes(1)
    })

    const updateArgs = (anamnesisService.updateAnamnesis as any).mock.calls[0][1]

    // O editor revalida os dados persistidos: apenas uma das 8 etapas do fixture está válida.
    expect(updateArgs.completionPercentage).toBe(13)
  })

  it('should keep other section values as they were without replacing by undefined', async () => {
    renderEditor()
    await waitFor(() => {
      expect(screen.getAllByText('Gestação, Parto e Neonatal').length).toBeGreaterThan(0)
    })

    const saveBtn = screen.getByText('Salvar Agora')
    fireEvent.click(saveBtn)

    await waitFor(() => {
      expect(anamnesisService.updateAnamnesis).toHaveBeenCalledTimes(1)
    })

    const updateArgs = (anamnesisService.updateAnamnesis as any).mock.calls[0][1]
    expect(updateArgs.sections.interviewData.interviewee).toBe('Mãe')
    expect(updateArgs.sections.interviewData.nonExistent).toBeUndefined()
  })

  it('should show "Ir para revisão" when on the last section', async () => {
    ;(anamnesisService.getAnamnesisById as any).mockResolvedValue({
      ...mockAnamnesis,
      currentSection: 'childRoutine', // A última seção ativa
    })

    renderEditor()

    await waitFor(() => {
      expect(screen.getByText('Ir para revisão')).toBeInTheDocument()
    })

    // Ensure "Finalizar" is NOT present (the user requirement explicitly said it shouldn't use "Finalizar" in the editor)
    expect(screen.queryByText('Finalizar')).not.toBeInTheDocument()
  })

  it('exibe Desenvolvimento da Linguagem e as novas etapas', async () => {
    renderEditor()

    await waitFor(() =>
      expect(screen.getByText('Desenvolvimento da Linguagem')).toBeInTheDocument(),
    )
    expect(screen.getByText('Histórico de Saúde')).toBeInTheDocument()
    expect(screen.getByText('Histórico Familiar')).toBeInTheDocument()
    expect(screen.getByText('Rotina da Criança')).toBeInTheDocument()
    expect(screen.queryByText('Comunicação Visual')).not.toBeInTheDocument()
    expect(screen.queryByText('Linguagem Receptiva e Expressiva')).not.toBeInTheDocument()
    expect(screen.queryByText('Fala e Articulação')).not.toBeInTheDocument()
  })

  it('preserves legacy section data when saving an old anamnesis', async () => {
    ;(anamnesisService.getAnamnesisById as any).mockResolvedValue({
      ...mockAnamnesis,
      currentSection: 'languageDevelopment',
      sections: {
        ...mockAnamnesis.sections,
        languageDevelopment: { receptiveLanguage: { understandsName: true } },
        speechDevelopment: { speechHistory: { firstWordsAge: 18 } },
      },
    })
    renderEditor()
    await waitFor(() =>
      expect(screen.getAllByText('Dados da Entrevista').length).toBeGreaterThan(0),
    )

    fireEvent.click(screen.getByText('Salvar Agora'))
    await waitFor(() => expect(anamnesisService.updateAnamnesis).toHaveBeenCalled())
    const updateArgs = (anamnesisService.updateAnamnesis as any).mock.calls[0][1]

    expect(updateArgs.sections.languageDevelopment).toEqual({
      receptiveLanguage: { understandsName: true },
    })
    expect(updateArgs.sections.speechDevelopment).toEqual({ speechHistory: { firstWordsAge: 18 } })
  })
})
