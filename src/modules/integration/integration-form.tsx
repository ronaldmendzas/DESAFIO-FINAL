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
import type { IntegrationMethod } from '@/types/integration'

type Props = {
  onCalculate: (data: {
    fExpression: string
    a: number
    b: number
    n: number
    method: IntegrationMethod
  }) => void
  onReset: () => void
  isCalculating: boolean
}

const METHODS: { id: IntegrationMethod; label: string }[] = [
  { id: 'trapezoidal', label: 'Trapecio' },
  { id: 'simpson-1-3', label: 'Simpson 1/3' },
  { id: 'simpson-3-8', label: 'Simpson 3/8' },
]

export function IntegrationForm({ onCalculate, onReset, isCalculating }: Props) {
  const [fExpression, setFExpression] = useState('x^2 + 2*x + 1')
  const [a, setA] = useState('0')
  const [b, setB] = useState('10')
  const [n, setN] = useState('10')
  const [method, setMethod] = useState<IntegrationMethod>('trapezoidal')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate({
      fExpression,
      a: parseFloat(a),
      b: parseFloat(b),
      n: parseInt(n),
      method,
    })
  }

  const handleReset = () => {
    setFExpression('x^2 + 2*x + 1')
    setA('0')
    setB('10')
    setN('10')
    setMethod('trapezoidal')
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
          <Select value={method} onValueChange={(v) => setMethod(v as IntegrationMethod)}>
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
          <Label className="text-[11px] text-text-dim mb-1.5 block">Subintervalos (n)</Label>
          <NumberInput
            value={n}
            onChange={setN}
            className="bg-white border-border font-mono text-[12px] h-8"
            min="1"
            max="10000"
          />
        </div>
      </div>

      <div>
        <Label className="text-[11px] text-text-dim mb-1.5 block">Función f(x)</Label>
        <Input
          type="text"
          value={fExpression}
          onChange={(e) => setFExpression(e.target.value)}
          className="bg-white border-border font-mono text-[12px] h-8"
          placeholder="x^2 + 2*x + 1"
        />
        <p className="text-[11px] text-text-dim mt-1">Use x como variable. Ej: x^2, sin(x), exp(x)</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-[11px] text-text-dim mb-1.5 block">Límite inferior (a)</Label>
          <NumberInput
            value={a}
            onChange={setA}
            className="bg-white border-border font-mono text-[12px] h-8"
          />
        </div>
        <div>
          <Label className="text-[11px] text-text-dim mb-1.5 block">Límite superior (b)</Label>
          <NumberInput
            value={b}
            onChange={setB}
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