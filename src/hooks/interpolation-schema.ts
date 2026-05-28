import { z } from 'zod'

export const interpolationSchema = z.object({
  points: z.array(z.object({ x: z.number(), y: z.number() })).min(2, 'Ingrese al menos 2 puntos'),
  evaluateAt: z.number(),
  method: z.enum(['lagrange', 'newton', 'cubic-splines']),
})

export type InterpolationFormData = z.infer<typeof interpolationSchema>