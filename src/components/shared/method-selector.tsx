import {cn} from '@/lib/utils'

type Option = { value: string; label: string }

type Props = {
  options: Option[]
  value: string
  onChange: (v: string) => void
  className?: string
}

export function MethodSelector({ options, value, onChange, className = '' }: Props) {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200',
            'hover:bg-forest-bg hover:text-forest hover:scale-[1.03]',
            'active:scale-95',
            value === opt.value
              ? 'bg-forest text-white shadow-sm hover:bg-forest-light hover:text-white'
              : 'bg-surface text-text-secondary'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}