export type OdeMethod = 'euler' | 'heun' | 'rk4'

export type OdeParams = {
  f: string
  t0: number
  y0: number
  tFinal: number
  h: number
  method: OdeMethod
}

export type OdeResult = {
  method: OdeMethod
  tValues: number[]
  yValues: number[][]
  iterations: { step: number; t: number; y: number[] }[]
  converged: boolean
  executionTime: number
}

export type ReservesParams = {
  supplyRate: string
  consumptionRate: string
  initialReserve: number
  criticalLevel: number
  t0: number
  tFinal: number
  h: number
  method: OdeMethod
}

export type SocialParams = {
  a: number
  b: number
  c: number
  k: number
  r: number
  N0: number
  M0: number
  D0: number
  t0: number
  tFinal: number
  h: number
  method: OdeMethod
}