import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { OdesForm } from './odes-form'
import { OdesResults } from './odes-results'
import { useOdes } from '@/hooks/use-odes'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScenarioCard } from '@/components/shared/scenario-card'
import { ScenarioApplication } from '@/components/shared/scenario-application'
import { scenarioB, scenarioG } from '@/data/scenarios'
import type { OdeMethod } from '@/types/odes'

const FORMULAS: Record<string, string> = {
  euler: "y_{n+1} = y_n + h \\cdot f(t_n, y_n)",
  heun: "y_{n+1} = y_n + \\frac{h}{2}[f(t_n,y_n) + f(t_{n+1}, \\tilde{y}_{n+1})]",
  rk4: "y_{n+1} = y_n + \\frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)",
}

const scenarioApplications = [
  {
    letter: 'B',
    title: 'Vaciado crítico de reservas en plantas de carburantes',
    narrative:
      'Una planta de carburantes tiene 1000 unidades en reserva. El consumo diario es mayor que el reabastecimiento, generando una pérdida neta inicial de 30 unidades por día (1000 × 0.03 = 30). La reserva va bajando según R\'(t) = -0.03R, o sea que se vacía exponencialmente: al principio baja rápido y luego se desacelera. La pregunta clave es: ¿en cuántos días la reserva baja a 100 unidades, que es el nivel mínimo para operar?',
    relation:
      'Euler calcula la solución step by step usando la pendiente al inicio de cada intervalo — es simple pero se va desviando si los pasos son grandes. Heun promedia la pendiente inicial y una pendiente predicha para corregir un poco. RK4 calcula cuatro pendientes intermedias por paso y las combina, lo que le da mucha más precisión. La solución analítica es R(t) = 1000·e^(-0.03t), así que podemos comparar los resultados numéricos con el valor exacto para ver qué tan bien funciona cada método.',
    questions: [
      {
        question: '¿En cuántos días la reserva llega a un nivel crítico?',
        answer:
          'Aproximadamente en el día 77. Si R(0) = 1000 y la tasa de vaciado es -0.03, la reserva baja a 100 unidades cuando t ≈ 76.7 días (porque ln(10)/0.03 ≈ 76.7). Euler con paso h=1 tiene un error del ~3%, Heun del ~0.03%, y RK4 del ~0.000001%.',
      },
      {
        question: '¿Qué pasa si aumenta el consumo diario?',
        answer:
          'Si el consumo sube y la tasa de vaciado pasa de -0.03 a -0.05, la reserva baja a 100 unidades en unos 46 días (en vez de 77). O sea, un aumento del 67% en el consumo reduce el tiempo de 77 a 46 días.',
      },
      {
        question: '¿Qué pasa si se reduce el abastecimiento?',
        answer:
          'Si llega menos producto, la tasa neta de vaciado se hace más negativa (-0.04 o peor) y la reserva se agota antes. Una reducción del 25% en el reabastecimiento puede acortar el tiempo hasta el nivel crítico en un 25-30%.',
      },
      {
        question: '¿Qué método da una aproximación más estable?',
        answer:
          'RK4 es el más estable y preciso. Con un paso de 1 día, tiene un error mínimo. Heun es aceptable para cálculos rápidos. Euler se desvía si usás pasos grandes (5 días o más), así que no es recomendable cuando necesitás precisión.',
      },
      {
        question: '¿Cuál es la diferencia entre Euler, Heun y RK4?',
        answer:
          'Euler usa solo la pendiente al inicio del intervalo — simple pero impreciso. Heun corrige promediando dos pendientes — ya es mejor. RK4 calcula 4 pendientes por paso y las pondera — es el Rolls Royce de los métodos de un paso para EDOs. Para planificar cuánto dura una reserva, RK4 es el que más se acerca a la realidad.',
      },
    ],
    conclusion:
      'Para simular cómo se vacía una planta de carburantes, RK4 da la respuesta más confiable. La clave es que la tasa de vaciado depende directamente del balance entre lo que llega y lo que se consume. Euler sirve para una vista rápida, pero si necesitás precisión para tomar decisiones de planificación, RK4 es el camino.',
  },
  {
    letter: 'G',
    title: 'Modelo de difusión de opinión y descontento social (NMD)',
    narrative:
      'Imaginá una ciudad en crisis. La gente se divide en tres grupos: los neutrales (N) que no protestan ni median, los manifestantes (M) que están en las calles, y los mediadores (D) que buscan diálogo. Cuando el descontento crece, los neutrales se van sumando a las protestas. Los mediadores intentan calmar la situación. El modelo simplificado dy/dt = -a·y muestra cómo la población neutral disminuye con el tiempo cuando hay descontento, con "a" siendo la tasa de contagio social.',
    relation:
      'La EDO dy/dt = -a·y es una simplificación del modelo NMD completo (que tiene tres ecuaciones acopladas para N, M y D). Acá solo modelamos la decaimiento de neutrales, pero los parámetros a, c y D₀ que mencionamos en las respuestas pertenecen al modelo completo de tres ecuaciones. Con Euler se obtiene una aproximación básica que se desvía con pasos grandes. Heun mejora bastante. RK4 es el más preciso. Lo interesante es que podés cambiar los parámetros y ver qué pasa: si subís la tasa de contagio (a), los neutrales caen más rápido; si la tasa es baja, la decaimiento es lento.',
    questions: [
      {
        question: '¿El conflicto tiende a estabilizarse?',
        answer:
          'Depende de los parámetros. Si hay mediadores activos y diálogo efectivo (c alto), sí — los manifestantes bajan y los neutrales se recuperan. Si no hay mediadores o el diálogo es débil, no — el conflicto escala hasta que se agota la población neutral.',
      },
      {
        question: '¿El número de manifestantes aumenta o disminuye?',
        answer:
          'Si la tasa de contagio (a) es mayor que la de diálogo (c), los manifestantes crecen. Si el diálogo es fuerte (c mayor que a), los manifestantes van bajando. Es una carrera entre el descontento y la mediación.',
      },
      {
        question: '¿Qué pasa si mejora la tasa de diálogo (aumentar c)?',
        answer:
          'Más diálogo efectivo significa que los manifestantes bajan más rápido y el sistema se estabiliza antes. Los mediadores logran canalizar el descontento hacia soluciones en vez de dejar que crezca. En términos del modelo, subir c reduce la tasa neta de contagio.',
      },
      {
        question: '¿Qué pasa si no existen mediadores (D₀ = 0)?',
        answer:
          'Sin mediadores no hay quién frene el conflicto. Los manifestantes crecen sin freno (porque M\'(t) = aNM > 0 si no hay D que los reduzca). Es el peor escenario: el descontento se masifica y no hay mecanismo de contención.',
      },
      {
        question: '¿Qué parámetros hacen que el conflicto se masifique?',
        answer:
          'Cuando el contagio (a) es alto, el diálogo (c) es bajo, no hay mediadores iniciales (D₀ ≈ 0) y los mediadores se desgastan rápido (r alto). Esa combinación es la receta para que todo explote: mucha gente enojada, poca mediación y los pocos mediadores que hay se agotan.',
      },
    ],
    conclusion:
      'Mediadores son clave para evitar que un conflicto se descontrole. La tasa de diálogo efectivo y la presencia de mediadores desde el inicio son los factores que más pesan. RK4 es el método más preciso para simular estos escenarios y experimentar con distintos parámetros. La lección es clara: invertir en mediación y diálogo puede evitar que un descontento se convierta en crisis.',
  },
]

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

      <div className="space-y-2">
        <p className="text-[11px] text-text-dim font-medium uppercase tracking-wider">Aplicación al escenario</p>
        {scenarioApplications.map((sa) => (
          <ScenarioApplication
            key={sa.letter}
            letter={sa.letter}
            title={sa.title}
            narrative={sa.narrative}
            relation={sa.relation}
            questions={sa.questions}
            conclusion={sa.conclusion}
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