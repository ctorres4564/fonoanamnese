import { z } from 'zod'
import {
  LANGUAGE_SKILL_STATUS,
  LANGUAGE_SUPPORT_TYPES,
  SENTENCE_COMPLEXITY_OPTIONS,
  COMMUNICATION_FORMS,
  LANGUAGE_DIFFICULTIES_OPTIONS,
  REGRESSION_ONSET_MODES,
  YES_NO_OPTIONS,
} from './constants'

export const languageSkillObservationSchema = z
  .object({
    status: z.enum(LANGUAGE_SKILL_STATUS).optional(),
    observation: z.string().optional(),
    context: z.string().optional(),
    needsSupport: z.enum(YES_NO_OPTIONS).optional(),
    supportType: z.array(z.enum(LANGUAGE_SUPPORT_TYPES)).optional(),
    otherSupportDescription: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.supportType?.includes('outro') && !data.otherSupportDescription?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Descreva o outro tipo de apoio.',
        path: ['otherSupportDescription'],
      })
    }
  })

export const receptiveLanguageSchema = z.object({
  respondsToName: languageSkillObservationSchema.optional(),
  understandsFamiliarWords: languageSkillObservationSchema.optional(),
  identifiesFamiliarPeople: languageSkillObservationSchema.optional(),
  identifiesObjects: languageSkillObservationSchema.optional(),
  identifiesBodyParts: languageSkillObservationSchema.optional(),
  understandsSimpleCommands: languageSkillObservationSchema.optional(),
  understandsTwoStepCommands: languageSkillObservationSchema.optional(),
  understandsComplexCommands: languageSkillObservationSchema.optional(),
  understandsWhat: languageSkillObservationSchema.optional(),
  understandsWho: languageSkillObservationSchema.optional(),
  understandsWhere: languageSkillObservationSchema.optional(),
  understandsWhen: languageSkillObservationSchema.optional(),
  understandsWhy: languageSkillObservationSchema.optional(),
  understandsHow: languageSkillObservationSchema.optional(),
  understandsSpatial: languageSkillObservationSchema.optional(),
  understandsTemporal: languageSkillObservationSchema.optional(),
  understandsQuantity: languageSkillObservationSchema.optional(),
  understandsOpposites: languageSkillObservationSchema.optional(),
  understandsActions: languageSkillObservationSchema.optional(),
  understandsFunctions: languageSkillObservationSchema.optional(),
  understandsShortStories: languageSkillObservationSchema.optional(),
  understandsSequences: languageSkillObservationSchema.optional(),
  understandsNonLiteral: languageSkillObservationSchema.optional(),
  understandsJokesIrony: languageSkillObservationSchema.optional(),
  understandsInDistractions: languageSkillObservationSchema.optional(),

  needsRepetition: z.enum(YES_NO_OPTIONS).optional(),
  needsSlowerSpeech: z.enum(YES_NO_OPTIONS).optional(),
  needsGestures: z.enum(YES_NO_OPTIONS).optional(),
  needsVisualSupport: z.enum(YES_NO_OPTIONS).optional(),
  needsDemonstration: z.enum(YES_NO_OPTIONS).optional(),
  needsSimplifiedLanguage: z.enum(YES_NO_OPTIONS).optional(),

  bestComprehensionSituations: z.string().optional(),
  worstComprehensionSituations: z.string().optional(),
  homeVsSchoolDifference: z.string().optional(),
  familiarPeopleComprehension: z.string().optional(),
  unfamiliarPeopleComprehension: z.string().optional(),
  noisyEnvironmentComprehension: z.string().optional(),
  familyPerception: z.string().optional(),
  examples: z.string().optional(),
  professionalObservations: z.string().optional(),
})

