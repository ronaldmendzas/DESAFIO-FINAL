import { Calculator, Activity, TrendingUp, AreaChart, GitGraph } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { GodButton } from '@/components/shared/god-button'

const modules = [
  { to: '/sistemas-lineales', title: 'Sistemas Lineales', description: 'Jacobi, Gauss-Seidel, SOR, LU, Gradiente Conjugado', icon: Calculator },
  { to: '/raices', title: 'Raíces', description: 'Bisección, Newton-Raphson, Secante', icon: GitGraph },
  { to: '/interpolacion', title: 'Interpolación', description: 'Lagrange, Newton, Splines Cúbicos', icon: TrendingUp },
  { to: '/integracion', title: 'Integración', description: 'Trapecio, Simpson 1/3, Simpson 3/8', icon: AreaChart },
  { to: '/ecuaciones-diferenciales', title: 'EDOs', description: 'Euler, Heun, RK4', icon: Activity },
]

export function HomePage() {
  return (
    <div className="space-y-16">
      <section className="pt-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-text tracking-tight"
        >
          Yakan Keisan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[13px] text-forest font-mono mt-1"
        >
          Simulación Numérica de Crisis
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-text-secondary text-[14px] mt-5 max-w-md leading-relaxed"
        >
          Cinco módulos. Quince métodos. Abastecimiento, precios y conflicto social modelados con métodos numéricos.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <Link to="/sistemas-lineales">
            <GodButton>Comenzar</GodButton>
          </Link>
        </motion.div>
      </section>

      <section>
        <h2 className="text-[13px] font-medium text-text mb-4">Módulos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.to}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <Link
                to={mod.to}
                className="group block animated-border animated-border-slow p-4"
              >
                <div className="flex items-start gap-2.5">
                  <mod.icon className="w-4 h-4 text-text-dim group-hover:text-forest transition-colors mt-0.5" />
                  <div>
                    <h3 className="text-[13px] font-medium text-text">{mod.title}</h3>
                    <p className="text-[11px] text-text-dim mt-0.5">{mod.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="animated-border animated-border-slow p-6">
        <p className="text-[13px] text-text-secondary leading-relaxed max-w-lg">
          En el contexto actual, el país enfrenta problemas de abastecimiento, transporte,
          precios y conflicto social. Este proyecto utiliza métodos numéricos para modelar
          y simular esos escenarios.
        </p>
      </section>
    </div>
  )
}