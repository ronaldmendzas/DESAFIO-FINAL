import { compile } from 'mathjs'

export function rk4(fExpression: string, t0: number, y0: number, tFinal: number, h: number): { tValues: number[]; yValues: number[]; iterations: { step: number; t: number; y: number; fValue: number }[] } {
  const fn = compile(fExpression)
  const n = Math.ceil((tFinal - t0) / h)
  const tValues: number[] = [t0]
  const yValues: number[] = [y0]
  const iterations: { step: number; t: number; y: number; fValue: number }[] = []

  let t = t0
  let y = y0

  const fVal0 = fn.evaluate({ t, y }) as number
  iterations.push({ step: 0, t, y, fValue: fVal0 })

  for (let i = 1; i <= n; i++) {
    const k1 = h * (fn.evaluate({ t, y }) as number)
    const k2 = h * (fn.evaluate({ t: t + h / 2, y: y + k1 / 2 }) as number)
    const k3 = h * (fn.evaluate({ t: t + h / 2, y: y + k2 / 2 }) as number)
    const k4 = h * (fn.evaluate({ t: t + h, y: y + k3 }) as number)

    y = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6
    t = t0 + i * h

    tValues.push(parseFloat(t.toFixed(10)))
    yValues.push(parseFloat(y.toFixed(10)))

    const newFVal = fn.evaluate({ t, y }) as number
    iterations.push({ step: i, t, y, fValue: newFVal })
  }

  return { tValues, yValues, iterations }
}