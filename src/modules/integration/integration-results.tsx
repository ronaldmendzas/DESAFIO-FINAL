import { motion } from 'motion/react'
import type { IntegrationResult } from '@/types/integration'
import { ResultCard } from '@/components/shared/result-card'
import { IterationTable } from '@/components/shared/iteration-table'
import { InterpretationCard } from '@/components/shared/interpretation-card'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { CheckCircle, Clock, Target, Ruler } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { compile } from 'mathjs'

const FORMULAS: Record<string, string> = {
  trapezoidal: '\\int_a^b f(x)\\,dx \\approx \\frac{h}{2} \\left[ f(a) + 2\\sum_{i=1}^{n-1} f(x_i) + f(b) \\right]',
  'simpson-1-3': '\\int_a^b f(x)\\,dx \\approx \\frac{h}{3} \\left[ f(a) + 4\\sum_{\\text{odd}} f(x_i) + 2\\sum_{\\text{even}} f(x_i) + f(b) \\right]',
  'simpson-3-8': '\\int_a^b f(x)\\,dx \\approx \\frac{3h}{8} \\left[ f(a) + 3\\sum_{i \\not\\equiv 0 \\pmod{3}} f(x_i) + 2\\sum_{i \\equiv 0 \\pmod{3}} f(x_i) + f(b) \\right]',
}

const METHOD_NAMES: Record<string, string> = {
  trapezoidal: 'Trapecio',
  'simpson-1-3': 'Simpson 1/3',
  'simpson-3-8': 'Simpson 3/8',
}

type Props = {
  results: IntegrationResult[]
  fExpression: string
  a: number
  b: number
}

function generateAreaData(fExpression: string, a: number, b: number) {
  try {
    const fn = compile(fExpression)
    const points = []
    const n = 100
    const h = (b - a) / n
    for (let i = 0; i <= n; i++) {
      const x = a + i * h
      try {
        const y = fn.evaluate({ x })
        if (Number.isFinite(y) && Math.abs(y) < 1e6) {
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

export function IntegrationResults({ results, fExpression, a, b }: Props) {
  if (results.length === 0) return null

  const areaData = generateAreaData(fExpression, a, b)

  return (
    <div className="space-y-12">
      {results.map((result, idx) => (
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
            <ResultCard label="Integral" value={result.result} icon={Target} decimals={6} highlight />
            <ResultCard label="h" value={result.h} icon={Ruler} decimals={6} />
            <ResultCard label="n" value={result.iterations.length - 1} icon={Target} decimals={0} />
            <ResultCard label="Tiempo" value={result.executionTime} icon={Clock} decimals={3} suffix="ms" />
          </div>

          {areaData.length > 0 && (
            <div>
              <p className="text-[11px] text-text-dim mb-2">Área bajo la curva</p>
              <div className="border border-border rounded-lg p-3">
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={areaData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <XAxis dataKey="x" stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} />
                    <YAxis stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', fontFamily: 'Geist Mono', fontSize: 11, color: '#111111' }} />
                    <Area type="monotone" dataKey="y" stroke="#01231C" fill="#E6F0EB" strokeWidth={1.5} name="f(x)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {result.iterations.length > 0 && (
            <IterationTable
              headers={[
                { key: 'step', label: 'i' },
                { key: 'x', label: 'x' },
                { key: 'fx', label: 'f(x)' },
                { key: 'accumulated', label: 'Acumulado' },
              ]}
              rows={result.iterations.slice(0, 20).map((iter) => ({
                step: iter.step,
                x: parseFloat(iter.x.toFixed(6)),
                fx: parseFloat(iter.fx.toFixed(6)),
                accumulated: parseFloat(iter.accumulated.toFixed(6)),
              }))}
            />
          )}

          <InterpretationCard
            title="Interpretación"
            variant="success"
            description={
              `${METHOD_NAMES[result.method]} calculó la integral de f(x) = ${fExpression} en [${a}, ${b}] con h = ${result.h.toFixed(6)} y n = ${result.iterations.length - 1} subintervalos. El resultado ${result.result.toFixed(6)} representa el costo acumulado o área bajo la curva de precios en el intervalo dado.`
            }
          />

          <div className="border-t border-border" />
        </motion.div>
      ))}

      {results.length > 1 && (
        <div>
          <p className="text-[11px] text-text-dim mb-2">Comparación de métodos</p>
          <div className="border border-border rounded-lg p-3">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={areaData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <XAxis dataKey="x" stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} />
                <YAxis stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', fontFamily: 'Geist Mono', fontSize: 11, color: '#111111' }} />
                <Legend />
                <Area type="monotone" dataKey="y" stroke="#01231C" fill="#E6F0EB" strokeWidth={1.5} name="f(x)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}