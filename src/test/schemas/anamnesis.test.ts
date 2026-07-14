import { describe, it, expect } from 'vitest';
import { 
  createAnamnesisSchema, 
  updateAnamnesisSchema, 
  changeAnamnesisStatusSchema,
  updateAnamnesisProgressSchema,
  createAnamnesisVersionSchema
} from '../../schemas/anamnesis';

describe('Anamnesis Schemas', () => {
  it('valida criação de anamnese com dados corretos', () => {
    const data = {
      patientId: 'p123',
      professionalId: 'prof123'
    };
    expect(createAnamnesisSchema.safeParse(data).success).toBe(true);
  });

  it('rejeita criação sem patientId', () => {
    const data = { professionalId: 'prof123' };
    expect(createAnamnesisSchema.safeParse(data).success).toBe(false);
  });

  it('valida atualização parcial de anamnese', () => {
    const data = {
      completionPercentage: 50,
      status: 'in_progress'
    };
    expect(updateAnamnesisSchema.safeParse(data).success).toBe(true);
  });

  it('rejeita percentual fora do limite em update', () => {
    const data = { completionPercentage: 150 };
    expect(updateAnamnesisSchema.safeParse(data).success).toBe(false);
  });

  it('valida mudança de status', () => {
    expect(changeAnamnesisStatusSchema.safeParse({ status: 'finalized' }).success).toBe(true);
    expect(changeAnamnesisStatusSchema.safeParse({ status: 'invalid_status' }).success).toBe(false);
  });

  it('valida atualização de progresso completa', () => {
    const data = {
      currentSection: 'development',
      completedSections: ['identification', 'clinical_history'],
      completionPercentage: 40
    };
    expect(updateAnamnesisProgressSchema.safeParse(data).success).toBe(true);
  });

  it('rejeita versão de anamnese sem dados estruturais', () => {
    const data = {
      anamnesisId: 'a123',
      version: -1, // invalid negative version
      patientId: 'p1',
      professionalId: 'prof1',
      status: 'draft',
      data: {}
    };
    expect(createAnamnesisVersionSchema.safeParse(data).success).toBe(false);
  });

  it('aceita versão de anamnese válida', () => {
    const data = {
      anamnesisId: 'a123',
      version: 2,
      patientId: 'p1',
      professionalId: 'prof1',
      status: 'finalized',
      data: { anyField: true },
      changeDescription: 'Finalizada pelo profissional'
    };
    expect(createAnamnesisVersionSchema.safeParse(data).success).toBe(true);
  });
});
