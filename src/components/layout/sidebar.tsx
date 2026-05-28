import { Calculator, Activity, TrendingUp, AreaChart, GitGraph, Home, BookOpen } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const modules = [
  { to: '/sistemas-lineales', label: 'Sistemas Lineales', icon: Calculator },
  { to: '/raices', label: 'Raíces', icon: GitGraph },
  { to: '/interpolacion', label: 'Interpolación', icon: TrendingUp },
  { to: '/integracion', label: 'Integración', icon: AreaChart },
  { to: '/ecuaciones-diferenciales', label: 'EDOs', icon: Activity },
]

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-[240px] min-h-screen border-r border-subtle-edge bg-deep-night">
      <div className="p-6">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="font-mono text-sm tracking-wider font-semibold text-ghost-white">
            YAKAN
          </span>
        </NavLink>
        <p className="text-[10px] tracking-[0.2em] text-dim mt-0.5">
          Métodos Numéricos
        </p>
      </div>

      <nav className="flex-1 px-3">
        <div className="mb-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors ${
                isActive
                  ? 'text-ghost-white bg-charcoal'
                  : 'text-mist hover:text-ghost-white hover:bg-charcoal/50'
              }`
            }
          >
            <Home className="w-4 h-4" />
            Inicio
          </NavLink>
        </div>

        <div className="h-px bg-subtle-edge my-3" />

        <p className="px-3 mb-2 text-[10px] uppercase tracking-[0.15em] text-dim">
          Módulos
        </p>

        <div className="space-y-0.5">
          {modules.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors ${
                  isActive
                    ? 'text-ghost-white bg-charcoal'
                    : 'text-mist hover:text-ghost-white hover:bg-charcoal/50'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-3 border-t border-subtle-edge">
        <NavLink
          to="/conclusiones"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors ${
              isActive
                ? 'text-ghost-white bg-charcoal'
                : 'text-mist hover:text-ghost-white hover:bg-charcoal/50'
            }`
          }
        >
          <BookOpen className="w-4 h-4" />
          Conclusiones
        </NavLink>
      </div>
    </aside>
  )
}