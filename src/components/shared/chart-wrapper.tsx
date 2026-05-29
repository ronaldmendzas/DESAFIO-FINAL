import { type ReactNode } from 'react'
import { ResponsiveContainer } from 'recharts'

type ChartWrapperProps = {
  children: ReactNode
  height?: number
}

const TOOLTIP_STYLE = {
  backgroundColor: 'rgba(255, 255, 255, 0.96)',
  border: '1px solid #E0E0E0',
  borderRadius: '8px',
  fontFamily: "'Geist Mono', monospace",
  fontSize: 11,
  color: '#111111',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  padding: '8px 12px',
}

export { TOOLTIP_STYLE }

export function ChartWrapper({ children, height = 280 }: ChartWrapperProps) {
  return (
    <div className="border border-border rounded-lg p-4 bg-white">
      <ResponsiveContainer width="100%" height={height}>
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  )
}

export const CHART_COLORS = {
  primary: '#01231C',
  secondary: '#1A4D3E',
  accent: '#4AB88A',
  amber: '#B8860B',
  purple: '#663399',
  red: '#C4342D',
  grid: '#F0F0F0',
}

export const AXIS_TICK = { fill: '#999999', fontSize: 10, fontFamily: "'Geist Mono', monospace" }
export const GRID_PROPS = { strokeDasharray: '3 3', stroke: CHART_COLORS.grid, vertical: false }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TooltipCursor = { stroke: CHART_COLORS.accent, strokeWidth: 1, strokeDasharray: '4 4' }

// Recharts formatter helpers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fmtExp = (value: any) => [typeof value === 'number' ? value.toExponential(4) : String(value), 'Error']
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fmtFixed = (digits: number) => (value: any) => [typeof value === 'number' ? value.toFixed(digits) : String(value)]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fmtLabel = (label: any) => typeof label === 'number' ? `x = ${label}` : String(label)