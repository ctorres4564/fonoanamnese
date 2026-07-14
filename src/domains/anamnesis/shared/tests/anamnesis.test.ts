import { describe, it, expect } from 'vitest';
import { 
  interviewDataSchema,
  chiefComplaintSchema,
  createAnamnesisSchema
} from '../..';

describe('Anamnesis Schemas - Base', () => {
  it('valida criação de anamnese com dados corretos', () => {
    const data = {
      patientId: 'p123',
      professionalId: 'prof123'
    };
    expect(createAnamnesisSchema.safeParse(data).success).toBe(true);
  });
});

describe('Anamnesis Schemas - InterviewData', () => {
  it('rejeita data futura', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    
    const data = {
      interviewDate: futureDate.toISOString().split('T')[0],
      interviewee: 'João',
      relationship: 'Pai',
      location: 'consultório'
    };
    
    const result = interviewDataSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('não pode ser futura');
    }
  });

  it('aceita data válida e campos obrigatórios preenchidos', () => {
    const todayDate = new Date().toISOString().split('T')[0];
    const data = {
      interviewDate: todayDate,
      interviewee: 'João',
      relationship: 'Pai',
      location: 'consultório'
    };
    expect(interviewDataSchema.safeParse(data).success).toBe(true);
  });

  it('rejeita horário de término anterior ao início', () => {
    const data = {
      interviewDate: '2023-01-01',
      interviewee: 'João',
      relationship: 'Pai',
      location: 'consultório',
      startTime: '14:00',
      endTime: '13:00'
    };
    const result = interviewDataSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(i => i.path.includes('endTime'))).toBe(true);
    }
  });

  it('exige justificativa se informação for limitada', () => {
    const data = {
      interviewDate: '2023-01-01',
      interviewee: 'João',
      relationship: 'Pai',
      location: 'consultório',
      informationQuality: 'limitada'
    };
    const result = interviewDataSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(i => i.path.includes('informationLimitationReason'))).toBe(true);
    }
  });

  it('exige plataforma se modalidade for remota', () => {
    const data = {
      interviewDate: '2023-01-01',
      interviewee: 'João',
      relationship: 'Pai',
      location: 'consultório',
      modality: 'remoto'
    };
    const result = interviewDataSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(i => i.path.includes('modalityPlatform'))).toBe(true);
    }
  });
});

describe('Anamnesis Schemas - ChiefComplaint', () => {
  it('exige queixa principal', () => {
    const result = chiefComplaintSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('rejeita idade negativa', () => {
    const data = {
      complaint: 'Dificuldade de fala',
      approximateAgeNoticed: -1
    };
    const result = chiefComplaintSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('exige descrição se onsetMode for outro', () => {
    const data = {
      complaint: 'Dificuldade de fala',
      onsetMode: 'outro'
    };
    const result = chiefComplaintSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(i => i.path.includes('onsetModeDescription'))).toBe(true);
    }
  });

  it('aceita preenchimento completo válido', () => {
    const data = {
      complaint: 'Dificuldade de fala',
      approximateAgeNoticed: 2.5,
      onsetMode: 'gradual',
      functionalImpacts: ['escola']
    };
    expect(chiefComplaintSchema.safeParse(data).success).toBe(true);
  });
});
