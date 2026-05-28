import { compile } from 'mathjs'

export function simpson13(fExpression: string, a: number, b: number, n: number): { result: number; iterations: { step: number; x: number; fx: number; accumulated: number }[]; h: number } {
  const fn = compile(fExpression)

  const evenN = n % 2 !== 0 ? n + 1 : n
  const h = (b - a) / evenN
  const iterations: { step: number; x: number; fx: number; accumulated: number }[] = []

  let sum = 0
  let accumulated = 0

  for (let i = 0; i <= evenN; i++) {
    const x = a + i * h
    const fx = fn.evaluate({ x })

    if (i === 0 || i === evenN) {
      sum += fx
    } else if (i % 2 === 1) {
      sum += 4 * fx
    } else {
      sum += 2 * fx
    }

    accumulated = (h / 3) * sum
    iterations.push({ step: i, x, fx, accumulated })
  }

  const result = (h / 3) * sum

  return { result, iterations, h }
}