# Buenas Prácticas

## Código

### Funciones cortas

- Máximo **20 líneas** por función
- Una función hace **una sola cosa**
- Si una función hace más de una cosa, dividirla en dos
- Nombre descriptivo, no abreviaciones oscuras

```typescript
// ✅ Bien
function calculateJacobiIteration(matrix: number[][], vector: number[], current: number[]): number[] {
  return current.map((_, i) => {
    const sum = vector[i] - calculateRowSum(matrix, current, i)
    return sum / matrix[i][i]
  })
}

// ❌ Mal
function calc(m: number[][], v: number[], x: number[]): number[] {
  // 40 líneas haciendo de todo
}
```

### Archivos cortos

- Máximo **150 líneas** por archivo
- Un componente por archivo
- Un hook por archivo
- Un algoritmo por archivo
- Si un archivo crece demasiado, dividir responsabilidades

### Sin comentarios

- El código se explica solo con buenos nombres
- Eliminar todos los comentarios excepto los que expliquen el **porqué**, no el **qué**

```typescript
// ✅ Bien (explica por qué, no qué)
const MAX_ITERATIONS = 1000 // Jacobi diverge con más de 1000 para matrices mal condicionadas

// ❌ Mal (explica qué, esto ya lo dice el código)
const MAX_ITERATIONS = 1000 // número máximo de iteraciones
```

### Sin `any`

- TypeScript estricto, ningún `any`
- Todos los parámetros y retornos tipados
- Usar `unknown` si no se sabe el tipo y hacer narrowing

```typescript
// ✅ Bien
function parseInput(value: unknown): number {
  if (typeof value !== 'number') throw new Error('Invalid input')
  return value
}

// ❌ Mal
function parseInput(value: any): number {
  return value
}
```

### Sin `console.log`

- Cero `console.log` en producción
- Si se necesita debug, usar `console.debug` y eliminar antes de commit
- Errores manejarlos con el sistema de errores del hook, no con console

### Imports ordenados

Ordenar imports en 4 grupos separados por línea en blanco:

```typescript
// 1. Librerías externas
import { useForm } from 'react-hook-form'
import { useTheme } from 'next-themes'
import { motion } from 'motion/react'

// 2. Componentes UI
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 3. Componentes propios
import { FormulaDisplay } from '@/components/shared/formula-display'
import { ResultCard } from '@/components/shared/result-card'

// 4. Tipos, utils, algoritmos
import { jacobi } from '@/algorithms/linear-systems/jacobi'
import type { LinearSystemResult } from '@/types/linear-systems'
```

### Componentes ordenados

Orden interno de todo componente:

```typescript
// 1. Imports

// 2. Tipos del componente
type Props = {
  title: string
  onCalculate: () => void
}

// 3. Componente
export function MyComponent({ title, onCalculate }: Props) {
  // 3a. Hooks (useForm, useState, useEffect, custom hooks)
  const { control, handleSubmit } = useForm()
  const [result, setResult] = useState(null)

  // 3b. Handlers
  const handleCalculate = () => { ... }

  // 3c. Render
  return (
    <div>...</div>
  )
}
```

### Tailwind ordenado

Orden de clases Tailwind por categoría:

```tsx
<div className="
  // Layout
  flex flex-col items-center justify-center
  // Spacing
  gap-4 p-6 mx-auto
  // Size
  w-full max-w-4xl h-auto
  // Typography
  text-lg font-semibold text-zinc-900
  // Colors
  bg-white border border-zinc-200
  // Effects
  rounded-xl shadow-sm
  // Responsive
  md:grid md:grid-cols-2
  // States
  hover:bg-zinc-50 focus:ring-2
  // Dark
  dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-800
">
```

---

## Git

### Conventional Commits

Formato: `tipo: descripción breve`

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `refactor` | Reestructuración sin cambio funcional |
| `style` | Cambios visuales, CSS, colores |
| `docs` | Cambios en documentación |
| `chore` | Configuración, dependencias |
| `test` | Tests |

Ejemplos:

```
feat: agregar módulo de sistemas lineales
feat: implementar método de Jacobi
feat: formulario de ingreso de matriz con validación
fix: corregir cálculo de error en Gauss-Seidel
refactor: separar algoritmo de componente en roots
style: agregar animaciones de entrada con Motion
docs: actualizar README con stack definitivo
chore: configurar Tailwind v4
test: verificar convergencia de SOR con omega=1.5
```

