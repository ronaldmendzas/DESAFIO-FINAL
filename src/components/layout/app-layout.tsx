import { Navbar } from './navbar'
import { Sidebar } from './sidebar'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-void-black text-ghost-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-48px)]">
          <div className="max-w-[960px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}