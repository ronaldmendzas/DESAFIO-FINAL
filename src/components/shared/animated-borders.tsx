export function MorphingBorder({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-forest via-forest-light to-forest opacity-20 blur-[1px] group-hover:opacity-40 group-hover:blur-[2px] transition-all duration-500" />
      <div className="absolute -inset-[1px] rounded-lg overflow-hidden">
        <div className="absolute inset-0 animate-[spin_8s_linear_infinite] bg-gradient-to-tr from-transparent via-forest-light to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
      </div>
      <div className="relative bg-white rounded-lg">
        {children}
      </div>
    </div>
  )
}

export function GlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-[2px] rounded-lg overflow-hidden">
        <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,#01231C_360deg)]" />
        <div className="absolute inset-[-100%] animate-[spin_6s_linear_infinite_reverse] bg-[conic-gradient(from_180deg,transparent_0_340deg,#1A4D3E_360deg)] opacity-60" />
      </div>
      <div className="relative bg-white rounded-lg">
        {children}
      </div>
    </div>
  )
}

export function PulseBorder({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-[linear-gradient(#FFFFFF,#FFFFFF)_padding-box,linear-gradient(135deg,#01231C,#1A4D3E,#0A3D2E,#01231C)_border-box] animate-[gradient-rotate_4s_ease_infinite]" />
      <div className="relative bg-white rounded-lg m-[2px]">
        {children}
      </div>
    </div>
  )
}