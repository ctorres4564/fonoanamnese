import { describe, it, expect } from 'vitest'
import { patientSchema } from '../../schemas/patient'

describe('patientSchema', () => {
  const validPatient = {
    fullName: 'Maria Silva',
    socialName: '',
    birthDate: '1990-05-10',
    sexAtBirth: 'female',
    gender: 'cisgender',
    cpf: '12345678901',
    nationality: 'Brasileira',
    birthplace: 'São Paulo',
    recordNumber: '12345',
    status: 'evaluation',
    isArchived: false,
  }

  it('validates a correct patient object', () => {
    const result = patientSchema.safeParse(validPatient)
    expect(result.success).toBe(true)
  })

  it('rejects future birthDates', () => {
    const futureDate = new Date()
    futureDate.setFullYear(futureDate.getFullYear() + 1)

    const invalidPatient = {
      ...validPatient,
      birthDate: futureDate.toISOString().split('T')[0],
    }

    const result = patientSchema.safeParse(invalidPatient)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('A data de nascimento não pode ser no futuro')
    }
  })

  it('requires a fullName of at least 3 characters', () => {
    const invalidPatient = {
      ...validPatient,
      fullName: 'Ma',
    }
    const result = patientSchema.safeParse(invalidPatient)
    expect(result.success).toBe(false)
  })
})
