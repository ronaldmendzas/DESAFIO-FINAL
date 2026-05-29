import type { RootResult } from '@/types/roots'
import { evaluate } from 'mathjs'

export function secant(
  fExpr: string,
  x0: number,
  x1: number,
  tolerance: number,
  maxIterations: number,
): RootResult {
  const f = (x: number): number => evaluate(fExpr, { x })
  const iterations: RootResult['iterations'] = []
  const start = performance.now()

  for (let k = 0; k < maxIterations; k++) {
    const f0 = f(x0)
    const f1 = f(x1)

    if (Math.abs(f1 - f0) < 1e-15) {
      return {
        method: 'secant',
        result: x1,
        iterations,
        converged: false,
        executionTime: performance.now() - start,
      }
    }

    const x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
    const error = Math.abs(x2 - x1)

    iterations.push({
      iteration: k + 1,
      value: x2,
      fValue: f(x2),
      error,
    })

    if (!Number.isFinite(x2) || Math.abs(x2) > 1e12) {
      return {
        method: 'secant',
        result: NaN,
        iterations,
        converged: false,
        executionTime: performance.now() - start,
      }
    }

    if (error < tolerance || Math.abs(f(x2)) < tolerance) {
      return {
        method: 'secant',
        result: x2,
        iterations,
        converged: true,
        executionTime: performance.now() - start,
      }
    }

    x0 = x1
    x1 = x2
  }

  return {
    method: 'secant',
    result: x1,
    iterations,
    converged: false,
    executionTime: performance.now() - start,
  }
}