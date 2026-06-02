export type ScenarioQuestion = {
  question: string
}

export type LinearSystemScenario = {
  id: string
  letter: string
  title: string
  narrative: string
  module: 'sistemas-lineales'
  questions: ScenarioQuestion[]
  data: {
    matrix: number[][]
    vector: number[]
    method: 'jacobi' | 'gauss-seidel' | 'sor' | 'lu' | 'conjugate-gradient'
    tolerance: number
    maxIterations: number
    omega?: number
  }
}

export type RootScenario = {
  id: string
  letter: string
  title: string
  narrative: string
  module: 'raices'
  questions: ScenarioQuestion[]
  data: {
    fExpression: string
    fPrimeExpression?: string
    a?: number
    b?: number
    x0?: number
    x1?: number
    tolerance: number
    maxIterations: number
    method: 'bisection' | 'newton-raphson' | 'secant'
  }
}

export type InterpolationScenario = {
  id: string
  letter: string
  title: string
  narrative: string
  module: 'interpolacion'
  questions: ScenarioQuestion[]
  data: {
    points: { x: number; y: number }[]
    evaluateAt: number
    method: 'lagrange' | 'newton' | 'cubic-splines'
  }
}

export type IntegrationScenario = {
  id: string
  letter: string
  title: string
  narrative: string
  module: 'integracion'
  questions: ScenarioQuestion[]
  data: {
    fExpression: string
    a: number
    b: number
    n: number
    method: 'trapezoidal' | 'simpson-1-3' | 'simpson-3-8'
  }
}

export type OdeScenario = {
  id: string
  letter: string
  title: string
  narrative: string
  module: 'ecuaciones-diferenciales'
  questions: ScenarioQuestion[]
  data: {
    fExpression: string
    t0: number
    y0: number
    tFinal: number
    h: number
    method: 'euler' | 'heun' | 'rk4'
  }
}

export type Scenario = LinearSystemScenario | RootScenario | InterpolationScenario | IntegrationScenario | OdeScenario

export const scenarioA: LinearSystemScenario = {
  id: 'scenario-a',
  letter: 'A',
  title: 'Optimización del abastecimiento y red de transporte',
  narrative:
    'Una ciudad necesita distribuir productos desde tres plantas de acopio hacia tres zonas (Norte, Centro y Sur). Cada planta tiene una capacidad de suministro diferente y cada zona tiene una demanda específica. El sistema de ecuaciones modela las restricciones de la red: balances de flujo, capacidades de rutas y demandas mínimas. Resolver el sistema Ax = b nos dice cuántas unidades debe enviar cada planta a cada zona para satisfacer todas las restricciones.',
  module: 'sistemas-lineales',
  questions: [
    { question: '¿Cuánto debe enviarse a cada zona?' },
    { question: '¿Qué pasa si una ruta se bloquea (se anula un coeficiente)?' },
    { question: '¿Qué zona queda más afectada?' },
    { question: '¿El sistema es estable o sensible a pequeños cambios?' },
    { question: '¿La solución cambia mucho si la demanda aumenta 5%?' },
  ],
  data: {
    matrix: [
      [10, -1, 2],
      [-1, 11, -1],
      [2, -1, 10],
    ],
    vector: [7, -8, 6],
    method: 'jacobi',
    tolerance: 0.000001,
    maxIterations: 100,
  },
}

export const scenarioF: LinearSystemScenario = {
  id: 'scenario-f',
  letter: 'F',
  title: 'Rumores de desabastecimiento y pánico en la red',
  narrative:
    'Los rumores de escasez pueden alterar drásticamente la demanda, provocando compras impulsivas y desestabilizando la red de distribución normal. Un pequeño cambio en la percepción social genera un gran cambio en la solución. El siguiente sistema está mal condicionado: una matriz de Hilbert donde pequeños cambios en el vector b producen grandes variaciones en x. Esto modela cómo un rumor puede amplificarse y desestabilizar toda la cadena de distribución.',
  module: 'sistemas-lineales',
  questions: [
    { question: '¿Qué pasa si la demanda aumenta solo un 5%?' },
    { question: '¿La solución cambia poco o demasiado?' },
    { question: '¿El sistema es estable o mal condicionado?' },
    { question: '¿Cómo afecta el rumor al abastecimiento?' },
    { question: '¿Qué zona o mercado se vuelve más vulnerable?' },
  ],
  data: {
    matrix: [
      [1, 1 / 2, 1 / 3],
      [1 / 2, 1 / 3, 1 / 4],
      [1 / 3, 1 / 4, 1 / 5],
    ],
    vector: [1.833, 1.083, 0.783],
    method: 'lu',
    tolerance: 0.000001,
    maxIterations: 100,
  },
}

export const scenarioE: RootScenario = {
  id: 'scenario-e',
  letter: 'E',
  title: 'Umbrales críticos de abastecimiento',
  narrative:
    'Se busca el punto donde el costo acumulado mensual iguala el ingreso familiar. Si una familia gana Bs. 800 mensuales y el gasto acumulado en alimentos sigue la función f(x) = 0.5x² + 8x + 200, encontraremos el valor de x (días) donde el gasto supera el ingreso. Este umbral marca el punto de pérdida del poder adquisitivo.',
  module: 'raices',
  questions: [
    { question: '¿En qué punto el costo acumulado supera el ingreso familiar?' },
    { question: '¿Qué método converge más rápido?' },
    { question: '¿Qué tan robusto es cada método ante distintos puntos iniciales?' },
    { question: '¿Cuál es la sensibilidad a la condición inicial?' },
    { question: '¿Cuál es el orden de convergencia estimado de cada método?' },
  ],
  data: {
    fExpression: '0.5*x^2 + 8*x + 200 - 800',
    fPrimeExpression: 'x + 8',
    a: 0,
    b: 50,
    x0: 25,
    x1: 20,
    tolerance: 0.000001,
    maxIterations: 100,
    method: 'bisection',
  },
}

