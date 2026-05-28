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
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="overflow-auto" style={{ maxHeight }}>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              {headers.map((header) => (
                <TableHead key={header} className="text-[10px] text-text-dim font-mono">
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
                  className={`border-b border-border/40 font-mono text-[12px] ${
                    isLast && highlightLast ? 'bg-forest-bg text-forest font-medium' : 'text-text-secondary'
                  }`}
                >
                  {row.map((cell, j) => (
                    <TableCell key={j} className="py-1.5">
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