import { z } from 'zod'

export const editUserSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'O e-mail é obrigatório'),
  username: z.string().min(1, 'O nome de usuário é obrigatório'),
  password: z
    .string()
    .min(6, 'A senha deve ter ao menos 6 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/\d/, 'A senha deve conter pelo menos um número'),
  firstname: z.string().min(1, 'O nome é obrigatório'),
  lastname: z.string().min(1, 'O sobrenome é obrigatório'),
  city: z.string().min(1, 'A cidade é obrigatória'),
  street: z.string().min(1, 'A rua é obrigatória'),
  number: z.string(),
  zipcode: z
    .string()
    .min(1, 'O CEP é obrigatório')
    .regex(/^\d+$/, 'O CEP deve conter apenas números'),
  lat: z.string().min(1, 'A latitude é obrigatória'),
  long: z.string().min(1, 'A longitude é obrigatória'),
  phone: z
    .string()
    .min(1, 'O telefone é obrigatório')
    .regex(/^\d+$/, 'O telefone deve conter apenas números'),
})
