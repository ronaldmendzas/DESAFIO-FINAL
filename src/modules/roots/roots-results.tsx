import { useMemo } from 'react'
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
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
  ReferenceLine,
} from 'recharts'
import { ChartWrapper, CHART_COLORS, AXIS_TICK, TOOLTIP_STYLE } from '@/components/shared/chart-wrapper'
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

  const plotDataMap = useMemo(() => {
    const map = new Map<number, { x: number; y: number }[]>()
    results.forEach(r => {
      if (Number.isFinite(r.result)) {
        map.set(r.executionTime, generatePlotData(fExpression, r.result))
      }
    })
    return map
  }, [results, fExpression])

  return (
    <div className="space-y-12">
      {results.map((result, idx) => {
        const plotData = plotDataMap.get(result.executionTime) ?? []

        return (
          <motion.div
            key={result.method + '-' + result.executionTime}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
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

            {plotData.length > 0 && result.converged && (
              <div>
                <p className="text-[11px] text-text-dim mb-2">Gráfica de f(x)</p>
                <ChartWrapper height={280}>
                  <AreaChart data={plotData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.15} />
                        <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                    <XAxis dataKey="x" stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} />
                    <YAxis stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <ReferenceLine y={0} stroke={CHART_COLORS.red} strokeDasharray="4 4" strokeWidth={0.5} />
                    <Area type="monotone" dataKey="y" stroke={CHART_COLORS.primary} fill="url(#colorY)" strokeWidth={2} name="f(x)" animationDuration={800} />
                  </AreaChart>
                </ChartWrapper>
              </div>
            )}

            {result.iterations.length > 1 && result.converged && (
              <div>
                <p className="text-[11px] text-text-dim mb-2">Convergencia del error</p>
                <ChartWrapper height={280}>
                  <LineChart data={result.iterations}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                    <XAxis dataKey="iteration" stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} />
                    <YAxis stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Line type="monotone" dataKey="error" stroke={CHART_COLORS.primary} strokeWidth={2} dot={false} name="Error" activeDot={{ r: 4, fill: CHART_COLORS.primary, stroke: '#fff', strokeWidth: 2 }} animationDuration={800} />
                  </LineChart>
                </ChartWrapper>
              </div>
            )}

            {result.iterations.length > 0 && Number.isFinite(result.result) && (
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
                  : Number.isNaN(result.result) || result.iterations.length < 3
                    ? `${METHOD_NAMES[result.method]} divergió: los valores crecieron sin límite. Esto ocurre cuando el punto inicial está lejos de la raíz, la derivada se anula, o el intervalo no contiene un cambio de signo. Pruebe con otro método o cambie los valores iniciales.`
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
          <ChartWrapper height={280}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis dataKey="iteration" stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} type="number" allowDuplicatedCategory={false} />
              <YAxis stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend />
              {results.map((r, i) => {
                const colors = [CHART_COLORS.primary, CHART_COLORS.amber, CHART_COLORS.purple]
                return (
                  <Line key={i} data={r.iterations} type="monotone" dataKey="error" stroke={colors[i % colors.length]} strokeWidth={2} dot={false} name={METHOD_NAMES[r.method]} activeDot={{ r: 4, fill: colors[i % colors.length], stroke: '#fff', strokeWidth: 2 }} animationDuration={800} />
                )
              })}
            </LineChart>
          </ChartWrapper>
        </div>
      )}
    </div>
  )
}