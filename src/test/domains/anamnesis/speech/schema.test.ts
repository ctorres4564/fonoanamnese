import { describe, it, expect } from 'vitest';
import { speechDevelopmentSchema } from '../../../../domains/anamnesis/speech/schema';

describe('SpeechDevelopmentSchema', () => {
  it('should validate a complete valid object', () => {
    const validData = {
      history: {
        firstWordsAgeMonths: 12,
        firstCombinationsAgeMonths: 24,
        firstSentencesAgeMonths: 36,
        developmentPerception: 'dentro_do_esperado',
        difficultyPerceivedAtAgeMonths: undefined,
        whoPerceivedDifficulty: '',
        evolutionStatus: 'estavel',
        onsetMode: 'gradual',
        familyExamples: '',
        observations: ''
      },
      intelligibility: {
        levels: {
          forParents: 'totalmente_inteligivel',
          forOtherFamily: 'predominantemente_inteligivel',
          forTeachers: 'parcialmente_inteligivel',
          forPeers: 'pouco_inteligivel',
          forStrangers: 'nao_inteligivel'
        },
        context: {
          isolatedWords: 'totalmente_inteligivel',
          sentences: 'totalmente_inteligivel',
          spontaneousConversation: 'totalmente_inteligivel',
          speakingFast: 'totalmente_inteligivel',
          anxiousOrExcited: 'totalmente_inteligivel',
          needsRepetition: 'nunca',
          needsInterpretation: 'nunca',
          showsFrustration: 'nunca'
        }
      },
      reportedErrors: {
        types: [],
        positionInWord: 'inicio',
        frequency: 'nunca',
        consistency: 'nunca'
      },
      phonologicalPatterns: [],
      soundClasses: [],
      consistency: {
        sameWordSameWay: 'nunca',
        variesBetweenAttempts: 'nunca',
        improvesWithImitation: 'nunca',
        worsensWithLongWords: 'nunca',
        worsensInSentences: 'nunca',
        worsensWithSpeed: 'nunca',
        successiveCorrectionAttempts: 'nunca',
        showsEffort: 'nunca',
        abandonsDifficultWords: 'nunca',
        avoidsSpeaking: 'nunca',
        usesGesturesToCompensate: 'nunca',
        needsVisualModel: 'nunca',
        needsRepetition: 'nunca',
        needsSyllableSegmentation: 'nunca'
      },
      motorAspects: {
        difficultyImitatingMouth: 'ausente',
        difficultyImitatingSounds: 'ausente',
        difficultySequencingSyllables: 'ausente',
        difficultyAlternatingMovements: 'ausente',
        articulatoryEffort: 'ausente',
        gropingMovements: 'ausente',
        pausesBetweenSyllables: 'ausente',
        unusualSegmentation: 'ausente',
        inconsistentErrors: 'ausente',
        associatedProsodyAlterations: 'ausente',
        worsensWithComplexity: 'ausente',
        betterAutomaticSpeech: 'ausente',
        betterSpontaneousSpeech: 'ausente',
        speechBreathingCoordination: 'ausente',
        fatigueDuringProlongedSpeech: 'ausente',
        needsSpecificEvaluation: false
      },
      rateAndRhythm: {
        rate: 'adequada',
        rhythm: 'aparentemente_adequado',
        articulatoryPrecision: 'adequada'
      },
      functionalImpact: {
        difficultyUnderstoodAtHome: 'ausente',
        difficultyUnderstoodAtSchool: 'ausente',
        difficultyParticipatingInConversations: 'ausente',
        avoidsSpeaking: 'ausente',
        reducesResponses: 'ausente',
        showsShame: 'ausente',
        showsIrritation: 'ausente',
        showsFrustration: 'ausente',
        usesInterpreter: 'ausente',
        suffersTeasing: 'ausente',
        literacyImpact: 'ausente',
        readingWritingImpact: 'ausente',
        autonomyImpact: 'ausente',
        socialImpact: 'ausente',
        schoolImpact: 'ausente'
      },
      familyHistory: {
        hasSpeechDifficulty: false,
        hasLanguageDelay: false,
        hasStuttering: false,
        hasHearingAlteration: false,
        hasReadingWritingDifficulty: false,
        notInformed: false
      },
      interventions: {
        previousEvaluation: 'nao',
        hasDocument: 'nao',
        previousTherapy: 'nao',
        currentTherapy: 'nao'
      },
      sample: {
        sampleTaken: 'nao',
        needsSpecificEvaluation: false
      },
      needsPhonologicalEvaluation: false,
      needsArticulatoryEvaluation: false,
      needsMotorSpeechEvaluation: false,
      needsHearingEvaluation: false
    };

    const result = speechDevelopmentSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should invalidate history when regressionDescription is missing and developmentPerception is houve_regressao', () => {
    const data = {
      history: {
        developmentPerception: 'houve_regressao',
        evolutionStatus: 'piorando',
        onsetMode: 'gradual',
      },
      intelligibility: {
        levels: {
          forParents: 'totalmente_inteligivel',
          forOtherFamily: 'totalmente_inteligivel',
          forTeachers: 'totalmente_inteligivel',
          forPeers: 'totalmente_inteligivel',
          forStrangers: 'totalmente_inteligivel'
        },
        context: {
          isolatedWords: 'totalmente_inteligivel',
          sentences: 'totalmente_inteligivel',
          spontaneousConversation: 'totalmente_inteligivel',
          speakingFast: 'totalmente_inteligivel',
          anxiousOrExcited: 'totalmente_inteligivel',
          needsRepetition: 'nunca',
          needsInterpretation: 'nunca',
          showsFrustration: 'nunca'
        }
      },
      reportedErrors: {
        types: [],
        positionInWord: 'inicio',
        frequency: 'nunca',
        consistency: 'nunca'
      },
      consistency: {
        sameWordSameWay: 'nunca',
        variesBetweenAttempts: 'nunca',
        improvesWithImitation: 'nunca',
        worsensWithLongWords: 'nunca',
        worsensInSentences: 'nunca',
        worsensWithSpeed: 'nunca',
        successiveCorrectionAttempts: 'nunca',
        showsEffort: 'nunca',
        abandonsDifficultWords: 'nunca',
        avoidsSpeaking: 'nunca',
        usesGesturesToCompensate: 'nunca',
        needsVisualModel: 'nunca',
        needsRepetition: 'nunca',
        needsSyllableSegmentation: 'nunca'
      },
      motorAspects: {
        difficultyImitatingMouth: 'ausente',
        difficultyImitatingSounds: 'ausente',
        difficultySequencingSyllables: 'ausente',
        difficultyAlternatingMovements: 'ausente',
        articulatoryEffort: 'ausente',
        gropingMovements: 'ausente',
        pausesBetweenSyllables: 'ausente',
        unusualSegmentation: 'ausente',
        inconsistentErrors: 'ausente',
        associatedProsodyAlterations: 'ausente',
        worsensWithComplexity: 'ausente',
        betterAutomaticSpeech: 'ausente',
        betterSpontaneousSpeech: 'ausente',
        speechBreathingCoordination: 'ausente',
        fatigueDuringProlongedSpeech: 'ausente',
        needsSpecificEvaluation: false
      },
      rateAndRhythm: {
        rate: 'adequada',
        rhythm: 'aparentemente_adequado',
        articulatoryPrecision: 'adequada'
      },
      functionalImpact: {
        difficultyUnderstoodAtHome: 'ausente',
        difficultyUnderstoodAtSchool: 'ausente',
        difficultyParticipatingInConversations: 'ausente',
        avoidsSpeaking: 'ausente',
        reducesResponses: 'ausente',
        showsShame: 'ausente',
        showsIrritation: 'ausente',
        showsFrustration: 'ausente',
        usesInterpreter: 'ausente',
        suffersTeasing: 'ausente',
        literacyImpact: 'ausente',
        readingWritingImpact: 'ausente',
        autonomyImpact: 'ausente',
        socialImpact: 'ausente',
        schoolImpact: 'ausente'
      },
      familyHistory: {
        hasSpeechDifficulty: false,
        hasLanguageDelay: false,
        hasStuttering: false,
        hasHearingAlteration: false,
        hasReadingWritingDifficulty: false,
        notInformed: false
      },
      interventions: {
        previousEvaluation: 'nao',
        hasDocument: 'nao',
        previousTherapy: 'nao',
        currentTherapy: 'nao'
      },
      sample: {
        sampleTaken: 'nao',
        needsSpecificEvaluation: false
      }
    };

    const result = speechDevelopmentSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ message: 'Descrição da regressão é obrigatória' })
        ])
      );
    }
  });

  it('should invalidate when onsetMode is outro and no description is provided', () => {
    const data = {
      history: {
        developmentPerception: 'dentro_do_esperado',
        evolutionStatus: 'estavel',
        onsetMode: 'outro',
        otherOnsetModeDescription: '',
      }
    };
    const result = speechDevelopmentSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ message: 'Descrição do outro modo de início é obrigatória' })
        ])
      );
    }
  });

  it('should invalidate when reported error type includes outra and no description is provided', () => {
    const data = {
      reportedErrors: {
        types: ['outra'],
        positionInWord: 'inicio',
        frequency: 'nunca',
        consistency: 'nunca'
      }
    };
    const result = speechDevelopmentSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ message: 'Descrição da outra alteração é obrigatória' })
        ])
      );
    }
  });

  it('should invalidate when sample type is outra and no description is provided', () => {
    const data = {
      sample: {
        sampleTaken: 'sim',
        sampleType: 'outra',
      }
    };
    const result = speechDevelopmentSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ message: 'Descrição do outro tipo de amostra é obrigatória' })
        ])
      );
    }
  });
});


