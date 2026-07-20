import { z } from 'zod'
export const familyHistorySchema = z.object({ speechHearingLearningDifficulties: z.string().optional(), neurologicalPsychiatricConditions: z.string().optional() })
