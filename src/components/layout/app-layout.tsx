import { Navbar } from './navbar'
import { Sidebar } from './sidebar'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-bg text-text">
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