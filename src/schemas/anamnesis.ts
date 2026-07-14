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

const simNaoNaoInformado = z.enum(['sim', 'não', 'não informado']).optional();

export const pregnancyHistorySchema = z.object({
  plannedPregnancy: simNaoNaoInformado,
  prenatalCare: simNaoNaoInformado,
  prenatalConsultations: z.number().min(0, 'Número de consultas não pode ser negativo').optional().or(z.nan().transform(() => undefined)),
  maternalAge: z.number().min(10, 'Idade inválida').max(65, 'Idade inválida').optional().or(z.nan().transform(() => undefined)),
  pregnancyComplications: simNaoNaoInformado,
  pregnancyComplicationsDescription: z.string().optional(),
  infections: simNaoNaoInformado,
  infectionsDescription: z.string().optional(),
  hypertension: simNaoNaoInformado,
  gestationalDiabetes: simNaoNaoInformado,
  bleeding: simNaoNaoInformado,
  medications: simNaoNaoInformado,
  medicationsDescription: z.string().optional(),
  alcoholExposure: simNaoNaoInformado,
  tobaccoExposure: simNaoNaoInformado,
  otherSubstances: simNaoNaoInformado,
  otherSubstancesDescription: z.string().optional(),
  hospitalizations: simNaoNaoInformado,
  hospitalizationsDescription: z.string().optional(),
  fetalDistress: simNaoNaoInformado,
  alteredExams: simNaoNaoInformado,
  alteredExamsDescription: z.string().optional(),
  additionalObservations: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.pregnancyComplications === 'sim' && (!data.pregnancyComplicationsDescription || data.pregnancyComplicationsDescription.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Descreva as intercorrências', path: ['pregnancyComplicationsDescription'] });
  }
  if (data.infections === 'sim' && (!data.infectionsDescription || data.infectionsDescription.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Descreva as infecções', path: ['infectionsDescription'] });
  }
  if (data.medications === 'sim' && (!data.medicationsDescription || data.medicationsDescription.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Descreva os medicamentos', path: ['medicationsDescription'] });
  }
  if (data.otherSubstances === 'sim' && (!data.otherSubstancesDescription || data.otherSubstancesDescription.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Descreva as substâncias', path: ['otherSubstancesDescription'] });
  }
  if (data.hospitalizations === 'sim' && (!data.hospitalizationsDescription || data.hospitalizationsDescription.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Descreva o motivo e período da internação', path: ['hospitalizationsDescription'] });
  }
  if (data.alteredExams === 'sim' && (!data.alteredExamsDescription || data.alteredExamsDescription.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Descreva os exames alterados', path: ['alteredExamsDescription'] });
  }
});

export const birthHistorySchema = z.object({
  deliveryType: z.enum(['vaginal', 'cesárea', 'fórceps', 'parto instrumentado', 'não informado', 'outro']).optional(),
  deliveryTypeOther: z.string().optional(),
  gestationalAgeWeeks: z.number().min(20, 'Semanas inválidas').max(45, 'Semanas inválidas').optional().or(z.nan().transform(() => undefined)),
  prematurity: simNaoNaoInformado,
  prematurityClassification: z.string().optional(),
  birthWeight: z.number().positive('Peso deve ser positivo').optional().or(z.nan().transform(() => undefined)),
  birthLength: z.number().positive('Comprimento deve ser positivo').optional().or(z.nan().transform(() => undefined)),
  headCircumference: z.number().positive('Perímetro cefálico deve ser positivo').optional().or(z.nan().transform(() => undefined)),
  apgar1: z.number().min(0).max(10).optional().or(z.nan().transform(() => undefined)),
  apgar5: z.number().min(0).max(10).optional().or(z.nan().transform(() => undefined)),
  birthComplications: simNaoNaoInformado,
  resuscitationNeeded: simNaoNaoInformado,
  resuscitationDescription: z.string().optional(),
  fetalDistress: simNaoNaoInformado,
  oxygenNeeded: simNaoNaoInformado,
  intubationNeeded: simNaoNaoInformado,
  nicuAdmission: simNaoNaoInformado,
  nicuDurationAndReason: z.string().optional(),
  hospitalizationTime: z.string().optional(),
  observations: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.deliveryType === 'outro' && (!data.deliveryTypeOther || data.deliveryTypeOther.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Descreva o tipo de parto', path: ['deliveryTypeOther'] });
  }
  if (data.nicuAdmission === 'sim' && (!data.nicuDurationAndReason || data.nicuDurationAndReason.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Descreva a duração e motivo da UTI', path: ['nicuDurationAndReason'] });
  }
});

export const neonatalHistorySchema = z.object({
  jaundice: simNaoNaoInformado,
  phototherapy: simNaoNaoInformado,
  mechanicalVentilation: simNaoNaoInformado,
  intubation: simNaoNaoInformado,
  tubeFeeding: simNaoNaoInformado,
  tubeTypeAndDuration: z.string().optional(),
  neonatalInfections: simNaoNaoInformado,
  neonatalInfectionsDescription: z.string().optional(),
  seizures: simNaoNaoInformado,
  seizuresFrequencyAndConduct: z.string().optional(),
  neurologicalAlterations: simNaoNaoInformado,
  suctionDifficulty: simNaoNaoInformado,
  feedingDifficulty: simNaoNaoInformado,
  lowWeightGain: simNaoNaoInformado,
  newbornHearingScreening: z.enum(['passou', 'falhou', 'inconclusivo', 'não realizado', 'não informado']).optional(),
  hearingScreeningResult: z.string().optional(),
  hearingScreeningRetestNeeded: z.string().optional(),
  tongueTieTest: z.enum(['alterado', 'normal', 'não realizado', 'não informado']).optional(),
  tongueTieTestResult: z.string().optional(),
  newbornBloodSpotTest: z.enum(['alterado', 'normal', 'não realizado', 'não informado']).optional(),
  bloodSpotTestResult: z.string().optional(),
  otherComplications: z.string().optional(),
  observations: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.tubeFeeding === 'sim' && (!data.tubeTypeAndDuration || data.tubeTypeAndDuration.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Descreva tipo e duração', path: ['tubeTypeAndDuration'] });
  }
  if (data.neonatalInfections === 'sim' && (!data.neonatalInfectionsDescription || data.neonatalInfectionsDescription.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Descreva a infecção', path: ['neonatalInfectionsDescription'] });
  }
  if (data.seizures === 'sim' && (!data.seizuresFrequencyAndConduct || data.seizuresFrequencyAndConduct.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Descreva frequência e conduta', path: ['seizuresFrequencyAndConduct'] });
  }
});

export const pregnancyBirthNeonatalSchema = z.object({
  pregnancy: pregnancyHistorySchema.optional().default({}),
  birth: birthHistorySchema.optional().default({}),
  neonatal: neonatalHistorySchema.optional().default({}),
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
    pregnancyBirthNeonatal: z.any().optional(),
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
