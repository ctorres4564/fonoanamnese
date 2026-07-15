export type SpeechDevelopmentEvolution =
  'dentro_do_esperado' | 'tardio' | 'irregular' | 'houve_regressao' | 'nao_informado'
export type SpeechEvolutionStatus =
  'melhorando' | 'estavel' | 'piorando' | 'oscilante' | 'nao_informado'
export type SpeechOnsetMode =
  'gradual' | 'subito' | 'presente_desde_inicio' | 'nao_informado' | 'outro'
export type IntelligibilityLevel =
  | 'totalmente_inteligivel'
  | 'predominantemente_inteligivel'
  | 'parcialmente_inteligivel'
  | 'pouco_inteligivel'
  | 'nao_inteligivel'
  | 'nao_observado'
  | 'nao_informado'
export type PositionInWord = 'inicio' | 'meio' | 'final' | 'variavel' | 'nao_informado'
export type PresenceStatus = 'presente' | 'ausente' | 'incerto' | 'nao_observado' | 'nao_informado'
export type SoundClassStatus =
  | 'aparentemente_adequada'
  | 'dificuldade_percebida'
  | 'variavel'
  | 'nao_observado'
  | 'nao_informado'
export type FrequencyScale =
  'frequentemente' | 'as_vezes' | 'raramente' | 'nunca' | 'nao_observado' | 'nao_informado'
export type RateScale =
  'adequada' | 'aumentada' | 'reduzida' | 'variavel' | 'nao_observada' | 'nao_informada'
export type RhythmScale =
  | 'aparentemente_adequado'
  | 'irregular'
  | 'silabado'
  | 'acelerado'
  | 'reduzido'
  | 'nao_observado'
  | 'nao_informado'
export type PrecisionScale =
  'adequada' | 'parcialmente_adequada' | 'reduzida' | 'variavel' | 'nao_observada' | 'nao_informada'
export type SpeechSampleType =
  'conversa_espontanea' | 'nomeacao' | 'repeticao' | 'descricao_imagem' | 'leitura' | 'outra'

export interface SpeechDevelopmentHistory {
  firstWordsAgeMonths?: number
  firstCombinationsAgeMonths?: number
  firstSentencesAgeMonths?: number
  developmentPerception: SpeechDevelopmentEvolution
  regressionDescription?: string // Obrigatório se developmentPerception = 'houve_regressao'
  difficultyPerceivedAtAgeMonths?: number
  whoPerceivedDifficulty?: string
  evolutionStatus: SpeechEvolutionStatus
  onsetMode: SpeechOnsetMode
  otherOnsetModeDescription?: string // Obrigatório se onsetMode = 'outro'
  familyExamples?: string
  observations?: string
}

export interface SpeechIntelligibilityLevel {
  forParents: IntelligibilityLevel
  forOtherFamily: IntelligibilityLevel
  forTeachers: IntelligibilityLevel
  forPeers: IntelligibilityLevel
  forStrangers: IntelligibilityLevel
}

export interface SpeechIntelligibilityContext {
  isolatedWords: IntelligibilityLevel
  sentences: IntelligibilityLevel
  spontaneousConversation: IntelligibilityLevel
  speakingFast: IntelligibilityLevel
  anxiousOrExcited: IntelligibilityLevel
  needsRepetition: FrequencyScale
  needsInterpretation: FrequencyScale
  showsFrustration: FrequencyScale
  bestContexts?: string
  worstContexts?: string
  functionalImpact?: string
  examples?: string
}

export interface ReportedSpeechError {
  types: string[] // ['substituicao', 'omissao', 'distorcao', 'outra', ...]
  otherTypeDescription?: string // Obrigatório se types.includes('outra')
  difficultSounds?: string
  positionInWord: PositionInWord
  frequency: FrequencyScale
  consistency: FrequencyScale
  perceivedBy?: string
  impact?: string
  examples?: string
}

export interface PhonologicalPatternObservation {
  pattern: string // 'reducao_encontro_consonantal', etc.
  status: PresenceStatus
  frequency: FrequencyScale
  context?: string
  examples?: string
}

export interface SoundClassObservation {
  soundClass: string // 'vogais', 'plosivas', etc.
  status: SoundClassStatus
  observations?: string
  examples?: string
}

export interface SpeechConsistencyHistory {
  sameWordSameWay: FrequencyScale
  variesBetweenAttempts: FrequencyScale
  improvesWithImitation: FrequencyScale
  worsensWithLongWords: FrequencyScale
  worsensInSentences: FrequencyScale
  worsensWithSpeed: FrequencyScale
  successiveCorrectionAttempts: FrequencyScale
  showsEffort: FrequencyScale
  abandonsDifficultWords: FrequencyScale
  avoidsSpeaking: FrequencyScale
  usesGesturesToCompensate: FrequencyScale
  needsVisualModel: FrequencyScale
  needsRepetition: FrequencyScale
  needsSyllableSegmentation: FrequencyScale
}

