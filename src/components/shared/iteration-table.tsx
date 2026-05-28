import {cn} from '@/lib/utils'

type Row = Record<string, unknown>

type Props = {
  headers: { key: string; label: string }[]
  rows: Row[]
  highlightLastRow?: boolean
  className?: string
}

export function IterationTable({ headers, rows, highlightLastRow = false, className = '' }: Props) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-[12px]">
        <thead>
          <tr className="border-b border-border">
            {headers.map(h => (
              <th key={h.key} className="py-2.5 px-3 text-left text-text-dim font-medium whitespace-nowrap hover:text-forest transition-colors duration-200">{h.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                'border-b border-border/50 transition-colors duration-150 hover:bg-surface',
                highlightLastRow && i === rows.length - 1 && 'bg-forest-bg font-medium'
              )}
            >
              {headers.map(h => (
                <td key={h.key} className="py-2 px-3 font-mono text-text whitespace-nowrap">
                  {typeof row[h.key] === 'number' ? (row[h.key] as number).toFixed(6) : String(row[h.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}