### Historial limpio

- Commits pequeños y atómicos
- Un commit = un cambio lógico
- No commits con "wip" o "fix stuff"
- Si se necesita reorganizar, hacer squash antes de push

### Branches

| Branch | Propósito |
|---|---|
| `main` | Producción, deploy automático a Vercel |
| `feat/sistemas-lineales` | Módulo 1 |
| `feat/raices` | Módulo 2 |
| `feat/interpolacion` | Módulo 3 |
| `feat/integracion` | Módulo 4 |
| `feat/odes` | Módulo 5 |
| `feat/layout` | Navbar, sidebar, tema |
| `feat/home` | Página de inicio |
| `feat/conclusiones` | Página de conclusiones |

---

## Algoritmos

### Puros sin UI

- Todo algoritmo en `src/algorithms/` es **TypeScript puro**
- Cero imports de React
- Cero `console.log`
- Solo depende de `math.js` para parsing de funciones del usuario
- Recibe parámetros, retorna resultado tipado

### Interfaz consistente

Todos los algoritmos siguen el mismo patrón:

```typescript
export function metodoNombre(params: MetodoNombreParams): MetodoNombreResult {
  // 1. Validar parámetros
  // 2. Inicializar variables
  // 3. Bucle iterativo
  // 4. Retornar resultado
}
```

### Tipos de retorno

```typescript
type IterationData = {
  iteration: number
  values: number[]
  error: number
}

type AlgorithmResult = {
  result: number | number[]
  iterations: IterationData[]
  converged: boolean
  executionTime: number
}
```

Cada módulo extiende este tipo base con campos específicos.

### No código muerto

- Eliminar funciones no utilizadas
- Eliminar imports no utilizados
- Eliminar variables declaradas sin usar
- Eliminar archivos vacíos o de prueba

---

## Formularios

### Esquema Zod por módulo

Cada módulo tiene su esquema de validación Zod:

```typescript
import { z } from 'zod'

export const linearSystemSchema = z.object({
  matrix: z.array(z.array(z.number())),
  vector: z.array(z.number()),
  tolerance: z.number().min(1e-15).max(1),
  maxIterations: z.number().min(1).max(10000),
  method: z.enum(['jacobi', 'gauss-seidel', 'sor', 'lu', 'conjugate-gradient']),
  omega: z.number().min(0).max(2).optional(),
  initialVector: z.array(z.number()).optional(),
})
```

### react-hook-form + zod

Todo formulario usa `react-hook-form` con `zodResolver`:

```typescript
const form = useForm({
  resolver: zodResolver(linearSystemSchema),
  defaultValues: { ... },
})
```

### Mensajes de error claros

Los mensajes de validación son en español y específicos:

```typescript
z.number().min(0, 'La tolerancia debe ser positiva')
z.number().max(10000, 'Máximo 10000 iteraciones')
```

---

## Rendimiento

### Lazy loading de módulos

```typescript
const LinearSystemsPage = lazy(() => import('@/modules/linear-systems/linear-systems-page'))
```

### Memorización

- `useMemo` para cálculos pesados
- `useCallback` para handlers que se pasan como props
- No memorizar todo, solo lo que sea costoso

### No re-renders innecesarios

- Evitar crear objetos/arrays inline en render
- Usar `key` correctamente en listas
- Separar componentes que cambían frecuentemente

---

## Accesibilidad

- Labels asociados a inputs con `htmlFor`
- Botones con texto descriptivo, no solo iconos
- Colores con contraste suficiente (WCAG AA)
- Focus visible en todos los elementos interactivos
- `aria-label` en campos numéricos de matriz
- Gráficas con descripción textual alternativa

---

## Despliegue

### Verificar antes de deploy

- [ ] `npm run build` sin errores
- [ ] Todos los módulos funcionan en `/preview`
- [ ] Todas las rutas cargan correctamente
- [ ] Dark mode funciona en todos los módulos
- [ ] Responsive en móvil, tablet y desktop
- [ ] No hay `console.log` en el código
- [ ] No hay errores en consola del navegador