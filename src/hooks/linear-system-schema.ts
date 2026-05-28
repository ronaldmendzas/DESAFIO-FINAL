import { z } from 'zod'

export const linearSystemSchema = z.object({
  matrix: z.array(z.array(z.number())).min(1).max(10),
  vector: z.array(z.number()).min(1).max(10),
  initialVector: z.array(z.number()).optional(),
  tolerance: z.number().min(1e-15).max(1).default(1e-6),
  maxIterations: z.number().min(1).max(10000).default(100),
  method: z.enum(['jacobi', 'gauss-seidel', 'sor', 'lu', 'conjugate-gradient']),
  omega: z.number().min(0.1).max(2.0).optional(),
})

export type LinearSystemFormData = z.infer<typeof linearSystemSchema>