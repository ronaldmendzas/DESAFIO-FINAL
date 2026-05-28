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
          'px-4 py-1.5 text-[13px] text-text-secondary',
          'hover:text-forest hover:bg-forest-bg/50',
          'active:scale-95 active:bg-forest-bg',
          'transition-all duration-150',
          'rounded-md',
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
        'group relative px-5 py-2 rounded-lg text-[13px] font-medium overflow-hidden',
        'active:scale-95 active:brightness-110',
        'transition-transform duration-150',
        'cursor-pointer',
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 rounded-lg p-[1px] overflow-hidden">
        <span className="absolute inset-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,#01231C,#1A4D3E,#4AB88A,#1A4D3E,#01231C)] group-hover:animate-[spin_2s_linear_infinite]" />
      </span>
      <span className="absolute inset-[1px] rounded-[7px] bg-[#01231C] group-hover:bg-[#0a3d2e] transition-colors duration-200" />
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1A4D3E]/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] group-hover:via-[#4AB88A]/40 group-hover:animate-[shimmer_1.5s_ease-in-out_infinite]" />
      <span className="relative z-10 text-white">{children}</span>
    </button>
  )
}