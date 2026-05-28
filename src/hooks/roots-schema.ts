import { z } from 'zod'

export const rootsSchema = z.object({
  fExpression: z.string().min(1, 'Ingrese una función'),
  fPrimeExpression: z.string().optional(),
  a: z.number().optional(),
  b: z.number().optional(),
  x0: z.number().optional(),
  x1: z.number().optional(),
  tolerance: z.number().min(1e-15).max(1).default(1e-6),
  maxIterations: z.number().min(1).max(10000).default(100),
  method: z.enum(['bisection', 'newton-raphson', 'secant']),
})

export type RootsFormData = z.infer<typeof rootsSchema>