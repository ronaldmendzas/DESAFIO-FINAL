import { compile } from 'mathjs'

export function euler(fExpression: string, t0: number, y0: number, tFinal: number, h: number): { tValues: number[]; yValues: number[]; iterations: { step: number; t: number; y: number; fValue: number }[] } {
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
    const fVal = fn.evaluate({ t, y }) as number
    y = y + h * fVal
    t = t0 + i * h

    tValues.push(parseFloat(t.toFixed(10)))
    yValues.push(parseFloat(y.toFixed(10)))

    const newFVal = fn.evaluate({ t, y }) as number
    iterations.push({ step: i, t, y, fValue: newFVal })
  }

  return { tValues, yValues, iterations }
}