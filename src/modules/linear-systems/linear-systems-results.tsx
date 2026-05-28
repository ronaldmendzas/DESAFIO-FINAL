import type { LinearSystemResult } from '@/types/linear-systems'
import { ResultCard } from '@/components/shared/result-card'
import { IterationTable } from '@/components/shared/iteration-table'
import { InterpretationCard } from '@/components/shared/interpretation-card'
import { FormulaDisplay } from '@/components/shared/formula-display'
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
    <div className="space-y-10">
      {results.map((result, idx) => (
        <div key={idx} className="space-y-6">
          <div className="flex items-center gap-3">
            <h3 className="font-mono text-[14px] font-semibold text-ghost-white">
              {METHOD_NAMES[result.method]}
            </h3>
            <span className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded ${
              result.converged
                ? 'bg-forest-muted text-forest-light'
                : 'bg-charcoal text-signal-red'
            }`}>
              {result.converged ? <><CheckCircle className="w-3 h-3" /> Convergió</> : <><XCircle className="w-3 h-3" /> No convergió</>}
            </span>
          </div>

          <FormulaDisplay latex={FORMULAS[result.method] || ''} label={METHOD_NAMES[result.method]} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {result.result.map((val, i) => (
              <ResultCard key={i} label={`x${i + 1}`} value={val} variant="default" decimals={6} />
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <ResultCard label="Iteraciones" value={result.iterations.length} icon={Hash} variant="default" decimals={0} />
            <ResultCard label="Tiempo" value={result.executionTime} icon={Clock} variant="default" decimals={3} suffix="ms" />
            <ResultCard label="Error final" value={result.iterations[result.iterations.length - 1]?.error ?? 0} icon={TrendingUp} variant="default" />
          </div>

          {result.decomposition && (
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.15em] text-dim font-mono">Descomposición LU</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-void-black border border-subtle-edge rounded-md p-3">
                  <p className="font-mono text-[11px] text-dim uppercase tracking-wider mb-2">L</p>
                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${result.result.length}, minmax(50px, 1fr))` }}>
                    {result.decomposition.L.map((row, i) =>
                      row.map((val, j) => (
                        <span key={`${i}-${j}`} className="font-mono text-[12px] text-center text-mist">{val.toFixed(4)}</span>
                      ))
                    )}
                  </div>
                </div>
                <div className="bg-void-black border border-subtle-edge rounded-md p-3">
                  <p className="font-mono text-[11px] text-dim uppercase tracking-wider mb-2">U</p>
                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${result.result.length}, minmax(50px, 1fr))` }}>
                    {result.decomposition.U.map((row, i) =>
                      row.map((val, j) => (
                        <span key={`${i}-${j}`} className="font-mono text-[12px] text-center text-mist">{val.toFixed(4)}</span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {result.iterations.length > 1 && (
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.15em] text-dim font-mono">Convergencia</p>
              <div className="bg-void-black border border-subtle-edge rounded-md p-4">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={result.iterations}>
                    <XAxis dataKey="iteration" stroke="#3B423E" tick={{ fill: '#737973', fontSize: 11, fontFamily: 'Geist Mono' }} />
                    <YAxis stroke="#3B423E" tick={{ fill: '#737973', fontSize: 11, fontFamily: 'Geist Mono' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#141816', border: '1px solid #1E2422', borderRadius: '6px', fontFamily: 'Geist Mono', fontSize: 12 }} labelStyle={{ color: '#D4D4D4' }} />
                    <Line type="monotone" dataKey="error" stroke="#1A4D3E" strokeWidth={1.5} dot={{ fill: '#1A4D3E', r: 2 }} name="Error" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {result.iterations.length > 0 && (
            <IterationTable
              headers={['Iteración', ...result.result.map((_, i) => `x${i + 1}`), 'Error']}
              rows={result.iterations.map((iter) => [iter.iteration, ...iter.values, iter.error])}
            />
          )}

          <InterpretationCard
            title="Interpretación"
            content={
              result.converged
                ? `El método de ${METHOD_NAMES[result.method]} convergió en ${result.iterations.length} iteraciones con un error final de ${result.iterations[result.iterations.length - 1]?.error.toExponential(4)}. La solución indica las cantidades que deben enviarse a cada zona.`
                : `El método de ${METHOD_NAMES[result.method]} no convergió después de ${result.iterations.length} iteraciones. Considere cambiar de método o ajustar los parámetros.`
            }
          />
        </div>
      ))}

      {results.length > 1 && (
        <div className="space-y-3">
          <h3 className="font-mono text-[14px] font-semibold text-ghost-white">Comparación de métodos</h3>
          <div className="bg-void-black border border-subtle-edge rounded-md p-4">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart>
                <XAxis dataKey="iteration" stroke="#3B423E" tick={{ fill: '#737973', fontSize: 11, fontFamily: 'Geist Mono' }} type="number" allowDuplicatedCategory={false} />
                <YAxis stroke="#3B423E" tick={{ fill: '#737973', fontSize: 11, fontFamily: 'Geist Mono' }} />
                <Tooltip contentStyle={{ backgroundColor: '#141816', border: '1px solid #1E2422', borderRadius: '6px', fontFamily: 'Geist Mono', fontSize: 12 }} labelStyle={{ color: '#D4D4D4' }} />
                <Legend />
                {results.map((r, i) => {
                  const colors = ['#1A4D3E', '#C49A2A', '#A78BFA', '#A3413A', '#737973']
                  return (
                    <Line key={i} data={r.iterations} type="monotone" dataKey="error" stroke={colors[i % colors.length]} strokeWidth={1.5} name={METHOD_NAMES[r.method]} />
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