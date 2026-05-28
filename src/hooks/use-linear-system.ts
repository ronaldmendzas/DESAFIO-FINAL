import { useState } from 'react'
import type { LinearSystemResult } from '@/types/linear-systems'
import type { LinearSystemFormData } from '@/hooks/linear-system-schema'
import { jacobi } from '@/algorithms/linear-systems/jacobi'
import { gaussSeidel } from '@/algorithms/linear-systems/gauss-seidel'
import { sor } from '@/algorithms/linear-systems/sor'
import { luDecomposition } from '@/algorithms/linear-systems/lu'
import { conjugateGradient } from '@/algorithms/linear-systems/conjugate-gradient'

type UseLinearSystemReturn = {
  results: LinearSystemResult[]
  isCalculating: boolean
  error: string | null
  calculate: (data: LinearSystemFormData) => void
  reset: () => void
}

export function useLinearSystem(): UseLinearSystemReturn {
  const [results, setResults] = useState<LinearSystemResult[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculate = (data: LinearSystemFormData) => {
    setIsCalculating(true)
    setError(null)

    try {
      const { matrix, vector, initialVector, tolerance, maxIterations, method, omega } = data
      const x0 = initialVector || vector.map(() => 0)
      let result: LinearSystemResult

      switch (method) {
        case 'jacobi':
          result = jacobi(matrix, vector, x0, tolerance, maxIterations)
          break
        case 'gauss-seidel':
          result = gaussSeidel(matrix, vector, x0, tolerance, maxIterations)
          break
        case 'sor':
          result = sor(matrix, vector, x0, omega || 1.5, tolerance, maxIterations)
          break
        case 'lu':
          result = luDecomposition(matrix, vector)
          break
        case 'conjugate-gradient':
          result = conjugateGradient(matrix, vector, x0, tolerance, maxIterations)
          break
        default:
          throw new Error(`Método no reconocido: ${method}`)
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