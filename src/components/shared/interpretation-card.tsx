import { useState } from 'react'
import { type LucideIcon, ChevronDown } from 'lucide-react'

type Props = {
  title: string
  description: string
  icon?: LucideIcon
  variant?: 'success' | 'warning' | 'info' | 'error'
}

const variantStyles = {
  success: 'border-l-[#01231C] hover:bg-[#E6F0EB]/60',
  warning: 'border-l-[#8B6914] hover:bg-[#FFF8E6]/60',
  info: 'border-l-[#1A4D3E] hover:bg-[#E6F0EB]/40',
  error: 'border-l-[#8B1414] hover:bg-[#FDECEC]/60',
}

export function InterpretationCard({ title, description, icon: Icon, variant = 'success' }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`border-l-2 ${variantStyles[variant]} bg-white rounded-r-md transition-all duration-200 cursor-pointer select-none`}
      onClick={() => setOpen(!open)}
    >
      <button className="w-full flex items-center justify-between py-3 px-4 text-left">
        <span className="text-[13px] font-medium text-text flex items-center gap-2">
          {Icon && <Icon className="w-3.5 h-3.5 text-text-dim" />}
          {title}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-text-dim transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="px-4 pb-3 text-[12px] text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}