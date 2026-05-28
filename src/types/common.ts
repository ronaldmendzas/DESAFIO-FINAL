export type IterationData = {
  iteration: number
  values: number[]
  error: number
}

export type AlgorithmResult<TResult extends number | number[]> = {
  method: string
  result: TResult
  iterations: IterationData[]
  converged: boolean
  executionTime: number
}