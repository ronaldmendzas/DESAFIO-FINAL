import type { LinearSystemResult } from '@/types/linear-systems'

function calculateNorm(v: number[]): number {
  return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0))
}

function subtractVectors(a: number[], b: number[]): number[] {
  return a.map((val, i) => val - b[i])
}

export function jacobi(
  matrix: number[][],
  vector: number[],
  initialVector: number[],
  tolerance: number,
  maxIterations: number,
): LinearSystemResult {
  const n = matrix.length
  let x = [...initialVector]
  const iterations: LinearSystemResult['iterations'] = []
  const start = performance.now()

  for (let k = 0; k < maxIterations; k++) {
    const xNew = new Array(n).fill(0)

    for (let i = 0; i < n; i++) {
      let sum = 0
      for (let j = 0; j < n; j++) {
        if (j !== i) sum += matrix[i][j] * x[j]
      }
      xNew[i] = (vector[i] - sum) / matrix[i][i]
    }

    const error = calculateNorm(subtractVectors(xNew, x))
    x = xNew

    iterations.push({
      iteration: k + 1,
      values: [...x],
      error,
    })

    if (error < tolerance) {
      return {
        method: 'jacobi',
        result: x,
        iterations,
        converged: true,
        executionTime: performance.now() - start,
      }
    }
  }

  return {
    method: 'jacobi',
    result: x,
    iterations,
    converged: false,
    executionTime: performance.now() - start,
  }
}