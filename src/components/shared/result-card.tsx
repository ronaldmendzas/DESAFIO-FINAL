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
  default: 'border-l-ghost-white',
  success: 'border-l-neon-mint',
  warning: 'border-l-warm-amber',
  danger: 'border-l-signal-red',
}

const valueStyles: Record<Variant, string> = {
  default: 'text-ghost-white',
  success: 'text-neon-mint',
  warning: 'text-warm-amber',
  danger: 'text-signal-red',
}

export function ResultCard({ label, value, icon: Icon, variant = 'default', decimals = 6, suffix }: Props) {
  return (
    <div className={`bg-deep-night border border-subtle-edge border-l-2 rounded-md p-4 ${variantStyles[variant]}`}>
      <p className="text-[11px] uppercase tracking-[0.15em] text-mist font-medium mb-1 flex items-center gap-2">
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {label}
      </p>
      <p className={`font-mono text-xl font-semibold ${valueStyles[variant]}`}>
        {value.toFixed(decimals)}
        {suffix && <span className="text-sm ml-1 text-mist">{suffix}</span>}
      </p>
    </div>
  )
}