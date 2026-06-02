import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Calculator, GitGraph, TrendingUp, AreaChart, Activity } from 'lucide-react'
import { allScenarios } from '@/data/scenarios'

const moduleIcons: Record<string, React.ReactNode> = {
  'sistemas-lineales': <Calculator className="w-4 h-4" />,
  'raices': <GitGraph className="w-4 h-4" />,
  'interpolacion': <TrendingUp className="w-4 h-4" />,
  'integracion': <AreaChart className="w-4 h-4" />,
  'ecuaciones-diferenciales': <Activity className="w-4 h-4" />,
}

const moduleNames: Record<string, string> = {
  'sistemas-lineales': 'Sistemas Lineales',
  'raices': 'Raíces',
  'interpolacion': 'Interpolación',
  'integracion': 'Integración',
  'ecuaciones-diferenciales': 'EDOs',
}

const moduleRoutes: Record<string, string> = {
  'sistemas-lineales': '/sistemas-lineales',
  'raices': '/raices',
  'interpolacion': '/interpolacion',
  'integracion': '/integracion',
  'ecuaciones-diferenciales': '/ecuaciones-diferenciales',
}

export function ScenariosPage() {
  return (
    <div className="space-y-10">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-[11px] text-forest font-mono">Escenarios</p>
        <h1 className="text-xl font-semibold text-text mt-0.5 tracking-tight">
          Escenarios de Crisis
        </h1>
        <p className="text-text-secondary text-[13px] mt-1.5 leading-relaxed max-w-lg">
          Cada escenario modela un aspecto de la crisis venezolana: abastecimiento, precios, reservas y descontento social. 
         Seleccione un escenario para cargar datos predefinidos en el módulo correspondiente.
        </p>
      </motion.div>

      <div className="space-y-6">
        {allScenarios.map((scenario, idx) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="border border-border rounded-lg p-5 hover:bg-surface/50 transition-colors duration-200"
          >
            <div className="flex items-start gap-3">
              <span className="text-[11px] text-forest font-mono font-medium bg-forest/10 px-1.5 py-0.5 rounded shrink-0">
                {scenario.letter}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-[14px] font-medium text-text">{scenario.title}</h3>
                  <span className="text-[10px] text-text-dim font-mono flex items-center gap-1">
                    {moduleIcons[scenario.module]}
                    {moduleNames[scenario.module]}
                  </span>
                </div>
                <p className="text-[12px] text-text-secondary leading-relaxed mb-3">
                  {scenario.narrative}
                </p>
                <div className="mb-3">
                  <p className="text-[11px] text-text-dim font-medium mb-1">Preguntas del escenario:</p>
                  <ul className="space-y-0.5">
                    {scenario.questions.map((q, i) => (
                      <li key={i} className="text-[12px] text-text-secondary flex items-start gap-1.5">
                        <span className="text-forest mt-0.5 shrink-0">?</span>
                        {q.question}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={moduleRoutes[scenario.module]}
                  className="inline-flex items-center gap-1.5 text-[12px] text-forest hover:text-forest-light font-medium transition-colors"
                >
                  Ir al módulo
                  <span className="text-[10px]">&#8594;</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}