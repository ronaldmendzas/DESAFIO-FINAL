import { useState } from 'react'
import { motion } from 'motion/react'
import { IntegrationForm } from './integration-form'
import { IntegrationResults } from './integration-results'
import { useIntegration } from '@/hooks/use-integration'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { IntegrationMethod } from '@/types/integration'

const FORMULAS: Record<string, string> = {
  trapezoidal: '\\int_a^b f(x)\\,dx \\approx \\frac{h}{2}[f(a) + 2\\sum f(x_i) + f(b)]',
  'simpson-1-3': '\\int_a^b f(x)\\,dx \\approx \\frac{h}{3}[f(a) + 4\\sum_{\\text{odd}} f(x_i) + 2\\sum_{\\text{even}} f(x_i) + f(b)]',
  'simpson-3-8': '\\int_a^b f(x)\\,dx \\approx \\frac{3h}{8}[f(a) + 3\\sum f(x_i) + 2\\sum f(x_{3k}) + f(b)]',
}

export function IntegrationPage() {
  const { results, isCalculating, error, calculate, reset } = useIntegration()
  const [activeMethod, setActiveMethod] = useState<IntegrationMethod>('trapezoidal')
  const [fExpression, setFExpression] = useState('0.5*x + 8')
  const [a, setA] = useState(0)
  const [b, setB] = useState(30)

  const handleCalculate = (data: {
    fExpression: string
    a: number
    b: number
    n: number
    method: IntegrationMethod
  }) => {
    setFExpression(data.fExpression)
    setA(data.a)
    setB(data.b)
    calculate(data)
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-[11px] text-forest font-mono">04</p>
        <h1 className="text-xl font-semibold text-text mt-0.5 tracking-tight">
          Integración Numérica
        </h1>
        <p className="text-text-secondary text-[13px] mt-1.5 leading-relaxed">
          Costo acumulado de la canasta básica y pérdida del poder adquisitivo familiar. El gasto mensual como área bajo la curva de precios.
        </p>
      </motion.div>

      <Tabs value={activeMethod} onValueChange={(v) => setActiveMethod(v as IntegrationMethod)}>
        <TabsList className="bg-surface border border-border h-auto p-0.5 flex-wrap gap-0.5">
          <TabsTrigger value="trapezoidal" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Trapecio</TabsTrigger>
          <TabsTrigger value="simpson-1-3" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Simpson 1/3</TabsTrigger>
          <TabsTrigger value="simpson-3-8" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Simpson 3/8</TabsTrigger>
        </TabsList>

        {Object.entries(FORMULAS).map(([method, formula]) => (
          <TabsContent key={method} value={method} className="mt-6 space-y-6">
            <FormulaDisplay latex={formula} label={method} />
            <div className="bg-white border border-border rounded-lg p-5">
              <IntegrationForm onCalculate={handleCalculate} onReset={reset} isCalculating={isCalculating} />
            </div>
            {error && (
              <p className="text-red text-[13px] font-mono">{error}</p>
            )}
            <IntegrationResults results={results} fExpression={fExpression} a={a} b={b} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}