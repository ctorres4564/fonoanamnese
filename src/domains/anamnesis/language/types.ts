import {
  LANGUAGE_SKILL_STATUS,
  LANGUAGE_SUPPORT_TYPES,
  SENTENCE_COMPLEXITY_OPTIONS,
  COMMUNICATION_FORMS,
  LANGUAGE_DIFFICULTIES_OPTIONS,
  REGRESSION_ONSET_MODES,
  YES_NO_OPTIONS,
} from './constants'

export type LanguageSkillStatus = (typeof LANGUAGE_SKILL_STATUS)[number]
export type LanguageSupportType = (typeof LANGUAGE_SUPPORT_TYPES)[number]
export type SentenceComplexity = (typeof SENTENCE_COMPLEXITY_OPTIONS)[number]
export type CommunicationForm = (typeof COMMUNICATION_FORMS)[number]
export type LanguageDifficulty = (typeof LANGUAGE_DIFFICULTIES_OPTIONS)[number]
export type RegressionOnsetMode = (typeof REGRESSION_ONSET_MODES)[number]
export type YesNoOption = (typeof YES_NO_OPTIONS)[number]

export interface LanguageSkillObservation {
  status?: LanguageSkillStatus
  observation?: string
  context?: string
  needsSupport?: YesNoOption
  supportType?: LanguageSupportType[]
  otherSupportDescription?: string
}

export interface ReceptiveLanguageHistory {
  // basic comprehension
  respondsToName?: LanguageSkillObservation
  understandsFamiliarWords?: LanguageSkillObservation
  identifiesFamiliarPeople?: LanguageSkillObservation
  identifiesObjects?: LanguageSkillObservation
  identifiesBodyParts?: LanguageSkillObservation

  // order complexity
  understandsSimpleCommands?: LanguageSkillObservation
  understandsTwoStepCommands?: LanguageSkillObservation
  understandsComplexCommands?: LanguageSkillObservation // 3 or more

  // questions
  understandsWhat?: LanguageSkillObservation
  understandsWho?: LanguageSkillObservation
  understandsWhere?: LanguageSkillObservation
  understandsWhen?: LanguageSkillObservation
  understandsWhy?: LanguageSkillObservation
  understandsHow?: LanguageSkillObservation

  // concepts
  understandsSpatial?: LanguageSkillObservation
  understandsTemporal?: LanguageSkillObservation
  understandsQuantity?: LanguageSkillObservation
  understandsOpposites?: LanguageSkillObservation
  understandsActions?: LanguageSkillObservation
  understandsFunctions?: LanguageSkillObservation

  // discourse and non literal
  understandsShortStories?: LanguageSkillObservation
  understandsSequences?: LanguageSkillObservation
  understandsNonLiteral?: LanguageSkillObservation
  understandsJokesIrony?: LanguageSkillObservation

  // environment and supports
  understandsInDistractions?: LanguageSkillObservation
  needsRepetition?: YesNoOption
  needsSlowerSpeech?: YesNoOption
  needsGestures?: YesNoOption
  needsVisualSupport?: YesNoOption
  needsDemonstration?: YesNoOption
  needsSimplifiedLanguage?: YesNoOption

  // complementary
  bestComprehensionSituations?: string
  worstComprehensionSituations?: string
  homeVsSchoolDifference?: string
  familiarPeopleComprehension?: string
  unfamiliarPeopleComprehension?: string
  noisyEnvironmentComprehension?: string
  familyPerception?: string
  examples?: string
  professionalObservations?: string
}

export interface ExpressiveLanguageHistory {
  // communicative functions
  communicatesNeeds?: LanguageSkillObservation
  requestsObjects?: LanguageSkillObservation
  refuses?: LanguageSkillObservation
  protests?: LanguageSkillObservation
  drawsAttention?: LanguageSkillObservation
  makesComments?: LanguageSkillObservation
  answersQuestions?: LanguageSkillObservation
  asksQuestions?: LanguageSkillObservation

  // naming
  namesPeople?: LanguageSkillObservation
  namesObjects?: LanguageSkillObservation
  namesActions?: LanguageSkillObservation

  // structure
  usesIsolatedWords?: LanguageSkillObservation
  combinesTwoWords?: LanguageSkillObservation
  usesSimpleSentences?: LanguageSkillObservation
  usesComplexSentences?: LanguageSkillObservation

  // morphosyntax
  usesVerbs?: LanguageSkillObservation
  usesPronouns?: LanguageSkillObservation
  usesArticles?: LanguageSkillObservation
  usesPrepositions?: LanguageSkillObservation
  usesPlural?: LanguageSkillObservation
  usesGenderFlexion?: LanguageSkillObservation
  usesTenseFlexion?: LanguageSkillObservation

  // discourse
  reportsEvents?: LanguageSkillObservation
  describesObjects?: LanguageSkillObservation
  describesImages?: LanguageSkillObservation
  explainsSituations?: LanguageSkillObservation
  maintainsTopic?: LanguageSkillObservation
  changesTopicAppropriately?: LanguageSkillObservation
  initiatesConversation?: LanguageSkillObservation
  endsConversation?: LanguageSkillObservation

  // repair strategies
  asksForHelp?: LanguageSkillObservation
  clarifiesWhenMisunderstood?: LanguageSkillObservation
  reformulatesMessage?: LanguageSkillObservation

