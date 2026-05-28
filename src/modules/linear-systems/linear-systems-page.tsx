import { useState } from 'react'
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
      <div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-electric-cyan font-mono font-medium">
          Módulo 01
        </p>
        <h1 className="font-sans text-2xl font-light text-ghost-white mt-1">
          Sistemas de Ecuaciones Lineales
        </h1>
        <p className="text-mist text-[14px] mt-2 leading-relaxed max-w-2xl">
          Optimización del abastecimiento y red de transporte. Distribución de productos
          desde plantas de acopio hacia distintas zonas resolviendo Ax = b.
        </p>
      </div>

      <Tabs value={activeMethod} onValueChange={(v) => setActiveMethod(v as LinearSystemMethod)}>
        <TabsList className="bg-deep-night border border-subtle-edge h-auto p-1 flex-wrap">
          <TabsTrigger
            value="jacobi"
            className="text-[12px] uppercase tracking-wider font-mono data-[state=active]:bg-electric-cyan data-[state=active]:text-void-black"
          >
            Jacobi
          </TabsTrigger>
          <TabsTrigger
            value="gauss-seidel"
            className="text-[12px] uppercase tracking-wider font-mono data-[state=active]:bg-electric-cyan data-[state=active]:text-void-black"
          >
            Gauss-Seidel
          </TabsTrigger>
          <TabsTrigger
            value="sor"
            className="text-[12px] uppercase tracking-wider font-mono data-[state=active]:bg-electric-cyan data-[state=active]:text-void-black"
          >
            SOR
          </TabsTrigger>
          <TabsTrigger
            value="lu"
            className="text-[12px] uppercase tracking-wider font-mono data-[state=active]:bg-electric-cyan data-[state=active]:text-void-black"
          >
            LU
          </TabsTrigger>
          <TabsTrigger
            value="conjugate-gradient"
            className="text-[12px] uppercase tracking-wider font-mono data-[state=active]:bg-electric-cyan data-[state=active]:text-void-black"
          >
            Grad. Conjugado
          </TabsTrigger>
        </TabsList>

        {Object.entries(FORMULAS).map(([method, formula]) => (
          <TabsContent key={method} value={method} className="mt-6 space-y-6">
            <FormulaDisplay
              latex={formula}
              label="Método seleccionado"
            />

            <div className="bg-deep-night border border-subtle-edge rounded-lg p-6">
              <LinearSystemsForm
                onCalculate={handleCalculate}
                onReset={reset}
                isCalculating={isCalculating}
              />
            </div>

            {error && (
              <div className="bg-signal-red/10 border border-signal-red/30 rounded-lg p-4">
                <p className="text-signal-red font-mono text-[13px]">{error}</p>
              </div>
            )}

            <LinearSystemsResults results={results} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}