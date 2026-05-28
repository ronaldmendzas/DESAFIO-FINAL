import { Calculator, Activity, TrendingUp, AreaChart, GitGraph } from 'lucide-react'
import { Link } from 'react-router-dom'

const modules = [
  {
    to: '/sistemas-lineales',
    title: 'Sistemas Lineales',
    description: 'Jacobi, Gauss-Seidel, SOR, LU, Gradiente Conjugado. Optimización de abastecimiento y transporte.',
    icon: <Calculator className="w-6 h-6" />,
  },
  {
    to: '/raices',
    title: 'Raíces',
    description: 'Bisección, Newton-Raphson, Secante. Umbrales críticos y puntos de equilibrio.',
    icon: <GitGraph className="w-6 h-6" />,
  },
  {
    to: '/interpolacion',
    title: 'Interpolación',
    description: 'Lagrange, Newton, Splines Cúbicos. Curvas de precios a partir de datos dispersos.',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    to: '/integracion',
    title: 'Integración',
    description: 'Trapecio, Simpson 1/3, Simpson 3/8. Costo acumulado y poder adquisitivo.',
    icon: <AreaChart className="w-6 h-6" />,
  },
  {
    to: '/ecuaciones-diferenciales',
    title: 'EDOs',
    description: 'Euler, Heun, RK4. Vaciado de reservas y difusión de descontento social.',
    icon: <Activity className="w-6 h-6" />,
  },
]

export function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16 scanlines">
        <h1 className="font-mono text-4xl md:text-5xl font-bold tracking-widest text-ghost-white glow-cyan-text">
          夜間計算
        </h1>
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-electric-cyan mt-2">
          Yakan Keisan
        </p>
        <p className="text-mist text-[15px] mt-6 max-w-xl mx-auto leading-relaxed">
          Simulación numérica de abastecimiento, precios y conflicto social en contexto de crisis.
          Cinco módulos. Quince métodos. Un país en los datos.
        </p>
        <div className="mt-8">
          <Link
            to="/sistemas-lineales"
            className="inline-block px-6 py-2.5 bg-electric-cyan text-void-black font-mono text-[13px] font-semibold uppercase tracking-[0.2em] rounded-md hover:shadow-[0_0_20px_rgba(6,214,160,0.4)] transition-all duration-300 active:scale-[0.97]"
          >
            Iniciar simulación
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((mod) => (
          <Link
            key={mod.to}
            to={mod.to}
            className="group block bg-deep-night border border-subtle-edge rounded-lg p-6 transition-all duration-300 hover:border-neon-edge hover:shadow-[0_0_30px_rgba(6,214,160,0.1)]"
          >
            <div className="flex items-start gap-4">
              <div className="text-electric-cyan group-hover:glow-cyan-text transition-all">
                {mod.icon}
              </div>
              <div>
                <h3 className="font-mono text-ghost-white font-semibold text-[15px] tracking-wide group-hover:text-electric-cyan transition-colors">
                  {mod.title}
                </h3>
                <p className="text-mist text-[13px] mt-1 leading-relaxed">
                  {mod.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="bg-deep-night border border-subtle-edge rounded-lg p-8">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-electric-cyan font-medium mb-4">
          Contexto
        </h2>
        <p className="text-ghost-white text-[15px] leading-relaxed">
          En el contexto actual que atraviesa el país, se observan problemas relacionados con el
          abastecimiento de carburantes, transporte, alimentos, incremento de precios, rumores de
          escasez, bloqueos, conflictos sociales y pérdida del poder adquisitivo familiar. Este
          proyecto utiliza métodos numéricos para modelar, simular y analizar estos escenarios,
          demostrando cómo el modelado matemático se convierte en una herramienta para la toma de
          decisiones estratégicas.
        </p>
      </section>
    </div>
  )
}