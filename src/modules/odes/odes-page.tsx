import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { OdesForm } from './odes-form'
import { OdesResults } from './odes-results'
import { useOdes } from '@/hooks/use-odes'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScenarioCard } from '@/components/shared/scenario-card'
import { scenarioB, scenarioG } from '@/data/scenarios'
import type { OdeMethod } from '@/types/odes'

const FORMULAS: Record<string, string> = {
  euler: "y_{n+1} = y_n + h \\cdot f(t_n, y_n)",
  heun: "y_{n+1} = y_n + \\frac{h}{2}[f(t_n,y_n) + f(t_{n+1}, \\tilde{y}_{n+1})]",
  rk4: "y_{n+1} = y_n + \\frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)",
}

type ScenarioData = {
  fExpression: string
  t0: number
  y0: number
  tFinal: number
  h: number
  method: OdeMethod
}

export function OdesPage() {
  const { results, isCalculating, error, calculate, reset } = useOdes()
  const [activeMethod, setActiveMethod] = useState<OdeMethod>('euler')
  const [scenarioData, setScenarioData] = useState<ScenarioData | null>(null)
  const [formKey, setFormKey] = useState(0)

  const handleCalculate = (data: {
    fExpression: string
    t0: number
    y0: number
    tFinal: number
    h: number
    method: OdeMethod
  }) => {
    calculate(data)
  }

  const loadScenario = (data: ScenarioData) => {
    setActiveMethod(data.method)
    setScenarioData(data)
    setFormKey(prev => prev + 1)
    reset()
  }

  useEffect(() => {
    if (scenarioData) {
      const timeout = setTimeout(() => setScenarioData(null), 100)
      return () => clearTimeout(timeout)
    }
  }, [scenarioData])

  const scenarios = [scenarioB, scenarioG]

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-[11px] text-forest font-mono">05</p>
        <h1 className="text-xl font-semibold text-text mt-0.5 tracking-tight">
          Ecuaciones Diferenciales
        </h1>
        <p className="text-text-secondary text-[13px] mt-1.5 leading-relaxed">
          Reserva de productos que se agota con el tiempo. Modelado con EDOs de primer orden y métodos numéricos.
        </p>
      </motion.div>

      <div className="space-y-2">
        <p className="text-[11px] text-text-dim font-medium uppercase tracking-wider">Escenarios de crisis</p>
        {scenarios.map((s) => (
          <ScenarioCard
            key={s.id}
            letter={s.letter}
            title={s.title}
            narrative={s.narrative}
            questions={s.questions}
            onLoad={() => loadScenario(s.data)}
          />
        ))}
      </div>

      <Tabs value={activeMethod} onValueChange={(v) => setActiveMethod(v as OdeMethod)}>
        <TabsList className="bg-surface border border-border h-auto p-0.5 flex-wrap gap-0.5">
          <TabsTrigger value="euler" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Euler</TabsTrigger>
          <TabsTrigger value="heun" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">Heun</TabsTrigger>
          <TabsTrigger value="rk4" className="text-[12px] font-mono data-[state=active]:bg-forest data-[state=active]:text-white rounded px-3 py-1">RK4</TabsTrigger>
        </TabsList>

        {Object.entries(FORMULAS).map(([method, formula]) => (
          <TabsContent key={method} value={method} className="mt-6 space-y-6">
            <FormulaDisplay latex={formula} label={method} />
            <div className="bg-white border border-border rounded-lg p-5">
              <OdesForm key={formKey} onCalculate={handleCalculate} onReset={reset} isCalculating={isCalculating} defaultData={scenarioData} />
            </div>
            {error && (
              <p className="text-red text-[13px] font-mono">{error}</p>
            )}
            <OdesResults results={results} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}