import { motion } from 'motion/react'
import type { LinearSystemResult } from '@/types/linear-systems'
import { ResultCard } from '@/components/shared/result-card'
import { IterationTable } from '@/components/shared/iteration-table'
import { InterpretationCard } from '@/components/shared/interpretation-card'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { CheckCircle, XCircle, Hash, Clock } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'
import { ChartWrapper, CHART_COLORS, AXIS_TICK, TOOLTIP_STYLE } from '@/components/shared/chart-wrapper'

const FORMULAS: Record<string, string> = {
  jacobi: 'x_i^{(k+1)} = \\frac{1}{a_{ii}} \\left( b_i - \\sum_{j \\neq i} a_{ij} x_j^{(k)} \\right)',
  'gauss-seidel': 'x_i^{(k+1)} = \\frac{1}{a_{ii}} \\left( b_i - \\sum_{j < i} a_{ij} x_j^{(k+1)} - \\sum_{j > i} a_{ij} x_j^{(k)} \\right)',
  sor: 'x_i^{(k+1)} = (1 - \\omega) x_i^{(k)} + \\frac{\\omega}{a_{ii}} \\left( b_i - \\sum_{j < i} a_{ij} x_j^{(k+1)} - \\sum_{j > i} a_{ij} x_j^{(k)} \\right)',
  lu: 'A = LU, \\quad Ly = b, \\quad Ux = y',
  'conjugate-gradient': 'x_{k+1} = x_k + \\alpha_k p_k, \\quad p_{k+1} = r_{k+1} + \\beta_k p_k',
}

const METHOD_NAMES: Record<string, string> = {
  jacobi: 'Jacobi',
  'gauss-seidel': 'Gauss-Seidel',
  sor: 'SOR',
  lu: 'Descomposición LU',
  'conjugate-gradient': 'Gradiente Conjugado',
}

type Props = {
  results: LinearSystemResult[]
}

export function LinearSystemsResults({ results }: Props) {
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
            {result.converged ? (
              <span className="text-[11px] text-forest flex items-center gap-1"><CheckCircle className="w-3 h-3" /> convergió</span>
            ) : (
              <span className="text-[11px] text-red flex items-center gap-1"><XCircle className="w-3 h-3" /> no convergió</span>
            )}
          </div>

          <FormulaDisplay latex={FORMULAS[result.method] || ''} label={METHOD_NAMES[result.method]} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1">
            {result.result.map((val, i) => (
              <ResultCard key={i} label={`x${i + 1}`} value={val} decimals={6} highlight={idx === 0} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-x-6 gap-y-1">
            <ResultCard label="Iteraciones" value={result.iterations.length} icon={Hash} decimals={0} />
            <ResultCard label="Tiempo" value={result.executionTime} icon={Clock} decimals={3} suffix="ms" />
          </div>

          {result.decomposition && (
            <div>
              <p className="text-[11px] text-text-dim mb-2">Descomposición LU</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-border rounded-lg p-3">
                  <p className="text-[10px] text-text-dim mb-1.5">L</p>
                  <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${result.result.length}, minmax(40px, 1fr))` }}>
                    {result.decomposition.L.flat().map((val, i) => (
                      <span key={i} className="font-mono text-[11px] text-text-secondary text-center">{val.toFixed(3)}</span>
                    ))}
                  </div>
                </div>
                <div className="border border-border rounded-lg p-3">
                  <p className="text-[10px] text-text-dim mb-1.5">U</p>
                  <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${result.result.length}, minmax(40px, 1fr))` }}>
                    {result.decomposition.U.flat().map((val, i) => (
                      <span key={i} className="font-mono text-[11px] text-text-secondary text-center">{val.toFixed(3)}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {result.iterations.length > 1 && (
            <div>
              <p className="text-[11px] text-text-dim mb-2">Convergencia</p>
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

          {result.iterations.length > 0 && (
            <IterationTable
              headers={[
                { key: 'iteration', label: '#' },
                ...result.result.map((_, i) => ({ key: `x${i + 1}`, label: `x${i + 1}` })),
                { key: 'error', label: 'error' },
              ]}
              rows={result.iterations.map((iter) => ({
                iteration: iter.iteration,
                ...result.result.reduce((acc, _, i) => ({ ...acc, [`x${i + 1}`]: iter.values[i] }), {}),
                error: iter.error,
              }))}
            />
          )}

          <InterpretationCard
            title="Interpretación"
            variant={result.converged ? 'success' : 'warning'}
            description={
              result.method === 'lu'
                ? `${METHOD_NAMES[result.method]} descompuso la matriz A en L (triangular inferior) y U (triangular superior), luego resolvió Ly = b por sustitución hacia adelante y Ux = y por sustitución regresiva. Al ser un método directo, no requiere iteraciones: la solución es exacta (salvo redondeo). Los valores de x representan las cantidades a distribuir a cada zona. ${result.decomposition ? 'Las matrices L y U se muestran arriba.' : ''}`
                : result.converged
                  ? `${METHOD_NAMES[result.method]} convergió en ${result.iterations.length} iteraciones (error: ${result.iterations[result.iterations.length - 1]?.error.toExponential(4)}). Los valores de x indican las cantidades a distribuir a cada zona.`
                  : result.iterations.length < 3
                    ? `${METHOD_NAMES[result.method]} divergió rápidamente. La matriz no es diagonal dominante — los métodos iterativos no garantizan convergencia. Use LU o cambie los datos para que cada fila tenga el mayor coeficiente en la diagonal.`
                    : `${METHOD_NAMES[result.method]} no convergió en ${result.iterations.length} iteraciones. Pruebe con otro método, ajuste la tolerancia, o verifique que la matriz sea diagonal dominante.`
            }
          />

          <div className="border-t border-border" />
        </motion.div>
      ))}

      {results.length > 1 && (
        <div>
          <p className="text-[11px] text-text-dim mb-2">Comparación</p>
          <ChartWrapper height={280}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis dataKey="iteration" stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} type="number" allowDuplicatedCategory={false} />
              <YAxis stroke="#E0E0E0" tick={AXIS_TICK} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend />
              {results.map((r, i) => {
                const colors = [CHART_COLORS.primary, CHART_COLORS.amber, CHART_COLORS.purple, CHART_COLORS.red, '#555555']
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