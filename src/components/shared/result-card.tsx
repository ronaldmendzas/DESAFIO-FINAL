import { type LucideIcon } from 'lucide-react'
import { BorderBeam } from '@/components/ui/border-beam'

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
    <div className="relative bg-white border border-border rounded-lg p-4 overflow-hidden">
      {highlight && <BorderBeam size={40} duration={8} colorFrom="#01231C" colorTo="#1A4D3E" borderWidth={1.5} />}
      <p className="text-[11px] text-text-dim mb-0.5 flex items-center gap-1.5">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </p>
      <p className="font-mono text-lg text-text font-medium">
        {value.toFixed(decimals)}
        {suffix && <span className="text-sm ml-1 text-text-secondary">{suffix}</span>}
      </p>
    </div>
  )
}