export const expressiveLanguageSchema = z.object({
  communicatesNeeds: languageSkillObservationSchema.optional(),
  requestsObjects: languageSkillObservationSchema.optional(),
  refuses: languageSkillObservationSchema.optional(),
  protests: languageSkillObservationSchema.optional(),
  drawsAttention: languageSkillObservationSchema.optional(),
  makesComments: languageSkillObservationSchema.optional(),
  answersQuestions: languageSkillObservationSchema.optional(),
  asksQuestions: languageSkillObservationSchema.optional(),

  namesPeople: languageSkillObservationSchema.optional(),
  namesObjects: languageSkillObservationSchema.optional(),
  namesActions: languageSkillObservationSchema.optional(),

  usesIsolatedWords: languageSkillObservationSchema.optional(),
  combinesTwoWords: languageSkillObservationSchema.optional(),
  usesSimpleSentences: languageSkillObservationSchema.optional(),
  usesComplexSentences: languageSkillObservationSchema.optional(),

  usesVerbs: languageSkillObservationSchema.optional(),
  usesPronouns: languageSkillObservationSchema.optional(),
  usesArticles: languageSkillObservationSchema.optional(),
  usesPrepositions: languageSkillObservationSchema.optional(),
  usesPlural: languageSkillObservationSchema.optional(),
  usesGenderFlexion: languageSkillObservationSchema.optional(),
  usesTenseFlexion: languageSkillObservationSchema.optional(),

  reportsEvents: languageSkillObservationSchema.optional(),
  describesObjects: languageSkillObservationSchema.optional(),
  describesImages: languageSkillObservationSchema.optional(),
  explainsSituations: languageSkillObservationSchema.optional(),
  maintainsTopic: languageSkillObservationSchema.optional(),
  changesTopicAppropriately: languageSkillObservationSchema.optional(),
  initiatesConversation: languageSkillObservationSchema.optional(),
  endsConversation: languageSkillObservationSchema.optional(),

  asksForHelp: languageSkillObservationSchema.optional(),
  clarifiesWhenMisunderstood: languageSkillObservationSchema.optional(),
  reformulatesMessage: languageSkillObservationSchema.optional(),

  usesSpontaneousLanguage: languageSkillObservationSchema.optional(),
  dependsOnQuestionsToRespond: languageSkillObservationSchema.optional(),
  usesPredominantlyRepetitiveSpeech: languageSkillObservationSchema.optional(),
  usesMemorizedPhrases: languageSkillObservationSchema.optional(),
  usesImmediateEcholalia: languageSkillObservationSchema.optional(),
  usesDelayedEcholalia: languageSkillObservationSchema.optional(),
  usesJargon: languageSkillObservationSchema.optional(),
  hasDifficultyFindingWords: languageSkillObservationSchema.optional(),
  hasFrequentPauses: languageSkillObservationSchema.optional(),
})

export const sentenceDevelopmentSchema = z.object({
  predominantForm: z.enum(COMMUNICATION_FORMS).optional(),
  perceivedAverageLength: z.number().min(0, 'A extensão não pode ser negativa').optional(),
  approximateWordsPerSentence: z
    .number()
    .min(0, 'O número de palavras não pode ser negativo')
    .optional(),
  complexity: z.enum(SENTENCE_COMPLEXITY_OPTIONS).optional(),
  hasGrammaticalErrors: z.enum(YES_NO_OPTIONS).optional(),
  examples: z.string().optional(),
  functionalImpact: z.string().optional(),
})

export const vocabularyHistorySchema = z.object({
  estimatedComprehendedVocabulary: z
    .number()
    .min(0, 'O vocabulário não pode ser negativo')
    .optional(),
  estimatedProducedVocabulary: z.number().min(0, 'O vocabulário não pode ser negativo').optional(),
  nounVariety: z.enum(LANGUAGE_SKILL_STATUS).optional(),
  verbVariety: z.enum(LANGUAGE_SKILL_STATUS).optional(),
  adjectiveVariety: z.enum(LANGUAGE_SKILL_STATUS).optional(),
  functionalWordVariety: z.enum(LANGUAGE_SKILL_STATUS).optional(),
  learnsNewWordsEasily: z.enum(YES_NO_OPTIONS).optional(),
  needsFrequentRepetition: z.enum(YES_NO_OPTIONS).optional(),
  forgetsLearnedWords: z.enum(YES_NO_OPTIONS).optional(),
  usesWordsOutOfContext: z.enum(YES_NO_OPTIONS).optional(),
  usesGenericWords: z.enum(YES_NO_OPTIONS).optional(),
  difficultyAccessingNames: z.enum(YES_NO_OPTIONS).optional(),
  restrictedToSpecificInterests: z.enum(YES_NO_OPTIONS).optional(),
  examples: z.string().optional(),
})

export const narrativeDevelopmentSchema = z.object({
  reportsEventsInSequence: languageSkillObservationSchema.optional(),
  organizesBeginningMiddleEnd: languageSkillObservationSchema.optional(),
  maintainsCharactersAndReferences: languageSkillObservationSchema.optional(),
  providesContext: languageSkillObservationSchema.optional(),
  reportsCauseAndEffect: languageSkillObservationSchema.optional(),
  usesTemporalMarkers: languageSkillObservationSchema.optional(),
  describesPastEvents: languageSkillObservationSchema.optional(),
  anticipatesEvents: languageSkillObservationSchema.optional(),
  retellsStories: languageSkillObservationSchema.optional(),
  inventsStories: languageSkillObservationSchema.optional(),
  maintainsCoherence: languageSkillObservationSchema.optional(),
  providesSufficientInformation: languageSkillObservationSchema.optional(),
  needsSupportQuestions: z.enum(YES_NO_OPTIONS).optional(),
  losesTopic: z.enum(YES_NO_OPTIONS).optional(),
  includesExcessiveDetails: z.enum(YES_NO_OPTIONS).optional(),
  hasUninformativeDiscourse: z.enum(YES_NO_OPTIONS).optional(),
  hasDisorganizedDiscourse: z.enum(YES_NO_OPTIONS).optional(),
  observationsAndExamples: z.string().optional(),
})

