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
import type { LinearSystemMethod } from '@/types/linear-systems'

type Props = {
  onCalculate: (data: {
    matrix: number[][]
    vector: number[]
    tolerance: number
    maxIterations: number
    method: LinearSystemMethod
    omega?: number
  }) => void
  onReset: () => void
  isCalculating: boolean
}

const METHODS: { id: LinearSystemMethod; label: string }[] = [
  { id: 'jacobi', label: 'Jacobi' },
  { id: 'gauss-seidel', label: 'Gauss-Seidel' },
  { id: 'sor', label: 'SOR' },
  { id: 'lu', label: 'LU' },
  { id: 'conjugate-gradient', label: 'Gradiente Conjugado' },
]

const DEFAULT_MATRIX_3X3 = [
  [10, -1, 2],
  [-1, 11, -1],
  [2, -1, 10],
]

const DEFAULT_VECTOR_3 = [7, -8, 6]

export function LinearSystemsForm({ onCalculate, onReset, isCalculating }: Props) {
  const [matrix, setMatrix] = useState<number[][]>(DEFAULT_MATRIX_3X3)
  const [vector, setVector] = useState<number[]>(DEFAULT_VECTOR_3)
  const [tolerance, setTolerance] = useState('0.000001')
  const [maxIterations, setMaxIterations] = useState('100')
  const [method, setMethod] = useState<LinearSystemMethod>('jacobi')
  const [omega, setOmega] = useState('1.5')
  const [size, setSize] = useState<3 | 4 | 5>(3)

  const handleSizeChange = (newSize: 3 | 4 | 5) => {
    setSize(newSize)
    const newMatrix = Array.from({ length: newSize }, (_, i) =>
      Array.from({ length: newSize }, (_, j) => {
        if (i < DEFAULT_MATRIX_3X3.length && j < DEFAULT_MATRIX_3X3[0].length) {
          return DEFAULT_MATRIX_3X3[i][j]
        }
        return i === j ? 10 : 0
      })
    )
    const newVector = Array.from({ length: newSize }, (_, i) =>
      i < DEFAULT_VECTOR_3.length ? DEFAULT_VECTOR_3[i] : 0
    )
    setMatrix(newMatrix)
    setVector(newVector)
  }

  const handleMatrixChange = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? parseFloat(value) || 0 : c))
    )
    setMatrix(newMatrix)
  }

  const handleVectorChange = (index: number, value: string) => {
    const newVector = vector.map((v, i) => (i === index ? parseFloat(value) || 0 : v))
    setVector(newVector)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate({
      matrix,
      vector,
      tolerance: parseFloat(tolerance),
      maxIterations: parseInt(maxIterations),
      method,
      omega: method === 'sor' ? parseFloat(omega) : undefined,
    })
  }

  const handleReset = () => {
    setMatrix(DEFAULT_MATRIX_3X3.map(r => [...r]))
    setVector([...DEFAULT_VECTOR_3])
    setTolerance('0.000001')
    setMaxIterations('100')
    setMethod('jacobi')
    setOmega('1.5')
    setSize(3)
    onReset()
  }

  const showIterativeFields = method !== 'lu'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
            Método
          </Label>
          <Select value={method} onValueChange={(v) => setMethod(v as LinearSystemMethod)}>
            <SelectTrigger className="bg-void-black border-subtle-edge font-mono text-[13px] focus:border-mist focus:ring-mist/20">
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
            Tamaño de matriz
          </Label>
          <Select value={String(size)} onValueChange={(v) => handleSizeChange(Number(v) as 3 | 4 | 5)}>
            <SelectTrigger className="bg-void-black border-subtle-edge font-mono text-[13px] focus:border-mist focus:ring-mist/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-deep-night border-subtle-edge">
              <SelectItem value="3" className="font-mono text-[13px]">3×3</SelectItem>
              <SelectItem value="4" className="font-mono text-[13px]">4×4</SelectItem>
              <SelectItem value="5" className="font-mono text-[13px]">5×5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-3 block">
          Matriz de coeficientes (A)
        </Label>
        <div className="bg-void-black border border-subtle-edge rounded-lg p-4 overflow-x-auto">
          <div className="inline-grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, minmax(60px, 1fr))` }}>
            {matrix.map((row, i) =>
              row.map((val, j) => (
                <Input
                  key={`${i}-${j}`}
                  type="number"
                  value={val}
                  onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                  className="bg-deep-night border-subtle-edge font-mono text-[13px] text-center h-9 focus:border-mist focus:ring-mist/20"
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div>
        <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-3 block">
          Vector de términos independientes (b)
        </Label>
        <div className="bg-void-black border border-subtle-edge rounded-lg p-4">
          <div className="flex gap-2">
            {vector.map((val, i) => (
              <Input
                key={i}
                type="number"
                value={val}
                onChange={(e) => handleVectorChange(i, e.target.value)}
                className="bg-deep-night border-subtle-edge font-mono text-[13px] text-center h-9 focus:border-mist focus:ring-mist/20"
              />
            ))}
          </div>
        </div>
      </div>

      {showIterativeFields && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
              Tolerancia
            </Label>
            <Input
              type="number"
              value={tolerance}
              onChange={(e) => setTolerance(e.target.value)}
              className="bg-void-black border-subtle-edge font-mono text-[13px] h-9 focus:border-mist focus:ring-mist/20"
              step="0.000001"
            />
          </div>
          <div>
            <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
              Iteraciones máximas
            </Label>
            <Input
              type="number"
              value={maxIterations}
              onChange={(e) => setMaxIterations(e.target.value)}
              className="bg-void-black border-subtle-edge font-mono text-[13px] h-9 focus:border-mist focus:ring-mist/20"
              min="1"
              max="10000"
            />
          </div>
        </div>
      )}

      {method === 'sor' && (
        <div>
          <Label className="text-[11px] uppercase tracking-[0.2em] text-mist font-medium mb-2 block">
            Parámetro ω (relajación)
          </Label>
          <Input
            type="number"
            value={omega}
            onChange={(e) => setOmega(e.target.value)}
            className="bg-void-black border-subtle-edge font-mono text-[13px] h-9 focus:border-mist focus:ring-mist/20"
            step="0.1"
            min="0.1"
            max="2"
          />
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isCalculating}
          className="bg-ghost-white text-void-black font-mono text-[13px] uppercase tracking-[0.15em] hover:bg-mist transition-colors active:scale-[0.98] px-8 h-10"
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