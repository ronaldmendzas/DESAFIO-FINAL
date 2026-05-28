import { useState } from 'react'
import type { RootResult } from '@/types/roots'
import type { RootsFormData } from '@/hooks/roots-schema'
import { bisection } from '@/algorithms/roots/bisection'
import { newtonRaphson } from '@/algorithms/roots/newton-raphson'
import { secant } from '@/algorithms/roots/secant'

type UseRootsReturn = {
  results: RootResult[]
  isCalculating: boolean
  error: string | null
  calculate: (data: RootsFormData) => void
  reset: () => void
}

export function useRoots(): UseRootsReturn {
  const [results, setResults] = useState<RootResult[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculate = (data: RootsFormData) => {
    setIsCalculating(true)
    setError(null)

    try {
      let result: RootResult

      switch (data.method) {
        case 'bisection':
          if (data.a === undefined || data.b === undefined) {
            throw new Error('Bisección requiere intervalo [a, b]')
          }
          result = bisection(data.fExpression, data.a, data.b, data.tolerance, data.maxIterations)
          break

        case 'newton-raphson':
          if (data.x0 === undefined) {
            throw new Error('Newton-Raphson requiere valor inicial x0')
          }
          if (!data.fPrimeExpression) {
            throw new Error('Newton-Raphson requiere la derivada f\'(x)')
          }
          result = newtonRaphson(data.fExpression, data.fPrimeExpression, data.x0, data.tolerance, data.maxIterations)
          break

        case 'secant':
          if (data.x0 === undefined || data.x1 === undefined) {
            throw new Error('Secante requiere dos valores iniciales x0 y x1')
          }
          result = secant(data.fExpression, data.x0, data.x1, data.tolerance, data.maxIterations)
          break

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