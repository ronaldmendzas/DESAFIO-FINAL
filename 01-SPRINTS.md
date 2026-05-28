# Sprints

## Sprint 0 — Setup (Día 1)

- Inicializar proyecto con Vite + React + TypeScript
- Instalar y configurar Tailwind CSS v4
- Instalar y configurar shadcn/ui
- Instalar librerías: Recharts, KaTeX, math.js, Motion, number-flow, Magic UI, react-hook-form, zod, next-themes, lucide-react, Geist Font
- Crear estructura de carpetas
- Configurar Vercel deploy
- Configurar Git (branch main, protección, Conventional Commits)
- Crear layout base: Navbar, Sidebar, tema dark/light

**Entregable:** Proyecto corriendo en localhost con layout vacío y deploy en Vercel.

---

## Sprint 1 — Módulo 1: Sistemas de Ecuaciones Lineales (Día 2-3)

Escenario A — Optimización del abastecimiento y red de transporte.

### Tareas

- Implementar métodos: Jacobi, Gauss-Seidel, SOR, LU, Gradiente Conjugado
- Formulario para ingresar matriz de coeficientes y vector de términos independientes
- Selector de método
- Tabla de iteraciones
- Gráfica de convergencia (Error vs Iteración)
- Visualización de la red de transporte con resultados
- Explicación del algoritmo con KaTeX
- Interpretación de resultados
- Preguntas que responde:
  - ¿Cuánto debe enviarse a cada zona?
  - ¿Qué pasa si una ruta se bloquea?
  - ¿Qué zona queda más afectada?
  - ¿El sistema es estable o sensible a pequeños cambios?
  - ¿La solución cambia mucho si la demanda aumenta?

**Entregable:** Módulo 1 funcional con formulario, cálculos, tabla, gráfica e interpretación.

---

## Sprint 2 — Módulo 2: Raíces de Ecuaciones (Día 4)

Escenario E — Umbrales críticos de abastecimiento.

### Tareas

- Implementar métodos: Bisección, Newton-Raphson, Secante
- Formulario para ingresar función, intervalo/valor inicial, tolerancia, iteraciones máximas
- Gráfica de la función con raíz señalada
- Tabla de iteraciones con error y convergencia
- Comparación entre métodos (velocidad, iteraciones, precisión)
- Cálculo del orden de convergencia estimado
- Explicación del algoritmo con KaTeX
- Interpretación de resultados
- Preguntas que responde:
  - ¿En qué punto el costo acumulado supera el ingreso familiar?
  - ¿Cuál es la tasa de reposición crítica?
  - ¿Qué método converge más rápido?

**Entregable:** Módulo 2 funcional con gráfica de función, tabla de iteraciones y comparación de métodos.

---

## Sprint 3 — Módulo 3: Interpolación (Día 5)

Escenario C — Desabastecimiento de alimentos y curva continua de precios.

### Tareas

- Implementar métodos: Lagrange, Newton, Splines cúbicos
- Formulario para ingresar datos dispersos (día, precio)
- Posibilidad de agregar/quitar puntos
- Gráfica de curva interpolada vs datos originales
- Estimación de valores intermedios (precio en día sin dato)
- Comparación entre métodos
- Animación de la curva construyéndose punto a punto
- Explicación del algoritmo con KaTeX
- Interpretación de resultados
- Preguntas que responde:
  - ¿Cuál sería el precio aproximado en un día sin dato?
  - ¿Cómo se comporta la curva de precios durante el mes?
  - ¿Qué producto tuvo mayor incremento?
  - ¿Qué tan confiable es la interpolación?

**Entregable:** Módulo 3 funcional con gráfica interpolada, estimación de valores y comparación de métodos.

---

## Sprint 4 — Módulo 4: Integración Numérica (Día 6)

Escenario D — Costo acumulado y pérdida del poder adquisitivo familiar.

### Tareas

