import { z } from 'zod'

const idadesPositivas = z.number().min(0, 'A idade não pode ser negativa').optional()

export const speechDevelopmentHistorySchema = z
  .object({
    firstWordsAgeMonths: idadesPositivas,
    firstCombinationsAgeMonths: idadesPositivas,
    firstSentencesAgeMonths: idadesPositivas,
    developmentPerception: z.enum([
      'dentro_do_esperado',
      'tardio',
      'irregular',
      'houve_regressao',
      'nao_informado',
    ]),
    regressionDescription: z.string().optional(),
    difficultyPerceivedAtAgeMonths: idadesPositivas,
    whoPerceivedDifficulty: z.string().optional(),
    evolutionStatus: z.enum(['melhorando', 'estavel', 'piorando', 'oscilante', 'nao_informado']),
    onsetMode: z.enum(['gradual', 'subito', 'presente_desde_inicio', 'nao_informado', 'outro']),
    otherOnsetModeDescription: z.string().optional(),
    familyExamples: z.string().optional(),
    observations: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.developmentPerception === 'houve_regressao' &&
      (!data.regressionDescription || data.regressionDescription.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Descrição da regressão é obrigatória',
        path: ['regressionDescription'],
      })
    }
    if (
      data.onsetMode === 'outro' &&
      (!data.otherOnsetModeDescription || data.otherOnsetModeDescription.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Descrição do outro modo de início é obrigatória',
        path: ['otherOnsetModeDescription'],
      })
    }
  })

export const speechIntelligibilitySchema = z.object({
  levels: z.object({
    forParents: z.enum([
      'totalmente_inteligivel',
      'predominantemente_inteligivel',
      'parcialmente_inteligivel',
      'pouco_inteligivel',
      'nao_inteligivel',
      'nao_observado',
      'nao_informado',
    ]),
    forOtherFamily: z.enum([
      'totalmente_inteligivel',
      'predominantemente_inteligivel',
      'parcialmente_inteligivel',
      'pouco_inteligivel',
      'nao_inteligivel',
      'nao_observado',
      'nao_informado',
    ]),
    forTeachers: z.enum([
      'totalmente_inteligivel',
      'predominantemente_inteligivel',
      'parcialmente_inteligivel',
      'pouco_inteligivel',
      'nao_inteligivel',
      'nao_observado',
      'nao_informado',
    ]),
    forPeers: z.enum([
      'totalmente_inteligivel',
      'predominantemente_inteligivel',
      'parcialmente_inteligivel',
      'pouco_inteligivel',
      'nao_inteligivel',
      'nao_observado',
      'nao_informado',
    ]),
    forStrangers: z.enum([
      'totalmente_inteligivel',
      'predominantemente_inteligivel',
      'parcialmente_inteligivel',
      'pouco_inteligivel',
      'nao_inteligivel',
      'nao_observado',
      'nao_informado',
    ]),
  }),
  context: z.object({
    isolatedWords: z.enum([
      'totalmente_inteligivel',
      'predominantemente_inteligivel',
      'parcialmente_inteligivel',
      'pouco_inteligivel',
      'nao_inteligivel',
      'nao_observado',
      'nao_informado',
    ]),
    sentences: z.enum([
      'totalmente_inteligivel',
      'predominantemente_inteligivel',
      'parcialmente_inteligivel',
      'pouco_inteligivel',
      'nao_inteligivel',
      'nao_observado',
      'nao_informado',
    ]),
    spontaneousConversation: z.enum([
      'totalmente_inteligivel',
      'predominantemente_inteligivel',
      'parcialmente_inteligivel',
      'pouco_inteligivel',
      'nao_inteligivel',
      'nao_observado',
      'nao_informado',
    ]),
    speakingFast: z.enum([
      'totalmente_inteligivel',
      'predominantemente_inteligivel',
      'parcialmente_inteligivel',
      'pouco_inteligivel',
      'nao_inteligivel',
      'nao_observado',
      'nao_informado',
    ]),
    anxiousOrExcited: z.enum([
      'totalmente_inteligivel',
      'predominantemente_inteligivel',
      'parcialmente_inteligivel',
      'pouco_inteligivel',
      'nao_inteligivel',
      'nao_observado',
      'nao_informado',
    ]),
    needsRepetition: z.enum([
      'frequentemente',
      'as_vezes',
      'raramente',
      'nunca',
      'nao_observado',
      'nao_informado',
    ]),
    needsInterpretation: z.enum([
      'frequentemente',
      'as_vezes',
      'raramente',
      'nunca',
      'nao_observado',
      'nao_informado',
    ]),
    showsFrustration: z.enum([
      'frequentemente',
      'as_vezes',
      'raramente',
      'nunca',
      'nao_observado',
      'nao_informado',
    ]),
    bestContexts: z.string().optional(),
    worstContexts: z.string().optional(),
    functionalImpact: z.string().optional(),
    examples: z.string().optional(),
  }),
})

