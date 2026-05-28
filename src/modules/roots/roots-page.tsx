import { useState } from 'react'
import { motion } from 'motion/react'
import { RootsForm } from './roots-form'
import { RootsResults } from './roots-results'
import { useRoots } from '@/hooks/use-roots'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { RootMethod } from '@/types/roots'

const FORMULAS: Record<string, string> = {
  bisection: 'x_{k+1} = \\frac{a_k + b_k}{2}',
  'newton-raphson': 'x_{k+1} = x_k - \\frac{f(x_k)}{f\'(x_k)}',
  secant: 'x_{k+1} = x_k - \\frac{f(x_k)(x_k - x_{k-1})}{f(x_k) - f(x_{k-1})}',
}

export function RootsPage() {
  const { results, isCalculating, error, calculate, reset } = useRoots()
  const [activeMethod, setActiveMethod] = useState<RootMethod>('bisection')
  const [fExpression, setFExpression] = useState('x^3 - x - 2')

  const handleCalculate = (data: {
    fExpression: string
    fPrimeExpression?: string
    a?: number
    b?: number
    x0?: number
    x1?: number
    tolerance: number
    maxIterations: number
    method: RootMethod
  }) => {
    setFExpression(data.fExpression)
    calculate(data)
  }

  const handleReset = () => {
    reset()
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-[11px] text-forest font-mono">02</p>
        <h1 className="text-xl font-semibold text-text mt-0.5 tracking-tight">
          Raíces de Ecuaciones
        </h1>
        <p className="text-text-secondary text-[13px] mt-1.5 leading-relaxed">
          Puntos de equilibrio donde la oferta iguala la demanda, modeloado con métodos numéricos de búsqueda de raíces.
        </p>
      </motion.div>

      <Tabs value={activeMethod} onValueChange={(v) => setActiveMethod(v as RootMethod)}>
        <TabsList className="bg-surface border border-border h-auto p-0.5 flex-wrap gap-0.5">
          <TabsTrigger value="bisection" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Bisección</TabsTrigger>
          <TabsTrigger value="newton-raphson" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Newton-Raphson</TabsTrigger>
          <TabsTrigger value="secant" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Secante</TabsTrigger>
        </TabsList>

        {Object.entries(FORMULAS).map(([method, formula]) => (
          <TabsContent key={method} value={method} className="mt-6 space-y-6">
            <FormulaDisplay latex={formula} label={method} />
            <div className="bg-white border border-border rounded-lg p-5">
              <RootsForm onCalculate={handleCalculate} onReset={handleReset} isCalculating={isCalculating} />
            </div>
            {error && (
              <p className="text-red text-[13px] font-mono">{error}</p>
            )}
            <RootsResults results={results} fExpression={fExpression} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}