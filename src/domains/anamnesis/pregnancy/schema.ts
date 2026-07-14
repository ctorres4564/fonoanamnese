import { z } from 'zod';

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
  pregnancy: pregnancyHistorySchema,
  birth: birthHistorySchema,
  neonatal: neonatalHistorySchema,
});
