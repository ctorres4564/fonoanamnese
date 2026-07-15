import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as firestore from 'firebase/firestore'
import {
  createAnamnesis,
  updateProgress,
  changeStatus,
  archiveAnamnesis,
  reopenAnamnesis,
  getLatestActiveAnamnesisByPatient,
  finalizeAnamnesis,
} from '../../services/anamnesisService'

vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebase/firestore')>()
  return {
    ...actual,
    collection: vi.fn(),
    doc: vi.fn((_db, _path, id) => ({ id: id || 'test-id' })),
    setDoc: vi.fn(),
    getDoc: vi.fn(() =>
      Promise.resolve({
        exists: () => true,
        id: 'test-id',
        data: () => ({ status: 'draft', professionalId: 'prof1', patientId: 'pat1' }),
      }),
    ),
    getDocs: vi.fn(),
    updateDoc: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    serverTimestamp: vi.fn(() => new Date()),
  }
})

describe('AnamnesisService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('createAnamnesis cria um novo rascunho', async () => {
    const anamnesis = await createAnamnesis('patient1', 'prof1')
    expect(anamnesis.status).toBe('draft')
    expect(anamnesis.currentSection).toBe('interviewData')
    expect(anamnesis.patientId).toBe('patient1')
    expect(firestore.setDoc).toHaveBeenCalledTimes(1)
  })

  it('updateProgress atualiza o progresso corretamente', async () => {
    await updateProgress(
      'a1',
      {
        currentSection: 'clinical_history' as any,
        completedSections: ['identification' as any],
        completionPercentage: 20,
      },
      'prof1',
    )

    expect(firestore.updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        currentSection: 'clinical_history',
        completedSections: ['identification'],
        completionPercentage: 20,
        updatedBy: 'prof1',
      }),
    )
  })

  it('changeStatus finaliza anamnese gravando finalizedAt', async () => {
    await changeStatus('a1', 'finalized', 'prof1')

    expect(firestore.updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        status: 'finalized',
        finalizedAt: expect.anything(),
      }),
    )
  })

  it('archiveAnamnesis seta isArchived e altera status', async () => {
    await archiveAnamnesis('a1', 'prof1')

    expect(firestore.updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        isArchived: true,
        status: 'archived',
        updatedBy: 'prof1',
      }),
    )
  })

  it('reopenAnamnesis seta isArchived falso e altera status para draft', async () => {
    await reopenAnamnesis('a1', 'prof1')

    expect(firestore.updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        isArchived: false,
        status: 'draft',
        updatedBy: 'prof1',
      }),
    )
  })

  it('getLatestActiveAnamnesisByPatient faz query correta', async () => {
    vi.mocked(firestore.getDocs).mockResolvedValueOnce({
      empty: false,
      docs: [{ id: 'doc1', data: () => ({ status: 'draft' }) }],
    } as any)

    await getLatestActiveAnamnesisByPatient('pat1', 'prof1')

    expect(firestore.query).toHaveBeenCalled()
  })

  it('finalizeAnamnesis deve atualizar status e data e bloquear segunda finalização', async () => {
    vi.mocked(firestore.getDoc).mockResolvedValueOnce({
      exists: () => true,
      id: 'a1',
      data: () => ({
        status: 'draft',
        professionalId: 'prof1',
        patientId: 'pat1',
      }),
    } as any)

    await finalizeAnamnesis('a1', 'prof1')

    expect(firestore.updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        status: 'finalized',
        finalizedAt: expect.anything(),
        updatedBy: 'prof1',
      }),
    )

    // Segunda finalização
    vi.mocked(firestore.getDoc).mockResolvedValueOnce({
      exists: () => true,
      id: 'a1',
      data: () => ({
        status: 'finalized',
        professionalId: 'prof1',
        patientId: 'pat1',
      }),
    } as any)

    await expect(finalizeAnamnesis('a1', 'prof1')).rejects.toThrow('Anamnese já finalizada')
  })
})
