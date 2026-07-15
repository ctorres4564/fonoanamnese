import { describe, it, expect } from 'vitest';
import { languageDevelopmentSchema } from '../schema';

describe('languageDevelopmentSchema', () => {
  it('should validate a valid language development section', () => {
    const validData = {
      receptiveLanguage: {
        respondsToName: { status: 'presente e consistente', observation: 'Desde cedo', needsSupport: 'não', context: 'Casa' },
        needsRepetition: 'sim',
        homeVsSchoolDifference: 'Entende melhor em casa'
      },
      expressiveLanguage: {
        communicatesNeeds: { status: 'presente e consistente', needsSupport: 'não' }
      },
      vocabularyHistory: {
        estimatedComprehendedVocabulary: 50,
        estimatedProducedVocabulary: 10
      },
      sentenceDevelopment: {
        predominantForm: 'palavras isoladas'
      },
      narrativeDevelopment: {
        reportsEventsInSequence: { status: 'emergente', needsSupport: 'sim', supportType: ['apoio visual'] }
      },
      functionalLanguageUse: {
        functionalAtHome: 'sim'
      },
      languageDifficulties: {
        reportedDifficulties: ['outra'],
        otherDifficultyDescription: 'Fala fanhosa'
      },
      languageRegression: {
        hasRegression: 'não'
      },
      languageSupportStrategies: {
        supportsUsed: ['apoio visual']
      },
      reportVsObservation: {
        needsComplementaryEvaluation: 'sim'
      }
    };

    const result = languageDevelopmentSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should require otherDifficultyDescription if reportedDifficulties includes "outra"', () => {
    const invalidData = {
      languageDifficulties: {
        reportedDifficulties: ['outra']
      }
    };
    
    const result = languageDevelopmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Por favor, descreva a outra dificuldade.');
    }
  });

  it('should require otherOnsetModeDescription if onsetMode is "outro"', () => {
    const invalidData = {
      languageRegression: {
        hasRegression: 'sim',
        approximateAge: '12 meses',
        lostSkills: 'abc',
        onsetMode: 'outro'
      }
    };
    
    const result = languageDevelopmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Por favor, descreva a outra forma de início.');
    }
  });

  it('should require otherSupportDescription if supportType includes "outro" in a skill', () => {
    const invalidData = {
      receptiveLanguage: {
        respondsToName: {
          status: 'presente e consistente',
          needsSupport: 'sim',
          supportType: ['outro']
        }
      }
    };
    
    const result = languageDevelopmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Descreva o outro tipo de apoio.');
    }
  });
});
