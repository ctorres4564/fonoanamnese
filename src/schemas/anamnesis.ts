import { z } from 'zod';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const interviewDataSchema = z.object({
  interviewDate: z.string().min(1, 'A data é obrigatória').refine(val => {
    const date = new Date(val + 'T00:00:00');
    return date <= today;
  }, { message: 'A data da entrevista não pode ser futura' }),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  location: z.enum(['consultório', 'clínica', 'domicílio', 'escola', 'hospital', 'remoto', 'outro'], {
    message: 'Selecione um local válido'
  }),
  locationDescription: z.string().optional(),
  interviewee: z.string().min(1, 'O nome do entrevistado é obrigatório'),
  relationship: z.string().min(1, 'O vínculo com a criança é obrigatório'),
  childPresent: z.boolean().optional(),
  otherParticipants: z.string().optional(),
  informationQuality: z.enum(['adequada', 'parcialmente adequada', 'limitada', 'não foi possível determinar']).optional(),
  informationLimitationReason: z.string().optional(),
  observations: z.string().optional(),
  modality: z.enum(['presencial', 'domiciliar', 'remoto', 'híbrido', 'outro']).optional(),
  modalityAddress: z.string().optional(),
  modalityPlatform: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.startTime && data.endTime) {
    if (data.endTime < data.startTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Horário de término não pode ser anterior ao de início',
        path: ['endTime']
      });
    }
  }
  if (data.location === 'outro' && (!data.locationDescription || data.locationDescription.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Por favor, descreva o local',
      path: ['locationDescription']
    });
  }
  if ((data.informationQuality === 'parcialmente adequada' || data.informationQuality === 'limitada') && (!data.informationLimitationReason || data.informationLimitationReason.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Justifique a limitação das informações',
      path: ['informationLimitationReason']
    });
  }
  if (data.modality === 'domiciliar' && (!data.modalityAddress || data.modalityAddress.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Endereço ou identificação do local é obrigatório para modalidade domiciliar',
      path: ['modalityAddress']
    });
  }
  if (data.modality === 'remoto' && (!data.modalityPlatform || data.modalityPlatform.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Plataforma utilizada é obrigatória para modalidade remota',
      path: ['modalityPlatform']
    });
  }
});

export const chiefComplaintSchema = z.object({
  complaint: z.string().min(1, 'A queixa principal é obrigatória'),
  whoNoticed: z.string().optional(),
  approximateAgeNoticed: z.number().min(0, 'A idade não pode ser negativa').optional().or(z.nan().transform(() => undefined)),
  onsetMode: z.enum(['súbito', 'gradual', 'presente desde o início do desenvolvimento', 'não informado', 'outro']).optional(),
  onsetModeDescription: z.string().optional(),
  duration: z.string().optional(),
  evolution: z.enum(['melhorando', 'estável', 'piorando', 'oscilante', 'não informado']).optional(),
  situationsOccur: z.string().optional(),
  functionalImpacts: z.array(z.enum(['comunicação familiar', 'escola', 'socialização', 'alimentação', 'autonomia', 'comportamento', 'participação em atividades', 'outro'])).optional(),
  functionalImpactsOther: z.string().optional(),
  familyExpectation: z.string().optional(),
  referralSource: z.enum(['família', 'escola', 'pediatria', 'neurologia', 'otorrinolaringologia', 'psicologia', 'terapia ocupacional', 'outro fonoaudiólogo', 'outro profissional', 'procura espontânea']).optional(),
  referralProfessionalName: z.string().optional(),
  additionalObservations: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.onsetMode === 'outro' && (!data.onsetModeDescription || data.onsetModeDescription.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Descreva a forma de início',
      path: ['onsetModeDescription']
    });
  }
  if (data.functionalImpacts?.includes('outro') && (!data.functionalImpactsOther || data.functionalImpactsOther.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Descreva os outros impactos funcionais',
      path: ['functionalImpactsOther']
    });
  }
});

// Update Progress
export const updateAnamnesisProgressSchema = z.object({
  currentSection: z.string(),
  completedSections: z.array(z.string()),
  completionPercentage: z.number().min(0).max(100),
});

// Partial updates para Firebase (rascunho livre de validação restrita)
export const updateAnamnesisSchema = z.object({
  status: z.enum(['draft', 'in_progress', 'review', 'finalized', 'corrected', 'archived'] as const).optional(),
  currentSection: z.string().optional(),
  completedSections: z.array(z.string()).optional(),
  completionPercentage: z.number().min(0).max(100).optional(),
  sections: z.object({
    interviewData: z.any().optional(),
    chiefComplaint: z.any().optional(),
  }).optional(),
});

export type UpdateAnamnesisData = z.infer<typeof updateAnamnesisSchema>;

// Create
export const createAnamnesisSchema = z.object({
  patientId: z.string().min(1, "Paciente é obrigatório"),
  professionalId: z.string().min(1, "Profissional é obrigatório")
});

// Change Status
export const changeAnamnesisStatusSchema = z.object({
  status: z.enum(['draft', 'in_progress', 'review', 'finalized', 'corrected', 'archived'] as const),
});

// AnamnesisVersion Schema
export const createAnamnesisVersionSchema = z.object({
  anamnesisId: z.string(),
  version: z.number().int().positive(),
  patientId: z.string(),
  professionalId: z.string(),
  status: z.enum(['draft', 'in_progress', 'review', 'finalized', 'corrected', 'archived'] as const),
  data: z.record(z.string(), z.any()), 
  changeDescription: z.string().optional(),
});
