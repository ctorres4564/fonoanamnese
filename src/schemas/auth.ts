import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('Formato de e-mail inválido'),
})

export const professionalProfileSchema = z.object({
  fullName: z.string().min(3, 'Nome completo é obrigatório'),
  professionalName: z.string().min(2, 'Nome profissional é obrigatório'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, 'CPF inválido'),
  crefonoNumber: z.string().min(4, 'Número do CREFONO é obrigatório'),
  crefonoState: z.string().length(2, 'UF do CREFONO inválida'),
  phone: z.string().min(10, 'Telefone inválido'),
})

export type LoginFormInputs = z.infer<typeof loginSchema>
export type RegisterFormInputs = z.infer<typeof registerSchema>
export type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordSchema>
export type ProfessionalProfileFormInputs = z.infer<typeof professionalProfileSchema>
