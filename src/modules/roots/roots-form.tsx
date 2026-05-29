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
import type { RootMethod } from '@/types/roots'

type Props = {
  onCalculate: (data: {
    fExpression: string
    fPrimeExpression?: string
    a?: number
    b?: number
    x0?: number
    x1?: number
    tolerance: number
    maxIterations: number
    method: RootMethod
  }) => void
  onReset: () => void
  isCalculating: boolean
}

const METHODS: { id: RootMethod; label: string }[] = [
  { id: 'bisection', label: 'Bisección' },
  { id: 'newton-raphson', label: 'Newton-Raphson' },
  { id: 'secant', label: 'Secante' },
]

export function RootsForm({ onCalculate, onReset, isCalculating }: Props) {
  const [fExpression, setFExpression] = useState('x^3 - 6*x^2 + 11*x - 6')
  const [fPrimeExpression, setFPrimeExpression] = useState('3*x^2 - 12*x + 11')
  const [method, setMethod] = useState<RootMethod>('bisection')
  const [a, setA] = useState('0')
  const [b, setB] = useState('4')
  const [x0, setX0] = useState('3.5')
  const [x1, setX1] = useState('3')
  const [tolerance, setTolerance] = useState('0.000001')
  const [maxIterations, setMaxIterations] = useState('100')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate({
      fExpression,
      fPrimeExpression: method === 'newton-raphson' ? fPrimeExpression : undefined,
      a: method === 'bisection' ? parseFloat(a) : undefined,
      b: method === 'bisection' ? parseFloat(b) : undefined,
      x0: method === 'newton-raphson' ? parseFloat(x0) : method === 'secant' ? parseFloat(x0) : undefined,
      x1: method === 'secant' ? parseFloat(x1) : undefined,
      tolerance: parseFloat(tolerance),
      maxIterations: parseInt(maxIterations),
      method,
    })
  }

  const handleReset = () => {
    setFExpression('x^3 - 6*x^2 + 11*x - 6')
    setFPrimeExpression('3*x^2 - 12*x + 11')
    setA('0')
    setB('4')
    setX0('3.5')
    setX1('3')
    setTolerance('0.000001')
    setMaxIterations('100')
    setMethod('bisection')
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
          <Select value={method} onValueChange={(v) => setMethod(v as RootMethod)}>
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
          <Label className="text-[11px] text-text-dim mb-1.5 block">Tolerancia</Label>
          <NumberInput
            value={tolerance}
            onChange={setTolerance}
            className="bg-white border-border font-mono text-[12px] h-8"
            step="0.000001"
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
          placeholder="x^3 - 6*x^2 + 11*x - 6"
        />
        <p className="text-[11px] text-text-dim mt-1">Use x como variable. Ej: x^3 - 6*x^2 + 11*x - 6, sin(x), exp(x)</p>
      </div>

      {method === 'newton-raphson' && (
        <div>
          <Label className="text-[11px] text-text-dim mb-1.5 block">Derivada f'(x)</Label>
          <Input
            type="text"
            value={fPrimeExpression}
            onChange={(e) => setFPrimeExpression(e.target.value)}
            className="bg-white border-border font-mono text-[12px] h-8"
            placeholder="3*x^2 - 12*x + 11"
          />
        </div>
      )}

      {method === 'bisection' && (
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
      )}

      {method === 'newton-raphson' && (
        <div>
          <Label className="text-[11px] text-text-dim mb-1.5 block">Valor inicial (x₀)</Label>
          <NumberInput
            value={x0}
            onChange={setX0}
            className="bg-white border-border font-mono text-[12px] h-8"
          />
        </div>
      )}

      {method === 'secant' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-[11px] text-text-dim mb-1.5 block">Primer punto (x₀)</Label>
            <NumberInput
              value={x0}
              onChange={setX0}
              className="bg-white border-border font-mono text-[12px] h-8"
            />
          </div>
          <div>
            <Label className="text-[11px] text-text-dim mb-1.5 block">Segundo punto (x₁)</Label>
            <NumberInput
              value={x1}
              onChange={setX1}
              className="bg-white border-border font-mono text-[12px] h-8"
            />
          </div>
        </div>
      )}

      <div>
        <Label className="text-[11px] text-text-dim mb-1.5 block">Iteraciones máximas</Label>
        <NumberInput
          value={maxIterations}
          onChange={setMaxIterations}
          className="bg-white border-border font-mono text-[12px] h-8 max-w-[200px]"
          min="1"
          max="10000"
        />
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