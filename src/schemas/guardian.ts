import { z } from 'zod';
import { addressSchema } from './patient';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const guardianSchema = z.object({
  fullName: z.string().min(3, 'O nome completo é obrigatório e deve ter no mínimo 3 caracteres'),
  cpf: z.string().nullable().optional(),
  birthDate: z.string().nullable().optional().refine((dateString) => {
    if (!dateString) return true; // optional
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date <= today;
  }, 'A data de nascimento não pode ser no futuro'),
  relationship: z.string().min(1, 'Grau de parentesco é obrigatório'),
  phone: z.string().min(8, 'Telefone é obrigatório'),
  email: z.string().email('E-mail inválido').nullable().optional(),
  address: addressSchema.optional(),
  isLegalGuardian: z.boolean(),
  isPrimaryContact: z.boolean(),
  canReceiveInformation: z.boolean(),
  canAttendSessions: z.boolean(),
});

export type GuardianFormData = z.infer<typeof guardianSchema>;
