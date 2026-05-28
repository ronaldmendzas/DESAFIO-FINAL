# Componentes

## Árbol de Componentes

```
App
├── ThemeProvider
│   └── AppLayout
│       ├── Navbar
│       │   ├── Logo
│       │   ├── NavLinks
│       │   └── ThemeToggle
│       ├── Sidebar
│       │   └── ModuleLinks (5 módulos + inicio + conclusiones)
│       ├── MainContent
│       │   ├── HomePage
│       │   ├── LinearSystemsPage
│       │   ├── RootsPage
│       │   ├── InterpolationPage
│       │   ├── IntegrationPage
│       │   ├── OdesPage
│       │   └── ConclusionsPage
│       └── Footer
```

---

## Componentes Compartidos (shared/)

### FormulaDisplay

| Prop | Tipo | Descripción |
|---|---|---|
| `latex` | `string` | Fórmula en formato KaTeX |
| `label?` | `string` | Etiqueta descriptiva |

Renderiza la fórmula matemática con KaTeX centrada, fondo tintado, padding generoso y animación de fade-in.

---

### ResultCard

| Prop | Tipo | Descripción |
|---|---|---|
| `label` | `string` | Nombre del resultado |
| `value` | `number` | Valor numérico |
| `icon` | `LucideIcon` | Icono izquierda |
| `variant?` | `'default' \| 'success' \| 'warning' \| 'danger'` | Color semántico |
| `decimals?` | `number` | Decimales a mostrar (default 6) |

Muestra el valor con NumberFlow (animación fluida de números), icono y label. Border-bottom con color según variante.

---

### IterationTable

| Prop | Tipo | Descripción |
|---|---|---|
| `headers` | `string[]` | Nombres de columnas |
| `rows` | `number[][]` | Datos por fila |
| `highlightLast?` | `boolean` | Resaltar última fila |

Tabla striped con scroll horizontal si hay muchas columnas. Última fila resaltada si highlightLast=true.

---

### MethodSelector

| Prop | Tipo | Descripción |
|---|---|---|
| `methods` | `{ id: string; label: string; description: string }[]` | Lista de métodos |
| `selected` | `string` | Método seleccionado |
| `onSelect` | `(id: string) => void` | Callback al seleccionar |

Tab-style selector con shadcn Tabs. Cada tab muestra nombre corto, tooltip con descripción.

---

### InterpretationCard

| Prop | Tipo | Descripción |
|---|---|---|
| `title` | `string` | Título de la interpretación |
| `content` | `string` | Texto explicativo |
| `icon?` | `LucideIcon` | Icono (default: Info) |

Card con fondo tintado, borde izquierdo grueso color primario, icono de info y texto en lenguaje claro.

---

### AnimatedNumber

| Prop | Tipo | Descripción |
|---|---|---|
| `value` | `number` | Valor a mostrar |
| `decimals?` | `number` | Decimales (default 6) |

Wrapper de number-flow con formato configurable.

---

### ComparisonChart

| Prop | Tipo | Descripción |
|---|---|---|
| `series` | `{ name: string; data: { x: number; y: number }[]; color: string }[]` | Series de datos |
| `xAxis` | `string` | Label eje X |
| `yAxis` | `string` | Label eje Y |
| `title?` | `string` | Título de la gráfica |

Recharts LineChart con tooltip, leyenda y animación de entrada.

---

### AreaChart

| Prop | Tipo | Descripción |
|---|---|---|
| `data` | `{ x: number; y: number }[]` | Datos del área |
| `fill?` | `boolean` | Mostrar relleno (default true) |
| `title?` | `string` | Título |
| `color?` | `string` | Color del área |

Recharts AreaChart para integración (visualización del área bajo la curva).

---

### FunctionPlot

| Prop | Tipo | Descripción |
|---|---|---|
| `fn` | `(x: number) => number` | Función a graficar |
| `root?` | `number` | Raíz encontrada (punto señalado) |
| `interval` | `[number, number]` | Rango del eje X |
| `title?` | `string` | Título |

