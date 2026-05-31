import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/theme/theme-provider'
import { AppLayout } from '@/components/layout/app-layout'
import { HomePage } from '@/pages/home-page'
import { LinearSystemsPage } from '@/modules/linear-systems/linear-systems-page'
import { RootsPage } from '@/modules/roots/roots-page'
import { InterpolationPage } from '@/modules/interpolation/interpolation-page'
import { IntegrationPage } from '@/modules/integration/integration-page'
import { OdesPage } from '@/modules/odes/odes-page'
import { ConclusionsPage } from '@/pages/conclusions-page'

export function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/sistemas-lineales" element={<LinearSystemsPage />} />
            <Route path="/raices" element={<RootsPage />} />
            <Route path="/interpolacion" element={<InterpolationPage />} />
            <Route path="/integracion" element={<IntegrationPage />} />
            <Route path="/ecuaciones-diferenciales" element={<OdesPage />} />
            <Route path="/conclusiones" element={<ConclusionsPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}