import { z } from 'zod';

// Update Progress
export const updateAnamnesisProgressSchema = z.object({
  currentSection: z.string(),
  completedSections: z.array(z.string()),
  completionPercentage: z.number().min(0).max(100),
});

// Partial updates para Firebase (rascunho livre de validação restrita)
export const updateAnamnesisSchema = z.object({
  status: z.enum(['draft', 'in_progress', 'review', 'finalized', 'corrected', 'archived'] as const).optional(),
  currentSection: z.string().optional(),
  completedSections: z.array(z.string()).optional(),
  completionPercentage: z.number().min(0).max(100).optional(),
  sections: z.object({
    interviewData: z.any().optional(),
    chiefComplaint: z.any().optional(),
    pregnancyBirthNeonatal: z.any().optional(),
    motorDevelopment: z.any().optional(),
  }).optional(),
});

export type UpdateAnamnesisData = z.infer<typeof updateAnamnesisSchema>;

// Create
export const createAnamnesisSchema = z.object({
  patientId: z.string().min(1, "Paciente é obrigatório"),
  professionalId: z.string().min(1, "Profissional é obrigatório")
});

// Change Status
export const changeAnamnesisStatusSchema = z.object({
  status: z.enum(['draft', 'in_progress', 'review', 'finalized', 'corrected', 'archived'] as const),
});

// AnamnesisVersion Schema
export const createAnamnesisVersionSchema = z.object({
  anamnesisId: z.string(),
  version: z.number().int().positive(),
  patientId: z.string(),
  professionalId: z.string(),
  status: z.enum(['draft', 'in_progress', 'review', 'finalized', 'corrected', 'archived'] as const),
  data: z.record(z.string(), z.any()), 
  changeDescription: z.string().optional(),
});
