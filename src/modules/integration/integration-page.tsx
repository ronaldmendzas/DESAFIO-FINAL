import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { IntegrationForm } from './integration-form'
import { IntegrationResults } from './integration-results'
import { useIntegration } from '@/hooks/use-integration'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScenarioCard } from '@/components/shared/scenario-card'
import { ScenarioApplication } from '@/components/shared/scenario-application'
import { scenarioD } from '@/data/scenarios'
import type { IntegrationMethod } from '@/types/integration'

const FORMULAS: Record<string, string> = {
  trapezoidal: '\\int_a^b f(x)\\,dx \\approx \\frac{h}{2}[f(a) + 2\\sum f(x_i) + f(b)]',
  'simpson-1-3': '\\int_a^b f(x)\\,dx \\approx \\frac{h}{3}[f(a) + 4\\sum_{\\text{odd}} f(x_i) + 2\\sum_{\\text{even}} f(x_i) + f(b)]',
  'simpson-3-8': '\\int_a^b f(x)\\,dx \\approx \\frac{3h}{8}[f(a) + 3\\sum f(x_i) + 2\\sum f(x_{3k}) + f(b)]',
}

const scenarioDApplication = {
  letter: 'D',
  title: 'Costo acumulado y pérdida del poder adquisitivo',
  narrative:
    'Una familia compra todos los días una canasta básica. El problema es que los precios suben durante el mes: el día 1 cuesta poco, el día 30 cuesta mucho más. El precio diario sigue p(x) = 0.5x + 8 Bs, donde x es el día. Si los precios no subieran (precio fijo de 8 Bs), el gasto mensual sería 8 × 30 = 240 Bs. Pero con precios crecientes, el gasto total es el área bajo la curva — o sea, la integral de p(x) entre 0 y 30. La diferencia entre los dos es lo que la familia pierde por la inflación.',
  relation:
    'La integral de p(x) = 0.5x + 8 en [0, 30] representa el gasto acumulado del mes. El trapecio aproxima el área con rectas, Simpson 1/3 con parábolas (necesita n par) y Simpson 3/8 con cúbicas (necesita n divisible por 3). Como p(x) es una línea recta, todos los métodos dan resultados casi iguales, pero Simpson 1/3 es el más preciso en general para funciones suaves.',
  questions: [
    {
      question: '¿Cuánto gastó una familia durante el mes?',
      answer:
        'El gasto mensual es de 465 Bs. Como la función es lineal, los tres métodos dan el resultado exacto. Simpson 1/3 confirma el valor analítico de 465.0 Bs.',
    },
    {
      question: '¿Cuánto hubiera gastado si los precios no subían?',
      answer:
        'Si el precio se mantuviera fijo en 8 Bs, el gasto mensual sería 8 × 30 = 240 Bs. Ese es el costo base sin inflación.',
    },
    {
      question: '¿Cuál fue la pérdida aproximada del poder adquisitivo?',
      answer:
        'La diferencia es 465 - 240 = 225 Bs. La familia paga un 93.75% más de lo que pagaría sin inflación. Es decir, casi el doble de lo que costaría si los precios no subieran.',
    },
    {
      question: '¿Qué método de integración fue más preciso?',
      answer:
        'Simpson 1/3 da el resultado más preciso. Para esta función lineal, todos los métodos funcionan bien, pero en funciones más complejas Simpson 1/3 tiene error O(h⁴) mientras que el trapecio tiene error O(h²). Eso significa que Simpson necesita menos subintervalos para la misma precisión.',
    },
    {
      question: '¿Qué producto afectó más al gasto mensual?',
      answer:
        'Con un solo producto no se puede comparar. Pero si repetimos el cálculo para varios productos de la canasta básica, el que tenga la pendiente más grande en su función de precio (es decir, el que más sube por día) va a tener el área más grande debajo de la curva y será el que más golpee el bolsillo.',
    },
  ],
  conclusion:
    'La integración numérica permite ponerle un número concreto a algo que se siente pero no se calcula fácilmente: cuánto te come la inflación. La pérdida de 225 Bs es el costo real del aumento de precios. Simpson 1/3 es el método recomendado para este tipo de cálculo porque es el más preciso con funciones suaves. Y si tenés varios productos, comparás sus áreas bajo la curva para ver cuál golpea más el bolsillo.',
}

type ScenarioData = {
  fExpression: string
  a: number
  b: number
  n: number
  method: IntegrationMethod
}

export function IntegrationPage() {
  const { results, isCalculating, error, calculate, reset } = useIntegration()
  const [activeMethod, setActiveMethod] = useState<IntegrationMethod>('trapezoidal')
  const [fExpression, setFExpression] = useState('0.5*x + 8')
  const [a, setA] = useState(0)
  const [b, setB] = useState(30)
  const [scenarioData, setScenarioData] = useState<ScenarioData | null>(null)
  const [formKey, setFormKey] = useState(0)

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

  const loadScenario = () => {
    setActiveMethod(scenarioD.data.method)
    setScenarioData(scenarioD.data)
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
        <p className="text-[11px] text-forest font-mono">04</p>
        <h1 className="text-xl font-semibold text-text mt-0.5 tracking-tight">
          Integración Numérica
        </h1>
        <p className="text-text-secondary text-[13px] mt-1.5 leading-relaxed">
          Costo acumulado de la canasta básica y pérdida del poder adquisitivo familiar. El gasto mensual como área bajo la curva de precios.
        </p>
      </motion.div>

      <div className="space-y-2">
        <p className="text-[11px] text-text-dim font-medium uppercase tracking-wider">Escenario de crisis</p>
        <ScenarioCard
          letter={scenarioD.letter}
          title={scenarioD.title}
          narrative={scenarioD.narrative}
          questions={scenarioD.questions}
          onLoad={loadScenario}
        />
      </div>

      <div className="space-y-2">
        <p className="text-[11px] text-text-dim font-medium uppercase tracking-wider">Aplicación al escenario</p>
        <ScenarioApplication
          letter={scenarioDApplication.letter}
          title={scenarioDApplication.title}
          narrative={scenarioDApplication.narrative}
          relation={scenarioDApplication.relation}
          questions={scenarioDApplication.questions}
          conclusion={scenarioDApplication.conclusion}
        />
      </div>

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
              <IntegrationForm key={formKey} onCalculate={handleCalculate} onReset={reset} isCalculating={isCalculating} defaultData={scenarioData} />
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