import { compile } from 'mathjs'

export function simpson38(fExpression: string, a: number, b: number, n: number): { result: number; iterations: { step: number; x: number; fx: number; accumulated: number }[]; h: number } {
  const fn = compile(fExpression)

  const mult3 = n % 3 !== 0 ? n + (3 - (n % 3)) : n
  const h = (b - a) / mult3
  const iterations: { step: number; x: number; fx: number; accumulated: number }[] = []

  let sum = 0
  let accumulated = 0

  for (let i = 0; i <= mult3; i++) {
    const x = a + i * h
    const fx = fn.evaluate({ x })

    if (i === 0 || i === mult3) {
      sum += fx
    } else if (i % 3 === 0) {
      sum += 2 * fx
    } else {
      sum += 3 * fx
    }

    accumulated = (3 * h / 8) * sum
    iterations.push({ step: i, x, fx, accumulated })
  }

  const result = (3 * h / 8) * sum

  return { result, iterations, h }
}