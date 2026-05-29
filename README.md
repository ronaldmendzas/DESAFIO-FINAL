# DESAFIO FINAL — Simulacion Numerica de Crisis

Pagina web interactiva que aplica metodos numericos para modelar y simular problemas de abastecimiento, precios y conflicto social en contexto de crisis.

Desarrollado por **Ronald Mendoza Caspa** y **Carla Andrea Enriquez Bravo**.

---

## Stack

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

## Modulos

1. **Sistemas de ecuaciones lineales** — Jacobi, Gauss-Seidel, SOR, LU, Gradiente Conjugado
2. **Raices de ecuaciones** — Biseccion, Newton-Raphson, Secante
3. **Interpolacion** — Lagrange, Newton, Splines cubicos
4. **Integracion numerica** — Trapecio, Simpson 1/3, Simpson 3/8
5. **Ecuaciones diferenciales** — Euler, Heun, Runge-Kutta 4

Cada modulo incluye: formulario de entrada, grafica de resultados, tabla de iteraciones, formula matematica (KaTeX) e interpretacion del resultado en contexto.

---

## Estructura

```
src/
  algorithms/          # Implementacion pura de cada metodo numerico
  hooks/               # Logica de negocio + schemas Zod
  components/
    layout/             # Navbar, Sidebar, AppLayout
    shared/             # FormulaDisplay, ResultCard, IterationTable, NumberInput, etc.
    ui/                 # shadcn/ui + Magic UI
  modules/              # Cada modulo: page, form, results
    linear-systems/
    roots/
    interpolation/
    integration/
    odes/
  pages/                # HomePage, ConclusionsPage
  types/                # Tipos TypeScript por modulo
```

---

## Comandos

```bash
npm install      # Instalar dependencias
npm run dev      # Servidor de desarrollo (localhost:5173)
npm run build    # Build de produccion
npm run preview  # Preview del build
```

---

## Deploy

Push a `main` → deploy automatico en Vercel.

---

## Repositorio

https://github.com/ronaldmendzas/DESAFIO-FINAL