export const scenarioC: InterpolationScenario = {
  id: 'scenario-c',
  letter: 'C',
  title: 'Desabastecimiento de alimentos y curva continua de precios',
  narrative:
    'Los precios de la papa en un mercado se registran solo en ciertos días del mes. Con interpolación podemos reconstruir la curva continua de precios para estimar el valor en días sin dato, analizar tendencias y comparar incrementos. Los datos corresponden al precio de la papa en bolívares según día del mes.',
  module: 'interpolacion',
  questions: [
    { question: '¿Cuál sería el precio aproximado en un día sin dato (ej: día 7)?' },
    { question: '¿Cómo se comporta la curva de precios durante el mes?' },
    { question: '¿Qué producto tuvo mayor incremento de precio?' },
    { question: '¿Qué tan confiable es la interpolación con datos dispersos?' },
    { question: '¿Qué pasa si los datos son muy dispersos (pocos puntos)?' },
  ],
  data: {
    points: [
      { x: 1, y: 8 },
      { x: 5, y: 10 },
      { x: 10, y: 13 },
      { x: 15, y: 16 },
      { x: 20, y: 19 },
      { x: 30, y: 22 },
    ],
    evaluateAt: 7,
    method: 'lagrange',
  },
}

export const scenarioD: IntegrationScenario = {
  id: 'scenario-d',
  letter: 'D',
  title: 'Costo acumulado y pérdida del poder adquisitivo',
  narrative:
    'Una familia compra diariamente una canasta básica cuyo precio sube progresivamente. Si el precio diario sigue p(x) = 0.5x + 8 (donde x es el día y p el precio en Bs), el gasto mensual acumulado es la integral de p(x) de x=0 a x=30. También podemos calcular cuánto hubiera gastado si los precios no subieran (precio fijo de 8 Bs), y la diferencia representa la pérdida de poder adquisitivo.',
  module: 'integracion',
  questions: [
    { question: '¿Cuánto gastó una familia durante el mes?' },
    { question: '¿Cuánto hubiera gastado si los precios no subían?' },
    { question: '¿Cuál fue la pérdida aproximada del poder adquisitivo?' },
    { question: '¿Qué método de integración fue más preciso?' },
    { question: '¿Qué producto afectó más al gasto mensual?' },
  ],
  data: {
    fExpression: '0.5*x + 8',
    a: 0,
    b: 30,
    n: 30,
    method: 'trapezoidal',
  },
}

export const scenarioB: OdeScenario = {
  id: 'scenario-b',
  letter: 'B',
  title: 'Vaciado crítico de reservas en plantas de carburantes',
  narrative:
    'Una planta de carburantes tiene una reserva inicial de 1000 unidades. El reabastecimiento es de 50 unidades/día y el consumo es de 80 unidades/día, lo que da un déficit neto de 30 unidades/día. La reserva cambia según R\'(t) = -0.03R, modelando el decaimiento exponencial de las reservas. ¿En cuántos días la reserva llega al nivel crítico de 100 unidades?',
  module: 'ecuaciones-diferenciales',
  questions: [
    { question: '¿En cuántos días la reserva llega a un nivel crítico?' },
    { question: '¿Qué pasa si aumenta el consumo diario?' },
    { question: '¿Qué pasa si se reduce el abastecimiento?' },
    { question: '¿Qué método da una aproximación más estable?' },
    { question: '¿Cuál es la diferencia entre Euler, Heun y RK4?' },
  ],
  data: {
    fExpression: '-0.03 * y',
    t0: 0,
    y0: 1000,
    tFinal: 60,
    h: 1,
    method: 'euler',
  },
}

export const scenarioG: OdeScenario = {
  id: 'scenario-g',
  letter: 'G',
  title: 'Modelo de difusión de opinión y descontento social (NMD)',
  narrative:
    'Se modelan tres poblaciones: N(t) ciudadanos neutrales, M(t) manifestantes activos, D(t) mediadores. El parámetro a representa la tasa de contagio del descontento, b la recuperación por mediación, c la efectividad del diálogo, k la reacción institucional y r el desgaste de mediadores. Este escenario simplificado modela la disminución de neutrales como dy/dt = -a*y*M donde M se mantiene constante, mostrando cómo el descontento reduce la población neutral. Compare con distintos parámetros para observar estabilización o masificación.',
  module: 'ecuaciones-diferenciales',
  questions: [
    { question: '¿El conflicto tiende a estabilizarse?' },
    { question: '¿El número de manifestantes aumenta o disminuye?' },
    { question: '¿Qué pasa si mejora la tasa de diálogo (aumentar c)?' },
    { question: '¿Qué pasa si no existen mediadores (D₀ = 0)?' },
    { question: '¿Qué parámetros hacen que el conflicto se masifique?' },
  ],
  data: {
    fExpression: '-0.01 * y',
    t0: 0,
    y0: 500,
    tFinal: 30,
    h: 0.5,
    method: 'rk4',
  },
}

export const linearSystemScenarios: LinearSystemScenario[] = [scenarioA, scenarioF]
export const rootScenarios: RootScenario[] = [scenarioE]
export const interpolationScenarios: InterpolationScenario[] = [scenarioC]
export const integrationScenarios: IntegrationScenario[] = [scenarioD]
export const odeScenarios: OdeScenario[] = [scenarioB, scenarioG]
export const allScenarios: Scenario[] = [scenarioA, scenarioF, scenarioE, scenarioC, scenarioD, scenarioB, scenarioG]