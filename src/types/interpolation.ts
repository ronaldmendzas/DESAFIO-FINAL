export type InterpolationMethod = 'lagrange' | 'newton' | 'cubic-splines'

export type DataPoint = {
  x: number
  y: number
}

export type InterpolationParams = {
  points: DataPoint[]
  evaluateAt: number
  method: InterpolationMethod
}

export type InterpolationResult = {
  method: InterpolationMethod
  result: number
  curvePoints: DataPoint[]
  iterations: { step: number; value: number }[]
  converged: boolean
  executionTime: number
  dividedDifferences?: number[][]
  splineCoefficients?: { a: number; b: number; c: number; d: number }[]
}