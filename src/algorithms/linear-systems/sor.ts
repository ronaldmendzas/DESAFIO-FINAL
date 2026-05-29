import type { LinearSystemResult } from '@/types/linear-systems'

function calculateNorm(v: number[]): number {
  return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0))
}

function subtractVectors(a: number[], b: number[]): number[] {
  return a.map((val, i) => val - b[i])
}

function hasDiverged(x: number[]): boolean {
  return x.some(v => !Number.isFinite(v) || Math.abs(v) > 1e12)
}

export function sor(
  matrix: number[][],
  vector: number[],
  initialVector: number[],
  omega: number,
  tolerance: number,
  maxIterations: number,
): LinearSystemResult {
  const n = matrix.length
  let x = [...initialVector]
  const iterations: LinearSystemResult['iterations'] = []
  const start = performance.now()

  for (let k = 0; k < maxIterations; k++) {
    const xOld = [...x]

    for (let i = 0; i < n; i++) {
      let sum = 0
      for (let j = 0; j < n; j++) {
        if (j !== i) sum += matrix[i][j] * x[j]
      }
      const xGs = (vector[i] - sum) / matrix[i][i]
      x[i] = (1 - omega) * x[i] + omega * xGs
    }

    const error = calculateNorm(subtractVectors(x, xOld))

    iterations.push({
      iteration: k + 1,
      values: [...x],
      error,
    })

    if (hasDiverged(x) || !Number.isFinite(error)) {
      return {
        method: 'sor',
        result: x.map(v => Number.isFinite(v) ? v : NaN),
        iterations,
        converged: false,
        executionTime: performance.now() - start,
      }
    }

    if (error < tolerance) {
      return {
        method: 'sor',
        result: [...x],
        iterations,
        converged: true,
        executionTime: performance.now() - start,
      }
    }
  }

  return {
    method: 'sor',
    result: [...x],
    iterations,
    converged: false,
    executionTime: performance.now() - start,
  }
}