export const reportedSpeechErrorSchema = z
  .object({
    types: z.array(z.string()).default([]),
    otherTypeDescription: z.string().optional(),
    difficultSounds: z.string().optional(),
    positionInWord: z.enum(['inicio', 'meio', 'final', 'variavel', 'nao_informado']),
    frequency: z.enum([
      'frequentemente',
      'as_vezes',
      'raramente',
      'nunca',
      'nao_observado',
      'nao_informado',
    ]),
    consistency: z.enum([
      'frequentemente',
      'as_vezes',
      'raramente',
      'nunca',
      'nao_observado',
      'nao_informado',
    ]),
    perceivedBy: z.string().optional(),
    impact: z.string().optional(),
    examples: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.types.includes('outra') &&
      (!data.otherTypeDescription || data.otherTypeDescription.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Descrição da outra alteração é obrigatória',
        path: ['otherTypeDescription'],
      })
    }
  })

export const phonologicalPatternSchema = z.object({
  pattern: z.string(),
  status: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  frequency: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  context: z.string().optional(),
  examples: z.string().optional(),
})

export const soundClassObservationSchema = z.object({
  soundClass: z.string(),
  status: z.enum([
    'aparentemente_adequada',
    'dificuldade_percebida',
    'variavel',
    'nao_observado',
    'nao_informado',
  ]),
  observations: z.string().optional(),
  examples: z.string().optional(),
})

export const speechConsistencySchema = z.object({
  sameWordSameWay: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  variesBetweenAttempts: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  improvesWithImitation: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  worsensWithLongWords: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  worsensInSentences: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  worsensWithSpeed: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  successiveCorrectionAttempts: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  showsEffort: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  abandonsDifficultWords: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  avoidsSpeaking: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  usesGesturesToCompensate: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  needsVisualModel: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  needsRepetition: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
  needsSyllableSegmentation: z.enum([
    'frequentemente',
    'as_vezes',
    'raramente',
    'nunca',
    'nao_observado',
    'nao_informado',
  ]),
})

export const motorSpeechObservationSchema = z.object({
  difficultyImitatingMouth: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  difficultyImitatingSounds: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  difficultySequencingSyllables: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  difficultyAlternatingMovements: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  articulatoryEffort: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  gropingMovements: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  pausesBetweenSyllables: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  unusualSegmentation: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  inconsistentErrors: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  associatedProsodyAlterations: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  worsensWithComplexity: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  betterAutomaticSpeech: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  betterSpontaneousSpeech: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  speechBreathingCoordination: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  fatigueDuringProlongedSpeech: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  observations: z.string().optional(),
  examples: z.string().optional(),
  context: z.string().optional(),
  needsSpecificEvaluation: z.boolean().default(false),
})

export const speechRateRhythmSchema = z.object({
  rate: z.enum(['adequada', 'aumentada', 'reduzida', 'variavel', 'nao_observada', 'nao_informada']),
  rhythm: z.enum([
    'aparentemente_adequado',
    'irregular',
    'silabado',
    'acelerado',
    'reduzido',
    'nao_observado',
    'nao_informado',
  ]),
  articulatoryPrecision: z.enum([
    'adequada',
    'parcialmente_adequada',
    'reduzida',
    'variavel',
    'nao_observada',
    'nao_informada',
  ]),
  pneumophonoarticulatoryCoordination: z.string().optional(),
  pauses: z.string().optional(),
  effort: z.string().optional(),
  observations: z.string().optional(),
})