Recharts LineChart que grafica f(x) y marca la raíz con un punto rojo.

---

### TimeSeriesChart

| Prop | Tipo | Descripción |
|---|---|---|
| `series` | `{ name: string; data: { t: number; value: number }[]; color: string }[]` | Series temporales |
| `criticalLine?` | `number` | Nivel crítico (línea dashed roja) |
| `xAxis` | `string` | Label eje X (ej: "Día") |
| `yAxis` | `string` | Label eje Y |

Recharts LineChart para EDOs. Muestra R(t), N(t), M(t), D(t) con línea crítica si aplica.

---

### DataPointInput

| Prop | Tipo | Descripción |
|---|---|---|
| `points` | `{ x: number; y: number }[]` | Puntos actuales |
| `onChange` | `(points: { x: number; y: number }[]) => void` | Callback al modificar |

Componente para agregar/editar/eliminar puntos de interpolación. Tabla inline con inputs para x,y y botones de agregar/quitar.

---

## Páginas por Módulo

### HomePage

```
HomePage
├── HeroSection
│   ├── Title ("SimuCRISIS")
│   ├── Subtitle
│   └── CTA Button
├── ModuleCards (5 cards con animación)
│   ├── ModuleCard (Sistemas Lineales)
│   ├── ModuleCard (Raíces)
│   ├── ModuleCard (Interpolación)
│   ├── ModuleCard (Integración)
│   └── ModuleCard (EDOs)
└── ContextSection
    ├── ProblemDescription
    └── ObjectiveDescription
```

---

### LinearSystemsPage

```
LinearSystemsPage
├── ModuleHeader (título, descripción)
├── MethodSelector (Jacobi, Gauss-Seidel, SOR, LU, Gradiente Conjugado)
├── FormulaDisplay (fórmula del método seleccionado)
├── LinearSystemsForm
│   ├── MatrixInput (3x3 o nxn editable)
│   ├── VectorInput (b)
│   ├── InitialVectorInput (x0, opcional para iterativos)
│   ├── ToleranceInput
│   ├── MaxIterationsInput
│   ├── OmegaInput (solo para SOR)
│   └── CalculateButton
├── ResultsSection (aparece con animación Motion)
│   ├── ResultCards (solución x, error, iteraciones, tiempo)
│   ├── ComparisonChart (convergencia error vs iteración)
│   ├── IterationTable
│   └── InterpretationCard
└── ScenarioQuestion (responde preguntas del escenario A)
```

---

### RootsPage

```
RootsPage
├── ModuleHeader
├── MethodSelector (Bisección, Newton-Raphson, Secante)
├── FormulaDisplay
├── RootsForm
│   ├── FunctionInput (math.js parser)
│   ├── DerivativeInput (solo Newton-Raphson)
│   ├── IntervalInput [a, b] (Bisección, Secante)
│   ├── InitialPointInput x0 (Newton-Raphson)
│   ├── ToleranceInput
│   ├── MaxIterationsInput
│   └── CalculateButton
├── ResultsSection
│   ├── ResultCards (raíz, f(raíz), iteraciones, orden de convergencia)
│   ├── FunctionPlot (función con raíz señalada)
│   ├── IterationTable
│   └── InterpretationCard
└── MethodComparison (si se ejecutaron múltiples métodos, tabla comparativa)
```

---

### InterpolationPage

```
InterpolationPage
├── ModuleHeader
├── MethodSelector (Lagrange, Newton, Splines Cúbicos)
├── FormulaDisplay
├── InterpolationForm
│   ├── DataPointInput (tabla editable de puntos x,y)
│   ├── EvaluatePointInput (x a evaluar)
│   └── CalculateButton
├── ResultsSection
│   ├── ResultCard (valor interpolado en x_eval)
│   ├── ComparisonChart (curva interpolada vs puntos originales)
│   ├── DifferenceTable (tabla de diferencias divididas, solo Newton)
│   ├── SplineCoefficients (coeficientes a,b,c,d, solo Splines)
│   └── InterpretationCard
└── MethodComparison
```

