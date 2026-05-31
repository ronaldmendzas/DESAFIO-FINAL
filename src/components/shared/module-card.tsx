import { Link } from 'react-router-dom'

type Props = {
  title: string
  description: string
  icon: React.ReactNode
  to: string
}

export function ModuleCard({ title, description, icon, to }: Props) {
  return (
    <Link
      to={to}
      className="group block bg-deep-night border border-subtle-edge rounded-lg p-6 transition-all duration-300 hover:border-neon-edge hover:shadow-[0_0_30px_rgba(6,214,160,0.1)]"
    >
      <div className="flex items-start gap-4">
        <div className="text-electric-cyan group-hover:glow-cyan-text transition-all">
          {icon}
        </div>
        <div>
          <h3 className="font-mono text-ghost-white font-semibold text-[15px] tracking-wide group-hover:text-electric-cyan transition-colors">
            {title}
          </h3>
          <p className="text-mist text-[13px] mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}