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
    <aside className="hidden lg:flex flex-col w-[220px] min-h-screen border-r border-border bg-white">
      <div className="pt-8 pb-4 px-5">
        <NavLink to="/" className="group">
          <span className="text-[15px] font-semibold text-forest tracking-tight">Yakan</span>
          <span className="text-[15px] font-light text-text-dim tracking-tight ml-1">Keisan</span>
        </NavLink>
      </div>

      <nav className="flex-1 px-3 mt-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-all duration-200 mb-1 hover:translate-x-0.5 active:scale-95 ${
              isActive ? 'text-forest bg-forest-bg font-medium' : 'text-text-secondary hover:text-forest hover:bg-forest-bg/50'
            }`
          }
        >
          <Home className="w-[15px] h-[15px]" />
          Inicio
        </NavLink>

        <div className="h-px bg-border my-3" />

        <p className="px-3 mb-2 text-[10px] text-text-dim font-medium uppercase tracking-wider">Módulos</p>

        <div className="space-y-0.5">
          {modules.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-all duration-200 hover:translate-x-0.5 active:scale-95 ${
                  isActive ? 'text-forest bg-forest-bg font-medium' : 'text-text-secondary hover:text-forest hover:bg-forest-bg/50'
                }`
              }
            >
              <Icon className="w-[15px] h-[15px]" />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="px-3 pb-4">
        <div className="h-px bg-border mb-3" />
        <NavLink
          to="/conclusiones"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-all duration-200 hover:translate-x-0.5 active:scale-95 ${
              isActive ? 'text-forest bg-forest-bg font-medium' : 'text-text-secondary hover:text-forest hover:bg-forest-bg/50'
            }`
          }
        >
          <BookOpen className="w-[15px] h-[15px]" />
          Conclusiones
        </NavLink>
      </div>
    </aside>
  )
}