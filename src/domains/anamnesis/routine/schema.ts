import { z } from 'zod'
export const childRoutineSchema = z.object({
  attendsSchool: z.enum(['sim', 'não', 'não informado']).optional(),
  schoolName: z.string().optional(),
  schoolYear: z.string().optional(),
  schoolPerformance: z.string().optional(),
  socialization: z.string().optional(),
  leisureAndPreferredPlay: z.string().optional(),
  feedingAndSleepRoutine: z.string().optional(),
  observations: z.string().optional(),
})
