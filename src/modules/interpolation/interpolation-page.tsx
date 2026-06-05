import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { InterpolationForm } from './interpolation-form'
import { InterpolationResults } from './interpolation-results'
import { useInterpolation } from '@/hooks/use-interpolation'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScenarioCard } from '@/components/shared/scenario-card'
import { ScenarioApplication } from '@/components/shared/scenario-application'
import { scenarioC } from '@/data/scenarios'
import type { InterpolationMethod } from '@/types/interpolation'

const FORMULAS: Record<string, string> = {
  lagrange: 'P(x) = \\sum_{i=0}^{n} y_i \\prod_{j \\neq i} \\frac{x - x_j}{x_i - x_j}',
  newton: 'P(x) = f[x_0] + f[x_0,x_1](x-x_0) + f[x_0,x_1,x_2](x-x_0)(x-x_1) + \\cdots',
  'cubic-splines': 'S_i(x) = a_i + b_i(x-x_i) + c_i(x-x_i)^2 + d_i(x-x_i)^3',
}

const scenarioCApplication = {
  letter: 'C',
  title: 'Desabastecimiento de alimentos y curva continua de precios',
  narrative:
    'En un mercado de Caracas, el precio de la papa se anota solo algunos días: Bs. 8 el día 1, Bs. 10 el día 5, Bs. 13 el día 10, Bs. 16 el día 15, Bs. 19 el día 20 y Bs. 22 el día 30. ¿Cuánto cuesta la papa el día 7, si nadie tomó el dato? Con interpolación podemos reconstruir la curva de precios completa y estimar valores en días sin registro oficial. Eso permite a una familia planificar cuánto presupuesto destinar a alimentos.',
  relation:
    'Lagrange arma un polinomio que pasa exactamente por todos los puntos, Newton hace lo mismo pero de forma que podés agregar puntos sin empezar de cero, y los splines cúbicos unen los puntos con curvas suaves de grado 3, evitando las oscilaciones feas que a veces hacen los polinomios de alto grado (el fenómeno de Runge). Para estimar precios en días sin dato, los tres funcionan, pero los splines dan curvas más realistas.',
  questions: [
    {
      question: '¿Cuál sería el precio aproximado en un día sin dato (ej: día 7)?',
      answer:
        'Los tres métodos dan aproximadamente Bs. 11.18 para el día 7. Lagrange y Newton construyen el mismo polinomio (solo cambia cómo lo arman), así que coinciden siempre. Los splines cúbicos dan un resultado muy parecido con una curva más suave entre los puntos de datos.',
    },
    {
      question: '¿Cómo se comporta la curva de precios durante el mes?',
      answer:
        'Sube todo el tiempo pero se desacelera al final: de Bs. 8 a Bs. 22 en 30 días, un incremento del 175%. Los incrementos más fuertes están en la primera mitad del mes (de Bs. 8 a Bs. 16 en 15 días), y se desacelera en los últimos 10 días (solo Bs. 3 de aumento), probablemente por efecto de la oferta que se estabiliza.',
    },
    {
      question: '¿Qué producto tuvo mayor incremento de precio?',
      answer:
        'Con un solo producto (la papa) no podemos comparar directamente. Pero la metodología se repite para cualquier producto de la canasta básica: interpolás la curva de cada uno y comparás cuál tiene mayor pendiente. El que sube más rápido es el que más golpea el bolsillo.',
    },
    {
      question: '¿Qué tan confiable es la interpolación con datos dispersos?',
      answer:
        'Dentro del rango de datos (días 1 a 30), es bastante confiable con 6 puntos. Los tres métodos coinciden en los valores intermedios. Pero ojo: si intentás estimar más allá del día 30 (extrapolación), la confianza baja. Lagrange y Newton pueden dispararse para arriba o para abajo, y los splines son un poco más comedidos.',
    },
    {
      question: '¿Qué pasa si los datos son muy dispersos (pocos puntos)?',
      answer:
        'Con 3 puntos o menos, la interpolación se vuelve poco precisa porque hay poca información para construir la curva. Lagrange y Newton arman un polinomio que pasa por esos puntos pero puede hacer cosas raras entre medio. Los splines cúbicos necesitan al menos 4 puntos para funcionar bien. Cuantos más puntos tengas, mejor se ajusta la curva.',
    },
  ],
  conclusion:
    'Para estimar precios donde no hay datos, los splines cúbicos son la mejor opción porque dan curvas suaves sin las oscilaciones de Lagrange. Pero los tres métodos coinciden dentro del rango de datos, así que para respuestas rápidas cualquiera sirve. Lo importante es no extrapolar: la interpolación te dice qué pasa entre los datos que tenés, no qué va a pasar después.',
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

      <div className="space-y-2">
        <p className="text-[11px] text-text-dim font-medium uppercase tracking-wider">Aplicación al escenario</p>
        <ScenarioApplication
          letter={scenarioCApplication.letter}
          title={scenarioCApplication.title}
          narrative={scenarioCApplication.narrative}
          relation={scenarioCApplication.relation}
          questions={scenarioCApplication.questions}
          conclusion={scenarioCApplication.conclusion}
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