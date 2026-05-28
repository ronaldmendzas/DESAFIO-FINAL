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
    <div className={`bg-void-black border border-subtle-edge rounded-md p-5 ${className}`}>
      {label && (
        <p className="text-[11px] uppercase tracking-[0.15em] text-dim font-mono mb-3">
          {label}
        </p>
      )}
      <div ref={ref} className="text-ghost-white" />
    </div>
  )
}