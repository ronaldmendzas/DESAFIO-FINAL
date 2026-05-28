import { motion } from 'motion/react'
import type { InterpolationResult } from '@/types/interpolation'
import { ResultCard } from '@/components/shared/result-card'
import { InterpretationCard } from '@/components/shared/interpretation-card'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { CheckCircle, Clock, Target } from 'lucide-react'
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
} from 'recharts'

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
            <ResultCard label="f(x)" value={result.result} icon={Target} decimals={6} highlight />
            <ResultCard label="Puntos" value={points.length} icon={Target} decimals={0} />
            <ResultCard label="Tiempo" value={result.executionTime} icon={Clock} decimals={3} suffix="ms" />
          </div>

          {result.curvePoints.length > 0 && (
            <div>
              <p className="text-[11px] text-text-dim mb-2">Curva de interpolación</p>
              <div className="border border-border rounded-lg p-3">
                <ResponsiveContainer width="100%" height={250}>
                  <ScatterChart margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <XAxis dataKey="x" stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} type="number" />
                    <YAxis dataKey="y" stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} type="number" />
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', fontFamily: 'Geist Mono', fontSize: 11, color: '#111111' }} />
                    <Scatter name="Datos originales" data={points} fill="#B8860B" r={4} />
                    <Scatter name="Curva interpolada" data={result.curvePoints} fill="#01231C" r={1} />
                    <Legend />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
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
          <div className="border border-border rounded-lg p-3">
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <XAxis dataKey="x" stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} type="number" />
                <YAxis dataKey="y" stroke="#D0D0D0" tick={{ fill: '#888888', fontSize: 10, fontFamily: 'Geist Mono' }} type="number" />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', fontFamily: 'Geist Mono', fontSize: 11, color: '#111111' }} />
                <Legend />
                {results.map((r, i) => {
                  const colors = ['#01231C', '#B8860B', '#663399']
                  return (
                    <Scatter key={i} name={METHOD_NAMES[r.method]} data={r.curvePoints} fill={colors[i % colors.length]} r={1} />
                  )
                })}
                <Scatter name="Datos originales" data={points} fill="#C4342D" r={4} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}