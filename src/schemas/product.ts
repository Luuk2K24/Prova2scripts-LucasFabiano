import { z } from 'zod'

export const editProductSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  price: z.number().min(1, 'O preço deve ser maior ou igual a 1'),
  description: z
    .string()
    .min(1, 'A descrição é obrigatória')
    .max(500, 'A descrição deve ter no máximo 500 caracteres'),
  category: z.string().min(1, 'A categoria é obrigatória'),
  image: z.string().url('A imagem deve ser uma URL válida'),
})
