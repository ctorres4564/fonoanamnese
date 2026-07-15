import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { SpeechDevelopmentSection } from '../../../../domains/anamnesis/speech/components/SpeechDevelopmentSection'

describe('SpeechDevelopmentSection Components', () => {
  it('should render main sections and basic fields', () => {
    const handleChange = vi.fn()
    render(<SpeechDevelopmentSection onChange={handleChange} />)

    expect(
      screen.getByText(
        'Esta seção avalia o desenvolvimento da fala, clareza, aspectos fonológicos, motores e o impacto funcional.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('3. Alterações de Fala Relatadas e Padrões')).toBeInTheDocument()
    expect(screen.getByText('8. Histórico Familiar e Intervenções')).toBeInTheDocument()
    expect(
      screen.getByText('Síntese e Encaminhamentos (Exclusivo do Avaliador)'),
    ).toBeInTheDocument()
  })

  it('should call onChange with valid data when all required fields are filled', async () => {
    const handleChange = vi.fn()

    // Mount with partial initial data to pass schema validation easily
    const initialData: any = {
      history: {
        firstWordsAgeMonths: 12,
        firstCombinationsAgeMonths: 24,
        firstSentencesAgeMonths: 36,
        developmentPerception: 'dentro_do_esperado',
        evolutionStatus: 'estavel',
        onsetMode: 'gradual',
      },
      intelligibility: {
        levels: {
          forParents: 'totalmente_inteligivel',
          forOtherFamily: 'totalmente_inteligivel',
          forTeachers: 'totalmente_inteligivel',
          forPeers: 'totalmente_inteligivel',
          forStrangers: 'totalmente_inteligivel',
        },
        context: {
          isolatedWords: 'totalmente_inteligivel',
          sentences: 'totalmente_inteligivel',
          spontaneousConversation: 'totalmente_inteligivel',
          speakingFast: 'totalmente_inteligivel',
          anxiousOrExcited: 'totalmente_inteligivel',
          needsRepetition: 'nunca',
          needsInterpretation: 'nunca',
          showsFrustration: 'nunca',
        },
      },
      reportedErrors: {
        types: [],
        positionInWord: 'inicio',
        frequency: 'nunca',
        consistency: 'nunca',
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
        needsSyllableSegmentation: 'nunca',
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
        needsSpecificEvaluation: false,
      },
      rateAndRhythm: {
        rate: 'adequada',
        rhythm: 'aparentemente_adequado',
        articulatoryPrecision: 'adequada',
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
        schoolImpact: 'ausente',
      },
      familyHistory: {
        hasSpeechDifficulty: false,
        hasLanguageDelay: false,
        hasStuttering: false,
        hasHearingAlteration: false,
        hasReadingWritingDifficulty: false,
        notInformed: false,
      },
      interventions: {
        previousEvaluation: 'nao',
        hasDocument: 'nao',
        previousTherapy: 'nao',
        currentTherapy: 'nao',
      },
      sample: {
        sampleTaken: 'nao',
        needsSpecificEvaluation: false,
      },
    }

    render(<SpeechDevelopmentSection initialData={initialData} onChange={handleChange} />)

    // Esperamos que o isValid seja disparado como true, porque provemos dados default vÃ¡lidos.
    await waitFor(() => {
      // onChange é chamado com a inicialização
      expect(handleChange).toHaveBeenCalledWith(expect.anything(), true)
    })
  })
})
