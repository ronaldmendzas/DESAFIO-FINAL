import 'katex/dist/katex.min.css'
import { useEffect, useRef } from 'react'
import katex from 'katex'

type Props = {
  latex: string
  label?: string
  className?: string
}

export function FormulaDisplay({ latex, label, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      katex.render(latex, ref.current, {
        displayMode: true,
        throwOnError: false,
      })
    }
  }, [latex])

  return (
    <div className={`bg-white border border-forest-border rounded-lg p-4 relative overflow-hidden ${className}`}>
      {label && (
        <p className="text-[11px] text-text-dim mb-2 font-mono">{label}</p>
      )}
      <div ref={ref} className="text-text" />
    </div>
  )
}