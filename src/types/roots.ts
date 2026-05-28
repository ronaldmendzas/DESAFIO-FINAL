export type RootMethod = 'bisection' | 'newton-raphson' | 'secant'

export type RootParams = {
  f: string
  fPrime?: string
  a?: number
  b?: number
  x0?: number
  x1?: number
  tolerance: number
  maxIterations: number
  method: RootMethod
}

export type RootResult = {
  method: RootMethod
  result: number
  iterations: { iteration: number; value: number; fValue: number; error: number }[]
  converged: boolean
  executionTime: number
}