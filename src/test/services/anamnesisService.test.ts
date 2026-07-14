import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as firestore from 'firebase/firestore';
import { 
  createAnamnesis, 
  updateProgress, 
  changeStatus, 
  archiveAnamnesis 
} from '../../services/anamnesisService';

vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebase/firestore')>();
  return {
    ...actual,
    collection: vi.fn(),
    doc: vi.fn((_db, _path, id) => ({ id: id || 'test-id' })),
    setDoc: vi.fn(),
    getDoc: vi.fn(),
    getDocs: vi.fn(),
    updateDoc: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    serverTimestamp: vi.fn(() => new Date()),
  };
});

describe('AnamnesisService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('createAnamnesis cria um novo rascunho', async () => {
    const anamnesis = await createAnamnesis('patient1', 'prof1');
    expect(anamnesis.status).toBe('draft');
    expect(anamnesis.currentSection).toBe('identification');
    expect(anamnesis.patientId).toBe('patient1');
    expect(firestore.setDoc).toHaveBeenCalledTimes(1);
  });

  it('updateProgress atualiza o progresso corretamente', async () => {
    await updateProgress('a1', {
      currentSection: 'clinical_history',
      completedSections: ['identification'],
      completionPercentage: 20
    }, 'prof1');

    expect(firestore.updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        currentSection: 'clinical_history',
        completedSections: ['identification'],
        completionPercentage: 20,
        updatedBy: 'prof1'
      })
    );
  });

  it('changeStatus finaliza anamnese gravando finalizedAt', async () => {
    await changeStatus('a1', 'finalized', 'prof1');
    
    expect(firestore.updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        status: 'finalized',
        finalizedAt: expect.anything()
      })
    );
  });

  it('archiveAnamnesis seta isArchived e altera status', async () => {
    await archiveAnamnesis('a1', 'prof1');
    
    expect(firestore.updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        isArchived: true,
        status: 'archived',
        updatedBy: 'prof1'
      })
    );
  });
});
