import { useState } from 'react'
import { motion } from 'motion/react'
import { GodButton } from '@/components/shared/god-button'
import { NumberInput } from '@/components/shared/number-input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { InterpolationMethod } from '@/types/interpolation'

type DataPoint = { x: number; y: number }

type Props = {
  onCalculate: (data: {
    points: DataPoint[]
    evaluateAt: number
    method: InterpolationMethod
  }) => void
  onReset: () => void
  isCalculating: boolean
}

const METHODS: { id: InterpolationMethod; label: string }[] = [
  { id: 'lagrange', label: 'Lagrange' },
  { id: 'newton', label: 'Newton' },
  { id: 'cubic-splines', label: 'Splines Cúbicos' },
]

const DEFAULT_POINTS: DataPoint[] = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 4 },
  { x: 5, y: 6 },
]

export function InterpolationForm({ onCalculate, onReset, isCalculating }: Props) {
  const [points, setPoints] = useState<DataPoint[]>(DEFAULT_POINTS)
  const [method, setMethod] = useState<InterpolationMethod>('lagrange')
  const [evaluateAt, setEvaluateAt] = useState('2.5')

  const handlePointChange = (index: number, field: 'x' | 'y', value: string) => {
    const newPoints = points.map((p, i) =>
      i === index ? { ...p, [field]: parseFloat(value) || 0 } : p
    )
    setPoints(newPoints)
  }

  const addPoint = () => {
    const lastX = points.length > 0 ? points[points.length - 1].x + 1 : 0
    setPoints([...points, { x: lastX, y: 0 }])
  }

  const removePoint = (index: number) => {
    if (points.length > 2) {
      setPoints(points.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate({
      points,
      evaluateAt: parseFloat(evaluateAt),
      method,
    })
  }

  const handleReset = () => {
    setPoints(DEFAULT_POINTS.map(p => ({ ...p })))
    setEvaluateAt('2.5')
    setMethod('lagrange')
    onReset()
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-[11px] text-text-dim mb-1.5 block">Método</Label>
          <Select value={method} onValueChange={(v) => setMethod(v as InterpolationMethod)}>
            <SelectTrigger className="bg-white border-border font-mono text-[12px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-border">
              {METHODS.map((m) => (
                <SelectItem key={m.id} value={m.id} className="font-mono text-[12px]">{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-[11px] text-text-dim mb-1.5 block">Evaluar en x =</Label>
          <NumberInput
            value={evaluateAt}
            onChange={setEvaluateAt}
            className="bg-white border-border font-mono text-[12px] h-8"
            step="0.1"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-[11px] text-text-dim">Puntos de datos</Label>
          <button
            type="button"
            onClick={addPoint}
            className="text-[11px] text-forest hover:text-forest-light font-medium transition-colors"
          >
            + Agregar punto
          </button>
        </div>
        <div className="border border-border rounded-lg p-3 bg-surface space-y-1.5">
          <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
            <span className="text-[11px] text-text-dim font-mono text-center">x</span>
            <span className="text-[11px] text-text-dim font-mono text-center">f(x)</span>
            <span className="w-6" />
          </div>
          {points.map((point, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
              <NumberInput
                value={String(point.x)}
                onChange={(v) => handlePointChange(i, 'x', v)}
                className="bg-white border-border font-mono text-[12px] text-center h-7 p-1"
              />
              <NumberInput
                value={String(point.y)}
                onChange={(v) => handlePointChange(i, 'y', v)}
                className="bg-white border-border font-mono text-[12px] text-center h-7 p-1"
              />
              <button
                type="button"
                onClick={() => removePoint(i)}
                className="w-6 h-6 flex items-center justify-center text-text-dim hover:text-red transition-colors text-[12px]"
                disabled={points.length <= 2}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <GodButton type="submit" disabled={isCalculating}>
          {isCalculating ? 'Calculando...' : 'Calcular'}
        </GodButton>
        <GodButton type="button" variant="secondary" onClick={handleReset}>
          Limpiar
        </GodButton>
      </div>
    </motion.form>
  )
}