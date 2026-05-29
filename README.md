# SimNum — Simulacion Numerica de Crisis

## Presentacion

Pagina web interactiva que aplica metodos numericos para modelar y simular problemas de abastecimiento, transporte, precios y conflicto social en contexto de crisis.

**Desarrollado por:**
- Ronald Mendoza Caspa
- Carla Andrea Enriquez Bravo

**Materia:** Metodos Numericos

**Repositorio:** https://github.com/ronaldmendzas/DESAFIO-FINAL

---

## Contexto del problema real

En el contexto actual que atraviesa el pais, se observan problemas relacionados con el abastecimiento de carburantes, transporte, alimentos, incremento de precios, rumores de escasez, bloqueos, conflictos sociales y perdida del poder adquisitivo familiar. Este proyecto utiliza metodos numericos como herramienta para analizar y simular esos escenarios.

---

## Que se pedia (Segun el Desafio Final)

| # | Requisito | Cumplido |
|---|---|---|
| 1 | Titulo claro del proyecto | Si |
| 2 | Explicacion del contexto del problema real | Si |
| 3 | Modulo de sistemas de ecuaciones lineales | Si |
| 4 | Modulo de raices de ecuaciones | Si |
| 5 | Modulo de interpolacion | Si |
| 6 | Modulo de integracion numerica | Si |
| 7 | Modulo de ecuaciones diferenciales | Si |
| 8 | Formularios para ingresar datos | Si |
| 9 | Resultados en pantalla (no solo consola) | Si |
| 10 | Tablas y graficos para visualizar resultados | Si |
| 11 | Explicacion del algoritmo utilizado (formulas KaTeX) | Si |
| 12 | Interpretacion de resultados con lenguaje claro | Si |
| 13 | Diseno responsivo (computadora y celular) | Si |
| 14 | Codigo organizado y en repositorio Git | Si |
| 15 | Pagina publicada en la web (Vercel) | Si |
| 16 | Conclusiones y limitaciones del modelo | Si |

### Metodos numericos implementados

| Area | Metodos | Aplicacion en el proyecto |
|---|---|---|
| Sistemas de ecuaciones lineales | Jacobi, Gauss-Seidel, SOR, LU, Gradiente Conjugado | Distribucion de abastecimiento desde plantas de acopio hacia zonas |
| Raices de ecuaciones | Biseccion, Newton-Raphson, Secante | Punto critico de reserva, precio limite, demanda maxima |
| Interpolacion | Lagrange, Newton, Splines cubicos | Curva de precios de alimentos a partir de datos dispersos |
| Integracion numerica | Trapecio, Simpson 1/3, Simpson 3/8 | Costo acumulado mensual, perdida de poder adquisitivo |
| Ecuaciones diferenciales | Euler, Heun, Runge-Kutta 4 | Vaciado de reservas de carburantes, difusion de descontento social |

---

## Escenarios implementados

- **Escenario A:** Distribucion de abastecimiento y red de transporte (sistemas lineales)
- **Escenario B:** Vaciado critico de reservas en plantas de carburantes (EDOs)
- **Escenario C:** Desabastecimiento de alimentos y curva continua de precios (interpolacion)
- **Escenario D:** Costo acumulado y perdida del poder adquisitivo familiar (integracion)
- **Escenario E:** Umbrales criticos de abastecimiento, precio limite, demanda maxima (raices)

---

## Stack tecnologico

| Categoria | Tecnologia |
|---|---|
| Framework | React + Vite + TypeScript |
| Estilos | Tailwind CSS v4 |
| Componentes | shadcn/ui + Magic UI |
| Animaciones | Motion |
| Graficas | Recharts |
| Formulas | KaTeX |
| Calculos | math.js |
| Validacion | Zod |
| Tipografia | Geist Font |
| Deploy | Vercel |

---

## Estructura del proyecto

```
src/
  algorithms/          # Implementacion pura de cada metodo numerico
    linear-systems/      # Jacobi, Gauss-Seidel, SOR, LU, Gradiente Conjugado
    roots/               # Biseccion, Newton-Raphson, Secante
    interpolation/       # Lagrange, Newton, Splines Cubicos
    integration/         # Trapecio, Simpson 1/3, Simpson 3/8
    odes/                # Euler, Heun, RK4
  hooks/                # Logica de negocio + schemas Zod
  components/
    layout/              # Navbar, Sidebar, AppLayout
    shared/              # FormulaDisplay, ResultCard, IterationTable, NumberInput, GodButton, etc.
    ui/                  # shadcn/ui + Magic UI
  modules/               # Cada modulo: page, form, results
    linear-systems/
    roots/
    interpolation/
    integration/
    odes/
  pages/                # HomePage, ConclusionsPage
  types/                # Tipos TypeScript por modulo
```

