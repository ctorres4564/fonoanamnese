import { describe, it, expect } from 'vitest'
import { communicationDevelopmentSchema } from '../schema'

describe('Communication Development Schemas', () => {
  it('permite rascunho parcial (tudo opcional)', () => {
    const data = {}
    const result = communicationDevelopmentSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('aceita status válidos para comunicação pré-linguística e valores não informados', () => {
    const data = {
      preLinguisticCommunication: {
        socialSmile: { status: 'presente' as const },
        eyeContact: { status: 'não informado' as const },
      },
    }
    const result = communicationDevelopmentSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('rejeita idade negativa em vocalizações e primeiras palavras', () => {
    const dataVocalization = { vocalizationHistory: { earlyVocalizationsAge: -1 } }
    const resultVocalization = communicationDevelopmentSchema.safeParse(dataVocalization)
    expect(resultVocalization.success).toBe(false)

    if (!resultVocalization.success) {
      expect(resultVocalization.error.issues[0].message).toContain('A idade não pode ser negativa')
    }

    const dataWords = { earlyLanguageDevelopment: { firstWordsAge: -5 } }
    const resultWords = communicationDevelopmentSchema.safeParse(dataWords)
    expect(resultWords.success).toBe(false)
  })

  it('exige descrição e idade quando há regressão nas vocalizações', () => {
    const data = {
      vocalizationHistory: { vocalizationRegression: 'sim' as const },
    }
    const result = communicationDevelopmentSchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      const issuePaths = result.error.issues.map((i) => i.path.join('.'))
      expect(issuePaths).toContain('vocalizationHistory.regressionDescription')
      expect(issuePaths).toContain('vocalizationHistory.regressionAge')
    }
  })

  it('exige habilidade e idade quando há perda de habilidades na regressão geral', () => {
    const data = {
      communicationRegression: { hadLoss: 'sim' as const },
    }
    const result = communicationDevelopmentSchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      const issuePaths = result.error.issues.map((i) => i.path.join('.'))
      expect(issuePaths).toContain('communicationRegression.lostSkill')
      expect(issuePaths).toContain('communicationRegression.regressionAge')
    }
  })

  it('exige descrição quando modo de início da regressão é outro', () => {
    const data = {
      communicationRegression: { onsetMode: 'outro' as const },
    }
    const result = communicationDevelopmentSchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      const issuePaths = result.error.issues.map((i) => i.path.join('.'))
      expect(issuePaths).toContain('communicationRegression.onsetModeOtherDescription')
    }
  })

  it('exige tipo de recurso quando utiliza comunicação alternativa', () => {
    const data = {
      alternativeCommunication: { usesResource: 'sim' as const },
    }
    const result = communicationDevelopmentSchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      const issuePaths = result.error.issues.map((i) => i.path.join('.'))
      expect(issuePaths).toContain('alternativeCommunication.resourceType')
    }
  })

  it('exige descrição quando modo de comunicação inclui "outro"', () => {
    const data = {
      communicationModes: ['outro'],
    }
    const result = communicationDevelopmentSchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      const issuePaths = result.error.issues.map((i) => i.path.join('.'))
      expect(issuePaths).toContain('communicationModeOtherDescription')
    }
  })

  it('exige observação se o vocabulário produzido passar de 3000 palavras', () => {
    const data = {
      earlyLanguageDevelopment: { estimatedProducedWords: 3001 },
    }
    const result = communicationDevelopmentSchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      const issuePaths = result.error.issues.map((i) => i.path.join('.'))
      expect(issuePaths).toContain('earlyLanguageDevelopment.observations')
    }
  })

  it('validação estrita passa com dados completos e corretos', () => {
    const data = {
      communicationRegression: {
        hadLoss: 'sim' as const,
        lostSkill: 'Falar',
        regressionAge: 24,
        onsetMode: 'outro' as const,
        onsetModeOtherDescription: 'Doença',
      },
      alternativeCommunication: {
        usesResource: 'sim' as const,
        resourceType: 'Tablet',
      },
      communicationModes: ['fala', 'outro'],
      communicationModeOtherDescription: 'Libras',
    }
    // @ts-ignore
    const result = communicationDevelopmentSchema.safeParse(data)
    expect(result.success).toBe(true)
  })
})
