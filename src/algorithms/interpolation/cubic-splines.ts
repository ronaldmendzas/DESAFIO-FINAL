import type { DataPoint } from '@/types/interpolation'

type SplineCoeff = { a: number; b: number; c: number; d: number }

export function cubicSplines(points: DataPoint[], evaluateAt: number): { result: number; curvePoints: DataPoint[]; steps: { step: number; value: number }[]; splineCoefficients: SplineCoeff[] } {
  const n = points.length - 1
  const sortedPoints = [...points].sort((a, b) => a.x - b.x)

  const h: number[] = []
  for (let i = 0; i < n; i++) {
    h.push(sortedPoints[i + 1].x - sortedPoints[i].x)
  }

  const alpha: number[] = [0]
  for (let i = 1; i < n; i++) {
    alpha.push(
      (3 / h[i]) * (sortedPoints[i + 1].y - sortedPoints[i].y) -
      (3 / h[i - 1]) * (sortedPoints[i].y - sortedPoints[i - 1].y)
    )
  }

  const l: number[] = [1]
  const mu: number[] = [0]
  const z: number[] = [0]

  for (let i = 1; i < n; i++) {
    l.push(2 * (sortedPoints[i + 1].x - sortedPoints[i - 1].x) - h[i - 1] * mu[i - 1])
    mu.push(h[i] / l[i])
    z.push((alpha[i] - h[i - 1] * z[i - 1]) / l[i])
  }

  l.push(1)
  mu.push(0)
  z.push(0)

  const c: number[] = Array(n + 1).fill(0)
  const b: number[] = Array(n).fill(0)
  const d: number[] = Array(n).fill(0)

  for (let j = n - 1; j >= 0; j--) {
    c[j] = z[j] - mu[j] * c[j + 1]
    b[j] = (sortedPoints[j + 1].y - sortedPoints[j].y) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3
    d[j] = (c[j + 1] - c[j]) / (3 * h[j])
  }

  const coefficients: SplineCoeff[] = []
  for (let i = 0; i < n; i++) {
    coefficients.push({
      a: sortedPoints[i].y,
      b: b[i],
      c: c[i],
      d: d[i],
    })
  }

  let intervalIndex = 0
  for (let i = 0; i < n; i++) {
    if (evaluateAt >= sortedPoints[i].x) {
      intervalIndex = i
    }
  }
  if (evaluateAt > sortedPoints[n].x) intervalIndex = n - 1

  const s = coefficients[intervalIndex]
  const dx = evaluateAt - sortedPoints[intervalIndex].x
  const result = s.a + s.b * dx + s.c * dx * dx + s.d * dx * dx * dx

  const steps: { step: number; value: number }[] = []
  for (let i = 0; i < n; i++) {
    const sCoeff = coefficients[i]
    const dxEval = evaluateAt - sortedPoints[i].x
    const val = sCoeff.a + sCoeff.b * dxEval + sCoeff.c * dxEval * dxEval + sCoeff.d * dxEval * dxEval * dxEval
    steps.push({ step: i + 1, value: val })
  }

  const xMin = sortedPoints[0].x
  const xMax = sortedPoints[n].x
  const range = xMax - xMin
  const curvePoints: DataPoint[] = []
  const curveStep = range / 200
  for (let x = xMin - range * 0.05; x <= xMax + range * 0.05; x += curveStep) {
    let idx = 0
    for (let i = 0; i < n; i++) {
      if (x >= sortedPoints[i].x) idx = i
    }
    if (x > sortedPoints[n].x) idx = n - 1
    if (x < sortedPoints[0].x) idx = 0
    const sc = coefficients[idx]
    const dxC = x - sortedPoints[idx].x
    const y = sc.a + sc.b * dxC + sc.c * dxC * dxC + sc.d * dxC * dxC * dxC
    curvePoints.push({ x: parseFloat(x.toFixed(4)), y: parseFloat(y.toFixed(6)) })
  }

  return { result, curvePoints, steps, splineCoefficients: coefficients }
}