import type { LinearSystemResult } from '@/types/linear-systems'

function dotProduct(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * b[i], 0)
}

function matrixVectorMult(A: number[][], v: number[]): number[] {
  return A.map(row => row.reduce((sum, val, j) => sum + val * v[j], 0))
}

function scalarVectorMult(s: number, v: number[]): number[] {
  return v.map(val => s * val)
}

function vectorAdd(a: number[], b: number[]): number[] {
  return a.map((val, i) => val + b[i])
}

function vectorSubtract(a: number[], b: number[]): number[] {
  return a.map((val, i) => val - b[i])
}

function calculateNorm(v: number[]): number {
  return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0))
}

function hasDiverged(x: number[]): boolean {
  return x.some(v => !Number.isFinite(v) || Math.abs(v) > 1e12)
}

export function conjugateGradient(
  matrix: number[][],
  vector: number[],
  initialVector: number[],
  tolerance: number,
  maxIterations: number,
): LinearSystemResult {
  let x = [...initialVector]
  const iterations: LinearSystemResult['iterations'] = []
  const start = performance.now()

  let r = vectorSubtract(vector, matrixVectorMult(matrix, x))
  let p = [...r]
  let rsOld = dotProduct(r, r)

  for (let k = 0; k < maxIterations; k++) {
    const Ap = matrixVectorMult(matrix, p)
    const alpha = rsOld / dotProduct(p, Ap)

    x = vectorAdd(x, scalarVectorMult(alpha, p))
    r = vectorSubtract(r, scalarVectorMult(alpha, Ap))

    const error = calculateNorm(r)

    iterations.push({
      iteration: k + 1,
      values: [...x],
      error,
    })

    if (hasDiverged(x) || !Number.isFinite(error)) {
      return {
        method: 'conjugate-gradient',
        result: x.map(v => Number.isFinite(v) ? v : NaN),
        iterations,
        converged: false,
        executionTime: performance.now() - start,
      }
    }

    if (error < tolerance) {
      return {
        method: 'conjugate-gradient',
        result: x,
        iterations,
        converged: true,
        executionTime: performance.now() - start,
      }
    }

    const rsNew = dotProduct(r, r)
    p = vectorAdd(r, scalarVectorMult(rsNew / rsOld, p))
    rsOld = rsNew
  }

  return {
    method: 'conjugate-gradient',
    result: x,
    iterations,
    converged: false,
    executionTime: performance.now() - start,
  }
}