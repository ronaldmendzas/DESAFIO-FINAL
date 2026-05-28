import { Navbar } from './navbar'
import { Sidebar } from './sidebar'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-void-black text-ghost-white dot-grid">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-56px)]">
          <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}