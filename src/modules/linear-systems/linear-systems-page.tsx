import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { LinearSystemsForm } from './linear-systems-form'
import { LinearSystemsResults } from './linear-systems-results'
import { useLinearSystem } from '@/hooks/use-linear-system'
import { FormulaDisplay } from '@/components/shared/formula-display'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScenarioCard } from '@/components/shared/scenario-card'
import { ScenarioApplication } from '@/components/shared/scenario-application'
import { scenarioA, scenarioF } from '@/data/scenarios'
import type { LinearSystemMethod } from '@/types/linear-systems'

const FORMULAS: Record<string, string> = {
  jacobi: 'x_i^{(k+1)} = \\frac{1}{a_{ii}} \\left( b_i - \\sum_{j \\neq i} a_{ij} x_j^{(k)} \\right)',
  'gauss-seidel': 'x_i^{(k+1)} = \\frac{1}{a_{ii}} \\left( b_i - \\sum_{j < i} a_{ij} x_j^{(k+1)} - \\sum_{j > i} a_{ij} x_j^{(k)} \\right)',
  sor: 'x_i^{(k+1)} = (1 - \\omega) x_i^{(k)} + \\frac{\\omega}{a_{ii}} \\left( b_i - \\sum_{j < i} a_{ij} x_j^{(k+1)} - \\sum_{j > i} a_{ij} x_j^{(k)} \\right)',
  lu: 'A = LU, \\quad Ly = b, \\quad Ux = y',
  'conjugate-gradient': '\\alpha_k = \\frac{r_k^T r_k}{p_k^T A p_k}, \\quad x_{k+1} = x_k + \\alpha_k p_k',
}

type ScenarioData = {
  matrix: number[][]
  vector: number[]
  method: LinearSystemMethod
  tolerance: number
  maxIterations: number
  omega?: number
}

