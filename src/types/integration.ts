export type IntegrationMethod = 'trapezoidal' | 'simpson-1-3' | 'simpson-3-8'

export type IntegrationParams = {
  f: string
  a: number
  b: number
  n: number
  method: IntegrationMethod
}

export type IntegrationResult = {
  method: IntegrationMethod
  result: number
  iterations: { step: number; x: number; fx: number; accumulated: number }[]
  converged: boolean
  executionTime: number
  h: number
}