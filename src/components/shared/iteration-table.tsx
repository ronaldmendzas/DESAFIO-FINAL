import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Props = {
  headers: string[]
  rows: (string | number)[][]
  highlightLast?: boolean
  maxHeight?: string
}

export function IterationTable({ headers, rows, highlightLast = true, maxHeight = '400px' }: Props) {
  return (
    <div className="bg-void-black border border-subtle-edge rounded-lg overflow-hidden">
      <div className="overflow-auto" style={{ maxHeight }}>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-subtle-edge hover:bg-transparent">
              {headers.map((header) => (
                <TableHead key={header} className="text-[11px] uppercase tracking-[0.15em] text-mist font-medium font-mono">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => {
              const isLast = i === rows.length - 1
              return (
                <TableRow
                  key={i}
                  className={`border-b border-subtle-edge/50 font-mono text-[13px] ${
                    isLast && highlightLast
                      ? 'bg-electric-cyan/5 text-electric-cyan'
                      : 'text-ghost-white'
                  } ${i % 2 === 0 ? 'bg-void-black' : 'bg-deep-night' }`}
                >
                  {row.map((cell, j) => (
                    <TableCell key={j} className="py-2">
                      {typeof cell === 'number' ? cell.toFixed(6) : cell}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}