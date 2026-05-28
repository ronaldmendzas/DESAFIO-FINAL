import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  const [fExpression, setFExpression] = useState('x^3 - x - 2')
  const [fPrimeExpression, setFPrimeExpression] = useState('3*x^2 - 1')
  const [method, setMethod] = useState<RootMethod>('bisection')
  const [a, setA] = useState('1')
  const [b, setB] = useState('2')
  const [x0, setX0] = useState('1.5')
  const [x1, setX1] = useState('2')
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
    setFExpression('x^3 - x - 2')
    setFPrimeExpression('3*x^2 - 1')
    setA('1')
    setB('2')
    setX0('1.5')
    setX1('2')
    setTolerance('0.000001')
    setMaxIterations('100')
    setMethod('bisection')
    onReset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
            Método
          </Label>
          <Select value={method} onValueChange={(v) => setMethod(v as RootMethod)}>
            <SelectTrigger className="bg-void-black border-subtle-edge font-mono text-[13px] focus:border-electric-cyan focus:ring-electric-cyan/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-deep-night border-subtle-edge">
              {METHODS.map((m) => (
                <SelectItem key={m.id} value={m.id} className="font-mono text-[13px]">
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
            Tolerancia
          </Label>
          <Input
            type="number"
            value={tolerance}
            onChange={(e) => setTolerance(e.target.value)}
            className="bg-void-black border-subtle-edge font-mono text-[13px] h-9 focus:border-electric-cyan focus:ring-electric-cyan/20"
            step="0.000001"
          />
        </div>
      </div>

      <div>
        <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
          Función f(x)
        </Label>
        <Input
          type="text"
          value={fExpression}
          onChange={(e) => setFExpression(e.target.value)}
          className="bg-void-black border-subtle-edge font-mono text-[13px] h-9 focus:border-electric-cyan focus:ring-electric-cyan/20"
          placeholder="x^3 - x - 2"
        />
        <p className="text-[11px] text-dim mt-1">Use x como variable. Ej: x^3 - x - 2, sin(x), exp(x)</p>
      </div>

      {method === 'newton-raphson' && (
        <div>
          <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
            Derivada f'(x)
          </Label>
          <Input
            type="text"
            value={fPrimeExpression}
            onChange={(e) => setFPrimeExpression(e.target.value)}
            className="bg-void-black border-subtle-edge font-mono text-[13px] h-9 focus:border-electric-cyan focus:ring-electric-cyan/20"
            placeholder="3*x^2 - 1"
          />
        </div>
      )}

      {method === 'bisection' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
              Límite inferior (a)
            </Label>
            <Input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="bg-void-black border-subtle-edge font-mono text-[13px] h-9 focus:border-electric-cyan focus:ring-electric-cyan/20"
            />
          </div>
          <div>
            <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
              Límite superior (b)
            </Label>
            <Input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="bg-void-black border-subtle-edge font-mono text-[13px] h-9 focus:border-electric-cyan focus:ring-electric-cyan/20"
            />
          </div>
        </div>
      )}

      {method === 'newton-raphson' && (
        <div>
          <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
            Valor inicial (x₀)
          </Label>
          <Input
            type="number"
            value={x0}
            onChange={(e) => setX0(e.target.value)}
            className="bg-void-black border-subtle-edge font-mono text-[13px] h-9 focus:border-electric-cyan focus:ring-electric-cyan/20"
          />
        </div>
      )}

      {method === 'secant' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
              Primer punto (x₀)
            </Label>
            <Input
              type="number"
              value={x0}
              onChange={(e) => setX0(e.target.value)}
              className="bg-void-black border-subtle-edge font-mono text-[13px] h-9 focus:border-electric-cyan focus:ring-electric-cyan/20"
            />
          </div>
          <div>
            <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
              Segundo punto (x₁)
            </Label>
            <Input
              type="number"
              value={x1}
              onChange={(e) => setX1(e.target.value)}
              className="bg-void-black border-subtle-edge font-mono text-[13px] h-9 focus:border-electric-cyan focus:ring-electric-cyan/20"
            />
          </div>
        </div>
      )}

      <div>
        <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
          Iteraciones máximas
        </Label>
        <Input
          type="number"
          value={maxIterations}
          onChange={(e) => setMaxIterations(e.target.value)}
          className="bg-void-black border-subtle-edge font-mono text-[13px] h-9 focus:border-electric-cyan focus:ring-electric-cyan/20 max-w-[200px]"
          min="1"
          max="10000"
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isCalculating}
          className="bg-electric-cyan text-void-black font-mono text-[13px] uppercase tracking-[0.2em] hover:bg-electric-cyan/90 hover:shadow-[0_0_20px_rgba(6,214,160,0.4)] active:scale-[0.97] transition-all px-8 h-10"
        >
          {isCalculating ? 'Calculando...' : 'Calcular'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={handleReset}
          className="text-mist hover:text-ghost-white font-mono text-[13px] uppercase tracking-[0.2em] h-10"
        >
          Limpiar
        </Button>
      </div>
    </form>
  )
}