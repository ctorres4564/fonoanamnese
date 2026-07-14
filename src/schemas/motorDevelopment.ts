import { z } from 'zod';

const simNaoNaoInformado = z.enum(['sim', 'não', 'não informado']).optional();

export const motorMilestoneSchema = z.object({
  status: z.enum(['adquirido', 'não adquirido', 'em aquisição', 'não informado', 'não se aplica']).optional(),
  acquisitionAgeMonths: z.number().min(0, 'A idade não pode ser negativa').optional().or(z.nan().transform(() => undefined)),
  acquisitionAgeDescription: z.string().optional(),
  acquisitionMode: z.enum(['espontânea', 'com estímulo', 'após intervenção', 'não informado']).optional(),
  observations: z.string().optional(),
});

export const motorRegressionSchema = z.object({
  hasRegression: simNaoNaoInformado,
  lostSkill: z.string().optional(),
  regressionAge: z.number().min(0, 'A idade não pode ser negativa').optional().or(z.nan().transform(() => undefined)),
  onsetMode: z.enum(['súbita', 'gradual', 'não informado', 'outro']).optional(),
  onsetModeOther: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.hasRegression === 'sim') {
    if (!data.lostSkill || data.lostSkill.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Habilidade perdida é obrigatória', path: ['lostSkill'] });
    }
    if (data.regressionAge === undefined || isNaN(data.regressionAge)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Idade aproximada da regressão é obrigatória', path: ['regressionAge'] });
    }
  }
  if (data.onsetMode === 'outro' && (!data.onsetModeOther || data.onsetModeOther.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Descreva a forma de início', path: ['onsetModeOther'] });
  }
});

export const physiotherapyHistorySchema = z.object({
  hadPhysiotherapy: simNaoNaoInformado,
  currentPhysiotherapy: simNaoNaoInformado,
  reason: z.string().optional(),
  period: z.string().optional(),
  evolution: z.string().optional(),
}).superRefine((data, ctx) => {
  const hasPhysio = data.hadPhysiotherapy === 'sim' || data.currentPhysiotherapy === 'sim';
  if (hasPhysio) {
    if (!data.reason || data.reason.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Motivo é obrigatório', path: ['reason'] });
    }
    if (!data.period || data.period.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Período é obrigatório', path: ['period'] });
    }
  }
});

const motorGeneralSchema = z.object({
  ageAppropriateDevelopment: simNaoNaoInformado,
  reportedMotorDelay: simNaoNaoInformado,
  motorDelayDescription: z.string().optional(),
  balanceDifficulty: simNaoNaoInformado,
  frequentFalls: simNaoNaoInformado,
  frequentFallsDescription: z.string().optional(),
  runningDifficulty: simNaoNaoInformado,
  stairsDifficulty: simNaoNaoInformado,
  smallObjectsDifficulty: simNaoNaoInformado,
  toolsDifficulty: simNaoNaoInformado,
  manualPreference: z.enum(['direita', 'esquerda', 'alternada', 'ainda não definida', 'não informado']).optional(),
  manualPreferenceAge: z.string().optional(),
  repetitiveMovements: simNaoNaoInformado,
  repetitiveMovementsDescription: z.string().optional(),
  usesMobilityDevice: simNaoNaoInformado,
  mobilityDeviceType: z.string().optional(),
  additionalObservations: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.reportedMotorDelay === 'sim' && (!data.motorDelayDescription || data.motorDelayDescription.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Descrição é obrigatória', path: ['motorDelayDescription'] });
  }
  if (data.usesMobilityDevice === 'sim' && (!data.mobilityDeviceType || data.mobilityDeviceType.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Tipo de dispositivo é obrigatório', path: ['mobilityDeviceType'] });
  }
});

export const motorDevelopmentSchema = z.object({
  milestones: z.object({
    cervicalControl: motorMilestoneSchema,
    rolling: motorMilestoneSchema,
    sittingWithSupport: motorMilestoneSchema,
    sittingWithoutSupport: motorMilestoneSchema,
    crawlingOnBelly: motorMilestoneSchema,
    crawling: motorMilestoneSchema,
    standingWithSupport: motorMilestoneSchema,
    standingWithoutSupport: motorMilestoneSchema,
    walkingWithSupport: motorMilestoneSchema,
    walkingWithoutSupport: motorMilestoneSchema,
    running: motorMilestoneSchema,
    climbingStairs: motorMilestoneSchema,
    descendingStairs: motorMilestoneSchema,
    jumpingWithBothFeet: motorMilestoneSchema,
    balance: motorMilestoneSchema,
    globalMotorCoordination: motorMilestoneSchema,
    fineMotorCoordination: motorMilestoneSchema,
  }),
  general: motorGeneralSchema,
  regression: motorRegressionSchema,
  physiotherapy: physiotherapyHistorySchema,
});