export const speechFunctionalImpactSchema = z.object({
  difficultyUnderstoodAtHome: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  difficultyUnderstoodAtSchool: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  difficultyParticipatingInConversations: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  avoidsSpeaking: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  reducesResponses: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  showsShame: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  showsIrritation: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  showsFrustration: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  usesInterpreter: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  suffersTeasing: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  literacyImpact: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  readingWritingImpact: z.enum([
    'presente',
    'ausente',
    'incerto',
    'nao_observado',
    'nao_informado',
  ]),
  autonomyImpact: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  socialImpact: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  schoolImpact: z.enum(['presente', 'ausente', 'incerto', 'nao_observado', 'nao_informado']),
  mostDifficultSituations: z.string().optional(),
  familyStrategies: z.string().optional(),
  observations: z.string().optional(),
})

export const speechFamilyHistorySchema = z.object({
  hasSpeechDifficulty: z.boolean().default(false),
  hasLanguageDelay: z.boolean().default(false),
  hasStuttering: z.boolean().default(false),
  hasHearingAlteration: z.boolean().default(false),
  hasReadingWritingDifficulty: z.boolean().default(false),
  relationship: z.string().optional(),
  description: z.string().optional(),
  notInformed: z.boolean().default(false),
})

export const previousSpeechInterventionSchema = z.object({
  previousEvaluation: z.enum(['sim', 'nao', 'nao_informado']),
  evaluationDate: z.string().optional(),
  evaluationProfessional: z.string().optional(),
  evaluationResult: z.string().optional(),
  hasDocument: z.enum(['sim', 'nao', 'nao_informado']),
  previousTherapy: z.enum(['sim', 'nao', 'nao_informado']),
  therapyPeriod: z.string().optional(),
  therapyFrequency: z.string().optional(),
  therapyObjectives: z.string().optional(),
  perceivedEvolution: z.string().optional(),
  interruptionReason: z.string().optional(),
  currentTherapy: z.enum(['sim', 'nao', 'nao_informado']),
  currentTherapyFrequency: z.string().optional(),
  helpfulStrategies: z.string().optional(),
  previousExercises: z.string().optional(),
  observations: z.string().optional(),
})

export const speechSampleSchema = z
  .object({
    sampleTaken: z.enum(['sim', 'nao', 'nao_informado']),
    sampleType: z
      .enum([
        'conversa_espontanea',
        'nomeacao',
        'repeticao',
        'descricao_imagem',
        'leitura',
        'outra',
      ])
      .optional(),
    otherSampleTypeDescription: z.string().optional(),
    context: z.string().optional(),
    approximateDuration: z.string().optional(),
    perceivedIntelligibility: z.string().optional(),
    mainOccurrences: z.string().optional(),
    sampleLimitations: z.string().optional(),
    needsSpecificEvaluation: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (
      data.sampleType === 'outra' &&
      (!data.otherSampleTypeDescription || data.otherSampleTypeDescription.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Descrição do outro tipo de amostra é obrigatória',
        path: ['otherSampleTypeDescription'],
      })
    }
  })

export const speechDevelopmentSchema = z.object({
  history: speechDevelopmentHistorySchema,
  intelligibility: speechIntelligibilitySchema,
  reportedErrors: reportedSpeechErrorSchema,
  phonologicalPatterns: z.array(phonologicalPatternSchema).default([]),
  soundClasses: z.array(soundClassObservationSchema).default([]),
  consistency: speechConsistencySchema,
  motorAspects: motorSpeechObservationSchema,
  rateAndRhythm: speechRateRhythmSchema,
  functionalImpact: speechFunctionalImpactSchema,
  familyHistory: speechFamilyHistorySchema,
  interventions: previousSpeechInterventionSchema,
  sample: speechSampleSchema,

  needsPhonologicalEvaluation: z.boolean().default(false),
  needsArticulatoryEvaluation: z.boolean().default(false),
  needsMotorSpeechEvaluation: z.boolean().default(false),
  needsHearingEvaluation: z.boolean().default(false),
  observationLimitations: z.string().optional(),
})
