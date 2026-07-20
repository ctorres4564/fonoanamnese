import { z } from 'zod'

export const healthHistorySchema = z.object({
  previousDiseasesHospitalizationsMedications: z.string().optional(),
  surgeriesTraumasAccidents: z.string().optional(),
  currentMedications: z.string().optional(),
})
