import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function GodButton({ variant = 'primary', className, children, ...props }: Props) {
  if (variant === 'secondary') {
    return (
      <button
        className={cn(
          'relative px-5 py-2 text-[13px] font-medium text-text-secondary',
          'hover:text-text transition-colors',
          'active:scale-[0.97] active:text-forest transition-transform duration-100',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      className={cn(
        'group relative px-5 py-2 rounded-[8px] text-white text-[13px] font-medium overflow-hidden',
        'active:scale-[0.96] transition-transform duration-150',
        'cursor-pointer',
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-2px] rounded-[10px] overflow-hidden">
        <span className="absolute inset-0 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,#01231C,#1A4D3E,#3A8B6A,#1A4D3E,#01231C)]" />
        <span className="absolute inset-0 animate-[spin_5s_linear_infinite_reverse] bg-[conic-gradient(from_180deg,transparent_0deg,#2D6B4F_120deg,transparent_240deg)] opacity-60" />
      </span>

      <span className="absolute inset-[2px] rounded-[6px] bg-[#01231C] z-10" />

      <span className="absolute inset-0 z-20 rounded-[8px] animate-[shimmer_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent_30%,rgba(26,77,62,0.4)_45%,rgba(45,107,79,0.6)_50%,rgba(26,77,62,0.4)_55%,transparent_70%)]" />

      <span className="absolute inset-0 z-10 rounded-[8px] animate-[pulse-glow_2s_ease-in-out_infinite] bg-[radial-gradient(circle_at_50%_50%,rgba(26,77,62,0.3)_0%,transparent_70%)]" />

      <span className="relative z-30 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  )
}