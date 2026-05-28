import { useState } from 'react'
import type { IntegrationResult } from '@/types/integration'
import type { IntegrationFormData } from '@/hooks/integration-schema'
import { trapezoidal } from '@/algorithms/integration/trapezoidal'
import { simpson13 } from '@/algorithms/integration/simpson-1-3'
import { simpson38 } from '@/algorithms/integration/simpson-3-8'

type UseIntegrationReturn = {
  results: IntegrationResult[]
  isCalculating: boolean
  error: string | null
  calculate: (data: IntegrationFormData) => void
  reset: () => void
}

export function useIntegration(): UseIntegrationReturn {
  const [results, setResults] = useState<IntegrationResult[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculate = (data: IntegrationFormData) => {
    setIsCalculating(true)
    setError(null)

    const start = performance.now()

    try {
      let result: IntegrationResult

      switch (data.method) {
        case 'trapezoidal': {
          const res = trapezoidal(data.fExpression, data.a, data.b, data.n)
          result = {
            method: 'trapezoidal',
            result: res.result,
            iterations: res.iterations,
            converged: true,
            executionTime: performance.now() - start,
            h: res.h,
          }
          break
        }
        case 'simpson-1-3': {
          const res = simpson13(data.fExpression, data.a, data.b, data.n)
          result = {
            method: 'simpson-1-3',
            result: res.result,
            iterations: res.iterations,
            converged: true,
            executionTime: performance.now() - start,
            h: res.h,
          }
          break
        }
        case 'simpson-3-8': {
          const res = simpson38(data.fExpression, data.a, data.b, data.n)
          result = {
            method: 'simpson-3-8',
            result: res.result,
            iterations: res.iterations,
            converged: true,
            executionTime: performance.now() - start,
            h: res.h,
          }
          break
        }
        default:
          throw new Error(`Método no reconocido: ${data.method}`)
      }

      setResults(prev => [...prev, result])
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