- Implementar métodos: Trapecio, Simpson 1/3, Simpson 3/8
- Formulario para ingresar función de precios o datos tabulados
- Gráfica del área bajo la curva (visualización de la integración)
- Cálculo del gasto acumulado mensual
- Comparación entre gastos con precios estables vs precios crecientes
- Cálculo de la pérdida de poder adquisitivo
- Comparación de precisión entre métodos
- Explicación del algoritmo con KaTeX
- Interpretación económica de resultados
- Preguntas que responde:
  - ¿Cuánto gastó una familia durante el mes?
  - ¿Cuánto hubiera gastado si los precios no subían?
  - ¿Cuál fue la pérdida aproximada del poder adquisitivo?
  - ¿Qué método de integración fue más preciso?

**Entregable:** Módulo 4 funcional con gráfica de área, cálculo de gasto y comparación de métodos.

---

## Sprint 5 — Módulo 5: Ecuaciones Diferenciales (Día 7-8)

Escenarios B y G — Vaciado de reservas y difusión de descontento social.

### Tareas

- Implementar métodos: Euler, Heun, RK4
- **Sub-módulo B — Reservas de carburantes:**
  - Formulario para R(0), tasa de entrada, tasa de consumo, días a simular
  - Gráfica de R(t) con línea crítica señalada
  - Tabla de valores por día
  - Detección automática del día en que la reserva llega a nivel crítico
- **Sub-módulo G — Descontento social:**
  - Formulario para N(0), M(0), D(0) y parámetros a, b, c, k, r
  - Gráfica de N(t), M(t), D(t) en el tiempo
  - Tabla de valores por día
  - Análisis de estabilidad del sistema
- Comparación entre Euler, Heun y RK4
- Explicación del algoritmo con KaTeX
- Interpretación de resultados
- Preguntas que responde:
  - ¿En cuántos días la reserva llega a nivel crítico?
  - ¿El conflicto tiende a estabilizarse?
  - ¿Qué pasa si no existen mediadores?
  - ¿Qué método da una aproximación más estable?

**Entregable:** Módulo 5 funcional con dos sub-módulos, gráficas de evolución temporal y comparación de métodos.

---

## Sprint 6 — Integración, pulido y deploy (Día 9-10)

### Tareas

- Página de inicio con contexto del problema y objetivo
- Navegación entre módulos (Sidebar + rutas)
- Página de conclusiones
- Revisión responsive (móvil, tablet, desktop)
- Dark mode funcional
- Animaciones de transición entre secciones
- Revisión de tablas y gráficas en todos los módulos
- Revisión de interpretaciones de resultados
- Revisión de explicaciones de algoritmos
- SEO básico (título, descripción, favicon)
- Rendimiento (Lighthouse)
- Deploy final en Vercel
- Verificar enlace funcional
- Verificar repositorio Git completo y ordenado
- Completar checklist de autoevaluación

**Entregable:** Proyecto completo publicado en Vercel, repositorio ordenado en GitHub.

---

## Timeline Visual

```
Día 1:  [Sprint 0 — Setup]
Día 2:  [Sprint 1 — Sistemas Lineales]
Día 3:  [Sprint 1 — Sistemas Lineales (cont.)]
Día 4:  [Sprint 2 — Raíces]
Día 5:  [Sprint 3 — Interpolación]
Día 6:  [Sprint 4 — Integración]
Día 7:  [Sprint 5 — EDOs]
Día 8:  [Sprint 5 — EDOs (cont.)]
Día 9:  [Sprint 6 — Integración y pulido]
Día 10: [Sprint 6 — Deploy final]
```

---

## Checklist por Sprint

Cada módulo debe cumplir:

- [ ] Formulario funcional con validación (zod + react-hook-form)
- [ ] Cálculos correctos implementados desde cero
- [ ] Tabla de resultados en pantalla
- [ ] Gráfica con Recharts
- [ ] Explicación del algoritmo con KaTeX
- [ ] Interpretación de resultados en lenguaje claro
- [ ] Responsive
- [ ] Animaciones con Motion
- [ ] Números animados con number-flow donde aplique