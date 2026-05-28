import type { DataPoint } from '@/types/interpolation'

export function newtonInterpolation(points: DataPoint[], evaluateAt: number): { result: number; curvePoints: DataPoint[]; steps: { step: number; value: number }[]; dividedDifferences: number[][] } {
  const n = points.length
  const dd: number[][] = Array.from({ length: n }, () => Array(n).fill(0))

  for (let i = 0; i < n; i++) {
    dd[i][0] = points[i].y
  }

  for (let j = 1; j < n; j++) {
    for (let i = 0; i < n - j; i++) {
      dd[i][j] = (dd[i + 1][j - 1] - dd[i][j - 1]) / (points[i + j].x - points[i].x)
    }
  }

  let result = dd[0][0]
  const steps: { step: number; value: number }[] = [{ step: 1, value: result }]

  for (let k = 1; k < n; k++) {
    let product = 1
    for (let j = 0; j < k; j++) {
      product *= (evaluateAt - points[j].x)
    }
    result += dd[0][k] * product
    steps.push({ step: k + 1, value: result })
  }

  const xMin = Math.min(...points.map(p => p.x))
  const xMax = Math.max(...points.map(p => p.x))
  const range = xMax - xMin
  const curvePoints: DataPoint[] = []
  const step = range / 200
  for (let x = xMin - range * 0.1; x <= xMax + range * 0.1; x += step) {
    let y = dd[0][0]
    for (let k = 1; k < n; k++) {
      let product = 1
      for (let j = 0; j < k; j++) {
        product *= (x - points[j].x)
      }
      y += dd[0][k] * product
    }
    curvePoints.push({ x: parseFloat(x.toFixed(4)), y: parseFloat(y.toFixed(6)) })
  }

  return { result, curvePoints, steps, dividedDifferences: dd }
}