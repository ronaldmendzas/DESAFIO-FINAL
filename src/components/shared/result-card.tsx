import { type LucideIcon } from 'lucide-react'

type Props = {
  label: string
  value: number
  icon?: LucideIcon
  decimals?: number
  suffix?: string
  highlight?: boolean
}

export function ResultCard({ label, value, icon: Icon, decimals = 6, suffix, highlight = false }: Props) {
  return (
    <div className={`py-3 px-1 rounded-md transition-all duration-200 ${highlight ? 'bg-forest-bg' : ''} hover:bg-surface cursor-default`}>
      <p className="text-[11px] text-text-dim mb-0.5 flex items-center gap-1.5">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </p>
      <p className="font-mono text-lg text-text hover:text-forest transition-colors duration-200">
        {value.toFixed(decimals)}
        {suffix && <span className="text-sm ml-1 text-text-secondary">{suffix}</span>}
      </p>
    </div>
  )
}