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
      const n = matrix.length

      if (n === 0) {
        throw new Error('La matriz no puede estar vacía.')
      }
      for (const row of matrix) {
        if (row.length !== n) {
          throw new Error('La matriz debe ser cuadrada.')
        }
        if (row.some((v: number) => isNaN(v))) {
          throw new Error('Todos los valores de la matriz deben ser números válidos.')
        }
      }
      if (vector.length !== n) {
        throw new Error('El vector debe tener la misma dimensión que la matriz.')
      }
      if (vector.some((v: number) => isNaN(v))) {
        throw new Error('Todos los valores del vector deben ser números válidos.')
      }
      for (let i = 0; i < n; i++) {
        if (matrix[i][i] === 0 && method !== 'lu') {
          throw new Error('La diagonal de la matriz no puede contener ceros para métodos iterativos.')
        }
      }
      if (tolerance > 1) {
        throw new Error('La tolerancia debe ser menor a 1. Use valores como 0.000001.')
      }

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