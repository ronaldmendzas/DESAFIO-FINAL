import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { ScenarioQuestion } from '@/data/scenarios'

type ScenarioCardProps = {
  letter: string
  title: string
  narrative: string
  questions: ScenarioQuestion[]
  onLoad: () => void
}

export function ScenarioCard({ letter, title, narrative, questions, onLoad }: ScenarioCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-forest/20 bg-forest-bg/30 rounded-lg">
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] text-forest font-mono font-medium bg-forest/10 px-1.5 py-0.5 rounded">
            {letter}
          </span>
          <span className="text-[13px] font-medium text-text">{title}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-text-dim transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 space-y-3">
          <p className="text-[12px] text-text-secondary leading-relaxed">
            {narrative}
          </p>

          <div>
            <p className="text-[11px] text-text-dim font-medium mb-1.5">Preguntas del escenario</p>
            <ul className="space-y-1">
              {questions.map((q, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-text-secondary">
                  <span className="text-forest mt-0.5 shrink-0">?</span>
                  {q.question}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={onLoad}
            className="px-4 py-1.5 text-[12px] font-medium text-white bg-forest rounded-md hover:bg-forest-light active:scale-95 transition-all duration-150"
          >
            Cargar escenario
          </button>
        </div>
      </div>
    </div>
  )
}