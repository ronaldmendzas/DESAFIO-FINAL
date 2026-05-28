import type { RootResult } from '@/types/roots'
import { evaluate } from 'mathjs'

export function bisection(
  fExpr: string,
  a: number,
  b: number,
  tolerance: number,
  maxIterations: number,
): RootResult {
  const f = (x: number): number => evaluate(fExpr, { x })
  const iterations: RootResult['iterations'] = []
  const start = performance.now()

  const fa = f(a)
  const fb = f(b)

  if (fa * fb >= 0) {
    return {
      method: 'bisection',
      result: NaN,
      iterations: [],
      converged: false,
      executionTime: performance.now() - start,
    }
  }

  for (let k = 0; k < maxIterations; k++) {
    const c = (a + b) / 2
    const fc = f(c)
    const error = (b - a) / 2

    iterations.push({
      iteration: k + 1,
      value: c,
      fValue: fc,
      error,
    })

    if (Math.abs(fc) < tolerance || error < tolerance) {
      return {
        method: 'bisection',
        result: c,
        iterations,
        converged: true,
        executionTime: performance.now() - start,
      }
    }

    if (fa * fc < 0) {
      b = c
    } else {
      a = c
    }
  }

  return {
    method: 'bisection',
    result: (a + b) / 2,
    iterations,
    converged: false,
    executionTime: performance.now() - start,
  }
}