export const functionalLanguageSchema = z.object({
  requests: languageSkillObservationSchema.optional(),
  refuses: languageSkillObservationSchema.optional(),
  shares: languageSkillObservationSchema.optional(),
  informs: languageSkillObservationSchema.optional(),
  asks: languageSkillObservationSchema.optional(),
  answers: languageSkillObservationSchema.optional(),
  negotiates: languageSkillObservationSchema.optional(),
  expressesEmotions: languageSkillObservationSchema.optional(),
  reportsDiscomfort: languageSkillObservationSchema.optional(),
  resolvesConflicts: languageSkillObservationSchema.optional(),
  adaptsToInterlocutor: languageSkillObservationSchema.optional(),
  adaptsToEnvironment: languageSkillObservationSchema.optional(),
  functionalAtHome: z.enum(YES_NO_OPTIONS).optional(),
  functionalAtSchool: z.enum(YES_NO_OPTIONS).optional(),
  functionalInSocialEnvironments: z.enum(YES_NO_OPTIONS).optional(),
  autonomyImpact: z.string().optional(),
  schoolParticipationImpact: z.string().optional(),
  socialInteractionImpact: z.string().optional(),
})

export const languageDifficultiesSchema = z
  .object({
    reportedDifficulties: z.array(z.enum(LANGUAGE_DIFFICULTIES_OPTIONS)).optional(),
    otherDifficultyDescription: z.string().optional(),
    agePerceived: z.string().optional(),
    evolution: z.string().optional(),
    hardestSituations: z.string().optional(),
    helpfulStrategies: z.string().optional(),
    functionalImpact: z.string().optional(),
    observations: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.reportedDifficulties?.includes('outra') && !data.otherDifficultyDescription?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Por favor, descreva a outra dificuldade.',
        path: ['otherDifficultyDescription'],
      })
    }
  })

export const languageRegressionSchema = z
  .object({
    hasRegression: z.enum(YES_NO_OPTIONS).optional(),
    lostSkills: z.string().optional(),
    wordLoss: z.enum(YES_NO_OPTIONS).optional(),
    phraseLoss: z.enum(YES_NO_OPTIONS).optional(),
    vocabularyReduction: z.enum(YES_NO_OPTIONS).optional(),
    comprehensionLoss: z.enum(YES_NO_OPTIONS).optional(),
    responseCapacityLoss: z.enum(YES_NO_OPTIONS).optional(),
    narrativeCapacityLoss: z.enum(YES_NO_OPTIONS).optional(),
    approximateAge: z.string().optional(),
    onsetMode: z.enum(REGRESSION_ONSET_MODES).optional(),
    otherOnsetModeDescription: z.string().optional(),
    associatedContext: z.string().optional(),
    partialRecovery: z.enum(YES_NO_OPTIONS).optional(),
    totalRecovery: z.enum(YES_NO_OPTIONS).optional(),
    professionalEvaluationPerformed: z.enum(YES_NO_OPTIONS).optional(),
    observations: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasRegression === 'sim') {
      if (!data.lostSkills?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'A habilidade perdida deve ser informada quando há regressão.',
          path: ['lostSkills'],
        })
      }
      if (!data.approximateAge?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'A idade aproximada (ou não informado) é obrigatória.',
          path: ['approximateAge'],
        })
      }
    }
    if (data.onsetMode === 'outro' && !data.otherOnsetModeDescription?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Por favor, descreva a outra forma de início.',
        path: ['otherOnsetModeDescription'],
      })
    }
  })

export const languageSupportStrategiesSchema = z
  .object({
    supportsUsed: z.array(z.enum(LANGUAGE_SUPPORT_TYPES)).optional(),
    otherSupportDescription: z.string().optional(),
    mostEffectiveSupport: z.string().optional(),
    whoUses: z.string().optional(),
    environments: z.string().optional(),
    frequency: z.string().optional(),
    childResponse: z.string().optional(),
    observations: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.supportsUsed?.includes('outro') && !data.otherSupportDescription?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Descreva o outro apoio.',
        path: ['otherSupportDescription'],
      })
    }
  })

export const languageReportVsObservationSchema = z.object({
  familyReportData: z.string().optional(),
  schoolInformation: z.string().optional(),
  professionalInitialObservation: z.string().optional(),
  observationLimitations: z.string().optional(),
  needsComplementaryEvaluation: z.enum(YES_NO_OPTIONS).optional(),
})

export const languageDevelopmentSchema = z.object({
  receptiveLanguage: receptiveLanguageSchema.optional(),
  expressiveLanguage: expressiveLanguageSchema.optional(),
  sentenceDevelopment: sentenceDevelopmentSchema.optional(),
  vocabularyHistory: vocabularyHistorySchema.optional(),
  narrativeDevelopment: narrativeDevelopmentSchema.optional(),
  functionalLanguageUse: functionalLanguageSchema.optional(),
  languageDifficulties: languageDifficultiesSchema.optional(),
  languageRegression: languageRegressionSchema.optional(),
  languageSupportStrategies: languageSupportStrategiesSchema.optional(),
  reportVsObservation: languageReportVsObservationSchema.optional(),
})
