import { z } from 'zod';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const addressSchema = z.object({
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

export const patientSchema = z.object({
  fullName: z.string().min(3, 'O nome completo é obrigatório e deve ter no mínimo 3 caracteres'),
  socialName: z.string().nullable().optional(),
  birthDate: z.string().refine((dateString) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date <= today;
  }, 'A data de nascimento não pode ser no futuro'),
  sexAtBirth: z.string().nullable().optional(),
  gender: z.string().nullable().optional(),
  cpf: z.string().nullable().optional(), // CPF opcional no MVP
  nationality: z.string().nullable().optional(),
  birthplace: z.string().nullable().optional(),
  address: addressSchema.optional(),
  phone: z.string().nullable().optional(),
  photoUrl: z.string().nullable().optional(),
  recordNumber: z.string().min(1, 'Número do prontuário é obrigatório'),
  status: z.enum(['evaluation', 'therapy', 'follow_up', 'discharged', 'inactive']),
  isArchived: z.boolean(),
});

export type PatientFormData = z.infer<typeof patientSchema>;
