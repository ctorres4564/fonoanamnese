import { z } from 'zod';

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
