import {
  COMMUNICATION_BEHAVIOR_STATUS,
  COMMUNICATION_MODES,
  REGRESSION_ONSET_MODES,
  YES_NO_OPTIONS,
} from './constants'

export type CommunicationBehaviorStatus = (typeof COMMUNICATION_BEHAVIOR_STATUS)[number]
export type CommunicationMode = (typeof COMMUNICATION_MODES)[number]
export type RegressionOnsetMode = (typeof REGRESSION_ONSET_MODES)[number]
export type YesNoOption = (typeof YES_NO_OPTIONS)[number]

export interface CommunicationBehavior {
  status?: CommunicationBehaviorStatus
  observation?: string
}

export interface PreLinguisticCommunication {
  socialSmile?: CommunicationBehavior
  eyeContact?: CommunicationBehavior
  nameResponse?: CommunicationBehavior
  jointAttention?: CommunicationBehavior
  eyeTracking?: CommunicationBehavior
  gestureImitation?: CommunicationBehavior
  soundImitation?: CommunicationBehavior
  pointToRequest?: CommunicationBehavior
  pointToShareInterest?: CommunicationBehavior
  conventionalGestures?: CommunicationBehavior
  communicativeFacialExpression?: CommunicationBehavior
  communicativeInitiative?: CommunicationBehavior
  responseToOtherInitiative?: CommunicationBehavior
  turnTaking?: CommunicationBehavior
  communicativeIntent?: CommunicationBehavior
  communicativeVocalizations?: CommunicationBehavior
  spontaneousInteractionSeeking?: CommunicationBehavior
  useAdultAsTool?: CommunicationBehavior
  shareObjectsOrInterests?: CommunicationBehavior
}

export interface VocalizationHistory {
  earlyVocalizations?: YesNoOption
  earlyVocalizationsAge?: number
  babbling?: YesNoOption
  babblingAge?: number
  canonicalBabbling?: YesNoOption
  soundVariety?: YesNoOption
  differentIntonations?: YesNoOption
  vocalImitation?: YesNoOption
  vocalizationRegression?: YesNoOption
  regressionAge?: number
  regressionDescription?: string
  observations?: string
}

export interface EarlyLanguageDevelopment {
  firstWords?: YesNoOption
  firstWordsAge?: number
  examples?: string
  twoWordCombination?: YesNoOption
  twoWordCombinationAge?: number
  firstSentences?: YesNoOption
  firstSentencesAge?: number
  vocabularyGrowth?: 'rápido' | 'lento' | 'estagnado' | 'não informado'
  estimatedUnderstoodWords?: number
  estimatedProducedWords?: number
  functionalWordUse?: YesNoOption
  wordLoss?: YesNoOption
  wordLossAge?: number
  lostWordsOrFunctions?: string
  observations?: string
}

export interface AlternativeCommunicationHistory {
  usesResource?: YesNoOption
  resourceType?: string
  systemOrApp?: string
  usageFrequency?: string
  usageEnvironments?: string
  introducedBy?: string
  professionalGuidance?: YesNoOption
  peopleWhoUseWithChild?: string
  perceivedEfficacy?: string
  usageDifficulties?: string
  needsSpecificEvaluation?: YesNoOption
  observations?: string
}

export interface CommunicationRegression {
  hadLoss?: YesNoOption
  lostSkill?: string
  regressionAge?: number
  onsetMode?: RegressionOnsetMode
  onsetModeOtherDescription?: string
  associatedContext?: string
  recovery?: 'total' | 'parcial' | 'nenhuma' | 'não informado'
  professionalEvaluation?: YesNoOption
  observations?: string
}

export interface CommunicationDevelopmentSection {
  preLinguisticCommunication?: PreLinguisticCommunication
  vocalizationHistory?: VocalizationHistory
  earlyLanguageDevelopment?: EarlyLanguageDevelopment
  communicationModes?: CommunicationMode[]
  communicationModeOtherDescription?: string
  alternativeCommunication?: AlternativeCommunicationHistory
  communicationRegression?: CommunicationRegression
}
