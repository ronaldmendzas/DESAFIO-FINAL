import { Info } from 'lucide-react'

type Props = {
  title: string
  content: string
  className?: string
}

export function InterpretationCard({ title, content, className = '' }: Props) {
  return (
    <div className={`bg-electric-cyan/5 border border-l-3 border-l-electric-cyan border-subtle-edge rounded-lg p-5 ${className}`}>
      <div className="flex items-start gap-3">
        <Info className="w-4 h-4 text-electric-cyan mt-0.5 shrink-0" />
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-electric-cyan font-mono font-medium mb-2">
            {title}
          </p>
          <p className="text-ghost-white text-[15px] leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  )
}