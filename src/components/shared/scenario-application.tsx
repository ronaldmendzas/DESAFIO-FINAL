import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type QAPair = {
  question: string
  answer: string
}

type ScenarioApplicationProps = {
  letter: string
  title: string
  narrative: string
  relation: string
  questions: QAPair[]
  conclusion: string
}

export function ScenarioApplication({
  letter,
  title,
  narrative,
  relation,
  questions,
  conclusion,
}: ScenarioApplicationProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-border bg-white rounded-lg overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-surface/50 transition-colors duration-200"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] text-forest font-mono font-bold bg-forest/10 px-2 py-0.5 rounded">
            {letter}
          </span>
          <span className="text-[13px] font-medium text-text">
            {title}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-text-dim transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 space-y-4">
          <p className="text-[13px] text-text-secondary leading-relaxed">
            {narrative}
          </p>

          <p className="text-[13px] text-text-secondary leading-relaxed">
            {relation}
          </p>

          <div className="space-y-3">
            {questions.map((qa, i) => (
              <div key={i}>
                <p className="text-[13px] font-medium text-text">
                  {qa.question}
                </p>
                <p className="text-[13px] text-text-secondary mt-0.5 leading-relaxed">
                  {qa.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-3">
            <p className="text-[13px] font-medium text-text mb-1">Conclusión</p>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              {conclusion}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}