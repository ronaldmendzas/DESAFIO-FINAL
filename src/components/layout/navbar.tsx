import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
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
    <header className="sticky top-0 z-50 h-11 border-b border-border bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="text-text-secondary hover:text-text transition-colors">
                <Menu className="w-[18px] h-[18px]" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" showCloseButton={false} className="w-[260px] bg-white border-r border-border p-0">
              <div className="pt-8 pb-4 px-5 flex items-center justify-between">
                <span className="text-[15px] font-semibold text-forest tracking-tight">SimNum</span>
                <button onClick={() => setOpen(false)} className="text-text-secondary hover:text-text">
                  <X className="w-[18px] h-[18px]" />
                </button>
              </div>
              <nav className="px-3 mt-2">
                <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-all duration-200 mb-1 hover:translate-x-0.5 active:scale-95 ${isActive ? 'text-forest bg-forest-bg font-medium' : 'text-text-secondary hover:text-forest hover:bg-forest-bg/50'}`}>
                  <Home className="w-[15px] h-[15px]" /> Inicio
                </NavLink>
                <div className="h-px bg-border my-3" />
                <p className="px-3 mb-2 text-[10px] text-text-dim font-medium uppercase tracking-wider">Módulos</p>
                {modules.map(({ to, label, icon: Icon }) => (
                  <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-all duration-200 hover:translate-x-0.5 active:scale-95 ${isActive ? 'text-forest bg-forest-bg font-medium' : 'text-text-secondary hover:text-forest hover:bg-forest-bg/50'}`}>
                    <Icon className="w-[15px] h-[15px]" /> {label}
                  </NavLink>
                ))}
                <div className="h-px bg-border my-3" />
                <NavLink to="/conclusiones" onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-all duration-200 hover:translate-x-0.5 active:scale-95 ${isActive ? 'text-forest bg-forest-bg font-medium' : 'text-text-secondary hover:text-forest hover:bg-forest-bg/50'}`}>
                  <BookOpen className="w-[15px] h-[15px]" /> Conclusiones
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>

          <NavLink to="/" className="hidden lg:block">
            <span className="text-[15px] font-semibold text-forest tracking-tight">SimNum</span>
          </NavLink>
        </div>
      </div>
    </header>
  )
}