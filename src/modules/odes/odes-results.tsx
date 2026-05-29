import { useMemo } from 'react'
import { motion } from 'motion/react'
import type { OdeResult } from '@/types/odes'
import { ResultCard } from '@/components/shared/result-card'
import { IterationTable } from '@/components/shared/iteration-table'
import { InterpretationCard } from '@/components/shared/interpretation-card'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { CheckCircle, Clock, Target } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceDot,
} from 'recharts'
import { ChartWrapper, CHART_COLORS, AXIS_TICK, TOOLTIP_STYLE } from '@/components/shared/chart-wrapper'

const FORMULAS: Record<string, string> = {
  euler: 'y_{n+1} = y_n + h \\cdot f(t_n, y_n)',
  heun: 'y_{n+1} = y_n + \\frac{h}{2}[f(t_n, y_n) + f(t_{n+1}, y_n + h \\cdot f(t_n, y_n))]',
  rk4: 'y_{n+1} = y_n + \\frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)',
}

const METHOD_NAMES: Record<string, string> = {
  euler: 'Euler',
  heun: 'Heun',
  rk4: 'Runge-Kutta 4',
}

type Props = {
  results: OdeResult[]
}

export function OdesResults({ results }: Props) {
  if (results.length === 0) return null

  const chartsDataMap = useMemo(() => {
    const map = new Map<number, { t: number; y: number }[]>()
    results.forEach(r => {
      map.set(r.executionTime, r.tValues.map((t, i) => ({
        t: parseFloat(t.toFixed(4)),
        y: parseFloat(r.yValues[0][i].toFixed(6)),
      })))
    })
    return map
  }, [results])

  return (
    <div className="space-y-12">
      {results.map((result, idx) => {
        const chartData = chartsDataMap.get(result.executionTime) ?? []
        const finalPoint = chartData[chartData.length - 1]

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
              <span className="text-[11px] text-forest flex items-center gap-1"><CheckCircle className="w-3 h-3" /> calculado</span>
            </div>

            <FormulaDisplay latex={FORMULAS[result.method] || ''} label={METHOD_NAMES[result.method]} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1">
              <ResultCard label="y final" value={result.yValues[0][result.yValues[0].length - 1]} icon={Target} decimals={6} highlight />
              <ResultCard label="Pasos" value={result.tValues.length - 1} icon={Target} decimals={0} />
              <ResultCard label="h" value={result.tValues[1] - result.tValues[0]} icon={Target} decimals={4} />
              <ResultCard label="Tiempo" value={result.executionTime} icon={Clock} decimals={3} suffix="ms" />
            </div>

            {chartData.length > 0 && (
              <div>
                <p className="text-[11px] text-text-dim mb-2">Solución y(t)</p>
                <ChartWrapper height={280}>
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                    <XAxis dataKey="t" stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} />
                    <YAxis stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <ReferenceDot x={finalPoint?.t} y={finalPoint?.y} r={4} fill={CHART_COLORS.primary} stroke="#fff" strokeWidth={2} />
                    <Line type="monotone" dataKey="y" stroke={CHART_COLORS.primary} strokeWidth={2} dot={false} name="y(t)" activeDot={{ r: 4, fill: CHART_COLORS.primary, stroke: '#fff', strokeWidth: 2 }} animationDuration={800} />
                  </LineChart>
                </ChartWrapper>
              </div>
            )}

            {result.iterations.length > 0 && (
              <IterationTable
                headers={[
                  { key: 'step', label: 'i' },
                  { key: 't', label: 't' },
                  { key: 'y', label: 'y' },
                  { key: 'fValue', label: "f(t,y)" },
                ]}
                rows={result.iterations.slice(0, 25).map((iter) => ({
                  step: iter.step,
                  t: parseFloat(iter.t.toFixed(6)),
                  y: parseFloat(iter.y[0].toFixed(6)),
                  fValue: (iter as { step: number; t: number; y: number[]; fValue: number }).fValue ?? parseFloat(iter.y[0].toFixed(6)),
                }))}
              />
            )}

            <InterpretationCard
              title="Interpretación"
              variant="success"
              description={
                `${METHOD_NAMES[result.method]} resolvió la EDO en ${result.tValues.length - 1} pasos. El valor final y = ${result.yValues[0][result.yValues[0].length - 1].toFixed(6)} en t = ${result.tValues[result.tValues.length - 1].toFixed(4)}. En el contexto de reservas, esto modela cómo un recurso escaso evoluciona en el tiempo.`
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
            <LineChart margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis dataKey="t" stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} type="number" />
              <YAxis stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend />
              {results.map((r, i) => {
                const colors = [CHART_COLORS.primary, CHART_COLORS.amber, CHART_COLORS.purple]
                const dashPatterns = ['', '8 4', '4 4']
                const data = r.tValues.map((t, j) => ({
                  t: parseFloat(t.toFixed(4)),
                  y: parseFloat(r.yValues[0][j].toFixed(6)),
                }))
                return (
                  <Line key={i} data={data} type="monotone" dataKey="y" stroke={colors[i % colors.length]} strokeWidth={2} strokeDasharray={dashPatterns[i]} dot={false} name={METHOD_NAMES[r.method]} activeDot={{ r: 4, fill: colors[i % colors.length], stroke: '#fff', strokeWidth: 2 }} animationDuration={800} />
                )
              })}
            </LineChart>
          </ChartWrapper>
        </div>
      )}
    </div>
  )
}