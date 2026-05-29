import type { RootResult } from '@/types/roots'
import { evaluate } from 'mathjs'

export function newtonRaphson(
  fExpr: string,
  fPrimeExpr: string,
  x0: number,
  tolerance: number,
  maxIterations: number,
): RootResult {
  const f = (x: number): number => evaluate(fExpr, { x })
  const fPrime = (x: number): number => evaluate(fPrimeExpr, { x })
  const iterations: RootResult['iterations'] = []
  const start = performance.now()

  let x = x0

  for (let k = 0; k < maxIterations; k++) {
    const fx = f(x)
    const fpx = fPrime(x)

    if (Math.abs(fpx) < 1e-15) {
      return {
        method: 'newton-raphson',
        result: x,
        iterations,
        converged: false,
        executionTime: performance.now() - start,
      }
    }

    const xNew = x - fx / fpx
    const error = Math.abs(xNew - x)

    iterations.push({
      iteration: k + 1,
      value: xNew,
      fValue: f(xNew),
      error,
    })

    if (!Number.isFinite(xNew) || Math.abs(xNew) > 1e12) {
      return {
        method: 'newton-raphson',
        result: NaN,
        iterations,
        converged: false,
        executionTime: performance.now() - start,
      }
    }

    if (error < tolerance || Math.abs(f(xNew)) < tolerance) {
      return {
        method: 'newton-raphson',
        result: xNew,
        iterations,
        converged: true,
        executionTime: performance.now() - start,
      }
    }

    x = xNew
  }

  return {
    method: 'newton-raphson',
    result: x,
    iterations,
    converged: false,
    executionTime: performance.now() - start,
  }
}