import { Info } from 'lucide-react'

type Props = {
  title: string
  content: string
  className?: string
}

export function InterpretationCard({ title, content, className = '' }: Props) {
  return (
    <div className={`bg-charcoal/50 border border-subtle-edge rounded-md p-5 ${className}`}>
      <div className="flex items-start gap-3">
        <Info className="w-4 h-4 text-mist mt-0.5 shrink-0" />
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-mist font-mono font-medium mb-2">
            {title}
          </p>
          <p className="text-ghost-white text-[14px] leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  )
}