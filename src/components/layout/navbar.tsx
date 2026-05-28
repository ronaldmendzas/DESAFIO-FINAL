import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeToggle } from './theme-toggle'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Calculator, Activity, TrendingUp, AreaChart, GitGraph, Home, BookOpen } from 'lucide-react'

const modules = [
  { to: '/sistemas-lineales', label: 'Sistemas Lineales', icon: Calculator },
  { to: '/raices', label: 'Raíces', icon: GitGraph },
  { to: '/interpolacion', label: 'Interpolación', icon: TrendingUp },
  { to: '/integracion', label: 'Integración', icon: AreaChart },
  { to: '/ecuaciones-diferenciales', label: 'EDOs', icon: Activity },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-subtle-edge bg-void-black/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-mist hover:text-ghost-white hover:bg-charcoal transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[260px] bg-deep-night border-r border-subtle-edge p-0">
              <div className="p-6 flex items-center justify-between">
                <span className="text-electric-cyan font-mono text-lg tracking-widest font-bold glow-cyan-text">
                  夜間計算
                </span>
                <button onClick={() => setOpen(false)} className="text-mist hover:text-ghost-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="px-3 space-y-0.5">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] transition-all ${
                      isActive
                        ? 'text-electric-cyan bg-electric-cyan/10'
                        : 'text-mist hover:text-ghost-white hover:bg-charcoal'
                    }`
                  }
                >
                  <Home className="w-4 h-4" />
                  Inicio
                </NavLink>
                <div className="h-px bg-subtle-edge my-2" />
                <p className="px-3 mb-1 text-[10px] uppercase tracking-[0.2em] text-dim font-medium">
                  Módulos
                </p>
                {modules.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] transition-all ${
                        isActive
                          ? 'text-electric-cyan bg-electric-cyan/10'
                          : 'text-mist hover:text-ghost-white hover:bg-charcoal'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </NavLink>
                ))}
                <div className="h-px bg-subtle-edge my-2" />
                <NavLink
                  to="/conclusiones"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] transition-all ${
                      isActive
                        ? 'text-electric-cyan bg-electric-cyan/10'
                        : 'text-mist hover:text-ghost-white hover:bg-charcoal'
                    }`
                  }
                >
                  <BookOpen className="w-4 h-4" />
                  Conclusiones
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>

          <NavLink to="/" className="hidden lg:flex items-center gap-2">
            <span className="text-electric-cyan font-mono text-sm tracking-widest font-bold glow-cyan-text">
              夜間計算
            </span>
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}