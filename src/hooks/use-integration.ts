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

    try {
      if (data.a >= data.b) {
        throw new Error('El límite inferior (a) debe ser menor que el superior (b).')
      }
      if (data.n < 1) {
        throw new Error('El número de subintervalos (n) debe ser al menos 1.')
      }
      if (data.method === 'simpson-1-3' && data.n % 2 !== 0) {
        throw new Error('Simpson 1/3 requiere un número par de subintervalos.')
      }
      if (data.method === 'simpson-3-8' && data.n % 3 !== 0) {
        throw new Error('Simpson 3/8 requiere un número de subintervalos múltiplo de 3.')
      }

      const start = performance.now()
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