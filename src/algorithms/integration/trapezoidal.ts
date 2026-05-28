import { compile } from 'mathjs'

export function trapezoidal(fExpression: string, a: number, b: number, n: number): { result: number; iterations: { step: number; x: number; fx: number; accumulated: number }[]; h: number } {
  const fn = compile(fExpression)
  const h = (b - a) / n
  const iterations: { step: number; x: number; fx: number; accumulated: number }[] = []

  let sum = 0
  let accumulated = 0

  for (let i = 0; i <= n; i++) {
    const x = a + i * h
    const fx = fn.evaluate({ x })

    if (i === 0 || i === n) {
      sum += fx
      accumulated += fx * h
    } else {
      sum += 2 * fx
      accumulated += fx * h
    }

    iterations.push({ step: i, x, fx, accumulated })
  }

  const result = (h / 2) * sum

  return { result, iterations, h }
}