import { z } from 'zod'

const today = new Date()
today.setHours(0, 0, 0, 0)

export const interviewDataSchema = z
  .object({
    patientName: z.string().optional(),
    interviewDate: z
      .string()
      .min(1, 'A data é obrigatória')
      .refine(
        (val) => {
          const date = new Date(val + 'T00:00:00')
          return date <= today
        },
        { message: 'A data da entrevista não pode ser futura' },
      ),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    location: z.enum(
      ['consultório', 'clínica', 'domicílio', 'escola', 'hospital', 'remoto', 'outro'],
      {
        message: 'Selecione um local válido',
      },
    ),
    locationDescription: z.string().optional(),
    interviewee: z.string().min(1, 'O nome do entrevistado é obrigatório'),
    relationship: z.string().min(1, 'O vínculo com a criança é obrigatório'),
    childPresent: z.boolean().optional(),
    otherParticipants: z.string().optional(),
    informationQuality: z
      .enum(['adequada', 'parcialmente adequada', 'limitada', 'não foi possível determinar'])
      .optional(),
    informationLimitationReason: z.string().optional(),
    observations: z.string().optional(),
    modality: z.enum(['presencial', 'domiciliar', 'remoto', 'híbrido', 'outro']).optional(),
    modalityAddress: z.string().optional(),
    modalityPlatform: z.string().optional(),
    diagnosticStatus: z.enum(['not_informed', 'under_investigation', 'established']).optional(),
    diagnosis: z.string().optional(),
    diagnosisCid: z.string().optional(),
    diagnosisDate: z.string().optional(),
    diagnosisResponsible: z.string().optional(),
    diagnosisObservations: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.diagnosticStatus === 'established' && !data.diagnosis?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Informe o diagnóstico estabelecido',
        path: ['diagnosis'],
      })
    }
    if (data.startTime && data.endTime) {
      if (data.endTime < data.startTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Horário de término não pode ser anterior ao de início',
          path: ['endTime'],
        })
      }
    }
    if (
      data.location === 'outro' &&
      (!data.locationDescription || data.locationDescription.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Por favor, descreva o local',
        path: ['locationDescription'],
      })
    }
    if (
      (data.informationQuality === 'parcialmente adequada' ||
        data.informationQuality === 'limitada') &&
      (!data.informationLimitationReason || data.informationLimitationReason.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Justifique a limitação das informações',
        path: ['informationLimitationReason'],
      })
    }
    if (
      data.modality === 'domiciliar' &&
      (!data.modalityAddress || data.modalityAddress.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Endereço ou identificação do local é obrigatório para modalidade domiciliar',
        path: ['modalityAddress'],
      })
    }
    if (
      data.modality === 'remoto' &&
      (!data.modalityPlatform || data.modalityPlatform.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Plataforma utilizada é obrigatória para modalidade remota',
        path: ['modalityPlatform'],
      })
    }
  })
