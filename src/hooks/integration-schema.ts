import { z } from 'zod'

export const integrationSchema = z.object({
  fExpression: z.string().min(1, 'Ingrese una función'),
  a: z.number(),
  b: z.number(),
  n: z.number().min(1).max(10000),
  method: z.enum(['trapezoidal', 'simpson-1-3', 'simpson-3-8']),
})

export type IntegrationFormData = z.infer<typeof integrationSchema>