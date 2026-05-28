import { motion } from 'motion/react'
import type { RootResult } from '@/types/roots'
import { ResultCard } from '@/components/shared/result-card'
import { IterationTable } from '@/components/shared/iteration-table'
import { InterpretationCard } from '@/components/shared/interpretation-card'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { CheckCircle, XCircle, Hash, Clock, Target } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { compile } from 'mathjs'

const FORMULAS: Record<string, string> = {
  bisection: 'x_{k+1} = \\frac{a_k + b_k}{2}, \\quad \\text{si } f(a_k)f(x_{k+1}) < 0 \\Rightarrow b_{k+1} = x_{k+1}',
  'newton-raphson': 'x_{k+1} = x_k - \\frac{f(x_k)}{f\'(x_k)}',
  secant: 'x_{k+1} = x_k - \\frac{f(x_k)(x_k - x_{k-1})}{f(x_k) - f(x_{k-1})}',
}

const METHOD_NAMES: Record<string, string> = {
  bisection: 'Bisección',
  'newton-raphson': 'Newton-Raphson',
  secant: 'Secante',
}

type Props = {
  results: RootResult[]
  fExpression: string
}

function generatePlotData(fExpression: string, root: number) {
  try {
    const fn = compile(fExpression)
    const range = Math.max(Math.abs(root) * 2, 5)
    const min = root - range
    const max = root + range
    const points = []
    const step = (max - min) / 200
    for (let x = min; x <= max; x += step) {
      try {
        const y = fn.evaluate({ x })
        if (Number.isFinite(y) && Math.abs(y) < 1000) {
          points.push({ x: parseFloat(x.toFixed(4)), y: parseFloat(y.toFixed(6)) })
        }
      } catch {
        continue
      }
    }
    return points
  } catch {
    return []
  }
}

export function RootsResults({ results, fExpression }: Props) {
  if (results.length === 0) return null

  return (
    <div className="space-y-12">
      {results.map((result, idx) => {
        const plotData = generatePlotData(fExpression, result.result)

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-medium text-text">
                {METHOD_NAMES[result.method]}
              </h3>
              {result.converged ? (
                <span className="text-[11px] text-forest flex items-center gap-1"><CheckCircle className="w-3 h-3" /> convergió</span>
              ) : (
                <span className="text-[11px] text-red flex items-center gap-1"><XCircle className="w-3 h-3" /> no convergió</span>
              )}
            </div>

            <FormulaDisplay latex={FORMULAS[result.method] || ''} label={METHOD_NAMES[result.method]} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1">
              <ResultCard label="Raíz" value={result.result} icon={Target} highlight />
              <ResultCard label="f(raíz)" value={result.iterations[result.iterations.length - 1]?.fValue ?? 0} icon={Hash} decimals={8} />
              <ResultCard label="Iteraciones" value={result.iterations.length} icon={Hash} decimals={0} />
              <ResultCard label="Tiempo" value={result.executionTime} icon={Clock} decimals={3} suffix="ms" />
            </div>

            {plotData.length > 0 && (
              <div>
                <p className="text-[11px] text-text-dim mb-2">Gráfica de f(x)</p>
                <div className="border border-border rounded-lg p-3">
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={plotData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <XAxis dataKey="x" stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} />
                      <YAxis stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', fontFamily: 'Geist Mono', fontSize: 11, color: '#111111' }} />
                      <Line type="monotone" dataKey="y" stroke="#01231C" strokeWidth={1.5} dot={false} name="f(x)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {result.iterations.length > 1 && (
              <div>
                <p className="text-[11px] text-text-dim mb-2">Convergencia del error</p>
                <div className="border border-border rounded-lg p-3">
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={result.iterations}>
                      <XAxis dataKey="iteration" stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} />
                      <YAxis stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', fontFamily: 'Geist Mono', fontSize: 11, color: '#111111' }} />
                      <Line type="monotone" dataKey="error" stroke="#01231C" strokeWidth={1.5} dot={false} name="Error" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {result.iterations.length > 0 && (
              <IterationTable
                headers={[
                  { key: 'iteration', label: '#' },
                  { key: 'value', label: 'x' },
                  { key: 'fValue', label: 'f(x)' },
                  { key: 'error', label: 'error' },
                ]}
                rows={result.iterations.map((iter) => ({
                  iteration: iter.iteration,
                  value: iter.value,
                  fValue: iter.fValue,
                  error: iter.error,
                }))}
              />
            )}

            <InterpretationCard
              title="Interpretación"
              variant={result.converged ? 'success' : 'warning'}
              description={
                result.converged
                  ? `${METHOD_NAMES[result.method]} encontró la raíz x = ${result.result.toFixed(6)} en ${result.iterations.length} iteraciones con error de ${result.iterations[result.iterations.length - 1]?.error.toExponential(4)}. En el contexto de abastecimiento, esta raíz representa el punto de equilibrio donde la oferta y demanda se igualan.`
                  : `${METHOD_NAMES[result.method]} no convergió en ${result.iterations.length} iteraciones. Pruebe con otro método, un intervalo diferente o ajuste la tolerancia.`
              }
            />

            <div className="border-t border-border" />
          </motion.div>
        )
      })}

      {results.length > 1 && (
        <div>
          <p className="text-[11px] text-text-dim mb-2">Comparación de métodos</p>
          <div className="border border-border rounded-lg p-3">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart>
                <XAxis dataKey="iteration" stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} type="number" allowDuplicatedCategory={false} />
                <YAxis stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', fontFamily: 'Geist Mono', fontSize: 11, color: '#111111' }} />
                <Legend />
                {results.map((r, i) => {
                  const colors = ['#01231C', '#B8860B', '#663399']
                  return (
                    <Line key={i} data={r.iterations} type="monotone" dataKey="error" stroke={colors[i % colors.length]} strokeWidth={1.5} dot={false} name={METHOD_NAMES[r.method]} />
                  )
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}