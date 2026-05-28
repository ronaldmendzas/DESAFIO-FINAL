import type { LinearSystemResult } from '@/types/linear-systems'
import { ResultCard } from '@/components/shared/result-card'
import { IterationTable } from '@/components/shared/iteration-table'
import { InterpretationCard } from '@/components/shared/interpretation-card'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Clock, Hash, CheckCircle, XCircle } from 'lucide-react'
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
    <div className="space-y-8">
      {results.map((result, idx) => (
        <div key={idx} className="space-y-6 animate-fade-up">
          <div className="flex items-center gap-3">
            <h3 className="font-mono text-[15px] font-semibold text-electric-cyan tracking-wide">
              {METHOD_NAMES[result.method] || result.method}
            </h3>
            <Badge
              variant={result.converged ? 'default' : 'destructive'}
              className={`font-mono text-[11px] ${
                result.converged
                  ? 'bg-neon-mint/10 text-neon-mint border-neon-mint/30'
                  : 'bg-signal-red/10 text-signal-red border-signal-red/30'
              }`}
            >
              {result.converged ? (
                <><CheckCircle className="w-3 h-3 mr-1" /> Convergió</>
              ) : (
                <><XCircle className="w-3 h-3 mr-1" /> No convergió</>
              )}
            </Badge>
          </div>

          <FormulaDisplay
            latex={FORMULAS[result.method] || ''}
            label={`Método: ${METHOD_NAMES[result.method]}`}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {result.result.map((val, i) => (
              <ResultCard
                key={i}
                label={`x${i + 1}`}
                value={val}
                variant="default"
                decimals={6}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ResultCard
              label="Iteraciones"
              value={result.iterations.length}
              icon={Hash}
              variant="default"
              decimals={0}
            />
            <ResultCard
              label="Tiempo"
              value={result.executionTime}
              icon={Clock}
              variant="default"
              decimals={3}
              suffix="ms"
            />
            <ResultCard
              label="Error final"
              value={result.iterations[result.iterations.length - 1]?.error ?? 0}
              icon={TrendingUp}
              variant="default"
            />
          </div>

          {result.decomposition && (
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium">
                Descomposición LU
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-void-black border border-subtle-edge rounded-lg p-4">
                  <p className="font-mono text-[11px] text-electric-cyan uppercase tracking-wider mb-2">L</p>
                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${result.result.length}, minmax(50px, 1fr))` }}>
                    {result.decomposition.L.map((row, i) =>
                      row.map((val, j) => (
                        <span key={`${i}-${j}`} className="font-mono text-[13px] text-center text-ghost-white">
                          {val.toFixed(4)}
                        </span>
                      ))
                    )}
                  </div>
                </div>
                <div className="bg-void-black border border-subtle-edge rounded-lg p-4">
                  <p className="font-mono text-[11px] text-electric-cyan uppercase tracking-wider mb-2">U</p>
                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${result.result.length}, minmax(50px, 1fr))` }}>
                    {result.decomposition.U.map((row, i) =>
                      row.map((val, j) => (
                        <span key={`${i}-${j}`} className="font-mono text-[13px] text-center text-ghost-white">
                          {val.toFixed(4)}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {result.iterations.length > 1 && (
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium">
                Convergencia
              </p>
              <div className="bg-void-black border border-subtle-edge rounded-lg p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={result.iterations}>
                    <XAxis
                      dataKey="iteration"
                      stroke="#71717A"
                      tick={{ fill: '#71717A', fontSize: 11, fontFamily: 'Geist Mono' }}
                      label={{ value: 'Iteración', position: 'insideBottom', offset: -5, fill: '#71717A', fontSize: 11, fontFamily: 'Geist Mono' }}
                    />
                    <YAxis
                      stroke="#71717A"
                      tick={{ fill: '#71717A', fontSize: 11, fontFamily: 'Geist Mono' }}
                      label={{ value: 'Error', angle: -90, position: 'insideLeft', fill: '#71717A', fontSize: 11, fontFamily: 'Geist Mono' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#18181B',
                        border: '1px solid #27272A',
                        borderRadius: '8px',
                        fontFamily: 'Geist Mono',
                        fontSize: 13,
                      }}
                      labelStyle={{ color: '#06D6A0' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="error"
                      stroke="#06D6A0"
                      strokeWidth={2}
                      dot={{ fill: '#06D6A0', r: 3 }}
                      name="Error"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {result.iterations.length > 0 && (
            <IterationTable
              headers={['Iteración', ...result.result.map((_, i) => `x${i + 1}`), 'Error']}
              rows={result.iterations.map((iter) => [
                iter.iteration,
                ...iter.values,
                iter.error,
              ])}
            />
          )}

          <InterpretationCard
            title="Interpretación"
            content={
              result.converged
                ? `El método de ${METHOD_NAMES[result.method]} convergió en ${result.iterations.length} iteraciones con un error final de ${result.iterations[result.iterations.length - 1]?.error.toExponential(4)}. La solución indica las cantidades que deben enviarse a cada zona para satisfacer las demandas del sistema de abastecimiento.`
                : `El método de ${METHOD_NAMES[result.method]} no convergió después de ${result.iterations.length} iteraciones. Esto puede indicar que la matriz no es diagonalmente dominante o que el sistema está mal condicionado. Considere cambiar de método o ajustar los parámetros.`
            }
          />
        </div>
      ))}

      {results.length > 1 && (
        <div className="space-y-4">
          <h3 className="font-mono text-[15px] font-semibold text-electric-cyan tracking-wide">
            Comparación de métodos
          </h3>
          <div className="bg-void-black border border-subtle-edge rounded-lg p-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart>
                <XAxis
                  dataKey="iteration"
                  stroke="#71717A"
                  tick={{ fill: '#71717A', fontSize: 11, fontFamily: 'Geist Mono' }}
                  label={{ value: 'Iteración', position: 'insideBottom', offset: -5, fill: '#71717A', fontSize: 11, fontFamily: 'Geist Mono' }}
                  type="number"
                  allowDuplicatedCategory={false}
                />
                <YAxis
                  stroke="#71717A"
                  tick={{ fill: '#71717A', fontSize: 11, fontFamily: 'Geist Mono' }}
                  label={{ value: 'Error', angle: -90, position: 'insideLeft', fill: '#71717A', fontSize: 11, fontFamily: 'Geist Mono' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181B',
                    border: '1px solid #27272A',
                    borderRadius: '8px',
                    fontFamily: 'Geist Mono',
                    fontSize: 13,
                  }}
                  labelStyle={{ color: '#06D6A0' }}
                />
                <Legend />
                {results.map((r, i) => {
                  const colors = ['#06D6A0', '#F5A623', '#A78BFA', '#EF4444', '#34D399']
                  return (
                    <Line
                      key={i}
                      data={r.iterations}
                      type="monotone"
                      dataKey="error"
                      stroke={colors[i % colors.length]}
                      strokeWidth={2}
                      name={METHOD_NAMES[r.method]}
                    />
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