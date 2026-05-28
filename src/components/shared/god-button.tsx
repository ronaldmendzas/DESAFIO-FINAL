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
          'px-4 py-1.5 text-[13px] text-text-secondary hover:text-forest transition-colors',
          'active:scale-[0.97] transition-transform duration-100',
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
        'active:scale-[0.97] transition-transform duration-150',
        'cursor-pointer',
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 rounded-lg p-[1px] overflow-hidden">
        <span className="absolute inset-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,#01231C,#1A4D3E,#4AB88A,#1A4D3E,#01231C)]" />
      </span>
      <span className="absolute inset-[1px] rounded-[7px] bg-[#01231C]" />
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1A4D3E]/30 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
      <span className="relative z-10 text-white">{children}</span>
    </button>
  )
}