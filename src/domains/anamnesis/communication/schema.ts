import { z } from 'zod';
import { COMMUNICATION_BEHAVIOR_STATUS, COMMUNICATION_MODES, REGRESSION_ONSET_MODES, YES_NO_OPTIONS } from './constants';

const optionalNumber = z.number().nonnegative('A idade não pode ser negativa').optional();

export const communicationBehaviorSchema = z.object({
  status: z.enum(COMMUNICATION_BEHAVIOR_STATUS).optional(),
  observation: z.string().optional()
});

export const preLinguisticCommunicationSchema = z.object({
  socialSmile: communicationBehaviorSchema.optional(),
  eyeContact: communicationBehaviorSchema.optional(),
  nameResponse: communicationBehaviorSchema.optional(),
  jointAttention: communicationBehaviorSchema.optional(),
  eyeTracking: communicationBehaviorSchema.optional(),
  gestureImitation: communicationBehaviorSchema.optional(),
  soundImitation: communicationBehaviorSchema.optional(),
  pointToRequest: communicationBehaviorSchema.optional(),
  pointToShareInterest: communicationBehaviorSchema.optional(),
  conventionalGestures: communicationBehaviorSchema.optional(),
  communicativeFacialExpression: communicationBehaviorSchema.optional(),
  communicativeInitiative: communicationBehaviorSchema.optional(),
  responseToOtherInitiative: communicationBehaviorSchema.optional(),
  turnTaking: communicationBehaviorSchema.optional(),
  communicativeIntent: communicationBehaviorSchema.optional(),
  communicativeVocalizations: communicationBehaviorSchema.optional(),
  spontaneousInteractionSeeking: communicationBehaviorSchema.optional(),
  useAdultAsTool: communicationBehaviorSchema.optional(),
  shareObjectsOrInterests: communicationBehaviorSchema.optional()
});

export const vocalizationHistorySchema = z.object({
  earlyVocalizations: z.enum(YES_NO_OPTIONS).optional(),
  earlyVocalizationsAge: optionalNumber,
  babbling: z.enum(YES_NO_OPTIONS).optional(),
  babblingAge: optionalNumber,
  canonicalBabbling: z.enum(YES_NO_OPTIONS).optional(),
  soundVariety: z.enum(YES_NO_OPTIONS).optional(),
  differentIntonations: z.enum(YES_NO_OPTIONS).optional(),
  vocalImitation: z.enum(YES_NO_OPTIONS).optional(),
  vocalizationRegression: z.enum(YES_NO_OPTIONS).optional(),
  regressionAge: optionalNumber,
  regressionDescription: z.string().optional(),
  observations: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.vocalizationRegression === 'sim' && !data.regressionDescription) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A descrição da regressão é obrigatória',
      path: ['regressionDescription']
    });
  }
  if (data.vocalizationRegression === 'sim' && data.regressionAge === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A idade aproximada da perda é obrigatória',
      path: ['regressionAge']
    });
  }
});

export const earlyLanguageDevelopmentSchema = z.object({
  firstWords: z.enum(YES_NO_OPTIONS).optional(),
  firstWordsAge: optionalNumber,
  examples: z.string().optional(),
  twoWordCombination: z.enum(YES_NO_OPTIONS).optional(),
  twoWordCombinationAge: optionalNumber,
  firstSentences: z.enum(YES_NO_OPTIONS).optional(),
  firstSentencesAge: optionalNumber,
  vocabularyGrowth: z.enum(['rápido', 'lento', 'estagnado', 'não informado']).optional(),
  estimatedUnderstoodWords: optionalNumber,
  estimatedProducedWords: optionalNumber,
  functionalWordUse: z.enum(YES_NO_OPTIONS).optional(),
  wordLoss: z.enum(YES_NO_OPTIONS).optional(),
  wordLossAge: optionalNumber,
  lostWordsOrFunctions: z.string().optional(),
  observations: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.wordLoss === 'sim' && !data.lostWordsOrFunctions) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A descrição das palavras ou funções perdidas é obrigatória',
      path: ['lostWordsOrFunctions']
    });
  }
  if (data.wordLoss === 'sim' && data.wordLossAge === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A idade aproximada da regressão é obrigatória',
      path: ['wordLossAge']
    });
  }
  if (data.estimatedProducedWords !== undefined && data.estimatedProducedWords > 3000 && !data.observations) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Para estimativas maiores que 3000 palavras, por favor adicione uma observação justificando',
      path: ['observations']
    });
  }
});

export const alternativeCommunicationSchema = z.object({
  usesResource: z.enum(YES_NO_OPTIONS).optional(),
  resourceType: z.string().optional(),
  systemOrApp: z.string().optional(),
  usageFrequency: z.string().optional(),
  usageEnvironments: z.string().optional(),
  introducedBy: z.string().optional(),
  professionalGuidance: z.enum(YES_NO_OPTIONS).optional(),
  peopleWhoUseWithChild: z.string().optional(),
  perceivedEfficacy: z.string().optional(),
  usageDifficulties: z.string().optional(),
  needsSpecificEvaluation: z.enum(YES_NO_OPTIONS).optional(),
  observations: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.usesResource === 'sim' && !data.resourceType) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'O tipo de recurso é obrigatório quando a criança utiliza recurso',
      path: ['resourceType']
    });
  }
});

export const communicationRegressionSchema = z.object({
  hadLoss: z.enum(YES_NO_OPTIONS).optional(),
  lostSkill: z.string().optional(),
  regressionAge: optionalNumber,
  onsetMode: z.enum(REGRESSION_ONSET_MODES).optional(),
  onsetModeOtherDescription: z.string().optional(),
  associatedContext: z.string().optional(),
  recovery: z.enum(['total', 'parcial', 'nenhuma', 'não informado']).optional(),
  professionalEvaluation: z.enum(YES_NO_OPTIONS).optional(),
  observations: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.hadLoss === 'sim' && !data.lostSkill) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A habilidade perdida é obrigatória',
      path: ['lostSkill']
    });
  }
  if (data.hadLoss === 'sim' && data.regressionAge === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A idade aproximada é obrigatória',
      path: ['regressionAge']
    });
  }
  if (data.onsetMode === 'outro' && !data.onsetModeOtherDescription) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A descrição para outro modo de início é obrigatória',
      path: ['onsetModeOtherDescription']
    });
  }
});

export const communicationDevelopmentSchema = z.object({
  preLinguisticCommunication: preLinguisticCommunicationSchema.optional(),
  vocalizationHistory: vocalizationHistorySchema.optional(),
  earlyLanguageDevelopment: earlyLanguageDevelopmentSchema.optional(),
  communicationModes: z.array(z.enum(COMMUNICATION_MODES)).optional(),
  communicationModeOtherDescription: z.string().optional(),
  alternativeCommunication: alternativeCommunicationSchema.optional(),
  communicationRegression: communicationRegressionSchema.optional(),
}).superRefine((data, ctx) => {
  if (data.communicationModes?.includes('outro') && !data.communicationModeOtherDescription) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A descrição para outro modo de comunicação é obrigatória',
      path: ['communicationModeOtherDescription']
    });
  }
});
