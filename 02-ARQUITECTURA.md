# Arquitectura

## Stack

| Categoría | Tecnología | Versión |
|---|---|---|
| Framework | React + Vite | React 19, Vite 6 |
| Lenguaje | TypeScript | 5.x |
| Estilos | Tailwind CSS | v4 |
| Componentes UI | shadcn/ui | latest |
| Animaciones UI | Magic UI | latest |
| Animaciones | Motion | 12.x |
| Números animados | number-flow | latest |
| Gráficas | Recharts | 2.x |
| Iconos | lucide-react | latest |
| Formularios | react-hook-form | 7.x |
| Validación | zod | 3.x |
| Fórmulas | KaTeX | latest |
| Cálculos | math.js | 13.x |
| Tema | next-themes | latest |
| Tipografía | Geist Font | latest |
| Deploy | Vercel | - |

---

## Estructura de Carpetas

```
DESAFIO-FINAL/
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── assets/
│   │   └── fonts/
│   │       └── geist.css
│   ├── components/
│   │   ├── ui/                    ← shadcn/ui (autogenerado)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── app-layout.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── footer.tsx
│   │   ├── shared/
│   │   │   ├── formula-display.tsx
│   │   │   ├── result-card.tsx
│   │   │   ├── iteration-table.tsx
│   │   │   ├── method-selector.tsx
│   │   │   ├── interpretation-card.tsx
│   │   │   └── animated-number.tsx
│   │   └── magic-ui/             ← Magic UI (autogenerado)
│   │       ├── animated-beam.tsx
│   │       ├── shimmer-border.tsx
│   │       └── ...
│   ├── modules/
│   │   ├── linear-systems/
│   │   │   ├── linear-systems-page.tsx
│   │   │   ├── linear-systems-form.tsx
│   │   │   ├── linear-systems-results.tsx
│   │   │   └── linear-systems-chart.tsx
│   │   ├── roots/
│   │   │   ├── roots-page.tsx
│   │   │   ├── roots-form.tsx
│   │   │   ├── roots-results.tsx
│   │   │   └── roots-chart.tsx
│   │   ├── interpolation/
│   │   │   ├── interpolation-page.tsx
│   │   │   ├── interpolation-form.tsx
│   │   │   ├── interpolation-results.tsx
│   │   │   └── interpolation-chart.tsx
│   │   ├── integration/
│   │   │   ├── integration-page.tsx
│   │   │   ├── integration-form.tsx
│   │   │   ├── integration-results.tsx
│   │   │   └── integration-chart.tsx
│   │   └── odes/
│   │       ├── odes-page.tsx
│   │       ├── reserves-form.tsx
│   │       ├── social-form.tsx
│   │       ├── odes-results.tsx
│   │       └── odes-chart.tsx
│   ├── algorithms/
│   │   ├── linear-systems/
│   │   │   ├── jacobi.ts
│   │   │   ├── gauss-seidel.ts
│   │   │   ├── sor.ts
│   │   │   ├── lu.ts
│   │   │   └── conjugate-gradient.ts
│   │   ├── roots/
│   │   │   ├── bisection.ts
│   │   │   ├── newton-raphson.ts
│   │   │   └── secant.ts
│   │   ├── interpolation/
│   │   │   ├── lagrange.ts
│   │   │   ├── newton.ts
│   │   │   └── cubic-splines.ts
│   │   ├── integration/
│   │   │   ├── trapezoidal.ts
│   │   │   ├── simpson-1-3.ts
│   │   │   └── simpson-3-8.ts
│   │   └── odes/
│   │       ├── euler.ts
│   │       ├── heun.ts
│   │       └── rk4.ts
│   ├── hooks/
│   │   ├── use-linear-system.ts
│   │   ├── use-roots.ts
│   │   ├── use-interpolation.ts
│   │   ├── use-integration.ts
│   │   └── use-odes.ts
│   ├── lib/
│   │   ├── utils.ts               ← shadcn utils (cn, etc.)
│   │   ├── matrix.ts              ← operaciones con matrices
│   │   └── function-parser.ts     ← parser de funciones con math.js
│   ├── types/
│   │   ├── linear-systems.ts
│   │   ├── roots.ts
│   │   ├── interpolation.ts
│   │   ├── integration.ts
│   │   └── odes.ts
│   ├── pages/
│   │   ├── home-page.tsx
│   │   └── conclusions-page.tsx
│   ├── theme/
│   │   └── theme-provider.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── docs/                           ← documentación
│   ├── 01-SPRINTS.md
│   ├── 02-ARQUITECTURA.md
│   ├── 03-DISENO.md
│   ├── 04-MODELOS-MATEMATICOS.md
│   ├── 05-COMPONENTES.md
│   └── 06-BUENAS-PRACTICAS.md
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── components.json                 ← shadcn config
└── README.md
```

---

## Flujo de Datos

```
Usuario ingresa datos en formulario (react-hook-form + zod)
  │
  ▼
Hook personalizado valida y transforma datos
  │
  ▼
Algoritmo numérico puro (sin side effects, sin UI)
  │
  ├── Retorna resultado numérico
  ├── Retorna tabla de iteraciones
  └── Retorna datos para gráfica
  │
  ▼
Componente de resultados recibe datos
  │
  ├── IterationTable → muestra iteraciones
  ├── Recharts → muestra gráfica
  ├── NumberFlow → muestra números animados
  ├── FormulaDisplay → muestra fórmula KaTeX
  └── InterpretationCard → muestra interpretación
```

---

## Principios de Arquitectura

1. **Algoritmos separados de UI** — Todo en `src/algorithms/` es TypeScript puro, sin imports de React
2. **Un componente por archivo** — Un archivo = una responsabilidad
3. **Hooks como puente** — Los hooks (`use-*.ts`) conectan algoritmos con componentes
4. **Tipos explícitos** — Cada módulo tiene sus tipos en `src/types/`
5. **Componentes compartidos** — Todo lo reutilizable va en `src/components/shared/`
6. **Módulos independientes** — Cada módulo es autocontenido en `src/modules/`

---

## Dependencias — package.json

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "recharts": "^2.15.0",
    "mathjs": "^13.0.0",
    "katex": "^0.16.0",
    "react-hook-form": "^7.54.0",
    "@hookform/resolvers": "^3.0.0",
    "zod": "^3.24.0",
    "next-themes": "^0.4.0",
    "lucide-react": "^0.468.0",
    "motion": "^12.0.0",
    "number-flow": "^0.2.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## Rutas

| Ruta | Componente | Módulo |
|---|---|---|
| `/` | HomePage | Inicio |
| `/sistemas-lineales` | LinearSystemsPage | Módulo 1 |
| `/raices` | RootsPage | Módulo 2 |
| `/interpolacion` | InterpolationPage | Módulo 3 |
| `/integracion` | IntegrationPage | Módulo 4 |
| `/ecuaciones-diferenciales` | OdesPage | Módulo 5 |
| `/conclusiones` | ConclusionsPage | Conclusiones |

---

## Configuración Vite

- Plugin: `@vitejs/plugin-react`
- Base: `/` para Vercel
- Build output: `dist/`
- Alias: `@/` → `src/`