import { describe, it, expect } from 'vitest'
import { pregnancyHistorySchema, birthHistorySchema, neonatalHistorySchema } from '../..'

describe('Pregnancy, Birth and Neonatal Schemas', () => {
  describe('pregnancyHistorySchema', () => {
    it('should validate maternalAge limits', () => {
      const result1 = pregnancyHistorySchema.safeParse({ maternalAge: 8 })
      expect(result1.success).toBe(false)

      const result2 = pregnancyHistorySchema.safeParse({ maternalAge: 70 })
      expect(result2.success).toBe(false)

      const result3 = pregnancyHistorySchema.safeParse({ maternalAge: 30 })
      expect(result3.success).toBe(true)
    })

    it('should reject negative prenatal consultations', () => {
      const result = pregnancyHistorySchema.safeParse({ prenatalConsultations: -1 })
      expect(result.success).toBe(false)
    })

    it('should accept zero prenatal consultations', () => {
      const result = pregnancyHistorySchema.safeParse({ prenatalConsultations: 0 })
      expect(result.success).toBe(true)
    })

    it('should require description if complications is sim', () => {
      const result = pregnancyHistorySchema.safeParse({ pregnancyComplications: 'sim' })
      expect(result.success).toBe(false)

      const result2 = pregnancyHistorySchema.safeParse({
        pregnancyComplications: 'sim',
        pregnancyComplicationsDescription: 'Hipertensão',
      })
      expect(result2.success).toBe(true)
    })

    it('should require description if infections is sim', () => {
      const result = pregnancyHistorySchema.safeParse({ infections: 'sim' })
      expect(result.success).toBe(false)
      const result2 = pregnancyHistorySchema.safeParse({
        infections: 'sim',
        infectionsDescription: 'Zika',
      })
      expect(result2.success).toBe(true)
    })

    it('should require description if medications is sim', () => {
      const result = pregnancyHistorySchema.safeParse({ medications: 'sim' })
      expect(result.success).toBe(false)
      const result2 = pregnancyHistorySchema.safeParse({
        medications: 'sim',
        medicationsDescription: 'Paracetamol',
      })
      expect(result2.success).toBe(true)
    })

    it('should require description if otherSubstances is sim', () => {
      const result = pregnancyHistorySchema.safeParse({ otherSubstances: 'sim' })
      expect(result.success).toBe(false)
      const result2 = pregnancyHistorySchema.safeParse({
        otherSubstances: 'sim',
        otherSubstancesDescription: 'Drogas ilícitas',
      })
      expect(result2.success).toBe(true)
    })

    it('should require description if hospitalizations is sim', () => {
      const result = pregnancyHistorySchema.safeParse({ hospitalizations: 'sim' })
      expect(result.success).toBe(false)
      const result2 = pregnancyHistorySchema.safeParse({
        hospitalizations: 'sim',
        hospitalizationsDescription: 'Motivo',
      })
      expect(result2.success).toBe(true)
    })

    it('should require description if alteredExams is sim', () => {
      const result = pregnancyHistorySchema.safeParse({ alteredExams: 'sim' })
      expect(result.success).toBe(false)
      const result2 = pregnancyHistorySchema.safeParse({
        alteredExams: 'sim',
        alteredExamsDescription: 'Ultrasom alterado',
      })
      expect(result2.success).toBe(true)
    })
  })

  describe('birthHistorySchema', () => {
    it('should validate apgar limits', () => {
      const result1 = birthHistorySchema.safeParse({ apgar1: -1 })
      expect(result1.success).toBe(false)

      const result2 = birthHistorySchema.safeParse({ apgar5: 11 })
      expect(result2.success).toBe(false)

      const result3 = birthHistorySchema.safeParse({ apgar1: 8, apgar5: 9 })
      expect(result3.success).toBe(true)
    })

    it('should reject negative or zero birth measurements', () => {
      expect(birthHistorySchema.safeParse({ birthWeight: -100 }).success).toBe(false)
      expect(birthHistorySchema.safeParse({ birthWeight: 0 }).success).toBe(false)
      expect(birthHistorySchema.safeParse({ birthLength: -10 }).success).toBe(false)
      expect(birthHistorySchema.safeParse({ headCircumference: -5 }).success).toBe(false)
      expect(birthHistorySchema.safeParse({ birthWeight: 3000 }).success).toBe(true)
    })

    it('should reject gestational age out of bounds', () => {
      expect(birthHistorySchema.safeParse({ gestationalAgeWeeks: 10 }).success).toBe(false) // min 20
      expect(birthHistorySchema.safeParse({ gestationalAgeWeeks: 50 }).success).toBe(false) // max 45
      expect(birthHistorySchema.safeParse({ gestationalAgeWeeks: 38 }).success).toBe(true)
    })

    it('should require description if deliveryType is outro', () => {
      expect(birthHistorySchema.safeParse({ deliveryType: 'outro' }).success).toBe(false)
      expect(
        birthHistorySchema.safeParse({ deliveryType: 'outro', deliveryTypeOther: 'Domiciliar' })
          .success,
      ).toBe(true)
    })

    it('should require nicuDurationAndReason if nicuAdmission is sim', () => {
      expect(birthHistorySchema.safeParse({ nicuAdmission: 'sim' }).success).toBe(false)
      expect(
        birthHistorySchema.safeParse({
          nicuAdmission: 'sim',
          nicuDurationAndReason: '3 dias por desconforto respiratório',
        }).success,
      ).toBe(true)
    })

    it('should allow optional fields not informed', () => {
      expect(birthHistorySchema.safeParse({}).success).toBe(true)
      expect(birthHistorySchema.safeParse({ prematurity: 'não informado' }).success).toBe(true)
    })
  })

  describe('neonatalHistorySchema', () => {
    it('should require description if tubeFeeding is sim', () => {
      expect(neonatalHistorySchema.safeParse({ tubeFeeding: 'sim' }).success).toBe(false)
      expect(
        neonatalHistorySchema.safeParse({
          tubeFeeding: 'sim',
          tubeTypeAndDuration: 'Orogástrica por 5 dias',
        }).success,
      ).toBe(true)
    })

    it('should require description if neonatalInfections is sim', () => {
      expect(neonatalHistorySchema.safeParse({ neonatalInfections: 'sim' }).success).toBe(false)
      expect(
        neonatalHistorySchema.safeParse({
          neonatalInfections: 'sim',
          neonatalInfectionsDescription: 'Sepse precoce',
        }).success,
      ).toBe(true)
    })

    it('should require description if seizures is sim', () => {
      expect(neonatalHistorySchema.safeParse({ seizures: 'sim' }).success).toBe(false)
      expect(
        neonatalHistorySchema.safeParse({
          seizures: 'sim',
          seizuresFrequencyAndConduct: '2x, phenobarbital',
        }).success,
      ).toBe(true)
    })

    it('should allow failed or inconclusive hearing screening without specific schema requirement', () => {
      // The schema doesn't strictly force description for failed, but component does show it
      expect(neonatalHistorySchema.safeParse({ newbornHearingScreening: 'falhou' }).success).toBe(
        true,
      )
      expect(
        neonatalHistorySchema.safeParse({ newbornHearingScreening: 'inconclusivo' }).success,
      ).toBe(true)
    })

    it('should allow tongue tie test results', () => {
      expect(
        neonatalHistorySchema.safeParse({
          tongueTieTest: 'alterado',
          tongueTieTestResult: 'Frenotomia realizada',
        }).success,
      ).toBe(true)
    })

    it('should allow not informed when expected', () => {
      expect(
        neonatalHistorySchema.safeParse({
          jaundice: 'não informado',
          newbornHearingScreening: 'não informado',
        }).success,
      ).toBe(true)
    })
  })
})