---

### IntegrationPage

```
IntegrationPage
├── ModuleHeader
├── MethodSelector (Trapecio, Simpson 1/3, Simpson 3/8)
├── FormulaDisplay
├── IntegrationForm
│   ├── FunctionInput (o DataPointInput para datos tabulados)
│   ├── IntervalInput [a, b]
│   ├── SubintervalsInput (n)
│   ├── BasePriceInput (precio sin inflación, para comparación)
│   └── CalculateButton
├── ResultsSection
│   ├── ResultCards (integral, gasto acumulado, pérdida de poder adquisitivo)
│   ├── AreaChart (área bajo la curva)
│   ├── ComparisonChart (precio real vs precio constante)
│   └── InterpretationCard
└── MethodComparison
```

---

### OdesPage

```
OdesPage
├── ModuleHeader
├── Tabs (Reservas | Descontento Social)
├── ReservesTab
│   ├── MethodSelector (Euler, Heun, RK4)
│   ├── FormulaDisplay (R'(t) = E(t) - C(t))
│   ├── ReservesForm
│   │   ├── InitialReserveInput R(0)
│   │   ├── SupplyRateInput E(t)
│   │   ├── ConsumptionRateInput C(t)
│   │   ├── CriticalLevelInput
│   │   ├── TimeIntervalInput [t0, tFinal]
│   │   ├── StepSizeInput h
│   │   └── CalculateButton
│   ├── ResultsSection
│   │   ├── ResultCards (día crítico, reserva mínima, reserva final)
│   │   ├── TimeSeriesChart (R(t) con línea crítica)
│   │   ├── IterationTable (tabla t vs R)
│   │   └── InterpretationCard
│   └── MethodComparison
├── SocialTab
│   ├── MethodSelector
│   ├── FormulaDisplay (N', M', D')
│   ├── SocialForm
│   │   ├── PopulationInputs N(0), M(0), D(0)
│   │   ├── ParameterInputs a, b, c, k, r
│   │   ├── TimeIntervalInput [t0, tFinal]
│   │   ├── StepSizeInput h
│   │   └── CalculateButton
│   ├── ResultsSection
│   │   ├── ResultCards (poblaciones finales, máximo manifestantes)
│   │   ├── TimeSeriesChart (N(t), M(t), D(t))
│   │   ├── IterationTable
│   │   └── InterpretationCard
│   └── MethodComparison
```

---

### ConclusionsPage

```
ConclusionsPage
├── ConclusionSection
│   ├── WhatWeLearned
│   ├── MostUsefulMethodPerModule
│   ├── Limitations
│   ├── PossibleImprovements
│   └── FinalReflection
```

---

## Estado por Módulo

Cada módulo sigue el mismo patrón de estado:

```typescript
type ModuleState<TParams, TResult> = {
  params: TParams | null
  result: TResult | null
  isLoading: boolean
  error: string | null
}
```

El estado se maneja con `useState` dentro de cada hook personalizado (`use-linear-system.ts`, etc.). No se usa estado global porque cada módulo es independiente.

---

## Flujo de Renderizado

```
1. Usuario selecciona método → fórmula KaTeX cambia
2. Usuario llena formulario → zod valida inline
3. Usuario hace click en "Calcular"
   ├── isLoading = true
   ├── Se llama al algoritmo correspondiente
   ├── Se mide tiempo de ejecución
   ├── result = algoritmo(params)
   ├── isLoading = false
   └── Resultados aparecen con animación (Motion fade-up stagger)
4. Resultados se muestran:
   ├── ResultCards con NumberFlow
   ├── Gráfica con Recharts animación
   ├── Tabla de iteraciones
   └── InterpretationCard
```