export function LinearSystemsPage() {
  const { results, isCalculating, error, calculate, reset } = useLinearSystem()
  const [activeMethod, setActiveMethod] = useState<LinearSystemMethod>('jacobi')
  const [scenarioData, setScenarioData] = useState<ScenarioData | null>(null)
  const [formKey, setFormKey] = useState(0)

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

  const scenarios = [scenarioA, scenarioF]

  const scenarioApplications = [
    {
      letter: 'A',
      title: 'Optimización del abastecimiento y red de transporte',
      narrative:
        'Imaginá que Valencia tiene 3 plantas de acopio que distribuyen alimentos a 3 zonas: Norte, Centro y Sur. Cada planta envía cantidades distintas a cada zona y hay restricciones de capacidad en las rutas y demandas mínimas por zona. El sistema Ax = b modela todo esto: la matriz A tiene las capacidades de las rutas, el vector b tiene las demandas de cada zona, y la solución x nos dice exactamente cuánto enviar de cada planta a cada zona.',
      relation:
        'Acá es donde entra lo interesante: cuando la matriz es diagonalmente dominante (como en este escenario), Jacobi y Gauss-Seidel convergen rápido y sin problemas. Pero si una ruta se bloquea —digamos, una protesta corta la carretera al Norte—, cambiamos un coeficiente de la matriz y toda la redistribución se recalcula. Eso es lo que permiten hacer estos métodos: ajustar el plan de distribución cuando las condiciones cambian.',
      questions: [
        {
          question: '¿Cuánto debe enviarse a cada zona?',
          answer:
            'Resolviendo el sistema, se obtiene x₁ ≈ 0.55, x₂ ≈ -0.64, x₃ ≈ 0.43. El valor negativo en x₂ significa que la Zona Centro recibe menos de lo que demanda directamente y necesita redistribución desde otras plantas. Los métodos iterativos (Jacobi, Gauss-Seidel, SOR) y LU llegan a la misma solución.',
        },
        {
          question: '¿Qué pasa si una ruta se bloquea?',
          answer:
            'Si se anula un coeficiente de la matriz (por ejemplo, no se puede enviar de la Planta 1 al Norte porque hay un bloqueo), el sistema cambia y hay que recalcular. La solución va a ser distinta: las zonas que dependían de esa ruta se quedan con menos abastecimiento, y las demás plantas tienen que compensar.',
        },
        {
          question: '¿Qué zona queda más afectada?',
          answer:
            'Depende de qué ruta se bloquea. Si es una ruta hacia la Zona Centro (que ya tiene un valor negativo en la solución original), esa zona se vería más afectada porque ya estaba en déficit. En general, las zonas que dependen más de una sola ruta son las más vulnerables.',
        },
        {
          question: '¿El sistema es estable o sensible a pequeños cambios?',
          answer:
            'Este sistema es estable. La matriz es diagonalmente dominante (los números de la diagonal son más grandes que la suma del resto en cada fila), así que los métodos iterativos convergen sin problema. Un cambio chico en los datos no voltea toda la solución.',
        },
        {
          question: '¿La solución cambia mucho si la demanda aumenta 5%?',
          answer:
            'No, cambia proporcionalmente. Como el sistema está bien condicionado, un 5% más de demanda genera aproximadamente un 5% de cambio en las cantidades a distribuir. No hay sorpresas ni amplificaciones raras.',
        },
      ],
      conclusion:
        'Para distribuir alimentos eficientemente, LU da la solución exacta de una vez sin iterar, mientras que Jacobi, Gauss-Seidel y SOR van acercándose paso a paso y nos dejan ver cómo convergen. El Gradiente Conjugado es útil cuando el sistema es más grande. Lo importante es que, cuando la matriz está bien condicionada como aquí, cualquier método funciona y la red de distribución es estable.',
    },
    {
      letter: 'F',
      title: 'Rumores de desabastecimiento y pánico en la red',
      narrative:
        'Corre el rumor: "Se va a acabar la gasolina". La gente se precipita a las bombas y llena tanques extras, lo que sube la demanda un poquito —tal vez un 5%. Uno diría que un 5% no es nada, pero en un sistema mal condicionado, ese pequeño cambio desbarajusta toda la distribución. Acá usamos una matriz de Hilbert para modelar esto: una matriz donde los números son fracciones cada vez más pequeñas, y cualquier error en los datos se amplifica como loco.',
      relation:
        'La matriz de Hilbert es famosa en métodos numéricos porque está mal condicionada. Su número de condición es altísimo, lo que significa que si cambiamos el vector b un poquito (el rumor, la percepción de escasez), la solución x cambia muchísimo (las cantidades que se distribuyen a cada zona). Es justo lo que pasa en la vida real: un rumor chiquito genera pánico grande.',
      questions: [
        {
          question: '¿Qué pasa si la demanda aumenta solo un 5%?',
          answer:
            'Depende de la dirección del cambio. Una perturbación adversarial del 5% puede generar cambios del 200% o más en la solución, pero no todo cambio del 5% produce ese efecto. La matriz de Hilbert amplifica ciertas perturbaciones enormemente. En la vida real, esto es como cuando un rumor de escasez hace que la gente compre de más, y eso sí genera escasez real.',
        },
        {
          question: '¿La solución cambia poco o demasiado?',
          answer:
            'Demasiado. Ese es el punto del escenario. Un sistema bien condicionado absorbe pequeños cambios, pero un sistema mal condicionado los amplifica. Aquí, un rumor pequeño desestabiliza toda la red.',
        },
        {
          question: '¿El sistema es estable o mal condicionado?',
          answer:
            'Mal condicionado. La matriz de Hilbert 3×3 tiene un número de condición ≈524. En términos prácticos, eso significa que perdemos 2-3 dígitos de precisión solo por el modo en que están organizados los números. En la vida real, es como una red de distribución donde cualquier fluctuación pequeña se convierte en un problema grande.',
        },
        {
          question: '¿Cómo afecta el rumor al abastecimiento?',
          answer:
            'El rumor es una perturbación pequeña en la demanda, pero el sistema la amplifica. La gente compra de más por miedo, las bombas se agotan, los camiones no pueden repostar, y lo que era un rumor se convierte en escasez real. Es un círculo vicioso que el mal condicionamiento del sistema reproduce matemáticamente.',
        },
        {
          question: '¿Qué zona o mercado se vuelve más vulnerable?',
          answer:
            'Los mercados más interconectados, donde la demanda de una zona depende de otra. En la matriz de Hilbert, todas las filas y columnas están correlacionadas (por eso está mal condicionada), así que todas las zonas son vulnerables al mismo tiempo. No hay una zona segura.',
        },
      ],
      conclusion:
        'Este escenario muestra algo clave: en una red de distribución, no basta con tener suficiente producto. Si el sistema matemático que la modela está mal condicionado, un rumor chiquito puede desestabilizar todo. Los métodos iterativos divergen o convergen lentamente con matrices mal condicionadas, y LU pierde precisión. La lección es que la robustez de una red no depende solo de las capacidades, sino de cómo están conectadas sus partes.',
    },
  ]

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-[11px] text-forest font-mono">01</p>
        <h1 className="text-xl font-semibold text-text mt-0.5 tracking-tight">
          Sistemas de Ecuaciones Lineales
        </h1>
        <p className="text-text-secondary text-[13px] mt-1.5 leading-relaxed">
          Distribución de productos desde plantas de acopio hacia zonas resolviendo Ax = b. Incluye descomposición LU como método directo.
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
              <LinearSystemsForm
                key={formKey}
                onCalculate={handleCalculate}
                onReset={reset}
                isCalculating={isCalculating}
                defaultData={scenarioData}
              />
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