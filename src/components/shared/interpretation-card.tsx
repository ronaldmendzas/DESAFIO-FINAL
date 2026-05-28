import { Info } from 'lucide-react'

type Props = {
  title: string
  content: string
  className?: string
}

export function InterpretationCard({ title, content, className = '' }: Props) {
  return (
    <div className={`bg-forest-bg border-l-2 border-l-forest rounded-r-lg p-4 ${className}`}>
      <p className="text-[11px] text-forest font-medium mb-1 flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5" />
        {title}
      </p>
      <p className="text-[14px] text-text leading-relaxed">
        {content}
      </p>
    </div>
  )
}