---

## Cada modulo incluye

- Formulario de entrada de datos con validacion
Seleccion del metodo numerico (tabs)
- Formula matematica renderizada con KaTeX
- Resultados numericos (result cards)
- Graficas interactivas (Recharts): convergencia, funciones, comparacion de metodos
- Tablas de iteraciones
- Interpretacion del resultado en contexto real
- Comparacion entre metodos cuando se ejecutan multiples

---

## Comandos

```bash
npm install      # Instalar dependencias
npm run dev     # Servidor de desarrollo (localhost:5173)
npm run build   # Build de produccion
npm run preview # Preview del build
```

---

## Conclusiones

1. Los metodos iterativos (Jacobi, Gauss-Seidel, SOR) convergen mas rapido cuando la matriz es diagonalmente dominante. LU es directo pero costoso para sistemas grandes.
2. Newton-Raphson converge cuadraticamente pero requiere derivada y buen punto inicial. Biseccion siempre converge si hay cambio de signo pero es lento.
3. Los splines cubicos evitan el fenomeno de Runge con datos irregulares. Newton permite agregar puntos sin recalcular todo.
4. Simpson 1/3 es mas preciso que el trapecio con el mismo numero de puntos. Simpson 3/8 es util cuando n no es divisible por 2.
5. RK4 ofrece precision O(h^4) con 4 evaluaciones por paso. Euler es simple pero inestable para pasos grandes.
6. Los modelos son simplificaciones; factores sociales y politicos no se capturan en ecuaciones.

---

## Autoevaluacion (Rubrica - 70 pts)

| N | Criterio | Pts | Cumplido | Observacion |
|---|---|---|---|---|
| 1 | Presenta claramente el contexto del problema real | 5 | Si | Pagina de inicio y cada modulo explican el contexto |
| 2 | Aplica correctamente sistemas de ecuaciones lineales | 6 | Si | 5 metodos: Jacobi, Gauss-Seidel, SOR, LU, Gradiente Conjugado |
| 3 | Aplica correctamente metodos de raices de ecuaciones | 6 | Si | 3 metodos: Biseccion, Newton-Raphson, Secante |
| 4 | Aplica correctamente interpolacion | 6 | Si | 3 metodos: Lagrange, Newton, Splines Cubicos |
| 5 | Aplica correctamente integracion numerica | 6 | Si | 3 metodos: Trapecio, Simpson 1/3, Simpson 3/8 |
| 6 | Aplica correctamente ecuaciones diferenciales | 6 | Si | 3 metodos: Euler, Heun, Runge-Kutta 4 |
| 7 | La pagina web es interactiva y permite ingresar datos | 5 | Si | Formularios con validacion en cada modulo |
| 8 | Muestra resultados en pantalla mediante tablas, textos y graficos | 5 | Si | ResultCards, IterationTable, Recharts, InterpretationCard |
| 9 | Interpreta los resultados de manera clara y critica | 5 | Si | InterpretationCard en cada resultado |
| 10 | El diseno visual es ordenado y responsivo | 4 | Si | Tailwind CSS, diseno mobile-first, sidebar responsive |
| 11 | El codigo esta organizado | 4 | Si | TypeScript estricto, carpetas por modulo, hooks, algoritmos separados |
| 12 | El repositorio Git esta completo y ordenado | 3 | Si | Commits convencionales, 7 docs de arquitectura |
| 13 | La pagina esta publicada correctamente en la web | 4 | Si | Vercel deployment |
| 14 | Incluye conclusiones y limitaciones del modelo | 5 | Si | Pagina de conclusiones con hallazgos, limitaciones y referencias |
| **Total** | | **70** | **70** | |

---

## Formato de entrega

- **Nombre completo:** Ronald Mendoza Caspa, Carla Andrea Enriquez Bravo
- **Materia:** Metodos Numericos
- **Titulo del proyecto:** SimNum — Simulacion Numerica de Crisis
- **Enlace de la pagina web:** https://desafio-final.vercel.app
- **Enlace del repositorio Git:** https://github.com/ronaldmendzas/DESAFIO-FINAL