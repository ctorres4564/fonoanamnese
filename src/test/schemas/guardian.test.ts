import { describe, it, expect } from 'vitest'
import { guardianSchema } from '../../schemas/guardian'

describe('guardianSchema', () => {
  const validGuardian = {
    fullName: 'José Silva',
    cpf: '12345678901',
    rg: '1234567',
    relationship: 'Pai',
    occupation: 'Engenheiro',
    phone: '11999999999',
    email: 'jose@example.com',
    isLegalGuardian: true,
    isPrimaryContact: true,
    canReceiveInformation: true,
    canAttendSessions: true,
  }

  it('validates a correct guardian object', () => {
    const result = guardianSchema.safeParse(validGuardian)
    expect(result.success).toBe(true)
  })

  it('requires a fullName of at least 3 characters', () => {
    const invalidGuardian = {
      ...validGuardian,
      fullName: 'Jo',
    }
    const result = guardianSchema.safeParse(invalidGuardian)
    expect(result.success).toBe(false)
  })

  it('allows empty email by omitting it since it fails strict zod email on empty string', () => {
    const noEmail: any = { ...validGuardian }
    delete noEmail.email
    expect(guardianSchema.safeParse(noEmail).success).toBe(true)

    const invalidEmail = { ...validGuardian, email: 'not-an-email' }
    expect(guardianSchema.safeParse(invalidEmail).success).toBe(false)
  })
})
