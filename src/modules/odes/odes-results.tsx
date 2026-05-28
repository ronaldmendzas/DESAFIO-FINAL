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
  ResponsiveContainer,
  Legend,
} from 'recharts'

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

  return (
    <div className="space-y-12">
      {results.map((result, idx) => {
        const chartData = result.tValues.map((t, i) => ({
          t: parseFloat(t.toFixed(4)),
          y: parseFloat(result.yValues[0][i].toFixed(6)),
        }))

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
                <div className="border border-border rounded-lg p-3">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <XAxis dataKey="t" stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} />
                      <YAxis stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', fontFamily: 'Geist Mono', fontSize: 11, color: '#111111' }} />
                      <Line type="monotone" dataKey="y" stroke="#01231C" strokeWidth={1.5} dot={false} name="y(t)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
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
          <div className="border border-border rounded-lg p-3">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <XAxis dataKey="t" stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} type="number" />
                <YAxis stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', fontFamily: 'Geist Mono', fontSize: 11, color: '#111111' }} />
                <Legend />
                {results.map((r, i) => {
                  const colors = ['#01231C', '#B8860B', '#663399']
                  const data = r.tValues.map((t, j) => ({
                    t: parseFloat(t.toFixed(4)),
                    y: parseFloat(r.yValues[0][j].toFixed(6)),
                  }))
                  return (
                    <Line key={i} data={data} type="monotone" dataKey="y" stroke={colors[i % colors.length]} strokeWidth={1.5} dot={false} name={METHOD_NAMES[r.method]} />
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