export interface MotorSpeechObservation {
  difficultyImitatingMouth: PresenceStatus
  difficultyImitatingSounds: PresenceStatus
  difficultySequencingSyllables: PresenceStatus
  difficultyAlternatingMovements: PresenceStatus
  articulatoryEffort: PresenceStatus
  gropingMovements: PresenceStatus
  pausesBetweenSyllables: PresenceStatus
  unusualSegmentation: PresenceStatus
  inconsistentErrors: PresenceStatus
  associatedProsodyAlterations: PresenceStatus
  worsensWithComplexity: PresenceStatus
  betterAutomaticSpeech: PresenceStatus
  betterSpontaneousSpeech: PresenceStatus
  speechBreathingCoordination: PresenceStatus
  fatigueDuringProlongedSpeech: PresenceStatus
  observations?: string
  examples?: string
  context?: string
  needsSpecificEvaluation?: boolean
}

export interface SpeechRateRhythm {
  rate: RateScale
  rhythm: RhythmScale
  articulatoryPrecision: PrecisionScale
  pneumophonoarticulatoryCoordination?: string
  pauses?: string
  effort?: string
  observations?: string
}

export interface SpeechFunctionalImpact {
  difficultyUnderstoodAtHome: PresenceStatus
  difficultyUnderstoodAtSchool: PresenceStatus
  difficultyParticipatingInConversations: PresenceStatus
  avoidsSpeaking: PresenceStatus
  reducesResponses: PresenceStatus
  showsShame: PresenceStatus
  showsIrritation: PresenceStatus
  showsFrustration: PresenceStatus
  usesInterpreter: PresenceStatus
  suffersTeasing: PresenceStatus
  literacyImpact: PresenceStatus
  readingWritingImpact: PresenceStatus
  autonomyImpact: PresenceStatus
  socialImpact: PresenceStatus
  schoolImpact: PresenceStatus
  mostDifficultSituations?: string
  familyStrategies?: string
  observations?: string
}

export interface SpeechFamilyHistory {
  hasSpeechDifficulty: boolean
  hasLanguageDelay: boolean
  hasStuttering: boolean
  hasHearingAlteration: boolean
  hasReadingWritingDifficulty: boolean
  relationship?: string
  description?: string
  notInformed: boolean
}

export interface PreviousSpeechIntervention {
  previousEvaluation: 'sim' | 'nao' | 'nao_informado'
  evaluationDate?: string
  evaluationProfessional?: string
  evaluationResult?: string
  hasDocument: 'sim' | 'nao' | 'nao_informado'
  previousTherapy: 'sim' | 'nao' | 'nao_informado'
  therapyPeriod?: string
  therapyFrequency?: string
  therapyObjectives?: string
  perceivedEvolution?: string
  interruptionReason?: string
  currentTherapy: 'sim' | 'nao' | 'nao_informado'
  currentTherapyFrequency?: string
  helpfulStrategies?: string
  previousExercises?: string
  observations?: string
}

export interface SpeechSampleObservation {
  sampleTaken: 'sim' | 'nao' | 'nao_informado'
  sampleType?: SpeechSampleType
  otherSampleTypeDescription?: string
  context?: string
  approximateDuration?: string
  perceivedIntelligibility?: string
  mainOccurrences?: string
  sampleLimitations?: string
  needsSpecificEvaluation: boolean
}

export interface SpeechDevelopmentSection {
  history: SpeechDevelopmentHistory
  intelligibility: {
    levels: SpeechIntelligibilityLevel
    context: SpeechIntelligibilityContext
  }
  reportedErrors: ReportedSpeechError
  phonologicalPatterns: PhonologicalPatternObservation[]
  soundClasses: SoundClassObservation[]
  consistency: SpeechConsistencyHistory
  motorAspects: MotorSpeechObservation
  rateAndRhythm: SpeechRateRhythm
  functionalImpact: SpeechFunctionalImpact
  familyHistory: SpeechFamilyHistory
  interventions: PreviousSpeechIntervention
  sample: SpeechSampleObservation

  // Separation of scopes
  needsPhonologicalEvaluation: boolean
  needsArticulatoryEvaluation: boolean
  needsMotorSpeechEvaluation: boolean
  needsHearingEvaluation: boolean
  observationLimitations?: string
}
