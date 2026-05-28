export type LinearSystemMethod = 'jacobi' | 'gauss-seidel' | 'sor' | 'lu' | 'conjugate-gradient'

export type LinearSystemParams = {
  matrix: number[][]
  vector: number[]
  initialVector?: number[]
  tolerance: number
  maxIterations: number
  method: LinearSystemMethod
  omega?: number
}

export type LinearSystemResult = {
  method: LinearSystemMethod
  result: number[]
  iterations: { iteration: number; values: number[]; error: number }[]
  converged: boolean
  executionTime: number
  decomposition?: { L: number[][]; U: number[][] }
}