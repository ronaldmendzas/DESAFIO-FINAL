import { motion } from 'motion/react'
import type { InterpolationResult } from '@/types/interpolation'
import { ResultCard } from '@/components/shared/result-card'
import { InterpretationCard } from '@/components/shared/interpretation-card'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { CheckCircle, Clock, Target } from 'lucide-react'
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Scatter,
} from 'recharts'
import { ChartWrapper, CHART_COLORS, AXIS_TICK, TOOLTIP_STYLE } from '@/components/shared/chart-wrapper'

const FORMULAS: Record<string, string> = {
  lagrange: 'P(x) = \\sum_{i=0}^{n} y_i \\prod_{j \\neq i} \\frac{x - x_j}{x_i - x_j}',
  newton: 'P(x) = f[x_0] + f[x_0, x_1](x - x_0) + f[x_0, x_1, x_2](x - x_0)(x - x_1) + \\cdots',
  'cubic-splines': 'S_i(x) = a_i + b_i(x - x_i) + c_i(x - x_i)^2 + d_i(x - x_i)^3',
}

const METHOD_NAMES: Record<string, string> = {
  lagrange: 'Lagrange',
  newton: 'Newton',
  'cubic-splines': 'Splines Cúbicos',
}

type Props = {
  results: InterpolationResult[]
  points: { x: number; y: number }[]
}

export function InterpolationResults({ results, points }: Props) {
  if (results.length === 0) return null

  return (
    <div className="space-y-12">
      {results.map((result, idx) => (
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
            <ResultCard label="f(x)" value={result.result} icon={Target} decimals={6} highlight />
            <ResultCard label="Puntos" value={points.length} icon={Target} decimals={0} />
            <ResultCard label="Tiempo" value={result.executionTime} icon={Clock} decimals={3} suffix="ms" />
          </div>

          {result.curvePoints.length > 0 && (
            <div>
              <p className="text-[11px] text-text-dim mb-2">Curva de interpolación</p>
              <ChartWrapper height={280}>
                <ComposedChart margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                  <XAxis dataKey="x" stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} type="number" />
                  <YAxis dataKey="y" stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} type="number" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Line type="monotone" dataKey="y" data={result.curvePoints} stroke={CHART_COLORS.primary} strokeWidth={2} dot={false} name="Curva interpolada" animationDuration={800} activeDot={{ r: 4, fill: CHART_COLORS.primary, stroke: '#fff', strokeWidth: 2 }} />
                  <Scatter name="Datos originales" data={points} fill={CHART_COLORS.amber} r={4} />
                  <Legend />
                </ComposedChart>
              </ChartWrapper>
            </div>
          )}

          {result.dividedDifferences && (
            <div>
              <p className="text-[11px] text-text-dim mb-2">Diferencias divididas</p>
              <div className="border border-border rounded-lg p-3 overflow-x-auto">
                <table className="text-[11px] font-mono">
                  <thead>
                    <tr>
                      <th className="px-2 py-1 text-text-dim text-left">i</th>
                      {result.dividedDifferences[0].map((_, j) => (
                        <th key={j} className="px-2 py-1 text-text-dim text-right">f[0...{j}]</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.dividedDifferences.map((row, i) => (
                      <tr key={i} className="border-t border-border/50">
                        <td className="px-2 py-1 text-text-secondary">{i}</td>
                        {row.map((val, j) => (
                          <td key={j} className="px-2 py-1 text-right text-text">{val.toFixed(4)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {result.splineCoefficients && (
            <div>
              <p className="text-[11px] text-text-dim mb-2">Coeficientes de los splines</p>
              <div className="border border-border rounded-lg p-3 overflow-x-auto">
                <table className="text-[11px] font-mono w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="px-2 py-1 text-text-dim text-left">Intervalo</th>
                      <th className="px-2 py-1 text-text-dim text-right">a</th>
                      <th className="px-2 py-1 text-text-dim text-right">b</th>
                      <th className="px-2 py-1 text-text-dim text-right">c</th>
                      <th className="px-2 py-1 text-text-dim text-right">d</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.splineCoefficients.map((coeff, i) => (
                      <tr key={i} className="border-t border-border/30">
                        <td className="px-2 py-1 text-text-secondary">S{i}</td>
                        <td className="px-2 py-1 text-right text-text">{coeff.a.toFixed(4)}</td>
                        <td className="px-2 py-1 text-right text-text">{coeff.b.toFixed(4)}</td>
                        <td className="px-2 py-1 text-right text-text">{coeff.c.toFixed(4)}</td>
                        <td className="px-2 py-1 text-right text-text">{coeff.d.toFixed(6)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <InterpretationCard
            title="Interpretación"
            variant="success"
            description={
              `${METHOD_NAMES[result.method]} evaluó f(${points[0]?.x ?? 'x'}) en los puntos dados. El valor interpolado es ${result.result.toFixed(6)}. En el contexto de precios, esto permite estimar el precio en días sin dato observado.`
            }
          />

          <div className="border-t border-border" />
        </motion.div>
      ))}

      {results.length > 1 && (
        <div>
          <p className="text-[11px] text-text-dim mb-2">Comparación de métodos</p>
          <ChartWrapper height={280}>
            <ComposedChart margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis dataKey="x" stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} type="number" />
              <YAxis dataKey="y" stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} type="number" />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend />
              {results.map((r, i) => {
                const colors = [CHART_COLORS.primary, CHART_COLORS.amber, CHART_COLORS.purple]
                return (
                  <Line key={i} type="monotone" dataKey="y" data={r.curvePoints} stroke={colors[i % colors.length]} strokeWidth={2} dot={false} name={METHOD_NAMES[r.method]} activeDot={{ r: 4, fill: colors[i % colors.length], stroke: '#fff', strokeWidth: 2 }} animationDuration={800} />
                )
              })}
              <Scatter name="Datos originales" data={points} fill={CHART_COLORS.red} r={4} />
            </ComposedChart>
          </ChartWrapper>
        </div>
      )}
    </div>
  )
}