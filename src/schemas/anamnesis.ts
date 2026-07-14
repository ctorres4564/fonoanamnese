import { z } from 'zod';

// Base Schema
export const anamnesisSchema = z.object({
  id: z.string().optional(),
  patientId: z.string(),
  professionalId: z.string(),
  status: z.enum(['draft', 'in_progress', 'review', 'finalized', 'corrected', 'archived'] as const),
  
  // Progressão
  currentSection: z.enum(['identification', 'clinical_history', 'development', 'social_history', 'other'] as const),
  completedSections: z.array(z.string()),
  completionPercentage: z.number().min(0).max(100),
  
  // Versionamento
  version: z.number().int().positive(),
  
  // Dados flexíveis por seção (schema a ser detalhado posteriormente)
  sections: z.record(z.string(), z.any()).optional(),

  isArchived: z.boolean().default(false),
  
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  finalizedAt: z.date().optional(),
  createdBy: z.string(),
  updatedBy: z.string(),
});

// Create
export const createAnamnesisSchema = z.object({
  patientId: z.string().min(1, "Paciente é obrigatório"),
  professionalId: z.string().min(1, "Profissional é obrigatório")
});

// Update (Partial)
export const updateAnamnesisSchema = z.object({
  status: z.enum(['draft', 'in_progress', 'review', 'finalized', 'corrected', 'archived'] as const).optional(),
  currentSection: z.enum(['identification', 'clinical_history', 'development', 'social_history', 'other'] as const).optional(),
  completedSections: z.array(z.string()).optional(),
  completionPercentage: z.number().min(0).max(100).optional(),
  sections: z.record(z.string(), z.any()).optional(),
});

// Update Progress
export const updateAnamnesisProgressSchema = z.object({
  currentSection: z.enum(['identification', 'clinical_history', 'development', 'social_history', 'other'] as const),
  completedSections: z.array(z.string()),
  completionPercentage: z.number().min(0).max(100),
});

// Change Status
export const changeAnamnesisStatusSchema = z.object({
  status: z.enum(['draft', 'in_progress', 'review', 'finalized', 'corrected', 'archived'] as const),
});

export type UpdateAnamnesisData = z.infer<typeof updateAnamnesisSchema>;

// AnamnesisVersion Schema
export const createAnamnesisVersionSchema = z.object({
  anamnesisId: z.string(),
  version: z.number().int().positive(),
  patientId: z.string(),
  professionalId: z.string(),
  status: z.enum(['draft', 'in_progress', 'review', 'finalized', 'corrected', 'archived'] as const),
  data: z.record(z.string(), z.any()), // omitindo id, mas gravando o restante
  changeDescription: z.string().optional(),
});
