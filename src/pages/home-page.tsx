import { Calculator, Activity, TrendingUp, AreaChart, GitGraph } from 'lucide-react'
import { Link } from 'react-router-dom'

const modules = [
  {
    to: '/sistemas-lineales',
    title: 'Sistemas Lineales',
    description: 'Jacobi, Gauss-Seidel, SOR, LU, Gradiente Conjugado.',
    icon: <Calculator className="w-5 h-5" />,
  },
  {
    to: '/raices',
    title: 'Raíces',
    description: 'Bisección, Newton-Raphson, Secante.',
    icon: <GitGraph className="w-5 h-5" />,
  },
  {
    to: '/interpolacion',
    title: 'Interpolación',
    description: 'Lagrange, Newton, Splines Cúbicos.',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    to: '/integracion',
    title: 'Integración',
    description: 'Trapecio, Simpson 1/3, Simpson 3/8.',
    icon: <AreaChart className="w-5 h-5" />,
  },
  {
    to: '/ecuaciones-diferenciales',
    title: 'EDOs',
    description: 'Euler, Heun, RK4.',
    icon: <Activity className="w-5 h-5" />,
  },
]

export function HomePage() {
  return (
    <div className="space-y-12">
      <section className="py-12">
        <h1 className="font-mono text-3xl md:text-4xl font-bold tracking-wider text-ghost-white">
          YAKAN KEISAN
        </h1>
        <p className="text-mist text-[14px] mt-4 max-w-xl leading-relaxed">
          Simulación numérica de abastecimiento, precios y conflicto social
          en contexto de crisis. Cinco módulos. Quince métodos.
        </p>
        <div className="mt-6">
          <Link
            to="/sistemas-lineales"
            className="inline-block px-5 py-2 bg-ghost-white text-void-black font-mono text-[13px] font-medium rounded-md hover:bg-mist transition-colors"
          >
            Iniciar simulación
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {modules.map((mod) => (
          <Link
            key={mod.to}
            to={mod.to}
            className="group block bg-deep-night border border-subtle-edge rounded-md p-5 transition-colors hover:border-mist"
          >
            <div className="flex items-start gap-3">
              <div className="text-mist group-hover:text-ghost-white transition-colors">
                {mod.icon}
              </div>
              <div>
                <h3 className="font-mono text-[14px] font-semibold text-ghost-white">
                  {mod.title}
                </h3>
                <p className="text-dim text-[12px] mt-0.5">
                  {mod.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="border-t border-subtle-edge pt-8">
        <p className="text-mist text-[14px] leading-relaxed max-w-2xl">
          En el contexto actual, el país enfrenta problemas de abastecimiento, transporte,
          precios y conflicto social. Este proyecto utiliza métodos numéricos para modelar
          y simular esos escenarios.
        </p>
      </section>
    </div>
  )
}