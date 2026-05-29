import { useState } from 'react'
import type { InterpolationResult } from '@/types/interpolation'
import type { InterpolationFormData } from '@/hooks/interpolation-schema'
import { lagrange } from '@/algorithms/interpolation/lagrange'
import { newtonInterpolation } from '@/algorithms/interpolation/newton'
import { cubicSplines } from '@/algorithms/interpolation/cubic-splines'

type UseInterpolationReturn = {
  results: InterpolationResult[]
  isCalculating: boolean
  error: string | null
  calculate: (data: InterpolationFormData) => void
  reset: () => void
}

export function useInterpolation(): UseInterpolationReturn {
  const [results, setResults] = useState<InterpolationResult[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculate = (data: InterpolationFormData) => {
    setIsCalculating(true)
    setError(null)

    const start = performance.now()

    try {
      let result: InterpolationResult

      switch (data.method) {
        case 'lagrange': {
          const res = lagrange(data.points, data.evaluateAt)
          result = {
            method: 'lagrange',
            result: res.result,
            curvePoints: res.curvePoints,
            iterations: res.steps.map(s => ({ step: s.step, value: s.value, fValue: 0, error: 0 })),
            converged: true,
            executionTime: performance.now() - start,
          }
          break
        }
        case 'newton': {
          const res = newtonInterpolation(data.points, data.evaluateAt)
          result = {
            method: 'newton',
            result: res.result,
            curvePoints: res.curvePoints,
            iterations: res.steps.map(s => ({ step: s.step, value: s.value, fValue: 0, error: 0 })),
            converged: true,
            executionTime: performance.now() - start,
            dividedDifferences: res.dividedDifferences,
          }
          break
        }
        case 'cubic-splines': {
          const res = cubicSplines(data.points, data.evaluateAt)
          result = {
            method: 'cubic-splines',
            result: res.result,
            curvePoints: res.curvePoints,
            iterations: res.steps.map(s => ({ step: s.step, value: s.value, fValue: 0, error: 0 })),
            converged: true,
            executionTime: performance.now() - start,
            splineCoefficients: res.splineCoefficients,
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