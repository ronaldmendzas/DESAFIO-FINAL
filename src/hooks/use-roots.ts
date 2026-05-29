import { useState } from 'react'
import { compile } from 'mathjs'
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

function validateExpression(expr: string): string | null {
  try {
    const fn = compile(expr)
    fn.evaluate({ x: 1 })
    return null
  } catch {
    return `La expresión no es válida. Use x como variable.`
  }
}

export function useRoots(): UseRootsReturn {
  const [results, setResults] = useState<RootResult[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculate = (data: RootsFormData) => {
    setIsCalculating(true)
    setError(null)

    try {
      if (isNaN(data.tolerance) || data.tolerance <= 0) {
        throw new Error('La tolerancia debe ser un número positivo mayor a 0.')
      }
      if (data.tolerance > 1) {
        throw new Error('La tolerancia debe ser menor a 1. Use valores como 0.000001 o 0.01.')
      }
      if (isNaN(data.maxIterations) || data.maxIterations < 1) {
        throw new Error('Las iteraciones máximas deben ser al menos 1.')
      }
      if (data.maxIterations > 10000) {
        throw new Error('Las iteraciones máximas no pueden exceder 10000.')
      }

      const exprError = validateExpression(data.fExpression)
      if (exprError) throw new Error(exprError)

      let result: RootResult

      switch (data.method) {
        case 'bisection': {
          if (data.a === undefined || data.b === undefined) {
            throw new Error('Bisección requiere intervalo [a, b]')
          }
          if (data.a >= data.b) {
            throw new Error('El límite inferior (a) debe ser menor que el superior (b).')
          }
          result = bisection(data.fExpression, data.a, data.b, data.tolerance, data.maxIterations)
          if (!result.converged && result.iterations.length === 0) {
            throw new Error('f(a) y f(b) tienen el mismo signo en el intervalo. Bisección requiere un cambio de signo. Pruebe con otro intervalo o use Newton-Raphson/Secante.')
          }
          break
        }

        case 'newton-raphson': {
          if (data.x0 === undefined || isNaN(data.x0)) {
            throw new Error('Newton-Raphson requiere un valor inicial x₀ válido.')
          }
          if (!data.fPrimeExpression) {
            throw new Error('Newton-Raphson requiere la derivada f\'(x)')
          }
          const primeError = validateExpression(data.fPrimeExpression)
          if (primeError) throw new Error('La derivada no es válida. Use x como variable.')
          result = newtonRaphson(data.fExpression, data.fPrimeExpression, data.x0, data.tolerance, data.maxIterations)
          if (!result.converged && Number.isNaN(result.result)) {
            throw new Error('Newton-Raphson divergió desde x₀. Pruebe con un valor inicial más cercano a la raíz o cambie de método.')
          }
          break
        }

        case 'secant': {
          if (data.x0 === undefined || data.x1 === undefined) {
            throw new Error('Secante requiere dos valores iniciales x₀ y x₁')
          }
          if (data.x0 === data.x1) {
            throw new Error('Los puntos iniciales x₀ y x₁ deben ser diferentes.')
          }
          result = secant(data.fExpression, data.x0, data.x1, data.tolerance, data.maxIterations)
          if (!result.converged && Number.isNaN(result.result)) {
            throw new Error('Secante divergió. Pruebe con puntos iniciales más cercanos a la raíz.')
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