  // characteristics
  usesSpontaneousLanguage?: LanguageSkillObservation
  dependsOnQuestionsToRespond?: LanguageSkillObservation
  usesPredominantlyRepetitiveSpeech?: LanguageSkillObservation
  usesMemorizedPhrases?: LanguageSkillObservation
  usesImmediateEcholalia?: LanguageSkillObservation
  usesDelayedEcholalia?: LanguageSkillObservation
  usesJargon?: LanguageSkillObservation
  hasDifficultyFindingWords?: LanguageSkillObservation
  hasFrequentPauses?: LanguageSkillObservation
}

export interface SentenceDevelopment {
  predominantForm?: CommunicationForm
  perceivedAverageLength?: number
  approximateWordsPerSentence?: number
  complexity?: SentenceComplexity
  hasGrammaticalErrors?: YesNoOption
  examples?: string
  functionalImpact?: string
}

export interface VocabularyHistory {
  estimatedComprehendedVocabulary?: number
  estimatedProducedVocabulary?: number
  nounVariety?: LanguageSkillStatus
  verbVariety?: LanguageSkillStatus
  adjectiveVariety?: LanguageSkillStatus
  functionalWordVariety?: LanguageSkillStatus
  learnsNewWordsEasily?: YesNoOption
  needsFrequentRepetition?: YesNoOption
  forgetsLearnedWords?: YesNoOption
  usesWordsOutOfContext?: YesNoOption
  usesGenericWords?: YesNoOption
  difficultyAccessingNames?: YesNoOption
  restrictedToSpecificInterests?: YesNoOption
  examples?: string
}

export interface NarrativeDevelopment {
  reportsEventsInSequence?: LanguageSkillObservation
  organizesBeginningMiddleEnd?: LanguageSkillObservation
  maintainsCharactersAndReferences?: LanguageSkillObservation
  providesContext?: LanguageSkillObservation
  reportsCauseAndEffect?: LanguageSkillObservation
  usesTemporalMarkers?: LanguageSkillObservation
  describesPastEvents?: LanguageSkillObservation
  anticipatesEvents?: LanguageSkillObservation
  retellsStories?: LanguageSkillObservation
  inventsStories?: LanguageSkillObservation
  maintainsCoherence?: LanguageSkillObservation
  providesSufficientInformation?: LanguageSkillObservation
  needsSupportQuestions?: YesNoOption
  losesTopic?: YesNoOption
  includesExcessiveDetails?: YesNoOption
  hasUninformativeDiscourse?: YesNoOption
  hasDisorganizedDiscourse?: YesNoOption
  observationsAndExamples?: string
}

export interface FunctionalLanguageUse {
  requests?: LanguageSkillObservation
  refuses?: LanguageSkillObservation
  shares?: LanguageSkillObservation
  informs?: LanguageSkillObservation
  asks?: LanguageSkillObservation
  answers?: LanguageSkillObservation
  negotiates?: LanguageSkillObservation
  expressesEmotions?: LanguageSkillObservation
  reportsDiscomfort?: LanguageSkillObservation
  resolvesConflicts?: LanguageSkillObservation
  adaptsToInterlocutor?: LanguageSkillObservation
  adaptsToEnvironment?: LanguageSkillObservation
  functionalAtHome?: YesNoOption
  functionalAtSchool?: YesNoOption
  functionalInSocialEnvironments?: YesNoOption
  autonomyImpact?: string
  schoolParticipationImpact?: string
  socialInteractionImpact?: string
}

export interface LanguageDifficulties {
  reportedDifficulties?: LanguageDifficulty[]
  otherDifficultyDescription?: string
  agePerceived?: string
  evolution?: string
  hardestSituations?: string
  helpfulStrategies?: string
  functionalImpact?: string
  observations?: string
}

export interface LanguageRegression {
  hasRegression?: YesNoOption
  lostSkills?: string
  wordLoss?: YesNoOption
  phraseLoss?: YesNoOption
  vocabularyReduction?: YesNoOption
  comprehensionLoss?: YesNoOption
  responseCapacityLoss?: YesNoOption
  narrativeCapacityLoss?: YesNoOption
  approximateAge?: string
  onsetMode?: RegressionOnsetMode
  otherOnsetModeDescription?: string
  associatedContext?: string
  partialRecovery?: YesNoOption
  totalRecovery?: YesNoOption
  professionalEvaluationPerformed?: YesNoOption
  observations?: string
}

export interface LanguageSupportStrategies {
  supportsUsed?: LanguageSupportType[]
  otherSupportDescription?: string
  mostEffectiveSupport?: string
  whoUses?: string
  environments?: string
  frequency?: string
  childResponse?: string
  observations?: string
}

export interface LanguageReportVsObservation {
  familyReportData?: string
  schoolInformation?: string
  professionalInitialObservation?: string
  observationLimitations?: string
  needsComplementaryEvaluation?: YesNoOption
}

export interface LanguageDevelopmentSection {
  receptiveLanguage?: ReceptiveLanguageHistory
  expressiveLanguage?: ExpressiveLanguageHistory
  sentenceDevelopment?: SentenceDevelopment
  vocabularyHistory?: VocabularyHistory
  narrativeDevelopment?: NarrativeDevelopment
  functionalLanguageUse?: FunctionalLanguageUse
  languageDifficulties?: LanguageDifficulties
  languageRegression?: LanguageRegression
  languageSupportStrategies?: LanguageSupportStrategies
  reportVsObservation?: LanguageReportVsObservation
}
