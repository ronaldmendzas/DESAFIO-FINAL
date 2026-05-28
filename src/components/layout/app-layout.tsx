import { Navbar } from './navbar'
import { Sidebar } from './sidebar'
import { Outlet } from 'react-router-dom'
import { DotPattern } from '@/components/ui/dot-pattern'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-bg text-text relative">
      <DotPattern
        width={20}
        height={20}
        cr={0.8}
        className="absolute inset-0 text-forest/[0.07] -z-10"
      />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-44px)]">
          <div className="max-w-[880px] mx-auto px-5 lg:px-8 py-8 lg:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}