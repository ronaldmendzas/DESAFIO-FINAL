import { useState } from 'react'
import { motion } from 'motion/react'
import { GodButton } from '@/components/shared/god-button'
import { Input } from '@/components/ui/input'
import { NumberInput } from '@/components/shared/number-input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { OdeMethod } from '@/types/odes'

type Props = {
  onCalculate: (data: {
    fExpression: string
    t0: number
    y0: number
    tFinal: number
    h: number
    method: OdeMethod
  }) => void
  onReset: () => void
  isCalculating: boolean
}

const METHODS: { id: OdeMethod; label: string }[] = [
  { id: 'euler', label: 'Euler' },
  { id: 'heun', label: 'Heun' },
  { id: 'rk4', label: 'Runge-Kutta 4' },
]

export function OdesForm({ onCalculate, onReset, isCalculating }: Props) {
  const [fExpression, setFExpression] = useState('-0.5 * y')
  const [t0, setT0] = useState('0')
  const [y0, setY0] = useState('100')
  const [tFinal, setTFinal] = useState('10')
  const [h, setH] = useState('0.5')
  const [method, setMethod] = useState<OdeMethod>('euler')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate({
      fExpression,
      t0: parseFloat(t0),
      y0: parseFloat(y0),
      tFinal: parseFloat(tFinal),
      h: parseFloat(h),
      method,
    })
  }

  const handleReset = () => {
    setFExpression('-0.5 * y')
    setT0('0')
    setY0('100')
    setTFinal('10')
    setH('0.5')
    setMethod('euler')
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
          <Select value={method} onValueChange={(v) => setMethod(v as OdeMethod)}>
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
          <Label className="text-[11px] text-text-dim mb-1.5 block">Paso (h)</Label>
          <NumberInput
            value={h}
            onChange={setH}
            className="bg-white border-border font-mono text-[12px] h-8"
            step="0.01"
          />
        </div>
      </div>

      <div>
        <Label className="text-[11px] text-text-dim mb-1.5 block">Ecuación dy/dt = f(t, y)</Label>
        <Input
          type="text"
          value={fExpression}
          onChange={(e) => setFExpression(e.target.value)}
          className="bg-white border-border font-mono text-[12px] h-8"
          placeholder="-0.5 * y"
        />
        <p className="text-[11px] text-text-dim mt-1">Use t e y como variables. Ej: -0.5*y, sin(t)*y, -2*t+1</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="text-[11px] text-text-dim mb-1.5 block">t₀ (inicio)</Label>
          <NumberInput
            value={t0}
            onChange={setT0}
            className="bg-white border-border font-mono text-[12px] h-8"
          />
        </div>
        <div>
          <Label className="text-[11px] text-text-dim mb-1.5 block">y₀ (valor inicial)</Label>
          <NumberInput
            value={y0}
            onChange={setY0}
            className="bg-white border-border font-mono text-[12px] h-8"
          />
        </div>
        <div>
          <Label className="text-[11px] text-text-dim mb-1.5 block">t final</Label>
          <NumberInput
            value={tFinal}
            onChange={setTFinal}
            className="bg-white border-border font-mono text-[12px] h-8"
          />
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