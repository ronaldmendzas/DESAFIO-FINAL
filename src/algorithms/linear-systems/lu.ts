import type { LinearSystemResult } from '@/types/linear-systems'

function forwardSubstitution(L: number[][], b: number[]): number[] {
  const n = L.length
  const y = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    let sum = 0
    for (let j = 0; j < i; j++) {
      sum += L[i][j] * y[j]
    }
    y[i] = (b[i] - sum) / L[i][i]
  }
  return y
}

function backwardSubstitution(U: number[][], y: number[]): number[] {
  const n = U.length
  const x = new Array(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0
    for (let j = i + 1; j < n; j++) {
      sum += U[i][j] * x[j]
    }
    x[i] = (y[i] - sum) / U[i][i]
  }
  return x
}

export function luDecomposition(
  matrix: number[][],
  vector: number[],
): LinearSystemResult {
  const n = matrix.length
  const start = performance.now()

  const U = matrix.map(row => [...row])
  const L = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  )

  const P = Array.from({ length: n }, (_, i) => i)
  const permVector = [...vector]

  for (let k = 0; k < n; k++) {
    let maxVal = Math.abs(U[k][k])
    let maxRow = k
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(U[i][k]) > maxVal) {
        maxVal = Math.abs(U[i][k])
        maxRow = i
      }
    }

    if (maxRow !== k) {
      ;[U[k], U[maxRow]] = [U[maxRow], U[k]]
      ;[P[k], P[maxRow]] = [P[maxRow], P[k]]
      for (let j = 0; j < k; j++) {
        ;[L[k][j], L[maxRow][j]] = [L[maxRow][j], L[k][j]]
      }
      ;[permVector[k], permVector[maxRow]] = [permVector[maxRow], permVector[k]]
    }

    for (let i = k + 1; i < n; i++) {
      L[i][k] = U[i][k] / U[k][k]
      for (let j = k; j < n; j++) {
        U[i][j] -= L[i][k] * U[k][j]
      }
    }
  }

  const y = forwardSubstitution(L, permVector)
  const x = backwardSubstitution(U, y)

  const residual = vector.map((b, i) => {
    let sum = 0
    for (let j = 0; j < n; j++) {
      sum += matrix[i][j] * x[j]
    }
    return Math.abs(b - sum)
  })
  const error = Math.sqrt(residual.reduce((s, r) => s + r * r, 0))

  return {
    method: 'lu',
    result: x,
    iterations: [{ iteration: 1, values: x, error }],
    converged: true,
    executionTime: performance.now() - start,
    decomposition: { L, U },
  }
}