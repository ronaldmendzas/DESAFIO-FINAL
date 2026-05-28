import { useState } from 'react'
import { motion } from 'motion/react'
import { LinearSystemsForm } from './linear-systems-form'
import { LinearSystemsResults } from './linear-systems-results'
import { useLinearSystem } from '@/hooks/use-linear-system'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { LinearSystemMethod } from '@/types/linear-systems'

const FORMULAS: Record<string, string> = {
  jacobi: 'x_i^{(k+1)} = \\frac{1}{a_{ii}} \\left( b_i - \\sum_{j \\neq i} a_{ij} x_j^{(k)} \\right)',
  'gauss-seidel': 'x_i^{(k+1)} = \\frac{1}{a_{ii}} \\left( b_i - \\sum_{j < i} a_{ij} x_j^{(k+1)} - \\sum_{j > i} a_{ij} x_j^{(k)} \\right)',
  sor: 'x_i^{(k+1)} = (1 - \\omega) x_i^{(k)} + \\frac{\\omega}{a_{ii}} \\left( b_i - \\sum_{j < i} a_{ij} x_j^{(k+1)} - \\sum_{j > i} a_{ij} x_j^{(k)} \\right)',
  lu: 'A = LU, \\quad Ly = b, \\quad Ux = y',
  'conjugate-gradient': '\\alpha_k = \\frac{r_k^T r_k}{p_k^T A p_k}, \\quad x_{k+1} = x_k + \\alpha_k p_k',
}

export function LinearSystemsPage() {
  const { results, isCalculating, error, calculate, reset } = useLinearSystem()
  const [activeMethod, setActiveMethod] = useState<LinearSystemMethod>('jacobi')

  const handleCalculate = (data: {
    matrix: number[][]
    vector: number[]
    tolerance: number
    maxIterations: number
    method: LinearSystemMethod
    omega?: number
  }) => {
    calculate(data)
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-[11px] text-forest font-mono">01</p>
        <h1 className="text-xl font-semibold text-text mt-0.5 tracking-tight">
          Sistemas de Ecuaciones Lineales
        </h1>
        <p className="text-text-secondary text-[13px] mt-1.5 leading-relaxed">
          Distribución de productos desde plantas de acopio hacia zonas resolviendo Ax = b.
        </p>
      </motion.div>

      <Tabs value={activeMethod} onValueChange={(v) => setActiveMethod(v as LinearSystemMethod)}>
        <TabsList className="bg-surface border border-border h-auto p-0.5 flex-wrap gap-0.5">
          <TabsTrigger value="jacobi" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Jacobi</TabsTrigger>
          <TabsTrigger value="gauss-seidel" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Gauss-Seidel</TabsTrigger>
          <TabsTrigger value="sor" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">SOR</TabsTrigger>
          <TabsTrigger value="lu" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">LU</TabsTrigger>
          <TabsTrigger value="conjugate-gradient" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Grad. Conj.</TabsTrigger>
        </TabsList>

        {Object.entries(FORMULAS).map(([method, formula]) => (
          <TabsContent key={method} value={method} className="mt-6 space-y-6">
            <FormulaDisplay latex={formula} label={method} />
            <div className="bg-white border border-border rounded-lg p-5">
              <LinearSystemsForm onCalculate={handleCalculate} onReset={reset} isCalculating={isCalculating} />
            </div>
            {error && (
              <p className="text-red text-[13px] font-mono">{error}</p>
            )}
            <LinearSystemsResults results={results} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}