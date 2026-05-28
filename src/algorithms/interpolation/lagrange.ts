import type { DataPoint } from '@/types/interpolation'

export function lagrange(points: DataPoint[], evaluateAt: number): { result: number; curvePoints: DataPoint[]; steps: { step: number; value: number }[] } {
  const n = points.length
  let result = 0
  const steps: { step: number; value: number }[] = []

  for (let i = 0; i < n; i++) {
    let term = points[i].y
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        term *= (evaluateAt - points[j].x) / (points[i].x - points[j].x)
      }
    }
    result += term
    steps.push({ step: i + 1, value: result })
  }

  const xMin = Math.min(...points.map(p => p.x))
  const xMax = Math.max(...points.map(p => p.x))
  const range = xMax - xMin
  const curvePoints: DataPoint[] = []
  const step = range / 200
  for (let x = xMin - range * 0.1; x <= xMax + range * 0.1; x += step) {
    let y = 0
    for (let i = 0; i < n; i++) {
      let term = points[i].y
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          term *= (x - points[j].x) / (points[i].x - points[j].x)
        }
      }
      y += term
    }
    curvePoints.push({ x: parseFloat(x.toFixed(4)), y: parseFloat(y.toFixed(6)) })
  }

  return { result, curvePoints, steps }
}