import { type LucideIcon } from 'lucide-react'

type Variant = 'default' | 'success' | 'warning' | 'danger'

type Props = {
  label: string
  value: number
  icon?: LucideIcon
  variant?: Variant
  decimals?: number
  suffix?: string
}

const variantStyles: Record<Variant, string> = {
  default: 'border-l-electric-cyan text-electric-cyan',
  success: 'border-l-neon-mint text-neon-mint',
  warning: 'border-l-warm-amber text-warm-amber',
  danger: 'border-l-signal-red text-signal-red',
}

export function ResultCard({ label, value, icon: Icon, variant = 'default', decimals = 6, suffix }: Props) {
  return (
    <div className={`bg-deep-night border border-subtle-edge border-l-3 rounded-lg p-5 ${variantStyles[variant]}`}>
      <p className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 flex items-center gap-2">
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {label}
      </p>
      <p className="font-mono text-2xl font-bold glow-cyan-text">
        {value.toFixed(decimals)}
        {suffix && <span className="text-sm ml-1 text-mist">{suffix}</span>}
      </p>
    </div>
  )
}