import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { RootsForm } from './roots-form'
import { RootsResults } from './roots-results'
import { useRoots } from '@/hooks/use-roots'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScenarioCard } from '@/components/shared/scenario-card'
import { ScenarioApplication } from '@/components/shared/scenario-application'
import { scenarioE } from '@/data/scenarios'
import type { RootMethod } from '@/types/roots'

const FORMULAS: Record<string, string> = {
  bisection: 'x_{k+1} = \\frac{a_k + b_k}{2}',
  'newton-raphson': 'x_{k+1} = x_k - \\frac{f(x_k)}{f\'(x_k)}',
  secant: 'x_{k+1} = x_k - \\frac{f(x_k)(x_k - x_{k-1})}{f(x_k) - f(x_{k-1})}',
}

const scenarioEApplication = {
  letter: 'E',
  title: 'Umbrales críticos de abastecimiento',
  narrative:
    'Una familia gana Bs. 800 al mes. El gasto acumulado en alimentos sigue la función f(x) = 0.5x² + 8x + 200, donde x es el día del mes. Queremos saber: ¿a partir de qué día el gasto acumulado supera los Bs. 800? Ese es el umbral donde la familia ya no aguanta — donde el poder adquisitivo se cae. Encontrar ese día es encontrar la raíz de f(x) = 0.5x² + 8x + 200 - 800.',
  relation:
    'Buscar la raíz de f(x) = 0 es encontrar el día exacto donde el gasto supera el ingreso. Bisección parte un intervalo a la mitad hasta encontrar el cambio de signo — es lento pero seguro. Newton-Raphson usa la derivada para ir más rápido, pero necesitás saber la derivada y arrancar cerca de la raíz. Secante es un punto intermedio: no necesita derivada pero puede fallar si arrancás mal.',
  questions: [
    {
      question: '¿En qué punto el costo acumulado supera el ingreso familiar?',
      answer:
        'La raíz está en x ≈ 27.55 días. Eso significa que a partir del día 27 del mes, el gasto acumulado ya supera los Bs. 800 que gana la familia. En la última semana del mes ya está en déficit.',
    },
    {
      question: '¿Qué método converge más rápido?',
      answer:
        'Newton-Raphson converge en unas 4 iteraciones — va directo al grano si le das un buen punto de arranque. Secante tarda unas 6. Bisección necesita como 26 iteraciones porque va partiendo a la mitad cada vez. Si tenés la derivada y un punto cercano, Newton es el campeón.',
    },
    {
      question: '¿Qué tan robusto es cada método ante distintos puntos iniciales?',
      answer:
        'Bisección es el más confiable: si hay cambio de signo en el intervalo, siempre llega, no importa qué tan fea sea la función. Newton-Raphson es exigente — si arrancás lejos o la derivada es casi cero, se puede ir por las nubes o quedar ciclando. Secante está en el medio: no pide derivada pero también puede diverger.',
    },
    {
      question: '¿Cuál es la sensibilidad a la condición inicial?',
      answer:
        'Newton-Raphson es sensible: cerca de la raíz vuela, lejos se puede perder. Secante depende de los dos puntos iniciales que le des. Bisección no le importa dónde arranques, solo necesita que f(a) y f(b) tengan signos opuestos. Para este problema, arrancar entre 0 y 50 funciona bien con los tres.',
    },
    {
      question: '¿Cuál es el orden de convergencia estimado de cada método?',
      answer:
        'Bisección es lineal (orden 1): en cada paso reduce el error a la mitad. Newton-Raphson es cuadrático (orden 2): duplica los dígitos correctos en cada paso — por eso converge tan rápido. Secante es superlineal (orden ≈1.618): más rápido que bisección, más lento que Newton. Para encontrar umbrales críticos, la elección depende de qué tanto sepas de la función.',
    },
  ],
  conclusion:
    'La raíz x ≈ 27.6 dice que una familia que gana Bs. 800 pierde su poder adquisitivo en la última semana del mes. Newton-Raphson es el más rápido si tenés la derivada y arrancás cerca. Si no sabés nada de la función, bisección es el seguro de vida. Y secante es un buen balance. Lo importante de este ejercicio es que los métodos numéricos nos permiten encontrar un umbral concreto — un día específico — donde la situación deja de ser sostenible.',
}

export function RootsPage() {
  const { results, isCalculating, error, calculate, reset } = useRoots()
  const [activeMethod, setActiveMethod] = useState<RootMethod>('bisection')
  const [fExpression, setFExpression] = useState('x^3 - 6*x^2 + 11*x - 6')
  const [scenarioData, setScenarioData] = useState<typeof scenarioE.data | null>(null)
  const [formKey, setFormKey] = useState(0)

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

  const loadScenario = () => {
    setActiveMethod(scenarioE.data.method)
    setScenarioData(scenarioE.data)
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
        <p className="text-[11px] text-forest font-mono">02</p>
        <h1 className="text-xl font-semibold text-text mt-0.5 tracking-tight">
          Raíces de Ecuaciones
        </h1>
        <p className="text-text-secondary text-[13px] mt-1.5 leading-relaxed">
          Puntos de equilibrio donde la oferta iguala la demanda, umbrales críticos de precio y reservas.
        </p>
      </motion.div>

      <div className="space-y-2">
        <p className="text-[11px] text-text-dim font-medium uppercase tracking-wider">Escenario de crisis</p>
        <ScenarioCard
          letter={scenarioE.letter}
          title={scenarioE.title}
          narrative={scenarioE.narrative}
          questions={scenarioE.questions}
          onLoad={loadScenario}
        />
      </div>

      <div className="space-y-2">
        <p className="text-[11px] text-text-dim font-medium uppercase tracking-wider">Aplicación al escenario</p>
        <ScenarioApplication
          letter={scenarioEApplication.letter}
          title={scenarioEApplication.title}
          narrative={scenarioEApplication.narrative}
          relation={scenarioEApplication.relation}
          questions={scenarioEApplication.questions}
          conclusion={scenarioEApplication.conclusion}
        />
      </div>

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
              <RootsForm key={formKey} onCalculate={handleCalculate} onReset={reset} isCalculating={isCalculating} defaultData={scenarioData} />
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