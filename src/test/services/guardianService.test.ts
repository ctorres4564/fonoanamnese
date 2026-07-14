import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createGuardian } from '../../services/guardianService';
import * as firestore from 'firebase/firestore';

vi.mock('firebase/firestore', () => {
  return {
    collection: vi.fn(),
    doc: vi.fn(),
    addDoc: vi.fn(),
    updateDoc: vi.fn(),
    getDoc: vi.fn(),
    getDocs: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    serverTimestamp: vi.fn(),
    writeBatch: vi.fn(),
  };
});

// We need to mock the db from our firebase config
vi.mock('../../services/firebase', () => ({
  db: {},
}));

describe('GuardianService', () => {
  const mockBatch = {
    update: vi.fn(),
    set: vi.fn(),
    commit: vi.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (firestore.writeBatch as any).mockReturnValue(mockBatch);
  });

  it('createGuardian with isPrimaryContact=true should use batch and update other guardians', async () => {
    // Setup mocks
    const mockQuerySnapshot = {
      forEach: (callback: any) => {
        // Simular um guardian existente que era primary
        callback({
          id: 'old_primary',
          ref: 'old_primary_ref',
          data: () => ({ isPrimaryContact: true }),
        });
      },
    };
    (firestore.getDocs as any).mockResolvedValue(mockQuerySnapshot);
    (firestore.doc as any).mockReturnValue('new_doc_ref');

    const newGuardian = {
      professionalId: 'pro123',
      patientId: 'pat123',
      fullName: 'Novo Principal',
      cpf: '',
      rg: '',
      relationship: 'Pai',
      occupation: '',
      phone: '123',
      email: '',
      address: undefined,
      isLegalGuardian: false,
      isPrimaryContact: true, // TRUE!
      canReceiveInformation: true,
      canAttendSessions: true,
    };

    await createGuardian(newGuardian);

    // Deve ter criado um batch
    expect(firestore.writeBatch).toHaveBeenCalled();
    // O batch deve ter chamado update para remover o primary do outro
    expect(mockBatch.update).toHaveBeenCalledWith('old_primary_ref', expect.objectContaining({ isPrimaryContact: false }));
    // E chamado set para o novo
    expect(mockBatch.set).toHaveBeenCalledWith('new_doc_ref', expect.objectContaining({ fullName: 'Novo Principal', isPrimaryContact: true }));
    expect(mockBatch.commit).toHaveBeenCalled();
  });

  it('createGuardian with isPrimaryContact=false should just use addDoc', async () => {
    (firestore.addDoc as any).mockResolvedValue({ id: 'new_id' });

    const newGuardian = {
      professionalId: 'pro123',
      patientId: 'pat123',
      fullName: 'Secundário',
      cpf: '',
      rg: '',
      relationship: 'Pai',
      occupation: '',
      phone: '123',
      email: '',
      address: undefined,
      isLegalGuardian: false,
      isPrimaryContact: false, // FALSE
      canReceiveInformation: false,
      canAttendSessions: false,
    };

    await createGuardian(newGuardian);

    expect(firestore.writeBatch).not.toHaveBeenCalled();
    expect(firestore.addDoc).toHaveBeenCalled();
  });
});
