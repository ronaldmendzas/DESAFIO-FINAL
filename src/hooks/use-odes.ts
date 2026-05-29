import { useState } from 'react'
import type { OdeResult } from '@/types/odes'
import { euler } from '@/algorithms/odes/euler'
import { heun } from '@/algorithms/odes/heun'
import { rk4 } from '@/algorithms/odes/rk4'

type UseOdesReturn = {
  results: OdeResult[]
  isCalculating: boolean
  error: string | null
  calculate: (data: {
    fExpression: string
    t0: number
    y0: number
    tFinal: number
    h: number
    method: 'euler' | 'heun' | 'rk4'
  }) => void
  reset: () => void
}

export function useOdes(): UseOdesReturn {
  const [results, setResults] = useState<OdeResult[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculate = (data: {
    fExpression: string
    t0: number
    y0: number
    tFinal: number
    h: number
    method: 'euler' | 'heun' | 'rk4'
  }) => {
    setIsCalculating(true)
    setError(null)

    try {
      if (data.h <= 0) {
        throw new Error('El tamaño de paso (h) debe ser mayor a 0.')
      }
      if (data.tFinal <= data.t0) {
        throw new Error('El tiempo final debe ser mayor que el tiempo inicial.')
      }
      if ((data.tFinal - data.t0) / data.h > 10000) {
        throw new Error('Demasiados pasos. Reduzca el intervalo o aumente h.')
      }

      const start = performance.now()
      let result: OdeResult

      switch (data.method) {
        case 'euler': {
          const res = euler(data.fExpression, data.t0, data.y0, data.tFinal, data.h)
          result = {
            method: 'euler',
            tValues: res.tValues,
            yValues: [res.yValues],
            iterations: res.iterations.map(it => ({ step: it.step, t: it.t, y: [it.y] })),
            converged: true,
            executionTime: performance.now() - start,
          }
          break
        }
        case 'heun': {
          const res = heun(data.fExpression, data.t0, data.y0, data.tFinal, data.h)
          result = {
            method: 'heun',
            tValues: res.tValues,
            yValues: [res.yValues],
            iterations: res.iterations.map(it => ({ step: it.step, t: it.t, y: [it.y] })),
            converged: true,
            executionTime: performance.now() - start,
          }
          break
        }
        case 'rk4': {
          const res = rk4(data.fExpression, data.t0, data.y0, data.tFinal, data.h)
          result = {
            method: 'rk4',
            tValues: res.tValues,
            yValues: [res.yValues],
            iterations: res.iterations.map(it => ({ step: it.step, t: it.t, y: [it.y] })),
            converged: true,
            executionTime: performance.now() - start,
          }
          break
        }
        default:
          throw new Error(`Método no reconocido: ${data.method}`)
      }

      setResults(prev => [...prev.slice(-2), result])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsCalculating(false)
    }
  }

  const reset = () => {
    setResults([])
    setError(null)
  }

  return { results, isCalculating, error, calculate, reset }
}