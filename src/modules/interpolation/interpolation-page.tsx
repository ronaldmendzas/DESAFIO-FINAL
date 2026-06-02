import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { InterpolationForm } from './interpolation-form'
import { InterpolationResults } from './interpolation-results'
import { useInterpolation } from '@/hooks/use-interpolation'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScenarioCard } from '@/components/shared/scenario-card'
import { scenarioC } from '@/data/scenarios'
import type { InterpolationMethod } from '@/types/interpolation'

const FORMULAS: Record<string, string> = {
  lagrange: 'P(x) = \\sum_{i=0}^{n} y_i \\prod_{j \\neq i} \\frac{x - x_j}{x_i - x_j}',
  newton: 'P(x) = f[x_0] + f[x_0,x_1](x-x_0) + f[x_0,x_1,x_2](x-x_0)(x-x_1) + \\cdots',
  'cubic-splines': 'S_i(x) = a_i + b_i(x-x_i) + c_i(x-x_i)^2 + d_i(x-x_i)^3',
}

export function InterpolationPage() {
  const { results, isCalculating, error, calculate, reset } = useInterpolation()
  const [activeMethod, setActiveMethod] = useState<InterpolationMethod>('lagrange')
  const [points, setPoints] = useState<{ x: number; y: number }[]>([])
  const [scenarioData, setScenarioData] = useState<typeof scenarioC.data | null>(null)
  const [formKey, setFormKey] = useState(0)

  const handleCalculate = (data: {
    points: { x: number; y: number }[]
    evaluateAt: number
    method: InterpolationMethod
  }) => {
    setPoints(data.points)
    calculate(data)
  }

  const loadScenario = () => {
    setActiveMethod(scenarioC.data.method)
    setScenarioData(scenarioC.data)
    setFormKey(prev => prev + 1)
    reset()
  }

  useEffect(() => {
    if (scenarioData) {
      const timeout = setTimeout(() => setScenarioData(null), 100)
      return () => clearTimeout(timeout)
    }
  }, [scenarioData])

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-[11px] text-forest font-mono">03</p>
        <h1 className="text-xl font-semibold text-text mt-0.5 tracking-tight">
          Interpolación
        </h1>
        <p className="text-text-secondary text-[13px] mt-1.5 leading-relaxed">
          Curvas continuas de precios a partir de datos dispersos. Estimación de valores en días sin dato.
        </p>
      </motion.div>

      <div className="space-y-2">
        <p className="text-[11px] text-text-dim font-medium uppercase tracking-wider">Escenario de crisis</p>
        <ScenarioCard
          letter={scenarioC.letter}
          title={scenarioC.title}
          narrative={scenarioC.narrative}
          questions={scenarioC.questions}
          onLoad={loadScenario}
        />
      </div>

      <Tabs value={activeMethod} onValueChange={(v) => setActiveMethod(v as InterpolationMethod)}>
        <TabsList className="bg-surface border border-border h-auto p-0.5 flex-wrap gap-0.5">
          <TabsTrigger value="lagrange" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Lagrange</TabsTrigger>
          <TabsTrigger value="newton" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Newton</TabsTrigger>
          <TabsTrigger value="cubic-splines" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Splines Cúbicos</TabsTrigger>
        </TabsList>

        {Object.entries(FORMULAS).map(([method, formula]) => (
          <TabsContent key={method} value={method} className="mt-6 space-y-6">
            <FormulaDisplay latex={formula} label={method} />
            <div className="bg-white border border-border rounded-lg p-5">
              <InterpolationForm key={formKey} onCalculate={handleCalculate} onReset={reset} isCalculating={isCalculating} defaultData={scenarioData} />
            </div>
            {error && (
              <p className="text-red text-[13px] font-mono">{error}</p>
            )}
            <InterpolationResults results={results} points={points} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}